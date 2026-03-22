'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

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
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const yChips = useTransform(scrollYProgress, [0, 1], [300, -300])
  const rotateChips = useTransform(scrollYProgress, [0, 1], [-25, 25])

  return (
    <section
      id="jak-to-dziala"
      ref={containerRef}
      className="relative py-24 md:py-32 px-6 md:px-8 overflow-hidden"
      style={{ backgroundColor: 'var(--color-surface-1)' }}
    >
      {/* 3D Background Floating Elements */}
      <motion.div 
        className="absolute top-[30%] right-[-5%] md:right-[2%] z-0 pointer-events-none opacity-100"
        style={{ y: yChips, rotate: rotateChips }}
      >
        <div className="relative w-[160px] h-[160px] md:w-[650px] md:h-[650px]">
          <Image 
            src="/images/lays.png"
            alt="Lays Snacks"
            fill
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </motion.div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center font-black tracking-tight mb-16 md:mb-24"
          style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontFamily: 'var(--font-heading)' }}
        >
          <span style={{ color: 'var(--color-foreground)' }}>Jak to działa</span>
          <span className="text-[var(--color-accent)] inline-block">?</span>
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
                  className="font-black text-6xl md:text-8xl mb-6 relative z-10"
                  style={{
                    color: 'var(--color-accent)',
                    lineHeight: 1,
                    fontFamily: 'var(--font-heading)'
                  }}
                >
                  {step.number}
                </div>

                {/* Dot on the line (desktop) */}
                <div
                  className="hidden md:block absolute top-[2.5rem] left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-4 z-20"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    borderColor: 'var(--color-surface-1)',
                    marginTop: '-0.75rem',
                  }}
                />

                <h3
                  className="text-2xl font-bold mb-3 mt-4"
                  style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-heading)' }}
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
