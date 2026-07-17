"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Lock,
  CheckCircle2,
  Circle,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/DarkLightMode/theme-toggle";
import Link from "next/link";

// ─── Mock user ────────────────────────────────────────────────────────────────

const mockUser = { name: "David", rank: "Veteran" };

// ─── Course structure ─────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: "car-trap",
    title: "The Car Trap",
    noQuiz: false,
    lessons: [
      { id: "ct-1", title: "The 72-Month Lie" },
      { id: "ct-2", title: "What a Car Actually Costs You" },
      { id: "ct-quiz", title: "Quiz", isQuiz: true },
    ],
  },
  {
    id: "medical-debt",
    title: "Medical Debt",
    noQuiz: false,
    lessons: [
      { id: "md-1", title: "Hospital Bills Are Negotiable" },
      { id: "md-2", title: "Surprise Bills and What To Do" },
      { id: "md-quiz", title: "Quiz", isQuiz: true },
    ],
  },
  {
    id: "student-loans",
    title: "Student Loans",
    noQuiz: false,
    lessons: [
      { id: "sl-1", title: "It's Manageable — If You're Smart" },
      { id: "sl-2", title: "Pay It Off As Fast As You Can" },
      { id: "sl-quiz", title: "Quiz", isQuiz: true },
    ],
  },
];

// ─── Quiz component ───────────────────────────────────────────────────────────

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

function QuizBlock({ sectionLabel, questions, onPass }: {
  sectionLabel: string;
  questions: QuizQuestion[];
  onPass?: () => void;
}) {
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [passed, setPassed] = useState(false);

  const allAnswered = questions.every((_, i) => selected[i] !== undefined);
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
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {sectionLabel} · Quiz
      </p>
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">Knowledge Check</h1>
      <p className="mb-8 text-base text-muted-foreground">
        You need {passThreshold} out of {questions.length} to pass.
      </p>
      <div className="flex flex-col gap-8">
        {questions.map((q, qi) => {
          const isCorrect = submitted && selected[qi] === q.correct;
          return (
            <div key={qi}>
              <p className="mb-3 font-semibold text-foreground">
                <span className="mr-2 font-mono text-xs text-muted-foreground/60">{qi + 1}.</span>
                {q.question}
              </p>
              <div className="flex flex-col gap-2">
                {q.options.map((opt, oi) => {
                  const isSelected = selected[qi] === oi;
                  const isCorrectOption = submitted && oi === q.correct;
                  const isWrongSelected = submitted && isSelected && oi !== q.correct;
                  return (
                    <button
                      key={oi}
                      disabled={submitted}
                      onClick={() => !submitted && setSelected((prev) => ({ ...prev, [qi]: oi }))}
                      className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                        isCorrectOption ? "border-green-500 bg-green-500/10 text-foreground"
                        : isWrongSelected ? "border-red-400 bg-red-400/10 text-foreground"
                        : isSelected ? "border-foreground bg-muted text-foreground"
                        : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                      } ${submitted ? "cursor-default" : "cursor-pointer"}`}
                    >
                      <span className={`flex size-5 shrink-0 items-center justify-center rounded-full border text-xs font-medium ${
                        isCorrectOption ? "border-green-500 bg-green-500 text-white"
                        : isWrongSelected ? "border-red-400 bg-red-400 text-white"
                        : isSelected ? "border-foreground bg-foreground text-background"
                        : "border-border"
                      }`}>
                        {isCorrectOption ? "✓" : isWrongSelected ? "✗" : String.fromCharCode(65 + oi)}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <p className={`mt-3 rounded-lg px-3 py-2 text-sm ${isCorrect ? "bg-green-500/10 text-green-700 dark:text-green-400" : "bg-muted text-muted-foreground"}`}>
                  {q.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>
      {submitted ? (
        <div className={`mt-8 rounded-xl border p-5 text-center ${passed ? "border-green-500 bg-green-500/10" : "border-border bg-muted/30"}`}>
          {passed ? (
            <>
              <p className="text-lg font-bold text-foreground">You passed! {score}/{questions.length} correct.</p>
              <p className="mt-1 text-sm text-muted-foreground">The next section is now unlocked.</p>
            </>
          ) : (
            <>
              <p className="text-lg font-bold text-foreground">{score}/{questions.length} correct — not quite.</p>
              <p className="mt-1 mb-4 text-sm text-muted-foreground">Review the lessons above and try again.</p>
              <Button size="sm" variant="outline" onClick={handleRetry}>Try Again</Button>
            </>
          )}
        </div>
      ) : (
        <Button
          className="mt-8"
          disabled={!allAnswered}
          onClick={handleSubmit}
          style={allAnswered ? { background: "var(--brand-600)", color: "white" } : {}}
        >
          Submit Answers
        </Button>
      )}
    </div>
  );
}

// ─── Lesson content ───────────────────────────────────────────────────────────

function LessonContent({ lessonId, onQuizPass }: { lessonId: string; onQuizPass?: () => void }) {
  switch (lessonId) {

    case "ct-1":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            The Car Trap · Lesson 1
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            The 72-Month Lie
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Walk into any car dealership in America and within five minutes
            someone will ask you: "What monthly payment are you comfortable
            with?" That question is a trap. The moment you answer it, you&apos;ve
            already lost.
          </p>

          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            The 72-month, zero down car loan is one of the most effective
            wealth killers in this country. It&apos;s dressed up to look like a
            good deal — low monthly payment, no money out of pocket today.
            But the numbers behind it tell a completely different story.
          </p>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-4 font-semibold text-foreground">What a $35,000 car actually costs you</p>
            <div className="flex flex-col gap-3">
              {[
                { label: "Sticker price", value: "$35,000", note: "" },
                { label: "72-month loan at 7% APR", value: "$548/mo", note: "Sounds manageable, right?" },
                { label: "Total paid over 6 years", value: "$39,456", note: "$4,456 just in interest" },
                { label: "Car's value after 1 year", value: "~$28,000", note: "New cars lose ~20% immediately" },
                { label: "What you still owe after 1 year", value: "~$30,500", note: "You're $2,500 underwater — already" },
                { label: "Insurance on a $35k car", value: "$150–$250/mo", note: "Required when financing" },
              ].map(({ label, value, note }) => (
                <div key={label} className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0 text-sm">
                  <div>
                    <p className="font-medium text-foreground">{label}</p>
                    {note && <p className="text-xs text-muted-foreground">{note}</p>}
                  </div>
                  <p className="shrink-0 font-semibold text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">What "underwater" actually means</p>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              When you owe more on your car than it&apos;s worth, you&apos;re underwater —
              also called negative equity. On a 72-month loan you&apos;re almost
              guaranteed to be underwater for the first 2 to 3 years because
              the car is depreciating faster than you&apos;re paying it down.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              This means if your car gets totaled, stolen, or you need to sell
              it — your insurance or buyer pays what the car is worth, not what
              you owe. You&apos;re left covering the difference out of pocket. On a
              $35k car that could be $3,000–$6,000 you didn&apos;t plan for.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">Why dealers push this so hard</p>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              Stretching the loan to 72 months lowers your monthly payment
              enough that you stop questioning the price of the car. A $40,000
              car at $600/month feels different than $650/month — even though
              you&apos;re paying an extra $3,600 over the life of the loan. They&apos;re
              selling you a monthly payment, not a car.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Dealerships near military bases are especially aggressive about
              this. They know servicemembers have steady paychecks and may be
              young, first-time buyers with less experience negotiating. The
              72-month loan with add-ons like extended warranties and paint
              protection is one of the most common ways military members get
              taken advantage of financially.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">The right questions to ask instead</p>
            <div className="flex flex-col gap-3">
              {[
                { wrong: "What&apos;s my monthly payment?", right: "What is the total out-of-pocket cost including all fees and interest?" },
                { wrong: "Can I afford this monthly?", right: "Can I afford to own this car — insurance, maintenance, and the loan — for 6 years?" },
                { wrong: "What's the best deal on this car?", right: "Is a new car the right move at all, or should I be buying used?" },
              ].map(({ wrong, right }, i) => (
                <div key={i} className="rounded-lg bg-muted/40 p-3 text-sm">
                  <p className="mb-1 text-red-500 line-through">{wrong}</p>
                  <p className="font-medium text-foreground">{right}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-5 text-white" style={{ background: "var(--brand-600)" }}>
            <p className="mb-1 font-bold">What I would do</p>
            <p className="text-sm leading-relaxed text-white/85">
              Buy a used car that&apos;s 2 to 4 years old in cash or with a short
              loan — 24 to 36 months max. Let someone else take the
              depreciation hit. A 3-year-old car with 30,000 miles runs the
              same as a new one and costs a fraction of the price. The
              $300–$400/month you save goes toward building wealth instead
              of a dealer&apos;s bottom line. A car is a depreciating asset — spend
              as little as you reasonably can on it.
            </p>
          </div>
        </div>
      );

    default:
      return (
        <div>
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground">
            Coming Soon
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            This lesson is still being written. Check back soon.
          </p>
        </div>
      );
  }
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DebtTrapsPage() {
  const lastSection = SECTIONS[SECTIONS.length - 1];
  const lastLesson = lastSection.lessons[lastSection.lessons.length - 1];

  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem("dt-completed") ?? "[]"); } catch { return []; }
  });
  const [unlockedSectionIds, setUnlockedSectionIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [SECTIONS[0].id];
    try { return JSON.parse(localStorage.getItem("dt-unlocked") ?? `["${SECTIONS[0].id}"]`); } catch { return [SECTIONS[0].id]; }
  });
  const [activeLessonId, setActiveLessonId] = useState<string>(SECTIONS[0].lessons[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("dt-completed", JSON.stringify(completedLessons));
    localStorage.setItem("dt-unlocked", JSON.stringify(unlockedSectionIds));
  }, [completedLessons, unlockedSectionIds]);

  const activeSection = SECTIONS.find((s) => s.lessons.some((l) => l.id === activeLessonId))!;
  const allLessonsInSection = activeSection.lessons;
  const allNonQuizLessons = allLessonsInSection.filter((l) => !("isQuiz" in l && l.isQuiz));
  const allNonQuizCompleted = allNonQuizLessons.every((l) => completedLessons.includes(l.id));
  const activeLessonIndex = allLessonsInSection.findIndex((l) => l.id === activeLessonId);
  const nextLesson = allLessonsInSection[activeLessonIndex + 1]
    ?? SECTIONS[SECTIONS.indexOf(activeSection) + 1]?.lessons[0];
  const isActiveQuiz = ("isQuiz" in (allLessonsInSection[activeLessonIndex] ?? {}));
  const isFinalLesson = activeLessonId === lastLesson.id;
  const isCompleted = completedLessons.includes(activeLessonId);

  const handleComplete = () => {
    if (isCompleted) { if (nextLesson) setActiveLessonId(nextLesson.id); return; }
    const updated = [...completedLessons, activeLessonId];
    setCompletedLessons(updated);
    if (activeSection.noQuiz && allNonQuizLessons.every((l) => updated.includes(l.id))) {
      const nextSectionIndex = SECTIONS.indexOf(activeSection) + 1;
      if (nextSectionIndex < SECTIONS.length) {
        const nextSectionId = SECTIONS[nextSectionIndex].id;
        if (!unlockedSectionIds.includes(nextSectionId)) {
          setUnlockedSectionIds((prev) => [...prev, nextSectionId]);
        }
      }
    }
    if (nextLesson) setActiveLessonId(nextLesson.id);
  };

  const handleQuizPass = () => {
    const updated = [...completedLessons, activeLessonId];
    setCompletedLessons(updated);
    const nextSectionIndex = SECTIONS.indexOf(activeSection) + 1;
    if (nextSectionIndex < SECTIONS.length) {
      const nextSectionId = SECTIONS[nextSectionIndex].id;
      if (!unlockedSectionIds.includes(nextSectionId)) {
        setUnlockedSectionIds((prev) => [...prev, nextSectionId]);
      }
    }
  };

  const canAccessLesson = (lesson: { id: string }, section: typeof SECTIONS[0]) => {
    if (unlockedSectionIds.includes(section.id)) return true;
    return completedLessons.includes(lesson.id);
  };

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-background">

      {/* Top bar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-3">
          <Link href="/courses" className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ChevronLeft className="size-4" />
            <span className="hidden sm:inline">Courses</span>
          </Link>
          <span className="text-border">·</span>
          <span className="text-sm font-semibold text-foreground">Debt Traps</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted lg:hidden"
          >
            <BookOpen className="size-3.5" />
            Contents
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside className={`${sidebarOpen ? "flex" : "hidden"} lg:flex w-72 shrink-0 flex-col border-r border-border bg-background overflow-y-auto absolute inset-y-14 z-20 lg:relative lg:inset-auto`}>
          <div className="flex-1 p-4">
            {SECTIONS.map((section) => {
              const isUnlocked = unlockedSectionIds.includes(section.id);
              const sectionCompleted = section.lessons.every((l) => completedLessons.includes(l.id));
              return (
                <div key={section.id} className="mb-6">
                  <div className="mb-2 flex items-center gap-2">
                    {!isUnlocked && <Lock className="size-3 text-muted-foreground" />}
                    {sectionCompleted && <CheckCircle2 className="size-3 text-green-500" />}
                    <p className={`text-xs font-semibold uppercase tracking-wider ${isUnlocked ? "text-foreground" : "text-muted-foreground"}`}>
                      {section.title}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    {section.lessons.map((lesson) => {
                      const accessible = canAccessLesson(lesson, section);
                      const done = completedLessons.includes(lesson.id);
                      const active = lesson.id === activeLessonId;
                      return (
                        <button
                          key={lesson.id}
                          disabled={!accessible}
                          onClick={() => { if (accessible) { setActiveLessonId(lesson.id); setSidebarOpen(false); } }}
                          className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                            active ? "font-medium text-white" : accessible ? "text-muted-foreground hover:bg-muted hover:text-foreground" : "cursor-not-allowed opacity-40 text-muted-foreground"
                          }`}
                          style={active ? { background: "var(--brand-600)" } : {}}
                        >
                          {done && !active ? <CheckCircle2 className="size-3.5 shrink-0 text-green-500" /> : !accessible ? <Lock className="size-3.5 shrink-0" /> : <Circle className="size-3.5 shrink-0 opacity-40" />}
                          {lesson.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && <div className="fixed inset-0 z-10 bg-background/60 lg:hidden" onClick={() => setSidebarOpen(false)} />}

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-2xl px-6 py-10 sm:px-10">
            <LessonContent lessonId={activeLessonId} onQuizPass={handleQuizPass} />

            {/* Navigation */}
            {!isActiveQuiz && (
              <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
                <button
                  onClick={() => {
                    const prev = allLessonsInSection[activeLessonIndex - 1]
                      ?? SECTIONS[SECTIONS.indexOf(activeSection) - 1]?.lessons.slice(-1)[0];
                    if (prev) setActiveLessonId(prev.id);
                  }}
                  disabled={activeLessonIndex === 0 && SECTIONS.indexOf(activeSection) === 0}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
                >
                  <ChevronLeft className="size-4" />
                  Previous
                </button>

                {isFinalLesson ? (
                  isCompleted ? (
                    <div className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white" style={{ background: "var(--brand-600)" }}>
                      <CheckCircle2 className="size-4" />
                      Course Complete
                    </div>
                  ) : (
                    <button onClick={handleComplete} className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: "var(--brand-600)" }}>
                      <CheckCircle2 className="size-4" />
                      Mark Complete
                    </button>
                  )
                ) : (
                  <button onClick={handleComplete} className="flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: "var(--brand-600)" }}>
                    {isCompleted ? "Next lesson" : "Mark Complete"}
                    <ChevronRight className="size-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
