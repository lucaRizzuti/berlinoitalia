import { press } from "@/lib/press";

export function PressList() {
  return (
    <ul className="border-t-2 border-ink">
      {press.map((p) => (
        <li key={p.url} className="border-b-2 border-ink">
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="grid gap-1 py-4 text-ink hover:text-blu sm:grid-cols-[150px_1fr_auto] sm:items-baseline sm:gap-5"
          >
            <span className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-ink/60">
              {p.source}
            </span>
            <span className="font-display text-lg font-medium uppercase leading-tight">
              {p.title} <span aria-hidden="true">↗</span>
            </span>
            <span className="font-display text-sm text-ink/50">{p.year}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
