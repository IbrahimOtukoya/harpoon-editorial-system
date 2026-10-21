"use client";

import { useState } from "react";
import { services, stages } from "@/lib/services";
import { maturity } from "@/lib/sample";

type Tip = { x: number; y: number; title: string; body: string } | null;

function useTip() {
  const [tip, setTip] = useState<Tip>(null);
  const el = tip ? (
    <div className="tip" style={{ left: `${tip.x}%`, top: `${tip.y}%` }}>
      <b>{tip.title}</b>
      {tip.body}
    </div>
  ) : null;
  return { setTip, el };
}

const INK = "#0B1F26";
const MUTED = "#5B6B70";
const GRID = "#D9DEDC";
const TEAL = "#00918A";
const OCHRE = "#C9731C";

/* ------------------------------------------------------------------ */
/* Delivery timelines: range bars, grouped by lifecycle stage          */
/* ------------------------------------------------------------------ */

export function DurationChart({ compact = false }: { compact?: boolean }) {
  const { setTip, el } = useTip();
  const fixed = services.filter((s) => s.minWeeks !== undefined);
  const W = 760;
  const labelW = compact ? 190 : 230;
  const right = 40;
  const rowH = compact ? 22 : 26;
  const groupGap = compact ? 16 : 22;
  const maxW = 24;
  const x = (w: number) => labelW + (Math.min(w, maxW) / maxW) * (W - labelW - right);

  let y = 28;
  const rows: { s: (typeof fixed)[number]; y: number }[] = [];
  const heads: { name: string; y: number }[] = [];
  for (const st of stages) {
    const inStage = fixed.filter((s) => s.stage === st.name);
    if (!inStage.length) continue;
    heads.push({ name: st.name, y });
    y += 18;
    for (const s of inStage) {
      rows.push({ s, y });
      y += rowH;
    }
    y += groupGap;
  }
  const H = y + 10;
  const ticks = [0, 4, 8, 12, 16, 20, 24];

  return (
    <div className="chart-wrap" onMouseLeave={() => setTip(null)}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Indicative delivery time for each fixed-scope Harpoon service, in weeks">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={x(t)} x2={x(t)} y1={20} y2={H - 14} stroke={GRID} strokeWidth={1} />
            <text x={x(t)} y={12} fontSize={11} fill={MUTED} textAnchor="middle">
              {t === 0 ? "0" : t === 24 ? "24 wks" : t}
            </text>
          </g>
        ))}
        {heads.map((h) => (
          <text key={h.name} x={0} y={h.y + 6} fontSize={10.5} letterSpacing="0.08em" fill="#0B7F7A" fontFamily="IBM Plex Mono, monospace">
            {h.name.toUpperCase()}
          </text>
        ))}
        {rows.map(({ s, y: ry }) => {
          const x1 = x(s.minWeeks!);
          const x2 = x(s.maxWeeks!);
          const over = s.maxWeeks! > maxW;
          const cy = ry + rowH / 2 - 2;
          return (
            <g
              key={s.name}
              onMouseEnter={() => setTip({ x: (((x1 + x2) / 2) / W) * 100, y: ((cy - 6) / H) * 100, title: s.name, body: `${s.minWeeks}–${s.maxWeeks} weeks · brochure p.${String(s.page).padStart(2, "0")}` })}
              style={{ cursor: "default" }}
            >
              <rect x={0} y={ry} width={W} height={rowH} fill="transparent" />
              <text x={0} y={cy + 4} fontSize={compact ? 12 : 13} fill={INK}>
                {s.name}
              </text>
              {!over && <rect x={x1} y={cy - 4} width={Math.max(x2 - x1, 6)} height={8} rx={4} fill={TEAL} />}
              {over ? (
                <>
                  <line x1={x(maxW - 3)} x2={x2 - 4} y1={cy} y2={cy} stroke={TEAL} strokeWidth={2} strokeDasharray="3 3" />
                  <path d={`M${x2 - 6} ${cy - 6} l7 6 l-7 6`} fill="none" stroke={TEAL} strokeWidth={2} />
                  <text x={x(maxW - 3) - 8} y={cy + 4} fontSize={11.5} fill={INK} textAnchor="end">
                    {s.minWeeks}–{s.maxWeeks} (6–18 months), off scale
                  </text>
                </>
              ) : (
                <text x={x2 + 8} y={cy + 4} fontSize={11.5} fill={MUTED} style={{ fontVariantNumeric: "tabular-nums" }}>
                  {s.minWeeks}–{s.maxWeeks}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      {el}
    </div>
  );
}

export function DurationTable() {
  return (
    <details className="table-toggle">
      <summary>Show as table</summary>
      <table className="data-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Stage</th>
            <th className="r">Weeks</th>
            <th>As published</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s.name}>
              <td>{s.name}</td>
              <td>{s.stage}</td>
              <td className="r">{s.minWeeks !== undefined ? `${s.minWeeks}–${s.maxWeeks}` : s.term}</td>
              <td style={{ color: MUTED }}>{s.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
}

/* ------------------------------------------------------------------ */
/* Maturity: dumbbell, current vs target, IEC 62443 FRs (illustrative) */
/* ------------------------------------------------------------------ */



export function MaturityChart() {
  const { setTip, el } = useTip();
  const W = 760;
  const labelW = 250;
  const right = 24;
  const rowH = 34;
  const top = 30;
  const H = top + maturity.length * rowH + 8;
  const x = (v: number) => labelW + (v / 4) * (W - labelW - right);
  return (
    <div className="chart-wrap" onMouseLeave={() => setTip(null)}>
      <ul className="legend">
        <li><i style={{ background: OCHRE }} />Current</li>
        <li><i style={{ background: TEAL }} />Target</li>
      </ul>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Security level by IEC 62443 foundational requirement, current versus target">
        {[0, 1, 2, 3, 4].map((t) => (
          <g key={t}>
            <line x1={x(t)} x2={x(t)} y1={top - 8} y2={H} stroke={GRID} />
            <text x={x(t)} y={12} fontSize={11} fill={MUTED} textAnchor="middle">
              {t === 0 ? "SL 0" : `SL ${t}`}
            </text>
          </g>
        ))}
        {maturity.map((d, i) => {
          const cy = top + i * rowH + rowH / 2;
          const gap = d.target - d.current;
          return (
            <g key={d.fr} onMouseEnter={() => setTip({ x: (x((d.current + d.target) / 2) / W) * 100, y: ((cy - 10) / H) * 100, title: `${d.fr} ${d.name}`, body: `Current SL ${d.current} · target SL ${d.target} · gap ${gap}` })}>
              <rect x={0} y={cy - rowH / 2} width={W} height={rowH} fill="transparent" />
              <text x={0} y={cy + 4} fontSize={13} fill={INK}>
                <tspan fontFamily="IBM Plex Mono, monospace" fontSize={11} fill={MUTED}>{d.fr} </tspan>
                {d.name}
              </text>
              <line x1={x(d.current)} x2={x(d.target)} y1={cy} y2={cy} stroke={INK} strokeWidth={2} opacity={0.25} />
              <circle cx={x(d.target)} cy={cy} r={6} fill={TEAL} stroke="#F6F4EF" strokeWidth={2} />
              <circle cx={x(d.current)} cy={cy} r={6} fill={OCHRE} stroke="#F6F4EF" strokeWidth={2} />
            </g>
          );
        })}
      </svg>
      {el}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Risk matrix: likelihood × impact, sequential teal (illustrative)    */
/* ------------------------------------------------------------------ */

const SEQ = ["#E6F7F6", "#B4E6E2", "#6FD6D0", "#2BB3AC", "#0B7F7A", "#083F3E"];
// rows: impact 5 (top) → 1; cols: likelihood 1 → 5. Values: count of findings.
const risk = [
  [0, 1, 2, 4, 3],
  [0, 2, 5, 6, 2],
  [1, 3, 7, 4, 1],
  [2, 4, 3, 1, 0],
  [3, 2, 1, 0, 0],
];

export function RiskMatrix() {
  const { setTip, el } = useTip();
  const cell = 64;
  const ox = 70;
  const oy = 8;
  const W = ox + cell * 5 + 8;
  const H = oy + cell * 5 + 48;
  const lv = ["Rare", "Unlikely", "Possible", "Likely", "Almost certain"];
  const iv = ["Severe", "Major", "Moderate", "Minor", "Negligible"];
  return (
    <div className="chart-wrap" style={{ maxWidth: 460 }} onMouseLeave={() => setTip(null)}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Count of findings by likelihood and impact">
        {risk.map((row, r) =>
          row.map((v, c) => {
            const step = v === 0 ? 0 : v >= 7 ? 5 : v >= 5 ? 4 : v >= 3 ? 3 : v;
            const fill = v === 0 ? "#ECE9E2" : SEQ[step];
            const dark = step >= 4;
            const cx = ox + c * cell;
            const cy = oy + r * cell;
            return (
              <g key={`${r}-${c}`} onMouseEnter={() => setTip({ x: ((cx + cell / 2) / W) * 100, y: (cy / H) * 100, title: `${v} finding${v === 1 ? "" : "s"}`, body: `${iv[r]} impact · ${lv[c]}` })}>
                <rect x={cx + 1} y={cy + 1} width={cell - 2} height={cell - 2} rx={2} fill={fill} />
                {v > 0 && (
                  <text x={cx + cell / 2} y={cy + cell / 2 + 5} textAnchor="middle" fontSize={15} fill={dark ? "#F6F4EF" : INK} style={{ fontVariantNumeric: "tabular-nums" }}>
                    {v}
                  </text>
                )}
              </g>
            );
          }),
        )}
        {iv.map((t, r) => (
          <text key={t} x={ox - 8} y={oy + r * cell + cell / 2 + 4} fontSize={11} fill={MUTED} textAnchor="end">
            {t}
          </text>
        ))}
        {lv.map((t, c) => (
          <text key={t} x={ox + c * cell + cell / 2} y={oy + cell * 5 + 16} fontSize={10.5} fill={MUTED} textAnchor="middle">
            {t.replace("Almost certain", "Certain")}
          </text>
        ))}
        <text x={ox + (cell * 5) / 2} y={H - 4} fontSize={10.5} fill={INK} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" letterSpacing="0.08em">
          LIKELIHOOD →
        </text>
      </svg>
      {el}
    </div>
  );
}
