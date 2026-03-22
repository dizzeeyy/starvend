'use client'

import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
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
  
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const yCookie = useTransform(scrollYProgress, [0, 1], [300, -300])
  const rotateCookie = useTransform(scrollYProgress, [0, 1], [-15, 25])

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
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#FFD200', '#1946CA', '#FFFFFF']
      })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="kontakt" ref={containerRef} className="bg-[var(--color-surface-1)] py-24 md:py-32 px-4 relative overflow-hidden scroll-mt-24">
      <Confetti
        ref={confettiRef}
        manualstart
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      />

      {/* 3D Parallax Object */}
      <motion.div 
        className="absolute bottom-[10%] right-[-5%] md:right-[2%] z-0 pointer-events-none opacity-100"
        style={{ y: yCookie, rotate: rotateCookie }}
      >
        <div className="relative w-[140px] h-[140px] md:w-[450px] md:h-[450px]">
          <Image 
            src="/images/ciastka.png" 
            alt="Cookies" 
            fill
            className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]" 
          />
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-12"
        >
          {/* Form — 60% */}
          <div className="lg:col-span-3">
            <h2 
              className="text-5xl md:text-7xl font-black text-[var(--color-foreground)] mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Porozmawiajmy<br />
              <span className="text-[var(--color-accent)] inline-block mt-2">o Twojej firmie.</span>
            </h2>
            <p className="text-white/80 font-bold text-lg mb-10">
              Wypełnij formularz, a odezwiemy się w ciągu 24 godzin.
            </p>

            <AnimatePresence>
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-[3rem] p-12 text-center shadow-2xl"
                >
                  <div className="text-6xl mb-4 text-[var(--color-accent)] transform hover:scale-125 transition-transform cursor-pointer">✦</div>
                  <h3 
                    className="text-3xl font-black text-[#1946CA] mb-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Wiadomość wysłana!
                  </h3>
                  <p className="text-gray-600 font-bold text-lg">
                    Odezwiemy się do Ciebie w ciągu 24 godzin roboczych.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-[#1946CA] font-bold mb-2 block text-md">
                        Imię i nazwisko *
                      </Label>
                      <Input
                        {...register('name')}
                        placeholder="Jan Kowalski"
                        className="bg-gray-100 border-none rounded-2xl p-6 text-[#1946CA] font-bold placeholder:text-gray-400 focus-visible:ring-4 focus-visible:ring-[var(--color-accent)]/50"
                      />
                      {errors.name && (
                        <p className="text-red-500 font-bold text-xs mt-2 px-2">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-[#1946CA] font-bold mb-2 block text-md">
                        Nazwa firmy *
                      </Label>
                      <Input
                        {...register('company')}
                        placeholder="Firma ABC Sp. z o.o."
                        className="bg-gray-100 border-none rounded-2xl p-6 text-[#1946CA] font-bold placeholder:text-gray-400 focus-visible:ring-4 focus-visible:ring-[var(--color-accent)]/50"
                      />
                      {errors.company && (
                        <p className="text-red-500 font-bold text-xs mt-2 px-2">{errors.company.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-[#1946CA] font-bold mb-2 block text-md">
                        Adres e-mail *
                      </Label>
                      <Input
                        {...register('email')}
                        type="email"
                        placeholder="jan@firma.pl"
                        className="bg-gray-100 border-none rounded-2xl p-6 text-[#1946CA] font-bold placeholder:text-gray-400 focus-visible:ring-4 focus-visible:ring-[var(--color-accent)]/50"
                      />
                      {errors.email && (
                        <p className="text-red-500 font-bold text-xs mt-2 px-2">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-[#1946CA] font-bold mb-2 block text-md">
                        Telefon
                      </Label>
                      <Input
                        {...register('phone')}
                        type="tel"
                        placeholder="+48 123 456 789"
                        className="bg-gray-100 border-none rounded-2xl p-6 text-[#1946CA] font-bold placeholder:text-gray-400 focus-visible:ring-4 focus-visible:ring-[var(--color-accent)]/50"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-[#1946CA] font-bold mb-2 block text-md">
                      Wiadomość
                    </Label>
                    <Textarea
                      {...register('message')}
                      placeholder="Opcjonalnie — napisz coś o swojej firmie lub zapytaj o szczegóły."
                      rows={4}
                      className="bg-gray-100 border-none rounded-2xl p-6 text-[#1946CA] font-bold placeholder:text-gray-400 resize-none focus-visible:ring-4 focus-visible:ring-[var(--color-accent)]/50"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-500 font-bold text-sm text-center">
                      Coś poszło nie tak. Spróbuj ponownie lub napisz bezpośrednio na e-mail.
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-[var(--color-accent)] text-[#1946CA] font-black h-auto py-5 rounded-[2rem] hover:bg-[#FFD200]/90 hover:scale-[1.02] shadow-xl hover:shadow-[0_15px_30px_rgba(255,210,0,0.4)] transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-xl"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {status === 'loading' ? (
                      <>
                        <Spinner className="w-5 h-5 text-[#1946CA]" />
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
          <div className="lg:col-span-2 flex flex-col gap-8 pt-6">
            <div className="bg-white/10 rounded-[2rem] p-8 border-none text-white shadow-xl hover:bg-white/20 transition-colors duration-300">
              <p className="text-white/70 font-bold text-sm uppercase tracking-widest mb-2 font-mono">
                Telefon
              </p>
              <a
                href="tel:+48609055928"
                className="text-3xl font-black text-white hover:text-[var(--color-accent)] transition-colors inline-block transform hover:scale-105 duration-200"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                +48 609 055 928
              </a>
            </div>

            <div className="bg-white/10 rounded-[2rem] p-8 border-none text-white shadow-xl hover:bg-white/20 transition-colors duration-300">
              <p className="text-white/70 font-bold text-sm uppercase tracking-widest mb-2 font-mono">
                E-mail
              </p>
              <a
                href="mailto:kontakt@starvend.pl"
                className="text-2xl font-black text-white hover:text-[var(--color-accent)] transition-colors inline-block transform hover:scale-105 duration-200"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                kontakt@starvend.pl
              </a>
            </div>

            <div className="bg-white/10 rounded-[2rem] p-8 border-none text-white shadow-xl hover:bg-white/20 transition-colors duration-300">
              <p className="text-white/70 font-bold text-sm uppercase tracking-widest mb-2 font-mono">
                Obszar działania
              </p>
              <p className="text-white font-bold text-xl mt-1 leading-snug">
                Działamy na terenie województwa zachodniopomorskiego.
              </p>
            </div>

            <div className="mt-auto p-8 bg-[var(--color-accent)] rounded-[2rem] border-none shadow-[0_15px_30px_rgba(255,210,0,0.3)] transform hover:-translate-y-2 transition-transform">
              <p className="text-[#1946CA] font-black text-4xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>24h</p>
              <p className="text-[#1946CA] font-black text-xl">
                Czas odpowiedzi na zapytanie
              </p>
              <p className="text-[#1946CA]/80 font-bold text-base mt-2">
                Odpowiadamy w kolejny dzień roboczy.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
