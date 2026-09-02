import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "ink" | "rosso" | "blu" | "verde" | "ghost";

const base =
  "inline-flex items-center justify-center border-2 px-6 py-3 font-display text-[15px] font-semibold uppercase tracking-[0.1em] leading-none transition-colors";

const variants: Record<Variant, string> = {
  ink: "border-ink bg-ink text-paper hover:bg-noir hover:text-paper",
  rosso: "border-rosso bg-rosso text-paper hover:bg-ink hover:border-ink hover:text-paper",
  blu: "border-blu bg-blu text-paper hover:bg-ink hover:border-ink hover:text-paper",
  verde: "border-verde bg-verde text-paper hover:bg-ink hover:border-ink hover:text-paper",
  ghost: "border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
};

export function Button({
  children,
  href,
  variant = "ink",
  external,
  className = "",
}: {
  children: ReactNode;
  href: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
}) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
