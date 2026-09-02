import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/Container";
import { EventiList } from "@/components/EventiList";
import { Button } from "@/components/Button";
import { getShow, getShowSlugs } from "@/lib/spettacoli";
import { getEventiForShow } from "@/lib/eventi";
import { site } from "@/lib/site";

export const revalidate = 3600;

export function generateStaticParams() {
  return getShowSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/spettacoli/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const show = getShow(slug);
  if (!show) return {};
  return {
    title: show.title,
    description: show.seo.description ?? show.tagline,
    alternates: { canonical: `/spettacoli/${show.slug}` },
    openGraph: {
      title: `${show.title} — ${site.name}`,
      description: show.seo.description ?? show.tagline,
      images: show.seo.ogImage ? [show.seo.ogImage] : undefined,
    },
  };
}

const langLabel: Record<string, string> = {
  it: "Italiano",
  en: "Inglese",
  de: "Tedesco",
  es: "Spagnolo",
  fr: "Francese",
};

export default async function ShowPage(props: PageProps<"/spettacoli/[slug]">) {
  const { slug } = await props.params;
  const show = getShow(slug);
  if (!show) notFound();
  if (show.external) redirect(show.external);

  const eventi = await getEventiForShow(show.yesticket.match);

  const meta = [
    { k: "Lingua", v: show.lingua.map((l) => langLabel[l]).join(" / ") },
    show.durata && { k: "Durata", v: show.durata },
    show.pubblico && { k: "Pubblico", v: show.pubblico },
    { k: "Cadenza", v: "Ricorrente" },
  ].filter(Boolean) as { k: string; v: string }[];

  return (
    <>
      <Container className="pt-6">
        <p className="kicker text-ink/55">
          <Link href="/spettacoli" className="text-ink/55 hover:text-rosso">
            Spettacoli
          </Link>{" "}
          / <span className="text-ink">{show.title}</span>
        </p>
      </Container>

      {/* HERO */}
      <Container className="grid items-center gap-10 pb-11 pt-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="kicker mb-5 text-rosso">Formato</p>
          <h1 className="text-[clamp(2.75rem,7vw,5rem)]">{show.title}</h1>
          <p className="mt-6 max-w-lg text-lg italic">{show.tagline}</p>
        </div>
        {show.hero && (
          <div className="relative min-h-[300px] sm:min-h-[400px]">
            <div className="u-arch absolute right-8 top-0 h-[92%] w-[62%] bg-rosso" />
            <Image
              src={show.hero}
              alt=""
              width={420}
              height={520}
              priority
              className="u-riso absolute right-[-6%] top-[-2%] w-[86%] max-w-none"
            />
          </div>
        )}
      </Container>

      {/* META ROW */}
      <Container className="pb-14">
        <dl className="flex flex-wrap border-2 border-ink">
          {meta.map((m, i) => (
            <div
              key={m.k}
              className={`min-w-[45%] flex-1 px-5 py-3.5 sm:min-w-0 ${
                i < meta.length - 1 ? "border-b-2 border-ink sm:border-b-0 sm:border-r-2" : ""
              }`}
            >
              <dt className="font-display text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink/60">
                {m.k}
              </dt>
              <dd className="font-display text-base font-semibold uppercase">{m.v}</dd>
            </div>
          ))}
        </dl>
      </Container>

      {/* BODY */}
      <Container className="grid gap-14 pb-16 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{show.body}</ReactMarkdown>
        </div>
        <aside className="border-l-2 border-ink pl-6">
          <p className="kicker mb-3.5">Portalo dove vuoi</p>
          <p className="text-[14.5px]">
            Prenotabile per festival, scuole ed eventi speciali, anche fuori Berlino.
          </p>
          <p className="mt-3.5">
            <a
              href={`mailto:${site.contact.email}`}
              className="font-display text-sm font-semibold uppercase tracking-[0.06em]"
            >
              Scrivici →
            </a>
          </p>
        </aside>
      </Container>

      {/* GALLERY */}
      {show.gallery.length > 0 ? (
        <Container className="pb-16">
          <p className="kicker mb-4">In scena</p>
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {show.gallery.map((src) => (
              <Image
                key={src}
                src={src}
                alt=""
                width={480}
                height={360}
                className="u-riso aspect-[4/3] w-full border-2 border-ink object-cover"
              />
            ))}
          </div>
        </Container>
      ) : null}

      {/* PROSSIME DATE */}
      <section className="bg-ink py-14 text-paper">
        <Container className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="kicker mb-3 text-verde">Prossime date</p>
            <h2 className="text-[clamp(2rem,5vw,2.5rem)] text-paper">
              Quando
              <br />
              vederlo
            </h2>
          </div>
          <div className="self-center">
            <EventiList
              eventi={eventi}
              dark
              emptyLabel="Nessuna data in programma per questo format. Guarda tutti gli eventi."
            />
          </div>
        </Container>
      </section>

      <Container className="py-16 text-center">
        <h2 className="text-[clamp(1.6rem,4vw,2.25rem)]">
          Il modo migliore per capire è vederlo una volta.
        </h2>
        <div className="mt-6">
          <Button href="/eventi" variant="rosso">
            Vai al calendario
          </Button>
        </div>
      </Container>
    </>
  );
}

export const dynamicParams = false;
