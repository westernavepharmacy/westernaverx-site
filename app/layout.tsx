import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

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
  verification: { google: "kGRDdwk3YzUlQwWEATJORWiEqmFk7YmA7O6kcUEfd7s" },
  keywords: [
    "pharmacy Glendale",
    "Glendale CA pharmacy",
    "over the counter medicine delivery Glendale",
    "beer wine delivery Glendale",
    "vitamins first aid Glendale",
    "long-term care pharmacy Los Angeles",
    "pharmacy near me",
  ],
  openGraph: {
    title: "Western Ave Pharmacy — Glendale's Neighborhood Pharmacy",
    description:
      "Your neighborhood pharmacy in Glendale — online ordering, local delivery, and long-term care services.",
    url: "https://westernaverx.com",
    siteName: "Western Ave Pharmacy",
    type: "website",
    locale: "en_US",
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: "Western Ave Pharmacy — Glendale, CA" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Western Ave Pharmacy — Glendale's Neighborhood Pharmacy",
    description:
      "Over-the-counter essentials, vitamins, first aid, and beer & wine — delivered or ready for pickup in Glendale.",
    images: ["/og.jpg"],
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
