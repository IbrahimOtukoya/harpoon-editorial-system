import type { Metadata } from "next";
import { Hero, NextUp, SectionHead } from "@/components/Furniture";
import { Divider, Lifecycle } from "@/components/sheets";

export const metadata: Metadata = { title: "Components · Harpoon Editorial System" };

function Fragment({ children }: { children: React.ReactNode }) {
  return (
    <div className="sheet-frame">
      <div className="sheet fragment">{children}</div>
    </div>
  );
}

export default function Components() {
  return (
    <div className="page">
      <Hero title="Components" crop="components" />
      <div className="opening">
        <h1 className="h1">
        A small kit of parts, used the same way every time.
        </h1>
        <p className="lead">
        Each component is shown at true A4 proportions and built from the foundation tokens. Together they replace the
        brochure&rsquo;s tinted boxes, gradient bands and stock photography.
        </p>
      </div>

      <section className="section">
        <SectionHead
          n="04.1"
          title="Section divider"
          lead="Typographic, on the Abyss ground. It names the stage, states its promise, and lists what follows, so a divider page carries information instead of a photograph."
        />
        <div className="sheet-stage">
          <div className="sheet-row two">
            <Divider />
            <Divider
              stage="Build"
              n="03"
              line="Turning plans into tangible protection."
              services={["OT Security Build & Implement", "OT Security Project Delivery", "OT Security Change Execution"]}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHead n="04.2" title="Running head, folio and lifecycle marker" />
        <div className="specimen-grid">
          <div className="specimen-card">
            <div className="frame-label"><span>Top of page</span><span>8 mm from edge</span></div>
            <Fragment>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--mono)", fontSize: "calc(var(--pt) * 7)", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--steel-500)" }}>
                <span><b style={{ color: "var(--teal-700)", fontWeight: 500 }}>Diagnose</b> · Service sheet</span>
                <span>OT Security Services</span>
              </div>
            </Fragment>
            <p className="small">The running head names the section, so a reader who lands on page 19 knows they are in Build. It replaces the generic &lsquo;Overview&rsquo; footer.</p>
          </div>
          <div className="specimen-card">
            <div className="frame-label"><span>Foot of page</span><span>8 mm from edge</span></div>
            <Fragment>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontFamily: "var(--mono)", fontSize: "calc(var(--pt) * 7)", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--steel-500)" }}>
                <img src="/harpoon-logo-ink.png" alt="Harpoon" style={{ height: "calc(var(--pt) * 9)", width: "auto" }} />
                <span>harpoonconsulting.net</span>
                <span style={{ fontVariantNumeric: "lining-nums tabular-nums" }}>07</span>
              </div>
            </Fragment>
            <p className="small">The logo at 9pt cap height, the URL, and a folio that matches the contents page. Legal text moves to the back page.</p>
          </div>
          <div className="specimen-card">
            <div className="frame-label"><span>Lifecycle marker</span><span>4 columns</span></div>
            <Fragment>
              <Lifecycle on="Design" />
            </Fragment>
            <p className="small">A functional replacement for the gradient circles on p.05. It sits on every service page and divider and shows where the reader is.</p>
          </div>
          <div className="specimen-card">
            <div className="frame-label"><span>Stat callout</span><span>Margin column</span></div>
            <Fragment>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--gut)" }}>
                <div className="s-stat s-rule">
                  <div className="v">4–6<small>weeks</small></div>
                  <div className="l">Indicative duration.</div>
                </div>
                <div className="s-stat signal s-rule">
                  <div className="v">$329.5<small>bn</small></div>
                  <div className="l">Projected loss from OT incidents. Source line required.</div>
                </div>
              </div>
            </Fragment>
            <p className="small">Figures are set in lining numerals at 30pt. Amber is reserved for the one figure a page is about.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHead
          n="04.3"
          title="Content blocks"
          lead="Rules and space carry the structure. A tinted panel appears once per page at most, for the result or outcome."
        />
        <div className="specimen-grid">
          <div className="specimen-card" style={{ gridColumn: "1 / -1" }}>
            <div className="frame-label"><span>Three-up: Benefits · Deliverables · Method</span><span>4 + 4 + 4</span></div>
            <Fragment>
              <div className="s-grid">
                <div className="s-c4 s-rule">
                  <h3 className="s-h3">Key benefits</h3>
                  <ul className="s-list s-ui">
                    <li>Clarity on compliance gaps</li>
                    <li>Actionable recommendations</li>
                    <li>Reduced regulatory exposure</li>
                  </ul>
                </div>
                <div className="s-c4 s-rule">
                  <h3 className="s-h3">Deliverables</h3>
                  <ul className="s-list s-ui">
                    <li>Compliance scorecard</li>
                    <li>Gap analysis report</li>
                    <li>Action plan</li>
                  </ul>
                </div>
                <div className="s-c4 s-rule">
                  <h3 className="s-h3">Method</h3>
                  <ol className="s-steps s-ui">
                    <li><span><b>Review.</b> Policies and controls.</span></li>
                    <li><span><b>Benchmark.</b> Against requirements.</span></li>
                    <li><span><b>Recommend.</b> Roadmap and briefing.</span></li>
                  </ol>
                </div>
              </div>
            </Fragment>
            <p className="small">Replaces the three equal cyan boxes. The ink rule above each column gives the same grouping with far less visual weight, and the three columns lock to the grid.</p>
          </div>
          <div className="specimen-card">
            <div className="frame-label"><span>Result panel</span><span>One per page</span></div>
            <Fragment>
              <div className="s-panel">
                <p className="s-label">The result</p>
                <p style={{ margin: 0, fontSize: "calc(var(--pt) * 11.5)", lineHeight: "calc(var(--pt) * 15.75)" }}>
                  A compliance scorecard and an actionable plan to close the gaps.
                </p>
              </div>
            </Fragment>
          </div>
          <div className="specimen-card">
            <div className="frame-label"><span>Pull quote</span><span>Margin or 8 col</span></div>
            <Fragment>
              <div className="s-quote">
                <p>&ldquo;No vendor quotas. No hidden agendas. Just independent expertise.&rdquo;</p>
                <p className="s-caption">Harpoon Consulting</p>
              </div>
            </Fragment>
          </div>
          <div className="specimen-card" style={{ gridColumn: "1 / -1" }}>
            <div className="frame-label"><span>Table</span><span>Poppins, Plex Mono figures</span></div>
            <Fragment>
              <table className="s-table">
                <thead>
                  <tr><th>Delivery model</th><th>Best for</th><th>Commercials</th><th className="r">Term</th></tr>
                </thead>
                <tbody>
                  <tr><td>Fixed-price project</td><td>Assessments, gap analyses, implementation work</td><td>Fixed scope and fee</td><td className="r">1–12 wks</td></tr>
                  <tr><td>Advisory support</td><td>Ongoing advice without a long-term commitment</td><td>Call-off days</td><td className="r">5–30 days</td></tr>
                  <tr><td>Embedded specialists</td><td>Resource gaps on major programmes</td><td>Monthly</td><td className="r">3–12 mths</td></tr>
                  <tr><td>OT Security-as-a-Service</td><td>Smaller organisations without in-house expertise</td><td>Subscription</td><td className="r">Ongoing</td></tr>
                </tbody>
              </table>
            </Fragment>
            <p className="small">The brochure&rsquo;s Delivery Models page (p.30) as a table. Five tinted cards become four rows a reader can compare across.</p>
          </div>
          <div className="specimen-card">
            <div className="frame-label"><span>Template field</span><span>For anything client-specific</span></div>
            <Fragment>
              <p className="s-ui" style={{ margin: 0 }}>Prepared for <span className="s-field">Client name</span>, valid until <span className="s-field">Date</span>.</p>
            </Fragment>
            <p className="small">Unfilled fields are unmissable on screen and in proof, so a template is never sent with placeholder text.</p>
          </div>
          <div className="specimen-card">
            <div className="frame-label"><span>Footnote &amp; source</span><span>Caption style</span></div>
            <Fragment>
              <p className="s-caption" style={{ margin: 0 }}>
                Figure 2. Indicative delivery time by service, weeks. Source: Harpoon, 2025. Durations depend on estate
                size and access.
              </p>
            </Fragment>
            <p className="small">Every figure, chart and statistic carries one. Nothing in the system is set below 6.5pt.</p>
          </div>
        </div>
      </section>

      <NextUp current="/components" />
    </div>
  );
}
