import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  robots: { index: false },
  alternates: { canonical: "/datenschutz" },
};

export default function DatenschutzPage() {
  return (
    <LegalPage
      title="Datenschutzerklärung"
      updated="Datenschutz"
      note="Bozza — consigliata una revisione legale prima della pubblicazione."
    >
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        <br />
        Luca Rizzuti, Kiefholzstraße 26, 12435 Berlin
        <br />
        E-Mail: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
      </p>

      <h2>2. Hosting</h2>
      <p>
        Diese Website wird bei der Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789,
        USA, gehostet. Beim Aufruf der Website verarbeitet Vercel technisch notwendige Daten
        (u.&nbsp;a. IP-Adresse, Zeitpunkt des Zugriffs, aufgerufene Seite, Browsertyp) zur
        Auslieferung der Inhalte und zur Gewährleistung der Sicherheit und Stabilität.
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem
        sicheren und effizienten Betrieb). Die Übermittlung in die USA erfolgt auf
        Grundlage der EU-Standardvertragsklauseln; Vercel ist unter dem EU-U.S. Data
        Privacy Framework zertifiziert.
      </p>

      <h2>3. Server-Logfiles</h2>
      <p>
        Der Hosting-Anbieter erhebt und speichert automatisch Informationen in
        Server-Logfiles, die Ihr Browser übermittelt. Diese Daten werden nicht mit anderen
        Datenquellen zusammengeführt und nach kurzer Zeit gelöscht.
      </p>

      <h2>4. Reichweitenmessung (Vercel Web Analytics)</h2>
      <p>
        Wir nutzen Vercel Web Analytics zur statistischen Auswertung der
        Website-Nutzung. Die Erfassung erfolgt <strong>ohne Cookies</strong> und ohne
        Bildung von Nutzerprofilen; es werden aggregierte Kennzahlen (z.&nbsp;B.
        Seitenaufrufe, Herkunftsseite, ungefähre Region) erhoben. Eine Identifizierung
        einzelner Besucher ist nicht möglich. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
        DSGVO.
      </p>

      <h2>5. Schriftarten</h2>
      <p>
        Schriftarten werden lokal von unserem Server ausgeliefert (self-hosting über
        next/font). Es besteht keine Verbindung zu Servern Dritter, insbesondere nicht zu
        Google Fonts.
      </p>

      <h2>6. Kontaktaufnahme</h2>
      <p>
        Wenn Sie uns per E-Mail, WhatsApp oder über ein Formular kontaktieren, werden Ihre
        Angaben zur Bearbeitung der Anfrage verarbeitet (Art. 6 Abs. 1 lit. b bzw. lit. f
        DSGVO). WhatsApp wird von der WhatsApp Ireland Ltd. betrieben; bei der Nutzung
        gelten deren Datenschutzbestimmungen.
      </p>

      <h2>7. Newsletter</h2>
      <p>
        Die Anmeldung zu unserem Newsletter erfolgt über ein extern gehostetes Formular des
        Anbieters Brevo (Sendinblue GmbH, Köpenicker Str. 126, 10179 Berlin). Beim Aufruf
        dieses Formulars gelten die Datenschutzbestimmungen von Brevo. Die Anmeldung
        erfolgt im Double-Opt-in-Verfahren; Rechtsgrundlage ist Ihre Einwilligung (Art. 6
        Abs. 1 lit. a DSGVO), die Sie jederzeit über den Abmeldelink widerrufen können.
      </p>

      <h2>8. Ticketing (YesTicket)</h2>
      <p>
        Für Termine und Ticketverkauf verlinken wir auf den externen Dienst YesTicket
        (yesticket.org). Termindaten werden serverseitig über den öffentlichen iCal-Feed
        abgerufen; dabei werden keine personenbezogenen Daten unserer Besucher übermittelt.
        Der Kauf von Tickets erfolgt ausschließlich auf der Website von YesTicket, deren
        Datenschutzbestimmungen dann gelten. [Anpassen, falls YesTicket per iframe
        eingebunden wird.]
      </p>

      <h2>9. Ihre Rechte</h2>
      <p>
        Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
        Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen die Verarbeitung. Sie
        haben zudem das Recht, sich bei einer Aufsichtsbehörde zu beschweren, z.&nbsp;B.
        bei der Berliner Beauftragten für Datenschutz und Informationsfreiheit (BlnBDI).
      </p>

      <h2>10. SSL-/TLS-Verschlüsselung</h2>
      <p>
        Diese Seite nutzt aus Sicherheitsgründen eine SSL-/TLS-Verschlüsselung. Eine
        verschlüsselte Verbindung erkennen Sie am „https://“ in der Adresszeile.
      </p>
    </LegalPage>
  );
}
