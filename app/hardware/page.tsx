'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { sanityClient } from '@/lib/sanity'

type HardwareProduct = {
  _id: string
  slug?: { current?: string }
  name: string
  category: string
  description?: string
  price?: number
  image?: {
    alt?: string
    asset?: { url?: string }
  }
}

const fallbackProducts: HardwareProduct[] = [
  {
    _id: 'fallback-product-1',
    slug: { current: 'next-gen-firewall-appliance' },
    name: 'Next-Gen Firewall Appliance',
    category: 'Security',
    description: 'High-throughput NGFW for OT/ICS and enterprise networks.',
    price: 4200,
  },
  {
    _id: 'fallback-product-2',
    slug: { current: 'enterprise-core-switch' },
    name: 'Enterprise Core Switch',
    category: 'Networking',
    description: 'Layer-3 switch for data center and campus aggregation.',
    price: 3100,
  },
  {
    _id: 'fallback-product-3',
    slug: { current: 'hpc-rack-server' },
    name: 'HPC Rack Server',
    category: 'Compute',
    description: 'High-performance server for research and analytics workloads.',
    price: 6800,
  },
  {
    _id: 'fallback-product-4',
    slug: { current: 'secure-router' },
    name: 'Secure Router',
    category: 'Networking',
    description: 'Edge routing with VPN and advanced security features.',
    price: 1800,
  },
]

const catalogCategories = ['Routers', 'Switches', 'Wireless Access Points', 'Firewalls', 'Servers', 'Transceivers', 'Optical Modules', 'Workplace Devices']

const categoryAliases: Record<string, string> = {
  Routers: 'Networking',
  Switches: 'Networking',
  'Wireless Access Points': 'Networking',
  Firewalls: 'Security',
  Servers: 'Compute',
  Transceivers: 'Transceivers',
  'Optical Modules': 'Transceivers',
  'Workplace Devices': 'Workplace',
}

export default function HardwarePage() {
  const [products, setProducts] = useState<HardwareProduct[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const requestedCategory = new URLSearchParams(window.location.search).get('category')
    if (requestedCategory) setActiveCategory(categoryAliases[requestedCategory] ?? requestedCategory)

    sanityClient
      .fetch<HardwareProduct[]>(`*[_type == "product"] | order(_createdAt desc){
        _id,
        name,
        category,
        description,
        price,
        slug,
        image{
          alt,
          asset->{url}
        }
      }`)
      .then((data) => setProducts(data))
      .catch((error) => {
        console.error('Failed to fetch products', error)
        setProducts(fallbackProducts)
      })
  }, [])

  const sourceProducts = products.length > 0 ? products : fallbackProducts
  const categories = ['All', ...Array.from(new Set(sourceProducts.map((product) => product.category))).sort()]
  const normalizedSearchTerm = searchTerm.trim().toLowerCase()

  const visibleProducts = sourceProducts.filter((product) => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory
    const searchableText = `${product.name} ${product.category} ${product.description ?? ''}`.toLowerCase()
    return matchesCategory && (!normalizedSearchTerm || searchableText.includes(normalizedSearchTerm))
  })

  return (
    <div className="bg-white pb-12">
      <section className="bg-sglinkOffwhite px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-sglinkBlue">SchoolGrade Link catalog</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-950 sm:text-5xl">Used &amp; Refurbished IT Hardware</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">SGLink sells certified used and refurbished IT equipment including routers, switches, wireless access points, firewalls, servers, transceivers, and optical modules.</p>
          <Link href="#catalog" className="mt-7 inline-block rounded-md bg-sglinkBlue px-5 py-3 text-sm font-bold text-white hover:bg-sglinkDark">Browse SGLink Catalog</Link>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4">
      <section className="py-12 sm:py-16"><div className="grid grid-cols-2 gap-4 md:grid-cols-4">{catalogCategories.map((category, index) => <button type="button" key={category} onClick={() => { setActiveCategory(categoryAliases[category] ?? category); setSearchTerm('') }} className="group flex min-h-36 flex-col justify-end rounded-lg border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-sglinkBlue hover:shadow-md"><span className="text-4xl font-bold text-sglinkBlue">{String(index + 1).padStart(2, '0')}</span><span className="mt-5 text-sm font-bold text-slate-700 group-hover:text-sglinkBlue">{category}</span></button>)}</div></section>

      <section id="catalog">

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="w-full sm:max-w-xs">
          <span className="sr-only">Search products</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search products"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-sglinkBlue focus:ring-2 focus:ring-sglinkBlue/20"
          />
        </label>
        <div className="flex flex-wrap gap-2 text-xs">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-3 py-1.5 font-medium transition ${
                activeCategory === category
                  ? 'border-sglinkBlue bg-sglinkBlue text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-sglinkBlue hover:text-sglinkBlue'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <section className="mt-6 grid gap-6 text-sm sm:grid-cols-2 lg:grid-cols-4">
        {visibleProducts.map((product) => {
          const productSlug = product.slug?.current
          const productPrice = typeof product.price === 'number' ? product.price : 0

          return (
            <motion.article
              key={product._id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.25 }}
              className="group flex h-full flex-col rounded-lg border border-gray-200 bg-white p-4 shadow transition hover:shadow-xl"
            >
              {product.image?.asset?.url ? (
                <img
                  src={product.image.asset.url}
                  alt={product.image?.alt || product.name}
                  className="mb-3 h-40 w-full rounded object-contain"
                />
              ) : (
                <div className="mb-3 flex h-40 items-center justify-center rounded bg-gradient-to-br from-gray-100 to-gray-200 text-xs font-medium text-gray-500">
                  Product image
                </div>
              )}

              <p className="text-[10px] uppercase tracking-[0.14em] text-gray-500">{product.category}</p>

              <h2 className="mt-2 text-base font-semibold text-slate-800 group-hover:text-sglinkBlue">
                {product.name}
              </h2>

              <p className="mt-2 text-xs leading-5 text-gray-700">
                {product.description ?? 'Enterprise-ready hardware for modern infrastructure.'}
              </p>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-bold text-sglinkBlue">&#8358;{productPrice.toLocaleString()}</p>
                </div>

                {productSlug && (
                  <Link
                    href={`/hardware/${productSlug}`}
                    className="rounded-md border border-sglinkBlue px-3 py-1 text-xs font-semibold text-sglinkBlue transition hover:bg-sglinkBlue hover:text-white"
                  >
                    View Details
                  </Link>
                )}
              </div>
            </motion.article>
          )
        })}
      </section>
      {visibleProducts.length === 0 && (
        <p className="mt-8 text-center text-sm text-gray-600">No products match the selected filters.</p>
      )}
      </section>
      </div>
    </div>
  )
}
