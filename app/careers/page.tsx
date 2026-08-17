'use client'

import { motion } from 'framer-motion'
import { FormEvent, useState } from 'react'

const jobs = [
  { title: 'Cybersecurity Analyst', department: 'Security Operations', location: 'Warri, Delta State', summary: 'Support risk assessments, security monitoring, and incident-response activities for enterprise and critical-infrastructure clients.' },
  { title: 'Infrastructure Engineer', department: 'Technology', location: 'Warri, Delta State', summary: 'Design and deploy secure network, server, storage, and cloud infrastructure for education and energy environments.' },
  { title: 'OT/ICS Security Consultant', department: 'Advisory', location: 'Hybrid', summary: 'Deliver industrial cybersecurity assessments, segmentation guidance, and compliance support for OT and SCADA environments.' },
  { title: 'Cybersecurity Training Instructor', department: 'Education', location: 'Warri, Delta State', summary: 'Lead practical cybersecurity awareness and technical training programmes for professionals, institutions, and students.' },
  { title: 'Hardware Procurement Specialist', department: 'Supply Chain', location: 'Warri, Delta State', summary: 'Coordinate vendor sourcing, hardware procurement, delivery, and lifecycle support for client technology projects.' },
]

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState(jobs[0].title)
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus(''); setIsSubmitting(true)
    const response = await fetch('/api/careers/apply', { method: 'POST', body: new FormData(event.currentTarget) })
    const result = await response.json(); setStatus(response.ok ? 'Application sent to HR.' : result.error || 'Unable to submit your application.')
    if (response.ok) event.currentTarget.reset(); setIsSubmitting(false)
  }

  return (
    <div className="bg-slate-100 py-16 sm:py-20"><section className="mx-auto max-w-6xl px-4"><p className="text-xs font-bold uppercase tracking-[.16em] text-sglinkBlue">Careers</p><h1 className="mt-3 text-3xl font-bold sm:text-5xl">Build safer systems with us.</h1><p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600">Join SchoolGrade Link&apos;s work across cybersecurity education, critical infrastructure protection, and enterprise technology delivery.</p></section><section className="mx-auto mt-12 grid max-w-6xl gap-8 px-4 lg:grid-cols-[1.1fr_.9fr]"><div className="grid gap-4">{jobs.map((job, index) => <motion.article key={job.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="rounded-lg bg-white p-6 shadow-sm"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><h2 className="text-xl font-bold">{job.title}</h2><p className="mt-1 text-xs font-semibold uppercase tracking-[.12em] text-sglinkBlue">{job.department} · {job.location}</p><p className="mt-4 text-sm leading-6 text-slate-600">{job.summary}</p></div><button type="button" onClick={() => setSelectedJob(job.title)} className="shrink-0 rounded-md border border-sglinkBlue px-4 py-2 text-sm font-bold text-sglinkBlue hover:bg-sglinkBlue hover:text-white">Apply</button></div></motion.article>)}</div><form onSubmit={submitApplication} className="h-fit rounded-lg bg-slate-950 p-6 text-white shadow-lg sm:p-8"><h2 className="text-2xl font-bold">Apply now</h2><p className="mt-2 text-sm text-slate-300">Your application and resume are sent directly to HR.</p><label className="mt-6 block text-sm font-semibold">Role<select name="jobTitle" value={selectedJob} onChange={(event) => setSelectedJob(event.target.value)} className="mt-2 w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white">{jobs.map((job) => <option key={job.title}>{job.title}</option>)}</select></label><label className="mt-4 block text-sm font-semibold">Full name<input name="name" required className="mt-2 w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm" /></label><label className="mt-4 block text-sm font-semibold">Email address<input name="email" type="email" required className="mt-2 w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm" /></label><label className="mt-4 block text-sm font-semibold">Resume (PDF or Word, max 5 MB)<input name="resume" type="file" required accept=".pdf,.doc,.docx" className="mt-2 block w-full text-sm text-slate-300 file:mr-3 file:rounded-md file:border-0 file:bg-cyan-400 file:px-3 file:py-2 file:font-bold file:text-slate-950" /></label><button disabled={isSubmitting} className="mt-6 w-full rounded-md bg-emerald-500 px-4 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-400 disabled:bg-slate-500">{isSubmitting ? 'Sending application...' : 'Submit application'}</button>{status && <p className="mt-4 text-sm text-cyan-200">{status}</p>}</form></section></div>
  )
}
