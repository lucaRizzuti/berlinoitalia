import { site } from "./site";
import type { Show } from "@/content/_schema";
import type { Evento } from "./eventi";

const ORG_ID = `${site.url}/#organization`;

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "PerformingGroup",
  "@id": ORG_ID,
  name: site.name,
  alternateName: "Berlino Italia",
  url: site.url,
  logo: `${site.url}/brand/logo.png`,
  image: `${site.url}/collage/collage-people.webp`,
  description: site.description,
  foundingDate: "2016",
  email: site.contact.email,
  inLanguage: "it",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Berlin",
    addressCountry: "DE",
  },
  sameAs: [site.social.instagram, site.social.facebook, site.social.youtube],
  memberOf: {
    "@type": "Organization",
    name: "International Theatresports Institute",
  },
};

export const courseLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Corso di Improvvisazione Teatrale in Italiano — Berlino",
  description:
    "Corsi di livello principiante, intermedio e avanzato di improvvisazione teatrale in italiano a Berlino. Lezioni ogni lunedì e sabato.",
  inLanguage: "it",
  provider: { "@id": ORG_ID },
  courseMode: "onsite",
  availableLanguage: "Italian",
  educationalLevel: "Beginner, Intermediate, Advanced",
  offers: {
    "@type": "Offer",
    category: "Drop-in",
    availability: "https://schema.org/InStock",
  },
};

export function showLd(show: Show) {
  return {
    "@context": "https://schema.org",
    "@type": "TheaterEvent",
    name: show.title,
    description: show.seo.description ?? show.tagline,
    inLanguage: show.lingua,
    url: `${site.url}/spettacoli/${show.slug}`,
    image: show.seo.ogImage
      ? `${site.url}${show.seo.ogImage}`
      : show.hero
        ? `${site.url}${show.hero}`
        : undefined,
    organizer: { "@id": ORG_ID },
    performer: { "@id": ORG_ID },
    eventSchedule: {
      "@type": "Schedule",
      repeatFrequency: "P1M",
      byDay: "https://schema.org/Sunday",
    },
    location: {
      "@type": "Place",
      name: site.venues.acud.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Veteranenstraße 21",
        addressLocality: "Berlin",
        postalCode: "10119",
        addressCountry: "DE",
      },
    },
  };
}

export function eventLd(e: Evento) {
  return {
    "@context": "https://schema.org",
    "@type": "TheaterEvent",
    name: e.title,
    startDate: e.start.toISOString(),
    ...(e.end ? { endDate: e.end.toISOString() } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    organizer: { "@id": ORG_ID },
    ...(e.location
      ? { location: { "@type": "Place", name: e.location, address: e.location } }
      : {}),
    ...(e.url ? { url: e.url, offers: { "@type": "Offer", url: e.url } } : {}),
  };
}

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.url}`,
    })),
  };
}
