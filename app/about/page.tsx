'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { team } from '@/lib/team'

const educationalTraining = [
  {
    title: 'AI Junior Track: A 24-Hour Beginner Training Module and Slide Deck for Early-Career Engineers (IEEE Computer Society Region 8 AI Caravan 2026)',
    href: 'https://zenodo.org/records/23005192',
  },
  {
    title: 'AI Viber Track: Course Materials for AI-Assisted Software Engineering (IEEE CS Region 8 AI Caravan 2026)',
    href: 'https://zenodo.org/records/23004667',
  },
  {
    title: 'Engineering Roles in Critical-Infrastructure Awareness: Foundations, Responsibilities, and Professional Practice for Emerging Engineer',
    href: 'https://zenodo.org/records/22864273',
  },
  {
    title: 'Engineering Roles in Infrastructure Resilience: A Mentorship Workshop for Students, Early-Career Engineers, and Professionals',
    href: 'https://zenodo.org/records/22858920',
  },
  {
    title: 'CITP-Aligned Mentorship Workshop Materials for OT/ICS & Critical Infrastructure Cybersecurity Mentees',
    href: 'https://zenodo.org/records/22858230',
  },
]

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[#174f83] px-6 py-24 text-white sm:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(113,172,29,.2)_0%,rgba(0,70,133,.58)_52%,rgba(0,45,85,.62)_100%)]" />
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Helping Organizations Build Safer, Smarter Infrastructure</h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg">SchoolGrade Link is built on hands-on experience in cybersecurity education, enterprise technology, and critical infrastructure protection. From workforce capability to secure IT and OT environments, we help organisations make technology dependable, resilient, and ready for what comes next.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="rounded-md bg-sglink-green px-5 py-3 text-sm font-bold text-slate-950 hover:bg-sglink-greenTint1">Schedule Consultation</Link>
            <Link href="/contact" className="rounded-md border border-white/80 px-5 py-3 text-sm font-bold text-white hover:bg-white hover:text-sglink-darkBlue">Contact Us</Link>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:gap-16">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl font-bold">SchoolGrade Link (SGLink)</h2>
          <p className="mt-4 leading-7 text-gray-700">SchoolGrade Link is a specialized cybersecurity education and technology solutions provider dedicated to strengthening the security capabilities and defense posture of critical infrastructure organizations.</p>
          <p className="mt-4 leading-7 text-gray-700">We serve education institutions, oil and gas, energy, power, telecommunications, and essential utility sectors with cybersecurity training, IT/OT security solutions, and enterprise infrastructure services.</p>
          <div className="mt-6 space-y-1 text-sm leading-6 text-gray-600"><p><strong>Industry:</strong> Computer &amp; Network Security | OT/ICS Security</p><p><strong>Founded:</strong> 2017</p><p><strong>Company Size:</strong> 11-20 Employees</p><p><strong>Headquarters:</strong> PTI Complex, PMB 20, Warri, Delta State, Nigeria</p><p><strong>Banking Partner:</strong> Zenith Bank Plc</p></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-lg bg-white p-8 shadow-xl sm:p-10">
          <h3 className="text-xl font-semibold">Vision</h3><p className="mt-3 leading-7 text-gray-700">“To be the premier catalyst for a cyber-resilient future, empowering critical industries and educational institutions with the talent, technology, and trust needed to safeguard the world’s most vital infrastructure.”</p>
          <h3 className="mt-8 text-xl font-semibold">Mission</h3><p className="mt-3 leading-7 text-gray-700">“To empower organizations with cybersecurity knowledge and advanced technology solutions that protect critical infrastructure, strengthen workforce capabilities, and enable secure digital transformation.”</p>
        </motion.div>
      </section>

      <section aria-labelledby="educational-training-heading" className="bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 id="educational-training-heading" className="text-center text-3xl font-bold">Our Educational Training</h2>
          <p className="mt-3 text-center text-base text-gray-600">newest training module 2026</p>
          <ul className="mx-auto mt-10 max-w-4xl divide-y divide-gray-200 border-y border-gray-200">
            {educationalTraining.map((training) => (
              <li key={training.href} className="py-6">
                <a href={training.href} className="block break-words rounded-sm text-lg font-semibold leading-7 text-sglinkBlue underline decoration-sglinkBlue/30 underline-offset-4 hover:decoration-sglinkBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sglinkBlue">
                  {training.title}
                </a>
              </li>
            ))}
          </ul>
          <details className="mx-auto mt-6 max-w-4xl text-sm text-gray-600">
            <summary className="cursor-pointer font-semibold">Author</summary>
            <p className="mt-3 whitespace-pre-wrap break-words leading-6">{`Friday Ogochukwu Ikwuogu
ORCID: 0009-0009-2222-1318
Google Scholar: https://scholar.google.com/citations?pli=1&authuser=3&user=XADxRNkAAAAJ
ResearchGate: https://www.researchgate.net/profile/Friday-O-Ikwuogu/research
GitHub: https://github.com/foikwuogu
Portfolio: Ikwuogufoikwuogu.github.io
LinkedIn: Ogochukwu Friday Ikwuogu
email: Friday.ikwuogu@gmail.com|ikwuogu_f57913@utpb.edu | ogochukwu.f.ikwuogu@ieee.org
Affiliation: Independent Researcher, Odessa, Texas, USA`}</p>
          </details>
        </div>
      </section>

      <section className="bg-slate-100 px-6 py-20"><div className="mx-auto max-w-6xl"><p className="text-center text-xs font-bold uppercase tracking-[.16em] text-sglinkBlue">People behind the work</p><h2 className="mt-3 text-center text-3xl font-bold">Our Team</h2><div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">{team.map((person, index) => <motion.article key={person.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.35) }} className="group"><Link href={`/about/team/${person.slug}`} className="block"><div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-slate-200"><Image src={person.photo} alt={person.name} fill sizes="(min-width: 1024px) 31vw, (min-width: 640px) 45vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" /></div><h3 className="mt-4 text-lg font-bold group-hover:text-sglinkBlue">{person.name}</h3><p className="mt-1 text-sm text-slate-600">{person.role}</p></Link></motion.article>)}</div></div></section>

      <section className="bg-sglinkDark px-6 py-20 text-center text-white"><h2 className="text-3xl font-bold">Talk to an Expert</h2><p className="mx-auto mt-4 max-w-3xl text-gray-300">Need cybersecurity, IT/OT security, or infrastructure support? Our experts are ready to help.</p><Link href="/contact" className="mt-8 inline-block rounded-lg bg-sglinkBlue px-8 py-3 font-semibold">Contact Us</Link></section>

      <section className="bg-[#174f83] px-6 py-20 text-center text-white"><h2 className="text-3xl font-bold">Let&apos;s Partner</h2><p className="mx-auto mt-4 max-w-3xl text-slate-100">Together, we will build solutions so you can make the most of IT, OT, and cybersecurity.</p><Link href="/partners" className="mt-8 inline-block rounded-lg border border-white/80 px-8 py-3 font-semibold text-white hover:bg-white hover:text-sglink-darkBlue">View Partnerships</Link></section>

      <section className="bg-[#174f83] px-6 py-20 text-white"><div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_.9fr] md:items-center"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-sglink-greenTint1">Our Impact</p><h2 className="mt-3 text-3xl font-bold">Security capability that reaches beyond the project.</h2><p className="mt-5 leading-7 text-slate-100">SchoolGrade Link helps institutions and critical-industry teams strengthen the human and technical foundations of resilience. Through practical training, secure infrastructure deployment, and long-term support, we help organisations reduce risk and operate with confidence.</p></div><div className="grid grid-cols-2 gap-4"><div className="rounded-lg bg-white p-5 shadow-sm"><p className="text-2xl font-bold text-sglinkBlue">10,000+</p><p className="mt-1 text-sm text-slate-600">TSA transactions supported</p></div><div className="rounded-lg bg-white p-5 shadow-sm"><p className="text-2xl font-bold text-sglinkBlue">300+</p><p className="mt-1 text-sm text-slate-600">CBT seats deployed</p></div><div className="rounded-lg bg-white p-5 shadow-sm"><p className="text-2xl font-bold text-sglinkBlue">20+</p><p className="mt-1 text-sm text-slate-600">Critical-sector clients</p></div><div className="rounded-lg bg-white p-5 shadow-sm"><p className="text-2xl font-bold text-sglinkBlue">7+</p><p className="mt-1 text-sm text-slate-600">Years of delivery</p></div></div></div></section>
    </div>
  );
}
