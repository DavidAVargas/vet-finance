"use client";

import { useId, useState } from "react";
import { CircleCheck, CircleX } from "lucide-react";
import { VisualFrame } from "@/components/lesson-visuals/VisualFrame";
import { cn } from "@/lib/utils";

const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const MISSED = 6;
const LIMIT = 10000;

// Thresholds follow the lesson's quick example (10% excellent, 30% the ceiling, 50%+ hurting, 90% serious).
function utilizationStatus(pct: number) {
  if (pct <= 10) return { label: "Excellent", tone: "text-emerald-700", bar: "bg-emerald-600" };
  if (pct <= 30) return { label: "OK, don't go higher", tone: "text-navy", bar: "bg-navy" };
  if (pct <= 60) return { label: "Hurting your score", tone: "text-amber-800", bar: "bg-amber-600" };
  return { label: "Serious damage", tone: "text-[#b42318]", bar: "bg-[#b42318]" };
}

/** The Two Rules: an on-time payment year you can break, and a utilization meter you can drag. */
export function TwoRules() {
  const [missed, setMissed] = useState(false);
  const [balance, setBalance] = useState(3000);
  const sliderId = useId();
  const pct = Math.round((balance / LIMIT) * 100);
  const status = utilizationStatus(pct);

  return (
    <VisualFrame title="The two rules, in action" tryIt="Miss a payment, then drag your balance up">
      <div className="grid gap-4 md:grid-cols-2">
        {/* Rule 1 */}
        <section className="rounded-2xl bg-card p-5 ring-1 ring-border">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-navy px-2.5 py-0.5 text-xs font-bold text-white">35%</span>
            <p className="font-bold text-navy">Rule 1 · Pay on time</p>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">A year of payments</p>

          <ol className="mt-4 grid grid-cols-6 gap-2 sm:grid-cols-12 md:grid-cols-6 lg:grid-cols-12">
            {MONTHS.map((m, i) => {
              const late = missed && i === MISSED;
              return (
                <li key={i} className="flex flex-col items-center gap-1">
                  {late ? (
                    <CircleX className="size-6 text-[#b42318]" aria-label="Late payment" />
                  ) : (
                    <CircleCheck className="size-6 text-emerald-600" aria-label="Paid on time" />
                  )}
                  <span className="text-[11px] font-semibold text-muted-foreground" aria-hidden="true">{m}</span>
                </li>
              );
            })}
          </ol>

          <button
            type="button"
            aria-pressed={missed}
            data-nudge
            onClick={() => setMissed((v) => !v)}
            className="mt-4 rounded-full border border-brass-deep/50 px-3.5 py-2 text-sm font-semibold text-navy transition-colors hover:bg-secondary"
          >
            {missed ? "Undo the missed payment" : "Miss one payment"}
          </button>
          <p className={cn("mt-3 text-sm font-medium", missed ? "text-[#b42318]" : "text-emerald-700")} aria-live="polite">
            {missed
              ? "One late payment: −50 to −100 points, and it stays on your report for 7 years."
              : "12 for 12. This is what keeps a score climbing."}
          </p>
        </section>

        {/* Rule 2 */}
        <section className="rounded-2xl bg-card p-5 ring-1 ring-border">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-navy px-2.5 py-0.5 text-xs font-bold text-white">30%</span>
            <p className="font-bold text-navy">Rule 2 · Stay under 30%</p>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">$10,000 total credit limit</p>

          <div className="mt-4 flex items-baseline justify-between" aria-live="polite">
            <p className="text-4xl font-extrabold tracking-tight text-navy tabular-nums">{pct}%</p>
            <p className={cn("text-sm font-bold", status.tone)}>{status.label}</p>
          </div>

          <div className="relative mt-3 h-3 overflow-hidden rounded-full bg-surface ring-1 ring-border">
            <div className={cn("h-full transition-all duration-150", status.bar)} style={{ width: `${pct}%` }} />
            <span className="absolute inset-y-0 left-[10%] w-px bg-navy/30" aria-hidden="true" />
            <span className="absolute inset-y-0 left-[30%] w-0.5 bg-brass" aria-hidden="true" />
          </div>
          <div className="relative mt-1 h-4 text-[11px] font-semibold text-muted-foreground" aria-hidden="true">
            <span className="absolute left-[10%] -translate-x-1/2">10%</span>
            <span className="absolute left-[30%] -translate-x-1/2 text-[#7a5a22]">30%</span>
          </div>

          <label htmlFor={sliderId} className="mt-3 block text-sm font-semibold text-navy">
            Your balance: {balance.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}
          </label>
          <input
            id={sliderId}
            type="range"
            min={0}
            max={LIMIT}
            step={250}
            value={balance}
            onChange={(e) => setBalance(Number(e.target.value))}
            aria-valuetext={`${pct}% utilization, ${status.label}`}
            data-nudge
            className="mt-2 w-full rounded-full accent-brass-deep"
          />
        </section>
      </div>
    </VisualFrame>
  );
}
