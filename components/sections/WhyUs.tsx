'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import NumberFlow from '@number-flow/react'

function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <div ref={ref} className="flex flex-col">
      <div className="text-5xl md:text-6xl font-black text-[#0C0C0F] font-mono flex items-baseline gap-0.5">
        <NumberFlow value={isInView ? value : 0} />
        <span>{suffix}</span>
      </div>
      <span className="text-sm text-[#0C0C0F]/70 mt-1 font-medium">{label}</span>
    </div>
  )
}

const features = [
  {
    title: 'Bezpłatny montaż',
    description: 'Nie ponosisz żadnych kosztów instalacji ani uruchomienia maszyny.',
  },
  {
    title: 'Regularny serwis',
    description: 'Uzupełniamy zanim skończy się asortyment — bez Twojego angażowania.',
  },
  {
    title: 'Bez umowy terminowej',
    description: 'Elastyczna współpraca — żadnych długoletnich zobowiązań.',
  },
  {
    title: 'Lokalny operator',
    description: 'Szybka reakcja, znajomość regionalnego rynku.',
  },
  {
    title: 'Personalizowany asortyment',
    description: 'Dostosowujemy wybór produktów do preferencji Twoich pracowników.',
  },
  {
    title: 'Serwis techniczny po naszej stronie',
    description: 'Wszelkie naprawy i konserwacja leżą w całości po naszej stronie.',
  },
]

const stats = [
  { value: 200, suffix: '+', label: 'zadowolonych firm' },
  { value: 500, suffix: '+', label: 'obsługiwanych maszyn' },
  { value: 24, suffix: 'h', label: 'czas reakcji serwisowej' },
  { value: 0, suffix: ' zł', label: 'koszt dla klienta' },
]

export function WhyUs() {
  return (
    <section
      id="dlaczego-my"
      className="py-24 px-4"
      style={{ backgroundColor: 'var(--color-accent)' }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-black text-[#0C0C0F] mb-16"
        >
          Dlaczego Starvend<span>?</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-[#0C0C0F]/10 backdrop-blur-sm border border-[#0C0C0F]/20 rounded-xl p-6"
            >
              <span className="text-[#0C0C0F] font-black text-lg mb-3 block">✦</span>
              <h3 className="font-bold text-[#0C0C0F] text-base mb-2">{feature.title}</h3>
              <p className="text-[#0C0C0F]/70 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
