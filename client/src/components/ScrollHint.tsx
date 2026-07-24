import { useEffect, useRef } from "react";

/**
 * Invito allo scroll: mostra all'apertura un segnale "Scorri per esplorare"
 * con una freccia che rimbalza dentro una capsula di vetro. Chiarisce che è
 * lo scroll a far partire l'animazione. Svanisce appena l'utente scrolla e
 * non torna più (compito assolto). Rispetta prefers-reduced-motion.
 */
export function ScrollHint() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;
    const onScroll = () => {
      // opacità piena in cima, dissolve entro i primi ~180px di scroll
      const y = window.scrollY;
      const o = Math.max(0, 1 - y / 180);
      el.style.opacity = o.toFixed(2);
      el.style.pointerEvents = o < 0.05 ? "none" : "auto";
      if (y > 200 && !done) {
        done = true;
        el.style.transition = "opacity .4s ease";
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-x-0 bottom-6 z-40 flex justify-center"
      aria-hidden
    >
      <a
        href="#services"
        className="group flex flex-col items-center gap-2 rounded-full border border-border/70 bg-background/40 backdrop-blur-md px-5 py-2.5 shadow-lg transition-colors hover:border-primary/60"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground group-hover:text-primary">
          Scorri per esplorare
        </span>
        <span className="relative flex h-4 w-4 items-center justify-center">
          <svg
            viewBox="0 0 16 16"
            className="h-4 w-4 text-primary motion-safe:animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </span>
      </a>
    </div>
  );
}
