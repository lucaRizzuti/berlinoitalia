import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { MetaBand } from "@/components/MetaBand";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gutschein",
  description:
    "Il Berlino Impro Gutschein: un token di metallo da regalare, valido per una serata a teatro per due o una lezione di prova. Senza scadenza. Accettato dalle scuole partner di Berlino.",
  alternates: { canonical: "/gutschein" },
};

const come = [
  {
    n: "01",
    t: "A teatro, in due",
    d: "Un Gutschein vale per assistere a uno dei nostri spettacoli portando qualcuno con te. Un token, due posti.",
  },
  {
    n: "02",
    t: "A lezione di prova",
    d: "Oppure usalo per entrare a una lezione di improvvisazione senza impegno — nessuna esperienza richiesta.",
  },
];

const fatti = [
  ["Metallo fuso", "Inciso con il marchio Berlino Italia Improv."],
  ["Montato su cartoncino", "Cartoncino nero con tipografia decisa, laccetto rosso o nero."],
  ["Nessuna scadenza", "Kein Ablaufdatum · Nessuna scadenza. Lo usi quando vuoi."],
  ["Valido dai partner", "Accettato da Berlino Italia Improv e dalle scuole di impro partner di Berlino."],
];

const partner = [
  { name: "Impro Embassy", lang: "Inglese", url: "https://www.ratibortheater.de/en/shows/impro-embassy" },
  { name: "Berlino Italia Improv", lang: "Italiano", url: site.url },
  { name: "Berlín ES Impro", lang: "Spagnolo", url: "https://berlinesimpro.com/" },
  { name: "LIBER", lang: "Francese", url: "https://liber-impro.com/" },
  { name: "Scratch Theater", lang: "Inglese", url: "https://www.scratchtheater.com/" },
  { name: "Polskie Impro Berlin", lang: "Polacco", url: "https://www.facebook.com/polskieimproberlin" },
];

export default function GutscheinPage() {
  return (
    <>
      {/* HERO */}
      <Container className="grid items-center gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
        <div>
          <p className="kicker mb-6 text-rosso">Berlino Italia Improv</p>
          <h1 className="text-[clamp(3rem,8vw,5.5rem)]">
            Berlino
            <br />
            Impro
            <br />
            <span className="text-rosso">Gutschein</span>
          </h1>
          <p className="mt-7 max-w-lg text-lg">
            Un token di metallo. Un regalo che apre due porte: un posto a teatro per due, o
            una lezione di improvvisazione senza impegno.
          </p>
          <p className="mt-3 font-display text-xs uppercase tracking-[0.14em] text-ink/45">
            Gutschein Impro Berlin · Buono regalo teatro Berlino · Originelles Geschenk
          </p>
        </div>
        <div className="relative flex min-h-[300px] items-center justify-center">
          <div className="u-arch absolute right-10 top-2 h-[86%] w-[52%] bg-rosso" />
          <div className="u-halftone absolute bottom-6 left-2 h-24 w-28 text-ink" />
          <div className="relative w-52 border-2 border-ink bg-[linear-gradient(145deg,#9a9a9a,#5c5c5c)] px-5 py-6 text-center shadow-[5px_5px_0_var(--color-ink)]">
            <span className="absolute -top-4 left-1/2 h-9 w-4 -translate-x-1/2 bg-rosso" />
            <div className="font-display font-bold uppercase leading-none text-[#2f2f2f]">
              <div className="text-[0.7rem] tracking-[0.1em] opacity-70">Berlino</div>
              <div className="text-4xl">B</div>
              <div className="text-[0.65rem] tracking-[0.08em] opacity-70">Italia</div>
              <div className="text-sm">Improv</div>
            </div>
          </div>
        </div>
      </Container>

      <MetaBand color="rosso">Kein Ablaufdatum · Nessuna scadenza · No expiry</MetaBand>

      {/* COME FUNZIONA */}
      <Container className="py-16">
        <SectionHeading color="rosso" kicker="Come funziona">
          Un token, due modi di usarlo
        </SectionHeading>
        <div className="grid gap-5 sm:grid-cols-2">
          {come.map((c) => (
            <div key={c.n} className="relative border-2 border-ink bg-paper-3 px-6 py-7">
              <span className="absolute inset-x-[-2px] top-[-2px] h-2 bg-rosso" />
              <div className="font-display text-4xl font-bold text-rosso/25">{c.n}</div>
              <h3 className="mt-1 text-2xl">{c.t}</h3>
              <p className="mt-2 text-sm leading-[1.55]">{c.d}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* L'OGGETTO */}
      <section className="border-y-2 border-ink bg-paper-2 py-16">
        <Container>
          <SectionHeading color="rosso" kicker="L'oggetto">
            Non un voucher. Un token.
          </SectionHeading>
          <p className="mb-8 max-w-2xl text-lg">
            È un token di metallo fuso — fatto per essere tenuto in mano, regalato e usato.
            Arriva montato su un cartoncino con laccetto, pronto da dare. Non è usa e getta.
            Ha un peso. Significa qualcosa.
          </p>
          <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {fatti.map(([h, d]) => (
              <div key={h} className="flex gap-3 border-b border-ink/20 pb-5">
                <span className="mt-2 h-2 w-2 shrink-0 bg-rosso" />
                <div>
                  <dt className="font-display text-base font-semibold uppercase">{h}</dt>
                  <dd className="mt-0.5 text-sm text-ink/75">{d}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* COME OTTENERLO */}
      <Container className="py-16">
        <SectionHeading color="rosso" kicker="Come ottenerlo">
          Scrivici e te lo mandiamo
        </SectionHeading>
        <div className="grid gap-5 sm:grid-cols-2">
          <a
            href={`mailto:${site.contact.email}`}
            className="border-2 border-ink bg-paper-3 px-6 py-7 transition-transform hover:-translate-y-1"
          >
            <h3 className="text-2xl">Per email</h3>
            <p className="mt-2 text-sm">
              Scrivici per ordinare il tuo Gutschein, concordare la consegna o fare domande.
            </p>
            <p className="mt-3 font-display text-sm font-semibold uppercase tracking-[0.06em] text-rosso">
              {site.contact.email}
            </p>
          </a>
          <a
            href={site.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-ink bg-paper-3 px-6 py-7 transition-transform hover:-translate-y-1"
          >
            <h3 className="text-2xl">Su WhatsApp</h3>
            <p className="mt-2 text-sm">
              Preferisci un messaggio diretto? Ci trovi su WhatsApp Business.
            </p>
            <p className="mt-3 font-display text-sm font-semibold uppercase tracking-[0.06em] text-rosso">
              {site.contact.whatsapp} →
            </p>
          </a>
        </div>
      </Container>

      {/* PARTNER */}
      <section className="border-t-2 border-ink bg-paper-2 py-16">
        <Container>
          <SectionHeading color="rosso" kicker="Accettato da">
            Le scuole partner di Berlino
          </SectionHeading>
          <p className="mb-8 max-w-xl">
            Il Gutschein è valido agli eventi di Berlino Italia Improv e accettato dalle
            scuole di improvvisazione partner. Per usarlo con noi o con un partner, è
            necessario contattare in anticipo la scuola scelta — sia per una lezione sia per
            uno spettacolo.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {partner.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-ink bg-paper-3 px-5 py-4 transition-colors hover:bg-paper"
              >
                <div className="font-display text-lg font-semibold uppercase leading-tight">
                  {p.name} <span aria-hidden="true">↗</span>
                </div>
                <div className="font-display text-xs uppercase tracking-[0.1em] text-rosso">
                  {p.lang}
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* QUOTE */}
      <section className="bg-rosso py-16 text-paper">
        <Container>
          <p className="max-w-3xl font-display text-[clamp(1.5rem,3.5vw,2.5rem)] font-semibold uppercase leading-tight">
            Il regalo migliore per chi non ha mai provato l&apos;improvvisazione — e per chi
            non ne può più fare a meno.
          </p>
          <div className="mt-8">
            <Button href={`mailto:${site.contact.email}`} external variant="ink" className="border-ink">
              Ordina il tuo Gutschein
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
