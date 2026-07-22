# Brief per l'integrazione dei video di sezione

Contesto per l'agente (Antigravity o altro): questo repo è un sito one-page
React + Vite + Tailwind + framer-motion, con smooth scroll gestito da Lenis in
`client/src/App.tsx`.

## Cosa esiste già

- **`client/src/components/SectionVideo.tsx`** — componente pronto all'uso che
  riproduce un video in loop muto (`playsinline`), lo avvia solo quando entra
  nel viewport (IntersectionObserver) e lo mette in pausa quando esce. Fade-in
  identico al componente `Reveal` esistente. Se il file video manca, non
  renderizza nulla.
- **`client/public/assets/videos/`** — cartella dei video, con README che
  documenta i nomi attesi (`01-hero.mp4` … `07-contatti.mp4`).

## Compito

Integrare un `<SectionVideo />` in ciascuna delle 7 sezioni, nell'ordine
definito in `App.tsx`:

| Sezione (componente in `client/src/components/sections/`) | Video |
| --- | --- |
| `Hero.tsx` | `01-hero` |
| `Services.tsx` | `02-servizi` |
| `CerberoShowcase.tsx` | `03-cerbero` |
| `WhyMe.tsx` | `04-perche-io` |
| `Timeline.tsx` | `05-timeline` |
| `Process.tsx` | `06-processo` |
| `Contact.tsx` | `07-contatti` |

Esempio d'uso: `<SectionVideo name="03-cerbero" className="max-w-3xl mx-auto" />`

## Vincoli (importanti)

1. **Non modificare layout e struttura esistenti** delle sezioni: il video si
   aggiunge come elemento decorativo/di sfondo o accanto al contenuto, senza
   ridisegnare nulla.
2. **Non toccare Lenis** né la logica di scroll in `App.tsx`.
3. Non duplicare la logica video: usare sempre `SectionVideo`, estendendolo con
   nuove prop se serve (es. object-fit, posizionamento assoluto per uso a
   sfondo) invece di scrivere nuovi tag `<video>`.
4. I video hanno sfondo bianco quasi puro: verificare visivamente che si
   fondano con lo sfondo del sito; se c'è stacco, valutare
   `mix-blend-mode: multiply` sul video (in light mode) prima di altre
   soluzioni.
5. Tema scuro: il sito ha un `ThemeToggle`. Su sfondo scuro un video bianco
   stacca molto — decidere consapevolmente se mostrarlo dentro una card
   chiara/arrotondata (accettabile) o nasconderlo in dark mode.
