import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { LeadForm } from "@/components/LeadForm";
import { Mail, Phone, Linkedin, Github, MapPin } from "lucide-react";

export function Contact() {
  return (
    // sezione normale, non pinnata: contatti e form insieme sono più alti dello
    // schermo (sui telefoni quasi il doppio) e devono poter scorrere
    <section id="contact" data-arrive="0" className="relative flex min-h-screen items-center pt-24 pb-16 md:pb-24">
      <div className="container mx-auto px-4 md:px-6 w-full">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <div className="flex justify-center mb-4"><Eyebrow>Contatto</Eyebrow></div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Apriamo un canale</h2>
            <p className="text-muted-foreground text-lg">
              Ti rispondo con una proposta concreta e comprensibile, senza tecnicismi inutili.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            <Reveal>
            <Card className="h-full border-border/80 bg-background/25 backdrop-blur-md">
              <CardContent className="p-8 space-y-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">Contatti</h3>
                  <div className="space-y-4">
                    <a href="mailto:info@samuelefelici.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors" data-testid="link-email">
                      <Mail className="w-5 h-5" />
                      info@samuelefelici.com
                    </a>
                    <a href="tel:+393341265750" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors" data-testid="link-phone">
                      <Phone className="w-5 h-5" />
                      +39 334 126 5750
                    </a>
                    <a href="https://github.com/samuelefelici" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors" data-testid="link-github">
                      <Github className="w-5 h-5" />
                      github.com/samuelefelici
                    </a>
                    <a href="https://www.linkedin.com/in/samuele-felici-a58197139/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors" data-testid="link-linkedin">
                      <Linkedin className="w-5 h-5" />
                      LinkedIn
                    </a>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="w-5 h-5" />
                      Camerano (AN) · da remoto e in trasferta
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-primary/5 rounded-lg border border-primary/10 space-y-2">
                  <p className="text-sm text-muted-foreground font-medium">Risposta media: entro 24 ore lavorative</p>
                  <p className="text-sm text-muted-foreground">Analizziamo insieme il processo e ti propongo più alternative, con tempi e budget, prima di iniziare.</p>
                </div>
              </CardContent>
            </Card>
            </Reveal>

            <Reveal delay={0.1}>
              <LeadForm source="home" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
