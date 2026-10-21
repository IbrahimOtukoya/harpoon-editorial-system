# Harpoon Editorial System

An audit of Harpoon Consulting's current printed materials and a proposed editorial system: colour, typography, grid, data visualisation, components and A4 templates.

Built with Next.js (App Router), deployed on Vercel.

## Run locally

```bash
npm install
npm run dev
```

## Structure

- `lib/tokens.ts` holds every colour, type, grid and spacing value. The site, the A4 sheets and `/tokens.json` all read from it.
- `lib/services.ts` holds the service catalogue and delivery timelines from the September 2025 brochure.
- `components/sheets.tsx` holds the A4 templates (report, proposal, one-pager, divider). Sizes inside a sheet are in points, scaled to the sheet's width with container query units, so they print at true size.
- `/print/[doc]` renders a template as bare A4 pages for printing or PDF export. `public/downloads/` holds the exported PDFs.
