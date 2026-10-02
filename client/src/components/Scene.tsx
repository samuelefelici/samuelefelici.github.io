import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scena "pinned" per lo scrollytelling: la sezione occupa un binario di
 * scroll alto `heightVh` vh, ma quello che si vede è uno schermo sticky
 * fermo — a scorrere è solo il progresso (0→1), lo stesso che guida il
 * video di sfondo in ScrollVideoLayer.
 *
 * Coreografia del contenuto: qualsiasi discendente con `data-from`/`data-to`
 * (frazioni 0..1 del progresso della scena) viene mostrato solo in quel
 * intervallo, con fade + slide di entrata e uscita. Gli stili vengono
 * applicati direttamente in requestAnimationFrame, senza re-render React.
 * Non annidare un elemento data-from dentro un altro.
 *
 * Le fasi nascoste restano nel flusso di tastiera e lettori di schermo: se il
 * focus finisce dentro una fase non visibile, la pagina scorre fino a lì.
 */
export function Scene({
  id,
  heightVh,
  className,
  rail,
  fade = 0.07,
  children,
}: {
  id: string;
  heightVh: number;
  className?: string;
  /** elementi posizionati lungo il binario di scroll (fuori dallo schermo
   *  sticky), es. ancore `#id` che portano a una fase precisa della scena */
  rail?: ReactNode;
  /** frazione di progresso usata per fade-in/out di ogni fase */
  fade?: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // con prefers-reduced-motion la coreografia resta attiva (senza di essa
    // le fasi sovrapposte delle scene sarebbero tutte visibili insieme), ma
    // gli elementi non slittano: solo dissolvenza
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-from]"));
    // promuovi subito gli item a layer compositor: evita la creazione di
    // layer a metà transizione, uno dei punti in cui l'animazione scatta
    for (const item of items) item.style.willChange = "opacity, transform";
    const FADE = fade;
    const SHIFT = reduced ? 0 : 44; // px di slide verticale in entrata/uscita
    let raf = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const r = el.getBoundingClientRect();
      // Progresso sull'INTERO ingombro della scena (-r.top/altezza), lo stesso
      // "orologio" con cui ScrollVideoLayer muove il video: così la frazione
      // di una card (data-from/to) corrisponde esattamente al momento del
      // video. La scena è a schermo pieno (pinnata) fino a ~(altezza-vh)/
      // altezza; le card vanno quindi temporizzate entro quella finestra.
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));

      for (const item of items) {
        const from = parseFloat(item.dataset.from ?? "0");
        const to = parseFloat(item.dataset.to ?? "1");
        let opacity: number;
        let y: number;
        if (p < from) {
          opacity = 0;
          y = SHIFT;
        } else if (p > to) {
          opacity = 0;
          y = -SHIFT;
        } else {
          // from <= 0 → l'elemento è già pieno a inizio scena (nessun
          // fade-in dal nulla): così l'Hero è leggibile subito all'apertura,
          // senza mostrare solo lo sfondo video
          const tIn = from <= 0 ? 1 : Math.min(1, (p - from) / FADE);
          const tOut = Math.min(1, (to - p) / FADE);
          opacity = Math.min(tIn, tOut);
          y = (1 - tIn) * SHIFT - (1 - tOut) * SHIFT;
        }
        item.style.opacity = opacity.toFixed(3);
        item.style.transform = `translateY(${y.toFixed(1)}px)`;
        // gli elementi nascosti non devono intercettare i click di quelli
        // visibili (ma restano raggiungibili da tastiera, vedi onFocusIn)
        item.style.pointerEvents = opacity < 0.02 ? "none" : "";
      }
    };

    // focus da tastiera dentro una fase non visibile: porta la scena al
    // centro di quella fase (i click non arrivano qui: pointer-events none)
    const onFocusIn = (e: FocusEvent) => {
      const item = (e.target as HTMLElement).closest<HTMLElement>("[data-from]");
      if (!item || !el.contains(item) || parseFloat(item.style.opacity || "1") > 0.5) return;
      const from = parseFloat(item.dataset.from ?? "0");
      const to = parseFloat(item.dataset.to ?? "1");
      const r = el.getBoundingClientRect();
      window.scrollTo({ top: window.scrollY + r.top + ((from + to) / 2) * r.height, behavior: "instant" });
    };
    el.addEventListener("focusin", onFocusIn);

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("focusin", onFocusIn);
    };
  }, [fade]);

  return (
    <section id={id} ref={ref} style={{ height: `${heightVh}vh` }} className="relative">
      {rail}
      {/* svh: sui telefoni lo schermo pinnato non finisce sotto la barra del
          browser; overflow clip: il focus non può far scorrere il riquadro */}
      <div
        className={`sticky top-0 h-screen overflow-hidden supports-[height:100svh]:h-svh supports-[overflow:clip]:overflow-clip ${className ?? ""}`}
      >
        {children}
      </div>
    </section>
  );
}
