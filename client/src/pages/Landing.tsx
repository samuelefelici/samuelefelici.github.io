import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Eyebrow } from "@/components/Eyebrow";
import { LeadForm } from "@/components/LeadForm";
import { ConsentBanner } from "@/components/ConsentBanner";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Footer } from "@/components/sections/Footer";
import { Reviews } from "@/components/sections/Reviews";
import { BrowserFrame, PhoneFrame, ProjectGallery, ProjectLogo, brandVars } from "@/components/ProjectGallery";
import { featured, others, shotSrc, shotSrcSet, type Project } from "@/components/sections/projects-data";
import { callLink, track } from "@/lib/tracking";

/*
 * Landing delle campagne a pagamento: una pagina per pubblico, leggera
 * (niente video né scroll pinnato, perché si apre quasi sempre dal browser
 * interno di Instagram, Facebook o LinkedIn su rete mobile), un solo
 * obiettivo: la richiesta dal form. Testi e numeri vengono dal sito e dai
 * casi studio, niente promesse in più.
 */

export type LandingId = "gestionali" | "tpl" | "siti";

type LandingConfig = {
  eyebrow: string;
  title: string;
  subtitle: string;
  bullets: string[];
  /** progetto e schermata della copertina */
  cover: { project: string; shot: number };
  projects: string[];
  objectiveLabel: string;
  objectivePlaceholder: string;
  whatsappText: string;
};

const LANDINGS: Record<LandingId, LandingConfig> = {
  gestionali: {
    eyebrow: "Gestionali su misura",
    title: "Basta Excel e passaggi a mano.",
    subtitle:
      "Un unico sistema al posto di fogli sparsi, costruito sul modo in cui lavorate davvero: dall'ufficio e dallo smartphone, con i ruoli e i passaggi che usate ogni giorno.",
    bullets: [
      "Analisi del processo prima di scrivere una riga di codice",
      "Più alternative, con costi e tempi a confronto, prima di iniziare",
      "Ruoli, permessi, export Excel e PDF; i dati restano tuoi",
      "Avvio affiancato del team e assistenza anche dopo la consegna",
    ],
    cover: { project: "sipario", shot: 0 },
    projects: ["sipario", "condoit", "newsletter", "turnivolontari", "controllerie", "whiteboard"],
    objectiveLabel: "Cosa vorresti gestire meglio?",
    objectivePlaceholder: "Es. ordini, turni, scadenze, magazzino, clienti…",
    whatsappText: "Ciao Samuele, vorrei parlarti di un gestionale",
  },
  tpl: {
    eyebrow: "Software per il trasporto pubblico",
    title: "Pianificazione, turni e flotta in un solo ecosistema.",
    subtitle:
      "Vengo dall'operatività del trasporto pubblico e ne costruisco gli strumenti: rete e orari su GTFS, turni macchina e guida ottimizzati, manutenzione della flotta e app per chi lavora a bordo.",
    bullets: [
      "Turni macchina e guida ottimizzati con Google OR-Tools CP-SAT, nel rispetto della normativa",
      "Planner con orario grafico, varianti di percorso e calendari di validità",
      "Segnalazioni dei conducenti, triage e ordini di lavoro per l'officina",
      "Navigatore di bordo, trasporto a chiamata e controlli a bordo",
    ],
    cover: { project: "cerbero", shot: 0 },
    projects: ["cerbero", "fleetcare", "caronte", "chiamaevai", "flightmatrix", "controllerie"],
    objectiveLabel: "Su quale processo vorresti intervenire?",
    objectivePlaceholder: "Es. turni guida, programma di esercizio, manutenzione…",
    whatsappText: "Ciao Samuele, ti scrivo per il software TPL",
  },
  siti: {
    eyebrow: "Siti per negozi e professionisti",
    title: "Il tuo sito, a un tocco dal cliente.",
    subtitle:
      "Siti veloci pensati prima di tutto per il telefono: chi ti cerca ti chiama, ti scrive su WhatsApp o trova la strada con un tocco, e tu aggiorni foto e novità da solo.",
    bullets: [
      "«Chiama», «Indicazioni» e WhatsApp sempre a portata di pollice",
      "Orari e «aperto ora» aggiornati da soli",
      "Vetrina o novità che aggiorni dal telefono, senza chiamare nessuno",
      "SEO di base, dati strutturati e pagine leggere",
    ],
    cover: { project: "beatrice", shot: 1 },
    projects: ["beatrice", "agform"],
    objectiveLabel: "Di che attività si tratta?",
    objectivePlaceholder: "Es. negozio di abbigliamento ad Ancona, studio professionale…",
    whatsappText: "Ciao Samuele, vorrei un sito per la mia attività",
  },
};

const ALL = [...featured, ...others];
const byId = (id: string) => ALL.find((p) => p.id === id)!;

const STEPS = [
  { title: "Analisi", desc: "Studiamo insieme il processo: chi fa cosa, dove si perde tempo, cosa serve davvero." },
  { title: "Alternative", desc: "Ti propongo più strade, con costi e tempi a confronto." },
  { title: "Sviluppo e avvio", desc: "Rilasci frequenti che provi subito, poi avvio affiancato del tuo team." },
];

const FAQ = [
  {
    q: "Quanto costa?",
    a: "Dipende da cosa serve: per questo, dopo l'analisi, ti propongo più alternative con costi e tempi chiari, e scegli tu prima di iniziare.",
  },
  { q: "Lavori anche fuori dalle Marche?", a: "Sì: lavoro da remoto in tutta Italia, con trasferte quando servono." },
  { q: "E dopo la consegna?", a: "Resto con te: manutenzione, nuove funzioni e supporto anche dopo l'avvio." },
  { q: "Di chi sono i dati?", a: "Tuoi, esportabili in ogni momento." },
];

export function Landing({ id }: { id: LandingId }) {
  const c = LANDINGS[id];
  const cover = byId(c.cover.project);
  const coverShot = cover.shots[c.cover.shot];
  const [open, setOpen] = useState<{ project: Project; index: number } | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const openAt = (project: Project, index: number, el: HTMLElement) => {
    openerRef.current = el;
    setOpen({ project, index });
    track("project_view", { project: project.id, landing: id });
  };

  useEffect(() => {
    track("landing_view", { landing: id });
  }, [id]);

  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <a href="/" aria-label="samuelefelici.com, pagina principale">
            <Logo className="text-lg md:text-xl" />
          </a>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button size="sm" className="rounded-full px-5" asChild>
              <a {...callLink} data-where={`landing-${id}`}>
                {callLink.href === "#contact" ? "Scrivimi" : "Prenota una call"}
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* copertina */}
        <section className="container mx-auto grid items-center gap-10 px-4 py-10 md:px-6 md:py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h1 className="mt-4 mb-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              {c.title}
            </h1>
            <p className="mb-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">{c.subtitle}</p>
            <ul className="mb-8 space-y-2.5">
              {c.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="gap-2 rounded-full px-7" asChild>
                <a href="#contact" data-where={`landing-${id}-hero`}>
                  Raccontami il tuo caso <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 rounded-full px-7" asChild>
                <a href="#progetti">
                  Guarda i progetti <Images className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => openAt(cover, c.cover.shot, e.currentTarget)}
            aria-label={`Apri la galleria di ${cover.name}`}
            className={`block text-left transition hover:-translate-y-1 ${coverShot.kind === "mobile" ? "mx-auto w-[62%] max-w-[300px]" : "w-full"}`}
          >
            {coverShot.kind === "mobile" ? (
              <PhoneFrame shot={coverShot} sizes="300px" />
            ) : (
              <BrowserFrame shot={coverShot} title={cover.name} sizes="(min-width: 1024px) 45vw, 92vw" />
            )}
          </button>
        </section>

        {/* progetti */}
        <section id="progetti" className="border-y border-border/60 bg-secondary/10 py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="mb-2 text-center font-heading text-2xl font-bold md:text-4xl">Progetti reali, schermate reali</h2>
            <p className="mx-auto mb-8 max-w-2xl text-center text-muted-foreground">
              Ognuno è partito da un processo concreto. Tocca una scheda per vedere le schermate.
            </p>
            <div className={`grid gap-4 sm:grid-cols-2 ${c.projects.length > 2 ? "lg:grid-cols-3" : "mx-auto max-w-3xl"}`}>
              {c.projects.map((pid) => {
                const p = byId(pid);
                const shot = p.shots[p.hero];
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={(e) => openAt(p, p.hero, e.currentTarget)}
                    style={brandVars(p)}
                    className="group overflow-hidden rounded-2xl border border-border/60 bg-background text-left shadow-sm transition hover:-translate-y-1 hover:border-[color:var(--brand)]/60 hover:shadow-lg"
                  >
                    <img
                      src={shotSrc(shot, shot.sizes[0])}
                      srcSet={shotSrcSet(shot)}
                      sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className={`block aspect-[16/10] w-full border-b border-border/60 object-cover ${shot.kind === "mobile" ? "object-[50%_15%]" : "object-left-top"}`}
                    />
                    <div className="p-4">
                      <div className="flex items-center gap-2">
                        <ProjectLogo p={p} className="h-6 max-w-[84px]" />
                        <span className="font-bold">{p.name}</span>
                      </div>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{p.kind}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.tagline}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <Reviews max={3} className="!py-12 md:!py-16" />

        {/* metodo */}
        <section className="container mx-auto px-4 py-12 md:px-6 md:py-16">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold md:text-4xl">Come lavoriamo</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.title} className="rounded-2xl border border-border/60 p-6">
                <div className="mb-2 font-mono text-4xl font-black text-primary/70">0{i + 1}</div>
                <h3 className="mb-1 text-lg font-bold">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* domande */}
        <section className="container mx-auto max-w-3xl px-4 pb-12 md:px-6 md:pb-16">
          <h2 className="mb-6 text-center font-heading text-2xl font-bold md:text-3xl">Domande frequenti</h2>
          <div className="divide-y divide-border/60 rounded-2xl border border-border/60">
            {FAQ.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="cursor-pointer list-none font-semibold marker:hidden">
                  {f.q}
                </summary>
                <p className="mt-2 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* contatto */}
        <section id="contact" className="border-t border-border/60 bg-secondary/10 py-12 md:py-16">
          <div className="container mx-auto max-w-2xl px-4 md:px-6">
            <h2 className="mb-2 text-center font-heading text-2xl font-bold md:text-4xl">Raccontami il tuo caso</h2>
            <p className="mb-8 text-center text-muted-foreground">
              Risposta media entro 24 ore lavorative, con una proposta concreta e comprensibile.
            </p>
            <LeadForm
              source={id}
              objectiveLabel={c.objectiveLabel}
              objectivePlaceholder={c.objectivePlaceholder}
            />
          </div>
        </section>
      </main>

      <Footer />
      <ConsentBanner />
      <WhatsAppButton text={c.whatsappText} />
      <ProjectGallery
        project={open?.project ?? null}
        startIndex={open?.index ?? 0}
        onClose={() => setOpen(null)}
        openerRef={openerRef}
      />
    </div>
  );
}
