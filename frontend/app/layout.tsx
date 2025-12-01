import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StoryVault Steward | DeFi Life Curator",
  description:
    "AI-powered DeFi curator that analyzes your life story to recommend personalized yield strategies on Fraxtal",
  keywords: ["DeFi", "Fraxtal", "AI", "Yield", "Strategy", "Blockchain"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

