import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Wip } from "@/components/Wip";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  robots: { index: false },
  alternates: { canonical: "/datenschutz" },
};

export default function DatenschutzPage() {
  return (
    <>
      <PageHeader kicker="Datenschutz" title={<>Datenschutz&shy;erklärung</>} />
      <Wip note="Da redigere: hosting Vercel, Vercel Web Analytics (cookieless), YesTicket (iframe/embed di terzi), newsletter Brevo, form di contatto, font self-hosted. Testo in tedesco." />
    </>
  );
}
