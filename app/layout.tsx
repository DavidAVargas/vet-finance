import type { Metadata } from "next";
import { inter } from "@/utils/fonts";
import Providers from "@/components/DarkLightMode/providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Vet Finance",
  description: "Free financial education for military members and veterans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <Providers>
          <div className="grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
