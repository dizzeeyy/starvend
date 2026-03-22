'use client'

import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { contactSchema, type ContactFormData } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { Confetti, type ConfettiRef } from '@/components/ui/confetti'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const confettiRef = useRef<ConfettiRef>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      reset()
      confettiRef.current?.fire({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="kontakt" className="bg-[var(--color-surface-1)] py-24 px-4 relative overflow-hidden">
      <Confetti
        ref={confettiRef}
        manualstart
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-12"
        >
          {/* Form — 60% */}
          <div className="lg:col-span-3">
            <h2 className="text-4xl md:text-5xl font-black text-[var(--color-foreground)] mb-4">
              Porozmawiajmy<br />
              <span className="text-[var(--color-accent)]">o Twojej firmie.</span>
            </h2>
            <p className="text-[var(--color-muted)] mb-10">
              Wypełnij formularz, a odezwiemy się w ciągu 24 godzin.
            </p>

            <AnimatePresence>
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 rounded-xl p-8 text-center"
                >
                  <div className="text-4xl mb-3">✦</div>
                  <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-2">
                    Wiadomość wysłana!
                  </h3>
                  <p className="text-[var(--color-muted)]">
                    Odezwiemy się do Ciebie w ciągu 24 godzin roboczych.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label className="text-[var(--color-foreground)] mb-2 block text-sm">
                        Imię i nazwisko *
                      </Label>
                      <Input
                        {...register('name')}
                        placeholder="Jan Kowalski"
                        className="bg-[var(--color-surface-2)] border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-[var(--color-foreground)] mb-2 block text-sm">
                        Nazwa firmy *
                      </Label>
                      <Input
                        {...register('company')}
                        placeholder="Firma ABC Sp. z o.o."
                        className="bg-[var(--color-surface-2)] border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]"
                      />
                      {errors.company && (
                        <p className="text-red-400 text-xs mt-1">{errors.company.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label className="text-[var(--color-foreground)] mb-2 block text-sm">
                        Adres e-mail *
                      </Label>
                      <Input
                        {...register('email')}
                        type="email"
                        placeholder="jan@firma.pl"
                        className="bg-[var(--color-surface-2)] border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-[var(--color-foreground)] mb-2 block text-sm">
                        Telefon
                      </Label>
                      <Input
                        {...register('phone')}
                        type="tel"
                        placeholder="+48 123 456 789"
                        className="bg-[var(--color-surface-2)] border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-[var(--color-foreground)] mb-2 block text-sm">
                      Wiadomość
                    </Label>
                    <Textarea
                      {...register('message')}
                      placeholder="Opcjonalnie — napisz coś o swojej firmie lub zapytaj o szczegóły."
                      rows={4}
                      className="bg-[var(--color-surface-2)] border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-400 text-sm">
                      Coś poszło nie tak. Spróbuj ponownie lub napisz bezpośrednio na e-mail.
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full sm:w-auto bg-[var(--color-accent)] text-[#0C0C0F] font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                  >
                    {status === 'loading' ? (
                      <>
                        <Spinner className="w-4 h-4" />
                        Wysyłanie...
                      </>
                    ) : (
                      'Wyślij zapytanie'
                    )}
                  </Button>
                </form>
              )}
            </AnimatePresence>
          </div>

          {/* Contact info — 40% */}
          <div className="lg:col-span-2 flex flex-col gap-6 pt-2">
            <div>
              <p className="text-[var(--color-muted)] text-sm uppercase tracking-widest mb-2 font-mono">
                Telefon
              </p>
              <a
                href="tel:+48000000000"
                className="text-2xl font-bold text-[var(--color-foreground)] hover:text-[var(--color-accent)] transition-colors"
              >
                +48 000 000 000
              </a>
            </div>

            <div>
              <p className="text-[var(--color-muted)] text-sm uppercase tracking-widest mb-2 font-mono">
                E-mail
              </p>
              <a
                href="mailto:kontakt@starvend.pl"
                className="text-xl font-bold text-[var(--color-foreground)] hover:text-[var(--color-accent)] transition-colors"
              >
                kontakt@starvend.pl
              </a>
            </div>

            <div>
              <p className="text-[var(--color-muted)] text-sm uppercase tracking-widest mb-2 font-mono">
                Obszar działania
              </p>
              <p className="text-[var(--color-foreground)] font-medium">
                Obsługujemy województwo X i Y
              </p>
              <p className="text-[var(--color-muted)] text-sm mt-1">
                — do uzupełnienia przez klienta
              </p>
            </div>

            <div className="mt-auto p-6 bg-[var(--color-surface-2)] rounded-xl border border-[var(--color-border)]">
              <p className="text-[var(--color-accent)] font-mono text-sm mb-1">24h</p>
              <p className="text-[var(--color-foreground)] font-semibold">
                Czas odpowiedzi na zapytanie
              </p>
              <p className="text-[var(--color-muted)] text-sm mt-1">
                Odpowiadamy w kolejny dzień roboczy.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
