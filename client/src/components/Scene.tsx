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
 * Con prefers-reduced-motion la coreografia è disattivata e tutto resta
 * visibile in flusso normale.
 */
export function Scene({
  id,
  heightVh,
  className,
  children,
}: {
  id: string;
  heightVh: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-from]"));
    const FADE = 0.07; // frazione di progresso usata per fade-in/out
    const SHIFT = 44; // px di slide verticale in entrata/uscita
    let raf = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - vh)));

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
          const tIn = Math.min(1, (p - from) / FADE);
          const tOut = Math.min(1, (to - p) / FADE);
          opacity = Math.min(tIn, tOut);
          y = (1 - tIn) * SHIFT - (1 - tOut) * SHIFT;
        }
        item.style.opacity = opacity.toFixed(3);
        item.style.transform = `translateY(${y.toFixed(1)}px)`;
        // gli elementi nascosti non devono intercettare i click di quelli visibili
        item.style.visibility = opacity < 0.02 ? "hidden" : "visible";
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id={id} ref={ref} style={{ height: `${heightVh}vh` }} className="relative">
      <div className={`sticky top-0 h-screen overflow-hidden ${className ?? ""}`}>{children}</div>
    </section>
  );
}
