import { Badge } from "@/components/ui/badge";
import { Layers, Server, Cpu, Wrench } from "lucide-react";
import { Scene } from "@/components/Scene";

const groups = [
  {
    icon: Layers,
    title: "Frontend",
    skills: ["React", "TypeScript", "Tailwind CSS", "Vite", "Mapbox GL", "Recharts"],
  },
  {
    icon: Server,
    title: "Backend & Database",
    skills: ["Node.js", "Express", "PostgreSQL", "Drizzle ORM", "API REST"],
  },
  {
    icon: Cpu,
    title: "Python & Ottimizzazione",
    skills: ["Python", "Google OR-Tools (CP-SAT)", "Automazioni", "Streamlit", "Power BI"],
  },
  {
    icon: Wrench,
    title: "Dominio & Strumenti",
    skills: ["GTFS / GTFS-Fares", "SQL", "GIS", "Git & GitHub"],
  },
];

// le card si accendono in sequenza, come i nodi lungo la fibra nel video
const CARD_FROM = [0.22, 0.36, 0.5, 0.64];

export function Timeline() {
  return (
    <Scene id="competenze" heightVh={280}>
      <div className="absolute inset-0 flex items-center pt-16">
        <div className="container mx-auto px-4 md:px-6">
          <div data-from="0.03" data-to="0.92" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Competenze & Tecnologie</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dalla gestione operativa allo sviluppo: unisco competenze tecniche solide alla conoscenza
              diretta dei processi reali. Ecco gli strumenti con cui costruisco le soluzioni.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {groups.map((group, index) => (
              <div
                key={group.title}
                data-from={CARD_FROM[index]}
                data-to="0.94"
                className="rounded-xl border border-border bg-card/25 backdrop-blur-md p-5"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <group.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-3">{group.title}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs font-medium">
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
