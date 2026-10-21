import type { Metadata } from "next";
import { Hero, NextUp, SectionHead } from "@/components/Furniture";
import { OnePager, ProposalCover, ProposalPlan, ProposalScope, ReportCover, ReportFindings, ReportSummary, TimelineSheet } from "@/components/sheets";
import { docs } from "@/lib/docs";

export const metadata: Metadata = { title: "Templates · Harpoon Editorial System" };

function Actions({ doc }: { doc: keyof typeof docs }) {
  return (
    <div className="template-actions">
      <a className="btn" href={`/downloads/${docs[doc].file}`} download>
        Download PDF
      </a>
      <a className="btn" href={`/print/${doc}`} target="_blank" rel="noreferrer">
        Open print view
      </a>
    </div>
  );
}

export default function Templates() {
  return (
    <div className="page">
      <Hero title="Templates" crop="templates" />
      <div className="opening">
        <h1 className="h1">
        Three documents that cover most of what Harpoon sends.
        </h1>
        <p className="lead">
        Each is laid out at A4 on the 12-column grid and filled with Harpoon&rsquo;s own content. Client details are
        illustrative. Every template downloads as a print-ready PDF.
        </p>
      </div>

      <section className="section">
        <SectionHead
          n="05.1"
          title="Service one-pager"
          lead="The brochure's OT Risk & Visibility Insight page, rebuilt with the same words. Nothing was added except a lifecycle marker and a folio; everything else is hierarchy."
        />
        <div className="before-after">
          <figure>
            <figcaption><span>Before</span><span>Brochure p.08</span></figcaption>
            <img className="shot" src="/audit/p08.webp" alt="Current brochure page: OT Risk & Visibility Insight" width={910} height={1287} />
          </figure>
          <figure>
            <figcaption><span>After</span><span>One-pager template</span></figcaption>
            <OnePager />
          </figure>
        </div>
        <Actions doc="one-pager" />
      </section>

      <section className="section">
        <SectionHead
          n="05.2"
          title="Findings report"
          lead="For the output of any Diagnose engagement. An Abyss cover, an executive summary on the 8 + 4 reading layout with key figures in the margin, and findings pages built around charts."
        />
        <div className="sheet-stage">
          <div className="sheet-row three">
            <ReportCover />
            <ReportSummary />
            <ReportFindings />
          </div>
        </div>
        <Actions doc="report" />
      </section>

      <section className="section">
        <SectionHead
          n="05.3"
          title="Proposal"
          lead="A light cover so it reads as correspondence rather than marketing. Approach, plan and investment follow a fixed order, so every Harpoon proposal answers the same questions in the same place."
        />
        <div className="sheet-stage">
          <div className="sheet-row three">
            <ProposalCover />
            <ProposalScope />
            <ProposalPlan />
          </div>
        </div>
        <Actions doc="proposal" />
      </section>

      <section className="section">
        <SectionHead
          n="05.4"
          title="Brochure insert: at a glance"
          lead="A page the brochure doesn't have yet: every fixed-scope service compared on one timeline. It would sit before Delivery Models."
        />
        <div className="sheet-stage">
          <div className="sheet-row two">
            <TimelineSheet />
            <div className="small" style={{ alignSelf: "center" }}>
              <h3 className="h3">Why this page</h3>
              <p>
                Clients choosing between services want to know what they are committing to. Today that answer is spread
                across sixteen pages in six formats. One chart answers it, and shows the Diagnose → Operate path at the
                same time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHead n="05.5" title="Production" />
        <div className="cols-2">
          <div className="small">
            <h3 className="h3">How templates are delivered</h3>
            <p>
              Master files in Adobe InDesign or Affinity Publisher with paragraph, character, object and table styles
              named after the tokens on this site (h1, lead, ui, label). Colour swatches and grids are built in. A
              Figma library mirrors them for quick one-off pieces.
            </p>
          </div>
          <div className="small">
            <h3 className="h3">Checks before anything is sent</h3>
            <ul className="rules-list" style={{ marginTop: 8 }}>
              <li><span>No unfilled template fields.</span></li>
              <li><span>Every figure has a source line.</span></li>
              <li><span>Folios match the contents page.</span></li>
              <li><span>Fonts embedded; images at 300ppi at placed size.</span></li>
              <li><span>Exported as PDF/X-4 for print, or optimised PDF for email.</span></li>
            </ul>
          </div>
        </div>
      </section>

      <NextUp current="/templates" />
    </div>
  );
}
