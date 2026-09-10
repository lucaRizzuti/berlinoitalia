import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { SEGNI, settimanaCorrente, rangeSettimana } from "@/lib/improroscopo";

export const metadata: Metadata = {
  title: "ImprOroscopo",
  description:
    "L'oroscopo settimanale per improvvisatori di Berlino Italia Improv. Dodici segni, dodici concetti di improvvisazione teatrale, un personaggio della settimana a testa.",
  alternates: { canonical: "/improroscopo" },
};

export const revalidate = 3600;

export default function ImprOroscopoPage() {
  const settimana = settimanaCorrente();

  return (
    <>
      <PageHeader
        kicker="ImprOroscopo — settimanale"
        title={
          <>
            Impr<span className="text-rosso">Oroscopo</span>
          </>
        }
        color="rosso"
      >
        L&apos;oroscopo della settimana per chi fa teatro senza prendersi sul serio.
        Niente amore, soldi e lavoro: solo dodici modi di stare in scena.
      </PageHeader>

      <Container className="pb-24">
        {!settimana ? (
          <p className="border-2 border-dashed border-ink/30 p-6 font-display text-sm uppercase tracking-[0.1em] text-ink/70">
            Il primo ImprOroscopo esce a breve.
          </p>
        ) : (
          <>
            <p className="kicker mb-6 text-ink/60">
              Settimana del {rangeSettimana(settimana.start)}
            </p>
            <ul className="border-t-2 border-ink">
              {SEGNI.map((s) => {
                const p = settimana.segni[s.slug];
                if (!p) return null;
                return (
                  <li key={s.slug} className="border-b-2 border-ink">
                    <Link
                      href={`/improroscopo/${settimana.start}/${s.slug}`}
                      className="group grid grid-cols-[6.5rem_1fr_auto] items-baseline gap-4 py-3.5 text-ink hover:text-rosso sm:grid-cols-[9rem_1fr_auto] sm:gap-6"
                    >
                      <span className="font-display text-base font-semibold uppercase sm:text-lg">
                        {s.nome}
                      </span>
                      <span className="min-w-0 truncate text-[14px] text-ink/70 group-hover:text-rosso/80">
                        <span className="font-semibold text-ink group-hover:text-rosso">
                          {p.titolo}.
                        </span>{" "}
                        {p.testo.replace(/\s+/g, " ")}
                      </span>
                      <span className="font-display text-[12px] font-semibold uppercase tracking-[0.12em] text-rosso">
                        Leggi →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="mt-8 max-w-[52ch] text-[14px] text-ink/60">
              Ogni previsione è legata a un concetto di improvvisazione — ascolto,
              presenza, dire di sì, fallire con gioia, il silenzio, il ritmo, il rischio,
              il gioco, l&apos;empatia, lo spazio vuoto. Cambiano di segno in segno e di
              settimana in settimana.
            </p>
          </>
        )}
      </Container>
    </>
  );
}
