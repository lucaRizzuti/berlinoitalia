import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { z } from "zod";

/** I dodici segni, in ordine zodiacale. Lo slug è anche il nome del file immagine. */
export const SEGNI = [
  { slug: "ariete", nome: "Ariete", periodo: "21 mar – 19 apr", elemento: "Fuoco" },
  { slug: "toro", nome: "Toro", periodo: "20 apr – 20 mag", elemento: "Terra" },
  { slug: "gemelli", nome: "Gemelli", periodo: "21 mag – 20 giu", elemento: "Aria" },
  { slug: "cancro", nome: "Cancro", periodo: "21 giu – 22 lug", elemento: "Acqua" },
  { slug: "leone", nome: "Leone", periodo: "23 lug – 22 ago", elemento: "Fuoco" },
  { slug: "vergine", nome: "Vergine", periodo: "23 ago – 22 set", elemento: "Terra" },
  { slug: "bilancia", nome: "Bilancia", periodo: "23 set – 22 ott", elemento: "Aria" },
  { slug: "scorpione", nome: "Scorpione", periodo: "23 ott – 21 nov", elemento: "Acqua" },
  { slug: "sagittario", nome: "Sagittario", periodo: "22 nov – 21 dic", elemento: "Fuoco" },
  { slug: "capricorno", nome: "Capricorno", periodo: "22 dic – 19 gen", elemento: "Terra" },
  { slug: "acquario", nome: "Acquario", periodo: "20 gen – 18 feb", elemento: "Aria" },
  { slug: "pesci", nome: "Pesci", periodo: "19 feb – 20 mar", elemento: "Acqua" },
] as const;

export type Segno = (typeof SEGNI)[number];
export type SegnoSlug = Segno["slug"];

export const SEGNO_BY_SLUG = Object.fromEntries(
  SEGNI.map((s) => [s.slug, s]),
) as Record<SegnoSlug, Segno>;

/** I dodici concetti di improvvisazione, nell'ordine della rotazione settimanale. */
export const CONCETTI = [
  "ascolto",
  "presenza",
  "dire di sì",
  "fallire con gioia",
  "il gruppo prima dell'ego",
  "il corpo",
  "il silenzio",
  "il ritmo",
  "il rischio",
  "il gioco",
  "l'empatia",
  "lo spazio vuoto",
] as const;

/** Lunedì della settimana 0 della rotazione (2026-09-07). */
const SETTIMANA_ZERO = Date.UTC(2026, 8, 7);

/**
 * Il concetto di improvvisazione assegnato a un segno in una data settimana.
 * Rotazione: `CONCETTI[(indiceSegno + indiceSettimana) % 12]`, con l'indice
 * settimana contato dal 2026-09-07. Coerente con i testi in content/improroscopo.
 */
export function concettoDi(weekStart: string, segno: SegnoSlug): string {
  const w = Math.round(
    (Date.parse(`${weekStart}T00:00:00Z`) - SETTIMANA_ZERO) / (7 * 86_400_000),
  );
  const s = SEGNI.findIndex((x) => x.slug === segno);
  return CONCETTI[(((s + w) % 12) + 12) % 12];
}

const previsione = z.object({
  titolo: z.string().min(1),
  testo: z.string().min(1),
  personaggio: z.string().min(1),
});

const settimana = z.object({
  start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  segni: z.record(z.string(), previsione),
});

const fileSchema = z.object({ weeks: z.array(settimana) });

export type Previsione = z.infer<typeof previsione>;
export type Settimana = z.infer<typeof settimana>;

const DIR = path.join(process.cwd(), "content", "improroscopo");

/** Legge e valida tutti i file annuali, restituendo le settimane ordinate per data. */
export const getSettimane = cache((): Settimana[] => {
  const files = fs.existsSync(DIR)
    ? fs.readdirSync(DIR).filter((f) => f.endsWith(".json"))
    : [];

  const weeks: Settimana[] = [];
  for (const f of files) {
    const parsed = fileSchema.safeParse(
      JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")),
    );
    if (!parsed.success) {
      throw new Error(`content/improroscopo/${f} non valido:\n${parsed.error}`);
    }
    weeks.push(...parsed.data.weeks);
  }
  return weeks.sort((a, b) => a.start.localeCompare(b.start));
});

export const getSettimana = cache((start: string): Settimana | undefined =>
  getSettimane().find((w) => w.start === start),
);

/** Tutte le coppie settimana/segno effettivamente scritte (per generateStaticParams). */
export const getCoppie = cache((): { week: string; segno: SegnoSlug }[] =>
  getSettimane().flatMap((w) =>
    SEGNI.filter((s) => w.segni[s.slug]).map((s) => ({ week: w.start, segno: s.slug })),
  ),
);

/** Il lunedì (in UTC) della settimana che contiene `d`, come stringa YYYY-MM-DD. */
export function lunediDi(d: Date): string {
  const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const dow = (t.getUTCDay() + 6) % 7; // 0 = lunedì
  t.setUTCDate(t.getUTCDate() - dow);
  return t.toISOString().slice(0, 10);
}

/**
 * La settimana da mostrare oggi: quella corrente se pubblicata, altrimenti
 * l'ultima già uscita, altrimenti la prima in assoluto.
 */
export function settimanaCorrente(now = new Date()): Settimana | undefined {
  const weeks = getSettimane();
  if (weeks.length === 0) return undefined;
  const key = lunediDi(now);
  return (
    weeks.find((w) => w.start === key) ??
    [...weeks].reverse().find((w) => w.start <= key) ??
    weeks[0]
  );
}

const fmtGiorno = new Intl.DateTimeFormat("it-IT", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
});
const fmtGiornoAnno = new Intl.DateTimeFormat("it-IT", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const fmtGiornoNum = new Intl.DateTimeFormat("it-IT", { day: "numeric", timeZone: "UTC" });

/** "8–14 settembre 2026" (stesso mese) oppure "29 settembre – 5 ottobre 2026". */
export function rangeSettimana(start: string): string {
  const a = new Date(`${start}T00:00:00Z`);
  const b = new Date(a);
  b.setUTCDate(b.getUTCDate() + 6);
  return a.getUTCMonth() === b.getUTCMonth()
    ? `${fmtGiornoNum.format(a)}–${fmtGiornoAnno.format(b)}`
    : `${fmtGiorno.format(a)} – ${fmtGiornoAnno.format(b)}`;
}
