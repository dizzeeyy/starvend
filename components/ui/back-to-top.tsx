'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-[2rem] bg-[#1946CA] border-none text-white shadow-[0_10px_25px_rgba(25,70,202,0.4)] hover:bg-[#FFD200] hover:text-[#1946CA] hover:scale-110 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(255,210,0,0.5)] transition-all duration-300 flex items-center justify-center cursor-pointer"
          aria-label="Powrót na górę"
        >
          <ChevronUp size={28} strokeWidth={3} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
