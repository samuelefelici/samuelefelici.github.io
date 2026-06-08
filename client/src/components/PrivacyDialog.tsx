import { type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * Informativa privacy di base (art. 13 GDPR) per il form di contatto.
 * NB: è un testo standard; per usi sensibili è consigliabile una revisione legale.
 */
export function PrivacyDialog({ trigger }: { trigger: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Informativa sulla privacy</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            Ai sensi dell'art. 13 del Regolamento UE 2016/679 (GDPR), ti informo su come tratto i dati
            che invii tramite il modulo di contatto di questo sito.
          </p>

          <div>
            <h4 className="font-semibold text-foreground mb-1">Titolare del trattamento</h4>
            <p>Samuele Felici — Ancona — email: info@samuelefelici.com</p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-1">Dati raccolti</h4>
            <p>
              Nome, indirizzo email e il contenuto del messaggio (obiettivo del progetto ed eventuali
              dettagli) che decidi liberamente di comunicare.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-1">Finalità e base giuridica</h4>
            <p>
              I dati sono trattati al solo scopo di rispondere alla tua richiesta e fornirti un eventuale
              preventivo. La base giuridica è il tuo consenso e l'esecuzione di misure precontrattuali
              adottate su tua richiesta (art. 6.1.b GDPR).
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-1">Modalità e destinatari</h4>
            <p>
              L'invio del modulo avviene tramite il servizio <strong>Web3Forms</strong>, che recapita il
              messaggio via email e agisce come fornitore del servizio. I dati non vengono diffusi né
              ceduti a terzi per finalità di marketing.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-1">Conservazione</h4>
            <p>
              I dati sono conservati per il tempo necessario a gestire la tua richiesta e gli eventuali
              adempimenti collegati, dopodiché vengono cancellati.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-1">I tuoi diritti</h4>
            <p>
              Puoi in qualsiasi momento richiedere accesso, rettifica, cancellazione, limitazione o
              opposizione al trattamento dei tuoi dati (artt. 15–22 GDPR) scrivendo a
              info@samuelefelici.com. Hai inoltre diritto di proporre reclamo al Garante per la protezione
              dei dati personali. Non viene effettuato alcun processo decisionale automatizzato.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
