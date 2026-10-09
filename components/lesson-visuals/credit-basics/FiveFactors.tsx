"use client";

import { useState } from "react";
import { VisualFrame } from "@/components/lesson-visuals/VisualFrame";
import { cn } from "@/lib/utils";

// Names and weights match the "5 Factors of Your Score" lesson text.
const factors = [
  { name: "Payment History", weight: 35, fill: "bg-navy", line: "Paying on time, every time. One payment 30 days late can drop a good score 50 to 100 points." },
  { name: "Credit Utilization", weight: 30, fill: "bg-[#2e5a9a]", line: "How much of your limits you're using. Stay under 30%, ideally under 10%." },
  { name: "Credit Age", weight: 15, fill: "bg-[#4f78b5]", line: "How long your accounts have been open. Older is better, so don't close old cards." },
  { name: "Hard Inquiries", weight: 10, fill: "bg-[#84a3d0]", line: "New applications. Each one dips your score a few points for a while." },
  { name: "Total Accounts", weight: 10, fill: "bg-[#b4c7e3]", line: "Your mix of cards and loans. The least impactful factor." },
];

/** The 5 Factors: a weighted bar you can explore, highlighting the two factors that matter most. */
export function FiveFactors() {
  const [active, setActive] = useState(0);
  const f = factors[active];

  return (
    <VisualFrame title="What your score is made of">
      {/* Bracket over the two biggest factors */}
      <div className="flex text-[11px] font-bold text-[#7a5a22] sm:text-xs" aria-hidden="true">
        <div className="w-[65%] border-x-2 border-t-2 border-brass px-2 pt-1 pb-1.5 text-center">
          65% · the two you control most
        </div>
      </div>

      <div className="flex h-12 overflow-hidden rounded-xl" aria-hidden="true">
        {factors.map((x, i) => (
          <div
            key={x.name}
            className={cn(
              "flex items-center justify-center text-xs font-bold transition-opacity sm:text-sm",
              x.fill,
              i < 3 ? "text-white" : "text-navy",
              i !== active && "opacity-55",
            )}
            style={{ width: `${x.weight}%` }}
          >
            {x.weight}%
          </div>
        ))}
      </div>

      <div role="group" aria-label="Score factors" className="mt-5 grid gap-2 sm:grid-cols-5">
        {factors.map((x, i) => (
          <button
            key={x.name}
            type="button"
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm font-semibold transition-colors sm:flex-col sm:items-start sm:gap-1",
              i === active ? "border-navy bg-card text-navy shadow-sm" : "border-border bg-card/60 text-muted-foreground hover:text-navy",
            )}
          >
            <span className={cn("size-3 shrink-0 rounded-sm", x.fill)} aria-hidden="true" />
            <span className="flex-1 leading-tight">{x.name}</span>
            <span className="tabular-nums">{x.weight}%</span>
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-xl bg-card p-4 ring-1 ring-border" aria-live="polite">
        <p className="font-bold text-navy">
          {f.name} · {f.weight}%
        </p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.line}</p>
      </div>
    </VisualFrame>
  );
}
