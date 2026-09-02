import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false },
  alternates: { canonical: "/impressum" },
};

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum" updated="Angaben gemäß § 5 DDG">
      <h2>Diensteanbieter</h2>
      <p>
        [Name / Rechtsform, z. B. „Berlino Italia Improv – Luca Rizzuti“ oder Vereinsname
        e.&nbsp;V. / GbR / UG]
        <br />
        [Straße und Hausnummer]
        <br />
        [PLZ] Berlin
        <br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: [Telefonnummer]
        <br />
        E-Mail: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
      </p>

      <h2>Vertretungsberechtigte Person</h2>
      <p>[Name der vertretungsberechtigten Person]</p>

      <h2>Umsatzsteuer-Identifikationsnummer</h2>
      <p>
        [USt-IdNr. gemäß § 27a UStG: … — nur angeben, falls vorhanden; andernfalls diesen
        Abschnitt entfernen]
      </p>

      <h2>Redaktionell verantwortlich (§ 18 Abs. 2 MStV)</h2>
      <p>
        [Name]
        <br />
        [Anschrift wie oben]
      </p>

      <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftung für Inhalte und Links</h2>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen
        Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir
        als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
        Informationen zu überwachen. Für Inhalte externer Links sind ausschließlich deren
        Betreiber verantwortlich.
      </p>
    </LegalPage>
  );
}
