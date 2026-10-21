export const docs = {
  report: { title: "Findings report", file: "harpoon-report-template.pdf" },
  proposal: { title: "Proposal", file: "harpoon-proposal-template.pdf" },
  "one-pager": { title: "Service one-pager", file: "harpoon-one-pager-template.pdf" },
} as const;

export type DocKey = keyof typeof docs;
