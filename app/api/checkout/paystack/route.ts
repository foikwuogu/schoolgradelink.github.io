import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const sanityClient = projectId && dataset
  ? createClient({
      projectId,
      dataset,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-08-14',
      token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_WRITE_TOKEN,
      useCdn: false,
    })
  : null

type Product = {
  _id: string
  name: string
  price?: number
  available?: boolean
}

export async function POST(request: Request) {
  const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY

  if (!paystackSecretKey) {
    return NextResponse.json({ error: 'Online payments are not configured yet.' }, { status: 503 })
  }

  if (!sanityClient) {
    return NextResponse.json({ error: 'Sanity is not configured on the server.' }, { status: 503 })
  }

  const body = await request.json().catch(() => null)
  const productId = typeof body?.productId === 'string' ? body.productId : ''
  const email = typeof body?.email === 'string' ? body.email.trim() : ''

  if (!productId || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  }

  const product = await sanityClient.fetch<Product | null>(
    '*[_type == "product" && _id == $productId][0]{ _id, name, price, available }',
    { productId },
  )

  if (!product || typeof product.price !== 'number' || product.price <= 0 || product.available === false) {
    return NextResponse.json({ error: 'This product is not currently available for checkout.' }, { status: 400 })
  }

  const baseUrl = new URL(request.url).origin
  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${paystackSecretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      amount: Math.round(product.price * 100),
      currency: 'NGN',
      callback_url: `${baseUrl}/checkout/complete`,
      metadata: {
        productId: product._id,
        productName: product.name,
      },
    }),
  })
  const result = await response.json()

  if (!response.ok || !result.status || !result.data?.authorization_url) {
    console.error('Paystack initialization failed', result)
    return NextResponse.json({ error: 'Unable to begin checkout. Please try again.' }, { status: 502 })
  }

  return NextResponse.json({ authorizationUrl: result.data.authorization_url })
}