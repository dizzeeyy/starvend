'use client'

import { ContainerScroll } from '@/components/ui/container-scroll-animation'

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
        {/* Placeholder for /images/machine.jpg */}
        <div
          className="w-full h-full rounded-2xl flex items-center justify-center"
          style={{
            backgroundColor: 'var(--color-surface-1)',
            mixBlendMode: 'screen',
          }}
        >
          <span
            className="text-6xl select-none"
            style={{ color: 'var(--color-muted)', opacity: 0.4 }}
          >
            🏧
          </span>
        </div>
      </ContainerScroll>
    </section>
  )
}
