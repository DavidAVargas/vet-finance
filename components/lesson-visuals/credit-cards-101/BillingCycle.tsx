"use client";

import { useState } from "react";
import { CircleCheck, CircleAlert } from "lucide-react";
import { Toggle, VisualFrame } from "@/components/lesson-visuals/VisualFrame";
import { cn } from "@/lib/utils";

/** What a Credit Card Actually Is: the billing cycle, grace period, and what paying in full buys you. */
export function BillingCycle() {
  const [plan, setPlan] = useState<"full" | "part">("full");
  const full = plan === "full";

  return (
    <VisualFrame
      title="One month on a credit card"
      tryIt="Switch how you pay and see what happens after the due date"
      caption="Example: $1,000 statement balance, 24% APR."
    >
      <Toggle
        label="How you pay the statement"
        value={plan}
        onChange={setPlan}
        options={[
          { value: "full", label: "Pay in full" },
          { value: "part", label: "Pay $200 of it" },
        ]}
      />

      {/* Timeline */}
      <div className="mt-8">
        <div className="relative flex h-12 overflow-hidden rounded-xl text-[11px] font-bold sm:text-xs">
          <div className="flex w-[50%] items-center justify-center bg-navy px-2 text-center text-white">
            Billing cycle · ~30 days
          </div>
          <div
            className={cn(
              "flex w-[35%] items-center justify-center px-2 text-center transition-colors",
              full ? "bg-emerald-600 text-white" : "bg-[#84a3d0] text-navy",
            )}
          >
            Grace period · 21–25 days
          </div>
          <div
            className={cn(
              "flex w-[15%] items-center justify-center px-1 text-center transition-colors",
              full ? "bg-surface text-muted-foreground ring-1 ring-border ring-inset" : "bg-[#b42318] text-white",
            )}
          >
            {full ? "$0" : "Interest"}
          </div>
        </div>

        {/* Markers */}
        <div className="relative mt-2 h-14 text-xs">
          <div className="absolute left-0 w-1/3">
            <p className="font-bold text-navy">You spend</p>
            <p className="text-muted-foreground">Purchases add up</p>
          </div>
          <div className="absolute left-[50%] w-1/3 -translate-x-1/2 border-l-2 border-navy pl-2">
            <p className="font-bold text-navy">Statement closes</p>
            <p className="text-muted-foreground">Balance reported</p>
          </div>
          <div className="absolute left-[85%] w-28 -translate-x-full border-r-2 border-navy pr-2 text-right sm:w-32">
            <p className="font-bold text-navy">Due date</p>
            <p className="text-muted-foreground">Pay by here</p>
          </div>
        </div>
      </div>

      <div
        aria-live="polite"
        className={cn(
          "mt-4 flex gap-3 rounded-xl p-4",
          full ? "bg-emerald-50 ring-1 ring-emerald-200" : "bg-card ring-1 ring-[#b42318]/30",
        )}
      >
        {full ? (
          <CircleCheck className="mt-0.5 size-5 shrink-0 text-emerald-700" aria-hidden="true" />
        ) : (
          <CircleAlert className="mt-0.5 size-5 shrink-0 text-[#b42318]" aria-hidden="true" />
        )}
        <div>
          <p className={cn("font-bold", full ? "text-emerald-800" : "text-[#b42318]")}>
            {full ? "$0 in interest" : "About $16 in interest next month"}
          </p>
          <p className="mt-0.5 text-sm text-foreground/80">
            {full
              ? "You used the bank's money for free for up to ~55 days, earned rewards, and built your credit."
              : "The $800 you carried starts charging 24% APR, and it keeps compounding until it's paid off."}
          </p>
        </div>
      </div>
    </VisualFrame>
  );
}
