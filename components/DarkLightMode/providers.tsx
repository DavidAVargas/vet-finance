"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

// The site is light-only. ThemeProvider stays so next-themes keeps the `light` class pinned
// (and clears any `dark` preference left in a returning visitor's localStorage).
// It must SSR so next-themes injects its inline script in HTML; deferring it to post-hydration triggers React 19’s client <script> warning.
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" forcedTheme="light" enableSystem={false}>
      {children}
      <Toaster position="top-right" theme="light" />
    </ThemeProvider>
  );
}
