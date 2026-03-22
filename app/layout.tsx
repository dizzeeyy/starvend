import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="pl" className={cn(GeistSans.variable, GeistMono.variable, "font-sans", geist.variable)}>
      <body>{children}</body>
    </html>
  )
}
