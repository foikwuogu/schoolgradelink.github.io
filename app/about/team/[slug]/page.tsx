import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { teamBySlug } from '@/lib/team'

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const member = teamBySlug.get(slug)

  if (!member) notFound()

  return (
    <div className="bg-slate-100 py-12 sm:py-20">
      <article className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] md:items-start">
        <div className="overflow-hidden rounded-lg bg-slate-200 shadow-lg"><Image src={member.photo} alt={member.name} width={720} height={900} className="h-auto w-full object-cover" priority /></div>
        <div><Link href="/about" className="text-sm font-bold text-sglinkBlue">← Back to our team</Link><p className="mt-8 text-xs font-bold uppercase tracking-[.16em] text-sglinkBlue">{member.department}</p><h1 className="mt-3 text-3xl font-bold sm:text-4xl">{member.name}</h1><p className="mt-2 text-lg font-medium text-slate-600">{member.role}</p><p className="mt-7 leading-7 text-slate-700">{member.summary}</p><h2 className="mt-8 text-lg font-bold">Primary responsibilities</h2><ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">{member.responsibilities.map((responsibility) => <li key={responsibility} className="border-l-2 border-cyan-500 pl-3">{responsibility}</li>)}</ul><Link href="/contact" className="mt-9 inline-block rounded-md bg-sglinkBlue px-5 py-3 text-sm font-bold text-white">Work with our team</Link></div>
      </article>
    </div>
  )
}