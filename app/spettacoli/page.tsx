import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { MetaBand } from "@/components/MetaBand";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { getShows } from "@/lib/spettacoli";

export const metadata: Metadata = {
  title: "Spettacoli",
  description:
    "Ogni quarta domenica del mese al teatro Acud di Berlino: sette format ricorrenti di improvvisazione teatrale, normalmente in italiano.",
  alternates: { canonical: "/spettacoli" },
};

const langLabel: Record<string, string> = {
  it: "IT",
  en: "EN",
  de: "DE",
  es: "ES",
  fr: "FR",
};

export default function SpettacoliPage() {
  const shows = getShows();

  return (
    <>
      <Container className="grid items-center gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
        <div>
          <p className="kicker mb-6 text-rosso">Spettacoli — Teatro Acud — Berlino</p>
          <h1 className="text-[clamp(3rem,8vw,5.5rem)]">
            Ogni quarta
            <br />
            domenica
            <br />
            <span className="text-rosso">del mese</span>
          </h1>
          <p className="mt-7 max-w-lg text-lg">
            Appuntamento fisso al teatro Acud, Veteranenstraße 21. Sette format ricorrenti —
            normalmente in italiano, qualche volta multilingua. Mai due sere uguali.
          </p>
          <div className="mt-8">
            <Button href="/eventi" variant="rosso">
              Prossime date
            </Button>
          </div>
        </div>
        <div className="relative min-h-[320px] sm:min-h-[420px]">
          <div className="u-arch u-halftone absolute right-10 top-2 h-[85%] w-[55%] text-ink opacity-50" />
          <Image
            src="/collage/collage-mouth.webp"
            alt="Collage: bocca, arco blu"
            width={380}
            height={480}
            priority
            className="u-riso absolute right-[-6%] top-[-4%] w-[80%] max-w-none"
          />
        </div>
      </Container>

      <MetaBand color="rosso">
        Match · Maestro Impro · Storie all&apos;improvviso · Improvvisa Chi? · Babel
      </MetaBand>

      <Container className="py-[70px]">
        <SectionHeading>I format</SectionHeading>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shows.map((show, i) => {
            const href = show.external ?? `/spettacoli/${show.slug}`;
            const special = Boolean(show.external);
            return (
              <Link
                key={show.slug}
                href={href}
                className={`flex min-h-[230px] flex-col gap-2.5 border-2 bg-paper-3 px-[22px] pb-5 pt-6 transition-transform hover:-translate-y-1 ${
                  special ? "border-verde" : "border-ink"
                }`}
                style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 0.4}deg)` }}
              >
                <div
                  className={`font-display text-[15px] font-bold tracking-[0.1em] ${
                    special ? "text-verde" : "text-rosso"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                  {special ? " ↗" : ""}
                </div>
                <h3 className="text-[25px] leading-[0.98]">{show.title}</h3>
                <p className="text-sm leading-[1.5]">{show.tagline}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="flex gap-1.5">
                    {show.lingua.map((l) => (
                      <span
                        key={l}
                        className="border-[1.5px] border-ink px-1.5 pb-[2px] pt-[3px] font-display text-[10.5px] font-medium uppercase tracking-[0.12em]"
                      >
                        {langLabel[l]}
                      </span>
                    ))}
                  </span>
                  <span
                    className={`font-display text-xs font-semibold uppercase tracking-[0.09em] ${
                      special ? "text-verde" : "text-rosso"
                    }`}
                  >
                    {special ? "Vai →" : "Scopri →"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>

      <section className="mt-11 bg-ink py-16 text-paper">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="kicker mb-3 text-verde">Biglietti</p>
            <h2 className="text-[clamp(2rem,5vw,2.75rem)] text-paper">
              Le date, sempre aggiornate
            </h2>
            <p className="mt-3.5 max-w-[52ch] text-paper/80">
              Ogni scheda format mostra le sue prossime repliche. Il calendario completo,
              con l&apos;acquisto dei biglietti, vive nella pagina Eventi.
            </p>
          </div>
          <Button href="/eventi" variant="ghost" className="border-paper text-paper hover:bg-paper hover:text-ink">
            Vai a Eventi →
          </Button>
        </Container>
      </section>
    </>
  );
}
