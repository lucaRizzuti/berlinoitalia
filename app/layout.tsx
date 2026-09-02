import type { Metadata } from "next";
import { Oswald, Archivo } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { site } from "@/lib/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsappButton } from "@/components/WhatsappButton";
import { JsonLd } from "@/components/JsonLd";
import { organizationLd } from "@/lib/jsonld";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Scuola di Improvvisazione Teatrale in Italiano a Berlino`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: `${site.name} — Improvvisazione teatrale in italiano a Berlino`,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" className={`${oswald.variable} ${archivo.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Nav />
        <main className="relative flex-1">{children}</main>
        <Footer />
        <WhatsappButton />
        <div className="u-grain fixed" aria-hidden="true" />
        <Analytics />
        <JsonLd data={organizationLd} />
      </body>
    </html>
  );
}
