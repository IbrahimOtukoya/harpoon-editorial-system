import { colour, dataviz, families, grid, spacing, type } from "@/lib/tokens";

export const dynamic = "force-static";

export function GET() {
  return Response.json({ name: "Harpoon Editorial System", version: "0.1.0", colour, dataviz, type, families, grid, spacing });
}
