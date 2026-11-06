import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { EventiList } from "@/components/EventiList";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { getLezioni, getSpettacoli } from "@/lib/eventi";
import { eventLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Eventi",
  description:
    "Tutte le date dei nostri spettacoli e delle lezioni aperte di improvvisazione teatrale a Berlino, con i biglietti.",
  alternates: { canonical: "/eventi" },
};

export const revalidate = 3600;

export default async function EventiPage() {
  const [lezioni, spettacoli] = await Promise.all([getLezioni(), getSpettacoli()]);
  const eventi = [...lezioni, ...spettacoli];

  return (
    <>
      {eventi.length > 0 && <JsonLd data={eventi.map(eventLd)} />}
      <PageHeader kicker="Eventi · biglietti" title={<>Tutte<br />le date</>} color="verde">
        Il calendario completo di lezioni aperte e spettacoli. Si prenota su YesTicket.
      </PageHeader>
      <Container className="flex flex-col gap-16 pb-24">
        <section>
          <SectionHeading color="blu" kicker="Vieni a provare">
            Lezioni
          </SectionHeading>
          <EventiList
            eventi={lezioni}
            emptyLabel="Nessuna lezione in calendario in questo momento. Scrivici per sapere quando è la prossima."
          />
        </section>
        <section>
          <SectionHeading color="rosso" kicker="Vieni a vedere">
            Spettacoli
          </SectionHeading>
          <EventiList
            eventi={spettacoli}
            emptyLabel="Nessuno spettacolo in programma al momento. Torna presto."
          />
        </section>
      </Container>
    </>
  );
}
