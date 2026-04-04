"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!mounted) {
    return null;
  }

  return (
    <Button
      size="icon"
      className="group cursor-pointer"
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="text-dark size-4" />
      ) : (
        <Moon className="text-dark size-4" />
      )}

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
