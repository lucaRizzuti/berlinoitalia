import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { settimanaCorrente } from "@/lib/improroscopo";

export const metadata: Metadata = { robots: { index: false, follow: false } };

/** Scorciatoia: rimanda al reel della settimana corrente. */
export default function ReelCorrente() {
  const settimana = settimanaCorrente();
  redirect(settimana ? `/improroscopo/${settimana.start}/reel` : "/improroscopo");
}
