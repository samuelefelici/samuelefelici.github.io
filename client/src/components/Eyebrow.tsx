/**
 * Etichetta di sezione in stile "lettura da laboratorio": monospazio,
 * maiuscolo spaziato, arancio energia, con una sottile riga luminosa che
 * richiama l'impulso dei video. È la firma tipografica del sito.
 */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-primary ${className ?? ""}`}
    >
      <span aria-hidden className="h-px w-6 bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.7)]" />
      {children}
    </span>
  );
}
