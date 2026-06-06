import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Lock, Theater, ShieldCheck, Ship, Globe, ListOrdered } from "lucide-react";
import { motion } from "framer-motion";

const GITHUB_URL = "https://github.com/samuelefelici";

/**
 * Mini case-study. Per i progetti usati da clienti il codice è privato:
 * NON si linka il repo (darebbe 404). Si racconta il problema risolto.
 * Sostituisci le descrizioni con quelle reali quando vuoi.
 */
const projects = [
  {
    icon: Theater,
    title: "Sipario",
    description: "Applicazione per la gestione e organizzazione di eventi e spettacoli: pianificazione, logistica e flussi operativi in un unico strumento.",
    tags: ["Python", "Gestionale"],
    client: true
  },
  {
    icon: ShieldCheck,
    title: "Cerbero",
    description: "Strumento di controllo e sicurezza dei dati: gestione di accessi, permessi e verifiche in modo affidabile e tracciabile.",
    tags: ["Python", "Security"],
    client: true
  },
  {
    icon: Ship,
    title: "Caronte",
    description: "Utility per il trasferimento e la migrazione di dati tra sistemi diversi, in modo rapido, sicuro e controllato.",
    tags: ["Python", "Tool"],
    client: true
  },
  {
    icon: Globe,
    title: "Siti Web",
    description: "Siti vetrina e landing page responsive per attività e professionisti, ottimizzati per velocità, mobile e visibilità.",
    tags: ["React", "Web"],
    client: false
  },
  {
    icon: ListOrdered,
    title: "Algoritmi di ordinamento",
    description: "Implementazione e confronto di algoritmi di ordinamento, con analisi delle performance. Progetto pubblico su GitHub.",
    tags: ["Algoritmi", "Python"],
    client: false
  }
];

export function Portfolio() {
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
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              data-testid={`card-project-${index}`}
            >
              <Card className="h-full border border-border shadow-sm hover:shadow-md transition-shadow">
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
                  <CardTitle className="text-lg">{project.title}</CardTitle>
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
                </CardContent>
              </Card>
            </motion.div>
          ))}

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
    </section>
  );
}
