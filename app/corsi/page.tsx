import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { MetaBand } from "@/components/MetaBand";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { EventiList } from "@/components/EventiList";
import { JsonLd } from "@/components/JsonLd";
import { getLezioni } from "@/lib/eventi";
import { courseLd, eventLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Corsi",
  description:
    "Corsi di improvvisazione teatrale in italiano a Berlino, ogni lunedì e sabato. Puoi provare con una lezione singola a 20 €, senza iscrizione.",
  alternates: { canonical: "/corsi" },
};

export const revalidate = 3600;

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

export default async function CorsiPage() {
  const lezioni = await getLezioni();

  return (
    <>
      <JsonLd data={courseLd} />
      {lezioni.length > 0 && <JsonLd data={lezioni.map(eventLd)} />}
      {/* HERO */}
      <Container className="grid items-center gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
        <div>
          <p className="kicker mb-6 text-blu">Corsi · Berlino · in italiano</p>
          <h1 className="text-[clamp(3rem,8vw,5.5rem)]">
            Prova
            <br />
            una <span className="text-blu">lezione</span>
          </h1>
          <p className="mt-7 max-w-lg text-lg">
            Puoi venire a una lezione singola, senza iscriverti a un corso. Costa 20 €, si
            prenota online e non ti impegna a continuare.
          </p>
          <p className="mt-4 max-w-lg text-lg">
            Non devi saper recitare e non devi essere madrelingua: basta parlare italiano e
            avere voglia di giocare. Ci vediamo il lunedì sera o il sabato pomeriggio.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <Button href="#prossime-lezioni" variant="blu">
              Scegli una data
            </Button>
            <Button href={site.contact.whatsappUrl} external variant="ghost">
              Scrivici su WhatsApp
            </Button>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[340px] lg:max-w-[400px]">
          <Image
            src="/collage/collage-porta.webp"
            alt="Collage: porta socchiusa davanti a un arco blu"
            width={643}
            height={991}
            priority
            className="w-full rotate-[1.5deg]"
          />
        </div>
      </Container>

      <MetaBand color="blu">
        Lunedì e sabato · in italiano · nessuna esperienza richiesta
      </MetaBand>

      {/* PROSSIME LEZIONI */}
      <section id="prossime-lezioni" className="border-b-2 border-ink bg-paper-2 py-14">
        <Container className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div>
            <p className="kicker mb-4 text-blu">Vieni a provare</p>
            <h2 className="text-[clamp(2rem,5vw,2.75rem)]">
              Prossime lezioni
            </h2>
          </div>
          <EventiList
            eventi={lezioni}
            emptyLabel="Nessuna data in calendario in questo momento. Scrivici su WhatsApp per sapere quando è la prossima lezione."
          />
        </Container>
      </section>

      {/* COM'È UNA LEZIONE */}
      <Container className="py-16">
        <SectionHeading color="blu" kicker="Se non l'hai mai fatto">
          Com&apos;è una lezione
        </SectionHeading>
        <div className="max-w-2xl text-lg">
          <p>Entri. Nessuno ti chiede niente.</p>
          <p className="mt-4">
            Dopo pochi minuti stai ridendo insieme a persone che poco prima erano sconosciute.
          </p>
          <p className="mt-4">
            Poi si gioca: si inventano scene e storie sul momento, insieme, senza sapere come
            andranno a finire. E quando qualcosa va storto, di solito è la parte più
            divertente.
          </p>
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
            Improvvisare in italiano significa pensare in italiano, senza tradurre, senza
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
              Lunedì
            </dt>
            <dd>
              19:30 – 22:00 · {site.venues.corsiLun.name} · {site.venues.corsiLun.address}
            </dd>
          </div>
          <div className="grid gap-1 border-b-2 border-ink py-4 sm:grid-cols-[210px_1fr] sm:gap-5">
            <dt className="font-display font-semibold uppercase tracking-[0.08em]">Sabato</dt>
            <dd>
              14:00 – 16:00 · {site.venues.corsiSab.name} · {site.venues.corsiSab.address}
            </dd>
          </div>
          <div className="grid gap-1 border-b-2 border-ink py-4 sm:grid-cols-[210px_1fr] sm:gap-5">
            <dt className="font-display font-semibold uppercase tracking-[0.08em]">Lingua</dt>
            <dd>Italiano</dd>
          </div>
        </dl>
      </Container>

      {/* CTA */}
      <Container className="py-16 text-center">
        <h2 className="text-[clamp(1.6rem,4vw,2.25rem)]">
          Il modo migliore per capire
          <br />è venire una volta.
        </h2>
        <div className="mt-6 flex flex-wrap justify-center gap-3.5">
          <Button href="#prossime-lezioni" variant="blu">
            Scegli una data
          </Button>
          <Button href={site.contact.whatsappUrl} external variant="ghost">
            Scrivici su WhatsApp
          </Button>
        </div>
      </Container>
    </>
  );
}
