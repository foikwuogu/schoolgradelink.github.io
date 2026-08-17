import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-sglink-darkBlue px-6 py-16 text-white">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-4">
        <div>
          <p className="mb-4 text-lg font-bold text-white">SchoolGrade Link</p>
          <p className="text-sm leading-relaxed text-slate-200">Empower. Protect. Secure.<br />Cybersecurity education and infrastructure solutions for critical industries and educational institutions across Nigeria and the region.</p>
        </div>
        <div><h3 className="mb-4 font-semibold">Quicklinks</h3><ul className="space-y-2 text-sm text-slate-200"><li><Link href="/">Home</Link></li><li><Link href="/hardware">Hardware</Link></li><li><Link href="/about">About</Link></li><li><Link href="/careers">Careers</Link></li><li><Link href="/contact">Contact Us</Link></li></ul></div>
        <div><h3 className="mb-4 font-semibold">Services</h3><ul className="space-y-2 text-sm text-slate-200"><li>Cybersecurity Education</li><li>IT Security Equipment</li><li>OT/SCADA Advisory</li><li>IT Infrastructure &amp; HPC</li><li>Physical Security</li><li>Logistics &amp; Procurement</li></ul></div>
        <div><h3 className="mb-4 font-semibold">Head Office</h3><p className="text-sm leading-relaxed text-slate-200">PTI Complex, PMB 20<br />Warri, Delta State, Nigeria<br /><a href="tel:+2348076419643">+234 807 641 9643</a><br /><a href="mailto:schoolgrade4all@gmail.com">schoolgrade4all@gmail.com</a></p></div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-white/15 pt-6 text-center text-xs text-slate-300">© {new Date().getFullYear()} SchoolGrade Link (SGLink). All Rights Reserved.<br />CAC No. BN 2494233 · SMEDAN No. SUIN54985955</div>
    </footer>
  )
}