import { useEffect, useRef } from "react";

/**
 * Sfondo video guidato dallo scroll ("scrubbing"), stile Apple.
 *
 * UN SOLO video per tutto il sito: i 7 filmati delle scene sono concatenati
 * in un unico master (con dissolvenze di 0,5s già "cotte" dentro il file da
 * ffmpeg — vedi client/public/assets/videos/README.md). Ogni scena occupa
 * un segmento temporale del master; al cambio scena il tempo attraversa la
 * finestra di dissolvenza e la transizione avviene dentro il video stesso.
 *
 * Il tempo di riproduzione è mosso via currentTime, con interpolazione in
 * requestAnimationFrame per lo scrub fluido.
 *
 * Modalità diagnostica: aprire il sito con `?debug` nell'URL mostra un
 * pannello con lo stato del video (caricamento, errori, buffer, seek).
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
  const debugRef = useRef<HTMLDivElement | null>(null);
  const debugEnabled =
    typeof window !== "undefined" && window.location.search.includes("debug");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const notes: string[] = [];

    // "calcio" di avvio: un play muto seguito da pausa forza il browser a
    // iniziare davvero a scaricare e decodificare (necessario su iOS/Safari,
    // che altrimenti può lasciare il video fermo al poster)
    video
      .play()
      .then(() => {
        video.pause();
        notes.push("kick: play ok");
      })
      .catch((e) => {
        notes.push(`kick: play negato (${e?.name ?? "?"})`);
      });

    video.addEventListener("error", () => {
      notes.push(`video error code=${video.error?.code ?? "?"}`);
    });

    // NB: lo scrubbing resta attivo anche con prefers-reduced-motion — non è
    // un'animazione autonoma, si muove solo insieme allo scroll dell'utente

    let smoothed = 0;
    let raf = 0;
    let ticks = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      ticks++;
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
      // dissolvenza cotta nel video viene attraversata dolcemente.
      // Fattore 0.3: lo scroll è già ammorbidito da Lenis — un inseguimento
      // più stretto evita il doppio smoothing che faceva sentire il video
      // in ritardo e "slegato" dalla rotella
      if (Math.abs(target - smoothed) > 4) {
        smoothed = target;
      } else {
        smoothed += (target - smoothed) * 0.3;
      }
      const delta = Math.abs(video.currentTime - smoothed);
      // non accodare un nuovo seek mentre il precedente è ancora in corso
      if (delta > 0.02 && (!video.seeking || delta > 0.5)) {
        video.currentTime = smoothed;
      }

      // pannello diagnostico (?debug nell'URL), aggiornato ~4 volte al secondo
      if (debugEnabled && debugRef.current && ticks % 15 === 0) {
        const buf: string[] = [];
        for (let i = 0; i < video.buffered.length; i++) {
          buf.push(`${video.buffered.start(i).toFixed(1)}-${video.buffered.end(i).toFixed(1)}`);
        }
        debugRef.current.textContent = [
          `src: ${(video.currentSrc || "(nessuna)").split("/").pop()}`,
          `readyState: ${video.readyState}  networkState: ${video.networkState}`,
          `error: ${video.error ? `code ${video.error.code}` : "no"}`,
          `buffered: ${buf.join(", ") || "(vuoto)"}`,
          `currentTime: ${video.currentTime.toFixed(2)}  target: ${target.toFixed(2)}`,
          `seeking: ${video.seeking}  paused: ${video.paused}`,
          `scena: ${SCENES[active]}  progresso: ${(progress * 100).toFixed(0)}%`,
          `ticks rAF: ${ticks}`,
          `reduced-motion: ${window.matchMedia("(prefers-reduced-motion: reduce)").matches}`,
          ...notes.slice(-4),
          navigator.userAgent.slice(0, 80),
        ].join("\n");
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [debugEnabled]);

  return (
    <>
      <div
        aria-hidden
        className="fixed inset-0 z-[1] pointer-events-none overflow-hidden bg-cover bg-center"
        // fallback: primo frame come sfondo, così mentre il video bufferizza
        // (o se non parte) non si vede mai il vuoto
        style={{ backgroundImage: "url(/assets/videos/master.jpg)" }}
      >
        {/* mp4 H.264 PER PRIMO, con la stringa codec esplicita: tutti i
            browser reali (Safari compreso) lo scelgono e lo decodificano in
            hardware. Il webm resta solo come riserva per ambienti senza
            H.264. Mai il contrario: Safari dichiara di supportare il webm
            ma il suo decoder VP9 non produce frame (readyState fermo a 1) */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          poster="/assets/videos/master.jpg"
          className="absolute inset-0 w-full h-full object-cover will-change-transform dark:brightness-[.25] dark:contrast-125 dark:saturate-150"
        >
          <source src="/assets/videos/master.mp4" type='video/mp4; codecs="avc1.64001f"' />
          <source src="/assets/videos/master.webm" type='video/webm; codecs="vp9"' />
        </video>
      </div>
      {debugEnabled && (
        <div
          ref={debugRef}
          className="fixed top-20 left-2 z-[100] pointer-events-none whitespace-pre rounded-lg bg-black/85 p-3 font-mono text-[11px] leading-relaxed text-green-400"
        >
          debug attivo…
        </div>
      )}
    </>
  );
}
