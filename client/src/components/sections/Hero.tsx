import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, CircleCheckBig, Clock3 } from "lucide-react";
import { motion } from "framer-motion";
import { SectionVideo } from "@/components/SectionVideo";

export function Hero() {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold font-heading tracking-tight text-foreground mb-6 leading-[1.05]">
              Siti web e software
              <span className="block text-primary">che portano clienti</span>
              e semplificano il lavoro.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-9 max-w-2xl leading-relaxed">
              Aiuto aziende e professionisti a trasformare idee in strumenti concreti: siti web che comunicano valore, applicativi su misura e automazioni che eliminano attività ripetitive.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2 rounded-full px-7 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20" asChild data-testid="button-contact">
                <a href="#contact">
                  Richiedi una consulenza
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 rounded-full px-7 transition-all hover:-translate-y-0.5" asChild data-testid="button-projects">
                <a href="#cerbero">
                  <Code2 className="w-4 h-4" />
                  Vedi caso studio
                </a>
              </Button>
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-3 text-sm">
              <div className="rounded-xl bg-background/85 border border-border p-3 font-medium text-muted-foreground">Analisi obiettivi gratuita</div>
              <div className="rounded-xl bg-background/85 border border-border p-3 font-medium text-muted-foreground">Lavoro remoto in tutta Italia</div>
              <div className="rounded-xl bg-background/85 border border-border p-3 font-medium text-muted-foreground">Roadmap chiara fin dal giorno 1</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="rounded-3xl border border-border/80 bg-background/85 backdrop-blur-xl p-6 md:p-7 shadow-xl">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-5">Come lavoro</p>
              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-xl border border-border/80 bg-secondary/35 p-4">
                  <CircleCheckBig className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Focus sul risultato</p>
                    <p className="text-sm text-muted-foreground">Ogni soluzione nasce da un obiettivo di business, non da una moda tecnica.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-border/80 bg-secondary/35 p-4">
                  <Clock3 className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Tempi e budget sotto controllo</p>
                    <p className="text-sm text-muted-foreground">Step chiari, priorita condivise e rilasci progressivi senza sorprese.</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-primary text-primary-foreground p-5">
                  <p className="text-xs uppercase tracking-[0.16em] opacity-90">Obiettivo tipico</p>
                  <p className="text-lg font-bold mt-1">Più richieste qualificate e meno attività manuali</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <SectionVideo name="01-hero" className="mt-14 max-w-5xl mx-auto" delay={0.1} />
      </div>
    </section>
  );
}
