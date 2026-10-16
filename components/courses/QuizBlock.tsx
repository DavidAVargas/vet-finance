"use client";

import { useState } from "react";
import { Check, RotateCcw, Trophy, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

/** End-of-section quiz. Passing (2/3 correct) calls onPass, which unlocks the next section. */
export function QuizBlock({
  sectionLabel,
  questions,
  onPass,
}: {
  sectionLabel: string;
  questions: QuizQuestion[];
  onPass?: () => void;
}) {
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [passed, setPassed] = useState(false);

  const allAnswered = questions.every((_, i) => selected[i] !== undefined);
  const answeredCount = Object.keys(selected).length;
  const score = questions.filter((q, i) => selected[i] === q.correct).length;
  const passThreshold = Math.ceil(questions.length * (2 / 3));

  const handleSubmit = () => {
    const didPass = score >= passThreshold;
    setSubmitted(true);
    setPassed(didPass);
    if (didPass) onPass?.();
  };

  const handleRetry = () => {
    setSelected({});
    setSubmitted(false);
    setPassed(false);
  };

  return (
    <div>
      <p className="mb-3 text-xs font-bold tracking-[0.14em] text-[#7a5a22] uppercase">{sectionLabel} · Quiz</p>
      <h1 className="mb-3 text-3xl leading-[1.1] font-extrabold tracking-[-0.03em] text-navy sm:text-4xl">Knowledge check</h1>
      <p className="mb-10 text-[17px] text-[#3b4658]">
        Get {passThreshold} of {questions.length} right to unlock the next section.
      </p>

      <ol className="flex flex-col gap-6">
        {questions.map((q, qi) => {
          const isCorrect = submitted && selected[qi] === q.correct;
          return (
            <li key={qi} className="rounded-2xl bg-card p-5 ring-1 ring-border sm:p-6">
              <p className="mb-4 flex gap-3 text-[17px] leading-snug font-bold text-navy">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-sm text-navy">
                  {qi + 1}
                </span>
                <span className="pt-0.5">{q.question}</span>
              </p>
              <div role="group" aria-label={`Question ${qi + 1} options`} className="flex flex-col gap-2">
                {q.options.map((opt, oi) => {
                  const isSelected = selected[qi] === oi;
                  const isCorrectOption = submitted && oi === q.correct;
                  const isWrongSelected = submitted && isSelected && oi !== q.correct;
                  return (
                    <button
                      key={oi}
                      type="button"
                      disabled={submitted}
                      onClick={() => setSelected((prev) => ({ ...prev, [qi]: oi }))}
                      aria-pressed={isSelected}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-[15px] transition-colors",
                        isCorrectOption
                          ? "border-emerald-500 bg-emerald-50 text-navy"
                          : isWrongSelected
                            ? "border-[#b42318]/50 bg-[#b42318]/5 text-navy"
                            : isSelected
                              ? "border-navy bg-secondary font-medium text-navy"
                              : "border-border text-[#3b4658] hover:border-navy/40 hover:bg-surface",
                        submitted ? "cursor-default" : "cursor-pointer",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                          isCorrectOption
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : isWrongSelected
                              ? "border-[#b42318] bg-[#b42318] text-white"
                              : isSelected
                                ? "border-navy bg-navy text-white"
                                : "border-border text-muted-foreground",
                        )}
                        aria-hidden="true"
                      >
                        {isCorrectOption ? (
                          <Check className="size-3.5" strokeWidth={3} />
                        ) : isWrongSelected ? (
                          <X className="size-3.5" strokeWidth={3} />
                        ) : (
                          String.fromCharCode(65 + oi)
                        )}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <p
                  className={cn(
                    "mt-4 rounded-xl px-4 py-3 text-[15px] leading-relaxed",
                    isCorrect ? "bg-emerald-50 text-emerald-900" : "bg-surface text-[#3b4658]",
                  )}
                >
                  <span className="font-bold">{isCorrect ? "Correct. " : "Here's why: "}</span>
                  {q.explanation}
                </p>
              )}
            </li>
          );
        })}
      </ol>

      {submitted ? (
        <div
          role="status"
          className={cn(
            "mt-8 rounded-2xl p-6 text-center",
            passed ? "bg-navy-deep text-white" : "bg-surface ring-1 ring-border",
          )}
        >
          {passed ? (
            <>
              <Trophy className="mx-auto size-7 text-brass" aria-hidden="true" />
              <p className="mt-3 text-xl font-extrabold">
                You passed: {score} of {questions.length}
              </p>
              <p className="mt-1 text-[15px] text-[#c9d2e0]">The next section is unlocked.</p>
            </>
          ) : (
            <>
              <p className="text-xl font-extrabold text-navy">
                {score} of {questions.length}: not quite
              </p>
              <p className="mt-1 mb-5 text-[15px] text-muted-foreground">
                Read the explanations above, then give it another shot.
              </p>
              <button
                type="button"
                onClick={handleRetry}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-input bg-card px-6 text-sm font-semibold text-navy hover:bg-secondary"
              >
                <RotateCcw className="size-4" aria-hidden="true" />
                Try again
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            disabled={!allAnswered}
            onClick={handleSubmit}
            className="inline-flex h-12 items-center rounded-full bg-navy px-7 text-base font-semibold text-white transition-colors hover:bg-navy/90 disabled:opacity-40"
          >
            Submit answers
          </button>
          <span className="text-sm text-muted-foreground">
            {answeredCount} of {questions.length} answered
          </span>
        </div>
      )}
    </div>
  );
}
