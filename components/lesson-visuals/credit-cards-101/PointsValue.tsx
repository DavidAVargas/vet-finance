"use client";

import { useId, useState } from "react";
import { VisualFrame } from "@/components/lesson-visuals/VisualFrame";
import { cn } from "@/lib/utils";

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

// Cents-per-point ranges from the "Why Points Beat Cash" lesson.
const methods = [
  { label: "Cash back", note: "1¢ per point, always", low: 1, high: 1, fill: "bg-[#b4c7e3]" },
  { label: "Travel portal", note: "usually 1¢, up to 2¢ on select bookings", low: 1, high: 2, fill: "bg-[#4f78b5]" },
  { label: "Transfer to airline partners", note: "3–8¢+ on business and first class", low: 3, high: 8, fill: "bg-navy" },
];
const TOP = 8;

/** Why Points Beat Cash: the same points, three very different values. */
export function PointsValue() {
  const [points, setPoints] = useState(100000);
  const sliderId = useId();

  return (
    <VisualFrame title="Same points, three outcomes" tryIt="Drag to change how many points you have">
      <label htmlFor={sliderId} className="block text-sm font-semibold text-navy">
        Your points: <span className="text-lg font-extrabold tabular-nums">{points.toLocaleString("en-US")}</span>
      </label>
      <input
        id={sliderId}
        type="range"
        min={10000}
        max={200000}
        step={5000}
        value={points}
        onChange={(e) => setPoints(Number(e.target.value))}
        data-nudge
        aria-valuetext={`${points.toLocaleString("en-US")} points`}
        className="mt-2 w-full rounded-full accent-brass-deep"
      />

      <ul className="mt-6 flex flex-col gap-5" aria-live="polite">
        {methods.map((m) => {
          const low = (points * m.low) / 100;
          const high = (points * m.high) / 100;
          const best = m.high === TOP;
          return (
            <li key={m.label}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <p className="text-sm">
                  <span className="font-bold text-navy">{m.label}</span>{" "}
                  <span className="text-muted-foreground">· {m.note}</span>
                </p>
                <p className={cn("text-lg font-extrabold tabular-nums", best ? "text-emerald-700" : "text-navy")}>
                  {low === high ? usd(low) : `${usd(low)}–${usd(high)}${best ? "+" : ""}`}
                </p>
              </div>
              {/* Solid to the low end, lighter through the range */}
              <div className="relative mt-1.5 h-4 overflow-hidden rounded-full bg-card ring-1 ring-border">
                <div
                  className={cn("absolute inset-y-0 left-0 opacity-35", m.fill)}
                  style={{ width: `${((m.high / TOP) * 100).toFixed(2)}%` }}
                />
                <div
                  className={cn("absolute inset-y-0 left-0 rounded-full", m.fill)}
                  style={{ width: `${((m.low / TOP) * 100).toFixed(2)}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </VisualFrame>
  );
}
