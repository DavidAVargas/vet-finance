"use client";

import { Toaster } from "@/components/ui/sonner";

// The site is light-only, so there's no theme provider: nothing ever adds the `dark` class.
// (next-themes was removed; its injected <script> triggered React 19's client script warning.)
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster position="top-right" />
    </>
  );
}
