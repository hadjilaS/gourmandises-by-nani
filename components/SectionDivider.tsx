interface SectionDividerProps {
  flip?: boolean;
  className?: string;
}

/**
 * Élément signature du site : une ligne dorée façon "filet de glaçage",
 * qui fait écho aux finitions à la poche à douille visibles sur les gâteaux.
 */
export default function SectionDivider({ flip = false, className = "" }: SectionDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center py-8 md:py-10 ${className}`}
    >
      <svg
        width="220"
        height="28"
        viewBox="0 0 220 28"
        fill="none"
        className={flip ? "rotate-180" : ""}
      >
        <path
          d="M2 14C20 2 38 26 56 14C74 2 92 26 110 14C128 2 146 26 164 14C182 2 200 26 218 14"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="110" cy="14" r="3.5" fill="var(--color-gold-500)" />
        <defs>
          <linearGradient id="goldGradient" x1="0" y1="0" x2="220" y2="0">
            <stop offset="0%" stopColor="var(--color-gold-300)" stopOpacity="0" />
            <stop offset="20%" stopColor="var(--color-gold-500)" />
            <stop offset="50%" stopColor="var(--color-gold-700)" />
            <stop offset="80%" stopColor="var(--color-gold-500)" />
            <stop offset="100%" stopColor="var(--color-gold-300)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
