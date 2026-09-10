const TZ = "Europe/Berlin";

const dow = new Intl.DateTimeFormat("it-IT", { weekday: "short", timeZone: TZ });
const day = new Intl.DateTimeFormat("it-IT", { day: "2-digit", timeZone: TZ });
const mon = new Intl.DateTimeFormat("it-IT", { month: "short", timeZone: TZ });
const time = new Intl.DateTimeFormat("it-IT", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: TZ,
});
const monthYear = new Intl.DateTimeFormat("it-IT", {
  month: "long",
  year: "numeric",
  timeZone: TZ,
});

/** { dow: "dom", day: "28", mon: "set" } — tutto minuscolo senza punto. */
export function dateParts(d: Date) {
  return {
    dow: dow.format(d).replace(".", ""),
    day: day.format(d),
    mon: mon.format(d).replace(".", ""),
  };
}

export const formatTime = (d: Date) => time.format(d);

export const monthKey = (d: Date) =>
  new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", timeZone: TZ }).format(d);

export const monthLabel = (d: Date) => monthYear.format(d);
