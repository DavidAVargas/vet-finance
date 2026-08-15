"use client";

import { useState, useEffect } from "react";
import { Shield, CreditCard, AlertTriangle, Medal, Clock, BookOpen, ChevronRight, Star, Lock, Sparkles, MessageSquare } from "lucide-react";
import Link from "next/link";

const BETA_CODE = "VETBETA";
const BETA_KEY = "vf-beta-access";
const FEEDBACK_URL = "https://forms.gle/PLACEHOLDER"; // swap with real Google Form link

const mockUser = {
  name: "Beta Tester",
  rank: "Veteran",
};

const courses = [
  {
    id: "credit-basics",
    icon: Shield,
    title: "Credit Basics",
    subtitle: "Start here",
    description:
      "Credit scores, hard pulls, utilization, derogatory marks, and building from zero.",
    topics: ["Credit Scores", "Hard & Soft Pulls", "Utilization", "Building from Zero"],
    sections: 7,
    readTime: "~20 min",
    href: "/courses/credit-basics",
    available: true,
    recommended: true,
  },
  {
    id: "credit-cards-101",
    icon: CreditCard,
    title: "Credit Cards 101",
    subtitle: "After Credit Basics",
    description:
      "How credit cards work, how to pick the right one, and military-specific benefits most veterans don't know about.",
    topics: ["APR & Interest", "Travel Cards", "Military Benefits", "SCRA Protections"],
    sections: 8,
    readTime: "~25 min",
    href: "/courses/credit-cards-101",
    available: false,
    recommended: false,
  },
  {
    id: "debt-traps",
    icon: AlertTriangle,
    title: "Debt Traps",
    subtitle: "Know what to avoid",
    description:
      "The wealth killers most people walk right into — car loans, medical bills, student debt, and how to handle them.",
    topics: ["72-Month Car Loans", "Medical Debt", "Student Loans", "Wealth Killers"],
    sections: 3,
    readTime: "~15 min",
    href: "/courses/debt-traps",
    available: true,
    recommended: false,
  },
  {
    id: "military-money",
    icon: Medal,
    title: "Military Money",
    subtitle: "Built for service",
    description:
      "Every financial benefit you've earned — BAH, TSP, VA Home Loan, GI Bill, disability, and the hidden stuff most vets never claim.",
    topics: ["BAH & BAS", "VA Home Loan", "GI Bill vs. VR&E", "VA Disability"],
    sections: 6,
    readTime: "~30 min",
    href: "/courses/military-money",
    available: true,
    recommended: false,
  },
];

// ─── Beta gate ────────────────────────────────────────────────────────────────

function BetaGate({ onUnlock }: { onUnlock: () => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().toUpperCase() === BETA_CODE) {
      localStorage.setItem(BETA_KEY, "true");
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <header className="flex h-14 items-center border-b border-border px-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <div className="flex size-6 items-center justify-center rounded-md bg-foreground">
            <span className="text-[10px] font-bold text-background">VF</span>
          </div>
          Vet Finance
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full border border-border bg-muted">
              <Lock className="size-5 text-muted-foreground" />
            </div>
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground">Beta Access</h1>
            <p className="text-sm text-muted-foreground">
              Vet Finance is in early beta. Enter your access code to get in.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              value={code}
              onChange={(e) => { setCode(e.target.value); setError(false); }}
              placeholder="Enter access code"
              autoComplete="off"
              autoCapitalize="characters"
              className={`w-full rounded-xl border bg-background px-4 py-3 text-center text-sm font-mono tracking-widest text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-foreground ${
                error ? "border-red-400" : "border-border"
              } ${shake ? "animate-[shake_0.4s_ease-in-out]" : ""}`}
            />
            {error && (
              <p className="text-center text-xs text-red-500">Invalid code — check with David and try again.</p>
            )}
            <button
              type="submit"
              className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--brand-600)" }}
            >
              Enter
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Don&apos;t have a code?{" "}
            <a
              href="mailto:david.vargas024@gmail.com"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              Request access
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CoursesPage() {
  const [betaUnlocked, setBetaUnlocked] = useState<boolean | null>(null);
  const [creditBasicsComplete, setCreditBasicsComplete] = useState(false);
  const [cc101Complete, setCc101Complete] = useState(false);

  useEffect(() => {
    const hasAccess = localStorage.getItem(BETA_KEY) === "true";
    setBetaUnlocked(hasAccess);

    if (hasAccess) {
      try {
        const cbCompleted: string[] = JSON.parse(localStorage.getItem("cb-completed") ?? "[]");
        const ccCompleted: string[] = JSON.parse(localStorage.getItem("cc101-completed") ?? "[]");
        setCreditBasicsComplete(cbCompleted.includes("pyc-quiz"));
        setCc101Complete(ccCompleted.includes("bcs-quiz"));
      } catch {
        setCreditBasicsComplete(false);
        setCc101Complete(false);
      }
    }
  }, []);

  if (betaUnlocked === null) return null;

  if (!betaUnlocked) {
    return <BetaGate onUnlock={() => setBetaUnlocked(true)} />;
  }

  const playbookUnlocked = creditBasicsComplete && cc101Complete;

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">

      {/* Top bar */}
      <header className="flex h-14 items-center justify-between border-b border-border px-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <div className="flex size-6 items-center justify-center rounded-md bg-foreground">
            <span className="text-[10px] font-bold text-background">VF</span>
          </div>
          Vet Finance
        </Link>
        <div className="flex items-center gap-3">
          <a
            href={FEEDBACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <MessageSquare className="size-3" />
            Give feedback
          </a>
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-foreground leading-none">{mockUser.name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{mockUser.rank}</p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-6 py-10 sm:px-10">
        <div className="mx-auto max-w-3xl">

          {/* Welcome */}
          <div className="mb-10">
            <p className="mb-1 text-sm text-muted-foreground">Welcome to the beta</p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Your courses.
            </h1>
            <p className="mt-2 text-muted-foreground">
              Pick up where you left off, or start a new course.
            </p>
          </div>

          {/* Course cards */}
          <div className="flex flex-col gap-4">
            {courses.map((course) => {
              const Icon = course.icon;
              const isCC101 = course.id === "credit-cards-101";
              const unlocked = !isCC101 || creditBasicsComplete;

              return (
                <div
                  key={course.id}
                  className="relative rounded-xl border border-border bg-background p-6 transition-colors hover:bg-muted/30"
                >
                  {course.recommended && (
                    <div
                      className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium text-white"
                      style={{ background: "var(--brand-600)" }}
                    >
                      <Star className="size-3" />
                      Start here
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted">
                      <Icon className="size-4 text-foreground" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-0.5 flex items-center gap-2">
                        <h2 className="font-bold text-foreground">{course.title}</h2>
                      </div>
                      <p className="mb-4 text-sm text-muted-foreground">{course.description}</p>

                      <div className="mb-5 flex flex-wrap gap-2">
                        {course.topics.map((topic) => (
                          <span
                            key={topic}
                            className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <BookOpen className="size-3" />
                            {course.sections} sections
                          </span>
                          <span className="size-1 rounded-full bg-border" />
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" />
                            {course.readTime}
                          </span>
                        </div>

                        {unlocked ? (
                          <Link
                            href={course.href}
                            className="group flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
                          >
                            Start course
                            <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        ) : (
                          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Lock className="size-3.5" />
                            Locked
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bonus divider */}
          <div className="mt-10 mb-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <div className="flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1">
              <Sparkles className="size-3 text-muted-foreground" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Bonus</span>
            </div>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Playbook card */}
          <div
            className={`relative overflow-hidden rounded-xl border p-6 transition-colors ${playbookUnlocked ? "hover:bg-muted/20" : "opacity-60"}`}
            style={{
              background: playbookUnlocked ? "var(--brand-600)08" : undefined,
              borderColor: playbookUnlocked ? "var(--brand-600)40" : undefined,
            }}
          >
            {!playbookUnlocked && (
              <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
                <Lock className="size-3" />
                Finish both courses to unlock
              </div>
            )}
            {playbookUnlocked && (
              <div className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium text-white" style={{ background: "var(--brand-600)" }}>
                <Sparkles className="size-3" />
                Unlocked
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full border text-lg"
                style={{ borderColor: "var(--brand-600)40", background: "var(--brand-600)10" }}>
                🎯
              </div>
              <div className="min-w-0 flex-1">
                <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">David&apos;s Playbook</p>
                <h2 className="mb-1 font-bold text-foreground">What I Would Do If I...</h2>
                <p className="mb-4 text-sm text-muted-foreground">
                  Personalized step-by-step guide based on exactly where you are — zero cards, in collections, building, or optimizing. Not generic advice. Real talk.
                </p>
                <div className="mb-5 flex flex-wrap gap-2">
                  {["Zero Cards", "In Collections", "1–3 Cards", "3–5 Cards", "Active Duty"].map((t) => (
                    <span key={t} className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">{t}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">Unlocks after completing both courses</p>
                  {playbookUnlocked ? (
                    <Link href="/courses/playbook" className="group flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80" style={{ color: "var(--brand-600)" }}>
                      Open playbook
                      <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  ) : (
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Lock className="size-3.5" />
                      Locked
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Beta note */}
          <p className="mt-10 text-center text-xs text-muted-foreground">
            You&apos;re in the beta — your feedback helps shape this.{" "}
            <a href={FEEDBACK_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground transition-colors">
              Share your thoughts.
            </a>
          </p>

        </div>
      </main>
    </div>
  );
}
