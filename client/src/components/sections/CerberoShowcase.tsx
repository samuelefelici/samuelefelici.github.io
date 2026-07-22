import { Scene } from "@/components/Scene";
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

// ogni motore occupa un quinto della scena, dopo l'intro — nel video le
// quattro diramazioni colorate si accendono nello stesso ordine
const MOTOR_RANGES = [
  [0.2, 0.4],
  [0.4, 0.6],
  [0.6, 0.8],
  [0.8, 0.97],
] as const;

export function CerberoShowcase() {
  return (
    <Scene id="cerbero" heightVh={450}>
      {/* fase 1: intro con i contatori */}
      <div data-from="0.02" data-to="0.17" className="absolute inset-0 flex items-center pt-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Caso studio</span>
          <h2 className="text-4xl md:text-6xl font-bold font-heading mt-3 mb-5">Dentro Cerbero</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10">
            Una piattaforma full-stack di intelligence per il Trasporto Pubblico Locale, su dati reali.
            Quattro motori, un solo sistema.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="text-center rounded-2xl border border-border/60 bg-background/25 backdrop-blur-md p-4">
                <div className="text-3xl md:text-4xl font-bold text-foreground">
                  <Counter to={s.to} prefix={s.prefix ?? ""} />
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* fase 2: i quattro motori, uno per volta, in sincrono con le
          diramazioni colorate del video */}
      {motori.map((m, i) => (
        <div
          key={m.title}
          data-from={MOTOR_RANGES[i][0]}
          data-to={MOTOR_RANGES[i][1]}
          className="absolute inset-0 flex items-center pt-16"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="rounded-3xl border border-border/60 bg-background/25 backdrop-blur-md p-6 md:p-8">
                <div className="flex items-center gap-4 mb-5">
                  <img src={m.logo + V} alt="" loading="lazy" className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-xl" />
                  <span
                    className="inline-block w-fit text-sm font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full"
                    style={{ color: m.color, backgroundColor: `${m.color}1a` }}
                  >
                    0{i + 1} — {m.tagline}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: m.color }}>
                  {m.title}
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{m.body}</p>
              </div>

              <div className="hidden lg:block">
                <div className="rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
                  <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-border bg-secondary/40">
                    <span className="w-3 h-3 rounded-full bg-red-400/70" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                    <span className="w-3 h-3 rounded-full bg-green-400/70" />
                  </div>
                  <img src={m.image + V} alt={m.title} loading="lazy" className="w-full h-auto block" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Scene>
  );
}
