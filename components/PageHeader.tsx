import type { ReactNode } from "react";
import { Container } from "./Container";

const kickerTone: Record<string, string> = {
  ink: "text-ink",
  rosso: "text-rosso",
  blu: "text-blu",
  verde: "text-verde",
};

/** Intestazione standard delle pagine interne: kicker + titolone. */
export function PageHeader({
  kicker,
  title,
  children,
  color = "ink",
}: {
  kicker: string;
  title: ReactNode;
  children?: ReactNode;
  color?: keyof typeof kickerTone;
}) {
  return (
    <Container className="py-14 lg:py-16">
      <p className={`kicker mb-6 ${kickerTone[color]}`}>{kicker}</p>
      <h1 className="text-[clamp(3rem,8vw,5.5rem)]">{title}</h1>
      {children && <div className="mt-7 max-w-xl text-lg">{children}</div>}
    </Container>
  );
}
