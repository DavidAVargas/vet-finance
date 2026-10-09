"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { VisualFrame } from "@/components/lesson-visuals/VisualFrame";
import { cn } from "@/lib/utils";

const RATINGS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const MAX_CONDITIONS = 6;

// 2026 monthly compensation, veteran alone (effective Dec 1, 2025).
const PAY: Record<number, number> = {
  0: 0, 10: 180.42, 20: 356.66, 30: 552.47, 40: 795.84, 50: 1132.9,
  60: 1435.02, 70: 1808.45, 80: 2102.15, 90: 2362.3, 100: 3938.58,
};

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

/** VA "whole person" math: each rating applies only to what's left of the whole person. */
function combine(ratings: number[]) {
  const sorted = [...ratings].sort((a, b) => b - a);
  let remaining = 100;
  const steps = sorted.map((r) => {
    const take = (remaining * r) / 100;
    remaining -= take;
    return { r, take, combined: 100 - remaining };
  });
  const exact = 100 - remaining;
  const whole = Math.round(exact);
  const final = Math.min(100, Math.round(whole / 10) * 10);
  return { steps, whole, final };
}

/** How Ratings Work: a calculator for combined VA disability ratings. */
export function CombinedRating() {
  const [ratings, setRatings] = useState<number[]>([40, 20, 10]);
  const { steps, whole, final } = combine(ratings);

  const add = (r: number) => setRatings((prev) => (prev.length < MAX_CONDITIONS ? [...prev, r] : prev));
  const remove = (i: number) => setRatings((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <VisualFrame
      title="VA math: combining your ratings"
      tryIt="Add or remove condition ratings to see your combined rating"
      caption="Simplified: VA also applies a bilateral factor when both arms or both legs are affected. 2026 rates for a veteran with no dependents."
    >
      <p className="text-sm font-semibold text-navy">Add a condition</p>
      <div role="group" aria-label="Add a condition rating" data-nudge className="mt-2 flex flex-wrap gap-1.5 rounded-full">
        {RATINGS.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => add(r)}
            disabled={ratings.length >= MAX_CONDITIONS}
            className="flex items-center gap-1 rounded-full border border-brass-deep/50 bg-card px-3 py-1.5 text-sm font-semibold text-navy tabular-nums hover:bg-secondary disabled:opacity-40"
          >
            <Plus className="size-3.5" aria-hidden="true" />
            {r}%
          </button>
        ))}
      </div>

      <p className="mt-5 text-sm font-semibold text-navy">Your conditions, largest first</p>
      {steps.length ? (
        <ol className="mt-2 flex flex-col gap-2">
          {steps.map((s, i) => (
            <li key={i} className="flex items-center gap-3 rounded-xl bg-card px-4 py-2.5 text-sm ring-1 ring-border">
              <span className="w-12 font-bold text-navy tabular-nums">{s.r}%</span>
              <span className="flex-1 text-muted-foreground">
                {i === 0 ? `${s.r}% of 100` : `${s.r}% of the remaining ${(100 - steps[i - 1].combined).toFixed(1)}`} ={" "}
                <span className="font-semibold text-navy tabular-nums">+{s.take.toFixed(1)}</span>
                <span className="hidden sm:inline"> → {s.combined.toFixed(1)}% combined</span>
              </span>
              <button
                type="button"
                onClick={() => remove(ratings.indexOf(s.r))}
                aria-label={`Remove ${s.r}% condition`}
                className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-navy"
              >
                <X className="size-4" />
              </button>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">Add a condition above to start.</p>
      )}

      <div aria-live="polite" className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-card p-4 ring-1 ring-border">
          <p className="text-xs text-muted-foreground">Simple addition says</p>
          <p className="mt-1 text-2xl font-extrabold text-muted-foreground line-through tabular-nums">
            {Math.min(ratings.reduce((n, r) => n + r, 0), 999)}%
          </p>
        </div>
        <div className="rounded-2xl bg-card p-4 ring-1 ring-border">
          <p className="text-xs text-muted-foreground">VA math: {whole}%, rounded to</p>
          <p className="mt-1 text-2xl font-extrabold text-navy tabular-nums">{final}%</p>
        </div>
        <div className={cn("rounded-2xl p-4", final ? "bg-navy text-white" : "bg-card ring-1 ring-border")}>
          <p className={cn("text-xs", final ? "text-[#c9d2e0]" : "text-muted-foreground")}>Monthly, tax-free (2026)</p>
          <p className={cn("mt-1 text-2xl font-extrabold tabular-nums", final ? "text-brass" : "text-navy")}>{usd(PAY[final])}</p>
        </div>
      </div>
    </VisualFrame>
  );
}
