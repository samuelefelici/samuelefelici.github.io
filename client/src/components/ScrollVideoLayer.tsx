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
      const vh = window.innerHeight;
      const centerY = vh * 0.5;

      // sezione attiva = l'ultima il cui bordo superiore ha superato il
      // centro del viewport (così la transizione al video successivo parte
      // mentre la scena nuova sta subentrando). Il progresso usa la stessa
      // formula delle scene pinned di <Scene />: 0 quando la scena si
      // aggancia in cima al viewport, 1 quando si sgancia — video e
      // coreografia delle card restano perfettamente sincronizzati.
      let active = 0;
      let progress = 0;
      for (let i = 0; i < SCENES.length; i++) {
        const el = document.getElementById(SCENES[i].id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= centerY) {
          active = i;
          progress = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - vh)));
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
    </div>
  );
}
