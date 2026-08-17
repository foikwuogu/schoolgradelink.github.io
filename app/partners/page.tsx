'use client'

import { useEffect, useState } from 'react'
import { sanityClient } from '@/lib/sanity'

type Partner = {
  _id: string
  name: string
  category: string
  description: string
}

const fallbackPartners: Partner[] = [
  {
    _id: 'fallback-partner-1',
    name: 'Academic & Research Partners',
    category: 'Education',
    description: 'Petroleum Training Institute (PTI), Success Heritage Modern Academy, and other education stakeholders.',
  },
  {
    _id: 'fallback-partner-2',
    name: 'Energy & Industry Partners',
    category: 'Energy',
    description: 'Platform Petroleum PPL, Mchomey’s Oilfield Services, NNPC subsidiaries.',
  },
  {
    _id: 'fallback-partner-3',
    name: 'Technology & Service Partners',
    category: 'Technology',
    description: 'WAX Photograph, Unicus Warri, Joeville ITS, Anghantero Engineering Company Limited.',
  },
  {
    _id: 'fallback-partner-4',
    name: 'Financial & Infrastructure Tech',
    category: 'Finance',
    description: 'Remita (Fintech/Payment Gateway) and Zenith Bank Plc (Corporate Banking Partner).',
  },
]

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([])

  useEffect(() => {
    sanityClient
      .fetch<Partner[]>(`*[_type == "partner"] | order(name asc){ _id, name, category, description }`)
      .then((data) => setPartners(data))
      .catch((error) => {
        console.error('Failed to fetch partners', error)
        setPartners(fallbackPartners)
      })
  }, [])

  return (
    <div className="mx-auto max-w-6xl px-4">
      <h1 className="mt-6 text-2xl font-bold">Strategic Business Partnerships</h1>
      <p className="mt-2 text-sm">
        Alliances across academia, energy, technology integration, and financial services.
      </p>

      <section className="mt-6 grid gap-6 text-sm md:grid-cols-2">
        {(partners.length > 0 ? partners : fallbackPartners).map((partner) => (
          <div key={partner._id} className="rounded-lg bg-white p-4 shadow">
            <p className="text-[10px] uppercase text-gray-500">{partner.category}</p>
            <h2 className="mt-1 font-semibold">{partner.name}</h2>
            <p className="mt-2">{partner.description}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
