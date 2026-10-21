import Link from "next/link";
import { sections } from "@/lib/nav";

export function RunHead({ n, title }: { n: string; title: string }) {
  return (
    <div className="runhead">
      <span>
        <b>{n}</b> {title}
      </span>
      <span>Harpoon Editorial System</span>
    </div>
  );
}

// Every page opens on the same production-line photograph under a teal wash, cropped differently per page.
// Photo: Homa Appliances on Unsplash.
const crops = {
  home: "50% 60%",
  audit: "20% 70%",
  foundations: "80% 40%",
  data: "40% 85%",
  components: "65% 75%",
  templates: "5% 50%",
} as const;

export function Hero({ title, crop, tall }: { title: string; crop: keyof typeof crops; tall?: boolean }) {
  return (
    <header className={tall ? "hero tall" : "hero"}>
      <div className="hero-img" aria-hidden style={{ backgroundPosition: crops[crop] }} />
      <div className="hero-titles">
        <span>{title}</span>
      </div>
    </header>
  );
}

export function SectionHead({ n, title, lead, id }: { n: string; title: string; lead?: React.ReactNode; id?: string }) {
  return (
    <header className="section-head" id={id}>
      <div className="sn">{n}</div>
      <div>
        <h2 className="h2">{title}</h2>
        {lead ? <p className="lead">{lead}</p> : null}
      </div>
    </header>
  );
}

export function NextUp({ current }: { current: string }) {
  const i = sections.findIndex((s) => s.href === current);
  const next = sections[i + 1];
  return (
    <footer className="colophon">
      <span>Harpoon Editorial System · Proposal v0.1</span>
      {next ? (
        <Link href={next.href}>
          Next: {next.n} {next.title} →
        </Link>
      ) : (
        <Link href="/">Back to introduction →</Link>
      )}
    </footer>
  );
}
