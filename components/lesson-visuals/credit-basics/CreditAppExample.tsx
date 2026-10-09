import { VisualFrame } from "@/components/lesson-visuals/VisualFrame";
import { cn } from "@/lib/utils";

const SCORE = 712;

// The six factors listed in the "Credit Karma — Useful but Not Perfect" lesson.
const factors = [
  { name: "Payment history", value: "100%", impact: "High", rating: "Excellent" },
  { name: "Credit utilization", value: "8%", impact: "High", rating: "Excellent" },
  { name: "Credit age", value: "4 yrs 2 mos", impact: "Medium", rating: "Fair" },
  { name: "Hard inquiries", value: "2", impact: "Low", rating: "Good" },
  { name: "Derogatory marks", value: "0", impact: "High", rating: "Excellent" },
  { name: "Total accounts", value: "6", impact: "Low", rating: "Fair" },
];

const ratingStyle: Record<string, string> = {
  Excellent: "bg-emerald-50 text-emerald-700",
  Good: "bg-secondary text-navy",
  Fair: "bg-amber-50 text-amber-800",
};

/** Tracking Your Credit: what a free credit-monitoring app typically shows. */
export function CreditAppExample() {
  const r = 42;
  const circumference = 2 * Math.PI * r;
  const filled = ((SCORE - 300) / 550) * circumference;

  return (
    <VisualFrame
      title="Example: what a free credit app shows you"
      caption="Illustration only, not a real account. Check yours once a month; it's a soft pull and never hurts your score."
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex shrink-0 flex-col items-center rounded-2xl bg-card p-5 ring-1 ring-border sm:w-52">
          <div className="relative size-32">
            <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden="true">
              <circle cx="50" cy="50" r={r} fill="none" stroke="#eef2f8" strokeWidth="9" />
              <circle
                cx="50"
                cy="50"
                r={r}
                fill="none"
                stroke="#13294b"
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray={`${filled} ${circumference}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-navy">{SCORE}</span>
              <span className="text-xs font-semibold text-muted-foreground">Good</span>
            </div>
          </div>
          <div className="mt-4 flex gap-1 rounded-full bg-surface p-1 text-xs font-semibold" aria-hidden="true">
            <span className="rounded-full bg-navy px-2.5 py-1 text-white">TransUnion</span>
            <span className="px-2.5 py-1 text-muted-foreground">Equifax</span>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">VantageScore 3.0</p>
        </div>

        <ul className="flex-1 divide-y divide-border overflow-hidden rounded-2xl bg-card ring-1 ring-border">
          {factors.map((f) => (
            <li key={f.name} className="flex items-center gap-3 px-4 py-2.5">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-navy">{f.name}</p>
                <p className="text-xs text-muted-foreground">{f.impact} impact</p>
              </div>
              <span className="text-sm font-bold text-navy tabular-nums">{f.value}</span>
              <span className={cn("w-20 rounded-full px-2 py-0.5 text-center text-xs font-semibold", ratingStyle[f.rating])}>
                {f.rating}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </VisualFrame>
  );
}
