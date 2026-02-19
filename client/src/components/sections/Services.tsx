import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Database, Workflow } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: BarChart3,
    title: "Audit Dati Iniziale",
    description: "Un micro-servizio per capire dove sei e dove puoi arrivare. Analizzo i tuoi file attuali per eliminare il superfluo.",
    details: ["Analisi qualità file esistenti", "Definizione KPI di base", "Piano d'azione operativo"],
    price: "150 – 250€"
  },
  {
    icon: Database,
    title: "Sistemi Dati & Database",
    description: "Dimentica i file sparsi. Organizzo le tue informazioni in database relazionali solidi e pronti all'uso.",
    details: ["Pulizia e riorganizzazione dati", "Modellazione MySQL/SQL", "Creazione query di estrazione"],
    price: "300 – 700€"
  },
  {
    icon: Workflow,
    title: "Dashboard & Report",
    description: "Visualizza l'andamento del tuo business in tempo reale con report automatici e dashboard interattive.",
    details: ["Report Power BI o Streamlit", "Automazioni leggere (Python)", "Consegna documentata"],
    price: "400 – 800€"
  }
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-heading mb-4">Servizi e soluzioni pratiche</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pacchetti chiari pensati per micro-aziende e professionisti che vogliono smettere di lottare con i fogli di calcolo.
          </p>
        </div>

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
                  <ul className="space-y-2 mb-6">
                    {service.details.map((detail, i) => (
                      <li key={i} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <div className="text-xs font-semibold text-primary bg-primary/5 px-3 py-1.5 rounded-full inline-block">
                    Investimento indicativo: {service.price}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
