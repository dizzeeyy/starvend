'use client'

import { motion } from 'framer-motion'
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
  return (
    <section id="faq" className="bg-[var(--color-background)] py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-black text-[var(--color-foreground)] mb-16"
        >
          FAQ<span className="text-[var(--color-accent)]"> ✦</span>
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
                className="border border-[var(--color-border)] rounded-xl px-6 bg-[var(--color-surface-1)]"
              >
                <AccordionTrigger className="text-[var(--color-foreground)] font-semibold hover:text-[var(--color-accent)] transition-colors text-left py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[var(--color-muted)] leading-relaxed pb-5">
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
