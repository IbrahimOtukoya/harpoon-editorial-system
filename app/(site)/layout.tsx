import { Index } from "@/components/Index";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell">
      <Index />
      <main>{children}</main>
    </div>
  );
}
