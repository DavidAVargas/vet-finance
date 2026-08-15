import { BookOpen, Shield, CreditCard, AlertTriangle, Medal, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

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

      {/* Beta access CTA */}
      <div
        className="mb-14 rounded-2xl p-8 text-center text-white"
        style={{ background: "var(--brand-600)" }}
      >
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="size-3" />
          Beta Access Open
        </div>
        <h2 className="mb-2 text-2xl font-bold">4 courses are live right now.</h2>
        <p className="mx-auto mb-6 max-w-sm text-sm text-white/80">
          We&apos;re in early beta. Get an access code and start learning today — it&apos;s completely free.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ color: "var(--brand-700)" }}
          >
            Enter access code
            <ArrowRight className="size-4" />
          </Link>
          <a
            href="mailto:david.vargas024@gmail.com"
            className="text-sm text-white/80 underline underline-offset-2 hover:text-white transition-colors"
          >
            Don&apos;t have a code? Request one
          </a>
        </div>
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
        <h2 className="mb-2 text-xl font-bold text-foreground">Ready to get started?</h2>
        <p className="mx-auto mb-6 max-w-sm text-sm text-muted-foreground">
          All courses are free. Get your access code and start building your financial foundation today.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--brand-600)" }}
          >
            Go to courses
            <ArrowRight className="size-4" />
          </Link>
          <a
            href="mailto:david.vargas024@gmail.com"
            className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
          >
            Request beta access
          </a>
        </div>
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
