# Starvend — Specyfikacja projektu strony internetowej

**Data:** 2026-03-22
**Typ projektu:** Strona wizytówka B2B (one-page landing)
**Język treści:** Polski
**Deploy:** Vercel

---

## 1. Cel i kontekst

Starvend to firma obsługująca automaty vendingowe z przekąskami i zimnymi napojami. Firma nie produkuje maszyn — ustawia je w wyznaczonych miejscach, zaopatruje i serwisuje. Strona ma pełnić rolę wizytówki B2B skierowanej do firm, instytucji i zakładów pracy (biura, fabryki, szpitale, uczelnie), które chcą udostępnić maszynę vendingową swoim pracownikom.

**Główny cel konwersji:** Skłonienie potencjalnego klienta do nawiązania kontaktu — formularz, telefon lub e-mail.

---

## 2. Architektura techniczna

### Stack
- **Framework:** Next.js 16 (App Router, SSG)
- **UI komponenty:** shadcn/ui + komponenty z 21st.dev (instalowane przez `npx shadcn@latest add "https://21st.dev/r/..."`)
- **Stylowanie:** Tailwind CSS v4
- **Typografia:** Geist (via `next/font/local`) — Sans dla UI, Mono dla akcentów numerycznych
- **Animacje:** Framer Motion
- **Formularze:** React Hook Form + Zod
- **E-mail:** Resend (Route Handler `/api/contact`)
- **Deploy:** Vercel (statyczny SSG + 1 serverless function)

### Struktura plików
```
app/
  page.tsx                    ← główna strona (one-page)
  layout.tsx                  ← root layout z metadanymi
  api/
    contact/
      route.ts                ← Route Handler — wysyłka e-maila przez Resend
components/
  sections/
    Navbar.tsx
    Hero.tsx
    HowItWorks.tsx
    Offer.tsx
    WhyUs.tsx
    Testimonials.tsx
    FAQ.tsx
    Contact.tsx
    Footer.tsx
  ui/                         ← shadcn/ui + 21st.dev komponenty
lib/
  validations.ts              ← Zod schema formularza kontaktowego
public/
  images/
    machine.jpg               ← zdjęcie maszyny vendingowej
    snack-cookie-clear.jpg    ← ciastko w przezroczystej folii
    snack-cookie-orange.jpg   ← pomarańczowa paczka ciastek
    snack-bag-red.jpg         ← czerwona torebka
    snack-can-blue.jpg        ← puszka z lodem
    snack-bar-caramel.jpg     ← batonik z karmelem
```

### Renderowanie
Cała strona jest generowana statycznie (SSG). Jedynym dynamicznym elementem jest Route Handler `/api/contact` obsługujący formularz kontaktowy przez Resend.

---

## 3. Design system

### Paleta kolorów
| Token | Wartość | Zastosowanie |
|---|---|---|
| `--background` | `#0C0C0F` | Główne tło strony |
| `--surface-1` | `#141418` | Tła kart, sekcji |
| `--surface-2` | `#1C1C22` | Hover, zagnieżdżone tła |
| `--accent` | `#C8F135` | Główny akcent — CTA, wyróżnienia, liczby |
| `--foreground` | `#F0EFE9` | Tekst główny |
| `--muted` | `#8A8A9A` | Tekst drugorzędny (wyłącznie dekoracyjny — daty, etykiety, podpisy; nigdy ciało tekstu ani ważne informacje) |
| `--border` | `#2A2A35` | Obramowania |

**Uwaga:** Kolor akcentu `#C8F135` (elektryczna limonka) celowo nawiązuje do zielonego panelu maszyny vendingowej na zdjęciu — wzmacnia spójność wizualną marki.

### Typografia
- **Geist Sans Black/Bold** — nagłówki, do 100px na desktopie
- **Geist Sans Regular/Medium** — ciało tekstu
- **Geist Mono** — akcenty numeryczne, kody, statystyki
- Nagłówki łamane na dwie linie jako element graficzny (editorial style)

### Motyw graficzny
- Gwiazda (✦) jako znak interpunkcyjny marki w logo i nagłówkach
- Subtelna grain texture (CSS lub SVG filter, 2% opacity) na głównym tle
- `mix-blend-mode: screen` na wszystkich zdjęciach produktowych — eliminuje białe tło na ciemnej powierzchni
- Jeden sekcja z odwróceniem kolorów (accent tło `#C8F135` + ciemny tekst) dla wizualnego przełamania rytmu

---

## 4. Sekcje strony

### 4.1 Nawigacja
**Komponent 21st.dev:** Tubelight Navbar (`ayushmxxn/tubelight-navbar`)

- Sticky top, przezroczyste tło z blur przy scrollu
- Logo lewo: `STARVEND ✦`
- Linki: `Oferta` · `Jak to działa` · `Dlaczego my` · `FAQ` · `Kontakt`
- CTA prawo: przycisk `Zapytaj o wycenę` (accent fill)
- Mobile: hamburger → Sheet z drawer

---

### 4.2 Hero
**Komponenty 21st.dev:**
- Shape Landing Hero (`kokonutd/shape-landing-hero`) — tło z floating shapes
- Container Scroll Animation (`aceternity/container-scroll-animation`) — scroll-triggered reveal maszyny

**Układ:**
- Pierwsza część (above the fold): Shape Landing Hero z 5 zdjęciami snacków jako floating shapes (zamiast geometrycznych kształtów), efekt `mix-blend-mode: screen`
- Nagłówek H1 (2 linie, 80–100px):
  > *"Maszyna vendingowa*
  > *w Twojej firmie."*
- Subheadline: *"Montaż, serwis i uzupełnianie w jednym pakiecie — bezpłatnie."*
- CTA primary: `[Zapytaj o wycenę]` — Particle Button (`kokonutd/particle-button`) z mini snack particles zamiast kulek
- CTA secondary: `[Jak to działa →]` — Liquid Glass Button (`aliimam/liquid-glass-button`)
- Kontynuacja przy scrollu: Container Scroll Animation z zdjęciem maszyny vendingowej (efekt 3D "zjazdowego" reveal). Tło sekcji: `#0C0C0F` (identyczne z głównym tłem) — zapewnia poprawne działanie `mix-blend-mode: screen` na zdjęciu maszyny bez artefaktów kolorystycznych.

---

### 4.3 Jak to działa
**Układ:** 4-krokowy horizontal stepper (desktop) / vertical (mobile)

**Tło:** ciemna sekcja `--surface-1`, numery kroków w kolorze `--accent`

**Kroki:**
1. **Kontakt** — Napisz lub zadzwoń. Omówimy Twoje potrzeby i liczbę pracowników.
2. **Wycena & lokalizacja** — Dobierzemy model maszyny i ustalimy miejsce ustawienia.
3. **Montaż** — Przywozimy, instalujemy i uruchamiamy. Zero formalności po Twojej stronie.
4. **Serwis & uzupełnianie** — Regularnie uzupełniamy asortyment i dbamy o sprawność techniczną.

---

### 4.4 Oferta
**Komponent 21st.dev:** Spotlight Card (`easemize/spotlight-card`) — border glow effect w kolorach marki

**3 karty:**

| Karta | Tytuł | Opis |
|---|---|---|
| 🥤 | Automaty na napoje | Zimne napoje, woda, soki, energetyki — zawsze schłodzone i gotowe. |
| 🍫 | Automaty na przekąski | Chipsy, batony, ciastka, orzechy — bogaty wybór na każdą chwilę. |
| 🔄 | Combo — napoje + przekąski | Jeden automat, pełna oferta. Idealne dla mniejszych przestrzeni. |

---

### 4.5 Dlaczego Starvend
**Komponent 21st.dev:** Features-8 (`tailark/features-8`)

**Tło sekcji:** `#C8F135` (akcent) z ciemnym tekstem `#0C0C0F` — pełne odwrócenie kolorów

**Wyróżniki (z ikonami):**
- ✦ **Bezpłatny montaż** — nie ponosisz żadnych kosztów instalacji
- ✦ **Regularny serwis** — uzupełniamy zanim skończy się asortyment
- ✦ **Brak umowy na czas określony** — elastyczna współpraca
- ✦ **Lokalny operator** — szybka reakcja, znajomość rynku
- ✦ **Personalizowany asortyment** — dostosowujemy wybór produktów do preferencji Twoich pracowników
- ✦ **Bezawaryjność** — serwis techniczny w całości po naszej stronie

**Statystyki animowane (Number Flow `barvian/number-flow`):**
*Uwaga: wartości poniżej to placeholdery — klient musi potwierdzić realne liczby przed go-live. Jeśli dane nie są dostępne, zalecane jest użycie mniejszych pewnych liczb lub całkowite pominięcie statystyk.*
- `200+` zadowolonych firm *(do potwierdzenia przez klienta)*
- `500+` obsługiwanych maszyn *(do potwierdzenia przez klienta)*
- `24h` czas reakcji serwisowej *(do potwierdzenia przez klienta)*
- `0 zł` koszt dla klienta *(pewne — wynika z modelu biznesowego)*

---

### 4.6 Opinie klientów
**Komponent 21st.dev:** Testimonials Columns (`efferd/testimonials-columns-1`)

**Treść (przykładowe opinie — placeholder do zastąpienia przez klienta przed go-live):**
*Polityka handoff: jeśli klient nie dostarczy prawdziwych opinii przed publikacją strony, sekcja Testimonials jest domyślnie ukryta (`hidden`) do czasu dostarczenia treści. Nie publikujemy fikcyjnych opinii jako prawdziwych.*

> *"Od kiedy Starvend zainstalował maszynę w naszym biurze, pracownicy przestali wychodzić po przekąski. Oszczędzamy czas i zwiększyliśmy komfort pracy."*
> — Anna K., HR Manager, firma produkcyjna

> *"Montaż zajął 2 godziny, a maszyna działa bez zarzutu od 8 miesięcy. Zero problemów, zero kontaktu w złych sprawach."*
> — Marek W., Office Manager

> *"Myślałem, że to skomplikowane. Okazało się, że podpisaliśmy umowę i następnego dnia maszyna stała na miejscu."*
> — Tomasz B., Dyrektor operacyjny

---

### 4.7 FAQ
**Komponent:** shadcn/ui Accordion

**Q&A:**
1. *Czy płacę za maszynę?* — Nie. Maszyna jest nasza — Ty tylko udostępniasz miejsce.
2. *Kto uzupełnia produkty?* — My. Regularnie monitorujemy stany i uzupełniamy bez Twojego angażowania.
3. *Co jeśli maszyna się zepsuje?* — Przyjeżdżamy i naprawiamy. Serwis techniczny leży po naszej stronie.
4. *Czy mogę wybrać produkty?* — Tak, asortyment ustalamy wspólnie i możemy go zmieniać.
5. *Dla jak dużej firmy to się opłaca?* — Już od 20–30 pracowników maszyna w pełni się sprawdza.
6. *Jak długo trwa montaż?* — Zazwyczaj do 2 godzin roboczych.

---

### 4.8 Kontakt
**Układ:** Split layout — formularz po lewej (60%), dane + mapa po prawej (40%)

**Nagłówek:**
> *"Porozmawiajmy o Twojej firmie."*
> Wypełnij formularz, a odezwiemy się w ciągu 24 godzin.

**Formularz (React Hook Form + Zod):**
- Imię i nazwisko (wymagane)
- Firma (wymagane)
- E-mail (wymagane, walidacja formatu)
- Telefon (opcjonalne)
- Wiadomość (opcjonalne, textarea)
- Submit: `[Wyślij zapytanie]` z Spinner (`haydenbleasel/spinner`) podczas wysyłki

**Po wysłaniu:** Confetti (`magicui/confetti`) + komunikat sukcesu inline. *Decyzja świadoma, zaakceptowana przez klienta — confetti jest krótkie i jednorazowe, po czym pojawia się stonowany komunikat sukcesu. Cel: pozytywne zamknięcie akcji bez przesady.*

**Backend:** Resend via Route Handler `/api/contact` — e-mail trafia na adres firmowy Starvend

**Dane boczne:**
- 📞 Numer telefonu — *do uzupełnienia przez klienta przed go-live; developer używa placeholdera `+48 000 000 000`*
- ✉️ Adres e-mail — *do uzupełnienia przez klienta przed go-live; developer używa placeholdera `kontakt@starvend.pl`*
- 📍 Obszar działania — *do uzupełnienia przez klienta; np. "Obsługujemy województwo X i Y"*

---

### 4.9 Stopka
**Komponent 21st.dev:** Footer Taped Design (`radu-activation-popescu/footer-taped-design`)

**Zawartość:**
- Logo `STARVEND ✦` + tagline: *"Twój automat. Nasz serwis."*
- Linki: Oferta · Jak to działa · FAQ · Kontakt
- Dane kontaktowe
- Copyright: `© 2026 Starvend. Wszelkie prawa zastrzeżone.`

---

## 5. Assety graficzne

| Plik | Zastosowanie | Uwagi |
|---|---|---|
| `machine.jpg` | Container Scroll Animation hero, sekcja scroll | `mix-blend-mode: screen` |
| `snack-cookie-clear.jpg` | Floating shape w Hero | `mix-blend-mode: screen` |
| `snack-cookie-orange.jpg` | Floating shape w Hero | `mix-blend-mode: screen` |
| `snack-bag-red.jpg` | Floating shape w Hero | `mix-blend-mode: screen` |
| `snack-can-blue.jpg` | Floating shape w Hero | `mix-blend-mode: screen` |
| `snack-bar-caramel.jpg` | Floating shape w Hero | `mix-blend-mode: screen` |

Wszystkie zdjęcia na białym tle — białe tło znika na ciemnym tle przez `mix-blend-mode: screen`.

---

## 6. Komponenty 21st.dev — lista instalacji

```bash
npx shadcn@latest add "https://21st.dev/r/ayushmxxn/tubelight-navbar"
npx shadcn@latest add "https://21st.dev/r/kokonutd/shape-landing-hero"
npx shadcn@latest add "https://21st.dev/r/aceternity/container-scroll-animation"
npx shadcn@latest add "https://21st.dev/r/kokonutd/particle-button"
npx shadcn@latest add "https://21st.dev/r/aliimam/liquid-glass-button"
npx shadcn@latest add "https://21st.dev/r/easemize/spotlight-card"
npx shadcn@latest add "https://21st.dev/r/tailark/features-8"
npx shadcn@latest add "https://21st.dev/r/barvian/number-flow"
npx shadcn@latest add "https://21st.dev/r/efferd/testimonials-columns-1"
npx shadcn@latest add "https://21st.dev/r/radu-activation-popescu/footer-taped-design"
npx shadcn@latest add "https://21st.dev/r/magicui/confetti"
npx shadcn@latest add "https://21st.dev/r/haydenbleasel/spinner"
```

---

## 7. Wymagania niefunkcjonalne

- **SEO:** meta title (`"Starvend — Automaty vendingowe dla firm | Montaż i serwis"`) + description (`"Starvend dostarcza i obsługuje automaty z przekąskami i napojami w firmach. Montaż, serwis i uzupełnianie bezpłatnie."`) + OG image statyczna (wymiary: 1200×630px, ciemne tło `#0C0C0F`, logo `STARVEND ✦` w centrum, subheadline poniżej, dekoracja ze snackami — renderowana jako plik `/public/og-image.png`)
- **Responsywność:** mobile-first, breakpointy: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- **Dostępność:** semantyczny HTML, aria-label na ikonach, kontrast min. 4.5:1
- **Wydajność:** SSG, next/image dla wszystkich zdjęć, next/font dla Geist, lazy loading sekcji poniżej foldu
- **Środowisko:** zmienna `RESEND_API_KEY` w Vercel Environment Variables

---

## 8. Out of scope

- Panel administracyjny / CMS
- Wielojęzyczność
- Blog
- Konta użytkowników / autentykacja
- Mapa lokalizacji maszyn
- System płatności
