import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, AppWindow, Workflow } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";

const services = [
  {
    icon: Globe,
    title: "Siti Web & Landing Page",
    description: "Siti vetrina e landing page veloci, responsive e curati. Dalla grafica alla messa online, pronti a portarti clienti.",
    details: ["Design responsive mobile-first", "SEO di base e performance", "Dominio, hosting e pubblicazione"]
  },
  {
    icon: AppWindow,
    title: "App & Software su misura",
    description: "Web app, gestionali e strumenti costruiti intorno al tuo flusso di lavoro. Niente template: solo ciò che ti serve davvero.",
    details: ["Web app e gestionali", "Database e logica applicativa", "Manuale d'uso e supporto"]
  },
  {
    icon: Workflow,
    title: "Automazioni & Script",
    description: "Elimino i task ripetitivi: script che fanno il lavoro noioso al posto tuo, in pochi secondi e senza errori.",
    details: ["Automazione processi ripetitivi", "Integrazioni tra strumenti", "Elaborazione dati e report"]
  }
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl font-bold font-heading mb-4">Cosa posso costruire per te</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Soluzioni chiare e su misura per chi vuole partire in fretta, senza grandi budget e senza complicazioni tecniche.
          </p>
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
              <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow" data-testid={`card-service-${index}`}>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base mt-2">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.details.map((detail, i) => (
                      <li key={i} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2" />
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
