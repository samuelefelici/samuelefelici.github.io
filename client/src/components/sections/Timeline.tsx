import { Badge } from "@/components/ui/badge";
import { Layers, Server, Cpu, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";

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

export function Timeline() {
  return (
    <section id="competenze" className="py-20 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl font-bold font-heading mb-4">Competenze & Tecnologie</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dalla gestione operativa allo sviluppo: unisco competenze tecniche solide alla conoscenza
            diretta dei processi reali. Ecco gli strumenti con cui costruisco le soluzioni.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {groups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-xl border border-border bg-card/50 p-5"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
