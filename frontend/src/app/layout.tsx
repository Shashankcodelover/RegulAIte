import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { AnalysisProvider } from "@/lib/analysisContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RegulAIte | AI Legal Simplifier & Extraction Engine",
  description:
    "RegulAIte uses agentic AI to analyse contracts, surface hidden risks, simulate legal debates, and generate compliant rewrites — in seconds.",
  keywords: [
    "AI contract analysis",
    "legal AI",
    "GDPR compliance",
    "contract risk scoring",
    "legal simplifier",
    "clause extraction",
    "AI legal engine",
  ],
  authors: [{ name: "RegulAIte" }],
  openGraph: {
    title: "RegulAIte | AI Legal Simplifier & Extraction Engine",
    description:
      "Agentic AI for contract risk analysis, compliance scoring, and clause rewriting.",
    type: "website",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><text y='26' font-size='28'>⚖️</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AnalysisProvider>{children}</AnalysisProvider>
      </body>
    </html>
  );
}
