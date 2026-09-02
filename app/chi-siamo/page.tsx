import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { MetaBand } from "@/components/MetaBand";
import { SectionHeading } from "@/components/SectionHeading";
import { PressList } from "@/components/PressList";
import { Button } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Chi siamo",
  description:
    "Berlino Italia Improv: scuola di improvvisazione e teatro nata a Berlino nel 2016. Formazione e spettacoli in italiano, membri dell'International Theatresports Institute dal 2017.",
  alternates: { canonical: "/chi-siamo" },
};

const pilastri = [
  {
    t: "Uscire dalla comfort zone",
    d: "Il teatro improvvisato porta storie a teatro senza un testo da imparare a memoria.",
  },
  {
    t: "Raccontare storie divertendosi",
    d: "Attingiamo dal nostro vissuto, dall'immaginazione, dall'ispirazione del momento.",
  },
  {
    t: "Scoprire e migliorare se stessi",
    d: "Per chi ha voglia di fare teatro senza prendersi troppo sul serio.",
  },
  {
    t: "Esperire la magia del momento",
    d: "L'arte di fare con quello che si ha, adesso: trarre il massimo dal possibile.",
  },
];

// Bozze — testi provvisori, da sostituire con le versioni definitive.
const team = [
  {
    nome: "Luca Rizzuti",
    ruolo: "Fondatore · formatore",
    iniziali: "LR",
    bio: "Arrivato a Berlino nel 2016, nel 2017 fonda Berlino Italia Improv. Come formatore lavora sulle difese che impediscono di esporsi in scena — e nella vita.",
  },
  {
    nome: "Maddalena Zoli",
    ruolo: "Insegnante · improvvisatrice",
    iniziali: "MZ",
    bio: "Attrice e improvvisatrice, insegna nei corsi e porta gli spettacoli in teatro. Lavora sull'ascolto e sulla costruzione di storie insieme.",
  },
  {
    nome: "Pierpaolo Pantone",
    ruolo: "Insegnante · improvvisatore",
    iniziali: "PP",
    bio: "Improvvisatore e insegnante, accompagna chi comincia dai primi passi fino al palco, con attenzione al gioco e alla fiducia nel gruppo.",
  },
];

const collaborazioni = [
  ["Die Gorillas", "Tedesco"],
  ["Berlín ES Impro", "Spagnolo"],
  ["LIBER — Ligue d'Impro de Berlin", "Francese"],
  ["Professionisti internazionali", "Inglese"],
];

export default function ChiSiamoPage() {
  return (
    <>
      {/* HERO */}
      <Container className="grid items-center gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
        <div>
          <p className="kicker mb-6">Chi siamo — Berlino — dal 2016</p>
          <h1 className="text-[clamp(2.75rem,7vw,5rem)]">
            Non spieghiamo
            <br />
            il teatro.
            <br />
            Lo facciamo
            <br />
            <span className="text-rosso">succedere.</span>
          </h1>
          <p className="mt-7 max-w-lg text-lg">
            Siamo una scuola di improvvisazione e teatro nata a Berlino nel 2016. Facciamo
            formazione e spettacoli in italiano per adulti e bambini, con l&apos;obiettivo
            di diffondere la lingua e la cultura italiana a Berlino attraverso
            l&apos;improvvisazione.
          </p>
        </div>
        <div className="relative min-h-[280px] sm:min-h-[380px]">
          <div className="u-arch absolute right-8 top-0 h-[88%] w-[56%] bg-rosso" />
          <div className="u-halftone absolute bottom-6 left-0 h-24 w-28 text-ink" />
        </div>
      </Container>

      <MetaBand>Improvvisazione · Teatro · Gioco · Ascolto · Presenza</MetaBand>

      {/* PILASTRI */}
      <Container className="py-16">
        <SectionHeading kicker="Perché lo facciamo">Quattro idee fisse</SectionHeading>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pilastri.map((p, i) => (
            <div
              key={p.t}
              className="border-2 border-ink bg-paper-3 p-5"
              style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 0.4}deg)` }}
            >
              <h3 className="text-xl leading-none">{p.t}</h3>
              <p className="mt-3 text-sm leading-[1.55]">{p.d}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* ITI + COLLABORAZIONI */}
      <section className="border-y-2 border-ink bg-paper-2 py-16">
        <Container className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="kicker mb-4">Dal 2017</p>
            <h2 className="text-[clamp(1.8rem,4.5vw,2.5rem)]">
              Membri dell&apos;International Theatresports Institute
            </h2>
            <p className="mt-4 max-w-md">
              Il network mondiale di scuole di improvvisazione fondato da Keith Johnstone. I
                nostri corsi seguono tre livelli; gli spettacoli sono ogni quarta domenica
              del mese al teatro Acud.
            </p>
          </div>
          <div>
            <p className="kicker mb-4">Con le altre scuole di Berlino</p>
            <ul className="border-t-2 border-ink">
              {collaborazioni.map(([n, l]) => (
                <li
                  key={n}
                  className="flex items-baseline justify-between gap-4 border-b-2 border-ink py-3"
                >
                  <span className="font-display text-lg font-semibold uppercase leading-tight">
                    {n}
                  </span>
                  <span className="font-display text-xs uppercase tracking-[0.12em] text-ink/55">
                    {l}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* TEAM */}
      <Container className="py-16">
        <SectionHeading kicker="Gli insegnanti">Il team</SectionHeading>
        <p className="mb-8 -mt-3 font-display text-xs uppercase tracking-[0.12em] text-blu">
          Foto e testi provvisori — da sostituire
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <div key={m.nome} className="border-2 border-ink bg-paper-3">
              <div className="u-halftone flex aspect-square items-center justify-center border-b-2 border-ink bg-paper-2 text-ink">
                <span className="font-display text-6xl font-bold uppercase text-ink/25">
                  {m.iniziali}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-xl leading-none">{m.nome}</h3>
                <p className="mt-1 font-display text-[11px] uppercase tracking-[0.12em] text-rosso">
                  {m.ruolo}
                </p>
                <p className="mt-3 text-sm leading-[1.55]">{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* STAMPA */}
      <section className="border-t-2 border-ink bg-paper-2 py-16">
        <Container>
          <SectionHeading kicker="Riferimenti & stampa">Ne hanno parlato.</SectionHeading>
          <PressList />
        </Container>
      </section>

      {/* CTA */}
      <Container className="py-14 text-center">
        <h2 className="text-[clamp(1.6rem,4vw,2.25rem)]">Vuoi conoscerci di persona?</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-3.5">
          <Button href="/corsi" variant="blu">
            Vieni a un corso
          </Button>
          <Button href="/eventi" variant="ghost">
            Vieni a uno spettacolo
          </Button>
        </div>
        <p className="mt-6 text-sm text-ink/60">
          {site.contact.email} · WhatsApp {site.contact.whatsapp}
        </p>
      </Container>
    </>
  );
}
