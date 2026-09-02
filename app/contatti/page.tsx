import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Come raggiungere Berlino Italia Improv: email, WhatsApp, Instagram, Facebook, YouTube e newsletter.",
  alternates: { canonical: "/contatti" },
};

const cards = [
  { label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
  { label: "WhatsApp", value: site.contact.whatsapp, href: site.contact.whatsappUrl },
  { label: "Instagram", value: "instagram.com/berlinoitalia", href: site.social.instagram },
  { label: "Facebook", value: "facebook.com/berlino.italia", href: site.social.facebook },
  { label: "YouTube", value: "@berlinoitaliaimprov", href: site.social.youtube },
];

export default function ContattiPage() {
  return (
    <>
      <PageHeader kicker="Contatti" title={<>Parliamoci.</>}>
        Sei un&apos;insegnante, un genitore, un organizzatore? Vuoi provare un corso o
        portare uno spettacolo? Scrivici.
      </PageHeader>

      <Container className="pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex flex-col gap-1 border-2 border-ink bg-paper-3 px-5 py-6 transition-transform hover:-translate-y-1"
            >
              <span className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60">
                {c.label}
              </span>
              <span className="font-display text-lg font-semibold uppercase">{c.value}</span>
            </a>
          ))}
        </div>
      </Container>

      <section className="bg-ink py-14 text-paper">
        <Container>
          <p className="kicker mb-3 text-verde">Newsletter</p>
          <h2 className="max-w-[16ch] text-[clamp(1.8rem,4.5vw,2.5rem)] text-paper">
            Spettacoli, corsi e workshop. Una mail al mese.
          </h2>
          <p className="mt-4 max-w-md text-paper/70">
            Iscrizione tramite il modulo Brevo — da collegare.
          </p>
        </Container>
      </section>
    </>
  );
}
