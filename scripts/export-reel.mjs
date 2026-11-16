// Esporta il reel Facebook dell'ImprOroscopo come MP4 verticale 1080x1920.
//
// Uso:
//   1. avvia il sito:      npm run dev
//   2. in un altro tab:    npm run reel              (settimana corrente)
//                          npm run reel 2026-11-23   (settimana specifica)
//
// Output: out/improroscopo/<settimana>/reel/
//           frames/01-cover.png … 14-fine.png
//           reel.mp4
//           caption.txt
//
// Serve ffmpeg (brew install ffmpeg). Il video è senza audio: la musica si
// aggiunge da Facebook al momento della pubblicazione.
//
// Variabili d'ambiente opzionali:
//   BASE_URL   (default http://localhost:3000)

import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const weekArg = process.argv[2];

// Durata di ogni fotogramma in secondi, e della dissolvenza tra uno e l'altro.
const DURATA_COVER = 3;
const DURATA_SEGNO = 3.5;
const DURATA_FINE = 4.5;
const DISSOLVENZA = 0.4;
const FPS = 30;

const target = weekArg
  ? `${BASE_URL}/improroscopo/${weekArg}/reel`
  : `${BASE_URL}/improroscopo/reel`;

function durataDi(name) {
  if (name.endsWith("-cover")) return DURATA_COVER;
  if (name.endsWith("-fine")) return DURATA_FINE;
  return DURATA_SEGNO;
}

function montaVideo(frames, outFile) {
  const args = ["-y", "-loglevel", "error"];
  const durate = frames.map((f) => durataDi(path.basename(f, ".png")));
  frames.forEach((f, i) => {
    args.push("-loop", "1", "-t", String(durate[i]), "-i", f);
  });

  // Ogni ingresso a 30 fps, poi una catena di dissolvenze: ogni xfade parte
  // DISSOLVENZA secondi prima della fine di quanto montato finora.
  const filtri = frames.map(
    (_, i) => `[${i}:v]fps=${FPS},scale=1080:1920,setsar=1,format=yuv420p[s${i}]`,
  );
  let prec = "s0";
  let lunghezza = durate[0];
  for (let i = 1; i < frames.length; i++) {
    const out = i === frames.length - 1 ? "out" : `x${i}`;
    const offset = (lunghezza - DISSOLVENZA).toFixed(3);
    filtri.push(
      `[${prec}][s${i}]xfade=transition=fade:duration=${DISSOLVENZA}:offset=${offset}[${out}]`,
    );
    lunghezza += durate[i] - DISSOLVENZA;
    prec = out;
  }

  args.push(
    "-filter_complex", filtri.join(";"),
    "-map", "[out]",
    "-c:v", "libx264", "-preset", "slow", "-crf", "18",
    "-pix_fmt", "yuv420p", "-r", String(FPS),
    "-movflags", "+faststart",
    outFile,
  );
  execFileSync("ffmpeg", args, { stdio: "inherit" });
  return lunghezza;
}

async function main() {
  try {
    execFileSync("ffmpeg", ["-version"], { stdio: "ignore" });
  } catch {
    console.error('\n✗ ffmpeg non trovato. Installalo con "brew install ffmpeg".\n');
    process.exit(1);
  }
  try {
    await fetch(BASE_URL);
  } catch {
    console.error(`\n✗ ${BASE_URL} non risponde. Avvia prima il sito con "npm run dev".\n`);
    process.exit(1);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });

  await page.goto(target, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: "nextjs-portal{display:none!important}" });
  await page.evaluate(() => document.fonts.ready);

  const week = await page.getAttribute(".reel-root", "data-week");
  if (!week) {
    console.error("✗ Pagina reel non trovata a", target);
    await browser.close();
    process.exit(1);
  }

  const outDir = path.join("out", "improroscopo", week, "reel");
  const framesDir = path.join(outDir, "frames");
  fs.rmSync(framesDir, { recursive: true, force: true });
  fs.mkdirSync(framesDir, { recursive: true });

  const nodes = page.locator("[data-frame]");
  const count = await nodes.count();
  const frames = [];
  for (let i = 0; i < count; i++) {
    const node = nodes.nth(i);
    const name = await node.getAttribute("data-frame");
    const file = path.join(framesDir, `${name}.png`);
    await node.scrollIntoViewIfNeeded();
    await node.screenshot({ path: file });
    frames.push(file);
    console.log("→", `frames/${name}.png`);
  }

  const caption = (await page.locator("#caption").textContent())?.trim() ?? "";
  fs.writeFileSync(path.join(outDir, "caption.txt"), caption + "\n");
  console.log("→ caption.txt");

  await browser.close();

  console.log("→ montaggio reel.mp4 …");
  const secondi = montaVideo(frames, path.join(outDir, "reel.mp4"));
  console.log(`\n✓ reel.mp4 (${secondi.toFixed(1)} s) + caption in ${outDir}\n`);
}

main();
