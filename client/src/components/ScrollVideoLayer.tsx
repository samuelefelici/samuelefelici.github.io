import { useEffect, useRef } from "react";

/**
 * Sfondo video guidato dallo scroll ("scrubbing"), stile Apple.
 *
 * UN SOLO video per tutto il sito: i 7 filmati delle scene sono concatenati
 * in un unico master (con dissolvenze di 0,5s già "cotte" dentro il file da
 * ffmpeg — vedi client/public/assets/videos/README.md). Ogni scena occupa
 * un segmento temporale del master; al cambio scena il tempo attraversa la
 * finestra di dissolvenza e la transizione avviene dentro il video stesso.
 * Un solo elemento <video>, un solo decoder: niente crossfade a runtime,
 * niente cambi di layer, niente scatti.
 *
 * Il video non va mai in play(): si muove solo currentTime, con
 * interpolazione in requestAnimationFrame per lo scrub fluido.
 */
const SCENES = ["hero", "services", "cerbero", "about", "competenze", "process", "contact"];

// [inizio, fine] in secondi del tratto "solo" di ogni scena nel master;
// tra una fine e l'inizio successivo c'è la finestra di dissolvenza da 0,5s
const SEGMENTS: [number, number][] = [
  [0, 9.5],
  [10, 19],
  [19.5, 28.5],
  [29, 38],
  [38.5, 47.5],
  [48, 57],
  [57.5, 66.9],
];

export function ScrollVideoLayer() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const video = videoRef.current;
    if (!video) return;

    let smoothed = 0;
    let raf = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const vh = window.innerHeight;
      const centerY = vh * 0.5;

      // scena attiva = l'ultima il cui bordo superiore ha superato il centro
      // del viewport; progresso con la stessa formula delle scene pinned di
      // <Scene />, così video e coreografia restano sincronizzati
      let active = 0;
      let progress = 0;
      for (let i = 0; i < SCENES.length; i++) {
        const el = document.getElementById(SCENES[i]);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= centerY) {
          active = i;
          progress = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - vh)));
        }
      }

      const [start, end] = SEGMENTS[active];
      const target = start + progress * (end - start);

      // salto netto solo per distanze enormi (link ancora, salti di pagina);
      // il passaggio tra scene adiacenti (~0,5s) resta interpolato, così la
      // dissolvenza cotta nel video viene attraversata dolcemente
      if (Math.abs(target - smoothed) > 4) {
        smoothed = target;
      } else {
        smoothed += (target - smoothed) * 0.14;
      }
      const delta = Math.abs(video.currentTime - smoothed);
      // non accodare un nuovo seek mentre il precedente è ancora in corso
      if (delta > 0.02 && (!video.seeking || delta > 0.5)) {
        video.currentTime = smoothed;
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[1] pointer-events-none overflow-hidden bg-cover bg-center"
      // fallback: primo frame come sfondo, così mentre il video bufferizza
      // (o se non parte) non si vede mai il vuoto
      style={{ backgroundImage: "url(/assets/videos/master.jpg)" }}
    >
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        poster="/assets/videos/master.jpg"
        className="absolute inset-0 w-full h-full object-cover will-change-transform dark:brightness-[.25] dark:contrast-125 dark:saturate-150"
      >
        <source src="/assets/videos/master.webm" type="video/webm" />
        <source src="/assets/videos/master.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
