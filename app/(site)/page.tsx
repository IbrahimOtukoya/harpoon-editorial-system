import Link from "next/link";
import { sections } from "@/lib/nav";
import { NextUp } from "@/components/Furniture";

export default function Home() {
  return (
    <div className="page">
      <section className="cover">
        <div>
          <p className="eyebrow">Harpoon Consulting · Editorial System · Proposal</p>
          <h1 className="display cover-title">
            Materials that look as <em>engineered</em> as the work.
          </h1>
        </div>
        <div>
          <p className="lead">
            An audit of Harpoon&rsquo;s current brochure and a proposed system for every PDF that follows: reports,
            proposals and one-pagers that share one type scale, one grid, one way of showing data, and that no one
            could mistake for a template.
          </p>
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
        </div>
      </section>

      <section className="section" style={{ marginTop: 120 }}>
        <div className="offset">
          <p className="eyebrow">Why a system</p>
          <div>
            <blockquote className="pullquote" style={{ marginTop: 0 }}>
              <p>&ldquo;Most will hand you a templated playbook with your logo dropped in.&rdquo;</p>
              <cite>Harpoon OT Security Brochure, p.03 — on competitors</cite>
            </blockquote>
            <p>
              Harpoon&rsquo;s pitch is that OT security should be fast, sustainable and simplified, and that clients
              deserve better than generic playbooks. The printed materials should make the same argument before anyone
              reads a word. Right now they work against it: the brochure is built from stock boxes, stock gradients and
              stock photography, so it looks like everyone else&rsquo;s.
            </p>
            <p>
              The content is strong. The structure behind the service pages is genuinely good. What is missing is a set
              of rules that turns that structure into something distinctive and repeatable, so the twentieth document
              looks as considered as the first, whoever makes it.
            </p>
            <p>This site is those rules, worked out in full and shown on Harpoon&rsquo;s own content.</p>
          </div>
        </div>
      </section>

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
