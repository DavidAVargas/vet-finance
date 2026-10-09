"use client";

import { useState } from "react";
import { Briefcase, Car, CircleCheck, CircleX, CreditCard, House, KeyRound, Smartphone } from "lucide-react";
import { Toggle, VisualFrame } from "@/components/lesson-visuals/VisualFrame";
import { cn } from "@/lib/utils";

const items = [
  { icon: KeyRound, label: "Renting an apartment", good: "Approved", bad: "Denied, or a bigger deposit" },
  { icon: Car, label: "Buying a car", good: "Low interest rate", bad: "Hundreds more per month" },
  { icon: House, label: "Buying a house", good: "Best mortgage rates", bad: "$200K+ more over 30 years" },
  { icon: Smartphone, label: "Phone plans", good: "Finance any device", bad: "Higher deposits, fewer plans" },
  { icon: Briefcase, label: "Some jobs", good: "Clean credit check", bad: "Possible red flag" },
  { icon: CreditCard, label: "Best credit cards", good: "Top rewards cards", bad: "Limited to basic cards" },
];

/** What Credit Unlocks: flip between a good and bad score to see the same six doors open or close. */
export function CreditDoors() {
  const [score, setScore] = useState<"good" | "bad">("good");
  const good = score === "good";

  return (
    <VisualFrame title="Same person, two credit scores" tryIt="Switch between 760 and 580 to see what changes">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Toggle
          label="Choose a credit score"
          value={score}
          onChange={setScore}
          options={[
            { value: "good", label: "760 · Good credit" },
            { value: "bad", label: "580 · Bad credit" },
          ]}
        />
        <p className="text-sm font-semibold text-navy" aria-live="polite">
          {good ? "Doors open, at the best price." : "Doors close, or cost more to get through."}
        </p>
      </div>

      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map(({ icon: Icon, label, good: g, bad: b }) => (
          <li key={label} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
              <Icon className="size-5 text-navy" strokeWidth={1.8} aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-navy">{label}</p>
              <p
                className={cn(
                  "mt-1 flex items-center gap-1.5 text-sm font-medium",
                  good ? "text-emerald-700" : "text-[#b42318]",
                )}
              >
                {good ? (
                  <CircleCheck className="size-4 shrink-0" aria-hidden="true" />
                ) : (
                  <CircleX className="size-4 shrink-0" aria-hidden="true" />
                )}
                {good ? g : b}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </VisualFrame>
  );
}
