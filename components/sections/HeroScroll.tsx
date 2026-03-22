'use client'

import Image from 'next/image'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'

const MACHINE_IMAGE = '/images/gwiezdnygrzesior_A_front-facing_professional_3D_render_of_a_m_6ed6da93-df86-424b-af32-af2bce23f7e9_3.png'

export function HeroScroll() {
  return (
    <section style={{ backgroundColor: 'var(--color-background)' }}>
      <ContainerScroll
        titleComponent={
          <h2
            className="font-bold tracking-tight text-center mb-4"
            style={{ fontSize: 'clamp(32px, 4.5vw, 58px)', lineHeight: 1.15 }}
          >
            <span style={{ color: 'var(--color-foreground)' }}>
              Twój automat.{' '}
            </span>
            <span style={{ color: 'var(--color-accent)' }}>Nasz serwis.</span>
          </h2>
        }
      >
        {/* White background — machine photo looks like a product catalog page */}
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ backgroundColor: '#F8F8F6' }}
        >
          <Image
            src={MACHINE_IMAGE}
            alt="Automat vendingowy Starvend"
            width={480}
            height={720}
            className="object-contain max-h-full w-auto"
            priority
          />
        </div>
      </ContainerScroll>
    </section>
  )
}
