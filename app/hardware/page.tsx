import Link from 'next/link'
import { sanityClient } from '@/lib/sanity'
import { HardwareCatalog, type HardwareProduct } from './hardware-catalog'

export const revalidate = 60

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

async function getProducts() {
  try {
    const products = await sanityClient.fetch<HardwareProduct[]>(`*[_type == "product"] | order(_createdAt desc){
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

    return products.length > 0 ? products : fallbackProducts
  } catch (error) {
    console.error('Failed to fetch products', error)
    return fallbackProducts
  }
}

export default async function HardwarePage() {
  const products = await getProducts()

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
        <HardwareCatalog products={products} />
      </div>
    </div>
  )
}
