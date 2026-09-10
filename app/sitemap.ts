import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getShows } from "@/lib/spettacoli";
import { getCoppie } from "@/lib/improroscopo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/chi-siamo",
    "/corsi",
    "/spettacoli",
    "/eventi",
    "/video",
    "/improroscopo",
    "/rodari",
    "/gutschein",
    "/contatti",
  ];

  const shows = getShows()
    .filter((s) => !s.external)
    .map((s) => `/spettacoli/${s.slug}`);

  const now = new Date();

  const base: MetadataRoute.Sitemap = [...routes, ...shows].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const oroscopo: MetadataRoute.Sitemap = getCoppie().map(({ week, segno }) => ({
    url: `${site.url}/improroscopo/${week}/${segno}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.4,
  }));

  return [...base, ...oroscopo];
}
