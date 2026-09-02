import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-noir text-paper">
      <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 py-14 sm:px-10 md:grid-cols-3 lg:px-[100px]">
        <div>
          <Image
            src="/brand/logo.webp"
            alt="Berlino Italia Improv"
            width={70}
            height={114}
            className="h-16 w-auto invert"
          />
        </div>

        <div className="text-sm leading-8 text-paper/75">
          <p className="kicker mb-2 text-paper">Dove</p>
          Corsi · {site.venues.corsiLun.address}
          <br />
          Corsi · {site.venues.corsiSab.name}, {site.venues.corsiSab.address}
          <br />
          Spettacoli · {site.venues.acud.name}, {site.venues.acud.address}
        </div>

        <div className="text-sm leading-8 text-paper/75">
          <p className="kicker mb-2 text-paper">Contatti</p>
          <a href={`mailto:${site.contact.email}`} className="text-paper/75 hover:text-paper">
            {site.contact.email}
          </a>
          <br />
          WhatsApp {site.contact.whatsapp}
          <br />
          <span className="inline-flex gap-3">
            <a href={site.social.instagram} className="text-paper/75 hover:text-paper" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={site.social.facebook} className="text-paper/75 hover:text-paper" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href={site.social.youtube} className="text-paper/75 hover:text-paper" target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
          </span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1240px] px-6 pb-12 sm:px-10 lg:px-[100px]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-paper/20 pt-4 font-display text-[11px] uppercase tracking-[0.1em] text-paper/50">
          <span>© {new Date().getFullYear()} Berlino Italia Improv — Berlino, Germania</span>
          <span className="flex gap-4">
            <Link href="/impressum" className="text-paper/50 hover:text-paper">
              Impressum
            </Link>
            <Link href="/datenschutz" className="text-paper/50 hover:text-paper">
              Datenschutz
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
