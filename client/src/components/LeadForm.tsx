import { useState, type HTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { PrivacyDialog } from "@/components/PrivacyDialog";
import { getAttribution, newEventId, sendLeadToWebhook, trackLead } from "@/lib/tracking";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

/**
 * Web3Forms — invio email gratuito senza backend.
 * 1. Vai su https://web3forms.com, inserisci la tua email (info@samuelefelici.com)
 *    e ricevi una "Access Key".
 * 2. Incolla la chiave qui sotto al posto del placeholder.
 * Le richieste del form arriveranno direttamente nella tua casella di posta.
 */
const WEB3FORMS_ACCESS_KEY = "54b5a6c4-415e-4bb7-814d-2f2f4e2c6bde";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Form di contatto, uguale in home e nelle landing delle campagne.
 * `source` dice da quale pagina arriva la richiesta (home, gestionali, …).
 */
export function LeadForm({
  source,
  objectiveLabel = "Di cosa hai bisogno? (es. gestionale, sistema di controllo, automazione)",
  objectivePlaceholder = "Breve descrizione del progetto",
  className = "",
  ...rest
}: {
  source: string;
  objectiveLabel?: string;
  objectivePlaceholder?: string;
} & HTMLAttributes<HTMLDivElement>) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", objective: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent) return;
    setStatus("submitting");

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `Nuova richiesta dal sito (${source}): ${formData.name}`,
      from_name: "Sito samuelefelici.com",
      name: formData.name,
      email: formData.email,
      telefono: formData.phone,
      obiettivo: formData.objective,
      message: formData.message,
      pagina: source,
      provenienza: getAttribution(),
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
        const eventId = newEventId();
        sendLeadToWebhook(
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            objective: formData.objective,
            message: formData.message,
            source,
          },
          eventId,
        );
        trackLead(eventId, source);
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", objective: "", message: "" });
        setConsent(false);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div {...rest} className={`flex flex-col items-center justify-center text-center p-8 rounded-lg border border-primary/20 bg-background/25 backdrop-blur-md ${className}`} data-testid="form-success">
        <CheckCircle2 className="w-12 h-12 text-primary mb-4" />
        <h3 className="text-xl font-bold mb-2">Messaggio inviato!</h3>
        <p className="text-muted-foreground mb-6">
          Grazie, ho ricevuto la tua richiesta. Ti rispondo al più presto.
        </p>
        <Button variant="outline" onClick={() => setStatus("idle")} data-testid="button-new-message">
          Invia un altro messaggio
        </Button>
      </div>
    );
  }

  return (
    <div {...rest} className={className}>
      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border/60 bg-background/25 backdrop-blur-md p-6" data-testid="form-contact">
        {/* honeypot anti-spam (nascosto) */}
        <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

        <div className="space-y-2">
          <label htmlFor={`name-${source}`} className="text-sm font-medium">Nome</label>
          <Input
            id={`name-${source}`}
            placeholder="Il tuo nome"
            autoComplete="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            data-testid="input-name"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor={`email-${source}`} className="text-sm font-medium">Email</label>
            <Input
              id={`email-${source}`}
              type="email"
              placeholder="la-tua@email.it"
              autoComplete="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              data-testid="input-email"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor={`phone-${source}`} className="text-sm font-medium">Telefono (facoltativo)</label>
            <Input
              id={`phone-${source}`}
              type="tel"
              placeholder="Per richiamarti"
              autoComplete="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              data-testid="input-phone"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor={`objective-${source}`} className="text-sm font-medium">{objectiveLabel}</label>
          <Input
            id={`objective-${source}`}
            placeholder={objectivePlaceholder}
            required
            value={formData.objective}
            onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
            data-testid="input-objective"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor={`message-${source}`} className="text-sm font-medium">Messaggio (facoltativo)</label>
          <Textarea
            id={`message-${source}`}
            placeholder="Qualche dettaglio in più sulla tua idea..."
            className="min-h-[100px]"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            data-testid="textarea-message"
          />
        </div>

        <div className="flex items-start gap-2">
          <Checkbox
            id={`consent-${source}`}
            checked={consent}
            onCheckedChange={(c) => setConsent(c === true)}
            className="mt-0.5"
            data-testid="checkbox-consent"
          />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <label htmlFor={`consent-${source}`} className="cursor-pointer">Ho letto e accetto l'</label>
            <PrivacyDialog
              trigger={
                <button type="button" className="underline hover:text-primary">informativa privacy</button>
              }
            />
            <label htmlFor={`consent-${source}`} className="cursor-pointer">. I dati servono solo a rispondere alla tua richiesta.</label>
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
    </div>
  );
}
