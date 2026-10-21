import Link from "next/link";
import { sections } from "@/lib/nav";
import { Hero, NextUp } from "@/components/Furniture";

export default function Home() {
  return (
    <div className="page">
      <Hero title="Editorial system" crop="home" tall />

      <section className="opening">
        <h1 className="h1">
          Materials that look as <em>engineered</em> as the work.
        </h1>
        <div className="big">
          <p>
            This is an audit of Harpoon&rsquo;s current brochure and a proposed system for every PDF that follows:
            reports, proposals and one-pagers that share one type scale, one grid and one way of showing data.
          </p>
          <p>
            Harpoon&rsquo;s pitch is that clients deserve better than a templated playbook with their logo dropped in.
            The printed materials should make that argument before anyone reads a word. Right now the brochure is built
            from stock boxes, stock gradients and stock photography, so it looks like everyone else&rsquo;s.
          </p>
          <p>
            The content is strong and the structure behind the service pages is good. What is missing is a set of rules
            that makes the twentieth document as considered as the first, whoever makes it. This site is those rules,
            shown on Harpoon&rsquo;s own content.
          </p>
        </div>
      </section>

      <dl className="cover-meta">
        <div>
          <dt>Prepared for</dt>
          <dd>Harpoon Consulting Ltd</dd>
        </div>
        <div>
          <dt>Prepared by</dt>
          <dd>Ibrahim Otukoya</dd>
        </div>
        <div>
          <dt>Source audited</dt>
          <dd>OT Security Services Brochure, Sept 2025</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>Proposal v0.1</dd>
        </div>
      </dl>

      <section className="section">
        <div className="offset">
          <p className="eyebrow">Contents</p>
          <ol className="toc">
            {sections.slice(1).map((s) => (
              <li key={s.href}>
                <Link href={s.href}>
                  <span className="n">{s.n}</span>
                  <span className="t">{s.title}</span>
                  <span className="d">{s.desc}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="offset">
          <p className="eyebrow">Principles</p>
          <div className="cols-3">
            <div>
              <h3 className="h3">Precise, not decorated</h3>
              <p className="small">
                OT is an engineering discipline. Hairline rules, a strict grid and exact figures do the work that
                gradients and tinted boxes do now.
              </p>
            </div>
            <div>
              <h3 className="h3">One accent, earned</h3>
              <p className="small">
                The logo&rsquo;s teal appears where it means something: a key figure, a section number, the hook. If
                everything is highlighted, nothing is.
              </p>
            </div>
            <div>
              <h3 className="h3">Evidence over imagery</h3>
              <p className="small">
                Harpoon sells clarity. A well-drawn chart of real delivery timelines persuades more than a photo of an
                engineer in a hard hat.
              </p>
            </div>
          </div>
        </div>
      </section>

      <NextUp current="/" />
    </div>
  );
}
