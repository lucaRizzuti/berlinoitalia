import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { MetaBand } from "@/components/MetaBand";
import { Wip } from "@/components/Wip";

export const metadata: Metadata = {
  title: "Corsi",
  description:
    "Corsi di improvvisazione teatrale in italiano a Berlino: tre livelli, ogni lunedì e sabato. La prima lezione è libera, senza iscrizione. Workshop con ospiti dall'Italia.",
  alternates: { canonical: "/corsi" },
};

export default function CorsiPage() {
  return (
    <>
      <PageHeader kicker="Corsi — Berlino — in italiano" title={<>Imparare<br />ad <span className="text-blu">ascoltare</span></>} color="blu">
        Corsi di improvvisazione teatrale in italiano, tre livelli. Si allena la
        concentrazione, la reazione, la fiducia — e si scopre come un <strong>sì</strong> o
        un <strong>no</strong> cambiano tutta la storia.
      </PageHeader>
      <MetaBand color="blu">La prima lezione è libera · senza iscrizione · senza impegno</MetaBand>
      <div className="h-14" />
      <Wip note="Da costruire: i tre livelli · orari e sedi (lunedì Elsenstraße 87, sabato Wallstraße 32 — da confermare) · sezione Workshop (ospiti dall'Italia + intro all'impro) · CTA prova" />
    </>
  );
}
