'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'Czy płacę za maszynę?',
    answer: 'Nie. Maszyna jest nasza — Ty tylko udostępniasz miejsce. Nie ponosisz żadnych kosztów zakupu ani instalacji urządzenia.',
  },
  {
    question: 'Kto uzupełnia produkty?',
    answer: 'My. Regularnie monitorujemy stany magazynowe i uzupełniamy asortyment bez Twojego angażowania. Ty nie musisz nic robić.',
  },
  {
    question: 'Co jeśli maszyna się zepsuje?',
    answer: 'Przyjeżdżamy i naprawiamy. Serwis techniczny leży w całości po naszej stronie. Wszelkie koszty napraw pokrywamy my.',
  },
  {
    question: 'Czy mogę wybrać produkty w maszynie?',
    answer: 'Tak, asortyment ustalamy wspólnie przed montażem i możemy go zmieniać w trakcie współpracy. Dostosowujemy go do preferencji Twoich pracowników.',
  },
  {
    question: 'Dla jak dużej firmy to się opłaca?',
    answer: 'Już od 20–30 pracowników automat w pełni się sprawdza. Dla mniejszych zespołów możemy zaproponować model combo (napoje + przekąski w jednej maszynie).',
  },
  {
    question: 'Jak długo trwa montaż?',
    answer: 'Zazwyczaj do 2 godzin roboczych. Przywozimy maszynę, instalujemy ją i uruchamiamy — bez potrzeby prac budowlanych. Potrzebne jest jedynie gniazdko elektryczne.',
  },
]

export function FAQ() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const yBaton = useTransform(scrollYProgress, [0, 1], [350, -350])
  const rotateBaton = useTransform(scrollYProgress, [0, 1], [-20, 30])

  return (
    <section id="faq" ref={containerRef} className="bg-[var(--color-background)] py-24 px-4 scroll-mt-24 relative overflow-hidden">
      {/* 3D Parallax Object */}
      <motion.div 
        className="absolute top-[30%] left-[-5%] md:left-[2%] z-0 pointer-events-none opacity-100"
        style={{ y: yBaton, rotate: rotateBaton }}
      >
        <div className="relative w-[140px] h-[140px] md:w-[450px] md:h-[450px]">
          <Image 
            src="/images/baton.png" 
            alt="Chocolate Bar" 
            fill 
            className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]" 
          />
        </div>
      </motion.div>

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-5xl md:text-7xl font-black text-white mb-16 shadow-none"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Masz pytania<span className="text-[var(--color-accent)] inline-block transform hover:scale-110 transition-transform cursor-pointer">?</span>
        </motion.h2>

        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <AccordionItem
                value={`item-${i}`}
                className="border-none bg-[var(--color-surface-1)] rounded-[2rem] mb-4 overflow-hidden transition-transform hover:-translate-y-1 hover:bg-[var(--color-surface-2)]"
              >
                <AccordionTrigger className="text-white font-black text-left px-8 py-6 text-xl w-full border-none data-[state=open]:text-[var(--color-accent)] transition-colors hover:no-underline" style={{ fontFamily: 'var(--font-heading)' }}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/90 font-bold leading-relaxed px-8 pb-6 text-lg font-sans">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
