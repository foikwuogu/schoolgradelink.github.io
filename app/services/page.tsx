'use client'

import Link from 'next/link'
import { useState } from 'react'

type Service = {
  title: string
  description: string
  bullets: string[]
  href: string
  id: string
}

const services: Service[] = [
  {
    id: 'itad', title: 'IT Asset Disposition (ITAD)', description: 'Secure, accountable retirement and recovery of technology assets, from data eradication through responsible remarketing.', href: '/contact', bullets: ['Secure data eradication with our in-house ITAD team', 'Full chain-of-custody for IT assets', 'On-site pickup and secure transportation', 'Asset recovery and refurbishment for remarketing'],
  },
  {
    id: 'it-services', title: 'IT Services', description: 'Hands-on infrastructure delivery that gets equipment configured, installed, tested, and ready for work.', href: '/contact', bullets: ['Structured cabling for copper and fiber', 'Hardware configuration and installation', 'Custom equipment configuration', 'Hardware deployment', 'Hardware testing and software validation'],
  },
  {
    id: 'maintenance', title: 'Maintenance & Support', description: 'Responsive lifecycle support that keeps critical hardware and infrastructure dependable.', href: '/contact', bullets: ['Preventive maintenance', 'On-site troubleshooting', 'Hardware lifecycle support', 'Replacement and upgrade planning'],
  },
  {
    id: 'physical-security', title: 'Physical Security Systems', description: 'Integrated systems that help protect people, facilities, and operational assets.', href: '/contact', bullets: ['Video surveillance', 'Access control systems', 'Intrusion detection', 'Remote access management'],
  },
  {
    id: 'network-design', title: 'Network & Design', description: 'Clear network planning and deployment for secure, scalable connectivity.', href: '/contact', bullets: ['Network architecture and topology design', 'IT budget evaluation and planning', 'Data migration', 'VPN and wireless network setup', 'Networked video surveillance'],
  },
  {
    id: 'itam', title: 'Asset Lifecycle Management (ITAM)', description: 'A complete view of technology assets from first purchase to retirement and recycling.', href: '/contact', bullets: ['Procurement', 'Deployment', 'Tracking', 'Maintenance', 'Retirement', 'Recycling'],
  },
  {
    id: 'hardware', title: 'Used & Refurbished IT Hardware', description: 'SGLink sells certified used and refurbished IT equipment for critical infrastructure and modern workplaces.', href: '/hardware', bullets: ['Routers', 'Switches', 'Wireless access points', 'Firewalls', 'Servers', 'Transceivers', 'Optical modules'],
  },
]

export default function ServicesPage() {
  const [active, setActive] = useState(0)
  const current = services[active]

  return (
    <div className="bg-slate-100 py-16 sm:py-20">
      <section className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="text-center text-xs font-bold uppercase tracking-[.16em] text-sglinkBlue">SchoolGrade Link solutions</p>
        <h1 className="mt-3 text-center text-3xl font-bold text-slate-900 sm:text-4xl">Expert Offerings</h1>
        <div className="mt-8 hidden flex-wrap items-stretch justify-center gap-2 md:flex">
          {services.map((service, index) => <button type="button" key={service.title} onClick={() => setActive(index)} className={`flex h-14 max-w-[220px] items-center justify-center rounded-xl px-4 text-center text-sm font-semibold leading-tight transition ${index === active ? 'bg-sglinkBlue text-white' : 'bg-white text-slate-700 hover:bg-slate-200'}`}>{service.title.split(' ').slice(0, 3).join(' ')}</button>)}
        </div>
        <div className="mt-6 flex flex-col gap-2 md:hidden">{services.map((service, index) => <button type="button" key={service.title} onClick={() => setActive(index)} className={`flex min-h-11 items-center rounded-xl px-4 text-left text-sm font-semibold ${index === active ? 'bg-sglinkBlue text-white' : 'bg-white text-slate-700'}`}>{service.title}</button>)}</div>
        <div id={current.id} className="mt-6 rounded-lg bg-white p-6 shadow-lg md:p-10"><div className="grid gap-8 md:grid-cols-2 md:items-center"><div><h2 className="text-xl font-bold text-slate-900 md:text-2xl">{current.title}</h2><p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">{current.description}</p><Link href={current.href} className="mt-6 inline-flex h-11 items-center rounded-md bg-sglinkBlue px-6 text-sm font-semibold text-white hover:bg-sglinkDark">Learn More</Link></div><ul className="flex flex-col gap-3">{current.bullets.map((bullet) => <li key={bullet} className="flex items-start gap-3"><span className="mt-1 h-3 w-3 shrink-0 rotate-45 bg-emerald-400" /><span className="text-sm font-medium text-slate-700">{bullet}</span></li>)}</ul></div></div>
      </section>
    </div>
  )
}
