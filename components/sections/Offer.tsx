'use client'

import { motion } from 'framer-motion'
import { GlowCard } from '@/components/ui/spotlight-card'

const offers = [
  {
    emoji: '🥤',
    title: 'Automaty na napoje',
    description:
      'Zimne napoje, woda, soki, energetyki — zawsze schłodzone i gotowe dla Twoich pracowników.',
  },
  {
    emoji: '🍫',
    title: 'Automaty na przekąski',
    description:
      'Chipsy, batony, ciastka, orzechy — bogaty wybór na każdą chwilę przerwy.',
  },
  {
    emoji: '🔄',
    title: 'Combo — napoje + przekąski',
    description:
      'Jeden automat, pełna oferta napojów i przekąsek. Idealne dla mniejszych przestrzeni.',
  },
]

export function Offer() {
  return (
    <section
      id="oferta"
      className="py-24 md:py-32 px-6 md:px-8"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center font-bold tracking-tight mb-16 md:mb-20"
          style={{
            fontSize: 'clamp(32px, 4vw, 56px)',
            color: 'var(--color-foreground)',
          }}
        >
          Nasza oferta{' '}
          <span style={{ color: 'var(--color-accent)' }}>✦</span>
        </motion.h2>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              {/* GlowCard doesn't accept style prop — wrap to override its backdrop/border CSS vars */}
              <div
                style={
                  {
                    '--backdrop': '#141418',
                    '--backup-border': '#2A2A35',
                  } as React.CSSProperties
                }
              >
                <GlowCard
                  glowColor="green"
                  customSize
                  className="w-full h-auto p-6 md:p-8 !bg-[#141418] !border-[#2A2A35]"
                >
                  <div className="flex flex-col gap-4">
                    <span className="text-4xl">{offer.emoji}</span>
                    <h3
                      className="text-xl font-semibold"
                      style={{ color: 'var(--color-foreground)' }}
                    >
                      {offer.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {offer.description}
                    </p>
                  </div>
                </GlowCard>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
