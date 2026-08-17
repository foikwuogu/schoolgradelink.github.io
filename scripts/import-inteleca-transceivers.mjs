import { createClient } from '@sanity/client'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const EXCHANGE_RATE_URL = 'https://open.er-api.com/v6/latest/USD'
const collections = [
  { handle: 'security', category: 'Security' },
  { handle: 'routers', category: 'Networking' },
  { handle: 'switches', category: 'Networking' },
  { handle: 'computing', category: 'Compute' },
  { handle: 'servers', category: 'Compute' },
  { handle: 'storage', category: 'Storage' },
  { handle: 'industrial-ethernet', category: 'OT/ICS' },
  { handle: 'industrial-routers', category: 'OT/ICS' },
  { handle: 'industrial-security-appliance', category: 'OT/ICS' },
  { handle: 'laptops', category: 'Workplace' },
  { handle: 'ip-phones', category: 'Workplace' },
  { handle: 'headsets', category: 'Workplace' },
]

function parseEnvFile(value) {
  return Object.fromEntries(
    value
      .split(/\r?\n/)
      .filter((line) => line && !line.startsWith('#'))
      .map((line) => {
        const separator = line.indexOf('=')
        return [line.slice(0, separator), line.slice(separator + 1).replace(/^['"]|['"]$/g, '')]
      }),
  )
}

const localEnv = parseEnvFile(await readFile(resolve('.env.local'), 'utf8'))
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? localEnv.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? localEnv.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  throw new Error('Set SANITY_API_WRITE_TOKEN and configure NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.')
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-08-14',
  token,
  useCdn: false,
})

const [collectionResponses, exchangeRateResponse] = await Promise.all([
  Promise.all(collections.map(async (collection) => {
    const response = await fetch(`https://shop.inteleca.com/collections/${collection.handle}/products.json?limit=250`)
    return { collection, response }
  })),
  fetch(EXCHANGE_RATE_URL),
])

if (!exchangeRateResponse.ok || collectionResponses.some(({ response }) => !response.ok)) {
  throw new Error('Could not download the supplier catalog or exchange rate.')
}

const exchangeRates = await exchangeRateResponse.json()
const usdToNaira = exchangeRates.rates?.NGN

if (!usdToNaira) {
  throw new Error('USD to NGN exchange rate is unavailable.')
}

const productsById = new Map()
for (const { collection, response } of collectionResponses) {
  const { products = [] } = await response.json()
  for (const product of products) {
    if (!productsById.has(product.id)) productsById.set(product.id, { product, category: collection.category })
  }
}

const existingProducts = await client.fetch(
  '*[_type == "product" && supplier == "Inteleca"]{_id, supplierProductId, "hasImage": defined(image.asset)}',
)
const existingBySupplierId = new Map(existingProducts.map((product) => [product.supplierProductId, product]))

for (const { product, category } of productsById.values()) {
  const supplierProductId = String(product.id)
  const existingProduct = existingBySupplierId.get(supplierProductId)
  const variant = product.variants?.[0]
  const imageUrl = product.images?.[0]?.src
  let image = undefined

  if (imageUrl && !existingProduct?.hasImage) {
    const imageResponse = await fetch(imageUrl)
    if (imageResponse.ok) {
      const imageAsset = await client.assets.upload('image', Buffer.from(await imageResponse.arrayBuffer()), {
        filename: `${product.handle}.jpg`,
      })
      image = { _type: 'image', asset: { _type: 'reference', _ref: imageAsset._id }, alt: product.title }
    }
  }

  const document = {
    _type: 'product',
    name: product.title,
    category,
    description: product.vendor ? `${product.vendor} transceiver.` : 'Network transceiver.',
    price: Math.round(Number(variant?.price ?? 0) * usdToNaira),
    available: variant?.available ?? false,
    slug: { _type: 'slug', current: product.handle },
    supplier: 'Inteleca',
    supplierProductId,
    sourceUrl: `https://shop.inteleca.com/products/${product.handle}`,
    ...(image ? { image } : {}),
  }

  if (existingProduct?._id) {
    await client.patch(existingProduct._id).set(document).commit()
  } else {
    await client.create(document)
  }
}

console.log(`Imported ${productsById.size} Inteleca products at NGN ${usdToNaira.toFixed(2)} per USD.`)