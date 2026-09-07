// Esporta il carosello Instagram dell'ImprOroscopo come PNG 1080x1350.
//
// Uso:
//   1. avvia il sito:      npm run dev
//   2. in un altro tab:    npm run carosello            (settimana corrente)
//                          npm run carosello 2026-09-14  (settimana specifica)
//
// Output: out/improroscopo/<settimana>/01-cover.png … 14-fine.png + caption.txt
//
// Variabili d'ambiente opzionali:
//   BASE_URL   (default http://localhost:3000)
//   SCALE      fattore di scala del PNG (default 2 → 2160x2700)

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const SCALE = Number(process.env.SCALE ?? 2);
const weekArg = process.argv[2];

const target = weekArg
  ? `${BASE_URL}/improroscopo/${weekArg}/carosello`
  : `${BASE_URL}/improroscopo/carosello`;

async function main() {
  try {
    await fetch(BASE_URL);
  } catch {
    console.error(`\n✗ ${BASE_URL} non risponde. Avvia prima il sito con "npm run dev".\n`);
    process.exit(1);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1350 },
    deviceScaleFactor: SCALE,
  });

  await page.goto(target, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: "nextjs-portal{display:none!important}" });
  await page.evaluate(() => document.fonts.ready);

  const week = await page.getAttribute(".carosello-root", "data-week");
  if (!week) {
    console.error("✗ Pagina carosello non trovata a", target);
    await browser.close();
    process.exit(1);
  }

  const outDir = path.join("out", "improroscopo", week);
  fs.mkdirSync(outDir, { recursive: true });

  const slides = page.locator("[data-slide]");
  const count = await slides.count();
  for (let i = 0; i < count; i++) {
    const slide = slides.nth(i);
    const name = await slide.getAttribute("data-slide");
    await slide.scrollIntoViewIfNeeded();
    await slide.screenshot({ path: path.join(outDir, `${name}.png`) });
    console.log("→", `${name}.png`);
  }

  const caption = (await page.locator("#caption").textContent())?.trim() ?? "";
  fs.writeFileSync(path.join(outDir, "caption.txt"), caption + "\n");
  console.log("→ caption.txt");

  await browser.close();
  console.log(`\n✓ ${count} slide + caption in ${outDir}  (scala ${SCALE}x)\n`);
}

main();
