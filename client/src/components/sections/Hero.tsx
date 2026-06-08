import { Button } from "@/components/ui/button";
import { ArrowRight, Code2 } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Sfondo aurora con i colori del brand */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-24 w-[28rem] h-[28rem] rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute top-0 right-0 w-[24rem] h-[24rem] rounded-full bg-[#8b5cf6]/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/4 w-[22rem] h-[22rem] rounded-full bg-[#22c55e]/15 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 w-[20rem] h-[20rem] rounded-full bg-[#f97316]/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
          {/* Testo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Disponibile per nuovi progetti
            </span>
            <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-tight text-foreground mb-6 leading-tight">
              Trasformo le tue idee in <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-primary via-[#8b5cf6] to-[#22c55e] bg-clip-text text-transparent">
                software e siti web
              </span>{" "}
              pronti all'uso.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
              Sviluppatore freelance con un background nella gestione operativa: non scrivo solo codice,
              capisco i tuoi processi e dove si bloccano. Creo app su misura, siti web e automazioni che
              risolvono problemi concreti.
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

          {/* Showcase: mockup browser con screenshot reale */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            {/* bagliore dietro */}
            <div aria-hidden className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-primary/20 via-[#8b5cf6]/15 to-transparent blur-2xl" />

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-xl border border-border bg-card shadow-2xl overflow-hidden"
            >
              {/* barra browser */}
              <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-border bg-secondary/40">
                <span className="w-3 h-3 rounded-full bg-red-400/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                <span className="w-3 h-3 rounded-full bg-green-400/70" />
                <span className="ml-3 text-xs text-muted-foreground truncate">cerbero · transit intelligence platform</span>
              </div>
              <img
                src="/assets/cerbero-dashboard.jpg?v=3"
                alt="Cerbero — piattaforma di intelligence per il Trasporto Pubblico Locale"
                loading="eager"
                className="w-full h-auto block"
              />
            </motion.div>

            <span className="absolute -bottom-3 right-4 text-xs text-muted-foreground bg-background/80 backdrop-blur px-2 py-1 rounded-md border border-border">
              Progetto reale in esercizio
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
