import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { EventiList } from "@/components/EventiList";
import { getEventi } from "@/lib/eventi";

export const metadata: Metadata = {
  title: "Eventi",
  description:
    "Tutte le date dei nostri spettacoli e delle lezioni aperte di improvvisazione teatrale a Berlino, con i biglietti.",
  alternates: { canonical: "/eventi" },
};

export const revalidate = 3600;

export default async function EventiPage() {
  const eventi = await getEventi();

  return (
    <>
      <PageHeader kicker="Eventi — biglietti" title={<>Tutte<br />le date</>} color="verde">
        Il calendario completo di spettacoli e lezioni aperte. Biglietti su YesTicket.
      </PageHeader>
      <Container className="pb-24">
        <EventiList eventi={eventi} grouped />
      </Container>
    </>
  );
}
