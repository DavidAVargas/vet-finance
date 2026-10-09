"use client";

import { useState } from "react";
import { Lock, LockOpen, ShieldCheck } from "lucide-react";
import { VisualFrame } from "@/components/lesson-visuals/VisualFrame";
import { cn } from "@/lib/utils";

const BUREAUS = ["Equifax", "TransUnion", "Experian"];

/** Freeze Your Credit: a three-step checklist to tick off as each bureau gets frozen. */
export function FreezeChecklist() {
  const [frozen, setFrozen] = useState<string[]>([]);
  const done = frozen.length === BUREAUS.length;

  const toggle = (b: string) =>
    setFrozen((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));

  return (
    <VisualFrame
      title="Your freeze checklist"
      caption="Tap each bureau once you've frozen it. A freeze is free, and you can lift it any time you apply for something."
    >
      <ul className="grid gap-3 sm:grid-cols-3">
        {BUREAUS.map((b) => {
          const on = frozen.includes(b);
          return (
            <li key={b}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => toggle(b)}
                className={cn(
                  "flex w-full flex-col items-center rounded-2xl p-5 text-center transition-colors",
                  on ? "bg-navy text-white" : "bg-card text-navy ring-1 ring-border hover:ring-navy/40",
                )}
              >
                <span
                  className={cn(
                    "flex size-12 items-center justify-center rounded-full",
                    on ? "bg-white/10" : "bg-secondary",
                  )}
                >
                  {on ? (
                    <Lock className="size-6 text-brass" aria-hidden="true" />
                  ) : (
                    <LockOpen className="size-6 text-navy" aria-hidden="true" />
                  )}
                </span>
                <span className="mt-3 font-bold">{b}</span>
                <span className={cn("mt-0.5 text-sm", on ? "text-[#c9d2e0]" : "text-muted-foreground")}>
                  {on ? "Frozen" : "Not frozen yet"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div
        aria-live="polite"
        className={cn(
          "mt-4 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold",
          done ? "bg-emerald-50 text-emerald-800" : "bg-card text-navy ring-1 ring-border",
        )}
      >
        <ShieldCheck className={cn("size-5 shrink-0", done ? "text-emerald-700" : "text-muted-foreground")} aria-hidden="true" />
        {done
          ? "All three frozen. Nobody can open new credit in your name."
          : `${frozen.length} of 3 frozen. A freeze only protects you once all three are done.`}
      </div>
    </VisualFrame>
  );
}
