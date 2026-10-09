"use client";

import { useState } from "react";
import { CircleCheck } from "lucide-react";
import { VisualFrame } from "@/components/lesson-visuals/VisualFrame";
import { cn } from "@/lib/utils";

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const cards = [
  { name: "Amex Platinum", issuer: "American Express", fee: 895 },
  { name: "Chase Sapphire Reserve", issuer: "Chase", fee: 795 },
  { name: "Capital One Venture X", issuer: "Capital One", fee: 395 },
  { name: "Amex Gold", issuer: "American Express", fee: 325 },
  { name: "Chase Sapphire Preferred", issuer: "Chase", fee: 95 },
];

/** Military Benefits: what annual fee waivers are worth on active duty. */
export function FeeWaivers() {
  const [picked, setPicked] = useState<string[]>(["Amex Platinum", "Chase Sapphire Reserve"]);
  const total = cards.filter((c) => picked.includes(c.name)).reduce((n, c) => n + c.fee, 0);

  const toggle = (name: string) =>
    setPicked((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));

  return (
    <VisualFrame
      title="Annual fees waived on active duty"
      tryIt="Tap the cards you'd want to hold"
      caption="Fees and policies change. You usually have to ask: call each issuer and request SCRA/MLA benefits with your orders."
    >
      <ul data-nudge className="grid gap-2 rounded-xl sm:grid-cols-2">
        {cards.map((c) => {
          const on = picked.includes(c.name);
          return (
            <li key={c.name}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => toggle(c.name)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors",
                  on ? "bg-navy text-white" : "bg-card text-navy ring-1 ring-border hover:ring-brass-deep/60",
                )}
              >
                <CircleCheck
                  className={cn("size-5 shrink-0", on ? "text-brass" : "text-muted-foreground/40")}
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold">{c.name}</span>
                  <span className={cn("text-xs", on ? "text-[#c9d2e0]" : "text-muted-foreground")}>{c.issuer}</span>
                </span>
                <span className={cn("text-sm font-bold tabular-nums", on ? "line-through decoration-brass decoration-2" : "")}>
                  {usd(c.fee)}/yr
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div aria-live="polite" className="mt-5 flex flex-wrap items-end justify-between gap-3 rounded-2xl bg-emerald-50 p-5 ring-1 ring-emerald-200">
        <div>
          <p className="text-sm font-semibold text-emerald-800">You&apos;d pay in annual fees</p>
          <p className="text-3xl font-extrabold text-emerald-700 tabular-nums">$0</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-emerald-800">Civilians would pay</p>
          <p className="text-xl font-bold text-navy tabular-nums">{usd(total)}/yr</p>
        </div>
      </div>
    </VisualFrame>
  );
}
