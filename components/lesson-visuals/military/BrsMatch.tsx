"use client";

import { useId, useState } from "react";
import { Toggle, VisualFrame } from "@/components/lesson-visuals/VisualFrame";
import { cn } from "@/lib/utils";

const BASE_PAY = 3947; // E-5 over 4 years, 2026
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** BRS: 1% automatic, then dollar-for-dollar on the first 3% and 50 cents on the next 2%. */
function matchPct(you: number) {
  return Math.min(you, 3) + Math.max(0, Math.min(you, 5) - 3) * 0.5;
}

/** The Blended Retirement System: how much free money your contribution unlocks. */
export function BrsMatch() {
  const [you, setYou] = useState(3);
  const [service, setService] = useState<"new" | "two">("two");
  const sliderId = useId();

  const auto = 1;
  const match = service === "two" ? matchPct(you) : 0;
  const yours = (BASE_PAY * you) / 100;
  const free = (BASE_PAY * (auto + match)) / 100;
  const missed = service === "two" ? (BASE_PAY * (4 - match)) / 100 : 0;

  const segments = [
    { label: `You (${you}%)`, value: yours, fill: "bg-[#4f78b5]" },
    { label: "Automatic 1%", value: (BASE_PAY * auto) / 100, fill: "bg-[#84a3d0]" },
    { label: `Match (${match}%)`, value: (BASE_PAY * match) / 100, fill: "bg-emerald-600" },
  ];
  const scale = (BASE_PAY * 15) / 100;

  return (
    <VisualFrame
      title="Your TSP match, in dollars"
      tryIt="Drag your contribution and switch your years of service"
      caption="Based on E-5 base pay over 4 years ($3,947/month, 2026). The automatic 1% starts 60 days after you join."
    >
      <Toggle
        label="Years of service"
        value={service}
        onChange={setService}
        options={[
          { value: "new", label: "Under 2 years" },
          { value: "two", label: "2+ years" },
        ]}
      />

      <label htmlFor={sliderId} className="mt-5 block text-sm font-semibold text-navy">
        You contribute: <span className="text-lg font-extrabold tabular-nums">{you}%</span> of base pay
      </label>
      <input
        id={sliderId}
        type="range"
        min={0}
        max={10}
        step={1}
        value={you}
        onChange={(e) => setYou(Number(e.target.value))}
        aria-valuetext={`${you} percent`}
        className="mt-2 w-full rounded-full accent-brass-deep"
      />

      <div className="mt-5 flex h-5 overflow-hidden rounded-full bg-card ring-1 ring-border" aria-hidden="true">
        {segments.map((s) => (
          <div key={s.label} className={cn("h-full transition-all duration-200", s.fill)} style={{ width: `${((s.value / scale) * 100).toFixed(2)}%` }} />
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center gap-2">
            <span className={cn("size-3 rounded-sm", s.fill)} aria-hidden="true" />
            {s.label}: <span className="font-semibold text-navy tabular-nums">{usd(s.value)}/mo</span>
          </li>
        ))}
      </ul>

      <div aria-live="polite" className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-card p-4 ring-1 ring-border">
          <p className="text-xs text-muted-foreground">Free money from the government</p>
          <p className="mt-1 text-2xl font-extrabold text-emerald-700 tabular-nums">{usd(free * 12)}/yr</p>
        </div>
        <div className={cn("rounded-2xl p-4 ring-1", missed > 0 ? "bg-card ring-[#b42318]/30" : "bg-emerald-50 ring-emerald-200")}>
          {service === "new" ? (
            <>
              <p className="text-xs text-muted-foreground">Match starts in year 3</p>
              <p className="mt-1 text-sm font-semibold text-navy">
                Contribute anyway. Your own money compounds, and the habit is set when the match kicks in.
              </p>
            </>
          ) : missed > 0 ? (
            <>
              <p className="text-xs text-muted-foreground">Match you&apos;re leaving behind</p>
              <p className="mt-1 text-2xl font-extrabold text-[#b42318] tabular-nums">{usd(missed * 12)}/yr</p>
            </>
          ) : (
            <>
              <p className="text-xs text-emerald-800">Full match captured</p>
              <p className="mt-1 text-2xl font-extrabold text-emerald-700">5% of your pay, free</p>
            </>
          )}
        </div>
      </div>
    </VisualFrame>
  );
}
