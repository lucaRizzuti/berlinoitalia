import { z } from "zod";

/** Schema di uno spettacolo (frontmatter di content/spettacoli/*.md). */
export const showFrontmatter = z.object({
  title: z.string(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  order: z.number().int(),
  published: z.boolean().default(true),
  tagline: z.string(),
  lingua: z.array(z.enum(["it", "en", "de", "es", "fr"])).min(1),
  durata: z.string().optional(),
  pubblico: z.string().optional(),
  hero: z.string().optional(),
  gallery: z.array(z.string()).default([]),
  video: z.string().url().optional(),
  /** Aggancio per il blocco "prossime date" (integrazione YesTicket nativa). */
  yesticket: z
    .object({ productId: z.string().nullable().default(null) })
    .default({ productId: null }),
  /** Pagina propria per i format speciali: es. "/rodari". Altrimenti null. */
  external: z.string().nullable().default(null),
  seo: z
    .object({
      description: z.string().optional(),
      ogImage: z.string().optional(),
    })
    .default({}),
});

export type ShowFrontmatter = z.infer<typeof showFrontmatter>;
export type Show = ShowFrontmatter & { body: string };
