'use client'

import { NavBar } from '@/components/ui/tubelight-navbar'
import { Home, Info, Star, HelpCircle, Mail } from 'lucide-react'

const navItems = [
  { name: 'Oferta', url: '#oferta', icon: Star },
  { name: 'Jak to działa', url: '#jak-to-dziala', icon: Info },
  { name: 'Dlaczego my', url: '#dlaczego-my', icon: Home },
  { name: 'FAQ', url: '#faq', icon: HelpCircle },
  { name: 'Kontakt', url: '#kontakt', icon: Mail },
]

export function Navbar() {
  return (
    <header className="relative z-50">
      {/* Logo */}
      <div className="fixed top-0 left-0 z-50 flex items-center px-6 h-16 pointer-events-none">
        <span className="text-lg font-bold tracking-widest text-foreground pointer-events-auto">
          STARVEND{' '}
          <span style={{ color: 'var(--color-accent)' }}>✦</span>
        </span>
      </div>

      {/* CTA button */}
      <div className="fixed top-0 right-0 z-50 flex items-center px-6 h-16">
        <a
          href="#kontakt"
          className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
          style={{
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-background)',
          }}
        >
          Zapytaj o wycenę
        </a>
      </div>

      {/* NavBar pill */}
      <NavBar items={navItems} />
    </header>
  )
}
