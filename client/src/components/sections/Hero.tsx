import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, CircleCheckBig, Clock3 } from "lucide-react";
import { Scene } from "@/components/Scene";

export function Hero() {
  return (
    <Scene id="hero" heightVh={220}>
      <div className="container mx-auto px-4 md:px-6 h-full flex items-center pt-16">
        <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-12 items-center w-full">
          <div>
            <div data-from="0" data-to="0.9">
              <h1 className="text-4xl md:text-6xl font-extrabold font-heading tracking-tight text-foreground mb-6 leading-[1.05]">
                Otto anni dentro il trasporto pubblico.
                <span className="block text-primary">Oggi ne costruisco il software.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-9 max-w-2xl leading-relaxed">
                Coordino il servizio di oltre 320 conducenti in Conerobus e sviluppo prodotti per il settore: pianificazione, scheduling con solver di ottimizzazione, GTFS, gestionali. Capisco il problema prima di scrivere la soluzione.
              </p>
            </div>

            <div data-from="0.06" data-to="0.9" className="flex flex-col sm:flex-row gap-4">
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

            <div data-from="0.14" data-to="0.9" className="mt-8 grid sm:grid-cols-3 gap-3 text-sm">
              <div className="rounded-xl bg-background/25 backdrop-blur-md border border-border p-3 font-medium text-muted-foreground">Dominio TPL + sviluppo full-stack</div>
              <div className="rounded-xl bg-background/25 backdrop-blur-md border border-border p-3 font-medium text-muted-foreground">Da remoto in tutta Italia + trasferte</div>
              <div className="rounded-xl bg-background/25 backdrop-blur-md border border-border p-3 font-medium text-muted-foreground">Software su dati reali, non demo</div>
            </div>
          </div>

          <div data-from="0.26" data-to="0.9" className="hidden lg:block">
            <div className="rounded-3xl border border-border/80 bg-background/25 backdrop-blur-md p-6 md:p-7 shadow-xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary mb-5">Come lavoro</p>
              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-xl border border-border/80 bg-secondary/15 backdrop-blur-sm p-4">
                  <CircleCheckBig className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Dal problema, non dalla tecnologia</p>
                    <p className="text-sm text-muted-foreground">Capisco il processo prima di scrivere una riga di codice.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-border/80 bg-secondary/15 backdrop-blur-sm p-4">
                  <Clock3 className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Un solo interlocutore</p>
                    <p className="text-sm text-muted-foreground">Lavori con me dall'analisi alla consegna, e anche dopo.</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-primary text-primary-foreground p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-90">Cosa ottieni</p>
                  <p className="text-lg font-bold mt-1">Meno lavoro manuale, numeri chiari in tempo reale</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Scene>
  );
}
