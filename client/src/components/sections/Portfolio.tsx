import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Github, Lock, ArrowRight, Theater, ShieldCheck, Ship, Globe, ListOrdered,
  BarChart3, CalendarClock, Ticket, Route, MapPin, CreditCard, Database,
} from "lucide-react";
import { motion } from "framer-motion";

const GITHUB_URL = "https://github.com/samuelefelici";

/** Versione asset: bump per forzare browser/CDN a riscaricare le immagini bypassando la cache (404 vecchi inclusi). */
const ASSET_V = "3";
const v = (src: string) => `${src}?v=${ASSET_V}`;

type ProjectDetail = {
  intro: string;
  sections: {
    icon: typeof ShieldCheck;
    iconImg?: string;
    color?: string;
    title: string;
    tagline?: string;
    body: string;
    image?: { src: string; alt: string };
  }[];
  stack: string[];
};

type Project = {
  icon: typeof ShieldCheck;
  logo?: string;
  title: string;
  subtitle?: string;
  description: string;
  tags: string[];
  client?: boolean;
  featured?: boolean;
  status?: string;
  detail?: ProjectDetail;
};

const projects: Project[] = [
  {
    icon: ShieldCheck,
    logo: "/assets/cerbero-logo.png",
    title: "Cerbero",
    description:
      "Piattaforma full-stack di intelligence per il Trasporto Pubblico Locale: analisi del territorio, ottimizzazione dei turni, bigliettazione elettronica e progettazione della rete in un unico sistema, su dati GTFS reali (~12.500 corse, provincia di Ancona).",
    tags: ["React", "TypeScript", "Node + PostgreSQL", "Python · OR-Tools", "Mapbox", "GTFS"],
    client: true,
    featured: true,
    detail: {
      intro:
        "Cerbero trasforma un feed GTFS grezzo in decisioni concrete: dove manca servizio, come comporre i turni macchina e guida nel rispetto del CCNL, quanto costa un biglietto fra due fermate e come simulare modifiche alla rete prima di metterle in esercizio. Quattro motori integrati su uno stack TypeScript con un layer di ottimizzazione in Python e un assistente operativo AI.",
      sections: [
        {
          icon: BarChart3,
          iconImg: "/assets/cerbero-analytic-logo.png",
          color: "#3b82f6",
          title: "Analytics Engine",
          tagline: "Capire territorio e domanda",
          body:
            "Incrocia fonti eterogenee per misurare domanda e qualità del servizio: traffico (TomTom), demografia ISTAT, punti di interesse (OpenStreetMap), matrice O/D pendolare, meteo e telemetria di bordo (salite/discese, persone a bordo, incassi). Calcola copertura della popolazione e aree sottoservite.",
          image: { src: "/assets/cerbero-dashboard.jpg", alt: "Dashboard: stato rete, mappa GTFS colorata per congestione, traffico live e punti di interesse" },
        },
        {
          icon: CalendarClock,
          iconImg: "/assets/cerbero-scheduling-logo.png",
          color: "#f97316",
          title: "Scheduling Engine",
          tagline: "Ottimizzare i turni",
          body:
            "Pipeline a due livelli su Google OR-Tools CP-SAT: turni macchina (minimizza flotta e percorrenze a vuoto) e turni guida con enumerazione dei duty nel rispetto della normativa (CCNL: max 7h30, pause, guida continua). Solver configurabile, avanzamento in tempo reale, confronto scenari.",
          image: { src: "/assets/cerbero-scheduling.jpg", alt: "Scheduling Engine: Gantt dei turni macchina ottimizzati con OR-Tools CP-SAT" },
        },
        {
          icon: Ticket,
          iconImg: "/assets/cerbero-fares-logo.png",
          color: "#22c55e",
          title: "Fares Engine",
          tagline: "Bigliettazione elettronica",
          body:
            "Implementazione completa GTFS-Fares v2: reti tariffarie, prodotti, aree, regole di interscambio. Cluster tariffari con matrice O/D precalcolata e un 'oracolo' che restituisce il prezzo atteso fra due fermate — usato come verifica indipendente contro l'addebito reale del validatore NFC.",
          image: { src: "/assets/cerbero-fares.jpg", alt: "Fares Engine: partizioni territoriali (cluster tariffari) sulla mappa" },
        },
        {
          icon: Route,
          iconImg: "/assets/cerbero-network-logo.png",
          color: "#8b5cf6",
          title: "Network Engine",
          tagline: "Progettare e simulare la rete",
          body:
            "Planning Studio per costruire scenari su un feed baseline (modifica/sospensione di linee e fermate) e confrontarli. Isocrone pedonali, zone di coincidenza intermodali (treno/nave ↔ bus), classificazione linee e generazione del Programma di Esercizio.",
          image: { src: "/assets/cerbero-network.jpg", alt: "Network Engine — Planner Studio: editor variante linea con tracciato e sequenza fermate" },
        },
      ],
      stack: [
        "React · Vite · Tailwind · Shadcn UI",
        "Mapbox GL · Recharts",
        "Node/Express 5 · Drizzle ORM · PostgreSQL",
        "Python 3 · Google OR-Tools CP-SAT",
        "GTFS / GTFS-Fares v2",
        "Integrazioni: TomTom, OSM, ISTAT, OpenWeatherMap, ORS",
        "Estensione IoT: validatore NFC + GPS di bordo",
      ],
    },
  },
  {
    icon: Theater,
    title: "Sipario",
    description:
      "Applicazione per la gestione e organizzazione di eventi e spettacoli: pianificazione, logistica e flussi operativi in un unico strumento. (Descrizione da completare.)",
    tags: ["Python", "Gestionale"],
    client: true,
  },
  {
    icon: Ship,
    title: "Caronte",
    description:
      "Il sistema di bordo che completa Cerbero: AVM con posizione GPS proiettata sul percorso GTFS e validazione NFC (tap-IN / tap-OUT) come oracolo di verifica della bigliettazione elettronica.",
    tags: ["PWA", "AVM", "NFC", "GPS"],
    client: true,
    status: "In sviluppo",
    detail: {
      intro:
        "Caronte è il sistema di bordo che completa Cerbero: una PWA di Automatic Vehicle Monitoring (AVM) che proietta la posizione GPS del mezzo sul percorso programmato GTFS — ricavando fermata corrente, tempi di percorrenza e soste — affiancata da un validatore NFC per la salita e la discesa dei passeggeri. La validazione NFC è attualmente in fase di costruzione e non ancora in esercizio.",
      sections: [
        {
          icon: MapPin,
          color: "#3b82f6",
          title: "AVM",
          tagline: "Monitoraggio del mezzo",
          body:
            "PWA che proietta in tempo reale la posizione GPS sul percorso programmato GTFS, ricavando automaticamente fermata corrente, tempi di percorrenza e soste.",
          image: { src: "/assets/caronte-avm.jpg", alt: "Dispositivo AVM di bordo installato sul bus" },
        },
        {
          icon: CreditCard,
          color: "#f59e0b",
          title: "Validazione NFC",
          tagline: "In sviluppo",
          body:
            "Gestione di salita (tap-IN) e discesa (tap-OUT) dei passeggeri. Per ogni viaggio legge dal Fares Engine la tariffa attesa e la confronta con quanto effettivamente addebitato, funzionando da oracolo di verifica della bigliettazione. Funzione non ancora in esercizio.",
          image: { src: "/assets/caronte-app.jpg", alt: "App di bordo Caronte (PWA) su smartphone" },
        },
        {
          icon: Database,
          color: "#10b981",
          title: "Dati di esercizio",
          body:
            "I dati confluiscono in uno schema PostgreSQL dedicato (caronte), separato in sola scrittura dal gestionale. Da qui derivano le metriche: salite/discese per fermata, persone a bordo per corsa, totale trasportati e fatturato.",
        },
      ],
      stack: [
        "PWA (offline-first)",
        "Web NFC",
        "Geolocalizzazione GPS",
        "PostgreSQL (schema dedicato)",
        "GTFS",
        "Integrazione con il Fares Engine di Cerbero",
      ],
    },
  },
  {
    icon: Globe,
    title: "Siti Web",
    description:
      "Siti vetrina e landing page responsive per attività e professionisti, ottimizzati per velocità, mobile e visibilità.",
    tags: ["React", "Web"],
  },
  {
    icon: ListOrdered,
    title: "Algoritmi di ordinamento",
    description:
      "Implementazione e confronto di algoritmi di ordinamento, con analisi delle performance. Progetto pubblico su GitHub.",
    tags: ["Algoritmi", "Python"],
  },
];

/** Mostra l'immagine solo se viene caricata: se il file non esiste ancora, si nasconde (niente immagini rotte). */
function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return (
    <figure className="group overflow-hidden rounded-xl border border-border bg-secondary/20">
      <div className="overflow-hidden">
        <img
          src={v(src)}
          alt={alt}
          loading="lazy"
          onError={() => setOk(false)}
          className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <figcaption className="text-xs text-muted-foreground px-3 py-2">{alt}</figcaption>
    </figure>
  );
}

/** Mostra il logo (immagine) se presente e caricabile, altrimenti l'icona vettoriale di fallback. */
function Glyph({
  logo,
  icon: Icon,
  imgClass,
  iconClass,
}: {
  logo?: string;
  icon: typeof ShieldCheck;
  imgClass: string;
  iconClass: string;
}) {
  const [ok, setOk] = useState(!!logo);
  if (logo && ok) {
    return <img src={v(logo)} alt="" loading="lazy" onError={() => setOk(false)} className={imgClass} />;
  }
  return <Icon className={iconClass} />;
}

/** Etichetta di sezione in stile "label" tecnico. */
function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
      {children}
    </p>
  );
}

export function Portfolio() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-heading mb-4">Progetti realizzati</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Una selezione di app e strumenti che ho costruito. Diversi sono in uso presso clienti, quindi il codice è privato: qui trovi il problema che risolvono.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const clickable = !!project.detail;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={project.featured ? "sm:col-span-2" : ""}
                data-testid={`card-project-${index}`}
              >
                <Card
                  onClick={clickable ? () => setSelected(project) : undefined}
                  className={`h-full border shadow-sm transition-all ${
                    project.featured ? "border-primary/40 bg-primary/5" : "border-border"
                  } ${clickable ? "cursor-pointer hover:shadow-md hover:border-primary/50 group" : ""}`}
                >
                  <CardHeader>
                    {project.logo ? (
                      <div className="flex items-center justify-between gap-4">
                        <div className="space-y-2">
                          {project.status && (
                            <span className="inline-block text-xs font-medium text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-full">
                              {project.status}
                            </span>
                          )}
                          <CardTitle className="text-2xl font-bold">{project.title}</CardTitle>
                        </div>
                        <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                          <div className="absolute inset-0 rounded-full bg-primary/25 blur-2xl" />
                          <Glyph logo={project.logo} icon={project.icon} imgClass="relative w-full h-full object-contain" iconClass="relative w-10 h-10 text-primary" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start justify-between mb-2">
                          <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                            <project.icon className="w-5 h-5" />
                          </div>
                          {project.status && (
                            <span className="text-xs font-medium text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-full">
                              {project.status}
                            </span>
                          )}
                        </div>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                      </>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs font-medium">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {clickable && (
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                        Scopri di più
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}

          {/* GitHub CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: projects.length * 0.08 }}
          >
            <Card className="h-full border border-dashed border-primary/30 bg-primary/5 shadow-none flex flex-col items-center justify-center text-center p-6">
              <Github className="w-10 h-10 text-primary mb-4" />
              <CardTitle className="text-lg mb-2">Progetti pubblici</CardTitle>
              <p className="text-sm text-muted-foreground mb-5">
                Esperimenti, esercizi e progetti open sul mio profilo GitHub.
              </p>
              <Button variant="default" size="sm" className="gap-2" asChild data-testid="button-github">
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                  Vai al mio GitHub
                </a>
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Project detail dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-3xl max-h-[88vh] overflow-y-auto p-0 gap-0">
          {selected?.detail && (
            <>
              {/* Header con banda gradiente */}
              <div className="relative overflow-hidden px-6 pt-8 pb-6 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border-b border-border">
                <div className="absolute -top-12 -right-12 w-44 h-44 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative flex items-start gap-4">
                  {selected.logo ? (
                    <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-primary/25 blur-2xl" />
                      <Glyph logo={selected.logo} icon={selected.icon} imgClass="relative w-full h-full object-contain" iconClass="relative w-10 h-10 text-primary" />
                    </div>
                  ) : (
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20">
                      <selected.icon className="w-7 h-7" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <DialogTitle className="text-2xl font-bold leading-tight">{selected.title}</DialogTitle>
                      {selected.subtitle && (
                        <span className="text-sm font-mono text-primary/90 bg-primary/10 px-2 py-0.5 rounded">
                          {selected.subtitle}
                        </span>
                      )}
                      {selected.status && (
                        <span className="text-xs font-medium text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-full">
                          {selected.status}
                        </span>
                      )}
                      {selected.client && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Lock className="w-3 h-3" />
                          Su commessa
                        </span>
                      )}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {selected.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs font-medium">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogDescription className="relative mt-4 text-[0.95rem] text-foreground/80 leading-relaxed">
                  {selected.detail.intro}
                </DialogDescription>
              </div>

              {/* Corpo */}
              <div className="px-6 py-6 space-y-9">
                {selected.detail.sections.map((s) => (
                  <div key={s.title} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="relative w-20 h-20 shrink-0 flex items-center justify-center"
                        style={s.color ? { color: s.color } : undefined}
                      >
                        <div
                          className="absolute inset-0 rounded-full blur-2xl"
                          style={s.color ? { backgroundColor: s.color, opacity: 0.3 } : undefined}
                        />
                        {!s.color && <div className="absolute inset-0 rounded-full bg-primary/15 blur-2xl" />}
                        <Glyph
                          logo={s.iconImg}
                          icon={s.icon}
                          imgClass="relative w-full h-full object-contain"
                          iconClass="relative w-9 h-9"
                        />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold leading-tight" style={s.color ? { color: s.color } : undefined}>
                          {s.title}
                        </h4>
                        {s.tagline && <p className="text-sm text-muted-foreground">{s.tagline}</p>}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                    {s.image && <GalleryImage src={s.image.src} alt={s.image.alt} />}
                  </div>
                ))}

                <div className="pt-2 border-t border-border">
                  <SectionLabel>Stack &amp; competenze</SectionLabel>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.detail.stack.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/80 border border-border bg-secondary/50 rounded-md px-2.5 py-1"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
