import type { ReactNode } from "react";

const kickerTone: Record<string, string> = {
  ink: "text-ink",
  rosso: "text-rosso",
  blu: "text-blu",
  verde: "text-verde",
};

export function SectionHeading({
  kicker,
  children,
  color = "ink",
  rule = true,
}: {
  kicker?: string;
  children: ReactNode;
  color?: keyof typeof kickerTone;
  rule?: boolean;
}) {
  return (
    <div className="mb-8">
      {kicker && <p className={`kicker mb-4 ${kickerTone[color]}`}>{kicker}</p>}
      <div className="flex items-end gap-5">
        <h2 className="text-[clamp(2rem,5vw,2.75rem)]">{children}</h2>
        {rule && <span className="u-halftone hidden h-4 flex-1 text-ink/50 sm:block" />}
      </div>
    </div>
  );
}
