import ical, { type CalendarResponse } from "node-ical";
import { cache } from "react";

export type EventoTipo = "lezione" | "spettacolo";

export type Evento = {
  id: string;
  tipo: EventoTipo;
  /** Solo se non è in italiano (la lingua normale): es. "In inglese". */
  lingua: string | null;
  start: Date;
  end: Date | null;
  title: string;
  location: string | null;
  url: string | null;
  description: string | null;
};

const ICS_URL = "https://www.yesticket.org/ical/berlino-italia-improv.ics";
const RSS_URL = "https://www.yesticket.org/rss/berlino-italia-improv.xml";

function cleanTitle(s: string) {
  return s
    .replace(/\s*\(Berlino Italia Improv\)\s*$/i, "")
    .replace(/\\,/g, ",")
    .trim();
}

/**
 * L'iCal non riporta la categoria YesTicket, l'RSS sì, dentro il titolo:
 * "07.11.2026 14:00 Uhr Workshop: Lezione di Improvvisazione ...".
 * Restituisce la categoria per URL dell'evento (vuota se il feed non risponde).
 */
const getCategorie = cache(async (): Promise<Map<string, string>> => {
  const categorie = new Map<string, string>();
  try {
    const res = await fetch(RSS_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return categorie;
    const xml = await res.text();
    for (const [, item] of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
      const categoria = item.match(/<title>.*?Uhr\s+([^:<]+):/)?.[1];
      const url = item.match(/<link>\s*(.*?)\s*<\/link>/)?.[1];
      if (categoria && url) categorie.set(url, categoria.trim().toLowerCase());
    }
  } catch {
    // Senza categorie si ripiega sul titolo, vedi tipoEvento.
  }
  return categorie;
});

function tipoEvento(categoria: string | undefined, title: string): EventoTipo {
  if (categoria === "workshop") return "lezione";
  if (categoria) return "spettacolo";
  return /lezion|workshop/i.test(title) ? "lezione" : "spettacolo";
}

/** YesTicket non ha un campo lingua: si riconosce da titolo e descrizione. */
function linguaEvento(title: string, description: string | null): string | null {
  if (/babel/i.test(title)) return "Multilingua";
  return /\bin (english|inglese)\b/i.test(`${title} ${description ?? ""}`)
    ? "In inglese"
    : null;
}

/** Legge il feed iCal di YesTicket e restituisce gli eventi futuri, ordinati. */
export const getEventi = cache(async (): Promise<Evento[]> => {
  const categorie = await getCategorie();

  let text: string;
  try {
    const res = await fetch(ICS_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    text = await res.text();
  } catch {
    return [];
  }

  let data: CalendarResponse;
  try {
    data = ical.parseICS(text);
  } catch {
    return [];
  }

  const cutoff = Date.now() - 6 * 60 * 60 * 1000;
  const eventi: Evento[] = [];

  for (const key of Object.keys(data)) {
    const comp = data[key] as { type?: string } | undefined;
    if (!comp || comp.type !== "VEVENT") continue;
    const v = comp as {
      uid?: string;
      start?: string | Date;
      end?: string | Date;
      summary?: unknown;
      location?: unknown;
      description?: unknown;
      url?: unknown;
    };
    if (!v.start) continue;
    const start = new Date(v.start);
    if (Number.isNaN(start.getTime()) || start.getTime() < cutoff) continue;

    const rawUrl = v.url;
    const url =
      typeof rawUrl === "string"
        ? rawUrl
        : rawUrl && typeof rawUrl === "object" && "val" in rawUrl
          ? String((rawUrl as { val: unknown }).val)
          : null;

    const title = cleanTitle(String(v.summary ?? ""));
    const description = v.description
      ? String(v.description).replace(/\\n/g, "\n").trim()
      : null;

    eventi.push({
      id: String(v.uid ?? key),
      tipo: tipoEvento(url ? categorie.get(url) : undefined, title),
      lingua: linguaEvento(title, description),
      start,
      end: v.end ? new Date(v.end) : null,
      title,
      location: v.location ? String(v.location).replace(/\\,/g, ",").trim() : null,
      url,
      description,
    });
  }

  return eventi.sort((a, b) => a.start.getTime() - b.start.getTime());
});

export async function getLezioni(): Promise<Evento[]> {
  return (await getEventi()).filter((e) => e.tipo === "lezione");
}

export async function getSpettacoli(): Promise<Evento[]> {
  return (await getEventi()).filter((e) => e.tipo === "spettacolo");
}

/** Spettacoli il cui titolo contiene una delle parole chiave del format. */
export async function getEventiForShow(keywords: string[]): Promise<Evento[]> {
  if (!keywords || keywords.length === 0) return [];
  const all = await getSpettacoli();
  const kw = keywords.map((k) => k.toLowerCase());
  return all.filter((e) => {
    const t = e.title.toLowerCase();
    return kw.some((k) => t.includes(k));
  });
}
