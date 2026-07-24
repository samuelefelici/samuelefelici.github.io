/**
 * Marchio "<sf/>" — segno da sviluppatore: le iniziali dentro un tag di
 * codice, con una riga arancione (l'impulso) sotto. Monospazio, coerente con
 * le etichette del sito e col tema arancio #FF5F00.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      aria-label="Samuele Felici"
      className={`inline-flex flex-col items-center font-mono font-extrabold leading-none tracking-tight ${className ?? ""}`}
    >
      <span className="whitespace-nowrap">
        <span className="text-primary">&lt;</span>
        <span className="text-foreground">sf</span>
        <span className="text-primary">/&gt;</span>
      </span>
      <span
        aria-hidden
        className="mt-1 h-[2px] w-full rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.6)]"
      />
    </span>
  );
}
