'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { sanityClient } from '@/lib/sanity'

type Testimonial = {
  _id: string
  quote: string
  company: string
  role?: string
}

type StatData = {
  _key?: string
  label: string
  value: number
}

type Homepage = {
  heroTitle?: string
  heroSubtitle?: string
  stats?: StatData[]
}

type PartnerLogo = {
  name: string
  file: string
}

const partnerLogos: PartnerLogo[] = [
  { name: 'Petroleum Training Institute', file: 'partner-2.png' },
  { name: 'Success Heritage', file: 'partner-3.png' },
  { name: 'JAMB', file: 'partner-4.png' },
  { name: 'WAEC', file: 'partner-5.png' },
  { name: 'NYSC', file: 'partner-6.png' },
  { name: 'Platform Petroleum', file: 'partner-7.png' },
  { name: 'Mchomey’s', file: 'partner-8.png' },
  { name: 'NNPC', file: 'partner-9.png' },
  { name: 'WAX', file: 'partner-10.png' },
  { name: 'Unicus', file: 'partner-11.png' },
  { name: 'Joeville', file: 'partner-12.png' },
  { name: 'Anghantero', file: 'partner-13.png' },
  { name: 'Remita', file: 'partner-14.png' },
  { name: 'Zenith Bank', file: 'partner-15.png' },
]

function PartnerLogoTile({ partner }: { partner: PartnerLogo }) {
  const [imageUnavailable, setImageUnavailable] = useState(false)

  return (
    <div className="flex h-28 w-44 shrink-0 flex-col items-center justify-center rounded-lg border border-slate-200 bg-white px-4 shadow-sm">
      {imageUnavailable ? (
        <div className="flex h-12 items-center justify-center text-center text-sm font-bold text-slate-600">{partner.name}</div>
      ) : (
        <img src={`/partners/${partner.file}`} alt={`${partner.name} logo`} className="max-h-12 max-w-full object-contain" onError={() => setImageUnavailable(true)} />
      )}
      <span className="mt-2 line-clamp-2 text-center text-[11px] font-semibold leading-4 text-slate-600">{partner.name}</span>
    </div>
  )
}

const fallbackHomepage: Required<Homepage> = {
  heroTitle: 'Cybersecurity education & infrastructure built for critical industries.',
  heroSubtitle: 'SchoolGrade Link (SGLink) strengthens the security posture of Education, Oil & Gas, Energy, Power and Telecommunications organizations - from workforce training and OT/SCADA advisory to network hardware, physical security and secure IT asset disposition.',
  stats: [
    { label: 'TSA Transactions Secured', value: 10000 },
    { label: 'CBT Seats Deployed (PTI)', value: 300 },
    { label: 'Critical Infrastructure Clients', value: 20 },
    { label: 'Years in Operation', value: 7 },
  ],
}

const servicePillars = [
  { title: 'Cybersecurity Education', copy: 'Practical capability building for leaders, IT teams, educators, and operational staff.', bullets: ['Security awareness programmes', 'OT/ICS and SCADA training', 'Executive cyber-risk workshops'], href: '/training' },
  { title: 'IT Security Equipment', copy: 'Security hardware and software selected for real-world infrastructure requirements.', bullets: ['Firewalls and endpoint protection', 'Identity and access security', 'Network defence equipment'], href: '/hardware' },
  { title: 'Advisory & Consulting', copy: 'Risk-informed consulting for organisations protecting critical services and data.', bullets: ['OT/SCADA assessments', 'NIST, ISO 27001 and IEC 62443 alignment', 'vCISO and security audits'], href: '/services' },
  { title: 'Infrastructure & HPC', copy: 'Design and delivery for resilient networks, compute environments, and data operations.', bullets: ['Network engineering', 'HPC and data centre design', 'Managed IT and cloud support'], href: '/services' },
  { title: 'Logistics & Procurement', copy: 'Reliable sourcing, deployment, movement, and lifecycle support for technology assets.', bullets: ['Equipment procurement', 'Delivery and deployment', 'Asset disposition and recovery'], href: '/services' },
]

const productCategories = ['Security', 'Networking', 'Compute', 'Storage', 'OT/ICS', 'Workplace']

function Stat({ label, target }: { label: string; target: number }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let frame = 0
    const duration = 1500
    const start = performance.now()

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1)
      setValue(Math.floor(progress * target))

      if (progress < 1) {
        frame = window.requestAnimationFrame(animate)
      }
    }

    frame = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(frame)
  }, [target])

  return (
    <div className="rounded-lg bg-white p-4 text-center shadow">
      <p className="text-2xl font-bold">{value}+</p>
      <p className="mt-1 text-xs text-gray-600">{label}</p>
    </div>
  )
}

export default function HomePage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [home, setHome] = useState<Homepage | null>(null)
  const [activeService, setActiveService] = useState(0)

  useEffect(() => {
    sanityClient
      .fetch<Homepage>(`*[_type == "homepage"][0]{ heroTitle, heroSubtitle, stats[]{ _key, label, value } }`)
      .then((data) => setHome(data))
      .catch((error) => console.error('Failed to fetch homepage content', error))

    sanityClient
      .fetch<Testimonial[]>(`*[_type == "testimonial"] | order(_createdAt desc){ _id, quote, company, role }`)
      .then((data) => setTestimonials(data))
      .catch((error) => {
        console.error('Failed to fetch testimonials', error)
        setTestimonials([])
      })
  }, [])

  const homepage = {
    ...fallbackHomepage,
    ...home,
    stats: home?.stats?.length ? home.stats : fallbackHomepage.stats,
  }

  return (
    <div className="bg-white text-slate-950">
      <section className="relative isolate min-h-[640px] overflow-hidden bg-slate-950 text-white">
        <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2200&q=85" alt="Connected technology" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,.96)_5%,rgba(2,6,23,.78)_52%,rgba(2,6,23,.22)_100%)]" />
        <div className="mx-auto flex min-h-[640px] max-w-6xl items-center px-4 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-cyan-300">Empower · Protect · Secure</p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.08] sm:text-6xl">{homepage.heroTitle}</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">{homepage.heroSubtitle}</p>
            <div className="mt-9 flex flex-wrap gap-3"><Link href="/contact" className="rounded-md bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-300">Talk to an expert</Link><Link href="/hardware" className="rounded-md border border-white/70 px-5 py-3 text-sm font-bold hover:bg-white hover:text-slate-950">Explore hardware</Link></div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/15 bg-slate-950/85"><div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-white/15 px-4 sm:grid-cols-4">{homepage.stats.map((stat, index) => <motion.div key={stat._key ?? stat.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="py-5 text-center"><p className="text-2xl font-bold text-cyan-300">{stat.value.toLocaleString()}+</p><p className="mt-1 px-2 text-[10px] uppercase tracking-[.1em] text-slate-300">{stat.label}</p></motion.div>)}</div></div>
      </section>

      <section className="bg-sglinkGray px-4 py-16 text-slate-950 sm:py-24"><div className="mx-auto max-w-6xl"><p className="text-xs font-bold uppercase tracking-[.16em] text-sglinkBlue">Expert offerings</p><h2 className="mt-3 text-3xl font-bold sm:text-4xl">One partner across your technology lifecycle.</h2><div className="mt-8 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">{servicePillars.map((service, index) => <button type="button" key={service.title} onClick={() => setActiveService(index)} className={`shrink-0 rounded-md px-4 py-2 text-sm font-bold transition ${activeService === index ? 'bg-sglinkBlue text-white' : 'bg-white text-slate-700 hover:bg-slate-200'}`}>{service.title}</button>)}</div><motion.div key={servicePillars[activeService].title} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mt-8 grid gap-8 rounded-lg border border-slate-200 bg-white p-6 shadow-lg sm:p-10 lg:grid-cols-[1.1fr_.9fr]"><div><h3 className="text-2xl font-bold">{servicePillars[activeService].title}</h3><p className="mt-4 max-w-xl leading-7 text-slate-600">{servicePillars[activeService].copy}</p><Link href={servicePillars[activeService].href} className="mt-7 inline-block rounded-md bg-sglinkBlue px-5 py-3 text-sm font-bold text-white">Learn more</Link></div><ul className="space-y-4 border-t border-slate-200 pt-6 text-sm text-slate-700 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">{servicePillars[activeService].bullets.map((bullet) => <li key={bullet} className="border-l-2 border-emerald-500 pl-3">{bullet}</li>)}</ul></motion.div></div></section>

      <section className="sg-section bg-white"><div className="sg-container grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-sglinkBlue">Secure lifecycle support</p><h2 className="mt-3 text-3xl font-bold sm:text-4xl">Responsible technology from deployment to disposition.</h2><p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">Our IT asset disposition and recovery approach helps organisations protect data, extend equipment value, and move retired technology through a controlled, accountable process.</p><ul className="mt-7 grid gap-3 text-sm font-semibold text-slate-700 sm:grid-cols-2"><li className="border-l-2 border-sglink-green pl-3">Secure data eradication</li><li className="border-l-2 border-sglink-green pl-3">Asset recovery planning</li><li className="border-l-2 border-sglink-green pl-3">Chain-of-custody support</li><li className="border-l-2 border-sglink-green pl-3">Responsible reuse and recycling</li></ul></div><div className="grid grid-cols-2 gap-4"><div className="rounded-lg bg-sglinkOffwhite p-6"><p className="text-4xl font-bold text-sglinkBlue">10k+</p><p className="mt-2 text-sm text-slate-600">Transactions supported</p></div><div className="rounded-lg bg-sglinkOffwhite p-6"><p className="text-4xl font-bold text-sglinkBlue">7+</p><p className="mt-2 text-sm text-slate-600">Years in operation</p></div><div className="rounded-lg bg-sglinkOffwhite p-6"><p className="text-4xl font-bold text-sglinkBlue">20+</p><p className="mt-2 text-sm text-slate-600">Critical-sector clients</p></div><div className="rounded-lg bg-sglinkOffwhite p-6"><p className="text-4xl font-bold text-sglinkBlue">300+</p><p className="mt-2 text-sm text-slate-600">CBT seats deployed</p></div></div></div></section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24"><p className="text-xs font-bold uppercase tracking-[.16em] text-sglinkBlue">What we deliver</p><h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">Built for people, systems, and the work between them.</h2><div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 md:grid-cols-3">{[['01','Cybersecurity education','Workforce programmes, executive workshops, and OT/ICS training built around real operating environments.','/training'],['02','Secure infrastructure','Network design, hardening, deployment, and support for campuses, energy operations, and data-intensive teams.','/services'],['03','Hardware sourcing','Purpose-fit security, compute, storage, and network hardware selected for your operational requirements.','/hardware']].map(([number,title,copy,href], index) => <motion.article key={title} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:index*.08}} className="flex min-h-[290px] flex-col bg-white p-6"><p className="text-xs font-bold tracking-[.14em] text-cyan-700">{number}</p><h3 className="mt-10 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{copy}</p><Link href={href} className="mt-auto pt-8 text-sm font-bold text-sglinkBlue">Explore solution →</Link></motion.article>)}</div></section>

      <section className="bg-slate-100 py-16 sm:py-24"><div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2 lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-sglinkBlue">Critical environments</p><h2 className="mt-3 text-3xl font-bold sm:text-4xl">Technology that holds up when the stakes are high.</h2><p className="mt-5 text-sm leading-7 text-slate-600">We bring security, infrastructure, procurement, and training into one accountable delivery model for teams that cannot afford downtime or uncertainty.</p><Link href="/about" className="mt-7 inline-block rounded-md bg-slate-950 px-5 py-3 text-sm font-bold text-white">Learn about our work</Link></div><div className="grid grid-cols-2 gap-3">{['Education','Energy & Power','OT/ICS','Financial Services'].map((sector) => <div key={sector} className="flex min-h-36 items-end rounded-lg bg-white p-5 shadow-sm"><p className="text-lg font-bold">{sector}</p></div>)}</div></div></section>

      <section className="bg-[#09264b] px-4 py-16 text-white sm:py-24"><div className="mx-auto max-w-6xl"><p className="text-xs font-bold uppercase tracking-[.16em] text-cyan-300">Why partner with us</p><h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">A practical security partner for essential work.</h2><div className="mt-10 grid gap-5 md:grid-cols-3">{[['Client-centred delivery','We begin with operating needs, risk, and budget, then build a solution around them.'],['Deep technical expertise','Our work connects cybersecurity education with infrastructure engineering and field deployment.'],['End-to-end accountability','From procurement and implementation to training and support, the delivery stays connected.']].map(([title, copy]) => <article key={title} className="border-t-2 border-cyan-300 bg-white/5 p-6"><h3 className="text-xl font-bold">{title}</h3><p className="mt-4 text-sm leading-7 text-slate-200">{copy}</p></article>)}</div></div></section>

      <section className="overflow-hidden bg-white py-16 sm:py-20"><div className="mx-auto max-w-6xl px-4"><p className="text-center text-xs font-bold uppercase tracking-[.16em] text-sglinkBlue">Trusted across academia, energy and finance</p><h2 className="mt-3 text-center text-2xl font-bold">Our partners and clients</h2></div><div className="mt-10 overflow-hidden"><motion.div animate={{ x: ['0%', '-50%'] }} transition={{ repeat: Infinity, duration: 32, ease: 'linear' }} className="flex w-max gap-5 px-4">{[...partnerLogos, ...partnerLogos].map((partner, index) => <PartnerLogoTile key={`${partner.file}-${index}`} partner={partner} />)}</motion.div></div></section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24"><div className="grid gap-8 lg:grid-cols-2 lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-sglinkBlue">Marketplace</p><h2 className="mt-3 text-3xl font-bold sm:text-4xl">Source hardware with confidence.</h2><p className="mt-4 text-sm leading-7 text-slate-600">Browse our locally managed catalog of security, networking, compute, storage, OT/ICS, workplace, and optical hardware.</p></div><Link href="/hardware" className="justify-self-start rounded-md border border-slate-900 px-5 py-3 text-sm font-bold lg:justify-self-end">Browse the marketplace</Link></div><div className="mt-10 grid gap-4 md:grid-cols-3"><img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80" alt="Network equipment" className="h-56 w-full rounded-lg object-cover"/><img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80" alt="Cybersecurity technology" className="h-56 w-full rounded-lg object-cover"/><img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80" alt="Electronic hardware" className="h-56 w-full rounded-lg object-cover"/></div></section>
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{productCategories.map((category, index) => <Link key={category} href={`/hardware?category=${encodeURIComponent(category)}`} className="group relative min-h-40 overflow-hidden rounded-lg bg-slate-900 p-5 text-white"><div className={`absolute inset-0 opacity-60 ${index % 2 ? 'bg-[linear-gradient(135deg,#0d6efd,transparent)]' : 'bg-[linear-gradient(135deg,#10b981,transparent)]'}`} /><div className="relative flex h-full flex-col justify-end"><p className="text-xs font-bold uppercase tracking-[.15em] text-cyan-200">Hardware</p><h3 className="mt-2 text-xl font-bold">{category}</h3><p className="mt-2 text-sm text-slate-200">Explore category →</p></div></Link>)}</div></section>

      <section className="sg-section bg-sglinkOffwhite"><div className="sg-container grid gap-5 md:grid-cols-2"><article className="rounded-lg bg-white p-8 shadow-sm"><p className="text-xs font-bold uppercase tracking-[.16em] text-sglinkBlue">Buy with confidence</p><h2 className="mt-3 text-3xl font-bold">Find the right hardware for the job.</h2><p className="mt-4 text-base leading-7 text-slate-600">Explore locally managed security, networking, compute, storage, OT/ICS, and workplace equipment prepared for consultation or checkout.</p><Link href="/hardware" className="mt-7 inline-block rounded-md bg-sglinkBlue px-5 py-3 text-sm font-bold text-white">Browse IT hardware</Link></article><article className="rounded-lg bg-white p-8 shadow-sm"><p className="text-xs font-bold uppercase tracking-[.16em] text-sglink-greenShade">Need a tailored solution?</p><h2 className="mt-3 text-3xl font-bold">Get the best fit for your budget.</h2><p className="mt-4 text-base leading-7 text-slate-600">Tell our team what you are planning and we will help scope, source, deploy, and support the right technology.</p><Link href="/contact" className="mt-7 inline-block rounded-md bg-sglink-green px-5 py-3 text-sm font-bold text-slate-950">Get a quote</Link></article></div></section>

      <section className="sg-section bg-white"><div className="sg-container"><p className="text-center text-xs font-bold uppercase tracking-[.16em] text-sglinkBlue">Product range</p><h2 className="mt-3 text-center text-3xl font-bold sm:text-4xl">Technology for every operating environment.</h2><p className="mx-auto mt-4 max-w-2xl text-center text-base leading-7 text-slate-600">Browse core categories across enterprise infrastructure, secure connectivity, and modern workplace systems.</p><div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">{['Routers','Switches','Wireless','Optical Networking','Security & Firewalls','Servers','Transceivers','Workplace Devices'].map((category, index) => <Link key={category} href={`/hardware?category=${encodeURIComponent(category)}`} className="group flex min-h-36 flex-col justify-end rounded-lg border border-slate-200 bg-sglinkOffwhite p-5 transition hover:-translate-y-1 hover:border-sglinkBlue hover:bg-white hover:shadow-md"><span className="text-3xl font-bold text-sglinkBlue">{String(index + 1).padStart(2, '0')}</span><span className="mt-5 text-sm font-bold text-slate-700 group-hover:text-sglinkBlue">{category}</span></Link>)}</div></div></section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <p className="text-xs font-bold uppercase tracking-[.16em] text-sglinkBlue">Client perspective</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Trusted for work that needs to last.</h2>
        <div className="mt-6 grid gap-6 text-sm md:grid-cols-3">
          {testimonials.length > 0 ? (
            testimonials.map((testimonial) => (
              <motion.div key={testimonial._id} whileHover={{ scale: 1.03 }} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <p className="italic">“{testimonial.quote}”</p>
                <p className="mt-2 font-semibold">{testimonial.company}</p>
                {testimonial.role && <p className="mt-1 text-xs text-gray-600">{testimonial.role}</p>}
              </motion.div>
            ))
          ) : (
            <>
              <div className="rounded-lg bg-white p-4 shadow">
                <p className="italic">“SGLink transformed our CBT operations and security posture.”</p>
                <p className="mt-2 font-semibold">Petroleum Training Institute (PTI)</p>
              </div>
              <div className="rounded-lg bg-white p-4 shadow">
                <p className="italic">“Their OT security training and CCTV deployment were game-changing.”</p>
                <p className="mt-2 font-semibold">Mchomey’s Oilfield Services</p>
              </div>
              <div className="rounded-lg bg-white p-4 shadow">
                <p className="italic">“Secure payment architectures that scale with our transaction volume.”</p>
                <p className="mt-2 font-semibold">Remita (SystemSpecs)</p>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="bg-sglinkBlue py-16 text-white sm:py-24"><div className="mx-auto max-w-6xl px-4"><p className="text-xs font-bold uppercase tracking-[.16em] text-cyan-100">Partner with us</p><div className="mt-4 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><h2 className="max-w-3xl text-3xl font-bold sm:text-5xl">From the first requirement to the final handover, we make complex technology workable.</h2><Link href="/contact" className="shrink-0 rounded-md bg-white px-5 py-3 text-sm font-bold text-sglinkBlue">Start a conversation</Link></div></div></section>

      <section className="sg-section bg-white"><div className="sg-container grid gap-10 lg:grid-cols-[1fr_.85fr] lg:items-start"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-sglinkBlue">Talk to an expert</p><h2 className="mt-3 text-3xl font-bold sm:text-4xl">Let&apos;s make your next technology decision clearer.</h2><p className="mt-5 max-w-xl text-base leading-7 text-slate-600">Share your requirement with the SchoolGrade Link team and we will help you identify the right next step.</p></div><form className="sg-card space-y-4 p-6"><label className="block text-sm font-semibold text-slate-700">Name<input required className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" /></label><label className="block text-sm font-semibold text-slate-700">Email<input required type="email" className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" /></label><label className="block text-sm font-semibold text-slate-700">How can we help?<textarea required rows={4} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" /></label><button type="submit" className="w-full rounded-md bg-sglinkBlue px-5 py-3 text-sm font-bold text-white">Send enquiry</button></form></div></section>
    </div>
  )
}
