import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Compass, ShieldCheck, Users } from "lucide-react";
import { courseCatalog, courseMeta, PLAYBOOK_GUIDE_COUNT } from "@/lib/course-catalog";
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
    title: "Built for those who served",
    desc: "Made for active duty, veterans, and their families.",
  },
  {
    icon: Clock,
    title: "Short and to the point",
    desc: "Bite-size sections you can finish between duty days.",
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
      <section className="relative isolate flex min-h-[calc(100dvh-4.5rem-1px)] flex-col overflow-hidden bg-card">
        {/* Tinted panel behind the lesson preview (desktop) */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 left-[62%] -z-10 hidden bg-gradient-to-b from-secondary to-[#e3eaf4] lg:block"
        />

        <div className="mx-auto flex w-full max-w-site flex-1 flex-col items-center justify-center gap-14 px-4 pt-10 pb-14 sm:px-6 sm:pt-12 sm:pb-20 lg:flex-row lg:gap-20 lg:pt-6 lg:pb-24">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card py-1.5 pr-3.5 pl-2 text-sm font-medium text-foreground/80">
              <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                Free
              </span>
              Built for the military community
            </div>

            <h1 className="mt-7 max-w-xl text-4xl leading-[1.05] font-extrabold tracking-[-0.035em] text-navy sm:text-5xl lg:text-[3.75rem]">
              The money stuff nobody teaches you in uniform.
            </h1>

            <p className="mt-6 max-w-[32.5rem] text-lg text-muted-foreground sm:text-xl">
              Credit, military pay, the VA home loan, the GI Bill. Explained in
              plain English, straight to the point. No sales pitch.
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

          <div className="w-full max-w-xl flex-1 lg:max-w-none">
            <LessonPreview />
          </div>
        </div>

        {/* Trust strip */}
        <div className="border-t border-border bg-surface">
          <ul className="mx-auto grid max-w-site gap-6 px-4 py-7 sm:grid-cols-3 sm:px-6">
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
      <section id="whats-inside" className="scroll-mt-20 border-t border-border bg-surface px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-site">
          <h2 className="max-w-2xl text-3xl leading-tight font-extrabold tracking-[-0.03em] text-navy sm:text-[2.625rem]">
            Four courses. Start wherever you are.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Building credit from zero, getting ready to separate, or trying to
            make sense of your benefits: there&apos;s a place to start. Short
            sections, real examples, no fluff.
          </p>

          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {courseCatalog.map((course) => {
              const { title, icon: Icon, desc, tag } = course;
              return (
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
                  <p className="mt-3 text-sm font-medium text-muted-foreground">{courseMeta(course)}</p>
                </div>
              </li>
              );
            })}
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
                plan built for your situation, picked from {PLAYBOOK_GUIDE_COUNT} guides.
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
