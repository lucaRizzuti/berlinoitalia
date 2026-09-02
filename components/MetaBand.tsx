const tone: Record<string, string> = {
  ink: "bg-ink text-paper",
  rosso: "bg-rosso text-paper",
  blu: "bg-blu text-paper",
  verde: "bg-verde text-paper",
};

export function MetaBand({
  children = "Improvvisazione · Teatro · Gioco · Ascolto · Presenza",
  color = "ink",
}: {
  children?: React.ReactNode;
  color?: keyof typeof tone;
}) {
  return (
    <div
      className={`px-4 py-4 text-center font-display text-[15px] font-medium uppercase tracking-[0.32em] ${tone[color]}`}
    >
      {children}
    </div>
  );
}
