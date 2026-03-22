# Starvend Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a one-page B2B landing site for Starvend — dark-themed, SSG, with animated 21st.dev components and a Resend-powered contact form.

**Architecture:** Next.js 16 App Router, fully static (SSG) except for `/api/contact` Route Handler. All 21st.dev components installed via `npx shadcn@latest add "https://21st.dev/r/..."`. Design system defined entirely in CSS via Tailwind v4 CSS-first approach. Framer Motion handles entrance animations. No database, no auth.

**Tech Stack:** Next.js 16, shadcn/ui, 21st.dev components, Tailwind CSS v4, Framer Motion, React Hook Form, Zod, Resend, Geist font, Vitest, Vercel

**Spec:** `docs/superpowers/specs/2026-03-22-starvend-website-design.md`

---

## File Map

| File | Responsibility |
|---|---|
| `app/layout.tsx` | Root layout — fonts, metadata, body classes |
| `app/page.tsx` | Composes all section components in order |
| `app/globals.css` | CSS variables (design tokens), base Tailwind v4 config, grain texture |
| `app/api/contact/route.ts` | POST handler — validates body, sends email via Resend |
| `lib/validations.ts` | Zod schema for contact form |
| `lib/resend.ts` | Resend client singleton |
| `components/sections/Navbar.tsx` | Tubelight Navbar wrapper |
| `components/sections/Hero.tsx` | Shape Landing Hero + Particle Button + Liquid Glass Button |
| `components/sections/HeroScroll.tsx` | Container Scroll Animation with vending machine |
| `components/sections/HowItWorks.tsx` | 4-step horizontal/vertical stepper |
| `components/sections/Offer.tsx` | 3 Spotlight Cards |
| `components/sections/WhyUs.tsx` | Features-8 grid + Number Flow stats |
| `components/sections/Testimonials.tsx` | Testimonials Columns (hidden until real content provided) |
| `components/sections/FAQ.tsx` | shadcn Accordion |
| `components/sections/Contact.tsx` | Split form + Resend + Confetti + Spinner |
| `components/sections/Footer.tsx` | Footer Taped Design wrapper |
| `public/images/` | All product photos (machine + 5 snacks) |
| `public/og-image.png` | Static OG image 1200×630px |

---

## Task 1: Scaffold project and install dependencies

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json` (auto-generated)

- [ ] **Step 1: Bootstrap Next.js 16**

```bash
cd /Users/grzegorzmaciejczak/Documents/Projekty/www/star-vend
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --yes
```

Expected: project files created, `npm install` runs automatically.

- [ ] **Step 2: Install core runtime dependencies**

```bash
npm install geist framer-motion react-hook-form @hookform/resolvers zod resend@2
```

> Pin `resend@2` (v2.x) — v3+ renamed `replyTo` to `reply_to`. Pinning v2 avoids a silent field-name mismatch that drops reply-to headers.

- [ ] **Step 3: Install test dependencies**

```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 4: Add vitest config**

Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
})
```

Create `vitest.setup.ts`:
```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 5: Add test script to package.json**

In `package.json`, add to `"scripts"`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 6: Verify project boots**

```bash
npm run dev
```

Expected: `http://localhost:3000` opens with default Next.js page. Stop with Ctrl+C.

- [ ] **Step 7: Commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Next.js 16 project with dependencies"
```

---

## Task 2: Configure design system

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace globals.css with design tokens**

Replace contents of `app/globals.css`:
```css
@import "tailwindcss";

@theme {
  --color-background: #0C0C0F;
  --color-surface-1: #141418;
  --color-surface-2: #1C1C22;
  --color-accent: #C8F135;
  --color-foreground: #F0EFE9;
  --color-muted: #8A8A9A;
  --color-border: #2A2A35;

  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;
}

@layer base {
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--color-background);
    color: var(--color-foreground);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Grain texture overlay */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 10; /* Keep below navbar (z-50+), confetti, and sheets */
    opacity: 0.02;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
  }
}
```

- [ ] **Step 2: Update root layout with Geist fonts and metadata**

Replace `app/layout.tsx`:
```tsx
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

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
    <html lang="pl" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 3: Verify fonts and dark background**

```bash
npm run dev
```

Open `http://localhost:3000` — expect dark background `#0C0C0F`, Geist font. Stop server.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: configure design system tokens and Geist fonts"
```

---

## Task 3: Initialize shadcn/ui and install base components

**Files:**
- Create: `components/ui/` (auto-generated by shadcn)
- Create: `components.json` (shadcn config)

- [ ] **Step 1: Initialize shadcn**

```bash
npx shadcn@latest init --yes
```

When prompted, select:
- Style: Default
- Base color: Neutral
- CSS variables: Yes

- [ ] **Step 2: Install required shadcn base components**

```bash
npx shadcn@latest add accordion
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add label
npx shadcn@latest add sheet
```

- [ ] **Step 3: Verify components.json exists and components installed**

```bash
ls components/ui/
```

Expected: `accordion.tsx`, `button.tsx`, `input.tsx`, `textarea.tsx`, `label.tsx`, `sheet.tsx` present.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: initialize shadcn/ui with base components"
```

---

## Task 4: Install 21st.dev components

**Files:**
- Create: multiple files in `components/ui/` (auto-generated by each install)

> **Important:** If any `npx shadcn@latest add` command fails for a 21st.dev component, open the component's page on 21st.dev, click "Install" and copy the exact CLI command shown there. 21st.dev may update registry URLs.

- [ ] **Step 1: Install Tubelight Navbar**

```bash
npx shadcn@latest add "https://21st.dev/r/ayushmxxn/tubelight-navbar"
```

- [ ] **Step 2: Install Shape Landing Hero**

```bash
npx shadcn@latest add "https://21st.dev/r/kokonutd/shape-landing-hero"
```

- [ ] **Step 3: Install Container Scroll Animation**

```bash
npx shadcn@latest add "https://21st.dev/r/aceternity/container-scroll-animation"
```

- [ ] **Step 4: Install Particle Button**

```bash
npx shadcn@latest add "https://21st.dev/r/kokonutd/particle-button"
```

- [ ] **Step 5: Install Liquid Glass Button**

```bash
npx shadcn@latest add "https://21st.dev/r/aliimam/liquid-glass-button"
```

- [ ] **Step 6: Install Spotlight Card**

```bash
npx shadcn@latest add "https://21st.dev/r/easemize/spotlight-card"
```

- [ ] **Step 7: Install Features-8**

```bash
npx shadcn@latest add "https://21st.dev/r/tailark/features-8"
```

- [ ] **Step 8: Install Number Flow**

```bash
npx shadcn@latest add "https://21st.dev/r/barvian/number-flow"
```

- [ ] **Step 9: Install Testimonials Columns**

```bash
npx shadcn@latest add "https://21st.dev/r/efferd/testimonials-columns-1"
```

- [ ] **Step 10: Install Footer Taped Design**

```bash
npx shadcn@latest add "https://21st.dev/r/radu-activation-popescu/footer-taped-design"
```

- [ ] **Step 11: Install Confetti**

```bash
npx shadcn@latest add "https://21st.dev/r/magicui/confetti"
```

- [ ] **Step 12: Install Spinner**

```bash
npx shadcn@latest add "https://21st.dev/r/haydenbleasel/spinner"
```

- [ ] **Step 13: Verify each component file was actually created**

After all installs, confirm files exist (names may differ from registry slug):
```bash
ls components/ui/ | grep -iE "navbar|hero|scroll|particle|glass|spotlight|feature|number|testim|footer|confetti|spinner"
```
Expected: at least 12 new files. If any component is missing, check 21st.dev for the updated install command and re-run it.

- [ ] **Step 15: Verify no missing peer deps**

```bash
npm install
npm run build 2>&1 | head -30
```

Expected: build completes or shows only TypeScript/linting issues (not missing module errors). If peer deps are missing, install them.

- [ ] **Step 16: Commit**

```bash
git add -A
git commit -m "feat: install all 21st.dev components via shadcn registry"
```

---

## Task 5: Contact form validation (TDD)

**Files:**
- Create: `lib/validations.ts`
- Create: `lib/__tests__/validations.test.ts`

- [ ] **Step 1: Create test directory and failing tests**

Create `lib/__tests__/validations.test.ts`:
```typescript
import { describe, it, expect } from 'vitest'
import { contactSchema } from '../validations'

describe('contactSchema', () => {
  it('accepts valid minimal input', () => {
    const result = contactSchema.safeParse({
      name: 'Jan Kowalski',
      company: 'Firma ABC',
      email: 'jan@firma.pl',
    })
    expect(result.success).toBe(true)
  })

  it('accepts valid full input', () => {
    const result = contactSchema.safeParse({
      name: 'Jan Kowalski',
      company: 'Firma ABC',
      email: 'jan@firma.pl',
      phone: '+48 123 456 789',
      message: 'Chciałbym dowiedzieć się więcej.',
    })
    expect(result.success).toBe(true)
  })

  it('rejects missing name', () => {
    const result = contactSchema.safeParse({
      company: 'Firma ABC',
      email: 'jan@firma.pl',
    })
    expect(result.success).toBe(false)
  })

  it('rejects missing company', () => {
    const result = contactSchema.safeParse({
      name: 'Jan Kowalski',
      email: 'jan@firma.pl',
    })
    expect(result.success).toBe(false)
  })

  it('rejects invalid email format', () => {
    const result = contactSchema.safeParse({
      name: 'Jan Kowalski',
      company: 'Firma ABC',
      email: 'not-an-email',
    })
    expect(result.success).toBe(false)
  })

  it('allows empty phone', () => {
    const result = contactSchema.safeParse({
      name: 'Jan Kowalski',
      company: 'Firma ABC',
      email: 'jan@firma.pl',
      phone: '',
    })
    expect(result.success).toBe(true)
  })

  it('allows empty message', () => {
    const result = contactSchema.safeParse({
      name: 'Jan Kowalski',
      company: 'Firma ABC',
      email: 'jan@firma.pl',
      message: '',
    })
    expect(result.success).toBe(true)
  })
})
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
npm test
```

Expected: FAIL — `Cannot find module '../validations'`

- [ ] **Step 3: Implement the schema**

Create `lib/validations.ts`:
```typescript
import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(1, 'Imię i nazwisko jest wymagane'),
  company: z.string().min(1, 'Nazwa firmy jest wymagana'),
  email: z.string().email('Podaj poprawny adres e-mail'),
  phone: z.string().optional().or(z.literal('')),
  message: z.string().optional().or(z.literal('')),
})

export type ContactFormData = z.infer<typeof contactSchema>
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
npm test
```

Expected: 7 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/validations.ts lib/__tests__/validations.test.ts
git commit -m "feat: add contact form Zod validation schema with tests"
```

---

## Task 6: Contact API route (TDD)

**Files:**
- Create: `lib/resend.ts`
- Create: `app/api/contact/route.ts`
- Create: `app/api/contact/__tests__/route.test.ts`

- [ ] **Step 1: Write failing tests**

Create `app/api/contact/__tests__/route.test.ts`:
```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock Resend before importing route
vi.mock('@/lib/resend', () => ({
  resend: {
    emails: {
      send: vi.fn(),
    },
  },
}))

import { POST } from '../route'
import { resend } from '@/lib/resend'

const mockSend = vi.mocked(resend.emails.send)

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    mockSend.mockReset()
  })

  it('returns 200 and sends email for valid input', async () => {
    mockSend.mockResolvedValue({ data: { id: 'abc' }, error: null } as any)

    const req = makeRequest({
      name: 'Jan Kowalski',
      company: 'Firma ABC',
      email: 'jan@firma.pl',
    })

    const res = await POST(req)
    const json = await res.json()

    expect(res.status).toBe(200)
    expect(json.success).toBe(true)
    expect(mockSend).toHaveBeenCalledOnce()
  })

  it('returns 400 for invalid input (missing email)', async () => {
    const req = makeRequest({
      name: 'Jan Kowalski',
      company: 'Firma ABC',
    })

    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 500 if Resend fails', async () => {
    mockSend.mockResolvedValue({ data: null, error: { message: 'API error' } } as any)

    const req = makeRequest({
      name: 'Jan Kowalski',
      company: 'Firma ABC',
      email: 'jan@firma.pl',
    })

    const res = await POST(req)
    expect(res.status).toBe(500)
  })
})
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
npm test
```

Expected: FAIL — `Cannot find module '../route'`

- [ ] **Step 3: Create Resend client**

Create `lib/resend.ts`:
```typescript
import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)
```

- [ ] **Step 4: Implement the Route Handler**

Create `app/api/contact/route.ts`:
```typescript
import { NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validations'
import { resend } from '@/lib/resend'

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { name, company, email, phone, message } = parsed.data

  const { error } = await resend.emails.send({
    from: 'Starvend <formularz@starvend.pl>',
    to: ['kontakt@starvend.pl'],
    replyTo: email,
    subject: `Nowe zapytanie od ${name} — ${company}`,
    text: [
      `Imię i nazwisko: ${name}`,
      `Firma: ${company}`,
      `E-mail: ${email}`,
      phone ? `Telefon: ${phone}` : null,
      message ? `Wiadomość: ${message}` : null,
    ]
      .filter(Boolean)
      .join('\n'),
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
```

- [ ] **Step 5: Run all tests — verify they pass**

```bash
npm test
```

Expected: all 10 tests PASS (7 from Task 5 + 3 from Task 6).

- [ ] **Step 6: Commit**

```bash
git add lib/resend.ts app/api/contact/route.ts app/api/contact/__tests__/route.test.ts
git commit -m "feat: add contact API route with Resend and full test coverage"
```

---

## Task 7: Navbar section

**Files:**
- Create: `components/sections/Navbar.tsx`

> Read `components/ui/tubelight-navbar.tsx` first to understand the installed component's props API before writing the wrapper.

- [ ] **Step 1: Read the installed Tubelight Navbar component**

```bash
cat components/ui/tubelight-navbar.tsx
```

Note the component name, prop types, and import paths.

- [ ] **Step 2: Create Navbar section wrapper**

Create `components/sections/Navbar.tsx`:
```tsx
'use client'

import { TubelightNavbar } from '@/components/ui/tubelight-navbar'
// Adjust import name based on what Step 1 reveals

const navItems = [
  { label: 'Oferta', href: '#oferta' },
  { label: 'Jak to działa', href: '#jak-to-dziala' },
  { label: 'Dlaczego my', href: '#dlaczego-my' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Kontakt', href: '#kontakt' },
]

export function Navbar() {
  return (
    <TubelightNavbar
      items={navItems}
      logo={
        <span className="text-[var(--color-foreground)] font-bold tracking-tight text-lg">
          STARVEND <span className="text-[var(--color-accent)]">✦</span>
        </span>
      }
      cta={
        <a
          href="#kontakt"
          className="px-4 py-2 rounded-md bg-[var(--color-accent)] text-[#0C0C0F] font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          Zapytaj o wycenę
        </a>
      }
    />
  )
}
```

> **Note:** Adjust prop names (`items`, `logo`, `cta`) to match the actual component API revealed in Step 1. If the component doesn't support these props directly, wrap it according to its actual API.

- [ ] **Step 3: Temporarily render in page.tsx to verify**

Replace `app/page.tsx` temporarily:
```tsx
import { Navbar } from '@/components/sections/Navbar'

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="h-screen" />
    </main>
  )
}
```

```bash
npm run dev
```

Verify: navbar renders at top, logo shows `STARVEND ✦`, links present, CTA button accent-colored.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Navbar.tsx app/page.tsx
git commit -m "feat: add Navbar section with Tubelight Navbar"
```

---

## Task 8: Hero section

**Files:**
- Create: `components/sections/Hero.tsx`

> Read `components/ui/shape-landing-hero.tsx`, `components/ui/particle-button.tsx`, and `components/ui/liquid-glass-button.tsx` before writing — understand prop APIs.

- [ ] **Step 1: Read installed component APIs**

```bash
cat components/ui/shape-landing-hero.tsx
cat components/ui/particle-button.tsx
cat components/ui/liquid-glass-button.tsx
```

- [ ] **Step 2: Create Hero section**

Create `components/sections/Hero.tsx`:
```tsx
'use client'

import Image from 'next/image'
import { ShapeLandingHero } from '@/components/ui/shape-landing-hero'
import { ParticleButton } from '@/components/ui/particle-button'
import { LiquidGlassButton } from '@/components/ui/liquid-glass-button'
// Adjust component names per Step 1

const snackImages = [
  { src: '/images/snack-cookie-clear.jpg', alt: 'Ciastko w folii' },
  { src: '/images/snack-cookie-orange.jpg', alt: 'Paczka ciastek' },
  { src: '/images/snack-bag-red.jpg', alt: 'Przekąska' },
  { src: '/images/snack-can-blue.jpg', alt: 'Napój' },
  { src: '/images/snack-bar-caramel.jpg', alt: 'Baton' },
]

// Floating snack elements for the hero background
const FloatingSnacks = () => (
  <>
    {snackImages.map((img, i) => (
      <div
        key={i}
        className="absolute pointer-events-none select-none"
        style={{ mixBlendMode: 'screen' }}
      >
        <Image
          src={img.src}
          alt={img.alt}
          width={180}
          height={180}
          className="object-contain opacity-70"
        />
      </div>
    ))}
  </>
)

export function Hero() {
  return (
    <ShapeLandingHero
      shapes={<FloatingSnacks />}
      // Adjust prop name — some versions use `background`, `children`, or `shapes`
    >
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <h1 className="text-[clamp(3rem,8vw,6.25rem)] font-black leading-[0.95] tracking-tight text-[var(--color-foreground)] max-w-4xl">
          Maszyna vendingowa
          <br />
          <span className="text-[var(--color-accent)]">w Twojej firmie.</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-[var(--color-muted)] max-w-xl">
          Montaż, serwis i uzupełnianie w jednym pakiecie — bezpłatnie.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
          <ParticleButton
            onClick={() =>
              document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="bg-[var(--color-accent)] text-[#0C0C0F] font-bold px-8 py-4 rounded-lg text-base"
          >
            Zapytaj o wycenę
          </ParticleButton>

          <LiquidGlassButton
            onClick={() =>
              document.getElementById('jak-to-dziala')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Jak to działa →
          </LiquidGlassButton>
        </div>
      </div>
    </ShapeLandingHero>
  )
}
```

> **Adaptation required:** After reading component APIs in Step 1, adapt the JSX to match actual props. If `ShapeLandingHero` doesn't accept custom children or shapes, render the floating images and text directly within a `<section>` wrapper styled to match the component's visual approach.

- [ ] **Step 3: Add to page.tsx and verify visually**

```tsx
import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <div className="h-screen" />
    </main>
  )
}
```

```bash
npm run dev
```

Verify: hero renders with heading "Maszyna vendingowa / w Twojej firmie.", accent on second line, two CTA buttons.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Hero.tsx app/page.tsx
git commit -m "feat: add Hero section with Shape Landing Hero and CTAs"
```

---

## Task 9: Hero scroll section (vending machine reveal)

**Files:**
- Create: `components/sections/HeroScroll.tsx`

> Read `components/ui/container-scroll-animation.tsx` before writing.

- [ ] **Step 1: Read installed component API**

```bash
cat components/ui/container-scroll-animation.tsx
```

- [ ] **Step 2: Create HeroScroll section**

Create `components/sections/HeroScroll.tsx`:
```tsx
'use client'

import Image from 'next/image'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'
// Adjust import name per Step 1

export function HeroScroll() {
  return (
    <section className="bg-[var(--color-background)]">
      <ContainerScroll
        titleComponent={
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-foreground)]">
            Twój automat.{' '}
            <span className="text-[var(--color-accent)]">Nasz serwis.</span>
          </h2>
        }
      >
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ background: '#0C0C0F' }}
        >
          <Image
            src="/images/machine.jpg"
            alt="Automat vendingowy Starvend"
            width={600}
            height={800}
            className="object-contain max-h-full"
            style={{ mixBlendMode: 'screen' }}
            priority
          />
        </div>
      </ContainerScroll>
    </section>
  )
}
```

- [ ] **Step 3: Add to page.tsx and verify**

Add `<HeroScroll />` after `<Hero />` in `app/page.tsx`.

```bash
npm run dev
```

Verify: scrolling down reveals the vending machine with 3D tilt effect. Machine appears on dark background with no white box around it (mix-blend-mode: screen working).

- [ ] **Step 4: Commit**

```bash
git add components/sections/HeroScroll.tsx app/page.tsx
git commit -m "feat: add HeroScroll section with machine reveal animation"
```

---

## Task 10: HowItWorks section

**Files:**
- Create: `components/sections/HowItWorks.tsx`

- [ ] **Step 1: Create HowItWorks section**

Create `components/sections/HowItWorks.tsx`:
```tsx
'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Kontakt',
    description:
      'Napisz lub zadzwoń. Omówimy Twoje potrzeby i liczbę pracowników.',
  },
  {
    number: '02',
    title: 'Wycena & lokalizacja',
    description:
      'Dobierzemy model maszyny i ustalimy optymalne miejsce ustawienia.',
  },
  {
    number: '03',
    title: 'Montaż',
    description:
      'Przywozimy, instalujemy i uruchamiamy. Zero formalności po Twojej stronie.',
  },
  {
    number: '04',
    title: 'Serwis & uzupełnianie',
    description:
      'Regularnie uzupełniamy asortyment i dbamy o sprawność techniczną.',
  },
]

export function HowItWorks() {
  return (
    <section
      id="jak-to-dziala"
      className="bg-[var(--color-surface-1)] py-24 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-black text-[var(--color-foreground)] mb-16"
        >
          Jak to działa<span className="text-[var(--color-accent)]">?</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-[var(--color-border)]" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col"
            >
              <span className="font-mono text-5xl font-black text-[var(--color-accent)] mb-4 relative z-10">
                {step.number}
              </span>
              <h3 className="text-lg font-bold text-[var(--color-foreground)] mb-2">
                {step.title}
              </h3>
              <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx and verify**

Add `<HowItWorks />` after `<HeroScroll />` in `app/page.tsx`.

```bash
npm run dev
```

Verify: 4 steps visible on dark surface, accent numbers, connector line on desktop.

- [ ] **Step 3: Commit**

```bash
git add components/sections/HowItWorks.tsx app/page.tsx
git commit -m "feat: add HowItWorks 4-step section with Framer Motion"
```

---

## Task 11: Offer section

**Files:**
- Create: `components/sections/Offer.tsx`

> Read `components/ui/spotlight-card.tsx` before writing.

- [ ] **Step 1: Read installed component API**

```bash
cat components/ui/spotlight-card.tsx
```

- [ ] **Step 2: Create Offer section**

Create `components/sections/Offer.tsx`:
```tsx
'use client'

import { motion } from 'framer-motion'
import { SpotlightCard } from '@/components/ui/spotlight-card'
// Adjust import per Step 1

const cards = [
  {
    emoji: '🥤',
    title: 'Automaty na napoje',
    description:
      'Zimne napoje, woda, soki, energetyki — zawsze schłodzone i gotowe dla Twoich pracowników.',
  },
  {
    emoji: '🍫',
    title: 'Automaty na przekąski',
    description:
      'Chipsy, batony, ciastka, orzechy — bogaty wybór na każdą chwilę przerwy.',
  },
  {
    emoji: '🔄',
    title: 'Combo — napoje + przekąski',
    description:
      'Jeden automat, pełna oferta napojów i przekąsek. Idealne dla mniejszych przestrzeni.',
  },
]

export function Offer() {
  return (
    <section id="oferta" className="bg-[var(--color-background)] py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-black text-[var(--color-foreground)] mb-16"
        >
          Nasza oferta<span className="text-[var(--color-accent)]"> ✦</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <SpotlightCard
                spotlightColor="rgba(200, 241, 53, 0.15)"
                className="bg-[var(--color-surface-1)] border border-[var(--color-border)] rounded-2xl p-8 h-full"
                // Adjust props per Step 1
              >
                <div className="text-4xl mb-4">{card.emoji}</div>
                <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-3">
                  {card.title}
                </h3>
                <p className="text-[var(--color-muted)] leading-relaxed">
                  {card.description}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add to page.tsx and verify**

Add `<Offer />` after `<HowItWorks />`.

```bash
npm run dev
```

Verify: 3 cards with spotlight glow effect on hover, accent border glow.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Offer.tsx app/page.tsx
git commit -m "feat: add Offer section with Spotlight Cards"
```

---

## Task 12: WhyUs section

**Files:**
- Create: `components/sections/WhyUs.tsx`

> Read `components/ui/features-8.tsx` and `components/ui/number-flow.tsx` (or the number-flow component file) before writing.

- [ ] **Step 1: Read installed component APIs**

```bash
cat components/ui/features-8.tsx
cat components/ui/number-flow.tsx 2>/dev/null || ls components/ui/ | grep -i number
```

- [ ] **Step 2: Create WhyUs section**

Create `components/sections/WhyUs.tsx`:
```tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { NumberFlow } from '@number-flow/react'
// Note: number-flow may import from '@number-flow/react' or a local file — check Step 1

// NumberFlow animates when the `value` prop changes from 0 to the real value.
// We use useInView to trigger this only when the stats section scrolls into view.
function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <div ref={ref} className="flex flex-col">
      <div className="text-5xl md:text-6xl font-black text-[#0C0C0F] font-mono">
        <NumberFlow value={isInView ? value : 0} />
        {suffix}
      </div>
      <span className="text-sm text-[#0C0C0F]/70 mt-1 font-medium">{label}</span>
    </div>
  )
}

const features = [
  {
    title: 'Bezpłatny montaż',
    description: 'Nie ponosisz żadnych kosztów instalacji ani uruchomienia maszyny.',
    icon: '✦',
  },
  {
    title: 'Regularny serwis',
    description: 'Uzupełniamy zanim skończy się asortyment — bez Twojego angażowania.',
    icon: '✦',
  },
  {
    title: 'Bez umowy terminowej',
    description: 'Elastyczna współpraca — żadnych długoletnich zobowiązań.',
    icon: '✦',
  },
  {
    title: 'Lokalny operator',
    description: 'Szybka reakcja, znajomość regionalnego rynku.',
    icon: '✦',
  },
  {
    title: 'Personalizowany asortyment',
    description: 'Dostosowujemy wybór produktów do preferencji Twoich pracowników.',
    icon: '✦',
  },
  {
    title: 'Serwis techniczny po naszej stronie',
    description: 'Wszelkie naprawy i konserwacja leżą w całości po naszej stronie.',
    icon: '✦',
  },
]

const stats = [
  { value: 200, suffix: '+', label: 'zadowolonych firm' },
  { value: 500, suffix: '+', label: 'obsługiwanych maszyn' },
  { value: 24, suffix: 'h', label: 'czas reakcji serwisowej' },
  { value: 0, suffix: ' zł', label: 'koszt dla klienta' },
]

export function WhyUs() {
  return (
    <section
      id="dlaczego-my"
      className="py-24 px-4"
      style={{ backgroundColor: 'var(--color-accent)' }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-black text-[#0C0C0F] mb-16"
        >
          Dlaczego Starvend<span>?</span>
        </motion.h2>

        {/* Stats row — AnimatedStat handles scroll-triggered count-up via useInView */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} {...stat} />
          ))}
        </div>

        {/* Features grid — use Features8 if compatible, otherwise manual grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-[#0C0C0F]/10 backdrop-blur-sm border border-[#0C0C0F]/20 rounded-xl p-6"
            >
              <span className="text-[#0C0C0F] font-black text-lg mb-3 block">
                {feature.icon}
              </span>
              <h3 className="font-bold text-[#0C0C0F] text-base mb-2">
                {feature.title}
              </h3>
              <p className="text-[#0C0C0F]/70 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

> **NumberFlow note:** If `@number-flow/react` isn't installed (the 21st.dev component may have added it as a peer dep), run `npm install @number-flow/react`. If NumberFlow isn't feasible, replace with static numbers — the section still works without it.

- [ ] **Step 3: Install @number-flow/react if needed**

```bash
npm ls @number-flow/react 2>/dev/null || npm install @number-flow/react
```

- [ ] **Step 4: Add to page.tsx and verify**

Add `<WhyUs />` after `<Offer />`.

```bash
npm run dev
```

Verify: accent background (`#C8F135`) section, dark text on bright background, stats with number animation on scroll, 6 feature cards.

- [ ] **Step 5: Commit**

```bash
git add components/sections/WhyUs.tsx app/page.tsx
git commit -m "feat: add WhyUs section with Features grid and Number Flow stats"
```

---

## Task 13: Testimonials section (hidden by default)

**Files:**
- Create: `components/sections/Testimonials.tsx`

> Read `components/ui/testimonials-columns-1.tsx` (or similar filename) before writing.

- [ ] **Step 1: Read installed component API**

```bash
ls components/ui/ | grep -i test
cat components/ui/testimonials-columns-1.tsx 2>/dev/null || cat components/ui/testimonials.tsx 2>/dev/null
```

- [ ] **Step 2: Create Testimonials section (hidden)**

Create `components/sections/Testimonials.tsx`:
```tsx
// HIDDEN: Uncomment when real testimonials are provided by client
// See spec: docs/superpowers/specs/2026-03-22-starvend-website-design.md section 4.6

/*
'use client'

const testimonials = [
  {
    quote:
      'Od kiedy Starvend zainstalował maszynę w naszym biurze, pracownicy przestali wychodzić po przekąski. Oszczędzamy czas i zwiększyliśmy komfort pracy.',
    author: 'Anna K.',
    role: 'HR Manager, firma produkcyjna',
  },
  {
    quote:
      'Montaż zajął 2 godziny, a maszyna działa bez zarzutu od 8 miesięcy. Zero problemów, zero kontaktu w złych sprawach.',
    author: 'Marek W.',
    role: 'Office Manager',
  },
  {
    quote:
      'Myślałem, że to skomplikowane. Okazało się, że podpisaliśmy umowę i następnego dnia maszyna stała na miejscu.',
    author: 'Tomasz B.',
    role: 'Dyrektor operacyjny',
  },
]

export function Testimonials() {
  return (
    <section className="bg-[var(--color-surface-1)] py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-black text-[var(--color-foreground)] mb-16">
          Co mówią klienci<span className="text-[var(--color-accent)]"> ✦</span>
        </h2>
        // Insert TestimonialsColumns component here with `testimonials` data
      </div>
    </section>
  )
}
*/

// Placeholder export — section not rendered until real content provided
export function Testimonials() {
  return null
}
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Testimonials.tsx
git commit -m "feat: add Testimonials section (hidden until real content provided)"
```

---

## Task 14: FAQ section

**Files:**
- Create: `components/sections/FAQ.tsx`

- [ ] **Step 1: Create FAQ section**

Create `components/sections/FAQ.tsx`:
```tsx
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
    answer:
      'Nie. Maszyna jest nasza — Ty tylko udostępniasz miejsce. Nie ponosisz żadnych kosztów zakupu ani instalacji urządzenia.',
  },
  {
    question: 'Kto uzupełnia produkty?',
    answer:
      'My. Regularnie monitorujemy stany magazynowe i uzupełniamy asortyment bez Twojego angażowania. Ty nie musisz nic robić.',
  },
  {
    question: 'Co jeśli maszyna się zepsuje?',
    answer:
      'Przyjeżdżamy i naprawiamy. Serwis techniczny leży w całości po naszej stronie. Wszelkie koszty napraw pokrywamy my.',
  },
  {
    question: 'Czy mogę wybrać produkty w maszynie?',
    answer:
      'Tak, asortyment ustalamy wspólnie przed montażem i możemy go zmieniać w trakcie współpracy. Dostosowujemy go do preferencji Twoich pracowników.',
  },
  {
    question: 'Dla jak dużej firmy to się opłaca?',
    answer:
      'Już od 20–30 pracowników automat w pełni się sprawdza. Dla mniejszych zespołów możemy zaproponować model combo (napoje + przekąski w jednej maszynie).',
  },
  {
    question: 'Jak długo trwa montaż?',
    answer:
      'Zazwyczaj do 2 godzin roboczych. Przywozimy maszynę, instalujemy ją i uruchamiamy — bez potrzeby prac budowlanych. Potrzebne jest jedynie gniazdko elektryczne.',
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
```

- [ ] **Step 2: Add to page.tsx and verify**

Add `<FAQ />` after `<Testimonials />`.

```bash
npm run dev
```

Verify: 6 FAQ items in accordion, expand/collapse works, accent hover on trigger.

- [ ] **Step 3: Commit**

```bash
git add components/sections/FAQ.tsx app/page.tsx
git commit -m "feat: add FAQ section with shadcn Accordion"
```

---

## Task 15: Contact section UI

**Files:**
- Create: `components/sections/Contact.tsx`

> Read `components/ui/confetti.tsx` and `components/ui/spinner.tsx` before writing. Also read any `components/ui/number-flow.tsx` analog for Spinner props.

- [ ] **Step 1: Read installed component APIs**

```bash
cat components/ui/confetti.tsx
cat components/ui/spinner.tsx
```

- [ ] **Step 2: Create Contact section**

Create `components/sections/Contact.tsx`:
```tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { contactSchema, type ContactFormData } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Confetti } from '@/components/ui/confetti'
import { Spinner } from '@/components/ui/spinner'
// Adjust imports per Step 1

type Status = 'idle' | 'loading' | 'success' | 'error'

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [showConfetti, setShowConfetti] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Failed')

      setStatus('success')
      setShowConfetti(true)
      reset()

      setTimeout(() => setShowConfetti(false), 4000)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="kontakt" className="bg-[var(--color-surface-1)] py-24 px-4 relative overflow-hidden">
      {/* NOTE: Confetti usage below is a placeholder only.
          The actual magicui/confetti API must be read in Step 1 before using.
          It is likely a hook (useConfetti) or ref.fire() — NOT a positioned <div>.
          Replace this entire block based on what Step 1 reveals. */}
      {showConfetti && <Confetti />}

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-12"
        >
          {/* Form — 60% */}
          <div className="lg:col-span-3">
            <h2 className="text-4xl md:text-5xl font-black text-[var(--color-foreground)] mb-4">
              Porozmawiajmy<br />
              <span className="text-[var(--color-accent)]">o Twojej firmie.</span>
            </h2>
            <p className="text-[var(--color-muted)] mb-10">
              Wypełnij formularz, a odezwiemy się w ciągu 24 godzin.
            </p>

            <AnimatePresence>
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 rounded-xl p-8 text-center"
                >
                  <div className="text-4xl mb-3">✦</div>
                  <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-2">
                    Wiadomość wysłana!
                  </h3>
                  <p className="text-[var(--color-muted)]">
                    Odezwiemy się do Ciebie w ciągu 24 godzin roboczych.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label className="text-[var(--color-foreground)] mb-2 block text-sm">
                        Imię i nazwisko *
                      </Label>
                      <Input
                        {...register('name')}
                        placeholder="Jan Kowalski"
                        className="bg-[var(--color-surface-2)] border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-[var(--color-foreground)] mb-2 block text-sm">
                        Nazwa firmy *
                      </Label>
                      <Input
                        {...register('company')}
                        placeholder="Firma ABC Sp. z o.o."
                        className="bg-[var(--color-surface-2)] border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]"
                      />
                      {errors.company && (
                        <p className="text-red-400 text-xs mt-1">{errors.company.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label className="text-[var(--color-foreground)] mb-2 block text-sm">
                        Adres e-mail *
                      </Label>
                      <Input
                        {...register('email')}
                        type="email"
                        placeholder="jan@firma.pl"
                        className="bg-[var(--color-surface-2)] border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-[var(--color-foreground)] mb-2 block text-sm">
                        Telefon
                      </Label>
                      <Input
                        {...register('phone')}
                        type="tel"
                        placeholder="+48 123 456 789"
                        className="bg-[var(--color-surface-2)] border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-[var(--color-foreground)] mb-2 block text-sm">
                      Wiadomość
                    </Label>
                    <Textarea
                      {...register('message')}
                      placeholder="Opcjonalnie — napisz coś o swojej firmie lub zapytaj o szczegóły."
                      rows={4}
                      className="bg-[var(--color-surface-2)] border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-400 text-sm">
                      Coś poszło nie tak. Spróbuj ponownie lub napisz bezpośrednio na e-mail.
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full sm:w-auto bg-[var(--color-accent)] text-[#0C0C0F] font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                  >
                    {status === 'loading' ? (
                      <>
                        <Spinner className="w-4 h-4" />
                        Wysyłanie...
                      </>
                    ) : (
                      'Wyślij zapytanie'
                    )}
                  </Button>
                </form>
              )}
            </AnimatePresence>
          </div>

          {/* Contact info — 40% */}
          <div className="lg:col-span-2 flex flex-col gap-6 pt-2">
            <div>
              <p className="text-[var(--color-muted)] text-sm uppercase tracking-widest mb-2 font-mono">
                Telefon
              </p>
              <a
                href="tel:+48000000000"
                className="text-2xl font-bold text-[var(--color-foreground)] hover:text-[var(--color-accent)] transition-colors"
              >
                +48 000 000 000
              </a>
            </div>

            <div>
              <p className="text-[var(--color-muted)] text-sm uppercase tracking-widest mb-2 font-mono">
                E-mail
              </p>
              <a
                href="mailto:kontakt@starvend.pl"
                className="text-xl font-bold text-[var(--color-foreground)] hover:text-[var(--color-accent)] transition-colors"
              >
                kontakt@starvend.pl
              </a>
            </div>

            <div>
              <p className="text-[var(--color-muted)] text-sm uppercase tracking-widest mb-2 font-mono">
                Obszar działania
              </p>
              <p className="text-[var(--color-foreground)] font-medium">
                Obsługujemy województwo X i Y
              </p>
              <p className="text-[var(--color-muted)] text-sm mt-1">
                — do uzupełnienia przez klienta
              </p>
            </div>

            <div className="mt-auto p-6 bg-[var(--color-surface-2)] rounded-xl border border-[var(--color-border)]">
              <p className="text-[var(--color-accent)] font-mono text-sm mb-1">24h</p>
              <p className="text-[var(--color-foreground)] font-semibold">
                Czas odpowiedzi na zapytanie
              </p>
              <p className="text-[var(--color-muted)] text-sm mt-1">
                Odpowiadamy w kolejny dzień roboczy.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add to page.tsx and verify**

Add `<Contact />` after `<FAQ />`.

```bash
npm run dev
```

Before testing the form end-to-end, create `.env.local` in the project root:
```
RESEND_API_KEY=re_xxxxxxxxxxxx
```
(Use your real Resend API key. `.env.local` is gitignored by default.)

Verify: split layout renders, form fields visible, submit button shows spinner when submitting. Success state with confetti when form submitted (e-mail should arrive in inbox if `RESEND_API_KEY` is valid and sender domain is verified).

- [ ] **Step 4: Commit**

```bash
git add components/sections/Contact.tsx app/page.tsx
git commit -m "feat: add Contact section with form, Confetti, and Spinner"
```

---

## Task 16: Footer section

**Files:**
- Create: `components/sections/Footer.tsx`

> Read `components/ui/footer-taped-design.tsx` (or similar filename) before writing.

- [ ] **Step 1: Read installed component API**

```bash
ls components/ui/ | grep -i footer
cat components/ui/footer-taped-design.tsx 2>/dev/null || cat components/ui/footer.tsx 2>/dev/null
```

- [ ] **Step 2: Create Footer section**

Create `components/sections/Footer.tsx`:
```tsx
import { FooterTapedDesign } from '@/components/ui/footer-taped-design'
// Adjust import per Step 1

const footerLinks = [
  { label: 'Oferta', href: '#oferta' },
  { label: 'Jak to działa', href: '#jak-to-dziala' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Kontakt', href: '#kontakt' },
]

export function Footer() {
  return (
    <FooterTapedDesign
      logo={
        <span className="font-black text-xl">
          STARVEND <span className="text-[var(--color-accent)]">✦</span>
        </span>
      }
      tagline="Twój automat. Nasz serwis."
      links={footerLinks}
      copyright="© 2026 Starvend. Wszelkie prawa zastrzeżone."
      // Adjust props per Step 1
    />
  )
}
```

> **Adaptation required:** The Footer Taped Design may have a completely different prop API — read the component source and adapt accordingly. The key content to include: logo, tagline, navigation links, copyright.

- [ ] **Step 3: Add to page.tsx and verify**

Add `<Footer />` after `<Contact />`.

```bash
npm run dev
```

Verify: footer renders with logo, tagline, links, and copyright.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Footer.tsx app/page.tsx
git commit -m "feat: add Footer section with Footer Taped Design"
```

---

## Task 17: Compose final page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace page.tsx with final composition**

Replace `app/page.tsx`:
```tsx
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
```

- [ ] **Step 2: Full visual walkthrough**

```bash
npm run dev
```

Scroll through the entire page top to bottom and verify:
- [ ] Navbar sticky at top
- [ ] Hero: heading, subheadline, two CTAs, snacks floating
- [ ] Machine reveal on scroll
- [ ] 4-step stepper
- [ ] 3 offer cards with spotlight effect
- [ ] WhyUs on accent background, stats animated, 6 feature cards
- [ ] FAQ accordion working
- [ ] Contact form with validation
- [ ] Footer

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: compose final one-page layout with all sections"
```

---

## Task 18: Add images to public/

**Files:**
- Create: `public/images/machine.jpg`
- Create: `public/images/snack-*.jpg` (5 files)

- [ ] **Step 1: Copy product images into project**

Copy all 6 image files provided by the client into `public/images/`. Use exact filenames as defined in the spec:

```
public/images/machine.jpg
public/images/snack-cookie-clear.jpg
public/images/snack-cookie-orange.jpg
public/images/snack-bag-red.jpg
public/images/snack-can-blue.jpg
public/images/snack-bar-caramel.jpg
```

- [ ] **Step 2: Verify images load**

```bash
npm run dev
```

Open `http://localhost:3000` and verify:
- Hero floating snacks are visible (mix-blend-mode: screen applied — white backgrounds disappear)
- Machine image loads in scroll section
- No 404 errors in browser console for any image

- [ ] **Step 3: Create placeholder OG image**

Create a simple placeholder at `public/og-image.png` — 1200×630px, dark background. Use any image editor or the following command if ImageMagick is available:

```bash
convert -size 1200x630 xc:#0C0C0F \
  -font Helvetica-Bold -pointsize 80 -fill '#C8F135' \
  -gravity Center -annotate 0 'STARVEND ✦' \
  -font Helvetica -pointsize 32 -fill '#F0EFE9' \
  -annotate +0+80 'Automaty vendingowe dla firm' \
  public/og-image.png 2>/dev/null || echo "ImageMagick not available — create og-image.png manually (1200x630px)"
```

If ImageMagick isn't available, create `public/og-image.png` manually using Figma, Canva, or any image editor.

- [ ] **Step 4: Commit**

```bash
git add public/
git commit -m "feat: add product images and OG image"
```

---

## Task 19: Production build verification

**Files:** None (verification only)

- [ ] **Step 1: Run full test suite**

```bash
npm test
```

Expected: all 10 tests PASS.

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: build completes without errors. Note any warnings about missing `RESEND_API_KEY` — these are expected in build context.

- [ ] **Step 3: Preview production build**

```bash
npm run start
```

Open `http://localhost:3000`. Full visual check same as Task 17 Step 2. Stop server.

- [ ] **Step 4: Fix any build errors before proceeding**

If TypeScript errors exist, fix them. Do not proceed to deploy with a failing build.

---

## Task 20: Deploy to Vercel

**Files:**
- Create: `.env.local` (gitignored, for local Resend testing)

> **Note:** The Vercel CLI is outdated (44.7.3). Upgrade before deploying: `npm i -g vercel@latest`

- [ ] **Step 1: Upgrade Vercel CLI**

```bash
npm i -g vercel@latest
vercel --version
```

- [ ] **Step 2: Create .env.local for local testing**

Create `.env.local`:
```
RESEND_API_KEY=re_xxxxxxxxxxxx
```

Verify `.env.local` is in `.gitignore` (Next.js adds this by default).

- [ ] **Step 3: Link project to Vercel**

```bash
vercel link
```

Follow prompts: create new project, name it `starvend`.

- [ ] **Step 4: Add RESEND_API_KEY to Vercel**

```bash
vercel env add RESEND_API_KEY
```

Enter the production Resend API key when prompted. Add for: Production, Preview, Development.

- [ ] **Step 5: Deploy to preview**

```bash
vercel
```

Expected: preview URL returned, e.g. `https://starvend-xyz.vercel.app`. Open it and verify all sections load correctly.

- [ ] **Step 6: Deploy to production**

```bash
vercel --prod
```

Expected: production URL returned. Verify the site works end-to-end including the contact form (submit a test inquiry and verify email arrives in Starvend inbox).

- [ ] **Step 7: Final commit**

```bash
git add .vercel/
git commit -m "chore: add Vercel project config"
```

---

## Post-deploy checklist

### 🔴 BLOCKING — must be done before contact form works in production

- [ ] **Verify Resend sender domain** (`starvend.pl`) in the Resend dashboard → DNS → add required TXT/DKIM records. Without this, every contact form submission returns 500 and no email is sent.
- [ ] Replace `kontakt@starvend.pl` in Resend `to:` address in `app/api/contact/route.ts` with the real inbox
- [ ] Replace `formularz@starvend.pl` in Resend `from:` field with a verified sender address on the verified domain

### 🟡 Required before launch (content placeholders)

- [ ] Replace `+48 000 000 000` placeholder phone in `components/sections/Contact.tsx`
- [ ] Replace `kontakt@starvend.pl` placeholder email shown to visitors in `components/sections/Contact.tsx`
- [ ] Replace `Obsługujemy województwo X i Y` with real service area
- [ ] Confirm or adjust animated statistics (`200+`, `500+`, `24h`) in `components/sections/WhyUs.tsx`

### 🟢 Nice-to-have post-launch

- [ ] Provide real testimonials to unlock `components/sections/Testimonials.tsx`
- [ ] Replace `og-image.png` with designed OG image if created with placeholder

---

*Spec reference: `docs/superpowers/specs/2026-03-22-starvend-website-design.md`*
