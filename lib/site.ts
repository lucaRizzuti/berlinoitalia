/**
 * Configurazione centrale del sito.
 * Contatti e sedi vanno confermati con Luca prima del go-live.
 */

export const site = {
  name: "Berlino Italia Improv",
  url: "https://berlinoitalia.com",
  description:
    "Scuola di improvvisazione teatrale in italiano a Berlino. Corsi per adulti e bambini, workshop e spettacoli dal vivo ogni mese. Membri dell'International Theatresports Institute dal 2017.",
  locale: "it_IT",
  payoff: "Improvvisazione · Teatro · Gioco · Ascolto · Presenza",

  contact: {
    email: "berlinoitaliaimprov@gmail.com",
    whatsapp: "+49 163 9192451",
    whatsappUrl:
      "https://wa.me/491639192451?text=Ciao%2C%20vorrei%20ricevere%20informazioni",
  },

  social: {
    instagram: "https://www.instagram.com/berlinoitalia",
    facebook: "https://www.facebook.com/berlino.italia",
    youtube: "https://www.youtube.com/@berlinoitaliaimprov1498",
  },

  /** Modulo iscrizione newsletter ospitato su Brevo (sibforms). */
  newsletterUrl:
    "https://02687b9c.sibforms.com/serve/MUIFAAhV0wtuvDMkmpN-C76LM3on07c-jvz780iiyotdFkpj-cik33b90-WEVckb9QXleSzFEqFUlhKm7Y6S7j5FYnL3ob3khgWOTs1SeihYaLGEFMsXbdjEFnEum1Q7bmBVWt7C1PMgwhMVSZBY0UZvzxNQd_5BqnTCwGhuCc-ObJmzliFsSZyiwxZuMh7cEffiMWmAx5GugNzlSg==",

  venues: {
    acud: {
      name: "Teatro Acud",
      address: "Veteranenstraße 21, 10119 Berlin",
    },
    corsiLun: {
      name: "HOTEL CONTINENTAL Art Space in Exile",
      address: "Elsenstraße 87, 12435 Berlin",
    },
    corsiSab: {
      name: "TheaterHaus Mitte",
      address: "Wallstraße 32, 10179 Berlin",
    },
  },

  /** Organizzatore YesTicket (per l'integrazione eventi) */
  yesticket: {
    organizerId: 1033,
  },
} as const;

export type NavItem = { label: string; href: string; accent?: "rosso" | "blu" | "verde" };

export const nav: NavItem[] = [
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "Corsi", href: "/corsi", accent: "blu" },
  { label: "Spettacoli", href: "/spettacoli", accent: "rosso" },
  { label: "Eventi", href: "/eventi", accent: "verde" },
  { label: "Video", href: "/video", accent: "rosso" },
  { label: "Rodari", href: "/rodari" },
  { label: "Gutschein", href: "/gutschein" },
  { label: "Contatti", href: "/contatti" },
];
