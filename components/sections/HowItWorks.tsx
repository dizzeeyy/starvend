'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Kontakt',
    description:
      'Napisz lub zadzwoń. Omówimy Twoje potrzeby i liczbę pracowników.',
  },
  {
    number: '02',
    title: 'Wycena & lokalizacja',
    description:
      'Dobierzemy model maszyny i ustalimy optymalne miejsce ustawienia.',
  },
  {
    number: '03',
    title: 'Montaż',
    description:
      'Przywozimy, instalujemy i uruchamiamy. Zero formalności po Twojej stronie.',
  },
  {
    number: '04',
    title: 'Serwis & uzupełnianie',
    description:
      'Regularnie uzupełniamy asortyment i dbamy o sprawność techniczną.',
  },
]

export function HowItWorks() {
  return (
    <section
      id="jak-to-dziala"
      className="relative py-24 md:py-32 px-6 md:px-8"
      style={{ backgroundColor: 'var(--color-surface-1)' }}
    >
      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center font-bold tracking-tight mb-16 md:mb-24"
          style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
        >
          <span style={{ color: 'var(--color-foreground)' }}>Jak to działa</span>
          <span style={{ color: 'var(--color-accent)' }}>?</span>
        </motion.h2>

        {/* Steps grid */}
        <div className="relative">
          {/* Desktop connector line */}
          <div
            className="hidden md:block absolute left-0 right-0 h-px"
            style={{
              backgroundColor: 'var(--color-border)',
              top: '2rem',
              left: '12.5%',
              right: '12.5%',
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative flex flex-col items-start md:items-center md:text-center"
              >
                {/* Step number */}
                <div
                  className="font-mono font-bold text-5xl md:text-6xl mb-4 relative z-10"
                  style={{
                    color: 'var(--color-accent)',
                    lineHeight: 1,
                  }}
                >
                  {step.number}
                </div>

                {/* Dot on the line (desktop) */}
                <div
                  className="hidden md:block absolute top-[2rem] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 z-20"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    borderColor: 'var(--color-surface-1)',
                    marginTop: '-0.375rem',
                  }}
                />

                <h3
                  className="text-lg font-semibold mb-2 mt-2"
                  style={{ color: 'var(--color-foreground)' }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
