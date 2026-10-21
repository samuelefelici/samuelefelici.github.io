import { useState } from "react";
import { Star, Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Eyebrow } from "@/components/Eyebrow";
import { Footer } from "@/components/sections/Footer";
import { TRACKING, track } from "@/lib/tracking";

/*
 * Pagina della recensione: si apre solo dal link di invito che mando al
 * cliente a lavoro finito (/recensione/?c=Cliente&p=Progetto&t=firma).
 * La firma la controlla n8n: senza un invito valido la recensione non passa,
 * e ogni invito vale una volta sola. Se va a buon fine, n8n la aggiunge a
 * data/recensioni.json e il sito si ripubblica in un paio di minuti.
 */

const TESTO_MIN = 30;
const TESTO_MAX = 800;

type Status = "idle" | "submitting" | "success" | "error";

function readInvite() {
  const q = new URLSearchParams(window.location.search);
  const c = q.get("c")?.trim() ?? "";
  const p = q.get("p")?.trim() ?? "";
  const t = q.get("t")?.trim() ?? "";
  return c && p && t ? { c, p, t } : null;
}

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <div role="radiogroup" aria-label="Voto" className="flex gap-1" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} ${n === 1 ? "stella" : "stelle"}`}
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          className="rounded p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Star className={`h-8 w-8 transition-colors ${n <= shown ? "fill-primary text-primary" : "text-muted-foreground/40"}`} />
        </button>
      ))}
    </div>
  );
}

export function ReviewPage() {
  const [invite] = useState(readInvite);
  const [form, setForm] = useState({ nome: invite?.c ?? "", ruolo: "", azienda: "", testo: "" });
  const [voto, setVoto] = useState(0);
  const [consenso, setConsenso] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errore, setErrore] = useState("");

  const testoOk = form.testo.trim().length >= TESTO_MIN;
  const pronto = Boolean(form.nome.trim() && voto && testoOk && consenso);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!invite || !pronto) return;
    setStatus("submitting");
    setErrore("");
    try {
      const res = await fetch(TRACKING.reviewsWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...invite, ...form, voto }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("success");
        track("review", { project: invite.p });
      } else {
        setErrore(data.errore || "");
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  let body: React.ReactNode;
  if (!invite || !TRACKING.reviewsWebhook) {
    body = (
      <div className="rounded-2xl border border-border/60 p-8 text-center">
        <AlertCircle className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
        <h1 className="mb-2 font-heading text-2xl font-bold">Questo link non è completo</h1>
        <p className="text-muted-foreground">
          Le recensioni si lasciano dal link personale che ti ho mandato. Se non funziona, scrivimi a{" "}
          <a href="mailto:info@samuelefelici.com" className="underline hover:text-primary">info@samuelefelici.com</a> e
          te ne mando uno nuovo.
        </p>
      </div>
    );
  } else if (status === "success") {
    body = (
      <div className="rounded-2xl border border-primary/20 p-8 text-center" data-testid="review-success">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-primary" />
        <h1 className="mb-2 font-heading text-2xl font-bold">Grazie, {form.nome.split(" ")[0]}!</h1>
        <p className="mb-6 text-muted-foreground">La tua recensione comparirà sul sito tra qualche minuto.</p>
        <Button variant="outline" asChild>
          <a href="/#recensioni">Vai al sito</a>
        </Button>
      </div>
    );
  } else {
    body = (
      <>
        <div className="mb-8">
          <Eyebrow>Recensione</Eyebrow>
          <h1 className="mt-4 mb-3 font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
            Com'è andato il lavoro su {invite.p}?
          </h1>
          <p className="text-muted-foreground">
            Bastano due righe: cosa ti serviva, come ci abbiamo lavorato, cosa è cambiato. La recensione compare
            sul sito con il nome e, se vuoi, ruolo e azienda.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-border/60 p-6" data-testid="form-review">
          <div className="space-y-2">
            <span className="text-sm font-medium">Voto</span>
            <StarPicker value={voto} onChange={setVoto} />
          </div>
          <div className="space-y-2">
            <label htmlFor="review-nome" className="text-sm font-medium">Nome e cognome</label>
            <Input
              id="review-nome"
              autoComplete="name"
              required
              maxLength={80}
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="review-ruolo" className="text-sm font-medium">Ruolo (facoltativo)</label>
              <Input
                id="review-ruolo"
                placeholder="es. Titolare"
                maxLength={60}
                value={form.ruolo}
                onChange={(e) => setForm({ ...form, ruolo: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="review-azienda" className="text-sm font-medium">Azienda (facoltativa)</label>
              <Input
                id="review-azienda"
                autoComplete="organization"
                maxLength={80}
                value={form.azienda}
                onChange={(e) => setForm({ ...form, azienda: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="review-testo" className="text-sm font-medium">La tua recensione</label>
            <Textarea
              id="review-testo"
              required
              maxLength={TESTO_MAX}
              placeholder="Cosa ti serviva, com'è andata, cosa è cambiato dopo…"
              className="min-h-[160px]"
              value={form.testo}
              onChange={(e) => setForm({ ...form, testo: e.target.value })}
            />
            <p className="text-right text-xs text-muted-foreground tabular-nums">
              {testoOk ? `${form.testo.trim().length}/${TESTO_MAX}` : `almeno ${TESTO_MIN} caratteri`}
            </p>
          </div>

          <div className="flex items-start gap-2">
            <Checkbox id="review-consenso" checked={consenso} onCheckedChange={(c) => setConsenso(c === true)} className="mt-0.5" />
            <label htmlFor="review-consenso" className="cursor-pointer text-xs leading-relaxed text-muted-foreground">
              Acconsento alla pubblicazione su samuelefelici.com di nome, ruolo, azienda, voto e testo. Posso chiederne
              la modifica o la rimozione in qualsiasi momento scrivendo a info@samuelefelici.com.
            </label>
          </div>

          {status === "error" && (
            <div className="flex items-center gap-2 text-sm text-destructive" role="alert">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {errore || "Qualcosa è andato storto. Riprova tra poco o scrivimi a info@samuelefelici.com."}
            </div>
          )}

          <Button type="submit" className="w-full gap-2" disabled={status === "submitting" || !pronto}>
            {status === "submitting" ? (
              <>Invio in corso <Loader2 className="h-4 w-4 animate-spin" /></>
            ) : (
              <>Pubblica la recensione <Send className="h-4 w-4" /></>
            )}
          </Button>
        </form>
      </>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background font-sans text-foreground">
      <header className="border-b border-border/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <a href="/" aria-label="samuelefelici.com, pagina principale">
            <Logo className="text-lg md:text-xl" />
          </a>
          <ThemeToggle />
        </div>
      </header>
      <main className="container mx-auto w-full max-w-2xl flex-1 px-4 py-10 md:px-6 md:py-16">{body}</main>
      <Footer />
    </div>
  );
}
