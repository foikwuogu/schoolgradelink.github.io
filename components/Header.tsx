'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/hardware', label: 'Marketplace' },
  { href: '/training', label: 'Training' },
  { href: '/about', label: 'About' },
  { href: '/careers', label: 'Careers' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white text-slate-950 shadow-sm">
      <div className="bg-sglink-darkBlue px-4 py-2 text-xs text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-end gap-x-5 gap-y-1">
          <a href="mailto:support@schoolgradelink.com" className="hover:text-sglink-greenTint1">Support: support@schoolgradelink.com</a>
          <a href="mailto:sales@schoolgradelink.com" className="hover:text-sglink-greenTint1">Sales: sales@schoolgradelink.com</a>
          <a href="tel:+2348076419643" className="font-semibold hover:text-sglink-greenTint1">Call: 08076419643</a>
        </div>
      </div>
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-wide text-sglink-darkBlue sm:text-base" onClick={() => setIsOpen(false)}>
          <Image src="/logo.png" alt="SchoolGrade Link Logo" width={42} height={42} priority className="rounded-md" />
          <span>SchoolGrade Link</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm font-semibold lg:flex">
          {links.map((link) => <Link key={link.href} href={link.href} className="text-sglink-darkBlue transition hover:text-sglink-green">{link.label}</Link>)}
          <Link href="/contact" className="rounded-md bg-sglink-green px-4 py-2 text-slate-950 transition hover:bg-sglink-greenTint1">Schedule consultation</Link>
        </div>
        <button type="button" aria-label="Toggle navigation" aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)} className="grid h-10 w-10 place-items-center rounded-md border border-sky-300 text-xl text-sglink-darkBlue lg:hidden">{isOpen ? '×' : '☰'}</button>
      </nav>
      {isOpen && <div className="border-t border-sky-200 bg-white px-4 pb-6 lg:hidden"><div className="mx-auto grid max-w-6xl gap-1">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="rounded-md px-3 py-3 text-sm font-semibold text-sglink-darkBlue hover:bg-sky-50">{link.label}</Link>)}<Link href="/contact" onClick={() => setIsOpen(false)} className="mt-2 rounded-md bg-sglink-green px-3 py-3 text-center text-sm font-bold text-slate-950">Schedule consultation</Link></div></div>}
    </header>
  )
}