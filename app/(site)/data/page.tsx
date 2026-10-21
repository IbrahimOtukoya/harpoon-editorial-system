import type { Metadata } from "next";
import { NextUp, RunHead, SectionHead } from "@/components/Furniture";
import { DurationChart, DurationTable, MaturityChart, RiskMatrix } from "@/components/charts";
import { maturity } from "@/lib/sample";
import { dataviz } from "@/lib/tokens";

export const metadata: Metadata = { title: "Data visualisation · Harpoon Editorial System" };

export default function Data() {
  return (
    <div className="page">
      <RunHead n="03" title="Data visualisation" />
      <p className="eyebrow">03 · Data visualisation</p>
      <h1 className="h1" style={{ maxWidth: "15ch" }}>
        Numbers are Harpoon&rsquo;s best imagery.
      </h1>
      <p className="lead" style={{ marginTop: 24 }}>
        The brochure contains real figures, real timelines and a real method, and draws none of them. This section
        sets out how Harpoon shows data, worked on its own content: a hero figure, a comparison, a gap analysis and a
        risk matrix.
      </p>

      <section className="section" style={{ marginTop: 80 }}>
        <SectionHead
          n="03.1"
          title="The stat callout"
          lead="For a single headline number, a chart is overkill. Set the figure large, say what it means in one line, and always give a source."
        />
        <div className="stat-row">
          <div className="stat">
            <div className="v num">2<small>×</small></div>
            <div className="l">Cyber incidents in OT environments over the past three years.</div>
            <div className="s">Source: to be cited · brochure p.03</div>
          </div>
          <div className="stat">
            <div className="v num">1 in 3</div>
            <div className="l">Organisations reporting six or more intrusions every year.</div>
            <div className="s">Source: to be cited · brochure p.03</div>
          </div>
          <div className="stat signal">
            <div className="v num">$329.5<small>bn</small></div>
            <div className="l">Projected global financial risk from OT cyber incidents, mostly from indirect losses.</div>
            <div className="s">Source: to be cited · brochure p.03</div>
          </div>
        </div>
        <p className="caption" style={{ marginTop: 16 }}>
          The amber signal goes to the one figure the page is about. The brochure currently gives two versions of it
          (&lsquo;$329 billion&rsquo; and &lsquo;USD 329.5 billion&rsquo;) and no source for any of the three.
        </p>
      </section>

      <section className="section">
        <SectionHead n="03.2" title="Comparison: delivery timelines" />
        <div className="chart-card">
          <h3>Most Diagnose and Design work fits inside a quarter. Build is where commitments grow.</h3>
          <p className="sub">Indicative delivery time by fixed-scope service, weeks. Hover a bar for detail.</p>
          <DurationChart />
          <p className="caption">
            Source: Harpoon OT Security Services Brochure, 2025, service pages 07–23. Project Delivery (6–18 months) runs
            off the scale and is marked with an arrow rather than squeezing every other bar. Retained services (CISO as
            a Service, Advisory, Embedded Practitioners, Staff Augmentation) are sold by term and shown in the table.
          </p>
          <DurationTable />
        </div>
      </section>

      <section className="section">
        <SectionHead n="03.3" title="Gap analysis" />
        <div className="chart-card">
          <h3>System integrity and restricted data flow show the widest gap to target.</h3>
          <p className="sub">Security level (SL) by IEC 62443 foundational requirement, current versus target. Illustrative client data.</p>
          <MaturityChart />
          <p className="caption">
            The format a Compliance Assessment report would use. Two series only: Ochre for where the client is, Teal for
            where they need to be. The connecting line is the work.
          </p>
          <details className="table-toggle">
            <summary>Show as table</summary>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Requirement</th>
                  <th className="r">Current</th>
                  <th className="r">Target</th>
                  <th className="r">Gap</th>
                </tr>
              </thead>
              <tbody>
                {maturity.map((m) => (
                  <tr key={m.fr}>
                    <td>{m.fr} {m.name}</td>
                    <td className="r">{m.current}</td>
                    <td className="r">{m.target}</td>
                    <td className="r">{m.target - m.current}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </div>
      </section>

      <section className="section">
        <SectionHead n="03.4" title="Risk matrix" />
        <div className="chart-card">
          <div className="cols-2">
            <div>
              <h3>Most findings cluster at moderate impact, possible to likely.</h3>
              <p className="sub">Count of findings by likelihood and impact. Illustrative client data.</p>
              <p className="small">
                The deliverable of an OT Risk &amp; Visibility Insight, drawn once and reused. One teal ramp, light to
                dark, encodes the count; every cell carries its number, so the chart reads in greyscale and for
                colour-blind readers. Red-amber-green is deliberately avoided: it fails for one reader in twelve and
                makes every risk report look the same.
              </p>
            </div>
            <RiskMatrix />
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHead
          n="03.5"
          title="Palette and rules"
          lead="Chart colours are a separate set from brand colours, tuned so adjacent series stay distinct for colour-blind readers and in greyscale print. Checked with a validator, not by eye."
        />
        <div className="cols-2">
          <div>
            <h3 className="h3" style={{ marginBottom: 12 }}>Categorical, in fixed order</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", border: "1px solid #D9DEDC" }}>
              {dataviz.categorical.map((c) => (
                <div key={c.slot} style={{ background: c.hex, height: 84, padding: 8, color: c.slot === 4 ? "#0B1F26" : "#FDFCFA", fontFamily: "var(--mono)", fontSize: 10.5, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                  <span>{c.slot} · {c.name}</span>
                  <span>{c.hex}</span>
                </div>
              ))}
            </div>
            <p className="caption" style={{ marginTop: 10 }}>
              Slots 1–3 pass colour-blind separation for every pair (worst ΔE 12.4) and 3:1 contrast on Paper. A fourth
              series folds into grey &lsquo;Other&rsquo;.
            </p>
            <h3 className="h3" style={{ margin: "28px 0 12px" }}>Sequential</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", border: "1px solid #D9DEDC" }}>
              {dataviz.sequential.map((h, i) => (
                <div key={h} style={{ background: h, height: 48, padding: 6, fontFamily: "var(--mono)", fontSize: 10, color: i >= 4 ? "#F6F4EF" : "#0B1F26", display: "flex", alignItems: "flex-end" }}>
                  {h}
                </div>
              ))}
            </div>
          </div>
          <ol className="rules-list">
            <li><span><b>Title states the finding.</b> &lsquo;System integrity shows the widest gap&rsquo;, not &lsquo;Maturity by FR&rsquo;.</span></li>
            <li><span><b>Every chart has a source line</b> in caption style, including Harpoon&rsquo;s own data.</span></li>
            <li><span><b>One axis.</b> Two measures with different scales get two charts.</span></li>
            <li><span><b>Thin marks, rounded ends, recessive grid.</b> 8pt bars, 2pt lines, hairline gridlines in Steel 100.</span></li>
            <li><span><b>Label directly</b> where four series or fewer; a legend whenever there are two or more.</span></li>
            <li><span><b>Text stays ink.</b> Values and labels never take the series colour.</span></li>
            <li><span><b>Ranges use en dashes,</b> currency is &lsquo;$329.5bn&rsquo;, durations in weeks up to 24 and months beyond.</span></li>
            <li><span><b>No 3D, no pie charts over three slices,</b> no red-amber-green.</span></li>
          </ol>
        </div>
      </section>

      <NextUp current="/data" />
    </div>
  );
}
