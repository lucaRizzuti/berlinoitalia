import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import {
  SEGNI,
  SEGNO_BY_SLUG,
  getCoppie,
  getSettimana,
  rangeSettimana,
  type SegnoSlug,
} from "@/lib/improroscopo";
import { site } from "@/lib/site";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return getCoppie();
}

function load(week: string, segno: string) {
  const settimana = getSettimana(week);
  const seg = SEGNO_BY_SLUG[segno as SegnoSlug];
  const previsione = settimana?.segni[segno];
  if (!settimana || !seg || !previsione) return null;
  return { settimana, seg, previsione };
}

export async function generateMetadata(
  props: PageProps<"/improroscopo/[week]/[segno]">,
): Promise<Metadata> {
  const { week, segno } = await props.params;
  const data = load(week, segno);
  if (!data) return {};
  const { seg, previsione } = data;
  const range = rangeSettimana(week);
  const testo = previsione.testo.replace(/\s+/g, " ");
  const descr = testo.length > 200 ? `${testo.slice(0, 197).trimEnd()}…` : testo;
  return {
    title: `${seg.nome} — ${previsione.titolo}`,
    description: descr,
    alternates: { canonical: `/improroscopo/${week}/${segno}` },
    openGraph: {
      type: "article",
      title: `ImprOroscopo · ${seg.nome} · ${range}`,
      description: `${previsione.titolo} — ${descr}`,
      url: `${site.url}/improroscopo/${week}/${segno}`,
      images: [{ url: `/images/oroscopo/${segno}.webp`, width: 512, height: 512 }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function SegnoSettimanaPage(
  props: PageProps<"/improroscopo/[week]/[segno]">,
) {
  const { week, segno } = await props.params;
  const data = load(week, segno);
  if (!data) notFound();
  const { seg, previsione } = data;

  const idx = SEGNI.findIndex((s) => s.slug === segno);
  const prev = SEGNI[(idx + SEGNI.length - 1) % SEGNI.length];
  const next = SEGNI[(idx + 1) % SEGNI.length];
  const range = rangeSettimana(week);
  const paragrafi = previsione.testo.split(/\n+/).filter(Boolean);

  return (
    <>
      <Container className="pt-6">
        <p className="kicker text-ink/55">
          <Link href="/improroscopo" className="text-ink/55 hover:text-rosso">
            ImprOroscopo
          </Link>{" "}
          / <span className="text-ink">{seg.nome}</span>
        </p>
      </Container>

      <Container className="grid items-center gap-10 pb-10 pt-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="relative">
          <div className="u-arch absolute right-4 top-0 h-[88%] w-[64%] bg-rosso" />
          <Image
            src={`/images/oroscopo/${segno}.webp`}
            alt={`${seg.nome}`}
            width={512}
            height={512}
            priority
            className="u-riso relative w-full border-2 border-ink"
          />
        </div>
        <div>
          <p className="kicker mb-3 text-rosso">
            ImprOroscopo · settimana del {range}
          </p>
          <p className="font-display text-lg font-semibold uppercase text-ink/55">
            {seg.nome} · {seg.periodo}
          </p>
          <h1 className="mt-2 text-[clamp(2.3rem,6vw,4rem)]">{previsione.titolo}</h1>
        </div>
      </Container>

      <Container className="grid gap-14 pb-16 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="prose max-w-[56ch]">
          {paragrafi.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className="mt-7 border-t-2 border-ink pt-4 font-display text-sm font-semibold uppercase tracking-[0.08em]">
            Personaggio della settimana:{" "}
            <span className="text-rosso">{previsione.personaggio}</span>
          </p>
        </div>

        <aside className="border-l-2 border-ink pl-6">
          <p className="kicker mb-3.5">Gli altri segni</p>
          <ul className="flex flex-col gap-1.5">
            {SEGNI.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/improroscopo/${week}/${s.slug}`}
                  className={`font-display text-sm font-semibold uppercase ${
                    s.slug === segno ? "text-rosso" : "text-ink hover:text-rosso"
                  }`}
                >
                  {s.nome}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </Container>

      <section className="border-y-2 border-ink">
        <Container className="flex items-center justify-between gap-4 py-5 font-display text-sm font-semibold uppercase tracking-[0.1em]">
          <Link href={`/improroscopo/${week}/${prev.slug}`} className="hover:text-rosso">
            ← {prev.nome}
          </Link>
          <Link href="/improroscopo" className="text-ink/55 hover:text-rosso">
            Tutti i segni
          </Link>
          <Link href={`/improroscopo/${week}/${next.slug}`} className="hover:text-rosso">
            {next.nome} →
          </Link>
        </Container>
      </section>

      <Container className="py-14 text-center">
        <p className="kicker mb-4 text-ink/55">Fare teatro senza prendersi sul serio</p>
        <h2 className="mx-auto max-w-[18ch] text-[clamp(1.5rem,4vw,2.1rem)]">
          Il modo migliore per crederci è provare una volta.
        </h2>
        <div className="mt-6">
          <Button href="/corsi" variant="rosso">
            Scopri i corsi
          </Button>
        </div>
      </Container>
    </>
  );
}
