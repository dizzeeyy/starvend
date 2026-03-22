import type { Metadata } from 'next'
import { Baloo_2, Nunito, Fredoka } from 'next/font/google'
import { BackToTop } from '@/components/ui/back-to-top'
import './globals.css'

const fredoka = Fredoka({ subsets: ['latin'], variable: '--font-fredoka', weight: ['400', '600', '700'] })

const baloo = Baloo_2({ subsets: ['latin', 'latin-ext'], variable: '--font-heading', weight: ['400', '500', '600', '700', '800'] })
const nunito = Nunito({ subsets: ['latin', 'latin-ext'], variable: '--font-nunito', weight: ['400', '600', '700', '800', '900'] })

export const metadata: Metadata = {
  title: 'Starvend — Automaty vendingowe dla firm | Montaż i serwis',
  description:
    'Starvend dostarcza i obsługuje automaty z przekąskami i napojami w firmach. Montaż, serwis i uzupełnianie bezpłatnie.',
  openGraph: {
    title: 'Starvend — Automaty vendingowe dla firm',
    description: 'Montaż, serwis i uzupełnianie w jednym pakiecie — bezpłatnie.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className={`${baloo.variable} ${nunito.variable} ${fredoka.variable}`}>
      <body className="cursor-default font-sans antialiased">
        {children}
        <BackToTop />
      </body>
    </html>
  )
}
