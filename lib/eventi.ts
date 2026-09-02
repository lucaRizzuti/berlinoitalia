import ical, { type CalendarResponse } from "node-ical";
import { cache } from "react";

export type Evento = {
  id: string;
  start: Date;
  end: Date | null;
  title: string;
  location: string | null;
  url: string | null;
  description: string | null;
};

const ICS_URL = "https://www.yesticket.org/ical/berlino-italia-improv.ics";

function cleanTitle(s: string) {
  return s
    .replace(/\s*\(Berlino Italia Improv\)\s*$/i, "")
    .replace(/\\,/g, ",")
    .trim();
}

/** Legge il feed iCal di YesTicket e restituisce gli eventi futuri, ordinati. */
export const getEventi = cache(async (): Promise<Evento[]> => {
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

    eventi.push({
      id: String(v.uid ?? key),
      start,
      end: v.end ? new Date(v.end) : null,
      title: cleanTitle(String(v.summary ?? "")),
      location: v.location ? String(v.location).replace(/\\,/g, ",").trim() : null,
      url,
      description: v.description ? String(v.description).replace(/\\n/g, "\n").trim() : null,
    });
  }

  return eventi.sort((a, b) => a.start.getTime() - b.start.getTime());
});

/** Eventi il cui titolo contiene una delle parole chiave del format. */
export async function getEventiForShow(keywords: string[]): Promise<Evento[]> {
  if (!keywords || keywords.length === 0) return [];
  const all = await getEventi();
  const kw = keywords.map((k) => k.toLowerCase());
  return all.filter((e) => {
    const t = e.title.toLowerCase();
    return kw.some((k) => t.includes(k));
  });
}
