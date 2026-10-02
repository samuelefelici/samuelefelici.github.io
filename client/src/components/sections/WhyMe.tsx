import { CheckCircle2 } from "lucide-react";
import profilePic from "@assets/foto.jpg";
import { Scene } from "@/components/Scene";

export function WhyMe() {
  const paragraphs = [
    "Lavoro con aziende e professionisti che gestiscono processi complessi — ordini, turni, flotte, magazzino, controlli — e vogliono smettere di inseguirli tra fogli Excel, email e telefonate.",
    "Prima di scrivere codice studio come lavorate davvero: chi inserisce i dati, dove si perdono, quali controlli servono e chi deve vedere cosa. Da lì nascono le alternative che ti propongo, ognuna con costi, tempi e limiti chiari.",
    "Vengo dall'operatività: so cosa vuol dire usare un software tutti i giorni, sotto pressione. Per questo costruisco strumenti semplici da usare e solidi sotto il cofano.",
  ];

  return (
    <Scene id="about" heightVh={260}>
      {/* fase 1: chi sono */}
      <div data-from="0.03" data-to="0.46" className="absolute inset-0 flex items-center pt-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-3xl border border-border/60 bg-background/25 backdrop-blur-md p-6 md:p-8">
              <h2 className="text-3xl font-bold font-heading mb-6">
                Prima capisco il <span className="text-primary">processo</span>. Poi lo scrivo in codice.
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
              Sviluppo gestionali, sistemi di controllo e app per chi lavora sul campo con Next.js, Python e PostgreSQL, con codice e dati che restano tuoi.
            </p>
            <p className="text-base md:text-lg font-semibold text-foreground mb-8">
              Lavori direttamente con me, dall'inizio alla consegna — e anche dopo.
            </p>
            <div className="space-y-4">
              {[
                "Analisi del processo prima del preventivo",
                "Più alternative, con costi e tempi a confronto",
                "Rilasci frequenti: vedi il software crescere",
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
