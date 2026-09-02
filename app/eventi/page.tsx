import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { EventiPlaceholder } from "@/components/EventiPlaceholder";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Eventi",
  description:
    "Tutte le date dei nostri spettacoli di improvvisazione teatrale a Berlino, con i biglietti — sempre aggiornate.",
  alternates: { canonical: "/eventi" },
};

export default function EventiPage() {
  return (
    <>
      <PageHeader kicker="Eventi — biglietti" title={<>Tutte<br />le date</>} color="verde">
        Il calendario completo degli spettacoli, con l&apos;acquisto dei biglietti.
      </PageHeader>
      <Container className="pb-24">
        <EventiPlaceholder />
        <p className="mt-4 font-display text-xs uppercase tracking-[0.12em] text-ink/50">
          Integrazione nativa YesTicket (org 1033) — da sviluppare
        </p>
      </Container>
    </>
  );
}
