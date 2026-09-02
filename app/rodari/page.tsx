import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Wip } from "@/components/Wip";

export const metadata: Metadata = {
  title: "Grammatica della Fantasia",
  description:
    "Laboratorio e spettacolo di improvvisazione teatrale ispirato a Gianni Rodari, per scuole italiane, corsi di lingua e ragazzi a Berlino.",
  alternates: { canonical: "/rodari" },
};

export default function RodariPage() {
  return (
    <>
      <PageHeader
        kicker="Berlino Italia Improv presenta"
        title={<>Grammatica<br />della<br /><span className="text-verde">Fantasia</span></>}
        color="verde"
      >
        Portiamo Rodari sul palco. Improvvisazione teatrale per scuole e ragazzi. A Berlino,
        in italiano.
      </PageHeader>
      <Wip note="Da portare dal sito attuale: il progetto · il laboratorio per ragazzi · lo spettacolo per le scuole (4 step) · chi siamo · riferimenti & stampa · contatti" />
    </>
  );
}
