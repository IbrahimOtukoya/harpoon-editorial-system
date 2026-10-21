import type { Metadata } from "next";
import "./globals.css";
import "./sheet.css";

export const metadata: Metadata = {
  title: "Harpoon Editorial System",
  description: "An audit of Harpoon Consulting's printed materials and a proposed editorial system: type, colour, grid, data visualisation and templates.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}
