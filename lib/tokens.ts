// Single source of truth for the proposed system. The site, the A4 templates
// and /tokens.json all read from here, so a change lands everywhere at once.

export const colour = {
  brand: [
    { name: "Hook Teal", token: "teal-500", hex: "#19BFB7", role: "The logo hook. Brand mark, cover accents, one highlight per page. Never body text." },
    { name: "Deep Teal", token: "teal-700", hex: "#0B7F7A", role: "Text-safe teal: links, figures, section numbers, rules. 4.6:1 on Paper." },
    { name: "Abyss", token: "ink-900", hex: "#0B1F26", role: "Primary ink and dark surfaces. Replaces the photographic cover backgrounds." },
    { name: "Paper", token: "paper-50", hex: "#F6F4EF", role: "Default page. Warm, not grey, so it reads as stock rather than screen." },
  ],
  teal: [
    { token: "teal-50", hex: "#E6F7F6" },
    { token: "teal-100", hex: "#C2EDEA" },
    { token: "teal-300", hex: "#6FD6D0" },
    { token: "teal-500", hex: "#19BFB7" },
    { token: "teal-700", hex: "#0B7F7A" },
    { token: "teal-800", hex: "#0A5F5C" },
    { token: "teal-900", hex: "#083F3E" },
  ],
  neutral: [
    { token: "ink-900", hex: "#0B1F26" },
    { token: "ink-700", hex: "#2C3E44" },
    { token: "steel-500", hex: "#5B6B70" },
    { token: "steel-300", hex: "#9AA6A9" },
    { token: "steel-100", hex: "#D9DEDC" },
    { token: "paper-100", hex: "#ECE9E2" },
    { token: "paper-50", hex: "#F6F4EF" },
  ],
  signal: { token: "signal-500", hex: "#D9822B", role: "Hazard amber. Warnings and the single most important number on a page. Used at most once per spread." },
  retired: [
    { hex: "#00BCD4", where: "Cover title, 'OT Security' prefixes, footer band", why: "A second cyan, not the logo's teal. It is also Material Design's stock Cyan 500, which is part of why the brochure reads as templated." },
    { hex: "#A3E0E9", where: "Every content box", why: "Tints everything, so nothing is emphasised." },
  ],
} as const;

export const dataviz = {
  categorical: [
    { slot: 1, name: "Teal", hex: "#00918A" },
    { slot: 2, name: "Ochre", hex: "#C9731C" },
    { slot: 3, name: "Iris", hex: "#6C5BB0" },
    { slot: 4, name: "Other", hex: "#9AA6A9" },
  ],
  sequential: ["#E6F7F6", "#B4E6E2", "#6FD6D0", "#2BB3AC", "#0B7F7A", "#083F3E"],
  surface: "#F6F4EF",
} as const;

// Print sizes in points; screen sizes are derived (1pt = 1.333px).
export const type = [
  { token: "display", family: "head", weight: 700, size: 44, leading: 49, tracking: -0.02, use: "Covers and section openers only." },
  { token: "h1", family: "head", weight: 700, size: 30, leading: 35, tracking: -0.015, use: "Page title. One per page." },
  { token: "h2", family: "head", weight: 600, size: 20, leading: 24.5, tracking: -0.01, use: "Section heads within a page." },
  { token: "h3", family: "head", weight: 700, size: 11, leading: 14, tracking: 0, use: "Sub-heads, table titles, box heads." },
  { token: "lead", family: "body", weight: 400, size: 12.5, leading: 17.5, tracking: 0, use: "Standfirst under a title. Two to four lines." },
  { token: "body", family: "body", weight: 400, size: 9, leading: 14, tracking: 0, use: "Running text. 55 to 75 characters per line." },
  { token: "ui", family: "body", weight: 400, size: 8.5, leading: 14, tracking: 0, use: "Tables, lists, deliverables, form-like content." },
  { token: "caption", family: "body", weight: 400, size: 7, leading: 10.5, tracking: 0.005, use: "Figure captions and sources." },
  { token: "label", family: "mono", weight: 500, size: 7, leading: 10.5, tracking: 0.08, use: "Eyebrows, folios, running heads, standards refs, chart labels. Uppercase." },
  { token: "legal", family: "body", weight: 400, size: 6.5, leading: 9, tracking: 0.01, use: "Back page only. Nothing in the system is set smaller." },
] as const;

export const families = {
  head: { name: "Visby CF", css: "'Visby CF', 'Urbanist Variable', sans-serif", why: "Harpoon's own geometric face, already in the logo. Bold weights only, for titles, section heads and sub-heads." },
  body: { name: "Poppins", css: "'Poppins', system-ui, sans-serif", why: "Harpoon's text face. Open and even, it stays readable at 9pt in reports and holds up in dense deliverable lists." },
  mono: { name: "IBM Plex Mono", css: "'IBM Plex Mono', ui-monospace, monospace", why: "For technical detail and data: folios, labels, IEC 62443 clause numbers, durations, chart axes and values." },
} as const;

export const grid = {
  page: { name: "A4", widthMm: 210, heightMm: 297 },
  margins: { topMm: 20, bottomMm: 20, insideMm: 18, outsideMm: 16 },
  columns: 12,
  gutterMm: 4,
  baselinePt: 14,
  subBaselinePt: 3.5,
} as const;

export const spacing = [
  { token: "space-1", pt: 3.5 },
  { token: "space-2", pt: 7 },
  { token: "space-3", pt: 14 },
  { token: "space-4", pt: 21 },
  { token: "space-5", pt: 28 },
  { token: "space-6", pt: 42 },
  { token: "space-7", pt: 56 },
] as const;

export const columnWidthMm =
  (grid.page.widthMm - grid.margins.insideMm - grid.margins.outsideMm - (grid.columns - 1) * grid.gutterMm) / grid.columns;
