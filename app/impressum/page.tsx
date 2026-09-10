import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false },
  alternates: { canonical: "/impressum" },
};

export default function ImpressumPage() {
  return (
    <LegalPage
      title="Impressum"
      updated="Stand: September 2026"
      note="Dati del Vereinsregister verificati (set. 2026). Una revisione legale del testo resta consigliata prima della pubblicazione."
    >
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        Berlino Italia e.V.
        <br />
        Kiefholzstraße 26
        <br />
        12435 Berlin
        <br />
        Deutschland
      </p>

      <h2>Vertreten durch</h2>
      <p>
        Vorstand gemäß § 26 BGB:
        <br />
        Luca Rizzuti (Vorsitzender)
        <br />
        Federica Spinello (stellvertretende Vorsitzende)
        <br />
        Maddalena Zoli (stellvertretende Vorsitzende)
      </p>
      <p>
        Der Verein wird gerichtlich und außergerichtlich durch den Vorsitzenden allein oder
        durch zwei stellvertretende Vorsitzende gemeinsam vertreten.
      </p>

      <h2>Registereintrag</h2>
      <p>
        Eingetragener Verein.
        <br />
        Registergericht: Amtsgericht Charlottenburg
        <br />
        Registernummer: VR 39653 B
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
        <br />
        Kontaktformular: <Link href="/contatti">berlinoitalia.com/contatti</Link>
      </p>

      <h2>Redaktionell verantwortlich (§ 18 Abs. 2 MStV)</h2>
      <p>Luca Rizzuti, Anschrift wie oben</p>

      <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftung für Inhalte und Links</h2>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen
        Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir
        jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
        überwachen. Für Inhalte externer Links sind ausschließlich deren Betreiber
        verantwortlich.
      </p>
    </LegalPage>
  );
}
