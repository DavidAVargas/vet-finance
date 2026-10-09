"use client";

import { useState } from "react";
import { CircleCheck, CircleX } from "lucide-react";
import { VisualFrame } from "@/components/lesson-visuals/VisualFrame";
import { cn } from "@/lib/utils";

// Deadlines counted from your separation date, from the lessons in this course.
const deadlines = [
  { label: "One-time VA dental care", days: 180 },
  { label: "VGLI with no health questions", days: 240 },
  { label: "Disability back pay to the day after discharge", days: 365 },
  { label: "Free MilTax filing", days: 365 },
  { label: "Convert SGLI to VGLI at all", days: 485 },
  { label: "VA health care without a rating (combat veterans)", days: 3650 },
];

const moments = [
  { label: "Just got out", days: 0 },
  { label: "3 months", days: 91 },
  { label: "7 months", days: 213 },
  { label: "10 months", days: 304 },
  { label: "15 months", days: 456 },
  { label: "2 years", days: 730 },
];

const describe = (d: number) => {
  if (d >= 365) {
    const years = Math.floor(d / 365);
    const months = Math.round((d % 365) / 30.4);
    return [`${years} yr`, months ? `${months} mo` : ""].filter(Boolean).join(" ");
  }
  return d >= 60 ? `${Math.round(d / 30.4)} months` : `${d} days`;
};

/** Benefits Most Vets Never Claim: which post-separation deadlines are still open. */
export function DeadlineTracker() {
  const [index, setIndex] = useState(0);
  const now = moments[index].days;
  const open = deadlines.filter((d) => d.days > now).length;

  return (
    <VisualFrame
      title="Your deadline clock after you get out"
      tryIt="Pick how long ago you separated"
      caption="Dates count from your separation date. Some have exceptions, so confirm with the VA or a VSO before a deadline passes."
    >
      <div role="group" aria-label="Time since separation" data-nudge className="flex flex-wrap gap-2 rounded-full">
        {moments.map((m, i) => (
          <button
            key={m.label}
            type="button"
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
            className={cn(
              "rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors",
              i === index ? "border-navy bg-navy text-white" : "border-brass-deep/50 bg-card text-navy hover:bg-secondary",
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      <ul aria-live="polite" className="mt-5 flex flex-col gap-2">
        {deadlines.map((d) => {
          const isOpen = d.days > now;
          const used = Math.min(1, now / d.days);
          return (
            <li key={d.label} className={cn("rounded-xl bg-card px-4 py-3 ring-1", isOpen ? "ring-border" : "ring-[#b42318]/25")}>
              <div className="flex items-center gap-3">
                {isOpen ? (
                  <CircleCheck className="size-5 shrink-0 text-emerald-600" aria-label="Still open" />
                ) : (
                  <CircleX className="size-5 shrink-0 text-[#b42318]" aria-label="Closed" />
                )}
                <span className={cn("flex-1 text-sm font-semibold", isOpen ? "text-navy" : "text-muted-foreground line-through")}>
                  {d.label}
                </span>
                <span className={cn("shrink-0 text-xs font-bold tabular-nums", isOpen ? "text-emerald-700" : "text-[#b42318]")}>
                  {isOpen ? `${describe(d.days - now)} left` : "Closed"}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted" aria-hidden="true">
                <div
                  className={cn("h-full rounded-full transition-all duration-300", isOpen ? "bg-navy" : "bg-[#b42318]/70")}
                  style={{ width: `${(used * 100).toFixed(2)}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 rounded-xl bg-navy px-4 py-3 text-sm text-white">
        <span className="font-bold text-brass">{open} of {deadlines.length}</span> still open. Still in uniform? File your
        disability claim 180–90 days before you separate (BDD).
      </p>
    </VisualFrame>
  );
}
