'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ParticleButton } from '@/components/ui/particle-button'

export function Hero() {
  return (
    <section
      className="relative min-h-[95vh] w-full flex items-center justify-center overflow-hidden bg-[var(--color-background)] pt-20 pb-10"
    >
      {/* Background Graphic Elements - Floating Snacks */}
      <motion.div 
        className="absolute top-[10%] left-[8%] w-[80px] h-[80px] md:w-[150px] md:h-[150px] opacity-100 z-0"
        animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src="/images/coke.png" alt="Coke" fill className="object-contain drop-shadow-2xl" />
      </motion.div>
      <motion.div 
        className="absolute bottom-[20%] right-[8%] w-[90px] h-[90px] md:w-[160px] md:h-[160px] opacity-100 z-0"
        animate={{ y: [0, 25, 0], rotate: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Image src="/images/dr pepper.png" alt="Dr Pepper" fill className="object-contain drop-shadow-2xl" />
      </motion.div>
      <motion.div 
        className="absolute top-[25%] right-[12%] w-[70px] h-[70px] md:w-[120px] md:h-[120px] opacity-100 z-0"
        animate={{ y: [0, -15, 0], rotate: [-10, 10, -10] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Image src="/images/mms.png" alt="M&Ms" fill className="object-contain drop-shadow-2xl" />
      </motion.div>
      <motion.div 
        className="absolute top-[60%] left-[5%] w-[40px] h-[40px] md:w-[140px] md:h-[140px] opacity-100 z-0"
        animate={{ y: [0, 20, 0], rotate: [-15, 5, -15] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <Image src="/images/ciastka.png" alt="Ciastka" fill className="object-contain drop-shadow-2xl" />
      </motion.div>
      <motion.div 
        className="absolute bottom-[10%] left-[20%] w-[50px] h-[50px] md:w-[180px] md:h-[180px] opacity-100 z-0"
        animate={{ y: [0, -25, 0], rotate: [20, -10, 20] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      >
        <Image src="/images/baton.png" alt="Baton" fill className="object-contain drop-shadow-2xl" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 text-center h-full flex flex-col items-center justify-center">
        
        {/* Massive Bubbly Typography Background Layer */}
        <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center h-[300px] md:h-[450px]">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, duration: 1 }}
            className="absolute left-0 md:-left-10 text-white font-black tracking-tight"
            style={{ 
              fontSize: 'clamp(80px, 15vw, 220px)',
              lineHeight: 0.8,
              textShadow: '0px 10px 30px rgba(0,0,0,0.15)',
              zIndex: 5,
              fontFamily: 'var(--font-fredoka)'
            }}
          >
            Star
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, duration: 1, delay: 0.2 }}
            className="absolute right-0 md:-right-10 text-white font-black tracking-tight"
            style={{ 
              fontSize: 'clamp(80px, 15vw, 220px)',
              lineHeight: 0.8,
              textShadow: '0px 10px 30px rgba(0,0,0,0.15)',
              zIndex: 30,
              fontFamily: 'var(--font-fredoka)'
            }}
          >
            Vend
          </motion.h1>

          {/* Central Orbiting 3D Products */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            {/* Main Machine */}
            <motion.div
              initial={{ y: 100, opacity: 0, rotate: -2 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.4, duration: 1.2, delay: 0.3 }}
              className="relative w-[280px] h-[480px] md:w-[480px] md:h-[750px] xl:w-[600px] xl:h-[900px] mt-32"
            >
              <Image 
                src="/images/machine.png" 
                alt="Vending Machine"
                fill
                className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                priority
              />
            </motion.div>
            
            {/* Floating Doritos */}
            <motion.div
              initial={{ x: -100, y: -50, opacity: 0, rotate: -45 }}
              animate={{ x: -200, y: -120, opacity: 1, rotate: 15 }}
              transition={{ type: "spring", duration: 1.5, delay: 0.6 }}
              className="absolute w-[80px] h-[80px] md:w-[280px] md:h-[280px]"
            >
               <motion.div animate={{ y: [0, -15, 0], rotate: [15, 25, 15] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                 <Image 
                   src="/images/doritos.png" 
                   alt="Doritos"
                   fill
                   className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                 />
               </motion.div>
            </motion.div>

            {/* Floating Oreo */}
            <motion.div
              initial={{ x: 100, y: 50, opacity: 0, rotate: 45 }}
              animate={{ x: 250, y: 100, opacity: 1, rotate: -20 }}
              transition={{ type: "spring", duration: 1.5, delay: 0.5 }}
              className="absolute w-[90px] h-[90px] md:w-[320px] md:h-[320px]"
            >
               <motion.div animate={{ y: [0, 20, 0], rotate: [-20, -10, -20] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                 <Image 
                   src="/images/oreo.png" 
                   alt="Oreo"
                   fill
                   className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                 />
               </motion.div>
            </motion.div>

            {/* Floating Lays */}
            <motion.div
              initial={{ x: -100, y: 100, opacity: 0, rotate: 0 }}
              animate={{ x: -250, y: 180, opacity: 1, rotate: -30 }}
              transition={{ type: "spring", duration: 1.5, delay: 0.7 }}
              className="absolute w-[80px] h-[80px] md:w-[260px] md:h-[260px]"
            >
               <motion.div animate={{ y: [0, -20, 0], rotate: [-30, -40, -30] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                 <Image 
                   src="/images/lays.png" 
                   alt="Lays Snacks"
                   fill
                   className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                 />
               </motion.div>
            </motion.div>
          </div>
        </div>

        {/* CTA Button placed creatively overlapping the bottom elements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.5, duration: 1, delay: 0.8 }}
          className="relative z-40 mt-10 md:mt-16"
        >
          <a href="#kontakt">
            <ParticleButton
              size="lg"
              className="rounded-[2.5rem] font-extrabold px-12 py-8 text-2xl shadow-[0_10px_30px_rgba(255,210,0,0.3)] hover:shadow-[0_15px_40px_rgba(255,210,0,0.5)] transform hover:-translate-y-2 transition-all"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-background)',
                fontFamily: 'var(--font-heading)'
              }}
            >
              Zapytaj o wycenę!
            </ParticleButton>
          </a>
        </motion.div>

        {/* Subtle scroll indicator */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 font-semibold tracking-widest text-sm uppercase"
        >
          Przewiń w dół
        </motion.p>
      </div>
    </section>
  )
}
