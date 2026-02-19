import { CheckCircle2 } from "lucide-react";
import profilePic from "@assets/fotoprofilo_1771501967887.png";

export function WhyMe() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold font-heading mb-6">
              Metodo, chiarezza e <span className="text-primary">soluzioni pronte all'uso</span>.
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Il mio background nasce dalla gestione operativa reale. Ho imparato a gestire la complessità organizzando flussi di dati critici dove l'errore non era ammesso.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Oggi applico quel metodo per aiutare freelance e PMI a fare ordine. Non cerco l'effetto speciale, ma la consegna pulita, documentata e facile da mantenere.
            </p>
            
            <div className="space-y-4">
              {[
                "Approccio pragmatico orientato all'ordine",
                "Soluzioni personalizzate, non standard",
                "Documentazione chiara per ogni consegna",
                "Supporto diretto e comunicazione semplice"
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
