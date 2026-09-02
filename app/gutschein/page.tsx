import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Wip } from "@/components/Wip";

export const metadata: Metadata = {
  title: "Gutschein",
  description:
    "Il Berlino Impro Gutschein: un token di metallo da regalare, valido per una serata a teatro per due o una lezione di prova. Senza scadenza.",
  alternates: { canonical: "/gutschein" },
};

export default function GutscheinPage() {
  return (
    <>
      <PageHeader
        kicker="Berlino Italia Improv"
        title={<>Berlino<br />Impro<br /><span className="text-rosso">Gutschein</span></>}
        color="rosso"
      >
        Un token di metallo. Un regalo che apre due porte: un posto a teatro per due, o una
        lezione di improvvisazione senza impegno.
      </PageHeader>
      <Wip note="Da portare dal sito attuale: photo strip · come funziona · l'oggetto (token, no scadenza) · come ottenerlo (email / WhatsApp) · scuole partner · quote finale" />
    </>
  );
}
