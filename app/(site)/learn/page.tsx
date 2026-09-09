"use client";

import { useUser } from "@clerk/nextjs";
import { BookOpen, Shield, CreditCard, AlertTriangle, Medal, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const FOUNDER_EMAIL = "david.vargas024@gmail.com";

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

export default function LearnPage() {
  const { user, isLoaded } = useUser();

  const email = user?.primaryEmailAddress?.emailAddress;
  const isFounder = email === FOUNDER_EMAIL;
  const isActivated = !!user?.publicMetadata?.activated;
  const hasAccess = isFounder || isActivated;

  // Determine CTA based on auth state
  const ctaHref = !user ? "/learn" : hasAccess ? "/courses" : "/onboarding";
  const ctaLabel = !user
    ? "Sign in to access"
    : hasAccess
    ? "Go to your courses"
    : "Complete your setup";

  return (
    <div className="mx-auto max-w-4xl px-4 py-20">

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

      {/* CTA block — changes based on auth state */}
      <div
        className="mb-14 rounded-2xl p-8 text-center text-white"
        style={{ background: "var(--brand-600)" }}
      >
        {user && hasAccess ? (
          // Already in — go straight to courses
          <>
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="size-3" />
              You&apos;re in
            </div>
            <h2 className="mb-2 text-2xl font-bold">Welcome back, {user.firstName ?? "there"}.</h2>
            <p className="mx-auto mb-6 max-w-sm text-sm text-white/80">
              Your courses are ready. Pick up where you left off.
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ color: "var(--brand-700)" }}
            >
              Go to your courses
              <ArrowRight className="size-4" />
            </Link>
          </>
        ) : user && !hasAccess ? (
          // Signed in but not activated
          <>
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="size-3" />
              Almost there
            </div>
            <h2 className="mb-2 text-2xl font-bold">One step left.</h2>
            <p className="mx-auto mb-6 max-w-sm text-sm text-white/80">
              You&apos;re signed in — just enter your invite code to unlock your courses.
            </p>
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ color: "var(--brand-700)" }}
            >
              Complete setup
              <ArrowRight className="size-4" />
            </Link>
          </>
        ) : (
          // Not signed in — beta, invite only
          <>
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="size-3" />
              Beta — Invite Only
            </div>
            <h2 className="mb-2 text-2xl font-bold">You need an invite code to get in.</h2>
            <p className="mx-auto mb-6 max-w-sm text-sm text-white/80">
              Vet Finance is currently in beta. The only way in right now is with an invite code — if you have one, you&apos;re good to go.
            </p>
            <p className="text-sm text-white/60">
              Already have an account? Use your invite link to sign in.
            </p>
          </>
        )}
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
        <h2 className="mb-2 text-xl font-bold text-foreground">
          {user && hasAccess ? "Ready to keep learning?" : "Currently in beta."}
        </h2>
        <p className="mx-auto mb-6 max-w-sm text-sm text-muted-foreground">
          {user && hasAccess
            ? "All your courses are waiting. Jump back in anytime."
            : "If you have an invite code, that's your way in. No code, no access — for now."}
        </p>
        {user && hasAccess ? (
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--brand-600)" }}
          >
            {ctaLabel}
            <ArrowRight className="size-4" />
          </Link>
        ) : (
          <p className="text-sm text-muted-foreground">
            Already have an account? Use your invite link to get in.
          </p>
        )}
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
