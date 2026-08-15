"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Shield, CreditCard, AlertTriangle, Medal, ArrowRight, Sparkles, Lock, X } from "lucide-react";
import Link from "next/link";

const BETA_CODE = "VETBETA";
const BETA_KEY = "vf-beta-access";

const courses = [
  {
    icon: <Shield className="size-5" />,
    title: "Credit Basics",
    description: "Credit scores, hard pulls, utilization, derogatory marks, and building from zero.",
    live: true,
  },
  {
    icon: <CreditCard className="size-5" />,
    title: "Credit Cards 101",
    description: "How credit cards work, how to pick the right one, and military-specific benefits most veterans don't know about.",
    live: true,
  },
  {
    icon: <AlertTriangle className="size-5" />,
    title: "Debt Traps",
    description: "The wealth killers most people walk right into — car loans, medical bills, and student debt.",
    live: true,
  },
  {
    icon: <Medal className="size-5" />,
    title: "Military Money",
    description: "Every benefit you earned — BAH, TSP, VA Home Loan, GI Bill, disability, and the hidden stuff most vets never claim.",
    live: true,
  },
];

function AccessModal({ onClose }: { onClose: () => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().toUpperCase() === BETA_CODE) {
      localStorage.setItem(BETA_KEY, "true");
      router.push("/courses");
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-sm rounded-2xl border border-border bg-background p-8 shadow-2xl">

        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="size-4" />
        </button>

        <div className="mb-6 flex justify-center">
          <div className="flex size-12 items-center justify-center rounded-full border border-border bg-muted">
            <Lock className="size-5 text-muted-foreground" />
          </div>
        </div>

        <h2 className="mb-1 text-center text-xl font-bold text-foreground">Beta Access</h2>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          This is a private beta for a selected few. Enter your code to get in.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(false); }}
            placeholder="Enter access code"
            autoComplete="off"
            autoCapitalize="characters"
            autoFocus
            className={`w-full rounded-xl border bg-background px-4 py-3 text-center text-sm font-mono tracking-widest text-foreground outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-foreground ${
              error ? "border-red-400" : "border-border"
            } ${shake ? "animate-[shake_0.4s_ease-in-out]" : ""}`}
          />
          {error && (
            <p className="text-center text-xs text-red-500">Wrong code — this beta is invite only.</p>
          )}
          <button
            type="submit"
            className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--brand-600)" }}
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LearnPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="mx-auto max-w-4xl px-4 py-20">

      {showModal && <AccessModal onClose={() => setShowModal(false)} />}

      {/* Header */}
      <div className="mb-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
          <BookOpen className="size-3.5" />
          <span>Learn</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Your financial education starts here.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Free for all military members and veterans. Straight to the point —
          built to get you taking action fast, not sitting through hours of fluff.
        </p>
      </div>

      {/* Beta access CTA */}
      <div
        className="mb-14 rounded-2xl p-8 text-center text-white"
        style={{ background: "var(--brand-600)" }}
      >
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="size-3" />
          Private Beta — Selected Few
        </div>
        <h2 className="mb-2 text-2xl font-bold">4 courses are live right now.</h2>
        <p className="mx-auto mb-6 max-w-sm text-sm text-white/80">
          We&apos;re in early beta. If you have an access code, you can start learning today — completely free.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ color: "var(--brand-700)" }}
        >
          Enter access code
          <ArrowRight className="size-4" />
        </button>
      </div>

      {/* Course cards */}
      <div className="mb-16 grid gap-4 sm:grid-cols-2">
        {courses.map((course) => (
          <div
            key={course.title}
            className="flex flex-col rounded-xl border border-border bg-muted/20 p-6"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-full border border-border bg-background">
                  {course.icon}
                </div>
                <h2 className="font-bold text-foreground">{course.title}</h2>
              </div>
              {course.live && (
                <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-2.5 py-0.5 text-[11px] font-medium text-green-600 dark:text-green-400">
                  <span className="size-1.5 rounded-full bg-green-500" />
                  Live
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{course.description}</p>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="rounded-xl border border-border bg-muted/40 px-6 py-10 text-center">
        <h2 className="mb-2 text-xl font-bold text-foreground">Have an access code?</h2>
        <p className="mx-auto mb-6 max-w-sm text-sm text-muted-foreground">
          This beta is invite only. If you were given a code, you&apos;re one of the first people in.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: "var(--brand-600)" }}
        >
          Enter code
          <ArrowRight className="size-4" />
        </button>
      </div>

      {/* Back to home */}
      <div className="mt-10 text-center">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to home
        </Link>
      </div>

    </div>
  );
}
