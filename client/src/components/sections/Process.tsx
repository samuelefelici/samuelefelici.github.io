export function Process() {
  const steps = [
    { num: "01", title: "Briefing", desc: "Capiamo insieme che dati hai e qual è l'obiettivo." },
    { num: "02", title: "Audit", desc: "Analizzo i file per capire come strutturare il lavoro." },
    { num: "03", title: "Prototipo", desc: "Ti mostro una prima bozza della soluzione." },
    { num: "04", title: "Revisione", desc: "Affiniamo i dettagli in base al tuo feedback." },
    { num: "05", title: "Consegna", desc: "Passaggio dei file e breve formazione all'uso." }
  ];

  return (
    <section id="process" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold font-heading mb-16 text-center">Il mio processo di lavoro</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center group">
              <div className="text-6xl font-bold text-muted/40 mb-4 group-hover:text-primary/20 transition-colors font-mono">
                {step.num}
              </div>
              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
