"use client";

import { useState } from "react";
import { Toggle, VisualFrame } from "@/components/lesson-visuals/VisualFrame";
import { cn } from "@/lib/utils";

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

// Figures match the tables in the "How Much Good Credit Saves You" lesson.
const scenarios = {
  home: {
    heading: "Same $300,000 house · 30-year mortgage",
    metric: "Total paid",
    rows: [
      { score: "750+", rate: "6.5%", monthly: 1896, value: 682000, good: true },
      { score: "580", rate: "9.5%", monthly: 2522, value: 908000, good: false },
    ],
    takeaway: "$226,000 more for the exact same house.",
  },
  car: {
    heading: "Same $30,000 car · 5-year loan",
    metric: "Total interest",
    rows: [
      { score: "750+", rate: "5%", monthly: 566, value: 3968, good: true },
      { score: "580", rate: "15%", monthly: 714, value: 12848, good: false },
    ],
    takeaway: "About $9,000 more in interest on the exact same car.",
  },
};

/** How Much Good Credit Saves You: the same purchase priced at two credit scores. */
export function SameThingDifferentPrice() {
  const [which, setWhich] = useState<keyof typeof scenarios>("home");
  const s = scenarios[which];
  const max = Math.max(...s.rows.map((r) => r.value));

  return (
    <VisualFrame title="Same purchase, two credit scores" tryIt="Switch between the house and the car">
      <Toggle
        label="Choose a purchase"
        value={which}
        onChange={setWhich}
        options={[
          { value: "home", label: "House" },
          { value: "car", label: "Car" },
        ]}
      />

      <p className="mt-5 font-bold text-navy">{s.heading}</p>

      <ul className="mt-4 flex flex-col gap-5">
        {s.rows.map((r) => (
          <li key={r.score}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="text-sm">
                <span className={cn("font-bold", r.good ? "text-emerald-700" : "text-[#b42318]")}>Score {r.score}</span>
                <span className="text-muted-foreground"> · {r.rate} rate · {usd(r.monthly)}/mo</span>
              </p>
              <p className="text-sm text-muted-foreground">
                {s.metric}: <span className="text-base font-bold text-navy">{usd(r.value)}</span>
              </p>
            </div>
            <div className="mt-2 h-4 overflow-hidden rounded-full bg-card ring-1 ring-border">
              <div
                className={cn("h-full rounded-full transition-all duration-500", r.good ? "bg-navy" : "bg-[#b42318]/85")}
                style={{ width: `${(r.value / max) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-6 rounded-xl bg-navy px-4 py-3 text-sm font-semibold text-white" aria-live="polite">
        {s.takeaway}
      </p>
    </VisualFrame>
  );
}
