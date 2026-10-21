"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sections } from "@/lib/nav";

export function Index() {
  const path = usePathname();
  return (
    <nav className="index no-print" aria-label="Contents">
      <Link href="/" className="index-brand">
        <img src="/harpoon-logo-ink.png" alt="Harpoon" width={1189} height={226} />
        <span>Editorial System</span>
      </Link>
      <ol>
        {sections.map((s) => {
          const current = s.href === "/" ? path === "/" : path.startsWith(s.href);
          return (
            <li key={s.href}>
              <Link href={s.href} aria-current={current ? "page" : undefined}>
                <span className="n">{s.n}</span>
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
