import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { type Project, type Shot, shotSrc, shotSrcSet, ASSET_V } from "@/components/sections/projects-data";

/**
 * Variabili CSS del marchio: --brand (accenti), --brand-ink (testo su chiaro)
 * e --brand-ink-dark (testo su scuro, di default il colore del marchio).
 */
export const brandVars = (p: Project) =>
  ({ "--brand": p.color, "--brand-ink": p.ink, "--brand-ink-dark": p.inkDark ?? p.color }) as CSSProperties;

/**
 * Logo del prodotto (decorativo: sta sempre accanto al nome). Se il marchio
 * ha una variante per il tema scuro le monta entrambe e il CSS mostra quella
 * giusta; i marchi pensati per un solo fondo stanno su una piastrina (chiara
 * o scura) in entrambi i temi.
 */
export function ProjectLogo({ p, className }: { p: Project; className?: string }) {
  const size = className ?? p.logo.className ?? "h-12";
  const img = (src: string, extra = "") => (
    <img
      src={`${src}?v=${ASSET_V}`}
      alt=""
      loading="lazy"
      decoding="async"
      className={`block w-auto object-contain ${size} ${extra}`}
    />
  );
  const mark = p.logo.dark ? (
    <>
      {img(p.logo.src, "dark:hidden")}
      {img(p.logo.dark, "hidden dark:block")}
    </>
  ) : (
    img(p.logo.src, p.logo.plate ? "" : "drop-shadow-md")
  );
  if (!p.logo.plate) return <span className="inline-flex shrink-0">{mark}</span>;
  return (
    <span
      className={`inline-flex shrink-0 rounded-xl px-2.5 py-1.5 shadow-sm ring-1 ${
        p.logo.plate === "dark" ? "bg-[#0f1115] ring-white/10" : "bg-white ring-black/5"
      }`}
    >
      {mark}
    </span>
  );
}

/** Schermata dentro una cornice da telefono. */
export function PhoneFrame({ shot, className, sizes }: { shot: Shot; className?: string; sizes?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-[1.9rem] border-[5px] border-neutral-900 bg-neutral-900 shadow-2xl ring-1 ring-white/10 ${className ?? ""}`}
    >
      <img
        src={shotSrc(shot, shot.sizes[0])}
        srcSet={shotSrcSet(shot)}
        sizes={sizes ?? "260px"}
        alt={shot.alt}
        loading="lazy"
        decoding="async"
        style={{ aspectRatio: shot.ratio }}
        className="block w-full h-auto rounded-[1.45rem]"
      />
    </div>
  );
}

/** Schermata dentro una cornice da tablet di bordo. */
export function TabletFrame({ shot, className, sizes }: { shot: Shot; className?: string; sizes?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-[1.6rem] border-[10px] border-neutral-900 bg-neutral-900 shadow-2xl ring-1 ring-white/10 ${className ?? ""}`}
    >
      <img
        src={shotSrc(shot, shot.sizes[0])}
        srcSet={shotSrcSet(shot)}
        sizes={sizes ?? "(min-width: 1024px) 55vw, 92vw"}
        alt={shot.alt}
        loading="lazy"
        decoding="async"
        style={{ aspectRatio: shot.ratio }}
        className="block h-auto w-full rounded-[0.9rem]"
      />
    </div>
  );
}

/** Schermata dentro una cornice da browser (tre pallini + titolo). */
export function BrowserFrame({
  shot,
  title,
  className,
  sizes,
}: {
  shot: Shot;
  title?: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-xl border border-border bg-card shadow-2xl ${className ?? ""}`}>
      <div className="flex items-center gap-1.5 border-b border-border bg-secondary/50 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        {title && (
          <span className="ml-3 truncate font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {title}
          </span>
        )}
      </div>
      <img
        src={shotSrc(shot, shot.sizes[0])}
        srcSet={shotSrcSet(shot)}
        sizes={sizes ?? "(min-width: 1024px) 55vw, 92vw"}
        alt={shot.alt}
        loading="lazy"
        decoding="async"
        style={{ aspectRatio: shot.ratio }}
        className="block h-auto w-full"
      />
    </div>
  );
}

/**
 * Galleria a tutto schermo di un progetto: schermata grande con didascalia,
 * miniature, frecce (anche da tastiera e con lo swipe) e scheda tecnica.
 * Alla chiusura il focus torna al controllo che l'ha aperta (`openerRef`).
 */
export function ProjectGallery({
  project,
  startIndex,
  onClose,
  openerRef,
}: {
  project: Project | null;
  startIndex: number;
  onClose: () => void;
  openerRef: RefObject<HTMLElement | null>;
}) {
  const [index, setIndex] = useState(startIndex);
  useEffect(() => setIndex(startIndex), [project, startIndex]);
  const touchX = useRef<number | null>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const p = project;
  const n = p?.shots.length ?? 0;
  const go = (d: number) => setIndex((i) => (i + d + n) % n);
  // al cambio progetto l'indice si riallinea un render dopo: mai fuori range
  const cur = Math.min(index, n - 1);
  const shot = p?.shots[cur];
  // larghezza della schermata grande: limitata dalla colonna e da 60vh × proporzioni,
  // così ha già la sua altezza prima che l'immagine arrivi (le frecce non saltano)
  const maxW = shot ? `${(60 * shot.ratio).toFixed(2)}vh` : "100%";

  return (
    <Dialog open={!!p} onOpenChange={(o) => !o && onClose()}>
      {p && shot && (
        <DialogContent
          data-lenis-prevent
          style={brandVars(p)}
          className="max-h-[94vh] w-[calc(100vw-1.5rem)] max-w-6xl gap-0 overflow-y-auto p-0 supports-[height:100dvh]:max-h-[94dvh] sm:rounded-2xl"
          onOpenAutoFocus={(e) => {
            if (nextRef.current) {
              e.preventDefault();
              nextRef.current.focus();
            }
          }}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            openerRef.current?.focus({ preventScroll: true });
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
          }}
        >
          {/* intestazione */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border py-4 pl-5 pr-14 md:pl-7">
            <ProjectLogo p={p} className="h-9 md:h-10" />
            <div className="min-w-[13rem] flex-1">
              <DialogTitle className="font-heading text-lg font-bold leading-tight md:text-xl">{p.name}</DialogTitle>
              <DialogDescription className="text-sm text-[color:var(--brand-ink)] dark:text-[color:var(--brand-ink-dark)]">
                {p.tagline}
              </DialogDescription>
            </div>
          </div>

          {/* schermata grande (swipe orizzontale per cambiarla) */}
          <div
            className="relative bg-secondary/40 px-4 py-5 md:px-14 md:py-7"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null || n < 2) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              touchX.current = null;
              if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{ background: `radial-gradient(60% 70% at 50% 40%, ${p.color}33, transparent 70%)` }}
            />
            <div className="relative flex justify-center">
              {shot.kind === "mobile" ? (
                <PhoneFrame
                  key={shot.file}
                  shot={shot}
                  sizes="(min-width: 768px) 300px, 60vw"
                  className="w-[min(60vw,calc(58vh*0.46))]"
                />
              ) : (
                <img
                  key={shot.file}
                  src={shotSrc(shot, shot.sizes[1])}
                  srcSet={shotSrcSet(shot)}
                  sizes={`min(1060px, 96vw, ${maxW})`}
                  alt={shot.alt}
                  decoding="async"
                  style={{ aspectRatio: shot.ratio, width: `min(100%, ${maxW})` }}
                  className="block h-auto max-h-[60vh] max-w-full rounded-lg border border-border shadow-2xl"
                />
              )}
            </div>
            {n > 1 && (
              // sotto md le frecce stanno in riga sotto la schermata, da md in su ai lati
              <div className="relative mt-4 flex justify-center gap-3 md:static md:mt-0">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Schermata precedente"
                  className="rounded-full border border-border bg-background/85 p-2.5 shadow-lg backdrop-blur transition hover:bg-background md:absolute md:left-4 md:top-1/2 md:-translate-y-1/2"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  ref={nextRef}
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Schermata successiva"
                  className="rounded-full border border-border bg-background/85 p-2.5 shadow-lg backdrop-blur transition hover:bg-background md:absolute md:right-4 md:top-1/2 md:-translate-y-1/2"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          {/* didascalia + miniature */}
          <div className="border-b border-border px-5 py-4 md:px-7">
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm leading-relaxed text-foreground md:text-base" aria-live="polite">
                {shot.caption}
              </p>
              <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
                {cur + 1} / {n}
              </span>
            </div>
            {n > 1 && (
              <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                {p.shots.map((s, i) => (
                  <button
                    key={s.file}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Mostra: ${s.alt}`}
                    aria-current={i === cur}
                    className={`shrink-0 overflow-hidden rounded-md border-2 transition ${
                      i === cur ? "border-[color:var(--brand)]" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={shotSrc(s, s.sizes[0])}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className={`block h-14 w-auto object-cover object-top md:h-16 ${s.kind === "mobile" ? "max-w-[2.5rem] md:max-w-[3rem]" : ""}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* scheda tecnica */}
          <div className="grid gap-8 px-5 py-6 md:grid-cols-[1.4fr_1fr] md:px-7">
            <div>
              <p className="leading-relaxed text-muted-foreground">{p.description}</p>
              <ul className="mt-5 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm leading-relaxed">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--brand)]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              {p.stats && p.stats.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {p.stats.map((s) => (
                    <div key={s.label} className="rounded-xl border border-border bg-secondary/30 p-3">
                      <div className="font-mono text-xl font-bold tabular-nums text-[color:var(--brand-ink)] dark:text-[color:var(--brand-ink-dark)]">
                        {s.value}
                      </div>
                      <div className="mt-0.5 text-xs leading-snug text-muted-foreground">{s.label}</div>
                    </div>
                  ))}
                </div>
              )}
              {p.modules && (
                <div>
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Moduli</p>
                  <div className="space-y-3">
                    {p.modules.map((m) => (
                      <div key={m.name} className="flex items-start gap-3">
                        <img src={`${m.logo}?v=3`} alt="" loading="lazy" className="h-9 w-14 shrink-0 object-contain" />
                        <div>
                          <p
                            className="text-sm font-semibold text-[color:var(--m-ink)] dark:text-[color:var(--m)]"
                            style={{ "--m": m.color, "--m-ink": m.ink } as CSSProperties}
                          >
                            {m.name}
                          </p>
                          <p className="text-xs leading-relaxed text-muted-foreground">{m.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Stack</p>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              {p.note && <p className="text-xs leading-relaxed text-muted-foreground">{p.note}</p>}
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
