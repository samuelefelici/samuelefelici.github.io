import { useEffect, useRef } from "react";

/**
 * Sfondo video guidato dallo scroll ("scrubbing"), stile Apple.
 *
 * Un layer fisso a tutto schermo dietro al contenuto: ogni sezione del sito
 * ha il suo video, e il tempo di riproduzione è agganciato al progresso di
 * scroll dentro la sezione — scorri avanti e il video avanza, scorri
 * indietro e torna indietro. Superata una sezione si passa al video
 * successivo in dissolvenza. I video non vengono mai messi in play():
 * si muove solo currentTime, quindi niente problemi di autoplay.
 *
 * Fluidità: il target time viene inseguito con un'interpolazione in
 * requestAnimationFrame invece di essere impostato a ogni evento di scroll,
 * e i file video sono codificati con keyframe fitti per rendere i seek
 * rapidi (vedi client/public/assets/videos/README.md).
 */
const SCENES = [
  { id: "hero", src: "01-hero" },
  { id: "services", src: "02-servizi" },
  { id: "cerbero", src: "03-cerbero" },
  { id: "about", src: "04-perche-io" },
  { id: "competenze", src: "05-timeline" },
  { id: "process", src: "06-processo" },
  { id: "contact", src: "07-contatti" },
];

export function ScrollVideoLayer() {
  const videosRef = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const smoothed = SCENES.map(() => 0);
    let raf = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const centerY = window.innerHeight * 0.5;

      // sezione attiva = l'ultima il cui bordo superiore ha superato il
      // centro del viewport. Il progresso va da 0 (momento in cui la sezione
      // diventa attiva) a 1 (handoff alla successiva), distribuito su tutto
      // lo scroll della sezione. La prima sezione è già attiva a inizio
      // pagina col bordo in cima al viewport, quindi usa il proprio range.
      let active = 0;
      let progress = 0;
      for (let i = 0; i < SCENES.length; i++) {
        const el = document.getElementById(SCENES[i].id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= centerY) {
          active = i;
          progress =
            i === 0
              ? -r.top / Math.max(1, r.height - centerY)
              : (centerY - r.top) / Math.max(1, r.height);
          progress = Math.min(1, Math.max(0, progress));
        }
      }

      videosRef.current.forEach((video, i) => {
        if (!video) return;
        video.style.opacity = i === active ? "1" : "0";

        // scarica per intero solo il video attivo e i suoi vicini
        const wanted = Math.abs(i - active) <= 1 ? "auto" : "metadata";
        if (video.preload !== wanted) video.preload = wanted;

        if (i === active && video.duration) {
          const target = progress * (video.duration - 0.05);
          smoothed[i] += (target - smoothed[i]) * 0.14;
          if (Math.abs(video.currentTime - smoothed[i]) > 0.02) {
            video.currentTime = smoothed[i];
          }
        }
      });
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      {SCENES.map((scene, i) => (
        <video
          key={scene.src}
          ref={(el) => {
            videosRef.current[i] = el;
          }}
          muted
          playsInline
          preload={i === 0 ? "auto" : "metadata"}
          poster={`/assets/videos/${scene.src}.jpg`}
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 dark:brightness-[.25] dark:contrast-125 dark:saturate-150"
        >
          <source src={`/assets/videos/${scene.src}.webm`} type="video/webm" />
          <source src={`/assets/videos/${scene.src}.mp4`} type="video/mp4" />
        </video>
      ))}
      {/* niente velo pieno: il video resta vivo e si fonde con la pagina;
          solo i bordi alto/basso sfumano nel colore di sfondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background/70" />
    </div>
  );
}
