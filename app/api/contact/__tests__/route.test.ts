import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/resend', () => ({
  resend: {
    emails: {
      send: vi.fn(),
    },
  },
}))

import { POST } from '../route'
import { resend } from '@/lib/resend'

const mockSend = vi.mocked(resend.emails.send)

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    mockSend.mockReset()
  })

  it('returns 200 and sends email for valid input', async () => {
    mockSend.mockResolvedValue({ data: { id: 'abc' }, error: null } as any)

    const req = makeRequest({
      name: 'Jan Kowalski',
      company: 'Firma ABC',
      email: 'jan@firma.pl',
    })

    const res = await POST(req)
    const json = await res.json()

    expect(res.status).toBe(200)
    expect(json.success).toBe(true)
    expect(mockSend).toHaveBeenCalledOnce()
  })

  it('returns 400 for invalid input (missing email)', async () => {
    const req = makeRequest({
      name: 'Jan Kowalski',
      company: 'Firma ABC',
    })

    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 500 if Resend fails', async () => {
    mockSend.mockResolvedValue({ data: null, error: { message: 'API error' } } as any)

    const req = makeRequest({
      name: 'Jan Kowalski',
      company: 'Firma ABC',
      email: 'jan@firma.pl',
    })

    const res = await POST(req)
    expect(res.status).toBe(500)
  })
})
