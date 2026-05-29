import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aurum Detail — Concours-Grade Automotive Detailing",
    template: "%s | Aurum Detail",
  },
  description:
    "Los Angeles' premier luxury automotive detailing studio. Concours-grade paint correction, ceramic coating, and protection for discerning collectors.",
  keywords: ["luxury car detailing", "ceramic coating", "paint correction", "Los Angeles", "concours", "automotive"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Aurum Detail",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-ink text-frost antialiased noise">
        <SmoothScrollProvider>
          <CustomCursor />
          <Nav />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
