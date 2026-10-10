"use client";

import { useId, useState } from "react";
import { VisualFrame } from "@/components/lesson-visuals/VisualFrame";
import { cn } from "@/lib/utils";

// Example rates as of October 2026. Rates change often.
const ACCOUNTS = [
  { label: "Big-bank savings", apy: 0.01, fill: "bg-[#b4c7e3]" },
  { label: "National average savings", apy: 0.37, fill: "bg-[#4f78b5]" },
  { label: "High-yield savings account", apy: 4.0, fill: "bg-emerald-600", best: true },
];
const TOP = 4.0;

const usd = (n: number, cents = false) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  });

/** Playbook safety net: what the same savings earns in different kinds of accounts. */
export function HysaEarnings({ initialAmount = 5000 }: { initialAmount?: number }) {
  const [amount, setAmount] = useState(initialAmount);
  const sliderId = useId();
  const best = (amount * TOP) / 100;

  return (
    <VisualFrame
      title="What your savings could earn"
      tryIt="Drag to match how much you have saved"
      caption="Example rates from October 2026: big banks ~0.01%, national average 0.37%, high-yield accounts ~4%. Rates change, so compare current offers, and make sure the bank is FDIC insured."
      className="mt-6 mb-0"
    >
      <label htmlFor={sliderId} className="block text-sm font-semibold text-navy">
        Your savings: <span className="text-lg font-extrabold tabular-nums">{usd(amount)}</span>
      </label>
      <input
        id={sliderId}
        type="range"
        min={500}
        max={50000}
        step={500}
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        data-nudge
        aria-valuetext={usd(amount)}
        className="mt-2 w-full rounded-full accent-brass-deep"
      />

      <ul aria-live="polite" className="mt-5 flex flex-col gap-4">
        {ACCOUNTS.map((acct) => {
          const yearly = (amount * acct.apy) / 100;
          return (
            <li key={acct.label}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <p className="text-sm">
                  <span className="font-bold text-navy">{acct.label}</span>{" "}
                  <span className="text-muted-foreground">· {acct.apy}% APY</span>
                </p>
                <p className={cn("font-extrabold tabular-nums", acct.best ? "text-lg text-emerald-700" : "text-navy")}>
                  {usd(yearly, yearly < 10)}/yr
                </p>
              </div>
              <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-card ring-1 ring-border">
                <div
                  className={cn("h-full rounded-full transition-all duration-200", acct.fill)}
                  style={{ width: `${Math.max(0.6, (acct.apy / TOP) * 100).toFixed(2)}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-5 rounded-xl bg-navy px-4 py-3 text-sm text-white">
        That&apos;s about <span className="font-bold text-brass">{usd(best / 12)} a month</span> for doing nothing, and you
        can still take your money out anytime.
      </p>
    </VisualFrame>
  );
}
