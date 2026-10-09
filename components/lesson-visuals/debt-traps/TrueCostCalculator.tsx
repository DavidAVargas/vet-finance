"use client";

import { useState } from "react";
import { VisualFrame } from "@/components/lesson-visuals/VisualFrame";
import { cn } from "@/lib/utils";

const PRICE = 35000;
const MONTHS = 72;
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

// Tiers and running costs match the "What a Car Actually Costs You" lesson.
const tiers = [
  { label: "Excellent", sub: "750+", apr: 0.07 },
  { label: "Good", sub: "700–749", apr: 0.11 },
  { label: "Fair", sub: "650–699", apr: 0.18 },
  { label: "Bad", sub: "Below 650", apr: 0.24 },
  { label: "Buy here pay here", sub: "", apr: 0.29 },
];

const running = [
  { label: "Insurance", cost: 175, fill: "bg-[#2e5a9a]" },
  { label: "Gas", cost: 150, fill: "bg-[#4f78b5]" },
  { label: "Maintenance & tires", cost: 100, fill: "bg-[#84a3d0]" },
  { label: "Registration & taxes", cost: 30, fill: "bg-[#b4c7e3]" },
];

const payment = (apr: number) => {
  const r = apr / 12;
  return (PRICE * r * (1 + r) ** MONTHS) / ((1 + r) ** MONTHS - 1);
};

const MAX_TOTAL = payment(0.29) + running.reduce((n, r) => n + r.cost, 0);

/** What a Car Actually Costs You: the full monthly cost of the same car at different credit tiers. */
export function TrueCostCalculator() {
  const [tierIndex, setTierIndex] = useState(0);
  const tier = tiers[tierIndex];
  const loan = payment(tier.apr);
  const parts = [{ label: `Loan payment (${Math.round(tier.apr * 100)}% APR)`, cost: loan, fill: "bg-navy" }, ...running];
  const monthly = parts.reduce((n, p) => n + p.cost, 0);

  return (
    <VisualFrame
      title="The real monthly cost of a $35,000 car"
      tryIt="Pick a credit tier to see what the same car costs"
      caption="72-month loan, nothing down. Insurance, gas, and upkeep are typical averages."
    >
      <div role="group" aria-label="Credit tier" data-nudge className="grid grid-cols-2 gap-2 rounded-lg sm:grid-cols-5">
        {tiers.map((t, i) => (
          <button
            key={t.label}
            type="button"
            aria-pressed={i === tierIndex}
            onClick={() => setTierIndex(i)}
            className={cn(
              "rounded-lg border px-3 py-2 text-left text-sm transition-colors",
              i === tierIndex
                ? "border-navy bg-navy text-white"
                : "border-border bg-card text-navy hover:border-brass-deep/60",
              i === tiers.length - 1 && "col-span-2 sm:col-span-1",
            )}
          >
            <span className="block font-bold leading-tight">{t.label}</span>
            <span className={cn("text-xs", i === tierIndex ? "text-[#c9d2e0]" : "text-muted-foreground")}>
              {t.sub ? `${t.sub} · ` : ""}
              {Math.round(t.apr * 100)}% APR
            </span>
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3" aria-live="polite">
        <div>
          <p className="text-sm text-muted-foreground">Every month</p>
          <p className="text-3xl font-extrabold tracking-tight text-navy tabular-nums">{usd(monthly)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Over 6 years</p>
          <p className="text-3xl font-extrabold tracking-tight text-navy tabular-nums">{usd(monthly * MONTHS)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Interest alone</p>
          <p
            className={cn(
              "text-3xl font-extrabold tracking-tight tabular-nums",
              tier.apr >= 0.24 ? "text-[#b42318]" : "text-navy",
            )}
          >
            {usd(loan * MONTHS - PRICE)}
          </p>
        </div>
      </div>

      {/* Stacked monthly bar, scaled to the worst case so tiers compare visually */}
      <div className="mt-5 flex h-5 overflow-hidden rounded-full bg-card ring-1 ring-border" aria-hidden="true">
        {parts.map((p) => (
          <div key={p.label} className={cn("h-full transition-all duration-300", p.fill)} style={{ width: `${((p.cost / MAX_TOTAL) * 100).toFixed(2)}%` }} />
        ))}
      </div>

      <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
        {parts.map((p) => (
          <li key={p.label} className="flex items-center gap-2 text-sm">
            <span className={cn("size-3 shrink-0 rounded-sm", p.fill)} aria-hidden="true" />
            <span className="flex-1 text-muted-foreground">{p.label}</span>
            <span className="font-semibold text-navy tabular-nums">{usd(p.cost)}</span>
          </li>
        ))}
      </ul>
    </VisualFrame>
  );
}
