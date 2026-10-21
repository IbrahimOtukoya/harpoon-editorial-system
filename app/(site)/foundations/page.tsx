import type { Metadata } from "next";
import { Hero, NextUp, SectionHead } from "@/components/Furniture";
import { GridDiagram } from "@/components/GridDiagram";
import { colour, families, grid, spacing, type, columnWidthMm } from "@/lib/tokens";

export const metadata: Metadata = { title: "Foundations · Harpoon Editorial System" };

const familyCss = { serif: "var(--serif)", sans: "var(--sans)", mono: "var(--mono)" } as const;

function onDark(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 140;
}

const samples: Record<string, string> = {
  display: "Diagnose",
  h1: "OT Risk & Visibility Insight",
  h2: "What we typically see",
  h3: "Key deliverables",
  lead: "A complete inventory of OT assets, a prioritised view of risk, and a roadmap leadership can act on.",
  body: "Most organisations struggle with a lack of visibility across their OT environments. Assets are often unmanaged, undocumented, or connected in unexpected ways, while vulnerabilities remain hidden until an incident occurs.",
  ui: "Asset inventory · Vulnerability & risk report · Prioritised remediation roadmap",
  caption: "Figure 2. Indicative delivery time by service, in weeks. Source: Harpoon, 2025.",
  label: "Diagnose · 07 · IEC 62443-3-2",
  legal: "© 2025 Harpoon Consulting Ltd. Registered in England and Wales.",
};

export default function Foundations() {
  return (
    <div className="page">
      <Hero title="Foundations" crop="foundations" />
      <div className="opening">
        <h1 className="h1">
        Four decisions that every page inherits.
        </h1>
        <p className="lead">
        Colour, type, grid and spacing are set once and expressed as tokens. Print values are in points and
        millimetres, the units a PDF is built in. The same tokens drive this site and are downloadable as{" "}
        <a href="/tokens.json">tokens.json</a>.
        </p>
      </div>

      {/* COLOUR */}
      <section className="section">
        <SectionHead
          n="02.1"
          title="Colour"
          lead={
            <>
              One brand colour, taken from the logo hook, carried by a near-black and a warm paper. A single amber
              signal is held back for the one thing on a page that must not be missed.
            </>
          }
        />
        <div className="swatches">
          {colour.brand.map((c) => (
            <div className="swatch" key={c.token}>
              <div className="chip" style={{ background: c.hex, color: onDark(c.hex) ? "#F6F4EF" : "#0B1F26", border: c.hex === "#F6F4EF" ? "1px solid #D9DEDC" : undefined }}>
                {c.token}
              </div>
              <div className="meta">
                <strong>{c.name}</strong>
                <code>{c.hex}</code>
                {c.role}
              </div>
            </div>
          ))}
          <div className="swatch">
            <div className="chip" style={{ background: colour.signal.hex, color: "#0B1F26" }}>
              {colour.signal.token}
            </div>
            <div className="meta">
              <strong>Signal Amber</strong>
              <code>{colour.signal.hex}</code>
              {colour.signal.role}
            </div>
          </div>
        </div>

      </section>

      {/* TYPE */}
      <section className="section">
        <SectionHead
          n="02.2"
          title="Typography"
          lead="Three families with separate jobs: a serif to read, a sans to organise, a mono to measure. Hierarchy comes from the change of voice, not from bolding."
        />
        <div className="families">
          {(["serif", "sans", "mono"] as const).map((k) => (
            <div className="family" key={k}>
              <p className="eyebrow" style={{ margin: 0, color: "#5B6B70" }}>{k === "serif" ? "Read" : k === "sans" ? "Organise" : "Measure"}</p>
              <div className="glyphs" style={{ fontFamily: familyCss[k], fontWeight: k === "serif" ? 360 : 400 }}>
                Aa<span style={{ color: "#0B7F7A" }}>62</span>
              </div>
              <h3 className="h3">{families[k].name}</h3>
              <p className="small">{families[k].why}</p>
            </div>
          ))}
        </div>
        <p className="caption" style={{ marginTop: 16 }}>
          All three are open-source (SIL Open Font License): no licence cost and no font substitution when a file is
          opened on another machine. Visby CF remains in the logo only.
        </p>

        <h3 className="h3" style={{ marginTop: 64, marginBottom: 8 }}>Scale</h3>
        <p className="small" style={{ marginBottom: 16 }}>
          Sizes step at roughly 1.25×. Every leading value except the legal line is a multiple of 3.5pt, so all text
          locks to the 14pt baseline grid.
        </p>
        {type.map((t) => (
          <div className="specimen" key={t.token}>
            <div className="tok">{t.token}</div>
            <div
              className="sample"
              style={{
                fontFamily: familyCss[t.family],
                fontWeight: t.weight,
                fontSize: `clamp(${Math.max(11, t.size * 0.9)}px, ${t.size * 0.16}vw + ${t.size * 0.8}px, ${t.size * 1.6}px)`,
                lineHeight: t.leading / t.size,
                letterSpacing: `${t.tracking}em`,
                textTransform: t.token === "label" ? "uppercase" : undefined,
                color: t.token === "label" ? "#0B7F7A" : undefined,
              }}
            >
              {samples[t.token]}
            </div>
            <div className="spec">
              {t.size}/{t.leading} pt · {Math.round(t.size * 1.333)}px
              <br />
              {t.family === "serif" ? "Newsreader" : t.family === "sans" ? "Plex Sans" : "Plex Mono"} {t.weight}
              {t.tracking ? ` · ${t.tracking > 0 ? "+" : ""}${t.tracking * 1000}` : ""}
              <br />
              <span style={{ color: "#2C3E44" }}>{t.use}</span>
            </div>
          </div>
        ))}
      </section>

      {/* GRID */}
      <section className="section">
        <SectionHead
          n="02.3"
          title="Grid"
          lead="One A4 grid for every document. Twelve columns divide cleanly into halves, thirds, quarters and sixths, so a three-up deliverables table and a two-up text spread share the same edges."
        />
        <div className="grid-demo">
          <GridDiagram />
          <div>
            <table className="spec-table">
              <tbody>
                <tr><th>Format</th><td>A4 portrait, 210 × 297 mm</td></tr>
                <tr><th>Margins (top, bottom)</th><td>{grid.margins.topMm} mm, {grid.margins.bottomMm} mm</td></tr>
                <tr><th>Margins (inside, outside)</th><td>{grid.margins.insideMm} mm, {grid.margins.outsideMm} mm</td></tr>
                <tr><th>Columns</th><td>{grid.columns} × {columnWidthMm.toFixed(2)} mm</td></tr>
                <tr><th>Gutter</th><td>{grid.gutterMm} mm</td></tr>
                <tr><th>Baseline</th><td>{grid.baselinePt} pt, subdivided at {grid.subBaselinePt} pt</td></tr>
                <tr><th>Running head</th><td>8 mm from top edge, label style</td></tr>
                <tr><th>Folio</th><td>10 mm from bottom edge, outside corner</td></tr>
                <tr><th>Bleed</th><td>3 mm on all edges for print</td></tr>
              </tbody>
            </table>
            <h3 className="h3" style={{ marginTop: 32 }}>Common spans</h3>
            <ul className="rules-list" style={{ marginTop: 8 }}>
              <li><span><b>12 col.</b> Titles, full-width charts, tables of more than four columns.</span></li>
              <li><span><b>8 + 4.</b> Running text with a margin column for sources, stats and pull quotes. The default reading page.</span></li>
              <li><span><b>4 + 4 + 4.</b> Benefits, Deliverables, Methodology. Replaces the three tinted boxes.</span></li>
              <li><span><b>6 + 6.</b> Comparisons, before and after, two-stage processes.</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* SPACING */}
      <section className="section">
        <SectionHead
          n="02.4"
          title="Spacing"
          lead="Vertical space comes in baseline units, so headings, rules and images always land on the grid. Seven steps cover every case."
        />
        <div style={{ display: "grid", gap: 10 }}>
          {spacing.map((s) => (
            <div key={s.token} style={{ display: "grid", gridTemplateColumns: "88px 56px minmax(0, 1fr)", alignItems: "center", gap: 16, fontFamily: "var(--mono)", fontSize: 12 }}>
              <span style={{ color: "#0B7F7A" }}>{s.token}</span>
              <span style={{ color: "#5B6B70" }}>{s.pt} pt</span>
              <span style={{ height: 12, width: `${s.pt * 4}px`, maxWidth: "100%", background: "#0B1F26" }} />
            </div>
          ))}
        </div>
      </section>

      <NextUp current="/foundations" />
    </div>
  );
}
