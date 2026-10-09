import { ArrowRight } from "lucide-react";
import { VisualFrame } from "@/components/lesson-visuals/VisualFrame";
import { cn } from "@/lib/utils";

// The Chase → Hyatt example from the "How to Actually Use Your Points" lesson.
const paths = [
  {
    how: "Book through the Chase travel portal",
    rate: "1¢ per point",
    result: "$200",
    resultNote: "toward a hotel",
    best: false,
  },
  {
    how: "Transfer 1:1 to World of Hyatt",
    rate: "2.5¢ per point",
    result: "$500",
    resultNote: "a full night at a high-end Hyatt",
    best: true,
  },
];

/** How to Actually Use Your Points: one balance, two redemption paths. */
export function TwoWaysToRedeem() {
  return (
    <VisualFrame
      title="Two ways to spend 20,000 points"
      caption="Example from the lesson. Award prices vary by hotel and date."
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
        <div className="flex shrink-0 flex-col items-center justify-center rounded-2xl bg-navy px-6 py-5 text-center text-white sm:w-40">
          <p className="text-3xl font-extrabold tabular-nums">20,000</p>
          <p className="mt-1 text-sm text-[#c9d2e0]">Chase points</p>
        </div>

        <ol className="flex flex-1 flex-col gap-3">
          {paths.map((p) => (
            <li
              key={p.how}
              className={cn(
                "flex items-center gap-3 rounded-2xl bg-card p-4",
                p.best ? "ring-2 ring-emerald-600" : "ring-1 ring-border",
              )}
            >
              <ArrowRight className="hidden size-5 shrink-0 text-brass-deep sm:block" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-navy">{p.how}</p>
                <p className="text-xs text-muted-foreground">{p.rate}</p>
              </div>
              <div className="text-right">
                <p className={cn("text-2xl font-extrabold tabular-nums", p.best ? "text-emerald-700" : "text-navy")}>{p.result}</p>
                <p className="text-xs text-muted-foreground">{p.resultNote}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-4 rounded-xl bg-navy px-4 py-3 text-sm text-white">
        Same points, <span className="font-bold text-brass">2.5x the value</span>, just by transferring instead of using the portal.
      </p>
    </VisualFrame>
  );
}
