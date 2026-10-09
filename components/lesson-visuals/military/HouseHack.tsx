"use client";

import { useId, useState } from "react";
import { Toggle, VisualFrame } from "@/components/lesson-visuals/VisualFrame";
import { cn } from "@/lib/utils";

const RATE = 0.0675;
const FUNDING_FEE = 0.0215; // first use, $0 down
const TAX_INS_RATE = 0.018; // property taxes + insurance per year, as a share of price (estimate)
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function payment(principal: number) {
  const r = RATE / 12;
  const n = 360;
  return (principal * r * (1 + r) ** n) / ((1 + r) ** n - 1);
}

/** How to Actually Use It: the real monthly math on a VA-financed multi-unit property. */
export function HouseHack() {
  const [price, setPrice] = useState(400000);
  const [units, setUnits] = useState<"2" | "3" | "4">("3");
  const [rent, setRent] = useState(1100);
  const [exempt, setExempt] = useState(false);
  const priceId = useId();
  const rentId = useId();

  const loan = price * (exempt ? 1 : 1 + FUNDING_FEE);
  const mortgage = payment(loan);
  const taxIns = (price * TAX_INS_RATE) / 12;
  const total = mortgage + taxIns;
  const rentIn = rent * (Number(units) - 1);
  const yourCost = total - rentIn;

  return (
    <VisualFrame
      title="House hacking with a VA loan"
      tryIt="Change the price, units, and rent to see your real cost"
      caption="$0 down at 6.75% for 30 years. Taxes and insurance estimated at 1.8% of the price per year. Plan for vacancies and repairs, and for 3–4 units, 6 months of payments in reserve."
    >
      <div className="flex flex-wrap items-center gap-3">
        <Toggle
          label="Number of units"
          value={units}
          onChange={setUnits}
          options={[
            { value: "2", label: "Duplex" },
            { value: "3", label: "Triplex" },
            { value: "4", label: "Fourplex" },
          ]}
        />
        <label className="flex items-center gap-2 text-sm font-semibold text-navy">
          <input
            type="checkbox"
            checked={exempt}
            onChange={(e) => setExempt(e.target.checked)}
            className="size-4 accent-brass-deep"
          />
          Funding fee waived (10%+ rating)
        </label>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={priceId} className="block text-sm font-semibold text-navy">
            Price: <span className="text-lg font-extrabold tabular-nums">{usd(price)}</span>
          </label>
          <input
            id={priceId}
            type="range"
            min={250000}
            max={800000}
            step={10000}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            aria-valuetext={usd(price)}
            className="mt-2 w-full rounded-full accent-brass-deep"
          />
        </div>
        <div>
          <label htmlFor={rentId} className="block text-sm font-semibold text-navy">
            Rent per tenant unit: <span className="text-lg font-extrabold tabular-nums">{usd(rent)}</span>
          </label>
          <input
            id={rentId}
            type="range"
            min={600}
            max={2500}
            step={50}
            value={rent}
            onChange={(e) => setRent(Number(e.target.value))}
            aria-valuetext={`${usd(rent)} per unit`}
            className="mt-2 w-full rounded-full accent-brass-deep"
          />
        </div>
      </div>

      <ul aria-live="polite" className="mt-6 divide-y divide-border overflow-hidden rounded-2xl bg-card ring-1 ring-border">
        {[
          { label: `Mortgage${exempt ? "" : " (funding fee rolled in)"}`, value: usd(mortgage) },
          { label: "Property taxes + insurance (est.)", value: usd(taxIns) },
          { label: `Rent from ${Number(units) - 1} tenant unit${units === "2" ? "" : "s"}`, value: `−${usd(rentIn)}`, good: true },
        ].map((row) => (
          <li key={row.label} className="flex justify-between gap-4 px-4 py-2.5 text-sm">
            <span className="text-muted-foreground">{row.label}</span>
            <span className={cn("font-semibold tabular-nums", row.good ? "text-emerald-700" : "text-navy")}>{row.value}</span>
          </li>
        ))}
        <li className={cn("flex justify-between gap-4 px-4 py-3", yourCost <= 0 ? "bg-emerald-50" : "bg-surface")}>
          <span className="font-bold text-navy">{yourCost <= 0 ? "Tenants cover it all. Monthly cash flow" : "Your housing cost"}</span>
          <span className={cn("text-xl font-extrabold tabular-nums", yourCost <= 0 ? "text-emerald-700" : "text-navy")}>
            {yourCost <= 0 ? `+${usd(-yourCost)}` : usd(yourCost)}/mo
          </span>
        </li>
      </ul>
    </VisualFrame>
  );
}
