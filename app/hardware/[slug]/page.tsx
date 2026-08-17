import { sanityClient } from '@/lib/sanity'
import { CheckoutButton } from './checkout-button'

type Product = {
  _id: string
  name: string
  category: string
  description: string
  image?: {
    alt?: string
    asset?: { url?: string }
  }
  price?: number
  available?: boolean
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await sanityClient.fetch<Product | null>(
    `*[_type == "product" && slug.current == $slug][0]{
      _id,
      name,
      category,
      description,
      image{ alt, asset->{url} },
      price,
      available
    }`,
    { slug },
  )

  if (!product) return <div className="p-4">Product not found.</div>

  return (
    <div className="mx-auto mt-6 max-w-4xl px-4">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded bg-white p-4 shadow">
          {product.image?.asset?.url ? (
            <img src={product.image.asset.url} alt={product.image.alt || product.name} className="h-64 w-full object-contain" />
          ) : (
            <div className="flex h-64 items-center justify-center rounded bg-gray-100 text-sm text-gray-500">Product image</div>
          )}
        </div>

        <div>
          <p className="text-xs uppercase text-gray-500">{product.category}</p>
          <h1 className="mt-1 text-2xl font-bold">{product.name}</h1>
          <p className="mt-3 text-sm text-gray-700">{product.description}</p>
          {typeof product.price === 'number' && (
            <p className="mt-3 text-sm font-semibold">&#8358;{product.price.toLocaleString()}</p>
          )}
          <CheckoutButton productName={product.name} price={product.price} disabled={product.available === false} />
        </div>
      </div>
    </div>
  )
}
