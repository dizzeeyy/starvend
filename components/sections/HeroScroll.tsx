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
            style={{ fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.1 }}
          >
            <span style={{ color: 'var(--color-foreground)' }}>
              Twój automat.{' '}
            </span>
            <span style={{ color: 'var(--color-accent)' }}>Nasz serwis.</span>
          </h2>
        }
      >
        <div
          className="w-full h-full rounded-2xl flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: 'var(--color-background)' }}
        >
          <Image
            src={MACHINE_IMAGE}
            alt="Automat vendingowy Starvend"
            width={600}
            height={900}
            className="object-contain max-h-full w-auto"
            style={{ mixBlendMode: 'screen' }}
            priority
          />
        </div>
      </ContainerScroll>
    </section>
  )
}
