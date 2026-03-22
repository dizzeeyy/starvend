'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navItems = [
  { name: 'Jak to działa', url: '#jak-to-dziala' },
  { name: 'Oferta', url: '#oferta' },
  { name: 'Dlaczego my', url: '#dlaczego-my' },
  { name: 'FAQ', url: '#faq' },
  { name: 'Kontakt', url: '#kontakt' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4 bg-[var(--color-background)] shadow-xl' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-8 max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex-shrink-0" onClick={() => setMobileMenuOpen(false)}>
          <span 
            className="text-2xl font-black tracking-wide text-[var(--color-accent)] cursor-pointer"
            style={{ fontFamily: 'var(--font-fredoka)' }}
          >
            StarVend <span className="text-white">✦</span>
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.url}
              className="text-white text-[15px] font-bold hover:text-[var(--color-accent)] transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* CTA button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="#kontakt"
            className="hidden md:inline-flex flex-shrink-0 items-center justify-center px-6 py-2.5 rounded-[2rem] text-sm font-extrabold transition-transform hover:scale-105"
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: '2px solid white'
            }}
          >
            Sprawdź ofertę!
          </a>
          
          <button 
            className="md:hidden text-white flex items-center justify-center p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[var(--color-background)] border-t border-white/10 overflow-hidden"
          >
            <nav className="flex flex-col items-center py-6 gap-6">
              {navItems.map((item) => (
                <a 
                  key={item.name} 
                  href={item.url}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white text-lg font-bold hover:text-[var(--color-accent)] transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#kontakt"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center px-8 py-3 rounded-[2rem] text-lg font-extrabold"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-background)',
                  fontFamily: 'var(--font-heading)'
                }}
              >
                Sprawdź ofertę!
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
