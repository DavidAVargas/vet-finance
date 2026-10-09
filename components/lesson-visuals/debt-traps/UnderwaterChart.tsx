"use client";

import { useState } from "react";
import { Toggle, VisualFrame } from "@/components/lesson-visuals/VisualFrame";

const PRICE = 35000;
const APR = 0.07;
const X_MAX = 72;
const Y_MAX = 36000;
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const payment = (n: number) => {
  const r = APR / 12;
  return (PRICE * r * (1 + r) ** n) / ((1 + r) ** n - 1);
};
const balance = (n: number, m: number) => {
  const r = APR / 12;
  return Math.max(0, PRICE * (1 + r) ** m - (payment(n) * ((1 + r) ** m - 1)) / r);
};
// ~20% value lost in year one, then ~15% a year (matches the lesson's $28,000 after 12 months).
const carValue = (m: number) => (m <= 12 ? PRICE * (1 - 0.2 * (m / 12)) : PRICE * 0.8 * 0.85 ** ((m - 12) / 12));

// Rounded so server and browser render identical SVG (float math can differ in the last digits).
const round2 = (n: number) => Math.round(n * 100) / 100;
const x = (m: number) => round2((m / X_MAX) * 100);
const y = (v: number) => round2(100 - (v / Y_MAX) * 100);
const line = (pts: [number, number][]) => pts.map(([m, v], i) => `${i ? "L" : "M"}${x(m)},${y(v)}`).join(" ");

const TERMS = ["36", "48", "60", "72"] as const;

/** The 72-Month Lie: loan balance vs. car value, with the underwater stretch shaded. */
export function UnderwaterChart() {
  const [term, setTerm] = useState<(typeof TERMS)[number]>("72");
  const n = Number(term);
  const months = Array.from({ length: n + 1 }, (_, m) => m);
  const valueMonths = Array.from({ length: X_MAX + 1 }, (_, m) => m);
  const under = months.filter((m) => m > 0 && balance(n, m) > carValue(m));

  const underPath =
    under.length > 1
      ? line(under.map((m) => [m, balance(n, m)])) +
        " " +
        under
          .slice()
          .reverse()
          .map((m) => `L${x(m)},${y(carValue(m))}`)
          .join(" ") +
        " Z"
      : "";

  return (
    <VisualFrame
      title="What you owe vs. what the car is worth"
      tryIt="Switch the loan length and watch the underwater zone"
      caption="$35,000 car, 7% APR, nothing down. Value drops about 20% in year one, then about 15% a year."
    >
      <Toggle
        label="Loan length in months"
        value={term}
        onChange={setTerm}
        options={TERMS.map((t) => ({ value: t, label: `${t} mo` }))}
      />

      <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2" aria-live="polite">
        <p className="text-sm text-muted-foreground">
          Payment <span className="block text-2xl font-extrabold text-navy tabular-nums">{usd(payment(n))}/mo</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Underwater for
          <span className={`block text-2xl font-extrabold tabular-nums ${under.length ? "text-[#b42318]" : "text-emerald-700"}`}>
            {under.length ? `${under.length} months` : "Never"}
          </span>
        </p>
        <p className="text-sm text-muted-foreground">
          Total interest
          <span className="block text-2xl font-extrabold text-navy tabular-nums">{usd(payment(n) * n - PRICE)}</span>
        </p>
      </div>

      {/* Chart */}
      <div className="mt-6 pl-10">
        <div className="relative aspect-[2/1] rounded-lg bg-card ring-1 ring-border sm:aspect-[5/2]">
          <div className="absolute inset-y-0 -left-10 w-8 text-right text-[11px] text-muted-foreground tabular-nums" aria-hidden="true">
            {[30000, 20000, 10000, 0].map((v) => (
              <span key={v} className="absolute right-0 -translate-y-1/2" style={{ top: `${y(v)}%` }}>
                ${v / 1000}k
              </span>
            ))}
          </div>
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 size-full overflow-visible"
            role="img"
            aria-label={`On a ${n}-month loan, you owe more than the car is worth for ${under.length || "zero"} months.`}
          >
            {[10000, 20000, 30000].map((v) => (
              <line key={v} x1="0" x2="100" y1={y(v)} y2={y(v)} stroke="#e2e4e8" vectorEffect="non-scaling-stroke" />
            ))}
            {underPath && <path d={underPath} fill="#b42318" fillOpacity="0.3" />}
            <path
              d={line(valueMonths.map((m) => [m, carValue(m)]))}
              fill="none"
              stroke="#9c7a42"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={line(months.map((m) => [m, balance(n, m)]))}
              fill="none"
              stroke="#13294b"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
        <div className="mt-1.5 flex justify-between text-[11px] text-muted-foreground tabular-nums" aria-hidden="true">
          {[0, 12, 24, 36, 48, 60, 72].map((m) => (
            <span key={m}>{m === 0 ? "0" : `${m / 12} yr`}</span>
          ))}
        </div>
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
        <li className="flex items-center gap-2">
          <span className="h-[3px] w-5 rounded bg-navy" aria-hidden="true" />
          What you owe
        </li>
        <li className="flex items-center gap-2">
          <span className="h-0 w-5 border-t-[3px] border-dashed border-brass-deep" aria-hidden="true" />
          What the car is worth
        </li>
        <li className="flex items-center gap-2">
          <span className="size-3 rounded-sm bg-[#b42318]/30" aria-hidden="true" />
          Underwater
        </li>
      </ul>
    </VisualFrame>
  );
}
