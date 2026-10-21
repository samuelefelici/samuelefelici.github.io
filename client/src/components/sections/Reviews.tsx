import { Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import recensioni from "@/data/recensioni.json";

/**
 * Recensioni dei clienti. Le scrive solo chi ha ricevuto un link di invito
 * (pagina /recensione/): il flusso n8n le aggiunge a data/recensioni.json e
 * il sito si ripubblica da solo. Finché il file è vuoto la sezione non c'è.
 */
export type Recensione = {
  id: string;
  nome: string;
  ruolo?: string;
  azienda?: string;
  progetto?: string;
  voto: number;
  testo: string;
  data: string; // AAAA-MM-GG
};

const TUTTE = (recensioni as Recensione[])
  .filter((r) => r.nome && r.testo)
  .sort((a, b) => b.data.localeCompare(a.data));

export function Stars({ value, className = "" }: { value: number; className?: string }) {
  return (
    <div className={`flex gap-0.5 ${className}`} role="img" aria-label={`${value} stelle su 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} aria-hidden className={`h-4 w-4 ${n <= value ? "fill-primary text-primary" : "text-muted-foreground/40"}`} />
      ))}
    </div>
  );
}

function ReviewCard({ r }: { r: Recensione }) {
  const chi = [r.ruolo, r.azienda].filter(Boolean).join(", ");
  return (
    <figure className="flex h-full flex-col gap-4 rounded-2xl border border-border/60 bg-background/25 p-6 backdrop-blur-md">
      <div className="flex items-center justify-between gap-3">
        <Stars value={r.voto} />
        {r.progetto && (
          <span className="truncate font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{r.progetto}</span>
        )}
      </div>
      <blockquote className="flex-1 whitespace-pre-line leading-relaxed">«{r.testo}»</blockquote>
      <figcaption className="text-sm">
        <span className="font-semibold">{r.nome}</span>
        {chi && <span className="text-muted-foreground"> · {chi}</span>}
      </figcaption>
    </figure>
  );
}

/** `max`: quante mostrarne (le più recenti). */
export function Reviews({ max = 6, className = "" }: { max?: number; className?: string }) {
  if (!TUTTE.length) return null;
  const list = TUTTE.slice(0, max);
  return (
    <section id="recensioni" data-arrive="0" className={`relative py-16 md:py-24 ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        <Reveal className="mb-10 text-center">
          <div className="mb-4 flex justify-center"><Eyebrow>Recensioni</Eyebrow></div>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">Cosa dicono i clienti</h2>
        </Reveal>
        <div className={`grid gap-6 md:grid-cols-2 ${list.length > 2 ? "lg:grid-cols-3" : "mx-auto max-w-4xl"}`}>
          {list.map((r, i) => (
            <Reveal key={r.id} delay={Math.min(i, 3) * 0.08}>
              <ReviewCard r={r} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
