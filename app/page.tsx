import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { HeroScroll } from '@/components/sections/HeroScroll'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Offer } from '@/components/sections/Offer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HeroScroll />
      <HowItWorks />
      <Offer />
    </main>
  )
}
