import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Wip } from "@/components/Wip";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false },
  alternates: { canonical: "/impressum" },
};

export default function ImpressumPage() {
  return (
    <>
      <PageHeader kicker="Angaben gemäß § 5 DDG" title={<>Impressum</>} />
      <Wip note="Contenuto obbligatorio da fornire: ragione sociale / nome del responsabile, indirizzo postale a Berlino, email, telefono, ev. P.IVA / registro. Testo in tedesco." />
    </>
  );
}
