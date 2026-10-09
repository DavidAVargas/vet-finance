"use client";

import { useId, useState } from "react";
import { VisualFrame } from "@/components/lesson-visuals/VisualFrame";

const PRINCIPAL = 40000;
const APR = 0.065;
const TERM = 120;
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const r = APR / 12;
const BASE_PAYMENT = (PRINCIPAL * r * (1 + r) ** TERM) / ((1 + r) ** TERM - 1);

function payoff(payment: number) {
  let balance = PRINCIPAL;
  let months = 0;
  let interest = 0;
  while (balance > 0.005 && months < 600) {
    const i = balance * r;
    interest += i;
    balance = balance + i - payment;
    months++;
  }
  return { months, interest };
}

const BASE = payoff(BASE_PAYMENT);

const duration = (m: number) => {
  const y = Math.floor(m / 12);
  const mo = m % 12;
  return [y && `${y} yr`, mo && `${mo} mo`].filter(Boolean).join(" ") || "0 mo";
};

/** Pay It Off As Fast As You Can: how extra monthly payments shrink time and interest. */
export function PayoffAccelerator() {
  const [extra, setExtra] = useState(200);
  const sliderId = useId();
  const plan = payoff(BASE_PAYMENT + extra);
  const savedInterest = BASE.interest - plan.interest;
  const savedMonths = BASE.months - plan.months;

  return (
    <VisualFrame
      title="$40,000 at 6.5%: what extra payments do"
      tryIt="Drag to add a little extra each month"
      caption={`Standard 10-year plan: ${usd(BASE_PAYMENT)}/month and ${usd(BASE.interest)} in interest. Ask your servicer to apply extra payments to principal.`}
    >
      <label htmlFor={sliderId} className="block text-sm font-semibold text-navy">
        Extra each month: <span className="text-lg font-extrabold tabular-nums">{usd(extra)}</span>
      </label>
      <input
        id={sliderId}
        type="range"
        min={0}
        max={500}
        step={25}
        value={extra}
        onChange={(e) => setExtra(Number(e.target.value))}
        data-nudge
        aria-valuetext={`${usd(extra)} extra per month`}
        className="mt-2 w-full rounded-full accent-brass-deep"
      />
      <div className="mt-1 flex justify-between text-[11px] text-muted-foreground" aria-hidden="true">
        <span>$0</span>
        <span>$500</span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-live="polite">
        {[
          { label: "Monthly payment", value: usd(BASE_PAYMENT + extra) },
          { label: "Debt-free in", value: duration(plan.months) },
          { label: "Time saved", value: savedMonths ? duration(savedMonths) : "—", good: savedMonths > 0 },
          { label: "Interest saved", value: savedInterest > 1 ? usd(savedInterest) : "—", good: savedInterest > 1 },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-card p-3.5 ring-1 ring-border">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={`mt-1 text-lg font-extrabold tabular-nums ${s.good ? "text-emerald-700" : "text-navy"}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Interest comparison */}
      <div className="mt-5 flex flex-col gap-2.5">
        {[
          { label: "Standard plan", value: BASE.interest, fill: "bg-[#b42318]/80" },
          { label: `With ${usd(extra)} extra`, value: plan.interest, fill: "bg-navy" },
        ].map((b) => (
          <div key={b.label}>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{b.label}</span>
              <span className="font-semibold text-navy tabular-nums">{usd(b.value)} interest</span>
            </div>
            <div className="mt-1 h-3 overflow-hidden rounded-full bg-card ring-1 ring-border">
              <div className={`h-full rounded-full transition-all duration-200 ${b.fill}`} style={{ width: `${((b.value / BASE.interest) * 100).toFixed(2)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </VisualFrame>
  );
}
