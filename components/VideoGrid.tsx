"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Video } from "@/lib/youtube";

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export function VideoGrid({ videos, limit }: { videos: Video[]; limit?: number }) {
  const [active, setActive] = useState<Video | null>(null);
  const list = limit ? videos.slice(0, limit) : videos;

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  if (list.length === 0) return null;

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((v, i) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setActive(v)}
            className="group block border-2 border-ink bg-paper-3 text-left transition-transform hover:-translate-y-1"
            style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 0.5}deg)` }}
          >
            <span className="relative block aspect-video overflow-hidden border-b-2 border-ink">
              <Image
                src={v.thumb}
                alt={v.title}
                fill
                sizes="(min-width:1024px) 360px, (min-width:640px) 50vw, 100vw"
                className="u-riso object-cover"
              />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-ink bg-rosso text-paper transition-transform group-hover:scale-110">
                  <PlayIcon />
                </span>
              </span>
            </span>
            <span className="block px-4 py-3 font-display text-[15px] font-semibold uppercase leading-tight">
              {v.title}
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-ink/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
        >
          <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute right-0 top-[-42px] font-display text-sm font-semibold uppercase tracking-[0.1em] text-paper hover:text-rosso"
            >
              Chiudi ✕
            </button>
            <div className="aspect-video border-2 border-paper bg-ink">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0`}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
