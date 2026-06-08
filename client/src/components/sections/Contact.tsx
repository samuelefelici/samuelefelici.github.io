import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { PrivacyDialog } from "@/components/PrivacyDialog";
import { Reveal } from "@/components/Reveal";
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

/**
 * Web3Forms — invio email gratuito senza backend.
 * 1. Vai su https://web3forms.com, inserisci la tua email (info@samuelefelici.com)
 *    e ricevi una "Access Key".
 * 2. Incolla la chiave qui sotto al posto del placeholder.
 * Le richieste del form arriveranno direttamente nella tua casella di posta.
 */
const WEB3FORMS_ACCESS_KEY = "54b5a6c4-415e-4bb7-814d-2f2f4e2c6bde";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    objective: "",
    message: ""
  });
  const [status, setStatus] = useState<Status>("idle");
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent) return;
    setStatus("submitting");

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `Nuova richiesta dal sito: ${formData.name}`,
      from_name: "Sito samuelefelici.com",
      name: formData.name,
      email: formData.email,
      obiettivo: formData.objective,
      message: formData.message,
      // honeypot anti-spam: deve restare vuoto
      botcheck: (e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement)?.checked
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", objective: "", message: "" });
        setConsent(false);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-4">Parliamo del tuo progetto</h2>
            <p className="text-muted-foreground">
              Raccontami la tua idea e ti rispondo con una proposta concreta. Solitamente entro 24 ore.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8 space-y-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">Contatti</h3>
                  <div className="space-y-4">
                    <a href="mailto:info@samuelefelici.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors" data-testid="link-email">
                      <Mail className="w-5 h-5" />
                      info@samuelefelici.com
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
                      Ancona (Disponibile da remoto)
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                  <p className="text-sm text-muted-foreground">
                    "Preferisco una soluzione semplice che funziona oggi a una perfetta che non arriva mai."
                  </p>
                </div>
              </CardContent>
            </Card>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center p-8 rounded-lg border border-primary/20 bg-primary/5" data-testid="form-success">
                <CheckCircle2 className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Messaggio inviato!</h3>
                <p className="text-muted-foreground mb-6">
                  Grazie, ho ricevuto la tua richiesta. Ti rispondo al più presto.
                </p>
                <Button variant="outline" onClick={() => setStatus("idle")} data-testid="button-new-message">
                  Invia un altro messaggio
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-contact">
                {/* honeypot anti-spam (nascosto) */}
                <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Nome</label>
                  <Input
                    id="name"
                    placeholder="Il tuo nome"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    data-testid="input-name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="la-tua@email.it"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    data-testid="input-email"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="objective" className="text-sm font-medium">Di cosa hai bisogno? (es. sito web, app gestionale, automazione)</label>
                  <Input
                    id="objective"
                    placeholder="Breve descrizione del progetto"
                    required
                    value={formData.objective}
                    onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                    data-testid="input-objective"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Messaggio (opzionale)</label>
                  <Textarea
                    id="message"
                    placeholder="Qualche dettaglio in più sulla tua idea..."
                    className="min-h-[100px]"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    data-testid="textarea-message"
                  />
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox
                    id="consent"
                    checked={consent}
                    onCheckedChange={(c) => setConsent(c === true)}
                    className="mt-0.5"
                    data-testid="checkbox-consent"
                  />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <label htmlFor="consent" className="cursor-pointer">Ho letto e accetto l'</label>
                    <PrivacyDialog
                      trigger={
                        <button type="button" className="underline hover:text-primary">informativa privacy</button>
                      }
                    />
                    <label htmlFor="consent" className="cursor-pointer">. I dati servono solo a rispondere alla tua richiesta.</label>
                  </p>
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-sm text-destructive" data-testid="form-error">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    Qualcosa è andato storto. Riprova o scrivimi direttamente via email.
                  </div>
                )}

                <Button type="submit" className="w-full gap-2" disabled={status === "submitting" || !consent} data-testid="button-submit">
                  {status === "submitting" ? (
                    <>
                      Invio in corso <Loader2 className="w-4 h-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Invia Richiesta <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
