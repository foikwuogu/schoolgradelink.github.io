import { NextResponse } from 'next/server'

const hrEmail = 'schoolgrade4all@gmail.com'
const maxResumeSize = 5 * 1024 * 1024

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL
  if (!apiKey || !fromEmail) return NextResponse.json({ error: 'Applications are not configured yet. Please contact HR directly.' }, { status: 503 })

  const formData = await request.formData()
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const jobTitle = String(formData.get('jobTitle') ?? '').trim()
  const resume = formData.get('resume')
  if (!name || !jobTitle || !/^\S+@\S+\.\S+$/.test(email) || !(resume instanceof File)) return NextResponse.json({ error: 'Complete all fields and attach your resume.' }, { status: 400 })
  if (resume.size > maxResumeSize || !['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(resume.type)) return NextResponse.json({ error: 'Upload a PDF or Word resume no larger than 5 MB.' }, { status: 400 })

  const emailResponse = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from: fromEmail, to: [hrEmail], reply_to: email, subject: `Job application: ${jobTitle} - ${name}`, text: `Applicant: ${name}\nEmail: ${email}\nRole: ${jobTitle}\n\nResume attached.`, attachments: [{ filename: resume.name, content: Buffer.from(await resume.arrayBuffer()).toString('base64') }] }) })
  if (!emailResponse.ok) return NextResponse.json({ error: 'Unable to send your application. Please try again.' }, { status: 502 })
  return NextResponse.json({ ok: true })
}