import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SEGNI,
  ELEMENTO_COLORE,
  getSettimane,
  getSettimana,
  rangeSettimana,
  concettoDi,
  captionSettimana,
  type Previsione,
  type Segno,
} from "@/lib/improroscopo";

export const dynamicParams = false;

export const metadata: Metadata = {
  title: "ImprOroscopo · reel",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return getSettimane().map((w) => ({ week: w.start }));
}

// Fotogrammi verticali 1080x1920 per il reel Facebook. Lo script
// scripts/export-reel.mjs li fotografa e li monta con ffmpeg.
// Il contenuto importante sta tra y=180 e y=1560: sopra e sotto Facebook
// sovrappone la sua interfaccia (nome pagina, caption, pulsanti).

function CoverFrame({ range }: { range: string }) {
  return (
    <div className="frame frame-cover" data-frame="01-cover">
      <div className="cover-box">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="cover-base" src="/carosello/cover-base.webp" alt="" />
        <div className="cover-footer">
          <p className="cover-footer-kick">Settimana del</p>
          <p className="cover-footer-date">{range}</p>
          <div className="cover-footer-rule" />
          <p className="cover-footer-payoff">Fare teatro senza prendersi troppo sul serio</p>
          <p className="cover-footer-hint">12 segni · 12 personaggi</p>
        </div>
      </div>
    </div>
  );
}

function SignFrame({
  n,
  seg,
  previsione,
  week,
  range,
}: {
  n: number;
  seg: Segno;
  previsione: Previsione;
  week: string;
  range: string;
}) {
  const colore = ELEMENTO_COLORE[seg.elemento];
  return (
    <div className="frame" data-frame={`${String(n + 2).padStart(2, "0")}-${seg.slug}`}>
      <span className="accent" style={{ background: colore }} />
      <p className="frame-kick">ImprOroscopo · {range}</p>
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
          Questa settimana · {concettoDi(week, seg.slug)}
        </p>
        <h2 className="sign-title">{previsione.titolo}</h2>
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

function ClosingFrame() {
  return (
    <div className="frame frame-dark" data-frame="14-fine">
      <span className="accent" style={{ background: "#d4161e" }} />
      <div className="close-body">
        <p className="frame-kick" style={{ color: "rgba(240,231,220,0.55)" }}>
          Berlino Italia Improv
        </p>
        <h2 className="close-title">
          Il tuo segno,
          <br />
          per intero
        </h2>
        <p className="close-url">berlinoitalia.com/improroscopo</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="close-logo" src="/brand/logo.webp" alt="Berlino Italia Improv" />
        <div className="close-rule" />
        <p className="close-line">
          Corsi di improvvisazione in italiano a Berlino, ogni lunedì e sabato. Vieni
          anche a una sola lezione.
        </p>
      </div>
    </div>
  );
}

const CSS = `
  header, footer, a[aria-label="Scrivici su WhatsApp"], .u-grain, nextjs-portal {
    display: none !important;
  }
  body { background: #2b2b2b; }
  .reel-root {
    display: flex; flex-direction: column; align-items: center;
    gap: 40px; padding: 40px 16px 80px;
  }
  .reel-caption {
    width: 1080px; max-width: 100%; white-space: pre-wrap;
    background: #f4eee3; color: #181717; border: 2px solid #181717;
    padding: 28px; font: 15px/1.6 var(--font-archivo), system-ui, sans-serif;
  }
  .frame {
    position: relative; width: 1080px; height: 1920px; flex-shrink: 0;
    overflow: hidden; background: #f0e7dc; color: #181717;
    font-family: var(--font-archivo), system-ui, sans-serif;
  }
  .frame * { box-sizing: border-box; }
  .frame-dark { background: #181717; color: #f0e7dc; }
  .accent { position: absolute; top: 0; left: 0; right: 0; height: 16px; z-index: 4; }
  .frame-kick {
    position: absolute; left: 88px; right: 88px; top: 150px; margin: 0;
    font-family: var(--font-oswald), "Arial Narrow", sans-serif;
    text-transform: uppercase; letter-spacing: 0.2em; font-weight: 500;
    font-size: 26px; color: rgba(24,23,23,0.6);
  }
  .micro {
    font-family: var(--font-oswald), sans-serif; text-transform: uppercase;
    letter-spacing: 0.16em; font-size: 24px; margin: 0; color: rgba(24,23,23,0.6);
  }

  /* cover: l'immagine fissa del carosello, centrata in verticale */
  .frame-cover { background: #efe5d8; }
  .cover-box { position: absolute; left: 0; top: 285px; width: 1080px; height: 1350px; }
  .cover-base { position: absolute; inset: 0; width: 1080px; height: 1350px; }
  .cover-footer { position: absolute; left: 80px; top: 1038px; right: 80px; }
  .cover-footer-kick {
    font-family: var(--font-oswald), sans-serif; text-transform: uppercase;
    letter-spacing: 0.16em; font-size: 20px; margin: 0; color: rgba(24,23,23,0.6);
  }
  .cover-footer-date {
    font-family: var(--font-oswald), sans-serif; font-weight: 600;
    text-transform: uppercase; font-size: 64px; line-height: 1; letter-spacing: 0.005em;
    margin: 6px 0 0; color: #181717; white-space: nowrap;
  }
  .cover-footer-rule { height: 3px; background: #181717; margin: 26px 0 22px; }
  .cover-footer-payoff {
    font-family: var(--font-oswald), sans-serif; text-transform: uppercase;
    letter-spacing: 0.02em; font-size: 30px; line-height: 1.2; margin: 0; color: #181717;
  }
  .cover-footer-hint {
    font-family: var(--font-oswald), sans-serif; text-transform: uppercase;
    letter-spacing: 0.12em; font-size: 22px; margin: 18px 0 0; color: #d4161e;
  }

  /* segno */
  .img-band {
    position: absolute; left: 0; top: 220px; width: 1080px; height: 680px;
    border-top: 3px solid #181717; border-bottom: 3px solid #181717;
    overflow: hidden; background: #e7dbc8;
  }
  .img-arch {
    position: absolute; right: 130px; top: 40px; width: 560px; height: 640px;
    border-radius: 560px 560px 0 0; opacity: 0.92;
  }
  .sign-img {
    position: absolute; left: 50%; top: 50%;
    transform: translate(-50%, -50%) rotate(-1.5deg);
    width: 560px; height: 560px; object-fit: contain;
    filter: grayscale(1) contrast(1.06); border: 3px solid #181717;
  }
  .sign-body {
    position: absolute; left: 88px; right: 88px; top: 960px; height: 600px;
    display: flex; flex-direction: column;
  }
  .sign-head { display: flex; align-items: baseline; gap: 24px; }
  .sign-name {
    font-family: var(--font-oswald), sans-serif; font-weight: 600;
    text-transform: uppercase; font-size: 104px; line-height: 0.9; letter-spacing: 0.01em;
  }
  .sign-dates {
    font-family: var(--font-oswald), sans-serif; text-transform: uppercase;
    letter-spacing: 0.12em; font-size: 26px; color: rgba(24,23,23,0.55);
  }
  .sign-concept {
    font-family: var(--font-oswald), sans-serif; text-transform: uppercase;
    letter-spacing: 0.08em; font-size: 28px; font-weight: 600; margin: 22px 0 0;
  }
  .sign-title {
    font-family: var(--font-oswald), sans-serif; font-weight: 600;
    text-transform: uppercase; line-height: 1; letter-spacing: 0.01em;
    font-size: 66px; margin: 20px 0 0;
  }
  .sign-foot { margin-top: 64px; padding-top: 22px; border-top: 3px solid #181717; }
  .sign-foot-value {
    font-family: var(--font-oswald), sans-serif; font-weight: 600;
    text-transform: uppercase; font-size: 42px; line-height: 1.05;
    display: block; margin-top: 6px;
  }

  /* chiusura */
  .close-body {
    position: absolute; left: 88px; right: 88px; top: 0; bottom: 0;
    display: flex; flex-direction: column; justify-content: center;
    padding: 180px 0 360px;
  }
  .close-body .frame-kick { position: static; margin: 0 0 40px; }
  .close-title {
    font-family: var(--font-oswald), sans-serif; font-weight: 600;
    text-transform: uppercase; line-height: 0.9; letter-spacing: 0.01em;
    font-size: 132px; margin: 0 0 40px; color: #f0e7dc;
  }
  .close-url {
    font-family: var(--font-oswald), sans-serif; font-weight: 600;
    text-transform: uppercase; font-size: 46px; line-height: 1.1; margin: 0; color: #d4161e;
  }
  .close-logo { width: 220px; height: auto; filter: invert(1); margin: 80px 0 0; }
  .close-rule { height: 3px; background: rgba(240,231,220,0.35); margin: 60px 0 28px; }
  .close-line { font-size: 32px; line-height: 1.5; margin: 0; max-width: 34ch; }
`;

export default async function ReelPage(props: PageProps<"/improroscopo/[week]/reel">) {
  const { week } = await props.params;
  const settimana = getSettimana(week);
  if (!settimana) notFound();

  const range = rangeSettimana(week);
  const segni = SEGNI.filter((s) => settimana.segni[s.slug]);

  return (
    <div className="reel-root" data-week={week}>
      <style>{CSS}</style>

      <CoverFrame range={range} />
      {segni.map((seg, i) => (
        <SignFrame
          key={seg.slug}
          n={i}
          seg={seg}
          previsione={settimana.segni[seg.slug]!}
          week={week}
          range={range}
        />
      ))}
      <ClosingFrame />

      <pre id="caption" className="reel-caption">
        {captionSettimana(settimana, { linkInBio: false })}
      </pre>
    </div>
  );
}
