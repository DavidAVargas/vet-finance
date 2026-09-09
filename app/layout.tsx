import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { inter } from "@/utils/fonts";
import Providers from "@/components/DarkLightMode/providers";
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
    <ClerkProvider afterSignUpUrl="/courses" afterSignInUrl="/courses">
      <html lang="en" suppressHydrationWarning>
        <body className={inter.variable}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
