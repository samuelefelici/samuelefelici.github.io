import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";

const V = "?v=3";

const motori = [
  {
    color: "#3b82f6",
    title: "Analytics Engine",
    tagline: "Capire territorio e domanda",
    body: "Incrocio traffico, demografia ISTAT, punti di interesse e telemetria di bordo per misurare domanda, copertura e aree sottoservite.",
    image: "/assets/cerbero-dashboard.jpg",
    logo: "/assets/cerbero-analytic-logo.png",
  },
  {
    color: "#f97316",
    title: "Scheduling Engine",
    tagline: "Ottimizzare i turni",
    body: "Turni macchina e guida ottimizzati con Google OR-Tools CP-SAT, nel rispetto della normativa e del CCNL.",
    image: "/assets/cerbero-scheduling.jpg",
    logo: "/assets/cerbero-scheduling-logo.png",
  },
  {
    color: "#22c55e",
    title: "Fares Engine",
    tagline: "Bigliettazione elettronica",
    body: "GTFS-Fares v2 completo, cluster tariffari e un oracolo che verifica il prezzo atteso contro l'addebito reale del validatore.",
    image: "/assets/cerbero-fares.jpg",
    logo: "/assets/cerbero-fares-logo.png",
  },
  {
    color: "#8b5cf6",
    title: "Network Engine",
    tagline: "Progettare e simulare la rete",
    body: "Scenari su feed GTFS, isocrone pedonali, zone di coincidenza intermodali e generazione del Programma di Esercizio.",
    image: "/assets/cerbero-network.jpg",
    logo: "/assets/cerbero-network-logo.png",
  },
];

const stats = [
  { to: 12500, prefix: "~", label: "corse GTFS" },
  { to: 121, label: "linee" },
  { to: 2878, label: "fermate" },
  { to: 4, label: "motori in produzione" },
];

function MotorText({
  m,
  index,
  onActive,
}: {
  m: (typeof motori)[number];
  index: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className="min-h-screen flex flex-col justify-center py-10">
      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* logo grande del motore — elemento centrale */}
        <div className="relative w-28 h-28 md:w-36 md:h-36 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full blur-2xl" style={{ backgroundColor: m.color, opacity: 0.4 }} />
          <img src={m.logo + V} alt="" loading="lazy" className="relative w-full h-full object-contain drop-shadow-xl" />
        </div>
        <span
          className="inline-block w-fit text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3"
          style={{ color: m.color, backgroundColor: `${m.color}1a` }}
        >
          0{index + 1} — {m.tagline}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: m.color }}>
          {m.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed max-w-md">{m.body}</p>

        {/* immagine inline solo su mobile */}
        <div className="lg:hidden mt-6 rounded-xl border border-border overflow-hidden shadow-lg">
          <img src={m.image + V} alt={m.title} loading="lazy" className="w-full h-auto block" />
        </div>
      </motion.div>
    </div>
  );
}

export function CerberoShowcase() {
  const [active, setActive] = useState(0);

  return (
    <section id="cerbero" className="relative py-20 md:py-28 overflow-x-clip border-t border-border">
      {/* tinta dell'intero sfondo, cambia col motore attivo */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        animate={{ backgroundColor: motori[active].color }}
        transition={{ duration: 0.8 }}
        style={{ opacity: 0.08 }}
      />
      <div className="container mx-auto px-4 md:px-6">
        <Reveal className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Caso studio</span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mt-2 mb-4">Dentro Cerbero</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Una piattaforma full-stack di intelligence per il Trasporto Pubblico Locale, su dati reali.
            Quattro motori, un solo sistema.
          </p>
        </Reveal>

        {/* contatori animati */}
        <Reveal className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 max-w-3xl mx-auto">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground">
                <Counter to={s.to} prefix={s.prefix ?? ""} />
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </Reveal>

        {/* scrollytelling */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* colonna sticky con crossfade (desktop) — centrata verticalmente */}
          <div className="hidden lg:block">
            <div className="sticky top-0 h-screen flex items-center">
              <div className="relative w-full">
                {/* aura unica che attraversa entrambe le colonne e segue il viewport */}
                <motion.div
                  aria-hidden
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[130%] -z-10 rounded-full blur-3xl"
                  animate={{
                    backgroundColor: motori[active].color,
                    opacity: [0.14, 0.22, 0.14],
                    scale: [1, 1.06, 1],
                  }}
                  transition={{
                    backgroundColor: { duration: 0.6 },
                    opacity: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                  }}
                />
                <div className="relative rounded-xl border border-border bg-card shadow-2xl overflow-hidden aspect-[16/10]">
                  <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-border bg-secondary/40 relative z-10">
                    <span className="w-3 h-3 rounded-full bg-red-400/70" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                    <span className="w-3 h-3 rounded-full bg-green-400/70" />
                  </div>
                  {motori.map((m, i) => (
                    <motion.img
                      key={m.title}
                      src={m.image + V}
                      alt={m.title}
                      loading="lazy"
                      className="absolute inset-0 top-[42px] w-full h-[calc(100%-42px)] object-cover object-top"
                      animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.05 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* colonna testi */}
          <div>
            {motori.map((m, i) => (
              <MotorText key={m.title} m={m} index={i} onActive={setActive} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
