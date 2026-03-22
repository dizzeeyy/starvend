'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

import { CupSoda, Candy, RefreshCw } from 'lucide-react'

const offers = [
  {
    icon: CupSoda,
    title: 'Automaty na napoje',
    description:
      'Zimne napoje, woda, soki, energetyki — zawsze schłodzone i gotowe dla Twoich pracowników.',
  },
  {
    icon: Candy,
    title: 'Automaty na przekąski',
    description:
      'Chipsy, batony, ciastka, orzechy — bogaty wybór na każdą chwilę przerwy.',
  },
  {
    icon: RefreshCw,
    title: 'Combo — napoje + przekąski',
    description:
      'Jeden automat, pełna oferta napojów i przekąsek. Idealne dla mniejszych przestrzeni.',
  },
]

export function Offer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const yCan = useTransform(scrollYProgress, [0, 1], [300, -200])
  const rotateCan = useTransform(scrollYProgress, [0, 1], [15, -15])

  return (
    <section
      id="oferta"
      ref={containerRef}
      className="relative py-24 md:py-32 px-6 md:px-8 scroll-mt-24 overflow-hidden"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      {/* 3D Background Floating Elements */}
      <motion.div 
        className="absolute top-[20%] left-[-5%] md:left-[2%] z-0 pointer-events-none opacity-100"
        style={{ y: yCan, rotate: rotateCan }}
      >
        <div className="relative w-[150px] h-[150px] md:w-[600px] md:h-[600px]">
          <Image 
            src="/images/coke.png"
            alt="Coke Can"
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
          className="text-center font-black tracking-tight mb-16 md:mb-20"
          style={{
            fontSize: 'clamp(40px, 5vw, 64px)',
            color: 'var(--color-foreground)',
            fontFamily: 'var(--font-heading)'
          }}
        >
          Nasza oferta{' '}
          <span className="text-[var(--color-accent)] inline-block transform hover:rotate-12 transition-transform cursor-default">✦</span>
        </motion.h2>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, scale: 0.95, y: 32 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.8, delay: i * 0.15 }}
              className="bg-[var(--color-surface-1)] hover:bg-[var(--color-surface-2)] transition-colors duration-300 w-full rounded-[3rem] p-8 md:p-10 flex flex-col gap-6 shadow-xl"
            >
              <div className="w-20 h-20 rounded-[2rem] bg-white flex items-center justify-center shadow-md">
                <offer.icon className="w-10 h-10 text-[var(--color-accent)]" />
              </div>
              <h3
                className="text-3xl font-black mt-2"
                style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-heading)' }}
              >
                {offer.title}
              </h3>
              <p
                className="text-lg leading-relaxed font-bold font-sans"
                style={{ color: 'var(--color-foreground)', opacity: 0.9 }}
              >
                {offer.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
