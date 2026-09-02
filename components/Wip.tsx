import { Container } from "./Container";

/** Segnaposto per una pagina non ancora costruita. */
export function Wip({ note }: { note: string }) {
  return (
    <Container className="pb-24">
      <div className="border-2 border-dashed border-blu/50 p-8 font-display text-sm uppercase tracking-[0.12em] text-blu">
        {note}
      </div>
    </Container>
  );
}
