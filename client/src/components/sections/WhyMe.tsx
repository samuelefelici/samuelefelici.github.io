import { CheckCircle2 } from "lucide-react";
import profilePic from "@assets/foto.jpg";
import { Scene } from "@/components/Scene";

export function WhyMe() {
  const paragraphs = [
    "Sono Samuele Felici. Nel trasporto pubblico ho iniziato alla guida, poi sono passato alla programmazione del servizio e alla pianificazione del personale. Oggi coordino turni, rotazioni e coperture di oltre 320 conducenti in Conerobus.",
    "Non sono un tecnico che parla solo di codice. I processi che gestisco ogni giorno — turni, coperture, vincoli di contratto e di legge — li conosco da dentro. E quando un processo è ripetitivo o fragile, lo riscrivo in software.",
    "Internamente ho automatizzato la formattazione dei cartellini, rivisto i programmi che generano il servizio giornaliero e alimentano il payroll, e costruito la reportistica Power BI sul personale.",
  ];

  return (
    <Scene id="about" heightVh={260}>
      {/* fase 1: chi sono */}
      <div data-from="0.03" data-to="0.46" className="absolute inset-0 flex items-center pt-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-3xl border border-border/60 bg-background/25 backdrop-blur-md p-6 md:p-8">
              <h2 className="text-3xl font-bold font-heading mb-6">
                Conosco i processi <span className="text-primary">da dentro</span>. Poi li scrivo in codice.
              </h2>
              <div className="space-y-4">
                {paragraphs.map((text, i) => (
                  <p key={i} className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {text}
                  </p>
                ))}
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="aspect-square bg-muted rounded-2xl overflow-hidden relative z-10 shadow-xl border border-border max-w-md mx-auto">
                <img
                  src={profilePic}
                  alt="Samuele Felici"
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* fase 2: come lavoro con te */}
      <div data-from="0.5" data-to="0.9" className="absolute inset-0 flex items-center pt-16">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="rounded-3xl border border-border/60 bg-background/25 backdrop-blur-md p-6 md:p-10">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
              In parallelo sviluppo prodotti verticali per il settore — pianificazione, scheduling con solver di ottimizzazione, GTFS, gestionali — con Next.js, Python e PostgreSQL. Studio Ingegneria Informatica e dell'Automazione all'Università Politecnica delle Marche.
            </p>
            <p className="text-base md:text-lg font-semibold text-foreground mb-8">
              Lavori direttamente con me, dall'inizio alla consegna — e anche dopo.
            </p>
            <div className="space-y-4">
              {[
                "Otto anni di operatività reale, non teoria",
                "Individuo i colli di bottiglia perché li ho vissuti",
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
        </div>
      </div>
    </Scene>
  );
}
