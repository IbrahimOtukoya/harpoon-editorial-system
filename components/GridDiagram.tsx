import { grid, columnWidthMm } from "@/lib/tokens";

// A4 page drawn in millimetres: margins, 12 columns, 14pt baseline.
export function GridDiagram({ showBaseline = true }: { showBaseline?: boolean }) {
  const { widthMm: W, heightMm: H } = grid.page;
  const m = grid.margins;
  const baseMm = grid.baselinePt * 0.3528;
  const cols = Array.from({ length: grid.columns }, (_, i) => m.insideMm + i * (columnWidthMm + grid.gutterMm));
  const lines: number[] = [];
  for (let y = m.topMm; y <= H - m.bottomMm; y += baseMm) lines.push(y);

  return (
    <svg viewBox={`-14 -10 ${W + 28} ${H + 24}`} role="img" aria-label="A4 page grid: 12 columns, 4mm gutters, 14pt baseline">
      <rect x={0} y={0} width={W} height={H} fill="#FDFCFA" stroke="#D9DEDC" strokeWidth={0.4} />
      {cols.map((x, i) => (
        <rect key={i} x={x} y={m.topMm} width={columnWidthMm} height={H - m.topMm - m.bottomMm} fill="#19BFB7" opacity={0.12} />
      ))}
      {showBaseline &&
        lines.map((y, i) => (
          <line key={i} x1={m.insideMm} x2={W - m.outsideMm} y1={y} y2={y} stroke="#0B7F7A" strokeWidth={0.15} opacity={0.45} />
        ))}
      <rect x={m.insideMm} y={m.topMm} width={W - m.insideMm - m.outsideMm} height={H - m.topMm - m.bottomMm} fill="none" stroke="#0B1F26" strokeWidth={0.35} strokeDasharray="1.5 1" />
      {/* dimension labels */}
      <g fontFamily="IBM Plex Mono, monospace" fontSize={4} fill="#5B6B70">
        <text x={m.insideMm / 2} y={-3} textAnchor="middle">{m.insideMm}</text>
        <text x={W - m.outsideMm / 2} y={-3} textAnchor="middle">{m.outsideMm}</text>
        <text x={W + 3} y={m.topMm / 2 + 1.5}>{m.topMm}</text>
        <text x={W + 3} y={H - m.bottomMm / 2 + 1.5}>{m.bottomMm}</text>
        <text x={W / 2} y={H + 9} textAnchor="middle">A4 · 210 × 297 mm · 12 col · {grid.gutterMm} mm gutter · {grid.baselinePt} pt baseline</text>
      </g>
      <g stroke="#5B6B70" strokeWidth={0.25}>
        <line x1={0} x2={m.insideMm} y1={-1} y2={-1} />
        <line x1={W - m.outsideMm} x2={W} y1={-1} y2={-1} />
        <line x1={W + 1} x2={W + 1} y1={0} y2={m.topMm} />
        <line x1={W + 1} x2={W + 1} y1={H - m.bottomMm} y2={H} />
      </g>
    </svg>
  );
}
