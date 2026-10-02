import { Scene } from "@/components/Scene";

const steps = [
  { num: "01", title: "Analisi", desc: "Studiamo insieme il processo: chi fa cosa, dove si perde tempo, quali controlli servono." },
  { num: "02", title: "Alternative", desc: "Ti propongo più strade, dall'automazione mirata al gestionale completo, con costi e tempi a confronto." },
  { num: "03", title: "Sviluppo", desc: "Costruisco la soluzione scelta con rilasci frequenti che puoi provare subito." },
  { num: "04", title: "Avvio", desc: "Importazione dei dati, formazione e avvio affiancato del tuo team." },
  { num: "05", title: "Assistenza", desc: "Manutenzione, nuove funzioni e supporto anche dopo la consegna." }
];

// i cinque step compaiono in cascata, come gli impulsi lungo la treccia nel video
const STEP_FROM = [0.12, 0.23, 0.34, 0.45, 0.56];

export function Process() {
  return (
    <Scene id="process" heightVh={300}>
      <div className="absolute inset-0 flex items-center pt-16">
        <div className="container mx-auto px-4 md:px-6">
          <div data-from="0.03" data-to="0.9">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-16 text-center">Dal processo alla soluzione, in cinque passi</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} data-from={STEP_FROM[index]} data-to="0.9" className="relative text-center group">
                <div className="text-6xl font-black text-primary/65 dark:text-primary/75 mb-4 group-hover:text-primary transition-colors font-mono drop-shadow-[0_2px_10px_hsl(var(--primary)/0.28)]">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Scene>
  );
}
