"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import { ArrowRight, Check, ChevronLeft, CircleCheck, Info, Lock, Quote, RotateCcw } from "lucide-react";
import { LogoMark } from "@/components/layout/Logo";
import { HysaEarnings } from "@/components/lesson-visuals/playbook/HysaEarnings";
import {
  EMPTY_ANSWERS,
  SECTIONS,
  STATUS_LABEL,
  buildPlan,
  getQuestions,
  type Answers,
  type PlanSection,
  type Question,
} from "@/lib/playbook/plan";
import { cn } from "@/lib/utils";

const FOUNDER_EMAIL = "david.vargas024@gmail.com";

// ─── QuestionStep component ───────────────────────────────────────────────────

function QuestionStep({
  question,
  initial,
  onAnswer,
  onBack,
  canGoBack,
}: {
  question: Question;
  initial: string[];
  onAnswer: (value: string | string[]) => void;
  onBack: () => void;
  canGoBack: boolean;
}) {
  const [selected, setSelected] = useState<string[]>(initial);
  const multi = question.multi ?? 0;

  const choose = (id: string) => {
    if (multi) {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < multi ? [...prev, id] : prev,
      );
      return;
    }
    setSelected([id]);
    // Brief pause before advancing so the selection is clearly visible and
    // reads as a deliberate confirmation rather than an instant context change.
    setTimeout(() => onAnswer(id), 800);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Progress by section, so the count never jumps */}
      <div className="mb-3 flex items-center gap-2" aria-hidden="true">
        {SECTIONS.map((name, i) => (
          <div
            key={name}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors duration-300",
              i <= question.section ? "bg-navy" : "bg-muted",
            )}
          />
        ))}
      </div>
      <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
        Part {question.section + 1} of {SECTIONS.length} · {SECTIONS[question.section]}
      </p>
      <h2 className="mt-3 mb-7 text-2xl font-extrabold tracking-[-0.02em] text-navy sm:text-3xl">{question.question}</h2>

      <div className="flex flex-col gap-3">
        {question.options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selected.includes(opt.id);
          const full = multi > 0 && selected.length >= multi && !isSelected;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => choose(opt.id)}
              aria-pressed={isSelected}
              disabled={(!multi && selected.length > 0 && !isSelected) || full}
              className={cn(
                "group flex items-center gap-4 rounded-2xl p-4 text-left transition-all duration-200 sm:p-5",
                isSelected
                  ? "bg-navy text-white shadow-md"
                  : "bg-card ring-1 ring-border hover:-translate-y-0.5 hover:ring-navy/40 hover:shadow-sm disabled:opacity-50 disabled:hover:translate-y-0",
              )}
            >
              <span
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center rounded-[14px] transition-colors",
                  isSelected ? "bg-white/10" : "bg-secondary group-hover:bg-navy/10",
                )}
              >
                <Icon className={cn("size-[22px]", isSelected ? "text-brass" : "text-navy")} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className={cn("block font-bold", isSelected ? "text-white" : "text-navy")}>{opt.label}</span>
                <span className={cn("block text-sm", isSelected ? "text-[#c9d2e0]" : "text-muted-foreground")}>{opt.desc}</span>
              </span>
              {isSelected && (
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brass">
                  <Check className="size-4 text-navy-deep" strokeWidth={3} aria-hidden="true" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        {canGoBack ? (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 rounded-full px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-navy"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
            Back
          </button>
        ) : (
          <span />
        )}
        {multi > 0 && (
          <button
            type="button"
            onClick={() => onAnswer(selected)}
            disabled={selected.length === 0}
            className="flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy/90 disabled:opacity-40"
          >
            Build my plan
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Plan section ─────────────────────────────────────────────────────────────

function PlanCard({ section, index }: { section: PlanSection; index: number }) {
  const Icon = section.icon;
  return (
    <section
      id={`plan-${section.id}`}
      aria-labelledby={`plan-${section.id}-title`}
      className="scroll-mt-24 overflow-hidden rounded-2xl bg-card ring-1 ring-border"
    >
      <div className={cn("flex items-start gap-4 px-5 py-5 sm:px-7", section.military ? "bg-navy text-white" : "border-b border-border")}>
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-[14px]",
            section.military ? "bg-white/10" : "bg-secondary",
          )}
        >
          <Icon className={cn("size-5", section.military ? "text-brass" : "text-navy")} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className={cn("text-xs font-semibold tracking-[0.14em] uppercase", section.military ? "text-brass" : "text-[#7a5a22]")}>
            Priority {index + 1}
          </p>
          <h2 id={`plan-${section.id}-title`} className={cn("mt-1 text-xl font-extrabold tracking-tight", !section.military && "text-navy")}>
            {section.title}
          </h2>
          {section.subtitle && (
            <p className={cn("mt-0.5 text-sm", section.military ? "text-[#c9d2e0]" : "text-muted-foreground")}>{section.subtitle}</p>
          )}
        </div>
      </div>

      <div className="px-5 py-6 sm:px-7">
        <ol className="flex flex-col">
          {section.steps.map((step, i) => (
            <li key={i} className="relative flex gap-4 pb-6 last:pb-0">
              {i < section.steps.length - 1 && (
                <span className="absolute top-9 bottom-1 left-[15px] w-px bg-navy/15" aria-hidden="true" />
              )}
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                  section.military ? "bg-brass text-navy-deep" : "bg-navy text-white",
                )}
              >
                {i + 1}
              </span>
              <div className="pt-0.5">
                <p className="font-bold text-navy">{step.title}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        {section.hysaAmount !== undefined && <HysaEarnings initialAmount={section.hysaAmount} />}

        {section.note && (
          <figure className="mt-6 flex gap-3 rounded-xl bg-surface p-5 ring-1 ring-border">
            <Quote className="size-5 shrink-0 text-brass-deep" aria-hidden="true" />
            <div>
              <blockquote className="text-[15px] leading-relaxed text-navy">{section.note}</blockquote>
              <figcaption className="mt-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">— David</figcaption>
            </div>
          </figure>
        )}
      </div>
    </section>
  );
}

// ─── Result component ─────────────────────────────────────────────────────────

function ResultView({ answers, onRestart }: { answers: Answers; onRestart: () => void }) {
  const plan = buildPlan(answers);
  const chips = [answers.status ? STATUS_LABEL[answers.status] : null, answers.age && `Age ${answers.age.replace("-plus", "+").replace("under-", "under ")}`].filter(Boolean) as string[];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header card */}
      <div className="rounded-2xl bg-navy-deep p-6 text-white sm:p-8">
        <p className="text-xs font-semibold tracking-[0.14em] text-brass uppercase">What I would do if I were you</p>
        <h1 className="mt-2 text-3xl leading-tight font-extrabold tracking-[-0.02em]">Your plan, in order</h1>
        <p className="mt-2 text-[15px] text-[#c9d2e0]">
          Work through these one at a time. Each priority sets you up for the next.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span key={c} className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-[#d5dce7]">
              {c}
            </span>
          ))}
        </div>

        <ol className="mt-6 grid gap-2 border-t border-white/10 pt-5 sm:grid-cols-2">
          {plan.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#plan-${s.id}`}
                className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm text-[#e1e7f0] transition-colors hover:bg-white/10"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-brass">
                  {i + 1}
                </span>
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </div>

      {/* Disclaimer */}
      <div className="mt-4 flex gap-3 rounded-xl bg-card p-4 ring-1 ring-border">
        <Info className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <p className="text-xs leading-relaxed text-muted-foreground">
          <span className="font-semibold text-navy">Not financial advice.</span>{" "}This is my personal take — what I would personally do in this situation. I&apos;m not a financial advisor. I&apos;ve shared this with real people, they took action on their own, and it worked. You make your own call.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-6">
        {plan.map((section, i) => (
          <PlanCard key={section.id} section={section} index={i} />
        ))}
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="mt-10 flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-secondary"
      >
        <RotateCcw className="size-4" aria-hidden="true" />
        Start over with a different situation
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PlaybookPage() {
  const { user } = useUser();
  const isFounder = user?.primaryEmailAddress?.emailAddress === FOUNDER_EMAIL;
  const [cbProgress, setCbProgress] = useState(false);
  const [ccProgress, setCcProgress] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);

  useEffect(() => {
    if (isFounder) return;
    fetch("/api/progress")
      .then((r) => r.json())
      .then((data) => {
        setCbProgress(((data["credit-basics"] ?? []) as string[]).includes("pyc-quiz"));
        setCcProgress(((data["credit-cards-101"] ?? []) as string[]).includes("bcs-quiz"));
      })
      .catch(() => {});
  }, [isFounder]);

  // The founder account has every course unlocked.
  const cbDone = isFounder || cbProgress;
  const ccDone = isFounder || ccProgress;
  const unlocked = cbDone && ccDone;

  const questions = getQuestions(answers);
  const showResult = stepIndex >= questions.length;
  const current = questions[stepIndex];

  /** Keep answers to the questions before `index`; later answers may no longer apply. */
  const answersBefore = (index: number): Answers => {
    const kept: Answers = { ...EMPTY_ANSWERS };
    for (const q of questions.slice(0, index)) {
      (kept as Record<string, unknown>)[q.id] = answers[q.id];
    }
    return kept;
  };

  const handleAnswer = (value: string | string[]) => {
    const next = answersBefore(stepIndex);
    (next as Record<string, unknown>)[current.id] = value;
    setAnswers(next);
    setStepIndex((i) => i + 1);
    window.scrollTo({ top: 0 });
  };

  const handleBack = () => {
    const prev = Math.max(0, stepIndex - 1);
    setAnswers(answersBefore(prev));
    setStepIndex(prev);
  };

  const handleRestart = () => {
    setAnswers(EMPTY_ANSWERS);
    setStepIndex(0);
    window.scrollTo({ top: 0 });
  };

  const courseStatus = [
    { title: "Credit Basics", href: "/courses/credit-basics", done: cbDone },
    { title: "Credit Cards 101", href: "/courses/credit-cards-101", done: ccDone },
  ];

  const initialFor = (q: Question): string[] => {
    const v = answers[q.id];
    return Array.isArray(v) ? v : v ? [v] : [];
  };

  return (
    <div className="flex min-h-[100dvh] flex-col bg-surface">
      <header className="shrink-0 border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/courses"
              className="flex shrink-0 items-center gap-1.5 rounded-full px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-navy"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">All courses</span>
              <span className="sr-only sm:hidden">All courses</span>
            </Link>
            <span className="h-6 w-px shrink-0 bg-border" aria-hidden="true" />
            <LogoMark className="hidden h-6 w-5 sm:block" />
            <p className="truncate font-bold text-navy">David&apos;s Playbook</p>
          </div>
          <UserButton />
        </div>
      </header>

      <main className="flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-2xl">
          {/* Intro (while answering) */}
          {unlocked && !showResult && (
            <div className="mb-10">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#7a5a22] uppercase">Bonus · David&apos;s Playbook</p>
              <h1 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] text-navy sm:text-4xl">
                What I Would Do If I&hellip;
              </h1>
              <p className="mt-3 text-[17px] text-muted-foreground">
                Answer a few quick questions about you, your money, your credit, and your goals, and get the
                step-by-step plan I&apos;d follow in your exact situation.
              </p>
            </div>
          )}

          {/* Locked */}
          {!unlocked && (
            <div className="flex flex-col items-center py-12 text-center">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-card ring-1 ring-border">
                <Lock className="size-7 text-muted-foreground" aria-hidden="true" />
              </div>
              <p className="mt-6 text-xs font-semibold tracking-[0.14em] text-[#7a5a22] uppercase">David&apos;s Playbook</p>
              <h1 className="mt-2 text-2xl font-extrabold tracking-[-0.02em] text-navy sm:text-3xl">
                Finish both courses to unlock this
              </h1>
              <p className="mt-3 max-w-sm text-[15px] text-muted-foreground">
                Complete Credit Basics and Credit Cards 101 first. This is where it all comes together.
              </p>
              <ul className="mt-8 flex w-full max-w-sm flex-col gap-3">
                {courseStatus.map((c) => (
                  <li key={c.href}>
                    <Link
                      href={c.href}
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-2xl bg-card p-4 text-left ring-1 transition-colors hover:bg-secondary/50",
                        c.done ? "ring-emerald-300" : "ring-border",
                      )}
                    >
                      <span className="flex items-center gap-3">
                        {c.done ? (
                          <CircleCheck className="size-5 text-emerald-600" aria-hidden="true" />
                        ) : (
                          <span className="size-5 rounded-full border-2 border-border" aria-hidden="true" />
                        )}
                        <span className="font-semibold text-navy">{c.title}</span>
                      </span>
                      <span className={cn("text-xs font-semibold", c.done ? "text-emerald-700" : "text-muted-foreground")}>
                        {c.done ? "Done" : "Not done"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Questions */}
          {unlocked && !showResult && current && (
            <div className="rounded-2xl bg-card p-6 ring-1 ring-border sm:p-8">
              <QuestionStep
                key={`${stepIndex}-${current.id}`}
                question={current}
                initial={initialFor(current)}
                onAnswer={handleAnswer}
                onBack={handleBack}
                canGoBack={stepIndex > 0}
              />
            </div>
          )}

          {/* Plan */}
          {unlocked && showResult && <ResultView answers={answers} onRestart={handleRestart} />}
        </div>
      </main>
    </div>
  );
}
