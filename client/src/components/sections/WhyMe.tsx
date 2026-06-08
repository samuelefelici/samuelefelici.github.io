import { CheckCircle2 } from "lucide-react";
import profilePic from "@assets/foto.jpg";

export function WhyMe() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold font-heading mb-6">
              Non solo codice: <span className="text-primary">capisco i tuoi processi</span>.
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Prima ancora di sviluppare, vengo dalla gestione operativa: anni a coordinare turni, flotte e persone mi hanno insegnato a leggere un'organizzazione e a individuare in fretta dove si nascondono i colli di bottiglia.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Per te significa software che nasce dal problema reale, non dalla tecnologia. E lavorando come freelance senza struttura: costi contenuti, rapporto diretto e soluzioni su misura, ideali per chi vuole partire in fretta e senza grandi budget.
            </p>

            <div className="space-y-4">
              {[
                "Esperienza operativa e gestionale reale",
                "Individuo i colli di bottiglia nei processi",
                "Software che parte dal problema, non dal codice",
                "Rapporto diretto e supporto dopo la consegna"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative order-1 md:order-2">
            <div className="aspect-[4/5] md:aspect-square bg-muted rounded-2xl overflow-hidden relative z-10 shadow-xl border border-border">
               <img 
                 src={profilePic} 
                 alt="Samuele Felici" 
                 className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
            </div>
            {/* Decor element */}
            <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-primary/10 rounded-2xl -z-10 animate-pulse" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/5 rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
