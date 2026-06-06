import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Lock, ArrowRight, Theater, ShieldCheck, Ship, Globe, ListOrdered } from "lucide-react";
import { motion } from "framer-motion";

const GITHUB_URL = "https://github.com/samuelefelici";

type ProjectDetail = {
  intro: string;
  sections: { title: string; body: string }[];
  stack: string[];
  images?: { src: string; alt: string }[];
};

type Project = {
  icon: typeof ShieldCheck;
  title: string;
  subtitle?: string;
  description: string;
  tags: string[];
  client?: boolean;
  featured?: boolean;
  detail?: ProjectDetail;
};

const projects: Project[] = [
  {
    icon: ShieldCheck,
    title: "Cerbero",
    subtitle: "TransitIntel",
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
          title: "📊 Analytics Engine — capire territorio e domanda",
          body:
            "Incrocia fonti eterogenee per misurare domanda e qualità del servizio: traffico (TomTom), demografia ISTAT, punti di interesse (OpenStreetMap), matrice O/D pendolare, meteo e telemetria di bordo (salite/discese, persone a bordo, incassi). Calcola copertura della popolazione e aree sottoservite.",
        },
        {
          title: "🔥 Scheduling Engine — ottimizzare i turni",
          body:
            "Pipeline a due livelli su Google OR-Tools CP-SAT: turni macchina (minimizza flotta e percorrenze a vuoto) e turni guida con enumerazione dei duty nel rispetto della normativa (CCNL: max 7h30, pause, guida continua). Solver configurabile, avanzamento in tempo reale, confronto scenari.",
        },
        {
          title: "🎫 Fares Engine — bigliettazione elettronica",
          body:
            "Implementazione completa GTFS-Fares v2: reti tariffarie, prodotti, aree, regole di interscambio. Cluster tariffari con matrice O/D precalcolata e un 'oracolo' che restituisce il prezzo atteso fra due fermate — usato come verifica indipendente contro l'addebito reale del validatore NFC.",
        },
        {
          title: "🗺️ Network Engine — progettare e simulare la rete",
          body:
            "Planning Studio per costruire scenari su un feed baseline (modifica/sospensione di linee e fermate) e confrontarli. Isocrone pedonali, zone di coincidenza intermodali (treno/nave ↔ bus), classificazione linee e generazione del Programma di Esercizio.",
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
      images: [
        { src: "/assets/cerbero-dashboard.png", alt: "Dashboard: stato rete, mappa GTFS colorata per congestione, traffico live e punti di interesse" },
        { src: "/assets/cerbero-network.png", alt: "Network Engine — Planner Studio: editor variante linea con tracciato e sequenza fermate" },
        { src: "/assets/cerbero-scheduling.png", alt: "Scheduling Engine: Gantt dei turni macchina ottimizzati con OR-Tools CP-SAT" },
        { src: "/assets/cerbero-fares.png", alt: "Fares Engine: partizioni territoriali (cluster tariffari) sulla mappa" },
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
      "Sistema di validazione di bordo NFC e ingestione dati di telemetria (posizione GPS, salite/discese). (Descrizione da completare.)",
    tags: ["IoT", "NFC", "API"],
    client: true,
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
    <figure className="overflow-hidden rounded-lg border border-border">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setOk(false)}
        className="w-full h-auto block"
      />
      <figcaption className="text-xs text-muted-foreground px-3 py-2 bg-secondary/40">{alt}</figcaption>
    </figure>
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
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        <project.icon className="w-5 h-5" />
                      </div>
                      {project.client && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Lock className="w-3 h-3" />
                          Su commessa
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-lg flex items-baseline gap-2">
                      {project.title}
                      {project.subtitle && (
                        <span className="text-sm font-normal text-muted-foreground">{project.subtitle}</span>
                      )}
                    </CardTitle>
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
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selected?.detail && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <selected.icon className="w-5 h-5" />
                  </div>
                  {selected.title}
                  {selected.subtitle && (
                    <span className="text-base font-normal text-muted-foreground">{selected.subtitle}</span>
                  )}
                </DialogTitle>
                <DialogDescription className="text-base text-foreground/80 leading-relaxed pt-2">
                  {selected.detail.intro}
                </DialogDescription>
              </DialogHeader>

              {selected.detail.images && selected.detail.images.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-3 mt-2">
                  {selected.detail.images.map((img) => (
                    <GalleryImage key={img.src} src={img.src} alt={img.alt} />
                  ))}
                </div>
              )}

              <div className="space-y-5 mt-2">
                {selected.detail.sections.map((s) => (
                  <div key={s.title}>
                    <h4 className="font-semibold mb-1">{s.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                  </div>
                ))}

                <div className="pt-2 border-t border-border">
                  <h4 className="font-semibold mb-3">Stack & competenze</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.detail.stack.map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs font-medium">
                        {t}
                      </Badge>
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
