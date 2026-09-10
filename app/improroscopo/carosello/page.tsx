import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { settimanaCorrente } from "@/lib/improroscopo";

export const metadata: Metadata = { robots: { index: false, follow: false } };

/** Scorciatoia: rimanda al carosello della settimana corrente. */
export default function CaroselloCorrente() {
  const settimana = settimanaCorrente();
  redirect(settimana ? `/improroscopo/${settimana.start}/carosello` : "/improroscopo");
}
