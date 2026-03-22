'use client'

import { motion } from 'framer-motion'
import { ParticleButton } from '@/components/ui/particle-button'
import { LiquidButton } from '@/components/ui/liquid-glass-button'

export function Hero() {
  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      {/* Floating snack image placeholders (mix-blend-mode: screen) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -80, rotate: -10 }}
          animate={{ opacity: 0.5, y: 0, rotate: -10 }}
          transition={{ duration: 2, delay: 0.2 }}
          className="absolute left-[-4%] top-[15%] w-48 h-48 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(200,241,53,0.18) 0%, transparent 70%)',
            mixBlendMode: 'screen',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: -80, rotate: 12 }}
          animate={{ opacity: 0.45, y: 0, rotate: 12 }}
          transition={{ duration: 2, delay: 0.4 }}
          className="absolute right-[-2%] top-[20%] w-56 h-56 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(200,100,53,0.18) 0%, transparent 70%)',
            mixBlendMode: 'screen',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: -60, rotate: -5 }}
          animate={{ opacity: 0.4, y: 0, rotate: -5 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute right-[10%] bottom-[15%] w-40 h-40 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(53,100,200,0.18) 0%, transparent 70%)',
            mixBlendMode: 'screen',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: -40, rotate: 20 }}
          animate={{ opacity: 0.35, y: 0, rotate: 20 }}
          transition={{ duration: 2, delay: 0.6 }}
          className="absolute left-[15%] bottom-[20%] w-32 h-32 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(200,53,53,0.15) 0%, transparent 70%)',
            mixBlendMode: 'screen',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: -60, rotate: -15 }}
          animate={{ opacity: 0.3, y: 0, rotate: -15 }}
          transition={{ duration: 2, delay: 0.7 }}
          className="absolute left-[30%] top-[8%] w-28 h-28 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(180,140,53,0.15) 0%, transparent 70%)',
            mixBlendMode: 'screen',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          className="font-bold tracking-tight mb-6"
          style={{ fontSize: 'clamp(52px, 8vw, 100px)', lineHeight: 1.05 }}
        >
          <span style={{ color: 'var(--color-foreground)' }}>
            Maszyna vendingowa
          </span>
          <br />
          <span style={{ color: 'var(--color-accent)' }}>
            w Twojej firmie.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'var(--color-muted)' }}
        >
          Montaż, serwis i uzupełnianie w jednym pakiecie — bezpłatnie.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <ParticleButton
            size="lg"
            onClick={() => handleScrollTo('kontakt')}
            className="rounded-full font-semibold px-8"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-background)',
            }}
          >
            Zapytaj o wycenę
          </ParticleButton>

          <LiquidButton
            size="lg"
            onClick={() => handleScrollTo('jak-to-dziala')}
            className="rounded-full font-semibold px-8"
            style={{ color: 'var(--color-foreground)' }}
          >
            Jak to działa →
          </LiquidButton>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--color-background))',
        }}
      />
    </section>
  )
}
