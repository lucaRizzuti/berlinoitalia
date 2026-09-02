import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getShows } from "@/lib/spettacoli";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/chi-siamo",
    "/corsi",
    "/spettacoli",
    "/eventi",
    "/rodari",
    "/gutschein",
    "/contatti",
  ];

  const shows = getShows()
    .filter((s) => !s.external)
    .map((s) => `/spettacoli/${s.slug}`);

  const now = new Date();

  return [...routes, ...shows].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
