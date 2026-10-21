import { notFound } from "next/navigation";
import { OnePager, ProposalCover, ProposalPlan, ProposalScope, ReportCover, ReportFindings, ReportSummary } from "@/components/sheets";
import { docs, type DocKey } from "@/lib/docs";

export function generateStaticParams() {
  return Object.keys(docs).map((doc) => ({ doc }));
}

const pages: Record<DocKey, React.ReactNode[]> = {
  report: [<ReportCover key="c" />, <ReportSummary key="s" />, <ReportFindings key="f" />],
  proposal: [<ProposalCover key="c" />, <ProposalScope key="s" />, <ProposalPlan key="p" />],
  "one-pager": [<OnePager key="o" />],
};

export default async function PrintDoc({ params }: { params: Promise<{ doc: string }> }) {
  const { doc } = await params;
  if (!(doc in docs)) notFound();
  return (
    <div className="print-stack" style={{ display: "grid", gap: 24, padding: 24, justifyContent: "center", gridTemplateColumns: "minmax(0, 794px)" }}>
      {pages[doc as DocKey]}
    </div>
  );
}
