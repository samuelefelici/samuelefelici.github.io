import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ArrowUpRight, Theater, ShieldCheck, Ship, Globe, ListOrdered } from "lucide-react";
import { motion } from "framer-motion";

const GITHUB_URL = "https://github.com/samuelefelici";

/**
 * NB: le descrizioni qui sotto sono una bozza.
 * Sostituiscile con la descrizione reale di ogni progetto
 * (e con il link al repository corretto, se diverso).
 */
const projects = [
  {
    icon: Theater,
    title: "Sipario",
    description: "Applicazione per la gestione e organizzazione di eventi e spettacoli, pensata per semplificare pianificazione e logistica.",
    tags: ["Python", "App"],
    repo: `${GITHUB_URL}/Sipario`
  },
  {
    icon: ShieldCheck,
    title: "Cerbero",
    description: "Strumento di controllo e sicurezza: monitora, verifica e protegge i dati gestendo accessi e permessi in modo affidabile.",
    tags: ["Python", "Security"],
    repo: `${GITHUB_URL}/Cerbero`
  },
  {
    icon: Ship,
    title: "Caronte",
    description: "Utility per il trasferimento e la migrazione di dati tra sistemi diversi, in modo rapido e controllato.",
    tags: ["Python", "Tool"],
    repo: `${GITHUB_URL}/Caronte`
  },
  {
    icon: Globe,
    title: "Siti Web",
    description: "Siti vetrina e landing page responsive per attività e professionisti, ottimizzati per velocità e dispositivi mobili.",
    tags: ["React", "HTML/CSS", "Web"],
    repo: GITHUB_URL
  },
  {
    icon: ListOrdered,
    title: "Algoritmi di ordinamento",
    description: "Implementazione e confronto di algoritmi di ordinamento, con visualizzazione e analisi delle performance.",
    tags: ["Algoritmi", "Python"],
    repo: GITHUB_URL
  }
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-heading mb-4">Progetti realizzati</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Una selezione di app, strumenti e siti che ho costruito. Trovi il codice e molto altro sul mio GitHub.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.a
              key={index}
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              data-testid={`card-project-${index}`}
            >
              <Card className="h-full border border-border shadow-sm hover:shadow-md hover:border-primary/40 transition-all group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      <project.icon className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
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
            </motion.a>
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
              <CardTitle className="text-lg mb-2">Tutti i progetti</CardTitle>
              <p className="text-sm text-muted-foreground mb-5">
                Esplora il codice completo, i progetti in corso e gli esperimenti sul mio profilo GitHub.
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
