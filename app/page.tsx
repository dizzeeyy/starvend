import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { HeroScroll } from '@/components/sections/HeroScroll'
import { HowItWorks } from '@/components/sections/HowItWorks'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HeroScroll />
      <HowItWorks />
    </main>
  )
}
