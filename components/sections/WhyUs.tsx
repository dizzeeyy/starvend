'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

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

export function WhyUs() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Parallax effects for 3d objects
  const yChocolate = useTransform(scrollYProgress, [0, 1], [150, -250])
  const rotateChocolate = useTransform(scrollYProgress, [0, 1], [-20, 30])

  return (
    <section
      id="dlaczego-my"
      ref={containerRef}
      className="py-24 px-4 scroll-mt-24 relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-accent)' }}
    >
      {/* 3D Background Floating Elements */}
      <motion.div
        className="absolute top-[10%] right-[0%] md:right-[5%] z-0 pointer-events-none opacity-100"
        style={{ y: yChocolate, rotate: rotateChocolate }}
      >
        <div className="relative w-[150px] h-[150px] md:w-[550px] md:h-[550px]">
          <Image
            src="/images/doritos.png"
            alt="Doritos Chips"
            fill
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-4xl md:text-6xl font-black text-[var(--color-secondary)] mb-16"
        >
          Dlaczego <span style={{ fontFamily: 'var(--font-fredoka)' }}>StarVend<span className="text-[var(--color-white)]">✦</span></span> ?
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-[2rem] p-8 min-h-[220px] transition-transform hover:-translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
            >
              <h3 className="text-2xl font-black mb-3 text-[#1946CA]" style={{ fontFamily: 'var(--font-heading)' }}>
                {feature.title}
              </h3>
              <p className="text-gray-600 font-bold">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
