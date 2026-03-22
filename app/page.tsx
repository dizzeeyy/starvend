import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { HeroScroll } from '@/components/sections/HeroScroll'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Offer } from '@/components/sections/Offer'
import { WhyUs } from '@/components/sections/WhyUs'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HeroScroll />
      <HowItWorks />
      <Offer />
      <WhyUs />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
