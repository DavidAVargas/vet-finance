"use client";

import { useId, useState } from "react";
import { VisualFrame } from "@/components/lesson-visuals/VisualFrame";

const LIMIT = 72000; // 2026 total TSP limit (IRC 415(c))
const YEARS = 25;
const GROWTH = 0.07;
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** The Combat Zone TSP Trick: tax-exempt Roth contributions from one deployment, grown over 25 years. */
export function CombatRoth() {
  const [months, setMonths] = useState(6);
  const [monthly, setMonthly] = useState(2000);
  const monthsId = useId();
  const monthlyId = useId();
  const raw = months * monthly;
  const contributed = Math.min(raw, LIMIT);
  const future = Math.round(contributed * (1 + GROWTH) ** YEARS);

  return (
    <VisualFrame
      title="One deployment, never taxed"
      tryIt="Set your deployment length and monthly Roth TSP contribution"
      caption="Assumes 7% average annual growth over 25 years. Past returns don't guarantee future results."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={monthsId} className="block text-sm font-semibold text-navy">
            Months deployed: <span className="text-lg font-extrabold tabular-nums">{months}</span>
          </label>
          <input
            id={monthsId}
            type="range"
            min={3}
            max={12}
            step={1}
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            data-nudge
            aria-valuetext={`${months} months`}
            className="mt-2 w-full rounded-full accent-brass-deep"
          />
        </div>
        <div>
          <label htmlFor={monthlyId} className="block text-sm font-semibold text-navy">
            Into Roth TSP each month: <span className="text-lg font-extrabold tabular-nums">{usd(monthly)}</span>
          </label>
          <input
            id={monthlyId}
            type="range"
            min={500}
            max={8000}
            step={250}
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))}
            aria-valuetext={`${usd(monthly)} per month`}
            className="mt-2 w-full rounded-full accent-brass-deep"
          />
        </div>
      </div>

      <div aria-live="polite" className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-card p-4 ring-1 ring-border">
          <p className="text-xs text-muted-foreground">Tax-exempt contributions</p>
          <p className="mt-1 text-2xl font-extrabold text-navy tabular-nums">{usd(contributed)}</p>
        </div>
        <div className="rounded-2xl bg-card p-4 ring-1 ring-border">
          <p className="text-xs text-muted-foreground">Worth in {YEARS} years</p>
          <p className="mt-1 text-2xl font-extrabold text-emerald-700 tabular-nums">{usd(future)}</p>
        </div>
        <div className="rounded-2xl bg-navy p-4 text-white">
          <p className="text-xs text-[#c9d2e0]">Taxes you&apos;ll ever pay on it</p>
          <p className="mt-1 text-2xl font-extrabold text-brass">$0</p>
        </div>
      </div>

      {raw > LIMIT && (
        <p className="mt-3 text-sm font-semibold text-[#b42318]">
          Capped at the 2026 limit of {usd(LIMIT)}. Anything above that gets returned.
        </p>
      )}
    </VisualFrame>
  );
}
