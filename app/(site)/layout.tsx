import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
