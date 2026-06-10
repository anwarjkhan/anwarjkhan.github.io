import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "JobPilot — your autonomous job-search agent",
  description:
    "Finds your ideal jobs twice a day, tailors your CV and cover letter to each spec, and triages your application inbox.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
          margin: 0,
          color: "#111",
          background: "#fafafa",
        }}
      >
        <div style={{ maxWidth: 860, margin: "0 auto", padding: 24 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
