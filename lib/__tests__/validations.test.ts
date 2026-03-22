import { describe, it, expect } from 'vitest'
import { contactSchema } from '../validations'

describe('contactSchema', () => {
  it('accepts valid minimal input', () => {
    const result = contactSchema.safeParse({
      name: 'Jan Kowalski',
      company: 'Firma ABC',
      email: 'jan@firma.pl',
    })
    expect(result.success).toBe(true)
  })

  it('accepts valid full input', () => {
    const result = contactSchema.safeParse({
      name: 'Jan Kowalski',
      company: 'Firma ABC',
      email: 'jan@firma.pl',
      phone: '+48 123 456 789',
      message: 'Chciałbym dowiedzieć się więcej.',
    })
    expect(result.success).toBe(true)
  })

  it('rejects missing name', () => {
    const result = contactSchema.safeParse({
      company: 'Firma ABC',
      email: 'jan@firma.pl',
    })
    expect(result.success).toBe(false)
  })

  it('rejects missing company', () => {
    const result = contactSchema.safeParse({
      name: 'Jan Kowalski',
      email: 'jan@firma.pl',
    })
    expect(result.success).toBe(false)
  })

  it('rejects invalid email format', () => {
    const result = contactSchema.safeParse({
      name: 'Jan Kowalski',
      company: 'Firma ABC',
      email: 'not-an-email',
    })
    expect(result.success).toBe(false)
  })

  it('allows empty phone', () => {
    const result = contactSchema.safeParse({
      name: 'Jan Kowalski',
      company: 'Firma ABC',
      email: 'jan@firma.pl',
      phone: '',
    })
    expect(result.success).toBe(true)
  })

  it('allows empty message', () => {
    const result = contactSchema.safeParse({
      name: 'Jan Kowalski',
      company: 'Firma ABC',
      email: 'jan@firma.pl',
      message: '',
    })
    expect(result.success).toBe(true)
  })
})
