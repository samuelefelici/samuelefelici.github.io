import { Button } from "@/components/ui/button";
import { ArrowRight, Code2 } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 opacity-10">
        <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#2563EB" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.4,82.2,23.1,70.8,34.3C59.4,45.5,47.9,54.2,35.6,60.8C23.3,67.4,10.2,71.9,-1.8,75C-13.8,78.1,-29.4,79.8,-43.3,74.7C-57.2,69.6,-69.4,57.7,-77.4,44.1C-85.4,30.5,-89.2,15.2,-87.4,0.9C-85.6,-13.4,-78.2,-26.8,-68.6,-38.6C-59,-50.4,-47.2,-60.6,-34.2,-68.2C-21.2,-75.8,-7,-80.8,5.4,-90.1L17.8,-99.4" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Disponibile per nuovi progetti
            </span>
            <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-tight text-foreground mb-6 leading-tight">
              Trasformo le tue idee in <br/>
              <span className="text-primary">software e siti web</span> pronti all'uso.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              Sviluppatore freelance con un background nella gestione operativa: non scrivo solo codice, capisco i tuoi processi e dove si bloccano. Creo app su misura, siti web e automazioni che risolvono problemi concreti. Base ad Ancona, lavoro da remoto in tutta Italia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2" asChild data-testid="button-contact">
                <a href="#contact">
                  Richiedi un preventivo
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild data-testid="button-projects">
                <a href="#portfolio">
                  <Code2 className="w-4 h-4" />
                  Guarda i progetti
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
