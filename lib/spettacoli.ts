import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import { showFrontmatter, type Show } from "@/content/_schema";

const DIR = path.join(process.cwd(), "content", "spettacoli");

/** Legge, valida e ordina tutti gli spettacoli pubblicati. */
export const getShows = cache((): Show[] => {
  const files = fs.existsSync(DIR)
    ? fs.readdirSync(DIR).filter((f) => f.endsWith(".md"))
    : [];

  const shows = files.map((file) => {
    const raw = fs.readFileSync(path.join(DIR, file), "utf8");
    const { data, content } = matter(raw);
    const parsed = showFrontmatter.safeParse(data);
    if (!parsed.success) {
      throw new Error(
        `Frontmatter non valido in content/spettacoli/${file}:\n${parsed.error.toString()}`,
      );
    }
    return { ...parsed.data, body: content.trim() } satisfies Show;
  });

  return shows
    .filter((s) => s.published)
    .sort((a, b) => a.order - b.order);
});

export const getShow = cache((slug: string): Show | undefined =>
  getShows().find((s) => s.slug === slug),
);

/** Solo gli spettacoli che hanno una scheda dedicata (niente `external`). */
export const getShowSlugs = cache((): string[] =>
  getShows()
    .filter((s) => !s.external)
    .map((s) => s.slug),
);
