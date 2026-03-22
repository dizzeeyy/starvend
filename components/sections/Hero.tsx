'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ParticleButton } from '@/components/ui/particle-button'
import { LiquidButton } from '@/components/ui/liquid-glass-button'

const snacks = [
  {
    src: '/images/gwiezdnygrzesior_A_single_large_soft_baked_oatmeal_raisin_coo_c5532d85-78ac-4f5d-854f-15133c74ca49_1.png',
    alt: 'Ciastko',
    style: { top: '12%', left: '-2%', rotate: '-12deg', width: 180 },
    delay: 0.2,
  },
  {
    src: '/images/gwiezdnygrzesior_A_hyper-realistic_3D_render_of_a_glossy_foil_b438c4d4-7c7c-43bd-810b-c5996739a64a_3.png',
    alt: 'Przekąska w folii',
    style: { top: '18%', right: '0%', rotate: '10deg', width: 200 },
    delay: 0.35,
  },
  {
    src: '/images/gwiezdnygrzesior_A_3D_model_of_a_sleek_soda_can_condensation__46fa6700-7260-4782-92c0-73758d80c57e_2.png',
    alt: 'Napój w puszce',
    style: { bottom: '14%', right: '6%', rotate: '-6deg', width: 160 },
    delay: 0.5,
  },
  {
    src: '/images/gwiezdnygrzesior_A_hyper-realistic_3D_render_of_a_chocolate_c_409cd882-bc67-4f47-afda-83246829e77e_0.png',
    alt: 'Baton czekoladowy',
    style: { bottom: '18%', left: '12%', rotate: '16deg', width: 150 },
    delay: 0.6,
  },
  {
    src: '/images/gwiezdnygrzesior_A_3D_isometric_view_of_a_glossy_foil_potato__700c56ef-8e2c-496f-8245-ca5f647ce9a9_2.png',
    alt: 'Chipsy',
    style: { top: '6%', left: '28%', rotate: '-8deg', width: 130 },
    delay: 0.7,
  },
]

export function Hero() {
  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      {/* Floating snack images (mix-blend-mode: screen — white bg disappears on dark surface) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {snacks.map((snack) => (
          <motion.div
            key={snack.src}
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 1.6, delay: snack.delay, ease: 'easeOut' }}
            className="absolute"
            style={{
              top: snack.style.top,
              left: snack.style.left,
              right: snack.style.right,
              bottom: snack.style.bottom,
              rotate: snack.style.rotate,
              mixBlendMode: 'screen',
            }}
          >
            <Image
              src={snack.src}
              alt={snack.alt}
              width={snack.style.width}
              height={snack.style.width}
              className="object-contain"
              draggable={false}
            />
          </motion.div>
        ))}
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
