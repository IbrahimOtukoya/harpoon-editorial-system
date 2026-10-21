import { DurationChart, MaturityChart, RiskMatrix } from "@/components/charts";
import type { Stage } from "@/lib/services";

const STAGES: Stage[] = ["Diagnose", "Design", "Build", "Operate"];

export function Sheet({ children, dark = false, label }: { children: React.ReactNode; dark?: boolean; label?: string }) {
  return (
    <div className="sheet-frame" aria-label={label}>
      <div className={`sheet${dark ? " dark" : ""}`}>{children}</div>
    </div>
  );
}

function RunHead({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="s-runhead">
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

function Folio({ n, dark = false, note = "harpoonconsulting.net" }: { n: string; dark?: boolean; note?: string }) {
  return (
    <div className="s-folio">
      <img src={dark ? "/harpoon-logo-paper.png" : "/harpoon-logo-ink.png"} alt="Harpoon" />
      <span>{note}</span>
      <span className="s-num">{n}</span>
    </div>
  );
}

export function Lifecycle({ on }: { on: Stage }) {
  return (
    <div className="s-lifecycle" aria-label={`Lifecycle stage: ${on}`}>
      {STAGES.map((s) => (
        <span key={s} className={s === on ? "on" : undefined}>
          {s}
        </span>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* One-pager: the brochure's p.08 service page, rebuilt on the system */
/* ---------------------------------------------------------------- */

export function OnePager() {
  return (
    <Sheet label="One-pager: OT Risk & Visibility Insight">
      <RunHead left={<><b>Diagnose</b> · Service sheet</>} right="OT Security Services" />
      <div className="s-body">
        <div className="s-grid">
          <div className="s-c8">
            <p className="s-label">Service 07 · Fixed scope</p>
            <h1 className="s-h1">OT Risk &amp; Visibility Insight</h1>
            <p className="s-lead">
              A complete, independent view of your OT estate: every asset, every exposure, ranked against business and
              compliance risk.
            </p>
          </div>
          <div className="s-c4" style={{ alignSelf: "end" }}>
            <Lifecycle on="Diagnose" />
          </div>
        </div>

        <div className="s-grid" style={{ marginTop: "calc(var(--pt) * 21)" }}>
          <div className="s-c8">
            <div className="s-rule">
              <h2 className="s-h3" style={{ marginBottom: "calc(var(--pt) * 3.5)" }}>The problem</h2>
              <p>
                Most organisations struggle with a lack of visibility across their OT environments. Assets are often
                unmanaged, undocumented, or connected in unexpected ways, while vulnerabilities remain hidden until an
                incident occurs. That makes it hard to prioritise investment or demonstrate compliance.
              </p>
              <h2 className="s-h3" style={{ margin: "calc(var(--pt) * 7) 0 calc(var(--pt) * 3.5)" }}>The value</h2>
              <p>
                We map every asset, uncover vulnerabilities and assess risk against business and regulatory
                requirements. Leadership gets a baseline to measure progress, satisfy regulators and build the business
                case for investment; technical teams get a clear place to start.
              </p>
            </div>
          </div>
          <aside className="s-c4">
            <div className="s-rule">
              <p className="s-label" style={{ color: "var(--steel-500)" }}>Who it&rsquo;s for</p>
              <p className="s-ui">CISOs, OT leaders and compliance managers who need a clear, independent view of their OT risk posture.</p>
            </div>
            <div className="s-stat" style={{ marginTop: "calc(var(--pt) * 14)" }}>
              <div className="v">4–6<small>weeks</small></div>
              <div className="l">Indicative duration, depending on estate size and access.</div>
            </div>
            <div style={{ marginTop: "calc(var(--pt) * 14)" }}>
              <p className="s-label" style={{ color: "var(--steel-500)", marginBottom: "calc(var(--pt) * 3.5)" }}>Aligned to</p>
              <p className="s-ui s-num" style={{ fontFamily: "var(--mono)", fontSize: "calc(var(--pt) * 7.5)" }}>NIS2 · IEC 62443-3-2</p>
            </div>
          </aside>
        </div>

        <div className="s-grid" style={{ marginTop: "calc(var(--pt) * 21)" }}>
          <div className="s-c4 s-rule">
            <h3 className="s-h3">Key benefits</h3>
            <ul className="s-list s-ui">
              <li>Full OT asset discovery</li>
              <li>Vulnerabilities identified and prioritised</li>
              <li>Compliance baseline (NIS2, IEC 62443)</li>
              <li>Board-ready view of risk</li>
            </ul>
          </div>
          <div className="s-c4 s-rule">
            <h3 className="s-h3">Deliverables</h3>
            <ul className="s-list s-ui">
              <li>Asset inventory</li>
              <li>Vulnerability &amp; risk report</li>
              <li>Prioritised remediation roadmap</li>
              <li>Executive summary</li>
            </ul>
          </div>
          <div className="s-c4 s-rule">
            <h3 className="s-h3">Method</h3>
            <ol className="s-steps s-ui">
              <li><span><b>Discover.</b> Identify assets and connected systems.</span></li>
              <li><span><b>Assess.</b> Scan for vulnerabilities and gaps.</span></li>
              <li><span><b>Prioritise.</b> Rank by impact and likelihood.</span></li>
              <li><span><b>Report.</b> Executive and technical outputs.</span></li>
            </ol>
          </div>
        </div>

        <div className="s-grid" style={{ marginTop: "calc(var(--pt) * 28)" }}>
          <div className="s-c4">
            <p className="s-label" style={{ color: "var(--steel-500)", margin: 0 }}>Typical next step</p>
            <p className="s-caption" style={{ margin: "calc(var(--pt) * 3.5) 0 0" }}>Findings feed directly into the Design stage.</p>
          </div>
          {[
            ["12", "Roadmap & Strategy Development", "4–6 weeks"],
            ["14", "Architecture & Network Segmentation", "6–10 weeks"],
          ].map(([pg, name, d]) => (
            <div className="s-c4 s-hair" key={pg} style={{ paddingTop: "calc(var(--pt) * 6)" }}>
              <p className="s-label" style={{ marginBottom: "calc(var(--pt) * 2)" }}>Design · p.{pg}</p>
              <p className="s-ui" style={{ margin: 0 }}>{name}</p>
              <p className="s-caption s-num" style={{ margin: 0 }}>{d}</p>
            </div>
          ))}
        </div>

        <div className="s-panel" style={{ marginTop: "auto" }}>
          <div className="s-grid">
            <div className="s-c3">
              <p className="s-label" style={{ margin: 0 }}>The result</p>
            </div>
            <div className="s-c8" style={{ gridColumn: "4 / span 9" }}>
              <p style={{ margin: 0, fontSize: "calc(var(--pt) * 10)", lineHeight: "calc(var(--pt) * 14)" }}>
                A complete inventory of OT assets, a prioritised view of vulnerabilities and a remediation roadmap.
                Leadership gains confidence; technical teams get actionable next steps.
              </p>
            </div>
          </div>
        </div>
        <div className="s-grid" style={{ marginTop: "calc(var(--pt) * 10.5)" }}>
          <div className="s-c3">
            <p className="s-label" style={{ color: "var(--steel-500)", margin: 0 }}>Why Harpoon</p>
          </div>
          <p className="s-ui" style={{ gridColumn: "4 / span 9", margin: 0 }}>
            Unlike vendor-led assessments, Harpoon is independent and OT-specific. Findings balance security with
            operational reality, so they are practical, prioritised and immediately actionable.
          </p>
        </div>
      </div>
      <Folio n="07" />
    </Sheet>
  );
}

/* ---------------------------------------------------------------- */
/* Section divider                                                   */
/* ---------------------------------------------------------------- */

export function Divider({ stage = "Diagnose", n = "01", line = "Gaining clarity is the first step to control.", services = ["OT Risk & Visibility Insight", "OT Security Compliance Assessment", "OT Security Programme Diagnostic"] }: { stage?: Stage; n?: string; line?: string; services?: string[] }) {
  return (
    <Sheet dark label={`Section divider: ${stage}`}>
      <RunHead left={<><b>{n}</b> · {stage}</>} right="OT Security Services" />
      <div className="s-body">
        <Lifecycle on={stage} />
        <div style={{ marginTop: "auto" }}>
          <p className="s-divider-n">Stage {n} of 04</p>
          <h1 className="s-mega">{stage}</h1>
          <p className="s-lead" style={{ maxWidth: "75%", fontStyle: "italic" }}>{line}</p>
          <div className="s-grid" style={{ marginTop: "calc(var(--pt) * 42)" }}>
            {services.map((s, i) => (
              <div className="s-c4 s-rule" key={s}>
                <p className="s-label" style={{ marginBottom: "calc(var(--pt) * 3.5)" }}>{String(i + 7).padStart(2, "0")}</p>
                <p className="s-ui" style={{ margin: 0 }}>{s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Folio n="06" dark />
    </Sheet>
  );
}

/* ---------------------------------------------------------------- */
/* Report                                                            */
/* ---------------------------------------------------------------- */

export function ReportCover() {
  return (
    <Sheet dark label="Report cover">
      <div className="s-cover-hook" aria-hidden />
      <div className="s-body">
        <img src="/harpoon-logo-paper.png" alt="Harpoon" style={{ width: "34%", height: "auto" }} />
        <div style={{ marginTop: "auto", maxWidth: "82%" }}>
          <p className="s-label">Findings report · OT Risk &amp; Visibility Insight</p>
          <h1 className="s-display">Knowing what you run: an OT risk baseline</h1>
          <p className="s-lead">Asset discovery, vulnerability assessment and a prioritised remediation roadmap.</p>
        </div>
        <div className="s-grid" style={{ marginTop: "calc(var(--pt) * 42)" }}>
          {[
            ["Prepared for", "Sample Client Ltd"],
            ["Engagement", "HC-2026-014"],
            ["Date", "October 2026"],
            ["Classification", "Confidential"],
          ].map(([k, v]) => (
            <div className="s-c3 s-rule" key={k}>
              <p className="s-label" style={{ color: "var(--steel-300)", marginBottom: "calc(var(--pt) * 2)" }}>{k}</p>
              <p className="s-ui" style={{ margin: 0 }}>{v}</p>
            </div>
          ))}
        </div>
      </div>
    </Sheet>
  );
}

export function ReportSummary() {
  return (
    <Sheet label="Report: executive summary">
      <RunHead left={<><b>01</b> · Executive summary</>} right="Sample Client Ltd · Confidential" />
      <div className="s-body">
        <p className="s-label">01</p>
        <h1 className="s-h1" style={{ maxWidth: "70%" }}>Executive summary</h1>
        <div className="s-grid" style={{ marginTop: "calc(var(--pt) * 21)" }}>
          <div className="s-c8">
            <p className="s-lead" style={{ marginTop: 0, marginBottom: "calc(var(--pt) * 14)" }}>
              Sample Client&rsquo;s OT estate is larger and more connected than its records show. Most risk sits in a
              small number of flat network segments, which makes it tractable.
            </p>
            <p>
              Over five weeks we discovered and classified every asset across three production sites, assessed each
              against known vulnerabilities, and scored the findings by likelihood and operational impact. This report
              sets out what we found, what it means for the business, and the order in which we recommend acting.
            </p>
            <p>
              Forty-seven findings were recorded. Eleven are rated major or severe; nine of those trace back to the same
              root cause: engineering workstations with direct routes into the control network. Segmenting those routes
              addresses most of the high-impact risk in a single, well-understood piece of work.
            </p>
            <h2 className="s-h2" style={{ marginTop: "calc(var(--pt) * 14)" }}>Recommendations</h2>
            <ol className="s-steps s-ui">
              <li><span><b>Segment engineering access</b> to the control network within 90 days.</span></li>
              <li><span><b>Establish an asset owner</b> for each of the 212 undocumented devices.</span></li>
              <li><span><b>Adopt IEC 62443-3-2 zoning</b> as the target architecture for all sites.</span></li>
              <li><span><b>Re-baseline in twelve months</b> to measure progress against this report.</span></li>
            </ol>
          </div>
          <aside className="s-c4">
            <div className="s-stat s-rule">
              <div className="v">1,486</div>
              <div className="l">OT assets discovered, against 1,274 in the client&rsquo;s register.</div>
            </div>
            <div className="s-stat signal s-rule" style={{ marginTop: "calc(var(--pt) * 14)" }}>
              <div className="v">11</div>
              <div className="l">Findings rated major or severe impact.</div>
            </div>
            <div className="s-stat s-rule" style={{ marginTop: "calc(var(--pt) * 14)" }}>
              <div className="v">9<small>of 11</small></div>
              <div className="l">High-impact findings sharing one root cause.</div>
            </div>
            <div className="s-quote" style={{ marginTop: "calc(var(--pt) * 28)" }}>
              <p>&ldquo;Most of the risk is in a handful of routes. That&rsquo;s good news.&rdquo;</p>
              <p className="s-caption" style={{ fontStyle: "normal" }}>Lead assessor</p>
            </div>
          </aside>
        </div>
        <p className="s-caption" style={{ marginTop: "auto" }}>Sample content for template demonstration. All client data is illustrative.</p>
      </div>
      <Folio n="03" note="Executive summary" />
    </Sheet>
  );
}

export function ReportFindings() {
  return (
    <Sheet label="Report: findings with charts">
      <RunHead left={<><b>03</b> · Findings</>} right="Sample Client Ltd · Confidential" />
      <div className="s-body">
        <p className="s-label">03.2</p>
        <h2 className="s-h2" style={{ maxWidth: "80%", fontSize: "calc(var(--pt) * 22)", lineHeight: "calc(var(--pt) * 28)" }}>
          Most findings cluster at moderate impact, possible to likely
        </h2>
        <div className="s-grid" style={{ marginTop: "calc(var(--pt) * 14)" }}>
          <div className="s-c6 s-chart">
            <RiskMatrix />
            <p className="s-caption" style={{ marginTop: "calc(var(--pt) * 7)" }}>Figure 3. Findings by likelihood and impact, n = 47.</p>
          </div>
          <div className="s-c6">
            <p>
              The distribution is typical of an estate that has grown by project rather than by design: few
              catastrophic exposures, many moderate ones, and a long tail of low-likelihood issues that can be accepted
              or scheduled.
            </p>
            <p>
              The eleven findings in the top-right quadrant are listed in Appendix B with owners and target dates.
            </p>
          </div>
        </div>
        <div className="s-hair" style={{ margin: "calc(var(--pt) * 21) 0 calc(var(--pt) * 14)" }} />
        <p className="s-label">03.3</p>
        <h2 className="s-h2" style={{ maxWidth: "80%", fontSize: "calc(var(--pt) * 22)", lineHeight: "calc(var(--pt) * 28)" }}>
          System integrity and restricted data flow show the widest gap
        </h2>
        <div className="s-chart" style={{ marginTop: "calc(var(--pt) * 7)" }}>
          <MaturityChart />
        </div>
        <p className="s-caption" style={{ marginTop: "calc(var(--pt) * 7)" }}>
          Figure 4. Security level by IEC 62443 foundational requirement, current versus target. Source: Harpoon assessment, 2026.
        </p>
      </div>
      <Folio n="09" note="Findings" />
    </Sheet>
  );
}

/* ---------------------------------------------------------------- */
/* Proposal                                                          */
/* ---------------------------------------------------------------- */

export function ProposalCover() {
  return (
    <Sheet label="Proposal cover">
      <div className="s-body">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <img src="/harpoon-logo-ink.png" alt="Harpoon" style={{ width: "28%", height: "auto" }} />
          <p className="s-label" style={{ color: "var(--steel-500)" }}>Proposal · HC-P-2026-031</p>
        </div>
        <div style={{ marginTop: "calc(var(--pt) * 120)" }}>
          <Lifecycle on="Diagnose" />
          <h1 className="s-display" style={{ marginTop: "calc(var(--pt) * 28)", maxWidth: "85%" }}>
            OT Security Compliance Assessment
          </h1>
          <p className="s-lead" style={{ maxWidth: "70%" }}>
            Understand where you stand against NIS2 and IEC 62443, and leave with a scorecard and an action plan the
            board can sign off.
          </p>
        </div>
        <div className="s-grid" style={{ marginTop: "auto" }}>
          {[
            ["Prepared for", <span className="s-field" key="c">Client name</span>],
            ["Duration", "3–5 weeks"],
            ["Valid until", <span className="s-field" key="v">Date</span>],
            ["Contact", <span className="s-field" key="n">Name, role</span>],
          ].map(([k, v], i) => (
            <div className="s-c3 s-rule" key={i}>
              <p className="s-label" style={{ color: "var(--steel-500)", marginBottom: "calc(var(--pt) * 2)" }}>{k}</p>
              <p className="s-ui" style={{ margin: 0 }}>{v}</p>
            </div>
          ))}
        </div>
      </div>
    </Sheet>
  );
}

export function ProposalScope() {
  return (
    <Sheet label="Proposal: approach">
      <RunHead left={<><b>02</b> · Approach</>} right={<><span className="s-field">Client name</span> · Proposal</>} />
      <div className="s-body">
        <p className="s-label">02</p>
        <h1 className="s-h1">Our approach</h1>
        <div className="s-grid" style={{ marginTop: "calc(var(--pt) * 14)" }}>
          <p className="s-lead s-c8" style={{ marginTop: 0 }}>
            Four steps, each with a named output. You see findings as they emerge rather than at the end.
          </p>
        </div>
        <div style={{ marginTop: "calc(var(--pt) * 21)" }}>
          {[
            ["01", "Review", "Week 1", "Analyse existing policies, controls and documentation against NIS2 and IEC 62443. Interviews with OT, IT and compliance leads.", "Document register; interview notes"],
            ["02", "Benchmark", "Weeks 2–3", "Compare current practice against regulatory requirements and sector peers, site by site.", "Draft compliance scorecard"],
            ["03", "Identify", "Weeks 3–4", "Highlight gaps and quantify the risk each one carries. Agree priorities with your team in a working session.", "Gap analysis; risk register"],
            ["04", "Recommend", "Weeks 4–5", "Provide a prioritised roadmap and a board briefing that sets out cost, effort and benefit.", "Action plan; leadership briefing"],
          ].map(([n, t, w, d, o]) => (
            <div className="s-grid s-rule" key={n} style={{ paddingBottom: "calc(var(--pt) * 10.5)" }}>
              <div className="s-c3">
                <p className="s-label" style={{ marginBottom: 0 }}>{n} · {w}</p>
                <h3 className="s-h2" style={{ marginTop: "calc(var(--pt) * 3.5)" }}>{t}</h3>
              </div>
              <p className="s-c5" style={{ margin: 0 }}>{d}</p>
              <div className="s-c4">
                <p className="s-label" style={{ color: "var(--steel-500)", marginBottom: "calc(var(--pt) * 2)" }}>Output</p>
                <p className="s-ui" style={{ margin: 0 }}>{o}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="s-panel" style={{ marginTop: "auto" }}>
          <div className="s-grid">
            <p className="s-label s-c3" style={{ margin: 0 }}>You will leave with</p>
            <p style={{ gridColumn: "4 / span 9", margin: 0, fontSize: "calc(var(--pt) * 11.5)", lineHeight: "calc(var(--pt) * 15.75)" }}>
              A compliance scorecard and an actionable plan to close the gaps, giving you a clear route to meeting
              regulatory requirements.
            </p>
          </div>
        </div>
      </div>
      <Folio n="04" note="Approach" />
    </Sheet>
  );
}

export function ProposalPlan() {
  const rows: [string, number, number, boolean?][] = [
    ["Kick-off & document request", 0, 0.4],
    ["Review", 0.2, 1],
    ["Benchmark", 1, 3],
    ["Identify", 2.5, 4],
    ["Working session", 3.2, 3.2, true],
    ["Recommend", 3.5, 5],
    ["Board briefing", 4.85, 4.85, true],
  ];
  return (
    <Sheet label="Proposal: timeline and investment">
      <RunHead left={<><b>03</b> · Plan &amp; investment</>} right={<><span className="s-field">Client name</span> · Proposal</>} />
      <div className="s-body">
        <p className="s-label">03</p>
        <h1 className="s-h1">Timeline</h1>
        <div className="s-gantt" style={{ marginTop: "calc(var(--pt) * 21)" }}>
          <div className="head">
            <span />
            {[1, 2, 3, 4, 5].map((w) => <span key={w}>WK {w}</span>)}
          </div>
          {rows.map(([name, a, b, ms]) => (
            <div className="row" key={name}>
              <span>{name}</span>
              <div className="track">
                <span className={`bar${ms ? " ms" : ""}`} style={{ left: `${(a / 5) * 100}%`, width: ms ? undefined : `${Math.max(((b - a) / 5) * 100, 2)}%` }} />
              </div>
            </div>
          ))}
        </div>
        <p className="s-caption" style={{ marginTop: "calc(var(--pt) * 7)" }}>Bars show working weeks; diamonds mark client meetings.</p>

        <h1 className="s-h1" style={{ marginTop: "calc(var(--pt) * 35)" }}>Investment</h1>
        <table className="s-table" style={{ marginTop: "calc(var(--pt) * 21)" }}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Basis</th>
              <th className="r">Fee</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Compliance assessment, up to three sites</td><td>Fixed price</td><td className="r"><span className="s-field">£ 00,000</span></td></tr>
            <tr><td>Additional site</td><td>Per site</td><td className="r"><span className="s-field">£ 0,000</span></td></tr>
            <tr><td>Board briefing</td><td>Included</td><td className="r">—</td></tr>
            <tr><td>Expenses</td><td>At cost, capped</td><td className="r"><span className="s-field">£ 0,000</span></td></tr>
          </tbody>
          <tfoot>
            <tr><td>Total, excluding VAT</td><td /><td className="r"><span className="s-field">£ 00,000</span></td></tr>
          </tfoot>
        </table>
        <div className="s-grid" style={{ marginTop: "auto" }}>
          <div className="s-c6 s-rule">
            <h3 className="s-h3">Why fixed price</h3>
            <p className="s-ui">Certainty of scope, cost and timeline. Change is agreed in writing before any extra work begins.</p>
          </div>
          <div className="s-c6 s-rule">
            <h3 className="s-h3">Next step</h3>
            <p className="s-ui">Sign the Statement of Work and we will schedule kick-off within ten working days.</p>
          </div>
        </div>
      </div>
      <Folio n="05" note="Plan & investment" />
    </Sheet>
  );
}

export function TimelineSheet() {
  return (
    <Sheet label="Brochure page: delivery timelines chart">
      <RunHead left={<><b>05</b> · Delivery models</>} right="OT Security Services" />
      <div className="s-body">
        <p className="s-label">At a glance</p>
        <h1 className="s-h1" style={{ maxWidth: "80%" }}>How long each engagement takes</h1>
        <p className="s-lead" style={{ maxWidth: "75%" }}>Most Diagnose and Design work fits inside a quarter. Build is where commitments grow.</p>
        <div className="s-chart" style={{ marginTop: "calc(var(--pt) * 21)" }}>
          <DurationChart compact />
        </div>
        <p className="s-caption" style={{ marginTop: "auto" }}>
          Figure 1. Indicative delivery time by fixed-scope service, weeks. Project Delivery runs 6–18 months. Retained
          services are sold by term: see Delivery Models.
        </p>
      </div>
      <Folio n="29" />
    </Sheet>
  );
}
