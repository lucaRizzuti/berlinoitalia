import type { ReactNode } from "react";
import { Container } from "./Container";

export function LegalPage({
  title,
  updated,
  note,
  children,
}: {
  title: string;
  updated: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <Container className="py-14 lg:py-16">
      <p className="kicker mb-4">{updated}</p>
      <h1 className="text-[clamp(2.5rem,7vw,4.5rem)]">{title}</h1>

      {note && (
        <div className="mt-6 border-2 border-dashed border-blu/50 p-4 font-display text-[13px] uppercase tracking-[0.1em] text-blu">
          {note}
        </div>
      )}

      <div className="legal mt-10 max-w-2xl">{children}</div>
    </Container>
  );
}
