"use client";

import { useState } from "react";
import { CircleAlert, RotateCcw, ShieldCheck } from "lucide-react";
import { VisualFrame } from "@/components/lesson-visuals/VisualFrame";
import { cn } from "@/lib/utils";

// Mirrors the three situations the lesson lists under "What the No Surprises Act covers".
const questions = [
  "Was it emergency care?",
  "Was it non-emergency care at an in-network hospital or facility, from a provider you didn't get to choose?",
  "Was it an air ambulance?",
];

type Result = "protected" | "likely" | "not-covered";

const results: Record<Result, { title: string; body: string; good: boolean }> = {
  protected: {
    title: "You're likely protected",
    body: "You should only owe your normal in-network cost sharing. Call your insurer and ask them to reprocess it. If that doesn't work, call the No Surprises help desk at 1-800-985-3059.",
    good: true,
  },
  likely: {
    title: "Probably protected",
    body: "Air ambulance bills from many providers are covered. Ask your insurer to process it at in-network rates, and call 1-800-985-3059 if they won't.",
    good: true,
  },
  "not-covered": {
    title: "Probably not covered by the No Surprises Act",
    body: "You still have options: request an itemized bill, ask for the cash-pay or financial assistance rate, and negotiate, just like the steps in Lesson 1.",
    good: false,
  },
};

/** Surprise Bills: a quick yes/no check against the No Surprises Act situations. */
export function SurpriseBillChecker() {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<Result | null>(null);

  const answer = (yes: boolean) => {
    if (yes) setResult(step === 2 ? "likely" : "protected");
    else if (step < questions.length - 1) setStep(step + 1);
    else setResult("not-covered");
  };
  const reset = () => {
    setStep(0);
    setResult(null);
  };

  return (
    <VisualFrame
      title="Is my surprise bill protected?"
      tryIt="Answer a few yes/no questions about your bill"
      caption="General guidance based on the No Surprises Act, not legal advice."
    >
      <div aria-live="polite">
        {result ? (
          <div
            className={cn(
              "rounded-2xl p-5",
              results[result].good ? "bg-emerald-50 ring-1 ring-emerald-200" : "bg-card ring-1 ring-border",
            )}
          >
            <p className={cn("flex items-center gap-2 text-lg font-bold", results[result].good ? "text-emerald-800" : "text-navy")}>
              {results[result].good ? (
                <ShieldCheck className="size-5 shrink-0" aria-hidden="true" />
              ) : (
                <CircleAlert className="size-5 shrink-0" aria-hidden="true" />
              )}
              {results[result].title}
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-foreground/80">{results[result].body}</p>
          </div>
        ) : (
          <div className="rounded-2xl bg-card p-5 ring-1 ring-border">
            <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Question {step + 1} of {questions.length}
            </p>
            <p className="mt-2 text-lg leading-snug font-bold text-navy">{questions[step]}</p>
            <div className="mt-5 flex gap-3" data-nudge>
              <button
                type="button"
                onClick={() => answer(true)}
                className="min-w-20 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy/90"
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => answer(false)}
                className="min-w-20 rounded-full border border-brass-deep/50 bg-card px-5 py-2.5 text-sm font-semibold text-navy hover:bg-secondary"
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>

      {(result || step > 0) && (
        <button
          type="button"
          onClick={reset}
          className="mt-4 flex items-center gap-1.5 rounded-full px-2 py-1.5 text-sm font-semibold text-muted-foreground hover:text-navy"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          Start over
        </button>
      )}
    </VisualFrame>
  );
}
