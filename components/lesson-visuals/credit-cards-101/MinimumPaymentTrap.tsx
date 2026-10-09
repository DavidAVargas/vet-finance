"use client";

import { useId, useState } from "react";
import { VisualFrame } from "@/components/lesson-visuals/VisualFrame";
import { cn } from "@/lib/utils";

const APR = 0.24;
const r = APR / 12;
const PAYMENTS = [100, 200, 300, 500];
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

type Result = { months: number; interest: number } | null;

/** Minimum = interest + 1% of the balance (at least $25), a common issuer formula. */
function minimumOnly(balance: number): Result {
  let b = balance;
  let months = 0;
  let interest = 0;
  while (b > 0.005 && months < 1200) {
    const i = b * r;
    const pay = Math.min(Math.max(25, i + b * 0.01), b + i);
    interest += i;
    b = b + i - pay;
    months++;
  }
  return { months, interest };
}

function fixedPayment(balance: number, payment: number): Result {
  if (payment <= balance * r) return null; // never pays off
  let b = balance;
  let months = 0;
  let interest = 0;
  while (b > 0.005 && months < 1200) {
    const i = b * r;
    interest += i;
    b = b + i - Math.min(payment, b + i);
    months++;
  }
  return { months, interest };
}

const duration = (m: number) => {
  const y = Math.floor(m / 12);
  const mo = m % 12;
  return [y && `${y} yr`, mo && `${mo} mo`].filter(Boolean).join(" ");
};

/** APR and Interest: how long minimum payments take vs. a fixed payment. */
export function MinimumPaymentTrap() {
  const [balance, setBalance] = useState(5000);
  const [payment, setPayment] = useState(200);
  const sliderId = useId();
  const min = minimumOnly(balance)!;
  const fixed = fixedPayment(balance, payment);

  return (
    <VisualFrame
      title="The minimum payment trap"
      tryIt="Drag the balance, then pick a fixed payment to compare"
      caption="24% APR, no new purchases. Minimum payment = interest + 1% of the balance (at least $25), a common formula."
    >
      <label htmlFor={sliderId} className="block text-sm font-semibold text-navy">
        Card balance: <span className="text-lg font-extrabold tabular-nums">{usd(balance)}</span>
      </label>
      <input
        id={sliderId}
        type="range"
        min={1000}
        max={10000}
        step={500}
        value={balance}
        onChange={(e) => setBalance(Number(e.target.value))}
        data-nudge
        aria-valuetext={usd(balance)}
        className="mt-2 w-full rounded-full accent-brass-deep"
      />

      <div className="mt-5 grid gap-3 sm:grid-cols-2" aria-live="polite">
        <div className="rounded-2xl bg-card p-5 ring-1 ring-[#b42318]/30">
          <p className="text-sm font-bold text-[#b42318]">Minimum payment only</p>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-navy tabular-nums">{duration(min.months)}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            <span className="font-bold text-[#b42318] tabular-nums">{usd(min.interest)}</span> in interest
          </p>
        </div>

        <div className="rounded-2xl bg-card p-5 ring-1 ring-border">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-bold text-navy">Fixed payment</p>
            <div role="group" aria-label="Fixed monthly payment" className="flex gap-1">
              {PAYMENTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  aria-pressed={p === payment}
                  onClick={() => setPayment(p)}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums transition-colors",
                    p === payment ? "bg-navy text-white" : "text-muted-foreground ring-1 ring-brass-deep/40 hover:text-navy",
                  )}
                >
                  ${p}
                </button>
              ))}
            </div>
          </div>
          {fixed ? (
            <>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-emerald-700 tabular-nums">{duration(fixed.months)}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                <span className="font-bold text-navy tabular-nums">{usd(fixed.interest)}</span> in interest
              </p>
            </>
          ) : (
            <>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-[#b42318]">Never</p>
              <p className="mt-1 text-sm text-muted-foreground">${payment}/mo doesn&apos;t even cover the interest.</p>
            </>
          )}
        </div>
      </div>

      <p className="mt-4 rounded-xl bg-navy px-4 py-3 text-sm text-white">
        <span className="font-bold">Pay in full every month:</span>{" "}$0 in interest, ever. That&apos;s the goal.
      </p>
    </VisualFrame>
  );
}
