"use client";

import { useState } from "react";
import { CircleCheck, CircleX } from "lucide-react";
import { Toggle, VisualFrame } from "@/components/lesson-visuals/VisualFrame";
import { cn } from "@/lib/utils";

// The federal protections from the lesson's federal vs. private comparison.
const protections = [
  "Fixed rate set by Congress",
  "Income-driven repayment",
  "Forgiveness programs (PSLF, IDR)",
  "Flexible deferment and forbearance",
  "0% interest during combat deployment",
];

/** It's Manageable: what you give up by refinancing federal loans into a private loan. */
export function RefinanceTrap() {
  const [type, setType] = useState<"federal" | "private">("federal");
  const isPrivate = type === "private";

  return (
    <VisualFrame title="Federal loan protections" tryIt="Switch to private to see what you'd give up">
      <Toggle
        label="Loan type"
        value={type}
        onChange={setType}
        options={[
          { value: "federal", label: "Federal loan" },
          { value: "private", label: "Refinanced to private" },
        ]}
      />

      <ul className="mt-5 flex flex-col gap-2">
        {protections.map((p) => (
          <li key={p} className="flex items-center gap-3 rounded-xl bg-card px-4 py-3 ring-1 ring-border">
            {isPrivate ? (
              <CircleX className="size-5 shrink-0 text-[#b42318]" aria-label="Lost" />
            ) : (
              <CircleCheck className="size-5 shrink-0 text-emerald-600" aria-label="Included" />
            )}
            <span className={cn("flex-1 text-[15px]", isPrivate ? "text-muted-foreground line-through" : "font-semibold text-navy")}>
              {p}
            </span>
            {isPrivate && <span className="text-xs font-bold text-[#b42318] uppercase">Gone</span>}
          </li>
        ))}
      </ul>

      <p
        aria-live="polite"
        className={cn(
          "mt-5 rounded-xl px-4 py-3 text-sm font-semibold",
          isPrivate ? "bg-[#b42318] text-white" : "bg-navy text-white",
        )}
      >
        {isPrivate
          ? "Once you refinance federal loans into a private loan, you can never get these back. (SCRA's 6% cap still applies to loans from before active duty.)"
          : "Every one of these comes with federal loans. Keep them."}
      </p>
    </VisualFrame>
  );
}
