import { CheckCircle2 } from "lucide-react";
import profilePic from "@assets/foto.jpg";
import { SectionVideo } from "@/components/SectionVideo";

export function WhyMe() {
  const paragraphs = [
    "Gestisci ancora la tua azienda tra fogli Excel, messaggi WhatsApp e carta? C'e un modo migliore.",
    "Sono Samuele Felici. Sviluppo applicazioni su misura per piccole imprese che vogliono smettere di perdere tempo in operazioni manuali.",
    "Non sono il classico sviluppatore che parla solo di tecnologia. Vengo da anni di gestione operativa - coordinamento del personale, pianificazione, organizzazione dei processi. So com'e mandare avanti un'azienda da dentro, non da dietro uno schermo.",
    "Quando un imprenditore mi racconta che perde due ore al giorno a copiare dati da un foglio all'altro, o che non riesce a capire come sta andando il mese senza chiamare il commercialista, non ho bisogno che me lo spieghi due volte.",
    "Studio Ingegneria Informatica al Politecnico di Milano e costruisco strumenti semplici: un'app che consulti dal telefono, un gestionale che fa in automatico quello che oggi fai a mano, un pannello dove vedi i numeri che contano senza aspettare nessuno.",
    "Lavori direttamente con me, dall'inizio alla consegna - e anche dopo.",
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold font-heading mb-6">
              Dalla tua operativita quotidiana a <span className="text-primary">strumenti digitali semplici</span>.
            </h2>
            <div className="space-y-5 mb-8">
              {paragraphs.map((text, i) => (
                <p key={i} className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {text}
                </p>
              ))}
            </div>

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

        <SectionVideo name="04-perche-io" className="mt-14 max-w-3xl mx-auto" />
      </div>
    </section>
  );
}
