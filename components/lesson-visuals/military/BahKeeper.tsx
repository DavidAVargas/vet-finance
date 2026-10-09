"use client";

import { useId, useState } from "react";
import { VisualFrame } from "@/components/lesson-visuals/VisualFrame";

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
// A civilian raise is hit by ~22% federal income tax + 7.65% payroll tax; BAH is hit by neither.
const CIVILIAN_KEEP_RATE = 1 - 0.22 - 0.0765;

/** BAH, BAS, and the Tax-Free Advantage: what you keep when housing costs less than your BAH. */
export function BahKeeper() {
  const [bah, setBah] = useState(2200);
  const [rent, setRent] = useState(1800);
  const bahId = useId();
  const rentId = useId();
  const diff = bah - rent;
  const yearly = diff * 12;
  const civilianEquivalent = Math.round(yearly / CIVILIAN_KEEP_RATE / 100) * 100;

  return (
    <VisualFrame
      title="What your BAH leaves in your pocket"
      tryIt="Set your BAH and what you'd pay for housing"
      caption="Civilian comparison assumes a 22% federal bracket plus payroll taxes. BAH also isn't taxed by states."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={bahId} className="block text-sm font-semibold text-navy">
            Your BAH: <span className="text-lg font-extrabold tabular-nums">{usd(bah)}/mo</span>
          </label>
          <input
            id={bahId}
            type="range"
            min={1000}
            max={4500}
            step={50}
            value={bah}
            onChange={(e) => setBah(Number(e.target.value))}
            data-nudge
            aria-valuetext={`${usd(bah)} per month`}
            className="mt-2 w-full rounded-full accent-brass-deep"
          />
        </div>
        <div>
          <label htmlFor={rentId} className="block text-sm font-semibold text-navy">
            Rent + utilities: <span className="text-lg font-extrabold tabular-nums">{usd(rent)}/mo</span>
          </label>
          <input
            id={rentId}
            type="range"
            min={800}
            max={4500}
            step={50}
            value={rent}
            onChange={(e) => setRent(Number(e.target.value))}
            aria-valuetext={`${usd(rent)} per month`}
            className="mt-2 w-full rounded-full accent-brass-deep"
          />
        </div>
      </div>

      <div aria-live="polite" className="mt-6">
        {diff >= 0 ? (
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-card p-4 ring-1 ring-border">
              <p className="text-xs text-muted-foreground">You keep every month</p>
              <p className="mt-1 text-2xl font-extrabold text-emerald-700 tabular-nums">{usd(diff)}</p>
            </div>
            <div className="rounded-2xl bg-card p-4 ring-1 ring-border">
              <p className="text-xs text-muted-foreground">Every year, tax-free</p>
              <p className="mt-1 text-2xl font-extrabold text-emerald-700 tabular-nums">{usd(yearly)}</p>
            </div>
            <div className="rounded-2xl bg-card p-4 ring-1 ring-border">
              <p className="text-xs text-muted-foreground">A civilian would need a raise of about</p>
              <p className="mt-1 text-2xl font-extrabold text-navy tabular-nums">{usd(civilianEquivalent)}/yr</p>
            </div>
          </div>
        ) : (
          <p className="rounded-2xl bg-card p-4 text-sm font-semibold text-[#b42318] ring-1 ring-[#b42318]/30">
            Your housing costs {usd(-diff)} more than your BAH each month. That comes out of your taxed base pay. Look
            for housing at or below your BAH rate.
          </p>
        )}
      </div>
    </VisualFrame>
  );
}
