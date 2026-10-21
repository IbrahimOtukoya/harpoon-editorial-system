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

// Each page opens on a different crop of the same cabinet, the way a guidelines book returns to one object.
const crops = {
  home: { size: "auto 118%", pos: "88% 20%" },
  audit: { size: "auto 330%", pos: "76% 42%" },
  foundations: { size: "auto 260%", pos: "100% 0%" },
  data: { size: "auto 280%", pos: "100% 92%" },
  components: { size: "auto 240%", pos: "0% 62%" },
  templates: { size: "auto 200%", pos: "92% 96%" },
} as const;

export function Hero({ title, crop, tall }: { title: string; crop: keyof typeof crops; tall?: boolean }) {
  const c = crops[crop];
  return (
    <header className={tall ? "hero tall" : "hero"}>
      <div className="hero-img" aria-hidden style={{ backgroundSize: c.size, backgroundPosition: c.pos }} />
      <div className="hero-titles">
        <span>Harpoon</span>
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
