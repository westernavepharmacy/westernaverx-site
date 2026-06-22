import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Western Ave Pharmacy — Glendale's Neighborhood Pharmacy",
    template: "%s · Western Ave Pharmacy",
  },
  description:
    "Western Ave Pharmacy in Glendale, CA — over-the-counter essentials, vitamins, first aid, and beer & wine delivered or ready for pickup, plus specialized long-term care pharmacy services for senior living facilities.",
  metadataBase: new URL("https://westernaverx.com"),
  openGraph: {
    title: "Western Ave Pharmacy",
    description:
      "Your neighborhood pharmacy in Glendale — online ordering, local delivery, and long-term care services.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
