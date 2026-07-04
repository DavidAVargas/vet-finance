"use client";

import { useState } from "react";
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

// ─── Mock user ───────────────────────────────────────────────────────────────

const mockUser = { name: "David", rank: "Veteran" };

// ─── Course structure ────────────────────────────────────────────────────────
// noQuiz: true means completing all lessons auto-unlocks the next section

const SECTIONS = [
  {
    id: "my-story",
    title: "My Story",
    noQuiz: true,
    lessons: [
      { id: "my-story-1", title: "Why I Built This" },
      { id: "my-story-2", title: "Where I Was With Credit" },
      { id: "my-story-3", title: "What This Course Will Do For You" },
    ],
  },
  {
    id: "why-credit-matters",
    title: "Why Credit Matters",
    noQuiz: false,
    lessons: [
      { id: "wcm-1", title: "What Credit Unlocks" },
      { id: "wcm-2", title: "The Cost of Bad Credit" },
      { id: "wcm-3", title: "How Much Good Credit Saves You" },
      { id: "wcm-quiz", title: "Quiz", isQuiz: true },
    ],
  },
  {
    id: "how-credit-works",
    title: "How Credit Works",
    noQuiz: false,
    lessons: [
      { id: "hcw-1", title: "What Is Credit?" },
      { id: "hcw-2", title: "How Your Score Is Calculated" },
      { id: "hcw-3", title: "Good Score vs. Bad Score" },
      { id: "hcw-quiz", title: "Quiz", isQuiz: true },
    ],
  },
  {
    id: "tracking-your-credit",
    title: "Tracking Your Credit",
    noQuiz: false,
    lessons: [
      { id: "tyc-1", title: "Credit Karma — Useful but Not Perfect" },
      { id: "tyc-2", title: "The 3 Bureaus: Equifax, TransUnion, Experian" },
      { id: "tyc-3", title: "Credit Report vs. Credit Score" },
      { id: "tyc-4", title: "How to Pull Your Free Reports" },
      { id: "tyc-quiz", title: "Quiz", isQuiz: true },
    ],
  },
  {
    id: "protecting-your-credit",
    title: "Protecting Your Credit",
    noQuiz: false,
    lessons: [
      { id: "pyc-1", title: "Credit Freezes" },
      { id: "pyc-2", title: "Fraud Alerts" },
      { id: "pyc-3", title: "Disputing Errors on Your Report" },
      { id: "pyc-quiz", title: "Quiz", isQuiz: true },
    ],
  },
];

// ─── Lesson content ──────────────────────────────────────────────────────────

function LessonContent({ lessonId }: { lessonId: string }) {
  switch (lessonId) {
    case "my-story-1":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            My Story · Lesson 1
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            Why I Built This
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            After learning about credit, I honestly can&apos;t stop talking about it.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            When I meet new people, one of the first things I ask is what kind
            of credit cards they have. I know, a little personal. But you&apos;d
            be surprised how many people actually answer.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            And it gets me every time. Most people say they don&apos;t have a credit
            card at all. I&apos;m talking about people from their early 20s to all the way
            to their late 40s. Or they&apos;ll say they only have one. Some even say
            they&apos;re too scared to get one, which I understand. Nobody wants to
            make the wrong decision and end up in debt. That&apos;s probably
            everyone&apos;s biggest fear when it comes to credit cards. But it still
            bothers me, not in a judgmental way, because I know what that
            difference has meant in my own life.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            It feels like knowing a secret that could actually help someone and
            just keeping it to yourself. So I started doing something about it.
            I began trying to help the people I met who seemed like they needed
            it. Friends, family, coworkers. Some listened, some didn&apos;t. There
            are people I sat down with one on one, answered every question, no
            judgment, and they still never went and got a credit card. That&apos;s
            their call. But for the ones who did follow through, about 10 people
            total, they got their credit cards, they started using them the right
            way, and their credit scores went up. Most of them were friends and
            coworkers. And I&apos;m genuinely proud of that.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            The issue was I kept having to repeat myself. Every new person, same
            conversation from the start. It started getting a little tedious. I
            thought about putting it all into a Google Slides presentation so I
            could just send it over. Then I figured, why not just build a website
            and do this properly.
          </p>

          <p className="mb-5 text-base font-medium leading-relaxed text-foreground">
            And that&apos;s when I started thinking bigger.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            I started thinking about veterans. People who gave everything for
            this country and somehow end up without a home. I&apos;m not 100% sure
            of every reason that happens, but I have a strong feeling that
            financial literacy, or the lack of it, plays a bigger role than most
            people realize. When you go from a world where everything is handled
            for you to suddenly managing rent, credit, and bills on your own, it
            can feel impossible. And nobody really teaches you how.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            There&apos;s no shortage of information out there. YouTube, Google,
            podcasts. It&apos;s everywhere. But it&apos;s scattered, overwhelming, and
            most of it isn&apos;t built for someone starting from zero.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            That&apos;s why this platform is free specifically for veterans. They
            gave everything for us and they deserve real help. None of them
            should be homeless. I think most people would agree with that.
          </p>

          <p className="text-base leading-relaxed text-muted-foreground">
            This isn&apos;t going to happen overnight. It takes work. But
            you&apos;re already here, and that&apos;s the first step.
          </p>
        </div>
      );

    case "my-story-2":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            My Story · Lesson 2
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            Where I Was With Credit
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Just like most people, I had one credit card for years. A Chase bank
            card and a store credit card from a mall. And just like most people,
            I was scared to use them. I&apos;d use them here and there and pay them
            off right away. Never really let a balance sit. For years I basically
            pretended they didn&apos;t exist.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Then one year things got rough. My mom got into a car accident.
            Thank God she was okay, but her car wasn&apos;t. She needed it to get
            to work, so I did what I had to do.
          </p>

          <div
            className="mb-6 rounded-r-lg bg-muted/40 p-5"
            style={{ borderLeft: "2px solid var(--brand-600)" }}
          >
            <p className="italic leading-relaxed text-muted-foreground">
              I put $8,000 on my credit cards to help fix her car. My
              Apple Card was maxed out at $5,000 and my Chase card was maxed
              out at $3,000. Both completely maxed. And I had no idea what I
              was doing.
            </p>
          </div>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            I tried doing the right thing. I paid what I could every month. But
            I didn&apos;t understand how interest worked. No matter what I paid, it
            felt like the balance barely moved. The interest kept canceling out
            whatever I was putting in. It was like running on a treadmill.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            My credit score dropped. The lowest I remember seeing it was 530.
            Before all of this I was around 630, which I always knew wasn&apos;t
            amazing but felt okay. Seeing 530 was different. I knew that if I
            didn&apos;t change something fast, it could easily keep going down into
            the 400s or lower. That&apos;s when I decided I was done guessing and
            started actually learning.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            I didn&apos;t let it go to collections. Instead I worked two full-time
            jobs, 80 hours a week, every week, for almost a year. And I was
            doing this completely alone. I was living in a different state, far
            from home, nobody around if things went bad. I still had to pay
            rent every month. Still had to buy groceries. Still had to handle
            everything that comes with living on your own, on top of trying to
            dig out of $8,000 worth of maxed out cards. That&apos;s why I got the
            second job. There was no other option.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            It was really hard. But it was worth every bit of it. I had one
            goal the entire time and I kept my eyes on it: the Chase Sapphire
            Reserve. I always wanted to travel, and I knew it was one of the
            best travel cards out there. I didn&apos;t fully understand everything
            about it at the time. I just knew I wanted it, and I knew I had to
            fix my credit to ever have a shot at getting approved.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Once I paid everything off, I waited about three months and applied.
            I got approved. For those who don&apos;t know it, the Chase Sapphire
            Reserve is Chase&apos;s top-tier card. It&apos;s a travel card but really
            it&apos;s a lifestyle card. The perks and benefits are a different
            level. And now that I actually understand it, I can tell you it&apos;s
            pointless to travel without some kind of travel card. We&apos;ll get
            into all of that in the Credit Cards 101 course.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Getting to where I am now took about two to three years of real
            effort. Reading books, listening to podcasts, learning by actually
            doing it. I&apos;m not saying I know everything. But I can tell you that
            if you do the right things consistently, the results show up. I&apos;ve
            been at 530. I know what that feels like. And I know it&apos;s not
            permanent.
          </p>

          <p className="text-base leading-relaxed text-muted-foreground">
            If I can do it, you can do it. It just takes some effort. And it
            helps a lot to have a goal, something you actually want, so you can
            keep your eyes on the prize when it gets hard. We&apos;ll talk more
            about that as we go.
          </p>
        </div>
      );

    case "my-story-3":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            My Story · Lesson 3
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            What This Course Will Do For You
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Let me be clear about something before we go any further.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            This course is not going to fix your situation overnight. You
            already know that from my story. It doesn&apos;t work that way. It
            takes time, it takes effort, and it takes actually doing the work.
            But I can tell you from experience that it is worth every bit of it.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Everyone&apos;s situation is different. Hopefully you&apos;re not sitting on
            $50K or more in debt, but even if you are, I can at least give you
            a blueprint, a direction, somewhere to start. For those of you
            closer to where I was, maybe $20K and under, or maybe you just
            don&apos;t fully understand credit yet, or you&apos;re too scared to even use
            your credit card, this course is going to help you. That I&apos;m
            confident about.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            The goal is to help you understand how credit works, why it matters,
            and how credit cards can work for you instead of against you. This
            stuff touches more of your life than most people realize. Rent
            applications, car loans, financing anything for your future. And for
            the younger people out there, in your 20s or late 30s still trying
            to figure it out, the sooner you get this right, the better your
            life looks on the other side.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            I&apos;m writing this in 2026. A lot of people are saying the economy is
            rough right now and they&apos;re not wrong. But honestly, because of what
            I know and how I move now, especially with how I use my credit cards,
            I don&apos;t feel it the same way I would have before. Not trying to brag.
            I&apos;m just saying that when you understand this stuff, you build a
            foundation that doesn&apos;t crumble as easily. I could never go back to
            being knocked down to where I was. Not because nothing bad can
            happen, but because I know how to handle it now. If I ever took a
            hit, it wouldn&apos;t go that low again. That&apos;s what I want for you.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            No fluff. No filler. Just exactly what you need to know to get
            started and build from there. If you want to go harder after this,
            dig deeper, read more, learn more on your own, I encourage that.
            I&apos;m still learning things myself every day. That&apos;s just how it is.
            It&apos;s part of being an adult. It&apos;s honestly a lifestyle. Once you
            get into it, you won&apos;t want to stop.
          </p>

          <p className="text-base font-medium leading-relaxed text-foreground">
            Alright. Let&apos;s get into it.
          </p>
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

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CreditBasicsPage() {
  const [activeLessonId, setActiveLessonId] = useState("my-story-1");
  const [expandedSections, setExpandedSections] = useState<string[]>(["my-story"]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [unlockedSectionIds, setUnlockedSectionIds] = useState<string[]>(["my-story"]);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Compute sections with dynamic lock state
  const sections = SECTIONS.map((s) => ({
    ...s,
    locked: !unlockedSectionIds.includes(s.id),
  }));

  // Only lessons from unlocked sections are navigable
  const navigableLessons = sections
    .filter((s) => !s.locked)
    .flatMap((s) =>
      s.lessons.map((l) => ({ ...l, sectionId: s.id, locked: false }))
    );

  const activeIndex = navigableLessons.findIndex((l) => l.id === activeLessonId);
  const prevLesson = activeIndex > 0 ? navigableLessons[activeIndex - 1] : null;
  const nextLesson =
    activeIndex < navigableLessons.length - 1 ? navigableLessons[activeIndex + 1] : null;

  // Figure out if this is the last lesson of a no-quiz section
  const activeSection = sections.find((s) =>
    s.lessons.some((l) => l.id === activeLessonId)
  );
  const isLastLessonOfNoQuizSection =
    activeSection?.noQuiz &&
    activeSection.lessons[activeSection.lessons.length - 1].id === activeLessonId;

  const nextSectionIndex = activeSection
    ? SECTIONS.findIndex((s) => s.id === activeSection.id) + 1
    : -1;
  const nextSection = nextSectionIndex < SECTIONS.length ? SECTIONS[nextSectionIndex] : null;

  // Progress: count completed non-quiz lessons across ALL sections
  const totalLessons = SECTIONS.flatMap((s) => s.lessons).filter(
    (l) => !("isQuiz" in l && l.isQuiz)
  ).length;
  const progressPct = Math.round((completedLessons.length / totalLessons) * 100);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const goToLesson = (id: string) => {
    setActiveLessonId(id);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0 });
  };

  const markComplete = () => {
    const updated = completedLessons.includes(activeLessonId)
      ? completedLessons
      : [...completedLessons, activeLessonId];
    setCompletedLessons(updated);

    // If last lesson of a no-quiz section → unlock next section
    if (isLastLessonOfNoQuizSection && nextSection) {
      setUnlockedSectionIds((prev) =>
        prev.includes(nextSection.id) ? prev : [...prev, nextSection.id]
      );
      setExpandedSections((prev) =>
        prev.includes(nextSection.id) ? prev : [...prev, nextSection.id]
      );
      // Navigate to first lesson of next section
      goToLesson(nextSection.lessons[0].id);
      return;
    }

    // Otherwise go to next navigable lesson
    if (nextLesson) {
      goToLesson(nextLesson.id);
    }
  };

  const isCompleted = completedLessons.includes(activeLessonId);

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-background">

      {/* ── Top bar ── */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4 sm:px-6">

        {/* Left: back + course title */}
        <div className="flex items-center gap-3">
          <Link
            href="/courses"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="size-4" />
            <span className="hidden sm:inline">Courses</span>
          </Link>
          <div className="h-4 w-px bg-border" />
          <span className="text-sm font-semibold text-foreground">Credit Basics</span>
        </div>

        {/* Right: progress + user + theme toggle */}
        <div className="flex items-center gap-4">
          {/* Progress bar + % */}
          <div className="flex items-center gap-2">
            <div className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-muted sm:block">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%`, background: "var(--brand-600)" }}
              />
            </div>
            <span className="text-xs font-medium text-muted-foreground">{progressPct}%</span>
          </div>

          {/* User avatar + name */}
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
              {mockUser.name[0]}
            </div>
            <span className="hidden text-sm font-medium text-foreground sm:inline">
              {mockUser.name}
            </span>
          </div>

          <ThemeToggle />

          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="flex size-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground lg:hidden"
          >
            <BookOpen className="size-4" />
          </button>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar ── */}
        <aside
          className={`${
            mobileSidebarOpen ? "flex" : "hidden"
          } w-[280px] shrink-0 flex-col border-r border-border lg:flex`}
        >
          <div className="border-b border-border px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Sections
            </p>
          </div>

          <nav className="flex-1 overflow-y-auto py-2">
            {sections.map((section) => {
              const isExpanded = expandedSections.includes(section.id);
              const completedCount = section.lessons.filter((l) =>
                completedLessons.includes(l.id)
              ).length;

              return (
                <div key={section.id}>
                  <button
                    onClick={() => !section.locked && toggleSection(section.id)}
                    disabled={section.locked}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors ${
                      section.locked
                        ? "cursor-not-allowed opacity-40"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      {section.locked ? (
                        <Lock className="size-3.5 shrink-0 text-muted-foreground" />
                      ) : completedCount === section.lessons.length ? (
                        <CheckCircle2 className="size-3.5 shrink-0 text-green-500" />
                      ) : (
                        <Circle className="size-3.5 shrink-0 text-muted-foreground" />
                      )}
                      <span className="truncate text-sm font-medium text-foreground">
                        {section.title}
                      </span>
                    </div>
                    {!section.locked && (
                      <div className="ml-2 flex shrink-0 items-center gap-2">
                        <span className="text-[11px] text-muted-foreground">
                          {completedCount}/{section.lessons.length}
                        </span>
                        <ChevronDown
                          className={`size-3.5 text-muted-foreground transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    )}
                  </button>

                  {isExpanded && !section.locked && (
                    <div className="pb-1">
                      {section.lessons.map((lesson) => {
                        const isActive = lesson.id === activeLessonId;
                        const isDone = completedLessons.includes(lesson.id);
                        const isQuiz = "isQuiz" in lesson && lesson.isQuiz;

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => goToLesson(lesson.id)}
                            className={`flex w-full items-center gap-2.5 py-2 pr-4 text-left text-sm transition-colors ${
                              isActive
                                ? "bg-muted/60 font-medium text-foreground"
                                : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                            }`}
                            style={
                              isActive
                                ? {
                                    borderLeft: "2px solid var(--brand-600)",
                                    paddingLeft: "calc(2.25rem - 2px)",
                                  }
                                : { borderLeft: "2px solid transparent", paddingLeft: "2.25rem" }
                            }
                          >
                            {isDone ? (
                              <CheckCircle2 className="size-3.5 shrink-0 text-green-500" />
                            ) : isQuiz ? (
                              <div className="size-3.5 shrink-0 rounded-sm border border-muted-foreground/40" />
                            ) : (
                              <Circle className="size-3.5 shrink-0 opacity-40" />
                            )}
                            <span className="truncate leading-snug">{lesson.title}</span>
                            {isQuiz && (
                              <span className="ml-auto shrink-0 rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                                Quiz
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* ── Main content ── */}
        <main className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-2xl px-6 py-10 sm:px-10 sm:py-14">
              <LessonContent lessonId={activeLessonId} />
            </div>
          </div>

          {/* ── Bottom nav ── */}
          <div className="shrink-0 border-t border-border bg-background px-6 py-3">
            <div className="mx-auto flex max-w-2xl items-center justify-between">

              {/* Prev */}
              {prevLesson ? (
                <button
                  onClick={() => goToLesson(prevLesson.id)}
                  className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <ChevronLeft className="size-4" />
                  <span className="hidden sm:inline">{prevLesson.title}</span>
                  <span className="sm:hidden">Previous</span>
                </button>
              ) : (
                <div />
              )}

              {/* Complete / Next */}
              <div className="flex items-center gap-3">
                {isCompleted ? (
                  <>
                    <span className="flex items-center gap-1.5 text-sm text-green-600">
                      <CheckCircle2 className="size-4" />
                      Completed
                    </span>
                    {/* After last no-quiz lesson: show next section CTA */}
                    {isLastLessonOfNoQuizSection && nextSection && (
                      <button
                        onClick={() => goToLesson(nextSection.lessons[0].id)}
                        className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <span>{nextSection.title}</span>
                        <ChevronRight className="size-4" />
                      </button>
                    )}
                    {/* Normal next lesson */}
                    {!isLastLessonOfNoQuizSection && nextLesson && (
                      <button
                        onClick={() => goToLesson(nextLesson.id)}
                        className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <span className="hidden sm:inline">{nextLesson.title}</span>
                        <span className="sm:hidden">Next</span>
                        <ChevronRight className="size-4" />
                      </button>
                    )}
                  </>
                ) : (
                  <Button size="sm" onClick={markComplete}>
                    {isLastLessonOfNoQuizSection && nextSection
                      ? `Complete & Start ${nextSection.title}`
                      : nextLesson
                      ? "Complete & Continue"
                      : "Mark Complete"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
