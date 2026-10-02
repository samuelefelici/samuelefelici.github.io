import { Badge } from "@/components/ui/badge";
import { Layers, Server, Cpu, Wrench } from "lucide-react";
import { Scene } from "@/components/Scene";

const groups = [
  {
    icon: Layers,
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Mapbox GL"],
  },
  {
    icon: Server,
    title: "Backend & Database",
    skills: ["Node.js", "Express", "PostgreSQL", "Drizzle ORM", "OpenAPI", "Vitest / Pytest"],
  },
  {
    icon: Cpu,
    title: "Dati & Ottimizzazione",
    skills: ["Python", "OR-Tools CP-SAT", "SQL", "Power BI", "Power Query / DAX", "Looker Studio"],
  },
  {
    icon: Wrench,
    title: "Metodo & Rilascio",
    skills: ["Analisi dei processi", "Test automatici", "Git", "Docker", "Claude Code / Copilot"],
  },
];

// le card si accendono in sequenza, come i nodi lungo la fibra nel video
const CARD_FROM = [0.14, 0.26, 0.38, 0.5];

export function Timeline() {
  return (
    <Scene id="competenze" heightVh={280}>
      <div className="absolute inset-0 flex items-center pt-16">
        <div className="container mx-auto px-4 md:px-6">
          <div data-from="0.03" data-to="0.9" className="text-center mb-5 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold font-heading mb-2 md:mb-4">Competenze & Tecnologie</h2>
            <p className="hidden text-muted-foreground max-w-2xl mx-auto sm:block">
              Tecnologie moderne e collaudate, scelte per durare: gli strumenti con cui costruisco
              gestionali, sistemi di controllo e automazioni.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
            {groups.map((group, index) => (
              <div
                key={group.title}
                data-from={CARD_FROM[index]}
                data-to="0.9"
                className="rounded-xl border border-border bg-card/25 backdrop-blur-md p-3 md:p-5"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2 md:mb-4">
                  <group.icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm md:text-base font-semibold mb-2 md:mb-3">{group.title}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="px-1.5 text-[10px] md:px-2.5 md:text-xs font-medium">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Scene>
  );
}
