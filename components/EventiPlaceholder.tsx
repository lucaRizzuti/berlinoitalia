/**
 * Segnaposto per l'integrazione nativa YesTicket (org 1033).
 * Sostituire con il componente che legge il feed e mostra le prossime date.
 */
export function EventiPlaceholder({
  slug,
  dark = false,
}: {
  slug?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`border-2 border-dashed p-8 text-center font-display text-sm uppercase tracking-[0.12em] ${
        dark ? "border-paper/40 text-paper" : "border-blu/50 text-blu"
      }`}
    >
      Prossime date — integrazione YesTicket
      {slug ? (
        <>
          <br />
          filtro sul format “{slug}”
        </>
      ) : null}
    </div>
  );
}
