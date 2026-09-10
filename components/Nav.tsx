"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/lib/site";

const accentText: Record<string, string> = {
  rosso: "text-rosso",
  blu: "text-blu",
  verde: "text-verde",
};

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="relative z-30 border-b-2 border-ink bg-paper">
      <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-6 py-4 sm:px-10 lg:px-[100px]">
        <Link href="/" className="flex items-center gap-3" aria-label="Berlino Italia Improv — home">
          <Image
            src="/brand/logo.webp"
            alt="Berlino Italia Improv"
            width={52}
            height={85}
            priority
            className="h-11 w-auto"
          />
          <span className="kicker hidden leading-tight tracking-[0.16em] sm:block">
            Berlino Italia
            <br />
            Improv
          </span>
        </Link>

        {/* desktop */}
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-display text-sm font-medium uppercase tracking-[0.13em] transition-colors hover:text-rosso ${
                isActive(item.href)
                  ? accentText[item.accent ?? ""] ?? "text-ink underline underline-offset-4"
                  : "text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Menu"
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] border-2 border-ink lg:hidden"
        >
          <span className="block h-[2px] w-5 bg-ink" />
          <span className="block h-[2px] w-5 bg-ink" />
          <span className="block h-[2px] w-5 bg-ink" />
        </button>
      </div>

      {open && (
        <nav className="border-t-2 border-ink bg-paper lg:hidden">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-ink/20">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-6 py-4 font-display text-lg font-medium uppercase tracking-[0.1em]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
