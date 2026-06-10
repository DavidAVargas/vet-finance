import { Shield, CreditCard, Clock, BookOpen, ChevronRight, Star } from "lucide-react";
import Link from "next/link";

const mockUser = {
  name: "David",
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
];

export default function CoursesPage() {
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
          <div className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
            {mockUser.name[0]}
          </div>
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
            <p className="mb-1 text-sm text-muted-foreground">Welcome back</p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {mockUser.name}.
            </h1>
            <p className="mt-2 text-muted-foreground">
              Pick up where you left off, or start a new course.
            </p>
          </div>

          {/* Course cards */}
          <div className="flex flex-col gap-4">
            {courses.map((course) => {
              const Icon = course.icon;
              return (
                <div
                  key={course.id}
                  className={`relative rounded-xl border p-6 transition-colors ${
                    course.available
                      ? "border-border bg-background hover:bg-muted/30"
                      : "border-border bg-muted/20 opacity-60"
                  }`}
                >
                  {/* Recommended badge */}
                  {course.recommended && (
                    <div
                      className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium text-white"
                      style={{ background: "var(--brand-600)" }}
                    >
                      <Star className="size-3" />
                      Start here
                    </div>
                  )}

                  {/* Not available badge */}
                  {!course.available && (
                    <div className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
                      <Clock className="size-3" />
                      Coming soon
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted">
                      <Icon className="size-4 text-foreground" />
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="mb-0.5 flex items-center gap-2">
                        <h2 className="font-bold text-foreground">{course.title}</h2>
                      </div>
                      <p className="mb-4 text-sm text-muted-foreground">{course.description}</p>

                      {/* Topics */}
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

                      {/* Meta + CTA */}
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

                        {course.available ? (
                          <Link
                            href={course.href}
                            className="group flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
                          >
                            Start course
                            <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        ) : (
                          <span className="text-sm text-muted-foreground">Locked</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <p className="mt-10 text-center text-xs text-muted-foreground">
            All courses are free for military members and veterans.
          </p>

        </div>
      </main>
    </div>
  );
}
