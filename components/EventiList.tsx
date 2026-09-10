import { Button } from "./Button";
import type { Evento } from "@/lib/eventi";
import { dateParts, formatTime, monthKey, monthLabel } from "@/lib/format";

function Row({ e, dark }: { e: Evento; dark: boolean }) {
  const d = dateParts(e.start);
  const sub = [formatTime(e.start), e.location].filter(Boolean).join(" · ");
  return (
    <div
      className={`grid grid-cols-[68px_1fr] items-center gap-5 py-4 sm:grid-cols-[92px_1fr_auto] ${
        dark ? "border-b border-paper/20" : "border-b border-ink/20"
      } last:border-b-0`}
    >
      <div className="font-display font-semibold uppercase leading-none">
        <span className="text-sm">{d.dow}</span>
        <span className="block text-[30px] sm:text-[34px]">{d.day}</span>
        <span className="text-sm">{d.mon}</span>
      </div>
      <div>
        <div className="font-display text-lg font-semibold uppercase leading-tight sm:text-xl">
          {e.title}
        </div>
        {sub && (
          <div className={`text-[13px] ${dark ? "text-paper/65" : "text-ink/65"}`}>{sub}</div>
        )}
      </div>
      <div className="col-span-2 sm:col-span-1 sm:justify-self-end">
        {e.url ? (
          <Button href={e.url} external variant={dark ? "rosso" : "ink"} className="px-4 py-2.5 text-[13px]">
            Biglietti
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export function EventiList({
  eventi,
  dark = false,
  grouped = false,
  emptyLabel = "Nessuna data in programma al momento. Torna presto, o scrivici.",
}: {
  eventi: Evento[];
  dark?: boolean;
  grouped?: boolean;
  emptyLabel?: string;
}) {
  if (eventi.length === 0) {
    return (
      <p
        className={`border-2 border-dashed p-6 font-display text-sm uppercase tracking-[0.1em] ${
          dark ? "border-paper/30 text-paper/80" : "border-ink/30 text-ink/70"
        }`}
      >
        {emptyLabel}
      </p>
    );
  }

  if (!grouped) {
    return (
      <div>
        {eventi.map((e) => (
          <Row key={e.id} e={e} dark={dark} />
        ))}
      </div>
    );
  }

  const months = new Map<string, Evento[]>();
  for (const e of eventi) {
    const k = monthKey(e.start);
    (months.get(k) ?? months.set(k, []).get(k)!).push(e);
  }

  return (
    <div className="flex flex-col gap-12">
      {[...months.entries()].map(([k, list]) => (
        <section key={k}>
          <h2 className="mb-2 text-[clamp(1.5rem,4vw,2rem)]">{monthLabel(list[0].start)}</h2>
          {list.map((e) => (
            <Row key={e.id} e={e} dark={dark} />
          ))}
        </section>
      ))}
    </div>
  );
}
