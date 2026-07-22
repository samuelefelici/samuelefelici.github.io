import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, AppWindow, Workflow, Bot, LineChart, ShieldCheck, Rocket, Layers3, Wand2 } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";

const services = [
  {
    icon: Globe,
    title: "Siti Web & Landing Page",
    description: "Un sito chiaro, veloce e professionale che racconta il tuo valore e converte visite in richieste.",
    details: ["Design su misura e mobile-first", "SEO tecnica e performance elevate", "Messa online completa senza stress"]
  },
  {
    icon: AppWindow,
    title: "App & Software su misura",
    description: "Applicativi che ti fanno risparmiare tempo, riducono errori e rendono i processi più semplici da gestire.",
    details: ["Analisi operativa del tuo flusso", "Sviluppo moduli realmente utili", "Supporto e miglioramenti continui"]
  },
  {
    icon: Workflow,
    title: "Automazioni & Script",
    description: "Automazioni pratiche per eliminare attività ripetitive e liberare tempo per attività ad alto valore.",
    details: ["Integrazione tra strumenti esistenti", "Flussi automatici affidabili", "Report e controlli in tempo reale"]
  }
];

export function Services() {
  const stackBadges = [
    { icon: Layers3, label: "React" },
    { icon: Bot, label: "Automazioni" },
    { icon: LineChart, label: "Analytics" },
    { icon: ShieldCheck, label: "Affidabilita" },
  ];

  return (
    <section id="services" className="py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <Reveal className="mb-14">
          <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-background/55 backdrop-blur-xl p-7 md:p-10">
            <div className="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl" aria-hidden />
            <div className="absolute -bottom-24 -left-12 w-60 h-60 rounded-full bg-cyan-400/20 blur-3xl" aria-hidden />

            <div className="relative grid lg:grid-cols-[1.25fr_0.75fr] gap-8 items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Servizi</p>
                <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 leading-tight">
                  Soluzioni digitali pensate per farti crescere
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl">
                  Non pacchetti standard: ogni progetto viene costruito attorno ai tuoi obiettivi, con un percorso semplice e misurabile.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {stackBadges.map((badge) => (
                  <div key={badge.label} className="rounded-2xl border border-border/70 bg-background/60 backdrop-blur-md px-4 py-3 shadow-sm">
                    <badge.icon className="w-5 h-5 text-primary mb-2" />
                    <p className="text-sm font-semibold">{badge.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-7 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 backdrop-blur-md px-3 py-1.5"><Rocket className="w-3.5 h-3.5 text-primary" /> Go-live rapido</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 backdrop-blur-md px-3 py-1.5"><Wand2 className="w-3.5 h-3.5 text-primary" /> Design su misura</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 backdrop-blur-md px-3 py-1.5"><ShieldCheck className="w-3.5 h-3.5 text-primary" /> Base solida e scalabile</span>
            </div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border border-border/80 bg-background/55 backdrop-blur-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden" data-testid={`card-service-${index}`}>
                <CardHeader>
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/40 via-cyan-400/60 to-amber-300/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary ring-1 ring-primary/20">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-extrabold text-primary/90 bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">0{index + 1}</span>
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base mt-2 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.details.map((detail, i) => (
                      <li key={i} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
