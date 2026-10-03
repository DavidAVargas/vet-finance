import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Compass, CreditCard, Gauge, Medal, ShieldCheck, TriangleAlert, Users } from "lucide-react";
import { LessonPreview } from "@/components/home/LessonPreview";

const FOUNDER_EMAIL = "david.vargas024@gmail.com";

const promises = [
  {
    icon: ShieldCheck,
    title: "Free, no catch",
    desc: "Free for the military community. No upsells, no hidden fees.",
  },
  {
    icon: Users,
    title: "Built by one of us",
    desc: "Written by a veteran who's been where you are.",
  },
  {
    icon: Clock,
    title: "Short and to the point",
    desc: "Bite-size sections you can finish between duty days.",
  },
];

const courses = [
  {
    title: "Credit Basics",
    icon: Gauge,
    desc: "Why credit matters, how your score is built, how to track it, and how to protect it from fraud.",
    meta: ["5 sections", "4 quizzes"],
    tag: "Start here",
  },
  {
    title: "Credit Cards 101",
    icon: CreditCard,
    desc: "How cards really work, the power of points, and building a card stack that pays you back.",
    meta: ["4 sections", "3 quizzes"],
    tag: "After Credit Basics",
  },
  {
    title: "Debt Traps",
    icon: TriangleAlert,
    desc: "The car trap, medical debt, and student loans: how they catch people, and how to get out.",
    meta: ["3 sections", "3 quizzes"],
  },
  {
    title: "Military Money",
    icon: Medal,
    desc: "Active duty pay, TSP and retirement, the VA home loan, education benefits, VA disability, and the hidden stuff.",
    meta: ["6 sections", "Self-paced"],
  },
];

export default async function Home() {
  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;
  const isFounder = email === FOUNDER_EMAIL;
  const isActivated = !!user?.publicMetadata?.activated;

  const ctaHref = !user ? "/learn" : isActivated || isFounder ? "/courses" : "/onboarding";
  const ctaLabel = user ? "Go to your courses" : "Start the first course";

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[calc(100dvh-4.5rem-1px)] flex-col overflow-hidden">
        {/* Topographic contour lines, faded toward the edges */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[url(/images/topo.svg)] bg-cover bg-center opacity-[0.13] [mask-image:radial-gradient(ellipse_80%_70%_at_60%_45%,black,transparent)]"
        />

        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center gap-14 px-4 py-14 sm:px-6 sm:py-20 lg:flex-row lg:gap-20 lg:px-8">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card py-1.5 pr-3.5 pl-2 text-sm font-medium text-foreground/80">
              <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                Free
              </span>
              By a veteran, for the military community
            </div>

            <h1 className="mt-7 max-w-xl text-4xl leading-[1.05] font-extrabold tracking-[-0.035em] text-navy sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem]">
              The money stuff nobody taught us in uniform.
            </h1>

            <p className="mt-6 max-w-[32.5rem] text-lg text-muted-foreground sm:text-xl">
              Credit, military pay, the VA home loan, the GI Bill. Explained in
              plain English by someone who&apos;s been there. No sales pitch.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              {user ? (
                <Button size="lg" className="h-12 rounded-full px-7 text-base font-semibold" asChild>
                  <Link href={ctaHref}>
                    {ctaLabel}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              ) : (
                <Button size="lg" className="h-12 rounded-full px-7 text-base font-semibold" disabled>
                  {ctaLabel}
                  <ArrowRight className="size-4" />
                </Button>
              )}
              <Button size="lg" variant="outline" className="h-12 rounded-full border-input bg-card px-7 text-base font-semibold text-navy" asChild>
                <Link href="#whats-inside">See what&apos;s inside</Link>
              </Button>
            </div>

            <p className="mt-7 text-sm text-muted-foreground">
              No credit card required · Active duty, veterans, Guard &amp; Reserve, families
            </p>
          </div>

          <div className="relative w-full max-w-xl flex-1 lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(46_90_154/0.16),transparent)]"
            />
            <LessonPreview />
          </div>
        </div>

        {/* Trust strip */}
        <div className="border-t border-border bg-card/80 backdrop-blur-sm">
          <ul className="mx-auto grid max-w-7xl gap-6 px-4 py-7 sm:grid-cols-3 sm:px-6 lg:px-8">
            {promises.map(({ icon: Icon, title, desc }) => (
              <li key={title} className="flex items-start gap-3.5">
                <Icon className="mt-0.5 size-6 shrink-0 text-navy" strokeWidth={1.8} aria-hidden="true" />
                <div>
                  <p className="font-bold text-navy">{title}</p>
                  <p className="text-[15px] text-muted-foreground">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What You'll Learn */}
      <section id="whats-inside" className="scroll-mt-20 border-t border-border px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="max-w-2xl text-3xl leading-tight font-extrabold tracking-[-0.03em] text-navy sm:text-[2.625rem]">
            Four courses. Start wherever you are.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Building credit from zero, getting ready to separate, or trying to
            make sense of your benefits: there&apos;s a place to start. Short
            sections, real examples, no fluff.
          </p>

          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {courses.map(({ title, icon: Icon, desc, meta, tag }) => (
              <li key={title} className="flex gap-5 rounded-2xl border border-border bg-card p-6 sm:p-7">
                <div className="flex size-13 shrink-0 items-center justify-center rounded-[14px] bg-secondary">
                  <Icon className="size-6 text-navy" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-xl font-bold text-navy">{title}</h3>
                    {tag && (
                      <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                        {tag}
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{desc}</p>
                  <p className="mt-3 text-sm font-medium text-muted-foreground">{meta.join(" · ")}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Playbook bonus */}
          <div className="mt-5 flex flex-col gap-5 rounded-2xl border border-dashed border-[#b8c2d3] bg-card p-6 sm:flex-row sm:items-center sm:p-7">
            <div className="flex size-13 shrink-0 items-center justify-center rounded-[14px] bg-navy">
              <Compass className="size-6 text-white" strokeWidth={1.8} aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold text-navy">
                Bonus: the &ldquo;What Would I Do If I&hellip;&rdquo; Playbook
              </h3>
              <p className="mt-1 text-[15px] text-muted-foreground">
                Finish Credit Basics and Credit Cards 101 to unlock a step-by-step
                plan built for your situation, picked from 15 guides.
              </p>
            </div>
          </div>

          <div className="mt-12">
            {user ? (
              <Button size="lg" className="h-12 rounded-full px-7 text-base font-semibold" asChild>
                <Link href={ctaHref}>
                  Go to your courses
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            ) : (
              <Button size="lg" className="h-12 rounded-full px-7 text-base font-semibold" disabled>
                Start learning, it&apos;s free
                <ArrowRight className="size-4" />
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
