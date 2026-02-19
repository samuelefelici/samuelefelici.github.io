import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, ShieldAlert } from "lucide-react";

const cases = [
  {
    icon: TrendingUp,
    title: "Controllo Fatturato Automatico",
    description: "Sostituzione di un processo manuale di estrazione dati con un report automatico che mostra vendite e margini per ogni singolo cliente."
  },
  {
    icon: ShieldAlert,
    title: "Pulizia Anagrafiche Clienti",
    description: "Riordino e unificazione di database frammentati in diversi file Excel, creando un'unica fonte di verità strutturata e senza duplicati."
  },
  {
    icon: Users,
    title: "Dashboard KPI Mensili",
    description: "Creazione di una vista semplificata dei principali indicatori di business per permettere al titolare di decidere dove investire mese dopo mese."
  }
];

export function UseCases() {
  return (
    <section id="cases" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold font-heading mb-12 text-center">Esempi di quello che possiamo fare</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((item, index) => (
            <Card key={index} className="bg-background border-none shadow-sm" data-testid={`card-usecase-${index}`}>
              <CardHeader>
                <item.icon className="w-10 h-10 text-primary mb-3" />
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
