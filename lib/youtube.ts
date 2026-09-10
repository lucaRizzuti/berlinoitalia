import { cache } from "react";

export type Video = {
  id: string;
  title: string;
  description: string | null;
  published: Date;
  thumb: string;
  url: string;
};

/** Playlist "Berlino Italia" sul canale YouTube. */
const PLAYLIST_ID = "PL9J6fNfUQzRCtzecA_Av83qG78jYRxLid";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`;

function decodeXml(s: string) {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}

function pick(block: string, tag: string) {
  const m = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return m ? decodeXml(m[1]) : null;
}

/**
 * Legge il feed Atom pubblico della playlist YouTube (nessuna API key) e
 * restituisce i video nell'ordine della playlist. Il feed espone i 15 più recenti.
 */
export const getVideos = cache(async (): Promise<Video[]> => {
  let xml: string;
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 21600 } });
    if (!res.ok) return [];
    xml = await res.text();
  } catch {
    return [];
  }

  const videos: Video[] = [];
  for (const entry of xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? []) {
    const id = pick(entry, "yt:videoId");
    if (!id) continue;
    const published = pick(entry, "published");
    videos.push({
      id,
      title: pick(entry, "title") ?? "",
      description: entry.match(/<media:description>([\s\S]*?)<\/media:description>/)
        ? decodeXml(entry.match(/<media:description>([\s\S]*?)<\/media:description>/)![1])
        : null,
      published: published ? new Date(published) : new Date(0),
      thumb: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      url: `https://www.youtube.com/watch?v=${id}`,
    });
  }
  return videos;
});
