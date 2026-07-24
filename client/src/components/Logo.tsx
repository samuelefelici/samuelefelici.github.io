/**
 * Marchio "nodo & impulso" — il motivo dei video: un impulso che percorre la
 * fibra ed entra in un nodo luminoso cinto da un anello orbitante. Disegnato
 * in arancio energia (#FF5F00) con un lieve bagliore, coerente con lo sfondo.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      className={className}
      role="img"
      aria-label="Samuele Felici"
      fill="none"
    >
      {/* anello orbitante */}
      <circle cx="22" cy="22" r="18.5" stroke="#FF5F00" strokeWidth="2.5" opacity="0.32" />
      {/* impulso lungo la fibra, verso il nodo */}
      <line
        x1="2.5"
        y1="22"
        x2="22"
        y2="22"
        stroke="#FF5F00"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* nodo luminoso */}
      <circle cx="22" cy="22" r="6.5" fill="#FF5F00" />
      <circle cx="22" cy="22" r="6.5" fill="#FF5F00" opacity="0.35" style={{ filter: "blur(3px)" }} />
    </svg>
  );
}
