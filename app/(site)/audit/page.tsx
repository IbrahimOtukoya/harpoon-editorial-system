import type { Metadata } from "next";
import { Evidence, type Pin } from "@/components/Evidence";
import { NextUp, RunHead, SectionHead } from "@/components/Furniture";

export const metadata: Metadata = { title: "Audit · Harpoon Editorial System" };

type Finding = {
  title: string;
  severity: "high" | "med" | "low";
  body: React.ReactNode;
  fix: React.ReactNode;
  pages: { src: string; page: string; pins: Pin[] }[];
};

const findings: Finding[] = [
  {
    title: "Two cyans, and neither is the logo's",
    severity: "high",
    body: (
      <>
        <p>
          The logo hook is a green-leaning teal, <span className="mono">#19BFB7</span>. The cover title, the
          &lsquo;OT Security&rsquo; prefixes and the footer band use a bluer cyan, <span className="mono">#00BCD4</span>,
          which happens to be Material Design&rsquo;s stock Cyan 500. Every content box adds a third, a pale tint at{" "}
          <span className="mono">#A3E0E9</span>.
        </p>
        <p>
          Side by side they almost match, which is worse than clearly not matching: it reads as approximate. The cover
          logo is also a flattened image with its dark background baked in, so it cannot be placed cleanly on a light
          page.
        </p>
      </>
    ),
    fix: (
      <>
        The hook teal becomes the single brand colour. A darker, text-safe Deep Teal handles links and figures. The
        stock cyan and the box tint retire. First asset to produce: a vector logo master in ink and paper versions.
      </>
    ),
    pages: [
      { src: "/audit/p01.webp", page: "01", pins: [{ x: 36, y: 18, note: "Logo supplied as a raster with background; hook is #19BFB7." }, { x: 23, y: 88.6, note: "Title set in #00BCD4, a different cyan from the hook." }] },
      { src: "/audit/p08.webp", page: "08", pins: [{ x: 5, y: 4.6, note: "'OT' prefix in the stock cyan, used as decoration on 16 page titles." }, { x: 50, y: 23.5, note: "Third tint fills every box, flattening emphasis." }] },
    ],
  },
  {
    title: "One typeface does every job",
    severity: "high",
    body: (
      <>
        <p>
          Montserrat sets the page titles, section heads, box labels, taglines, body copy, lists and footer. The only
          difference between levels is regular versus bold, plus a bold italic for taglines. Section heads, box heads
          and the timeline label all land at almost the same weight, so the eye has no entry point.
        </p>
        <p>
          Montserrat is a geometric display face. At around 9pt across 31 dense pages it is wide, slow to read, and
          among the most-used free fonts on the web, so it reads as generic.
        </p>
      </>
    ),
    fix: (
      <>
        Three faces, three jobs: Newsreader for reading and headlines, IBM Plex Sans for tables and apparatus, IBM
        Plex Mono for labels and figures. Visby CF stays in the logo. See Foundations, 02.2.
      </>
    ),
    pages: [
      { src: "/audit/p08.webp", page: "08", pins: [{ x: 18, y: 10.5, note: "Service Overview, Who it's for, The Value: all Montserrat Bold at near-identical size." }, { x: 50, y: 37, note: "Box heads compete with the page title for attention." }] },
    ],
  },
  {
    title: "Boxes everywhere, so nothing stands out",
    severity: "high",
    body: (
      <>
        <p>
          Nearly every block on a service page sits in a rounded, cyan-tinted box: Who it&rsquo;s for, Key Benefits,
          Deliverables, Methodology, and each stage&rsquo;s summary. Box borders replace hierarchy rather than express
          it. A minor note and the core deliverables get the same treatment.
        </p>
        <p>
          Rounded tinted cards are the visual signature of drag-and-drop templates. They are the single biggest reason
          the brochure reads as Canva-made, which the file metadata confirms.
        </p>
      </>
    ),
    fix: (
      <>
        Structure comes from hairline rules, whitespace and the grid. A tinted panel is reserved for one element per
        page at most, usually the key figure or the &lsquo;Result&rsquo;. See Components, 04.
      </>
    ),
    pages: [
      { src: "/audit/p08.webp", page: "08", pins: [{ x: 18, y: 45, note: "Three equal boxes give Benefits, Deliverables and Methodology identical weight." }, { x: 50, y: 77, note: "The one hard fact on the page, the timeline, is the least prominent element." }] },
    ],
  },
  {
    title: "No underlying grid",
    severity: "med",
    body: (
      <>
        <p>
          Pages switch between two-column text, three-column boxes and full-bleed photo bands at arbitrary heights. The
          left margin is about 7mm, tighter than most printers&rsquo; safe area, and column edges don&rsquo;t align
          from one block to the next.
        </p>
        <p>The lifecycle diagram on p.05 sits on its own centre line, unrelated to the text above and below it.</p>
      </>
    ),
    fix: (
      <>
        A 12-column A4 grid with 16 to 18mm margins and a 14pt baseline. Every template snaps to it, so columns of 3,
        4 and 6 always align. See Foundations, 02.3.
      </>
    ),
    pages: [
      { src: "/audit/p05.webp", page: "05", pins: [{ x: 50, y: 34, note: "Gradient circles on their own axis; arrows carry no information." }, { x: 3, y: 50, note: "Margin around 7mm, less than a typical 10mm print-safe area." }] },
    ],
  },
  {
    title: "Navigation that doesn't navigate",
    severity: "med",
    body: (
      <>
        <p>
          The contents page lists page numbers, but no page carries one. Every footer reads &lsquo;OT Security
          Services by Harpoon | Overview&rsquo;, including the 16 service pages, which are not overviews. Each page also
          repeats six lines of legal text at roughly 3pt, too small to print legibly.
        </p>
      </>
    ),
    fix: (
      <>
        Folios on every page. Running heads that name the section (Diagnose, Design, Build, Operate). Legal copy set
        once, at 6.5pt minimum, on the back page.
      </>
    ),
    pages: [
      { src: "/audit/p02.webp", page: "02", pins: [{ x: 94, y: 30, note: "Page numbers listed here exist nowhere else in the document." }, { x: 20, y: 94, note: "Footer says 'Overview' on all 24 content pages." }] },
    ],
  },
  {
    title: "Stock imagery, reused",
    severity: "med",
    body: (
      <>
        <p>
          The same circuit-chip photograph sits behind the cover and all five section dividers. Service pages use
          generic stock: engineers in hi-vis, wind turbines, a refinery at dusk. None shows Harpoon&rsquo;s work, and
          the same images appear on many competitors&rsquo; sites.
        </p>
      </>
    ),
    fix: (
      <>
        Dividers become typographic, using the stage name and its one-line promise. Photography is used only when it
        is real (a client site, the team) and otherwise replaced by diagrams that explain something.
      </>
    ),
    pages: [
      { src: "/audit/p06.webp", page: "06", pins: [{ x: 50, y: 30, note: "Same chip image as the cover and the other four dividers." }, { x: 50, y: 50, note: "Divider adds a word, not information." }] },
    ],
  },
  {
    title: "Strong numbers, buried and inconsistent",
    severity: "med",
    body: (
      <>
        <p>
          The introduction has three compelling facts: incidents have doubled in three years, nearly a third of
          organisations report six or more intrusions a year, and losses are projected at over $329bn. All three sit
          inside a paragraph. The same page then repeats the loss figure as &lsquo;USD 329.5 billion&rsquo;.
        </p>
        <p>
          Across the service pages, timelines are written six different ways (&lsquo;4-6 Weeks&rsquo;,
          &lsquo;Typically 6-18 Months&rsquo;, &lsquo;Ongoing; typical terms&hellip;&rsquo;) and the brochure has no chart.
        </p>
      </>
    ),
    fix: (
      <>
        Key figures become stat callouts with a source line. All timelines are restated on one scale and compared in a
        single chart. A number style sets currency, ranges and units. See Data visualisation, 03.
      </>
    ),
    pages: [
      { src: "/audit/p03.webp", page: "03", pins: [{ x: 72, y: 11.7, note: "'$329 billion' in running text." }, { x: 45, y: 52, note: "'USD 329.5 billion' in the callout, same page, different figure and format." }] },
    ],
  },
  {
    title: "House style slips",
    severity: "low",
    body: (
      <>
        <p>
          The copy is consistently UK English, with a few exceptions: &lsquo;programs&rsquo; appears once against 72
          uses of &lsquo;programme&rsquo;, and the legal text uses &lsquo;organizational&rsquo;. Ranges use hyphens
          rather than en dashes. The tagline &lsquo;Simple. Structured. Built for OT security.&rsquo; is used for two
          different pages, and ampersands and &lsquo;and&rsquo; alternate in titles.
        </p>
      </>
    ),
    fix: (
      <>
        A one-page house style: UK spelling, en-dash ranges (4–6 weeks), sentence-case headings, one tagline per page,
        and &lsquo;OT&rsquo; never used as decoration.
      </>
    ),
    pages: [],
  },
];

const scorecard: [string, number, string][] = [
  ["Content structure", 4, "Service template is clear and consistently applied."],
  ["Brand colour", 1, "Three near-miss cyans; logo not available as vector."],
  ["Typography", 1, "One family, two weights, no hierarchy."],
  ["Grid & layout", 2, "Consistent page pattern, but no underlying grid."],
  ["Data & evidence", 1, "Strong figures in prose; no charts."],
  ["Imagery", 1, "Generic stock, one image reused six times."],
  ["Navigation", 1, "No folios; footer mislabels every page."],
  ["Copy & house style", 3, "Confident, UK English, minor slips."],
];

export default function Audit() {
  return (
    <div className="page">
      <RunHead n="01" title="Audit" />
      <p className="eyebrow">01 · Audit</p>
      <h1 className="h1" style={{ maxWidth: "16ch" }}>
        The brochure has a strong spine and a generic skin.
      </h1>
      <p className="lead" style={{ marginTop: 24 }}>
        Source: <em>OT Security Services Brochure</em>, 31 pages, A4, September 2025, built in Canva. Every page was
        reviewed. Findings are ordered by how much they cost the brand, each with the evidence and the fix the proposed
        system applies.
      </p>

      <section className="section" style={{ marginTop: 80 }}>
        <SectionHead n="01.1" title="Scorecard" />
        <div style={{ overflowX: "auto" }}>
          <table className="scorecard">
            <thead>
              <tr>
                <th>Area</th>
                <th>Rating</th>
                <th>Summary</th>
              </tr>
            </thead>
            <tbody>
              {scorecard.map(([area, score, note]) => (
                <tr key={area}>
                  <td>{area}</td>
                  <td>
                    <span className="meter" role="img" aria-label={`${score} out of 5`}>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <i key={i} className={i <= score ? "on" : undefined} />
                      ))}
                    </span>
                  </td>
                  <td>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <SectionHead
          n="01.2"
          title="What already works"
          lead="These are kept. The system builds on them rather than replacing them."
        />
        <div className="cols-3">
          <div>
            <h3 className="h3">A repeatable service page</h3>
            <p className="small">
              All 16 services follow the same sequence: Overview, Who it&rsquo;s for, Value, Benefits, Deliverables,
              Methodology, Result, Timeline. That is the hardest part of a system, and it is already done.
            </p>
          </div>
          <div>
            <h3 className="h3">A clear narrative</h3>
            <p className="small">
              Diagnose, Design, Build, Operate gives the catalogue an order clients can follow. The proposed running
              heads and dividers make that order visible on every page.
            </p>
          </div>
          <div>
            <h3 className="h3">A confident voice</h3>
            <p className="small">
              Short, direct copy (&lsquo;No vendor quotas. No hidden agendas.&rsquo;) with a consistent UK register. The
              typography should give it room rather than box it in.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHead n="01.3" title="Findings" lead="Eight findings, highest impact first. Numbered pins mark the evidence on each page." />
        {findings.map((f, i) => (
          <article className="finding" key={f.title} id={`finding-${i + 1}`}>
            <div>
              <div className="finding-n">
                <span>F{String(i + 1).padStart(2, "0")}</span>
                <span className={`sev ${f.severity}`}>{f.severity === "med" ? "Medium" : f.severity === "high" ? "High" : "Low"} impact</span>
              </div>
              <h3>{f.title}</h3>
              <div className="small" style={{ fontSize: 16 }}>
                {f.body}
              </div>
              <p className="fix">
                <b>System response</b>
                {f.fix}
              </p>
            </div>
            {f.pages.length ? <Evidence pages={f.pages} /> : <div />}
          </article>
        ))}
      </section>

      <NextUp current="/audit" />
    </div>
  );
}
