import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SEGNI,
  getSettimane,
  getSettimana,
  rangeSettimana,
  concettoDi,
  type Previsione,
  type Segno,
  type Settimana,
} from "@/lib/improroscopo";

export const dynamicParams = false;

export const metadata: Metadata = {
  title: "ImprOroscopo — carosello",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return getSettimane().map((w) => ({ week: w.start }));
}

const ELEMENTO_COLORE: Record<Segno["elemento"], string> = {
  Fuoco: "#d4161e",
  Terra: "#6e8a33",
  Aria: "#02379c",
  Acqua: "#0b307a",
};

const ZODIAC: Record<string, string> = {
  ariete: "♈",
  toro: "♉",
  gemelli: "♊",
  cancro: "♋",
  leone: "♌",
  vergine: "♍",
  bilancia: "♎",
  scorpione: "♏",
  sagittario: "♐",
  capricorno: "♑",
  acquario: "♒",
  pesci: "♓",
};

function buildCaption(settimana: Settimana, range: string) {
  const righe = SEGNI.filter((s) => settimana.segni[s.slug])
    .map((s) => `${ZODIAC[s.slug]} ${s.nome} — ${settimana.segni[s.slug]!.titolo}`)
    .join("\n");
  return [
    `ImprOroscopo · la settimana del ${range} 🔮`,
    "",
    "L'oroscopo per chi fa teatro senza prendersi sul serio: dodici segni, dodici modi di stare in scena. Niente amore, soldi e lavoro — solo improvvisazione, e un po' di vita.",
    "",
    righe,
    "",
    "Il tuo oroscopo completo, segno per segno → berlinoitalia.com/improroscopo (link in bio)",
    "",
    "Corsi di improvvisazione teatrale in italiano a Berlino, ogni lunedì e sabato. Si può venire anche a una lezione singola, senza iscrizione.",
    "",
    "#improvvisazione #improv #teatro #oroscopo #segnizodiacali #berlino #italianiaberlino #berlinoitalia #scuoladiteatro #improvcomedy #teatroinitaliano #comicità",
  ].join("\n");
}

function CoverSlide({ range }: { range: string }) {
  return (
    <div className="slide" data-slide="01-cover">
      <span className="accent" style={{ background: "#d4161e" }} />
      <span className="cover-arch" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="cover-collage" src="/collage/collage-berlin.webp" alt="" />
      <span className="halftone cover-dots" />
      <div className="pad">
        <p className="kick">Berlino Italia Improv · settimanale</p>
        <h1 className="cover-title">
          Impr
          <br />
          <span style={{ color: "#d4161e" }}>Oroscopo</span>
        </h1>
        <p className="cover-sub">
          L&apos;oroscopo della settimana
          <br />
          per improvvisatori
        </p>
        <div className="grow" />
        <p className="micro">Settimana del</p>
        <p className="cover-week">{range}</p>
        <div className="rule" />
        <p className="payoff">Fare teatro senza prendersi sul serio</p>
        <p className="cover-hint">Scorri i 12 segni →</p>
      </div>
    </div>
  );
}

function SignSlide({
  n,
  seg,
  previsione,
  week,
}: {
  n: number;
  seg: Segno;
  previsione: Previsione;
  week: string;
}) {
  const colore = ELEMENTO_COLORE[seg.elemento];
  const concetto = concettoDi(week, seg.slug);
  return (
    <div className="slide" data-slide={`${String(n + 2).padStart(2, "0")}-${seg.slug}`}>
      <span className="accent" style={{ background: colore }} />
      <div className="img-band">
        <span className="img-arch" style={{ background: colore }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="sign-img" src={`/images/oroscopo/${seg.slug}.webp`} alt={seg.nome} />
      </div>
      <div className="sign-body">
        <div className="sign-head">
          <span className="sign-name">{seg.nome}</span>
          <span className="sign-dates">{seg.periodo}</span>
        </div>
        <p className="sign-concept" style={{ color: colore }}>
          Questa settimana · {concetto}
        </p>
        <h2 className="sign-title">{previsione.titolo}</h2>
        <p className="sign-text">{previsione.testo.replace(/\s+/g, " ")}</p>
        <div className="sign-foot">
          <span className="micro">Personaggio della settimana</span>
          <span className="sign-foot-value" style={{ color: colore }}>
            {previsione.personaggio}
          </span>
        </div>
      </div>
    </div>
  );
}

function ClosingSlide() {
  return (
    <div className="slide slide-dark" data-slide="14-fine">
      <span className="accent" style={{ background: "#d4161e" }} />
      <span className="halftone close-dots" />
      <div className="pad">
        <p className="kick" style={{ color: "rgba(240,231,220,0.55)" }}>
          Berlino Italia Improv
        </p>
        <h2 className="close-title">
          Il tuo segno,
          <br />
          per intero
        </h2>
        <p className="close-url">berlinoitalia.com/improroscopo</p>
        <div className="grow" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="close-logo" src="/brand/logo.webp" alt="Berlino Italia Improv" />
        <div className="grow" />
        <div className="rule" style={{ background: "rgba(240,231,220,0.35)" }} />
        <p className="close-line">
          Corsi di improvvisazione in italiano a Berlino, ogni lunedì e sabato. Vieni
          anche a una sola lezione.
        </p>
        <p className="close-handle">@berlinoitalia · newsletter dal sito</p>
      </div>
    </div>
  );
}

const CSS = `
  header, footer, a[aria-label="Scrivici su WhatsApp"], .u-grain, nextjs-portal {
    display: none !important;
  }
  body { background: #2b2b2b; }
  .carosello-root {
    display: flex; flex-direction: column; align-items: center;
    gap: 40px; padding: 40px 16px 80px;
  }
  .carosello-caption {
    width: 1080px; max-width: 100%; white-space: pre-wrap;
    background: #f4eee3; color: #181717; border: 2px solid #181717;
    padding: 28px; font: 15px/1.6 var(--font-archivo), system-ui, sans-serif;
  }
  .slide {
    position: relative; width: 1080px; height: 1350px; flex-shrink: 0;
    overflow: hidden; background: #f0e7dc; color: #181717;
    font-family: var(--font-archivo), system-ui, sans-serif;
  }
  .slide * { box-sizing: border-box; }
  .slide-dark { background: #181717; color: #f0e7dc; }
  .accent { position: absolute; top: 0; left: 0; right: 0; height: 16px; z-index: 4; }
  .pad { position: absolute; inset: 0; padding: 92px 88px; display: flex; flex-direction: column; z-index: 3; }
  .grow { flex: 1; }
  .rule { height: 3px; background: #181717; margin: 36px 0 22px; }
  .kick {
    font-family: var(--font-oswald), "Arial Narrow", sans-serif;
    text-transform: uppercase; letter-spacing: 0.24em; font-weight: 500;
    font-size: 24px; margin: 0 0 36px;
  }
  .micro {
    font-family: var(--font-oswald), sans-serif; text-transform: uppercase;
    letter-spacing: 0.16em; font-size: 20px; margin: 0; color: rgba(24,23,23,0.6);
  }
  .payoff {
    font-family: var(--font-oswald), sans-serif; text-transform: uppercase;
    letter-spacing: 0.06em; font-size: 27px; margin: 0;
  }
  .halftone {
    background-image: radial-gradient(currentColor 2px, transparent 2.4px);
    background-size: 22px 22px; color: #181717; display: block;
  }

  /* cover */
  .cover-arch {
    position: absolute; right: -150px; top: 320px; width: 600px; height: 600px;
    border-radius: 600px 600px 0 0; background: #02379c; z-index: 1;
  }
  .cover-collage {
    position: absolute; right: 30px; top: 360px; width: 500px; height: auto;
    filter: grayscale(1) contrast(1.06); transform: rotate(-2deg); z-index: 2;
  }
  .cover-dots {
    position: absolute; right: 96px; top: 268px; width: 150px; height: 95px;
    opacity: 0.5; z-index: 2;
  }
  .cover-title {
    font-family: var(--font-oswald), sans-serif; font-weight: 600;
    text-transform: uppercase; line-height: 0.82; letter-spacing: 0.005em;
    font-size: 130px; margin: 0;
  }
  .cover-sub {
    font-family: var(--font-oswald), sans-serif; font-weight: 500;
    text-transform: uppercase; line-height: 1.05; letter-spacing: 0.02em;
    font-size: 38px; margin: 32px 0 0;
  }
  .cover-week {
    font-family: var(--font-oswald), sans-serif; font-weight: 600;
    text-transform: uppercase; font-size: 60px; line-height: 1; margin: 8px 0 0;
  }
  .cover-hint {
    font-family: var(--font-oswald), sans-serif; text-transform: uppercase;
    letter-spacing: 0.12em; font-size: 22px; margin: 18px 0 0; color: #d4161e;
  }

  /* sign — image band */
  .img-band {
    position: relative; width: 1080px; height: 452px; flex-shrink: 0;
    border-bottom: 3px solid #181717; overflow: hidden; background: #e7dbc8;
  }
  .img-arch {
    position: absolute; right: 175px; top: 20px; width: 430px; height: 430px;
    border-radius: 460px 460px 0 0; opacity: 0.92;
  }
  .sign-img {
    position: absolute; left: 50%; top: 50%;
    transform: translate(-50%, -50%) rotate(-1.5deg);
    width: 430px; height: 430px; object-fit: contain;
    filter: grayscale(1) contrast(1.06); border: 3px solid #181717;
  }

  /* sign — body */
  .sign-body {
    position: absolute; left: 0; right: 0; top: 452px; bottom: 0;
    padding: 52px 88px 74px; display: flex; flex-direction: column;
  }
  .sign-head { display: flex; align-items: baseline; gap: 24px; }
  .sign-name {
    font-family: var(--font-oswald), sans-serif; font-weight: 600;
    text-transform: uppercase; font-size: 64px; line-height: 0.9; letter-spacing: 0.01em;
  }
  .sign-dates {
    font-family: var(--font-oswald), sans-serif; text-transform: uppercase;
    letter-spacing: 0.12em; font-size: 21px; color: rgba(24,23,23,0.55);
  }
  .sign-concept {
    font-family: var(--font-oswald), sans-serif; text-transform: uppercase;
    letter-spacing: 0.08em; font-size: 21px; font-weight: 600; margin: 16px 0 0;
  }
  .sign-title {
    font-family: var(--font-oswald), sans-serif; font-weight: 600;
    text-transform: uppercase; line-height: 0.98; letter-spacing: 0.01em;
    font-size: 52px; margin: 14px 0 20px;
  }
  .sign-text { font-size: 28px; line-height: 1.5; margin: 0; }
  .sign-foot { margin-top: auto; padding-top: 20px; border-top: 3px solid #181717; }
  .sign-foot-value {
    font-family: var(--font-oswald), sans-serif; font-weight: 600;
    text-transform: uppercase; font-size: 29px; line-height: 1.05;
    display: block; margin-top: 4px;
  }

  /* closing */
  .close-title {
    font-family: var(--font-oswald), sans-serif; font-weight: 600;
    text-transform: uppercase; line-height: 0.9; letter-spacing: 0.01em;
    font-size: 112px; margin: 0 0 36px; color: #f0e7dc;
  }
  .close-url {
    font-family: var(--font-oswald), sans-serif; font-weight: 600;
    text-transform: uppercase; font-size: 38px; line-height: 1.1; margin: 0; color: #d4161e;
  }
  .close-logo { width: 200px; height: auto; filter: invert(1); align-self: flex-start; }
  .close-line { font-size: 29px; line-height: 1.5; margin: 0; max-width: 34ch; }
  .close-handle {
    font-family: var(--font-oswald), sans-serif; text-transform: uppercase;
    letter-spacing: 0.12em; font-size: 22px; margin: 22px 0 0; color: rgba(240,231,220,0.7);
  }
  .close-dots {
    position: absolute; right: 80px; top: 440px; width: 200px; height: 240px;
    opacity: 0.4; color: rgba(240,231,220,0.6); z-index: 1;
  }
`;

export default async function CaroselloPage(
  props: PageProps<"/improroscopo/[week]/carosello">,
) {
  const { week } = await props.params;
  const settimana = getSettimana(week);
  if (!settimana) notFound();

  const range = rangeSettimana(week);
  const caption = buildCaption(settimana, range);
  const segni = SEGNI.filter((s) => settimana.segni[s.slug]);

  return (
    <div className="carosello-root" data-week={week}>
      <style>{CSS}</style>

      <CoverSlide range={range} />
      {segni.map((seg, i) => (
        <SignSlide
          key={seg.slug}
          n={i}
          seg={seg}
          previsione={settimana.segni[seg.slug]!}
          week={week}
        />
      ))}
      <ClosingSlide />

      <pre id="caption" className="carosello-caption">
        {caption}
      </pre>
    </div>
  );
}
