import { ArrowDown, ArrowRight, RefreshCw } from "lucide-react";
import { VisualFrame } from "@/components/lesson-visuals/VisualFrame";

const steps = [
  "Higher interest rates on everything",
  "Bigger monthly payments",
  "Nothing left over to save",
  "No emergency cushion",
  "The next surprise goes on high-interest debt",
];

// Points around the loop, as percentages of the square diagram.
const RADIUS = 36;
const point = (deg: number) => ({
  left: `${50 + RADIUS * Math.cos((deg * Math.PI) / 180)}%`,
  top: `${50 + RADIUS * Math.sin((deg * Math.PI) / 180)}%`,
});

/** The Cost of Bad Credit: the self-reinforcing loop that keeps people stuck. */
export function BadCreditCycle() {
  return (
    <VisualFrame
      title="The bad-credit trap"
      caption="Each step feeds the next. Raising your score is what breaks the loop."
    >
      {/* Loop diagram (tablet and up) */}
      <div className="relative mx-auto hidden aspect-square w-full max-w-[30rem] sm:block">
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden="true">
          <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="#13294b" strokeOpacity="0.18" strokeWidth="0.6" strokeDasharray="1.6 1.4" />
        </svg>

        {steps.map((_, i) => {
          const mid = -90 + i * 72 + 36;
          return (
            <ArrowRight
              key={`arrow-${i}`}
              aria-hidden="true"
              className="absolute size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface text-brass"
              style={{ ...point(mid), rotate: `${mid + 90}deg` }}
            />
          );
        })}

        <div className="absolute top-1/2 left-1/2 w-40 -translate-x-1/2 -translate-y-1/2 text-center">
          <RefreshCw className="mx-auto size-6 text-navy/40" aria-hidden="true" />
          <p className="mt-2 text-sm font-bold text-navy">It repeats</p>
          <p className="text-xs text-muted-foreground">month after month</p>
        </div>

        <ol>
          {steps.map((step, i) => (
            <li
              key={step}
              className="absolute w-32 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card p-3 text-center shadow-sm"
              style={point(-90 + i * 72)}
            >
              <span className="mx-auto flex size-6 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                {i + 1}
              </span>
              <span className="mt-1.5 block text-[13px] leading-snug font-semibold text-navy">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Stacked version (phones) */}
      <ol className="flex flex-col items-stretch sm:hidden">
        {steps.map((step, i) => (
          <li key={step} className="flex flex-col items-center">
            <div className="flex w-full items-center gap-3 rounded-xl border border-border bg-card p-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                {i + 1}
              </span>
              <span className="text-sm font-semibold text-navy">{step}</span>
            </div>
            {i < steps.length - 1 && <ArrowDown className="my-1 size-4 text-brass" aria-hidden="true" />}
          </li>
        ))}
        <li className="mt-2 flex items-center justify-center gap-2 text-sm font-semibold text-navy">
          <RefreshCw className="size-4 text-brass" aria-hidden="true" />
          Back to step 1
        </li>
      </ol>
    </VisualFrame>
  );
}
