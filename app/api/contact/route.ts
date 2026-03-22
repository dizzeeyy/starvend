import { NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validations'
import { resend } from '@/lib/resend'

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { name, company, email, phone, message } = parsed.data

  const { error } = await resend.emails.send({
    from: 'Starvend <formularz@starvent.pl>',
    to: ['kontakt@starvent.pl'],
    reply_to: email,
    subject: `Nowe zapytanie od ${name} — ${company}`,
    text: [
      `Imię i nazwisko: ${name}`,
      `Firma: ${company}`,
      `E-mail: ${email}`,
      phone ? `Telefon: ${phone}` : null,
      message ? `Wiadomość: ${message}` : null,
    ]
      .filter(Boolean)
      .join('\n'),
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
