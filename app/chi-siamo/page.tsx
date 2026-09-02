import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Wip } from "@/components/Wip";

export const metadata: Metadata = {
  title: "Chi siamo",
  description:
    "Berlino Italia Improv: scuola di improvvisazione e teatro nata a Berlino nel 2016. Formazione e spettacoli in italiano, membri dell'International Theatresports Institute dal 2017.",
  alternates: { canonical: "/chi-siamo" },
};

export default function ChiSiamoPage() {
  return (
    <>
      <PageHeader kicker="Chi siamo" title={<>Non spieghiamo<br />il teatro.<br />Lo facciamo<br />succedere.</>}>
        Scuola di improvvisazione e teatro nata a Berlino nel 2016. Formazione e spettacoli
        in italiano per adulti e bambini. Membri dell&apos;International Theatresports
        Institute dal 2017.
      </PageHeader>
      <Wip note="Da costruire: i 4 pilastri · ITI dal 2017 · gli insegnanti (Luca Rizzuti, Maddalena Zoli, Pierpaolo Pantone — foto + bio) · collaborazioni con le scuole di Berlino · rassegna stampa" />
    </>
  );
}
