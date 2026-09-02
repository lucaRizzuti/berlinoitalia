import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { MetaBand } from "@/components/MetaBand";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Corsi",
  description:
    "Corsi di improvvisazione teatrale in italiano a Berlino: tre livelli, ogni lunedì e sabato. La prima lezione è libera, senza iscrizione. Workshop con ospiti dall'Italia.",
  alternates: { canonical: "/corsi" },
};

const livelli = [
  {
    n: "01",
    titolo: "Principianti",
    testo:
      "I fondamenti: accettare le offerte, costruire insieme, non perdere la testa di fronte al vuoto. Nessuna esperienza richiesta, si può entrare in qualsiasi momento.",
  },
  {
    n: "02",
    titolo: "Intermedio",
    testo:
      "Personaggi, relazioni, struttura della scena. Si comincia a tenere in piedi storie più lunghe e a lavorare sull'ascolto fine.",
  },
  {
    n: "03",
    titolo: "Avanzato",
    testo:
      "Format, regia, presenza scenica. È il gruppo che porta gli spettacoli in teatro.",
  },
];

const skill = [
  "Ascolto",
  "Collaborazione",
  "Reazione",
  "Fiducia",
  "Italiano spontaneo",
  "Gestione dell'errore",
  "Comunicazione",
  "Creatività",
];

export default function CorsiPage() {
  return (
    <>
      {/* HERO */}
      <Container className="grid items-center gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
        <div>
          <p className="kicker mb-6 text-blu">Corsi — Berlino — in italiano</p>
          <h1 className="text-[clamp(3rem,8vw,5.5rem)]">
            Imparare
            <br />
            ad <span className="text-blu">ascoltare</span>
          </h1>
          <p className="mt-7 max-w-lg text-lg">
            Corsi di improvvisazione teatrale in italiano, tre livelli. Si allena la
            concentrazione, la velocità di reazione, la capacità di collaborare — e si
            scopre come un <strong>sì</strong> o un <strong>no</strong> cambiano tutta la
            storia.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <Button href={site.contact.whatsappUrl} external variant="blu">
              Vieni a provare
            </Button>
            <Button href="/contatti" variant="ghost">
              Scrivici
            </Button>
          </div>
        </div>
        <div className="relative min-h-[320px] sm:min-h-[440px]">
          <div className="u-arch absolute right-5 top-0 h-[88%] w-[58%] bg-blu" />
          <Image
            src="/collage/collage-ear.webp"
            alt="Collage: orecchio, forma blu"
            width={460}
            height={560}
            priority
            className="u-riso absolute right-[-8%] top-[-2%] w-[86%] max-w-none"
          />
        </div>
      </Container>

      <MetaBand color="blu">
        La prima lezione è libera · senza iscrizione · senza impegno
      </MetaBand>

      {/* LIVELLI */}
      <Container className="py-16">
        <SectionHeading color="blu" kicker="Il percorso">
          Tre livelli
        </SectionHeading>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {livelli.map((l, i) => (
            <div
              key={l.n}
              className="border-2 border-ink bg-paper-3 px-6 py-7"
              style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 0.4}deg)` }}
            >
              <div className="font-display text-5xl font-bold leading-none text-blu/25">
                {l.n}
              </div>
              <h3 className="mt-2 text-2xl">{l.titolo}</h3>
              <p className="mt-2 text-sm leading-[1.55]">{l.testo}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-none border-l-2 border-blu bg-paper-2 p-6">
          <p className="kicker mb-2 text-blu">Cosa si allena</p>
          <div className="flex flex-wrap gap-2">
            {skill.map((s) => (
              <span
                key={s}
                className="border-[1.5px] border-ink px-2.5 py-1 font-display text-[11px] font-medium uppercase tracking-[0.1em]"
              >
                {s}
              </span>
            ))}
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-[1.6]">
            Improvvisare in italiano significa pensare in italiano — senza tradurre, senza
            fermarsi. La velocità dell&apos;improvvisazione costringe a usare la lingua in
            modo istintivo, e col tempo quella fluidità si trasferisce fuori dalla scena.
          </p>
        </div>
      </Container>

      {/* ORARI E SEDI */}
      <Container className="grid gap-12 pb-16 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="kicker mb-4 text-blu">Quando e dove</p>
          <h2 className="text-[clamp(2rem,5vw,2.75rem)]">
            Lunedì
            <br />e sabato
          </h2>
          <p className="mt-4 max-w-[34ch]">
            È sempre possibile partecipare a una singola lezione, senza iscrizione.
          </p>
        </div>
        <dl className="border-t-2 border-ink">
          <div className="grid gap-1 border-b-2 border-ink py-4 sm:grid-cols-[210px_1fr] sm:gap-5">
            <dt className="font-display font-semibold uppercase tracking-[0.08em]">
              Lunedì · livello base
            </dt>
            <dd>
              19:30 – 22:00 · {site.venues.corsiLun.name} — {site.venues.corsiLun.address}
            </dd>
          </div>
          <div className="grid gap-1 border-b-2 border-ink py-4 sm:grid-cols-[210px_1fr] sm:gap-5">
            <dt className="font-display font-semibold uppercase tracking-[0.08em]">Sabato</dt>
            <dd>
              14:00 – 16:00 · {site.venues.corsiSab.name} — {site.venues.corsiSab.address}
            </dd>
          </div>
          <div className="grid gap-1 border-b-2 border-ink py-4 sm:grid-cols-[210px_1fr] sm:gap-5">
            <dt className="font-display font-semibold uppercase tracking-[0.08em]">Lingua</dt>
            <dd>Italiano</dd>
          </div>
        </dl>
      </Container>

      {/* WORKSHOP */}
      <section className="border-y-2 border-ink bg-paper-2 py-16">
        <Container className="grid items-center gap-14 md:grid-cols-[1fr_0.85fr]">
          <div>
            <p className="kicker mb-4">Dentro i corsi</p>
            <h2 className="text-[clamp(2rem,5vw,2.75rem)]">Workshop</h2>
            <p className="mt-5 max-w-[48ch]">
              Organizziamo regolarmente workshop con insegnanti ospiti che vengono apposta
              dall&apos;Italia per lavorare con noi, in collaborazione con le migliori
              scuole del network nazionale di improvvisatori.
            </p>
            <p className="mt-4 max-w-[48ch]">
              E workshop di introduzione all&apos;improvvisazione: incontri singoli in cui
              scoprire i fondamenti in un ambiente rilassato e molto divertente.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Ospiti dall'Italia", "Introduzione all'impro", "Weekend intensivi"].map((s) => (
                <span
                  key={s}
                  className="border-[1.5px] border-ink px-2.5 py-1 font-display text-[11px] font-medium uppercase tracking-[0.1em]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="relative">
            <span className="u-tape left-8 top-[-14px]" />
            <Image
              src="/collage/collage-hand-circle.webp"
              alt="Collage: mano, cerchio rosso"
              width={520}
              height={640}
              className="u-riso w-full rotate-[1.4deg] border-2 border-ink"
            />
          </div>
        </Container>
      </section>

      {/* CTA */}
      <Container className="py-16 text-center">
        <h2 className="text-[clamp(1.6rem,4vw,2.25rem)]">
          Il modo migliore per capire
          <br />è venire una volta.
        </h2>
        <div className="mt-6">
          <Button href={site.contact.whatsappUrl} external variant="blu">
            Scrivici su WhatsApp
          </Button>
        </div>
      </Container>
    </>
  );
}
