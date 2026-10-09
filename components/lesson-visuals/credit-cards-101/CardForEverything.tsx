"use client";

import { useState } from "react";
import { VisualFrame } from "@/components/lesson-visuals/VisualFrame";
import { cn } from "@/lib/utils";

const SPEND = 500;

// Cards and rates from the "A Card for Everything" lesson's example stack.
const categories = [
  { label: "Dining", card: "Amex Gold", rate: 4, unit: "points" },
  { label: "Groceries", card: "Amex Gold", rate: 4, unit: "points" },
  { label: "Travel", card: "Chase Sapphire Reserve", rate: 3, unit: "points" },
  { label: "Gas", card: "Costco Anywhere Visa", rate: 4, unit: "cash" },
  { label: "Everything else", card: "Citi Double Cash", rate: 2, unit: "cash" },
] as const;

const fmt = (n: number, unit: "points" | "cash") =>
  unit === "points"
    ? `${n.toLocaleString("en-US")} points`
    : n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** A Card for Everything: the right card for each category vs. a basic 1x card. */
export function CardForEverything() {
  const [index, setIndex] = useState(0);
  const c = categories[index];
  const best = c.unit === "points" ? SPEND * c.rate : (SPEND * c.rate) / 100;
  const basic = c.unit === "points" ? SPEND : SPEND / 100;

  return (
    <VisualFrame
      title="Which card for this purchase?"
      tryIt="Pick a category to see the best card for it"
      caption="Example: $500 a month in one category. Rates change, so check your cards' current terms."
    >
      <div role="group" aria-label="Spending category" data-nudge className="flex flex-wrap gap-2 rounded-full">
        {categories.map((cat, i) => (
          <button
            key={cat.label}
            type="button"
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              i === index ? "border-navy bg-navy text-white" : "border-brass-deep/50 bg-card text-navy hover:bg-secondary",
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2" aria-live="polite">
        <div className="rounded-2xl bg-card p-5 ring-2 ring-emerald-600">
          <p className="text-xs font-semibold tracking-[0.12em] text-emerald-700 uppercase">Use this card</p>
          <p className="mt-1 text-lg font-bold text-navy">{c.card}</p>
          <p className="text-sm text-muted-foreground">
            {c.rate}
            {c.unit === "points" ? "x points" : "% back"} on {c.label.toLowerCase()}
          </p>
          <p className="mt-3 text-2xl font-extrabold text-emerald-700 tabular-nums">{fmt(best, c.unit)}</p>
        </div>
        <div className="rounded-2xl bg-card p-5 ring-1 ring-border">
          <p className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">Instead of</p>
          <p className="mt-1 text-lg font-bold text-navy">A basic card</p>
          <p className="text-sm text-muted-foreground">{c.unit === "points" ? "1x points" : "1% back"} on everything</p>
          <p className="mt-3 text-2xl font-extrabold text-muted-foreground tabular-nums">{fmt(basic, c.unit)}</p>
        </div>
      </div>

      <p className="mt-4 rounded-xl bg-navy px-4 py-3 text-sm text-white">
        Same ${SPEND}, <span className="font-bold text-brass">{c.rate}x the rewards</span>, just by pulling out the right card.
      </p>
    </VisualFrame>
  );
}
