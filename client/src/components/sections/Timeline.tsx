import { Badge } from "@/components/ui/badge";

const experience = [
  {
    role: "Specialista Pianificazione e Roster",
    company: "CONEROBUS S.p.A.",
    period: "Dic 2021 – Presente",
    description: "Gestione pianificazione e turni per 150+ risorse. Ottimizzazione flussi e analisi KPI operativi."
  },
  {
    role: "Gestore Autotrasporto",
    company: "CONEROBUS SERVICE S.r.l.",
    period: "Dic 2022 – Set 2024",
    description: "Coordinamento flotta e personale, gestione logistica e monitoraggio efficienza."
  },
  {
    role: "Operatore di esercizio",
    company: "CONEROBUS S.p.A.",
    period: "Gen 2018 – Dic 2021",
    description: "Esperienza diretta sul campo, fondamentale per comprendere le dinamiche del lavoro operativo."
  }
];

const skills = [
  "Excel Avanzato", "MySQL / SQL", "Python", "Power BI", "Streamlit", "Dashboard Design", "GitHub Copilot", "Data Cleaning"
];

export function Timeline() {
  return (
    <section id="timeline" className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold font-heading mb-8">Percorso ed Esperienza</h2>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-muted-foreground/20 before:to-transparent">
              {experience.map((job, index) => (
                <div key={index} className="relative flex items-start group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow-sm shrink-0 z-10 group-hover:border-primary transition-colors">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground group-hover:bg-primary transition-colors" />
                  </div>
                  <div className="ml-6">
                    <span className="text-sm font-medium text-primary mb-1 block">{job.period}</span>
                    <h3 className="text-xl font-bold text-foreground">{job.role}</h3>
                    <p className="text-muted-foreground font-medium mb-2">{job.company}</p>
                    <p className="text-muted-foreground max-w-lg">{job.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/3">
            <div className="sticky top-24">
              <h2 className="text-3xl font-bold font-heading mb-8">Competenze</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm py-1.5 px-3 hover:bg-primary/10 hover:text-primary transition-colors cursor-default">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
