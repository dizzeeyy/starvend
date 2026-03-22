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
      {/* Atmospheric gradient orbs — designed for dark bg */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 3, delay: 0.2 }}
          className="absolute rounded-full"
          style={{
            left: '-8%', top: '10%',
            width: 500, height: 500,
            background: 'radial-gradient(circle, rgba(200,241,53,0.15) 0%, transparent 70%)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 3, delay: 0.5 }}
          className="absolute rounded-full"
          style={{
            right: '-6%', top: '15%',
            width: 420, height: 420,
            background: 'radial-gradient(circle, rgba(100,180,255,0.1) 0%, transparent 70%)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 3, delay: 0.8 }}
          className="absolute rounded-full"
          style={{
            right: '8%', bottom: '10%',
            width: 350, height: 350,
            background: 'radial-gradient(circle, rgba(200,241,53,0.1) 0%, transparent 70%)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.35, scale: 1 }}
          transition={{ duration: 3, delay: 1.0 }}
          className="absolute rounded-full"
          style={{
            left: '10%', bottom: '15%',
            width: 280, height: 280,
            background: 'radial-gradient(circle, rgba(180,80,255,0.08) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          className="font-bold tracking-tight mb-6"
          style={{ fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: 1.05 }}
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
          transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'var(--color-muted)' }}
        >
          Montaż, serwis i uzupełnianie w jednym pakiecie — bezpłatnie.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
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
