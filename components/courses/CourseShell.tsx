"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Circle, ListTree, Lock, X } from "lucide-react";
import { SkipLink } from "@/components/layout/SkipLink";
import { LogoMark } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import { courseCatalog } from "@/lib/course-catalog";
import { cn } from "@/lib/utils";

const FOUNDER_EMAIL = "david.vargas024@gmail.com";

export type CourseLesson = { readonly id: string; readonly title: string; readonly isQuiz?: boolean };
export type CourseSection = {
  readonly id: string;
  readonly title: string;
  readonly lessons: readonly CourseLesson[];
};

type Props = {
  courseId: string;
  title: string;
  sections: readonly CourseSection[];
  renderLesson: (lessonId: string, onQuizPass: () => void) => ReactNode;
};

/** A section with a quiz is done once the quiz is passed; otherwise once every lesson is complete. */
function isSectionDone(section: CourseSection, completed: readonly string[]) {
  const quiz = section.lessons.find((l) => l.isQuiz);
  return quiz ? completed.includes(quiz.id) : section.lessons.every((l) => completed.includes(l.id));
}

function unlockedSectionIds(sections: readonly CourseSection[], completed: readonly string[], all: boolean) {
  if (all) return sections.map((s) => s.id);
  const ids = [sections[0].id];
  for (let i = 0; i < sections.length - 1 && isSectionDone(sections[i], completed); i++) {
    ids.push(sections[i + 1].id);
  }
  return ids;
}

function navigableLessons(sections: readonly CourseSection[], unlocked: readonly string[]) {
  return sections.filter((s) => unlocked.includes(s.id)).flatMap((s) => s.lessons);
}

/**
 * Shared frame for every course: branded header with progress, a section/lesson sidebar
 * (a modal drawer on mobile), the lesson body, and a bottom bar for completing and moving on.
 * Progress is loaded from and saved to /api/progress.
 */
export function CourseShell({ courseId, title, sections, renderLesson }: Props) {
  const { user } = useUser();
  const isFounder = user?.primaryEmailAddress?.emailAddress === FOUNDER_EMAIL;

  const [completed, setCompleted] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [activeLessonId, setActiveLessonId] = useState(sections[0].lessons[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const lessonContentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const sidebarToggleRef = useRef<HTMLButtonElement>(null);
  const focusLessonOnChange = useRef(false);
  const isFirstSidebarRender = useRef(true);

  // Load saved progress, then resume at the first unfinished lesson.
  useEffect(() => {
    fetch("/api/progress")
      .then((r) => r.json())
      .then((data: Record<string, string[]>) => {
        const saved = data[courseId] ?? [];
        setCompleted(saved);
        const open = navigableLessons(sections, unlockedSectionIds(sections, saved, isFounder));
        const resume = open.find((l) => !saved.includes(l.id));
        if (resume) setActiveLessonId(resume.id);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [courseId, sections, isFounder]);

  // Move focus to the new lesson after user navigation so keyboard/screen-reader users
  // get context that the view changed (client-side swap, no page navigation).
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    if (focusLessonOnChange.current) {
      focusLessonOnChange.current = false;
      lessonContentRef.current?.focus();
    }
  }, [activeLessonId]);

  // The mobile sidebar behaves like a modal drawer, so move focus into it on open
  // and back to the toggle button on close.
  useEffect(() => {
    if (isFirstSidebarRender.current) {
      isFirstSidebarRender.current = false;
      return;
    }
    if (sidebarOpen) sidebarRef.current?.focus();
    else sidebarToggleRef.current?.focus();
  }, [sidebarOpen]);

  // Escape closes the drawer, matching standard dialog behavior.
  useEffect(() => {
    if (!sidebarOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [sidebarOpen]);

  const unlocked = unlockedSectionIds(sections, completed, isFounder);
  const lessons = navigableLessons(sections, unlocked);
  const activeIndex = lessons.findIndex((l) => l.id === activeLessonId);
  const activeLesson = lessons[activeIndex];
  const prevLesson = activeIndex > 0 ? lessons[activeIndex - 1] : null;
  const nextLesson = activeIndex >= 0 && activeIndex < lessons.length - 1 ? lessons[activeIndex + 1] : null;
  const activeSectionIndex = sections.findIndex((s) => s.lessons.some((l) => l.id === activeLessonId));

  const allLessons = sections.flatMap((s) => s.lessons);
  const finalLessonId = allLessons[allLessons.length - 1].id;
  const isActiveDone = completed.includes(activeLessonId);
  const isActiveQuiz = !!activeLesson?.isQuiz;
  const courseDone = completed.includes(finalLessonId);
  const pct = Math.min(100, Math.round((new Set(completed).size / allLessons.length) * 100));

  const nextCourse = courseCatalog.find((c) => c.unlockAfter === courseId);

  const goToLesson = (id: string) => {
    focusLessonOnChange.current = true;
    setActiveLessonId(id);
    setSidebarOpen(false);
  };

  const recordComplete = (lessonId: string) => {
    if (completed.includes(lessonId)) return completed;
    fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId, lessonId }),
    }).catch(() => {});
    const updated = [...completed, lessonId];
    setCompleted(updated);
    return updated;
  };

  const completeAndContinue = () => {
    const updated = recordComplete(activeLessonId);
    // Recompute with the new progress so finishing a section steps straight into the next one.
    const open = navigableLessons(sections, unlockedSectionIds(sections, updated, isFounder));
    const next = open[open.findIndex((l) => l.id === activeLessonId) + 1];
    if (next) goToLesson(next.id);
  };

  const handleQuizPass = () => {
    recordComplete(activeLessonId);
  };

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-card">
      <SkipLink targetId="lesson-content" />

      {/* ── Header ── */}
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
            <p className="truncate font-bold text-navy">{title}</p>
          </div>

          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5">
              <div
                role="progressbar"
                aria-label={`${title} progress`}
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                className="hidden h-1.5 w-28 overflow-hidden rounded-full bg-muted sm:block"
              >
                <div className="h-full rounded-full bg-navy transition-all duration-500" style={{ width: `${pct}%` }} />
              </div>
              <span className="text-sm font-semibold text-navy tabular-nums">{pct}%</span>
            </div>
            <button
              ref={sidebarToggleRef}
              type="button"
              onClick={() => setSidebarOpen((o) => !o)}
              aria-expanded={sidebarOpen}
              aria-controls="course-sidebar"
              className="flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm font-medium text-navy transition-colors hover:bg-secondary lg:hidden"
            >
              <ListTree className="size-4" aria-hidden="true" />
              Contents
            </button>
            <UserButton />
          </div>
        </div>
      </header>

      <div className="relative flex flex-1 overflow-hidden">
        {/* ── Sidebar ── */}
        <aside
          id="course-sidebar"
          ref={sidebarRef}
          tabIndex={-1}
          aria-label="Course contents"
          className={cn(
            "absolute inset-y-0 left-0 z-30 w-[19rem] shrink-0 flex-col overflow-y-auto border-r border-border bg-surface outline-none lg:static lg:flex",
            sidebarOpen ? "flex shadow-2xl" : "hidden",
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">Course contents</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {new Set(completed).size} of {allLessons.length} lessons
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close contents"
              className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-navy lg:hidden"
            >
              <X className="size-4" />
            </button>
          </div>

          <nav className="flex-1 px-3 py-4">
            <ol className="flex flex-col gap-5">
              {sections.map((section, i) => {
                const isUnlocked = unlocked.includes(section.id);
                const doneCount = section.lessons.filter((l) => completed.includes(l.id)).length;
                const sectionDone = isSectionDone(section, completed);
                return (
                  <li key={section.id}>
                    <div className="flex items-center gap-3 px-2">
                      <span
                        className={cn(
                          "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                          sectionDone
                            ? "bg-emerald-600 text-white"
                            : isUnlocked
                              ? "bg-navy text-white"
                              : "bg-muted text-muted-foreground",
                        )}
                      >
                        {sectionDone ? <CheckCircle2 className="size-3.5" aria-label="Complete" /> : isUnlocked ? i + 1 : <Lock className="size-3" aria-label="Locked" />}
                      </span>
                      <p className={cn("flex-1 text-sm font-bold", isUnlocked ? "text-navy" : "text-muted-foreground")}>
                        {section.title}
                      </p>
                      {isUnlocked && (
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {doneCount}/{section.lessons.length}
                        </span>
                      )}
                    </div>

                    {isUnlocked ? (
                      <ul className="mt-2 flex flex-col">
                        {section.lessons.map((lesson) => {
                          const active = lesson.id === activeLessonId;
                          const done = completed.includes(lesson.id);
                          return (
                            <li key={lesson.id}>
                              <button
                                type="button"
                                onClick={() => goToLesson(lesson.id)}
                                aria-current={active ? "step" : undefined}
                                className={cn(
                                  "flex w-full items-center gap-2.5 rounded-lg border-l-2 py-2 pr-2 pl-[2.375rem] text-left text-sm transition-colors",
                                  active
                                    ? "border-navy bg-white font-semibold text-navy shadow-sm"
                                    : "border-transparent text-foreground/75 hover:bg-white hover:text-navy",
                                )}
                              >
                                {done ? (
                                  <CheckCircle2 className="size-4 shrink-0 text-emerald-600" aria-label="Completed" />
                                ) : (
                                  <Circle className="size-4 shrink-0 text-muted-foreground/50" aria-hidden="true" />
                                )}
                                <span className="flex-1 leading-snug">{lesson.title}</span>
                                {lesson.isQuiz && (
                                  <span className="shrink-0 rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
                                    Quiz
                                  </span>
                                )}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="mt-1.5 pl-11 text-xs text-muted-foreground">Finish the previous section to unlock</p>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </aside>

        {/* Drawer backdrop (mobile) */}
        {sidebarOpen && (
          <div
            aria-hidden="true"
            className="absolute inset-0 z-20 bg-navy-deep/30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── Lesson + bottom bar ── */}
        <main className="flex flex-1 flex-col overflow-hidden" inert={sidebarOpen}>
          <div ref={scrollRef} className="flex-1 overflow-y-auto">
            <div
              ref={lessonContentRef}
              id="lesson-content"
              tabIndex={-1}
              className="mx-auto max-w-[46rem] px-6 py-10 outline-none sm:px-10 sm:py-14"
            >
              {activeSectionIndex >= 0 && (
                <p className="mb-6 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  Section {activeSectionIndex + 1} · {sections[activeSectionIndex].title}
                </p>
              )}
              {loaded ? (
                renderLesson(activeLessonId, handleQuizPass)
              ) : (
                <div aria-hidden="true" className="flex flex-col gap-4">
                  <div className="h-9 w-2/3 animate-pulse rounded-lg bg-muted" />
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                  <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-4/6 animate-pulse rounded bg-muted" />
                </div>
              )}
            </div>
          </div>

          <div className="shrink-0 border-t border-border bg-card px-4 py-3 sm:px-6">
            <div className="mx-auto flex max-w-[46rem] items-center justify-between gap-3">
              {prevLesson ? (
                <button
                  type="button"
                  onClick={() => goToLesson(prevLesson.id)}
                  className="flex min-w-0 items-center gap-1.5 rounded-full px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-navy"
                >
                  <ChevronLeft className="size-4 shrink-0" aria-hidden="true" />
                  <span className="hidden truncate sm:inline">{prevLesson.title}</span>
                  <span className="sm:hidden">Previous</span>
                </button>
              ) : (
                <span />
              )}

              {isActiveQuiz && !isActiveDone ? (
                <p className="text-sm text-muted-foreground">Pass the quiz to continue</p>
              ) : activeLessonId === finalLessonId && courseDone ? (
                <div className="flex items-center gap-3">
                  <span className="hidden items-center gap-1.5 text-sm font-semibold text-emerald-700 sm:flex">
                    <CheckCircle2 className="size-4" aria-hidden="true" />
                    Course complete
                  </span>
                  <Button size="lg" className="h-11 rounded-full px-6 font-semibold" asChild>
                    <Link href={nextCourse ? `/courses/${nextCourse.id}` : "/courses"}>
                      {nextCourse ? `Start ${nextCourse.title}` : "Back to courses"}
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              ) : isActiveDone ? (
                nextLesson && (
                  <Button size="lg" className="h-11 min-w-0 rounded-full px-6 font-semibold" onClick={() => goToLesson(nextLesson.id)}>
                    <span className="truncate">
                      <span className="hidden sm:inline">Next: </span>
                      {nextLesson.title}
                    </span>
                    <ChevronRight className="size-4" />
                  </Button>
                )
              ) : (
                <Button size="lg" className="h-11 rounded-full px-6 font-semibold" onClick={completeAndContinue}>
                  {activeLessonId === finalLessonId ? "Complete course" : "Complete & continue"}
                  <ChevronRight className="size-4" />
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
