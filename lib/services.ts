// Service catalogue as published in the September 2025 brochure.
// Durations are the brochure's own "Delivery Timeline" figures, in weeks.

export type Stage = "Diagnose" | "Design" | "Build" | "Operate";

export type Service = {
  name: string;
  stage: Stage;
  page: number;
  minWeeks?: number;
  maxWeeks?: number;
  term?: string;
  published: string;
};

export const stages: { name: Stage; line: string }[] = [
  { name: "Diagnose", line: "Gaining clarity is the first step to control." },
  { name: "Design", line: "Turning insight into a clear, actionable plan." },
  { name: "Build", line: "Turning plans into tangible protection." },
  { name: "Operate", line: "Embedding resilience for the long term." },
];

export const services: Service[] = [
  { name: "OT Risk & Visibility Insight", stage: "Diagnose", page: 7, minWeeks: 4, maxWeeks: 6, published: "4-6 Weeks" },
  { name: "Compliance Assessment", stage: "Diagnose", page: 8, minWeeks: 3, maxWeeks: 5, published: "3-5 Weeks" },
  { name: "Programme Diagnostic", stage: "Diagnose", page: 9, minWeeks: 2, maxWeeks: 4, published: "2-4 Weeks" },
  { name: "Roadmap & Strategy", stage: "Design", page: 12, minWeeks: 4, maxWeeks: 6, published: "4-6 Weeks" },
  { name: "Change Management Planning", stage: "Design", page: 13, minWeeks: 6, maxWeeks: 8, published: "6-8 Weeks" },
  { name: "Architecture & Segmentation", stage: "Design", page: 14, minWeeks: 6, maxWeeks: 10, published: "6-10 Weeks" },
  { name: "Programme Design Workshops", stage: "Design", page: 15, minWeeks: 1, maxWeeks: 2, published: "1-2 Weeks" },
  { name: "Build & Implement", stage: "Build", page: 18, minWeeks: 10, maxWeeks: 12, published: "10-12 Weeks" },
  { name: "Project Delivery", stage: "Build", page: 19, minWeeks: 26, maxWeeks: 78, published: "Typically 6-18 Months" },
  { name: "Change Execution", stage: "Build", page: 20, minWeeks: 8, maxWeeks: 12, published: "8-12 Weeks" },
  { name: "Operating Model Design", stage: "Operate", page: 23, minWeeks: 8, maxWeeks: 12, published: "Typically 8-12 Weeks" },
  { name: "CISO as a Service", stage: "Operate", page: 24, term: "3, 6 or 12 months", published: "Ongoing; typical terms 3, 6 or 12 months with agreed monthly cadence." },
  { name: "Advisory", stage: "Operate", page: 25, term: "Blocks of 5, 10, 20 or 30 days", published: "On-demand, typically in blocks of 5, 10, 20 or 30 days." },
  { name: "Embedded Practitioners", stage: "Operate", page: 26, term: "3, 6 or 12 months", published: "Fixed terms of 3, 6 or 12 months (extendable), start-ready typically within 2–4 weeks." },
  { name: "Staff Augmentation", stage: "Operate", page: 27, term: "3, 6 or 12 months", published: "Engagements typically run for 3, 6 or 12 months" },
];
