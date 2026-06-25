import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Retail site shell — header + footer wrap every page except the welcome splash at "/".
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
