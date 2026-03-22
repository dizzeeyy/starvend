import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(1, 'Imię i nazwisko jest wymagane'),
  company: z.string().min(1, 'Nazwa firmy jest wymagana'),
  email: z.string().email('Podaj poprawny adres e-mail'),
  phone: z.string().optional().or(z.literal('')),
  message: z.string().optional().or(z.literal('')),
})

export type ContactFormData = z.infer<typeof contactSchema>
