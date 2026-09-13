import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import {
  SEGNI,
  ELEMENTO_COLORE,
  settimanaCorrente,
  rangeSettimana,
} from "@/lib/improroscopo";

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
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SEGNI.map((s, i) => {
                const p = settimana.segni[s.slug];
                if (!p) return null;
                const colore = ELEMENTO_COLORE[s.elemento];
                return (
                  <Link
                    key={s.slug}
                    href={`/improroscopo/${settimana.start}/${s.slug}`}
                    className="group flex flex-col border-2 border-ink bg-paper-3 transition-transform hover:-translate-y-1"
                    style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 0.4}deg)` }}
                  >
                    <span className="h-[6px] w-full shrink-0" style={{ background: colore }} />
                    <span className="relative block aspect-square w-full overflow-hidden border-b-2 border-ink">
                      <Image
                        src={`/images/oroscopo/${s.slug}.webp`}
                        alt={s.nome}
                        fill
                        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                        className="u-riso object-cover"
                      />
                    </span>
                    <span className="flex flex-1 flex-col gap-1.5 p-4">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="font-display text-xl font-semibold uppercase leading-none">
                          {s.nome}
                        </span>
                        <span className="font-display text-[10px] uppercase tracking-[0.1em] text-ink/50">
                          {s.periodo}
                        </span>
                      </span>
                      <span className="min-w-0 truncate text-[13.5px] text-ink/75">
                        <span className="font-semibold text-ink">{p.titolo}.</span>{" "}
                        {p.testo.replace(/\s+/g, " ")}
                      </span>
                      <span
                        className="mt-auto pt-1 font-display text-[11px] font-semibold uppercase tracking-[0.12em]"
                        style={{ color: colore }}
                      >
                        Leggi →
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
            <p className="mt-10 max-w-[52ch] text-[14px] text-ink/60">
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
