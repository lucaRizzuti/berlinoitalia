import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { MetaBand } from "@/components/MetaBand";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { EventiList } from "@/components/EventiList";
import { getEventi } from "@/lib/eventi";

export const revalidate = 3600;

const quickLinks = [
  {
    title: "Corsi",
    href: "/corsi",
    accent: "bg-blu",
    go: "text-blu",
    text: "Ogni lunedì e sabato. Tre livelli. La prima lezione è libera, senza iscrizione. I workshop con gli ospiti dall'Italia sono qui dentro.",
    cta: "Vai ai corsi →",
  },
  {
    title: "Spettacoli",
    href: "/spettacoli",
    accent: "bg-rosso",
    go: "text-rosso",
    text: "Ogni quarta domenica del mese al teatro Acud. Sette format ricorrenti, mai due sere uguali.",
    cta: "Vedi i format →",
  },
  {
    title: "Eventi",
    href: "/eventi",
    accent: "bg-verde",
    go: "text-verde",
    text: "Tutte le date e i biglietti, sempre aggiornati.",
    cta: "Calendario →",
  },
  {
    title: "Berlino Babel",
    href: "/spettacoli/babel",
    accent: "bg-[linear-gradient(90deg,#D4161E_0_34%,#02379C_34%_67%,#6E8A33_67%_100%)]",
    go: "text-ink",
    text: "Lo show multilingua nato con le altre scuole di improvvisazione di Berlino.",
    cta: "Scopri Babel →",
  },
  {
    title: "Rodari",
    href: "/rodari",
    accent: "bg-verde",
    go: "text-verde",
    text: "Grammatica della Fantasia: laboratori e spettacoli di teatro per le scuole.",
    cta: "Scopri Rodari →",
  },
  {
    title: "Gutschein",
    href: "/gutschein",
    accent: "bg-rosso",
    go: "text-rosso",
    text: "Un token di metallo da regalare: una serata a teatro per due, o una lezione di prova.",
    cta: "Il buono regalo →",
  },
];

export default async function HomePage() {
  const eventi = (await getEventi()).slice(0, 4);

  return (
    <>
      {/* HERO */}
      <Container className="grid items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div>
          <p className="kicker mb-6">
            Scuola di improvvisazione teatrale — Berlino — dal 2016
          </p>
          <h1 className="text-[clamp(3.5rem,9vw,6.5rem)]">
            Fare
            <br />
            teatro
            <br />
            <span className="text-rosso">senza</span>
            <br />
            prendersi
            <br />
            sul serio
          </h1>
          <p className="mt-7 max-w-md text-lg">
            Corsi, workshop e spettacoli di improvvisazione{" "}
            <strong>in italiano a Berlino</strong>. Per adulti e bambini, principianti e
            curiosi. Membri dell&apos;International Theatresports Institute dal 2017.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <Button href="/corsi" variant="blu">
              Scopri i corsi
            </Button>
            <Button href="/spettacoli" variant="ghost">
              Prossimi spettacoli
            </Button>
          </div>
        </div>

        <div className="relative min-h-[420px] sm:min-h-[520px]">
          <div className="u-arch u-halftone absolute right-0 top-5 h-[75%] w-[62%] text-ink/50 opacity-50" />
          <div className="u-arch absolute right-8 top-0 h-[82%] w-[54%] bg-rosso" />
          <Image
            src="/collage/collage-berlin.webp"
            alt="Collage: mano, bocca, torre della televisione di Berlino"
            width={520}
            height={620}
            priority
            className="u-riso absolute right-[-8%] top-[-2%] w-[92%] max-w-none"
          />
          <div className="u-halftone absolute bottom-8 left-0 h-20 w-28 text-ink" />
        </div>
      </Container>

      <MetaBand />

      {/* CHI SIAMO */}
      <Container className="grid items-center gap-14 py-20 md:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="relative">
          <span className="u-tape left-6 top-[-14px] bg-blu/40" />
          <Image
            src="/collage/collage-people.webp"
            alt="Collage: persone che parlano, fumetti"
            width={560}
            height={700}
            className="u-riso w-full -rotate-1 border-2 border-ink"
          />
        </Reveal>
        <Reveal delay={120}>
          <p className="kicker mb-4">Chi siamo</p>
          <h2 className="max-w-[12ch] text-[clamp(1.9rem,4.5vw,2.5rem)]">
            Non spieghiamo il teatro. Lo facciamo succedere.
          </h2>
          <p className="mt-5 max-w-[46ch]">
            Siamo una scuola di improvvisazione e teatro nata a Berlino nel 2016. Facciamo
            formazione e spettacoli in italiano per adulti e bambini, con l&apos;obiettivo di
            diffondere la lingua e la cultura italiana a Berlino attraverso
            l&apos;improvvisazione — in dialogo con le scuole tedesca, spagnola, francese e
            inglese della città.
          </p>
          <p className="mt-5">
            <Link
              href="/chi-siamo"
              className="font-display text-sm font-semibold uppercase tracking-[0.1em]"
            >
              Chi siamo →
            </Link>
          </p>
        </Reveal>
      </Container>

      {/* QUICK LINKS */}
      <section className="border-y-2 border-ink bg-paper-2 py-[70px]">
        <Container>
          <SectionHeading>Dove vuoi andare?</SectionHeading>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((q, i) => (
              <Link
                key={q.href}
                href={q.href}
                className="relative flex flex-col gap-2.5 border-2 border-ink bg-paper-3 px-6 pb-5 pt-7 transition-transform hover:-translate-y-1"
                style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 0.5}deg)` }}
              >
                <span className={`absolute inset-x-[-2px] top-[-2px] h-2 ${q.accent}`} />
                <h3 className="mt-1.5 text-2xl">{q.title}</h3>
                <p className="text-[14.5px] leading-[1.55]">{q.text}</p>
                <span
                  className={`mt-auto font-display text-[13px] font-semibold uppercase tracking-[0.1em] ${q.go}`}
                >
                  {q.cta}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* PROSSIME DATE */}
      <Container className="grid gap-14 py-[74px] md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="kicker mb-4 text-verde">Prossime date</p>
          <h2 className="text-[clamp(2rem,5vw,2.75rem)]">
            Quando
            <br />
            ci si vede
          </h2>
          <p className="mt-5 max-w-[32ch]">
            Il calendario completo, con i biglietti, vive nella pagina Eventi.
          </p>
          <p className="mt-5">
            <Link
              href="/eventi"
              className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-verde"
            >
              Tutti gli eventi →
            </Link>
          </p>
        </div>
        <div className="self-center">
          <EventiList
            eventi={eventi}
            emptyLabel="Nessuna data in programma. Torna presto — o iscriviti alla newsletter."
          />
        </div>
      </Container>

      {/* NEWSLETTER */}
      <section className="bg-ink py-16 text-paper">
        <Container className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-[clamp(2rem,5vw,2.75rem)] text-paper">Resta nel giro</h2>
            <p className="mt-3.5 max-w-[38ch] text-paper/80">
              Spettacoli, corsi e workshop. Una mail al mese, niente di più.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex">
              <span className="flex-1 border-2 border-r-0 border-paper px-4 py-3.5 text-sm text-paper/55">
                la-tua@email.com
              </span>
              <Button href="/contatti" variant="rosso" className="border-rosso">
                Iscriviti
              </Button>
            </div>
            <p className="kicker tracking-[0.18em] text-paper/65">
              Instagram · Facebook · YouTube · WhatsApp
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
