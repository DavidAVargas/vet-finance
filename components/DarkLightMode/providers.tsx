"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { ThemeToggle } from "@/components/DarkLightMode/theme-toggle";

// ThemeProvider must SSR so next-themes injects its inline script in HTML; deferring it to post-hydration triggers React 19’s client <script> warning.
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider enableSystem attribute="class" defaultTheme="system">
      {children}
      <ToasterProvider />
      <div className="fixed right-6 bottom-6">
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}

function ToasterProvider() {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      position="top-right"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}
