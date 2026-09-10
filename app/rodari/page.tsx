import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { MetaBand } from "@/components/MetaBand";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { PressList } from "@/components/PressList";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Grammatica della Fantasia",
  description:
    "Laboratorio e spettacolo di improvvisazione teatrale ispirati a Gianni Rodari, per scuole italiane, corsi di lingua e ragazzi a Berlino. In italiano.",
  alternates: { canonical: "/rodari" },
};

const steps = [
  {
    n: "01",
    t: "Attori professionisti, niente copione",
    d: "Sul palco ci sono improvvisatori esperti che costruiscono le storie in diretta, a partire da quello che arriva dalla classe.",
  },
  {
    n: "02",
    t: "Il pubblico co-crea",
    d: "La classe non osserva: partecipa. Suggerisce parole, personaggi, situazioni. Ogni voce conta, ogni idea può diventare una storia.",
  },
  {
    n: "03",
    t: "L'errore è una risorsa",
    d: "L'accostamento imprevisto, la parola fuori posto, l'idea «sbagliata»: è da lì che nascono le storie più interessanti. Rodari lo sapeva bene.",
  },
  {
    n: "04",
    t: "Flessibile e adattabile",
    d: "Durata 30–60 minuti. Adatto a diverse fasce d'età. A scuola o in teatro. Interamente in italiano.",
  },
];

const audience = [
  {
    t: "Scuole italiane a Berlino",
    d: "Classi di scuola media e superiore, in italiano, anche direttamente a scuola.",
  },
  {
    t: "Scuole bilingui",
    d: "Un'esperienza linguistica autentica: italiano vivo, non studiato, non recitato.",
  },
  {
    t: "Corsi di lingua italiana",
    d: "Un'immersione totale: si ride, ci si stupisce, si capisce tutto — anche senza essere madrelingua.",
  },
  {
    t: "Progetti culturali ed educativi",
    d: "Prenotabile per eventi, festival e iniziative speciali. Con il laboratorio o come evento singolo.",
  },
];

export default function RodariPage() {
  return (
    <>
      {/* HERO */}
      <Container className="grid items-center gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
        <div>
          <p className="kicker mb-6 text-verde">Berlino Italia Improv presenta</p>
          <h1 className="text-[clamp(2.75rem,7.5vw,5.25rem)]">
            Grammatica
            <br />
            della
            <br />
            <span className="text-verde">Fantasia</span>
          </h1>
          <p className="mt-7 max-w-lg text-lg">
            Portiamo Rodari sul palco. Improvvisazione teatrale per scuole e ragazzi. A
            Berlino, in italiano.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <Button href="/contatti" variant="verde">
              Prenota o chiedi info
            </Button>
          </div>
        </div>
        <div className="relative min-h-[300px] sm:min-h-[420px]">
          <div className="u-arch u-halftone absolute right-6 top-2 h-[85%] w-[58%] text-ink opacity-50" />
          <Image
            src="/collage/collage-berlin.webp"
            alt="Collage: mano, bocca, torre della televisione di Berlino"
            width={460}
            height={560}
            priority
            className="u-riso absolute right-[-8%] top-[-2%] w-[86%] max-w-none"
          />
        </div>
      </Container>

      <MetaBand color="verde">
        «La fantasia non è un lusso, è una necessità» — Gianni Rodari, 1973
      </MetaBand>

      {/* IL PROGETTO */}
      <Container className="grid gap-14 py-16 md:grid-cols-[1fr_0.85fr]">
        <div>
          <SectionHeading color="verde" kicker="Il progetto" rule={false}>
            Usiamo Rodari come si usa una cassetta degli attrezzi.
          </SectionHeading>
          <div className="prose max-w-none">
            <p>
              Rodari non è solo uno degli autori più amati della letteratura italiana: è un
              metodo. Il suo lavoro sulla fantasia, sul gioco e sull&apos;errore come
              risorsa creativa è esattamente quello di cui ha bisogno chi fa improvvisazione
              teatrale.
            </p>
            <p>
              A Berlino Italia usiamo le sue idee come punto di partenza per portare ragazzi
              e studenti a contatto con il teatro — trasformandole in esperienze vive,
              partecipate, in italiano. Non spieghiamo Rodari: lo mettiamo in scena.
            </p>
            <p>
              Il risultato sono due proposte distinte, prenotabili insieme o separatamente:
              un <strong>laboratorio continuativo per ragazzi</strong> e uno{" "}
              <strong>spettacolo interattivo per le classi</strong>.
            </p>
          </div>
        </div>
        <div className="relative self-start">
          <span className="u-tape left-6 top-[-14px] bg-verde/40" />
          <Image
            src="/collage/collage-people.webp"
            alt="Collage: persone che parlano"
            width={480}
            height={600}
            className="u-riso w-full -rotate-1 border-2 border-ink"
          />
        </div>
      </Container>

      {/* IL LABORATORIO */}
      <section className="border-y-2 border-ink bg-paper-2 py-16">
        <Container>
          <SectionHeading color="verde" kicker="Il laboratorio per ragazzi">
            Un percorso. Non una lezione.
          </SectionHeading>
          <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="prose max-w-none">
              <p>
                Il laboratorio è un percorso continuativo di alcuni mesi, calibrato sul
                programma scolastico. I ragazzi si incontrano ogni settimana e costruiscono
                qualcosa insieme, sessione dopo sessione. Al termine è possibile — ma non
                obbligatorio — una restituzione pubblica.
              </p>
              <p>
                Si allena la concentrazione, la velocità di reazione, la capacità di
                collaborare, la sospensione del giudizio. Si impara a fare scelte, a
                lasciarsi sorprendere, ad accettare le idee degli altri, ad ascoltare, a
                fidarsi del proprio intuito — e a rendersi conto di come un <strong>sì</strong>{" "}
                o un <strong>no</strong> possono cambiare il corso della storia.
              </p>
              <p>
                Improvvisare in italiano significa pensare in italiano, senza tradurre. La
                velocità che richiede l&apos;improvvisazione costringe il cervello a usare la
                lingua in modo spontaneo. Col tempo, quella fluidità si trasferisce fuori
                dalla scena. Non è un effetto collaterale: è parte del percorso.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {[
                {
                  h: "Per chi?",
                  li: ["Ragazzi di tutte le età", "Italofoni a Berlino", "Nessun requisito"],
                },
                {
                  h: "Come funziona?",
                  li: [
                    "Percorso di alcuni mesi",
                    "Sessioni settimanali di gruppo",
                    "Circa 2 ore a lezione",
                    "In italiano",
                    "Restituzione finale opzionale",
                  ],
                },
              ].map((card) => (
                <div key={card.h} className="border-2 border-ink bg-paper-3 p-5">
                  <h3 className="mb-2 text-xl">{card.h}</h3>
                  <ul className="list-[square] pl-4 text-sm leading-[1.7]">
                    {card.li.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* LO SPETTACOLO */}
      <Container className="py-16">
        <SectionHeading color="verde" kicker="Lo spettacolo per le scuole">
          Rodari prende vita sul palco.
        </SectionHeading>
        <p className="mb-8 max-w-2xl text-lg">
          Un evento singolo con attori professionisti. Storie, parole e immagini prendono
          forma davanti agli occhi degli studenti, nel momento esatto in cui vengono viste.
          I ragazzi non salgono sul palco — ma senza di loro lo spettacolo non esiste.
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          {steps.map((s) => (
            <div key={s.n} className="border-2 border-ink bg-paper-3 p-6">
              <div className="font-display text-3xl font-bold text-verde/30">{s.n}</div>
              <h3 className="mt-1 text-xl">{s.t}</h3>
              <p className="mt-2 text-sm leading-[1.55]">{s.d}</p>
            </div>
          ))}
        </div>

        <h3 className="mb-4 mt-12 text-2xl">Per chi?</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audience.map((a) => (
            <div key={a.t} className="border-l-2 border-verde pl-4">
              <h4 className="font-display text-base font-semibold uppercase">{a.t}</h4>
              <p className="mt-1 text-sm leading-[1.5]">{a.d}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* CHI SIAMO */}
      <section className="bg-ink py-16 text-paper">
        <Container className="grid gap-12 md:grid-cols-[1fr_0.7fr]">
          <div>
            <p className="kicker mb-4 text-verde">Chi c&apos;è dietro</p>
            <h2 className="text-[clamp(1.8rem,4.5vw,2.5rem)] text-paper">
              Luca Rizzuti &amp; Berlino Italia Improv
            </h2>
            <div className="prose mt-5 max-w-none [&_p]:text-paper/80">
              <p>
                Luca Rizzuti è arrivato a Berlino nel 2016 con un&apos;idea fissa: creare
                uno spazio di improvvisazione teatrale in italiano, capace di dialogare con
                le altre scuole internazionali della città.
              </p>
              <p>
                Nel 2017 fonda Berlino Italia Improv, oggi membro dell&apos;International
                Theatresports Institute. Come formatore non insegna tecniche: aiuta le
                persone a riconoscere le difese che si costruiscono negli anni per evitare
                il fallimento pubblico — e a smontarle, una per una.
              </p>
            </div>
          </div>
          <div className="self-center border-2 border-paper/25 p-6">
            <p className="kicker mb-2 text-paper">International Theatresports Institute</p>
            <ul className="list-[square] pl-4 text-sm leading-[1.8] text-paper/80">
              <li>Membri dal 2017</li>
              <li>Network mondiale di scuole di improvvisazione</li>
              <li>Fondato da Keith Johnstone</li>
            </ul>
          </div>
        </Container>
      </section>

      {/* RIFERIMENTI */}
      <Container className="py-16">
        <SectionHeading color="verde" kicker="Riferimenti & stampa">
          Ne hanno parlato.
        </SectionHeading>
        <PressList />
      </Container>

      {/* CONTATTI */}
      <section className="border-t-2 border-ink bg-paper-2 py-14">
        <Container className="text-center">
          <h2 className="text-[clamp(1.6rem,4vw,2.25rem)]">Parliamoci.</h2>
          <p className="mx-auto mt-3 max-w-lg">
            Sei un&apos;insegnante, un genitore, un organizzatore? Scrivici per portare lo
            spettacolo o il laboratorio nella tua scuola.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3.5">
            <Button href={`mailto:${site.contact.email}`} external variant="verde">
              Scrivi una mail
            </Button>
            <Button href={site.contact.whatsappUrl} external variant="ghost">
              WhatsApp
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
