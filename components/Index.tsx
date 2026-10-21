"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sections } from "@/lib/nav";

export function Index() {
  const path = usePathname();
  return (
    <nav className="index no-print" aria-label="Contents">
      <Link href="/" className="index-brand">
        <img src="/harpoon-logo-green.png" alt="Harpoon, OT Cybersecurity Consultants" width={300} height={61} />
      </Link>
      <ol>
        {sections.map((s) => {
          const current = s.href === "/" ? path === "/" : path.startsWith(s.href);
          return (
            <li key={s.href}>
              <Link href={s.href} aria-current={current ? "page" : undefined}>
                <span className="n">{Number(s.n)}</span>
                {s.title}
              </Link>
            </li>
          );
        })}
      </ol>
      <div className="index-foot">
        Proposal v0.1
        <br />
        Prepared by Ibrahim Otukoya
        <br />
        October 2026
      </div>
    </nav>
  );
}
