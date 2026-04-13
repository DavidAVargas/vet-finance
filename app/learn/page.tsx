import { BookOpen, Shield, CreditCard, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const courses = [
  {
    icon: <Shield className="size-5" />,
    title: "Credit Basics",
    description:
      "Everything you need to know about credit scores, hard pulls, credit age, derogatory marks, utilization, and building credit from zero.",
    topics: ["Credit Scores", "Hard & Soft Pulls", "Credit Utilization", "Derogatory Marks", "Building from Zero", "And more..."],
  },
  {
    icon: <CreditCard className="size-5" />,
    title: "Credit Cards 101",
    description:
      "How credit cards work, how to pick the right one, and how to use them strategically — including military-specific benefits most veterans don't know about.",
    topics: ["Travel Cards", "Cash Back Cards", "APR & Interest", "Military Benefits", "SCRA Protections", "And more..."],
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

      {/* Courses */}
      <div className="mb-16 grid gap-6 sm:grid-cols-2">
        {courses.map((course) => (
          <div
            key={course.title}
            className="relative flex flex-col rounded-xl border border-border bg-muted/20 p-6"
          >
            {/* Coming soon badge */}
            <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              <Clock className="size-3" />
              Coming Soon
            </div>

            <div className="mb-3 flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full border border-border bg-background">
                {course.icon}
              </div>
              <h2 className="font-bold text-foreground">{course.title}</h2>
            </div>

            <p className="mb-5 text-sm text-muted-foreground">{course.description}</p>

            <ul className="mb-6 flex flex-col gap-1.5">
              {course.topics.map((topic) => (
                <li key={topic} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="size-1.5 shrink-0 rounded-full bg-foreground/30" />
                  {topic}
                </li>
              ))}
            </ul>

            <Button variant="outline" size="sm" className="mt-auto w-full" disabled>
              Course Coming Soon
            </Button>
          </div>
        ))}
      </div>

      {/* Notify me */}
      <div className="rounded-xl border border-border bg-muted/40 px-6 py-10 text-center">
        <h2 className="mb-2 text-xl font-bold text-foreground">Get notified when courses drop.</h2>
        <p className="mx-auto mb-6 max-w-sm text-sm text-muted-foreground">
          Leave your email and you&apos;ll be the first to know when the courses go live.
        </p>
        <form className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Your email"
            className="h-10 w-full rounded-md border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button type="submit" className="shrink-0">
            Notify Me
          </Button>
        </form>
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
