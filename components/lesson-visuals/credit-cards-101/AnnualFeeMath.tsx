"use client";

import { useId, useState } from "react";
import { VisualFrame } from "@/components/lesson-visuals/VisualFrame";
import { cn } from "@/lib/utils";

const FEES = [0, 95, 325, 795, 895];
const MAX = 1500;
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** Annual Fees: the lesson's rule. Add up only the benefits you'd actually use, then compare to the fee. */
export function AnnualFeeMath() {
  const [fee, setFee] = useState(795);
  const [used, setUsed] = useState(500);
  const sliderId = useId();
  const net = used - fee;
  const worth = net >= 0;

  return (
    <VisualFrame title="Is this annual fee worth it?" tryIt="Pick a fee, then drag what you'd actually use">
      <p className="text-sm font-semibold text-navy">Annual fee</p>
      <div role="group" aria-label="Annual fee" data-nudge className="mt-2 flex flex-wrap gap-2 rounded-full">
        {FEES.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={f === fee}
            onClick={() => setFee(f)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors tabular-nums",
              f === fee ? "border-navy bg-navy text-white" : "border-brass-deep/50 bg-card text-navy hover:bg-secondary",
            )}
          >
            {f === 0 ? "No fee" : usd(f)}
          </button>
        ))}
      </div>

      <label htmlFor={sliderId} className="mt-6 block text-sm font-semibold text-navy">
        Benefits you&apos;d genuinely use each year: <span className="text-lg font-extrabold tabular-nums">{usd(used)}</span>
      </label>
      <input
        id={sliderId}
        type="range"
        min={0}
        max={MAX}
        step={25}
        value={used}
        onChange={(e) => setUsed(Number(e.target.value))}
        aria-valuetext={`${usd(used)} of benefits used`}
        className="mt-2 w-full rounded-full accent-brass-deep"
      />

      <div className="mt-5 flex flex-col gap-2.5">
        {[
          { label: "What you pay", value: fee, fill: "bg-[#b42318]/80" },
          { label: "What you actually get back", value: used, fill: "bg-navy" },
        ].map((b) => (
          <div key={b.label}>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{b.label}</span>
              <span className="font-semibold text-navy tabular-nums">{usd(b.value)}</span>
            </div>
            <div className="mt-1 h-3 overflow-hidden rounded-full bg-card ring-1 ring-border">
              <div className={cn("h-full rounded-full transition-all duration-200", b.fill)} style={{ width: `${((b.value / MAX) * 100).toFixed(2)}%` }} />
            </div>
          </div>
        ))}
      </div>

      <p
        aria-live="polite"
        className={cn(
          "mt-5 rounded-xl px-4 py-3 text-sm font-semibold",
          worth ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200" : "bg-[#b42318] text-white",
        )}
      >
        {fee === 0
          ? "No fee: anything you earn is pure upside. This is where everyone should start."
          : worth
            ? `Worth it: you come out about ${usd(net)} ahead each year.`
            : `Not worth it: you'd lose about ${usd(-net)} a year. There's a better card for you.`}
      </p>
    </VisualFrame>
  );
}
