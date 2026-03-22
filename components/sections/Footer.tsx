import Link from 'next/link'

const navLinks = [
  { label: 'Oferta', href: '#oferta' },
  { label: 'Jak to działa', href: '#jak-to-dziala' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Kontakt', href: '#kontakt' },
]

export function Footer() {
  return (
    <footer className="bg-[var(--color-background)] border-t border-[var(--color-border)] py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="text-3xl font-black text-[var(--color-accent)] tracking-tight cursor-pointer"
            style={{ fontFamily: 'var(--font-fredoka)' }}
          >
            StarVend <span className="text-[var(--color-foreground)]">✦</span>
          </Link>
          <p className="text-[var(--color-muted)] text-sm font-medium">
            Twój automat. Nasz serwis.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors text-sm font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-[var(--color-border)]">
        <p className="text-[var(--color-muted)] text-sm">
          © 2026 Starvend. Wszelkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  )
}
