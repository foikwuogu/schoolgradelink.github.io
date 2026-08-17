'use client'

import Link from 'next/link'
import { useState } from 'react'

type Message = { from: 'bot' | 'user'; text: string }

const answers: Record<string, string> = {
  services: 'SchoolGrade Link provides cybersecurity education, OT/ICS advisory, secure infrastructure delivery, hardware sourcing, and logistics support.',
  hardware: 'You can browse locally managed security, networking, compute, storage, OT/ICS, and workplace hardware in the Marketplace.',
  training: 'Our training programmes cover security awareness, executive cyber risk, and practical OT/ICS cybersecurity capability building.',
  contact: 'Our team can help scope your requirement. Use the contact page to send the details of your project.',
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ from: 'bot', text: 'Hello. How can SchoolGrade Link help today?' }])
  const [input, setInput] = useState('')

  function respond(topic: keyof typeof answers, label: string) {
    setMessages((current) => [...current, { from: 'user', text: label }, { from: 'bot', text: answers[topic] }])
  }

  function sendMessage() {
    const question = input.trim()
    if (!question) return
    setMessages((current) => [...current, { from: 'user', text: question }, { from: 'bot', text: 'Thanks for your message. Our team will be happy to help. Please share your contact details on the contact page so we can follow up.' }])
    setInput('')
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen && <section aria-label="SchoolGrade Link live chat" className="mb-3 flex h-[430px] w-[min(23rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl"><header className="flex items-center justify-between bg-slate-950 px-4 py-4 text-white"><div><p className="text-sm font-bold">SchoolGrade Link Support</p><p className="text-xs text-cyan-200">We are here to help</p></div><button type="button" onClick={() => setIsOpen(false)} aria-label="Close live chat" className="text-xl">×</button></header><div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">{messages.map((message, index) => <p key={`${message.text}-${index}`} className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-5 ${message.from === 'bot' ? 'bg-white text-slate-700 shadow-sm' : 'ml-auto bg-sglinkBlue text-white'}`}>{message.text}</p>)}<div className="flex flex-wrap gap-2 pt-2"><button type="button" onClick={() => respond('services', 'Our services')} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700">Services</button><button type="button" onClick={() => respond('hardware', 'Hardware marketplace')} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700">Hardware</button><button type="button" onClick={() => respond('training', 'Training')} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700">Training</button></div></div><div className="border-t border-slate-200 p-3"><div className="flex gap-2"><input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && sendMessage()} placeholder="Type a message" className="min-w-0 flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm" /><button type="button" onClick={sendMessage} className="rounded-md bg-sglinkBlue px-3 py-2 text-sm font-bold text-white">Send</button></div><Link href="/contact" className="mt-3 block text-center text-xs font-bold text-sglinkBlue">Contact our team directly</Link></div></section>}
      <button type="button" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Close live chat' : 'Open live chat'} className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-2xl text-slate-950 shadow-lg transition hover:scale-105">{isOpen ? '×' : '◌'}</button>
    </div>
  )
}