import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Video di sezione in loop muto, coerente con lo stile di <Reveal />.
 *
 * - Parte solo quando la sezione entra nel viewport e si mette in pausa
 *   quando esce (IntersectionObserver), per non sprecare batteria/banda.
 * - `preload="metadata"`: il file completo viene scaricato solo quando serve.
 * - Se il file non esiste o non si carica, il componente sparisce senza
 *   rompere il layout (così si può integrare prima di caricare i video).
 *
 * I file vanno in client/public/assets/videos/ e si referenziano col nome
 * base: <SectionVideo name="01-hero" /> → /assets/videos/01-hero.mp4
 * (+ eventuale poster /assets/videos/01-hero.jpg se `poster` è true).
 */
export function SectionVideo({
  name,
  poster = false,
  className,
  delay = 0,
}: {
  /** Nome base del file, es. "03-cerbero" */
  name: string;
  /** true se esiste anche il poster JPG con lo stesso nome base */
  poster?: boolean;
  className?: string;
  delay?: number;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            /* autoplay bloccato: il poster resta visibile, nessun errore */
          });
        } else {
          video.pause();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [failed]);

  if (failed) return null;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster ? `/assets/videos/${name}.jpg` : undefined}
        className="w-full h-auto rounded-2xl"
        aria-hidden
      >
        <source src={`/assets/videos/${name}.webm`} type="video/webm" />
        {/* l'errore va ascoltato sull'ultimo <source>: se fallisce anche
            questo non c'è nessuna sorgente riproducibile → nascondi tutto */}
        <source
          src={`/assets/videos/${name}.mp4`}
          type="video/mp4"
          onError={() => setFailed(true)}
        />
      </video>
    </motion.div>
  );
}
