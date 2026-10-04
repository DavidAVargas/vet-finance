"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import { ArrowRight, CheckCircle2, Compass, Lock, MessageSquare } from "lucide-react";
import { SkipLink } from "@/components/layout/SkipLink";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import { courseCatalog, courseMeta, PLAYBOOK_GUIDE_COUNT, type CatalogCourse } from "@/lib/course-catalog";
import { cn } from "@/lib/utils";

const FOUNDER_EMAIL = "david.vargas024@gmail.com";

type Progress = Record<string, string[]>;

type CourseStatus = {
  course: CatalogCourse;
  pct: number;
  complete: boolean;
  unlocked: boolean;
};

function titleOf(id?: string) {
  return courseCatalog.find((c) => c.id === id)?.title ?? "the previous course";
}

function ProgressBar({ pct, className, tone = "light" }: { pct: number; className?: string; tone?: "light" | "dark" }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("h-1.5 overflow-hidden rounded-full", tone === "dark" ? "bg-white/15" : "bg-muted", className)}
    >
      <div
        className={cn("h-full rounded-full transition-all duration-500", tone === "dark" ? "bg-brass" : "bg-navy")}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CoursesPage() {
  const { user } = useUser();
  const [progress, setProgress] = useState<Progress | null>(null);
  const [thankYouVisible, setThankYouVisible] = useState(false);

  useEffect(() => {
    fetch("/api/progress")
      .then((r) => r.json())
      .then((data: Progress) => setProgress(data))
      .catch(() => setProgress({}));
  }, []);

  const displayName = user?.firstName ?? user?.username ?? "there";
  const email = user?.primaryEmailAddress?.emailAddress;
  const tier = user?.publicMetadata?.tier as string | undefined;
  const militaryStatus = user?.publicMetadata?.militaryStatus as string | undefined;
  const isFounder = email === FOUNDER_EMAIL;

  const isDone = (id?: string) => {
    const course = courseCatalog.find((c) => c.id === id);
    return !!course && (progress?.[course.id] ?? []).includes(course.finalLessonId);
  };

  const statuses: CourseStatus[] = courseCatalog.map((course) => {
    const done = new Set(progress?.[course.id] ?? []).size;
    return {
      course,
      pct: Math.min(100, Math.round((done / course.lessonCount) * 100)),
      complete: isDone(course.id),
      unlocked: isFounder || !course.unlockAfter || isDone(course.unlockAfter),
    };
  });

  const completedCount = statuses.filter((s) => s.complete).length;
  const overallPct = Math.round(statuses.reduce((n, s) => n + s.pct, 0) / statuses.length);
  const upNext = statuses.find((s) => s.unlocked && !s.complete);
  const playbookUnlocked = isFounder || (isDone("credit-basics") && isDone("credit-cards-101"));

  const militaryTag =
    militaryStatus === "active-duty" ? "🎖️ Active Duty" :
    militaryStatus === "veteran"     ? "🎖️ Veteran" :
    militaryStatus === "law-enforcement" ? "🛡️ Law Enforcement" :
    militaryStatus === "gold-star"   ? "⭐ Gold Star" :
    militaryStatus === "mil-family"  ? "🫂 Mil Family" :
    null;

  const eventTag = tier === "event" ? "💻 Code & ☕️ Coffee" : null;

  // Build tag list: Admin overrides all; military + event can stack
  const tags: Array<{ label: string; military: boolean }> = isFounder
    ? [{ label: "Admin", military: false }]
    : [
        ...(militaryTag ? [{ label: militaryTag, military: true }] : []),
        ...(eventTag    ? [{ label: eventTag,    military: false }] : []),
        ...(!militaryTag && !eventTag ? [{ label: "Beta Tester", military: false }] : []),
      ];

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <SkipLink targetId="main-content" />

      {/* Top bar */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-[4.5rem] max-w-site items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" aria-label="Vet Finance home" className="rounded-md">
            <Logo />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/feedback"
              className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium text-navy transition-colors hover:bg-secondary"
            >
              <MessageSquare className="size-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Give feedback</span>
              <span className="sm:hidden">Feedback</span>
            </Link>
            <div className="hidden items-center gap-1.5 md:flex">
              {tags.map((t) =>
                t.military ? (
                  <div key={t.label} className="relative">
                    <button
                      type="button"
                      className="cursor-pointer rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground select-none"
                      onMouseEnter={() => setThankYouVisible(true)}
                      onMouseLeave={() => setThankYouVisible(false)}
                      onFocus={() => setThankYouVisible(true)}
                      onBlur={() => setThankYouVisible(false)}
                      onClick={() => setThankYouVisible((v) => !v)}
                      aria-describedby={thankYouVisible ? "military-tag-tooltip" : undefined}
                    >
                      {t.label}
                    </button>
                    {thankYouVisible && (
                      <div
                        id="military-tag-tooltip"
                        role="tooltip"
                        className="absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2 rounded-lg bg-navy-deep px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white shadow-lg"
                      >
                        🫡 Thank you for your service
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-navy-deep" />
                      </div>
                    )}
                  </div>
                ) : (
                  <span key={t.label} className="rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground">
                    {t.label}
                  </span>
                ),
              )}
            </div>
            <UserButton />
          </div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {/* Welcome + overall progress */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto flex max-w-site flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:py-14">
            <div>
              <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                Welcome back, {displayName}
              </p>
              <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.03em] text-navy sm:text-[2.75rem]">
                Your courses
              </h1>
              <p className="mt-3 text-[17px] text-muted-foreground">
                Pick up where you left off, or start something new.
              </p>
            </div>

            <div className="w-full rounded-2xl bg-navy-deep p-6 text-white lg:max-w-sm">
              <div className="flex items-baseline justify-between">
                <p className="text-sm font-semibold text-[#c9d2e0]">Overall progress</p>
                <p className="text-2xl font-extrabold tabular-nums">{progress ? `${overallPct}%` : "—"}</p>
              </div>
              <ProgressBar pct={progress ? overallPct : 0} tone="dark" className="mt-3" />
              <p className="mt-3 text-sm text-[#9aa5b8]">
                {completedCount} of {courseCatalog.length} courses complete
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-site px-4 py-12 sm:px-6 lg:py-14">
          {/* Up next */}
          {progress && upNext && (
            <section aria-labelledby="up-next-heading" className="mb-12">
              <h2 id="up-next-heading" className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                {upNext.pct > 0 ? "Continue where you left off" : "Up next"}
              </h2>
              <div className="mt-4 flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:p-8">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-navy">
                  <upNext.course.icon className="size-6 text-white" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-2xl font-bold tracking-tight text-navy">{upNext.course.title}</p>
                  <p className="mt-1 text-[15px] text-muted-foreground">{upNext.course.desc}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <ProgressBar pct={upNext.pct} className="max-w-xs flex-1" />
                    <span className="text-sm font-semibold text-navy tabular-nums">{upNext.pct}%</span>
                  </div>
                </div>
                <Button size="lg" className="h-12 shrink-0 rounded-full px-7 text-base font-semibold" asChild>
                  <Link href={`/courses/${upNext.course.id}`}>
                    {upNext.pct > 0 ? "Continue" : "Start course"}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </section>
          )}

          {/* All courses */}
          <section aria-labelledby="all-courses-heading">
            <h2 id="all-courses-heading" className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              All courses
            </h2>
            <ul className="mt-4 grid gap-5 md:grid-cols-2">
              {statuses.map(({ course, pct, complete, unlocked }) => {
                const Icon = course.icon;
                return (
                  <li
                    key={course.id}
                    className={cn(
                      "flex flex-col rounded-2xl border border-border bg-card p-7",
                      !unlocked && "bg-card/60",
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          "flex size-12 shrink-0 items-center justify-center rounded-[14px]",
                          unlocked ? "bg-secondary" : "bg-muted",
                        )}
                      >
                        <Icon
                          className={cn("size-[22px]", unlocked ? "text-navy" : "text-muted-foreground")}
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <h3 className={cn("text-xl font-bold", unlocked ? "text-navy" : "text-muted-foreground")}>
                            {course.title}
                          </h3>
                          {complete && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                              <CheckCircle2 className="size-3.5" aria-hidden="true" />
                              Complete
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-sm font-medium text-muted-foreground">{courseMeta(course)}</p>
                      </div>
                    </div>

                    <p className="mt-5 flex-1 text-[15px] leading-relaxed text-muted-foreground">{course.desc}</p>

                    <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
                      {unlocked ? (
                        <>
                          <div className="flex flex-1 items-center gap-3">
                            <ProgressBar pct={progress ? pct : 0} className="max-w-[10rem] flex-1" />
                            <span className="text-sm font-medium text-muted-foreground tabular-nums">
                              {progress ? `${pct}%` : ""}
                            </span>
                          </div>
                          <Link
                            href={`/courses/${course.id}`}
                            className="group flex shrink-0 items-center gap-1.5 text-sm font-semibold text-navy hover:text-[#2e5a9a]"
                          >
                            {complete ? "Review" : pct > 0 ? "Continue" : "Start course"}
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                          </Link>
                        </>
                      ) : (
                        <p className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Lock className="size-4" aria-hidden="true" />
                          Finish {titleOf(course.unlockAfter)} to unlock
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Playbook */}
          <section
            aria-labelledby="playbook-heading"
            className={cn(
              "mt-5 flex flex-col gap-6 rounded-2xl p-7 sm:flex-row sm:items-center sm:p-8",
              playbookUnlocked ? "bg-navy text-white" : "border border-dashed border-[#b8c2d3] bg-card",
            )}
          >
            <div
              className={cn(
                "flex size-14 shrink-0 items-center justify-center rounded-2xl",
                playbookUnlocked ? "bg-white/10" : "bg-muted",
              )}
            >
              {playbookUnlocked ? (
                <Compass className="size-6 text-brass" strokeWidth={1.8} aria-hidden="true" />
              ) : (
                <Lock className="size-6 text-muted-foreground" strokeWidth={1.8} aria-hidden="true" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p
                className={cn(
                  "text-xs font-semibold tracking-[0.14em] uppercase",
                  playbookUnlocked ? "text-brass" : "text-muted-foreground",
                )}
              >
                Bonus · David&apos;s Playbook
              </p>
              <h2 id="playbook-heading" className={cn("mt-1 text-xl font-bold", !playbookUnlocked && "text-navy")}>
                What I Would Do If I&hellip;
              </h2>
              <p className={cn("mt-1 text-[15px]", playbookUnlocked ? "text-[#c9d2e0]" : "text-muted-foreground")}>
                A personalized, step-by-step plan based on exactly where you are, picked from {PLAYBOOK_GUIDE_COUNT} guides.
                Not generic advice. Real talk.
              </p>
            </div>
            {playbookUnlocked ? (
              <Button size="lg" className="h-12 shrink-0 rounded-full bg-brass px-7 text-base font-semibold text-navy-deep hover:bg-brass/90" asChild>
                <Link href="/courses/playbook">
                  Open playbook
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            ) : (
              <p className="shrink-0 text-sm font-medium text-muted-foreground sm:max-w-[13rem] sm:text-right">
                Finish Credit Basics and Credit Cards 101 to unlock
              </p>
            )}
          </section>

          {/* Beta note */}
          <p className="mt-12 text-center text-sm text-muted-foreground">
            You&apos;re in the beta, and your feedback helps shape this.{" "}
            <Link href="/feedback" className="font-medium text-navy underline underline-offset-2 hover:text-[#2e5a9a]">
              Share your thoughts
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
