"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { courseCatalog, courseMeta, PLAYBOOK_GUIDE_COUNT } from "@/lib/course-catalog";

const FOUNDER_EMAIL = "david.vargas024@gmail.com";

const totalSections = courseCatalog.reduce((n, c) => n + c.sections.length, 0);

const facts = [
  { value: String(courseCatalog.length), label: "Courses" },
  { value: String(totalSections), label: "Sections" },
  { value: String(PLAYBOOK_GUIDE_COUNT), label: "Playbook guides" },
  { value: "$0", label: "For military" },
];

type AccessState = "loading" | "guest" | "pending" | "active";

function StatusCard({ state, firstName }: { state: AccessState; firstName?: string | null }) {
  if (state === "loading") {
    return <div aria-hidden="true" className="h-[17rem] flex-1 animate-pulse rounded-2xl bg-navy-deep/90" />;
  }

  const content = {
    guest: {
      badge: "Beta · Invite only",
      title: "You need an invite code to get in.",
      body: "Vet Finance is currently in beta. The only way in right now is with an invite code. If you have one, you're good to go.",
      cta: null,
      note: "Already have an account? Use your invite link to sign in.",
    },
    pending: {
      badge: "Almost there",
      title: "One step left.",
      body: "You're signed in. Just enter your invite code to unlock your courses.",
      cta: { href: "/onboarding", label: "Complete setup" },
      note: null,
    },
    active: {
      badge: "You're in",
      title: `Welcome back, ${firstName ?? "there"}.`,
      body: "Your courses are ready. Pick up where you left off.",
      cta: { href: "/courses", label: "Go to your courses" },
      note: null,
    },
  }[state];

  return (
    <div className="flex-1 rounded-2xl bg-navy-deep p-8 text-white sm:p-9">
      <p className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-brass uppercase">
        <span className="size-1.5 rounded-full bg-brass" aria-hidden="true" />
        {content.badge}
      </p>
      <h2 className="mt-5 text-2xl font-bold tracking-tight">{content.title}</h2>
      <p className="mt-3 leading-relaxed text-[#c9d2e0]">{content.body}</p>
      {content.cta && (
        <Button size="lg" className="mt-7 h-12 rounded-full bg-brass px-7 text-base font-semibold text-navy-deep hover:bg-brass/90" asChild>
          <Link href={content.cta.href}>
            {content.cta.label}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      )}
      {content.note && (
        <p className="mt-6 border-t border-white/15 pt-5 text-sm text-[#9aa5b8]">{content.note}</p>
      )}
    </div>
  );
}

export default function LearnPage() {
  const { user, isLoaded } = useUser();

  const email = user?.primaryEmailAddress?.emailAddress;
  const hasAccess = email === FOUNDER_EMAIL || !!user?.publicMetadata?.activated;
  const state: AccessState = !isLoaded ? "loading" : !user ? "guest" : hasAccess ? "active" : "pending";

  return (
    <>
      {/* Intro */}
      <section className="bg-card">
        <div className="mx-auto flex max-w-site flex-col gap-10 px-4 pt-16 pb-16 sm:px-6 lg:flex-row lg:items-center lg:gap-20 lg:pt-20 lg:pb-20">
          <div className="flex-[1.2]">
            <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">Courses</p>
            <h1 className="mt-5 text-4xl leading-[1.08] font-extrabold tracking-[-0.03em] text-navy sm:text-[2.75rem] lg:text-5xl">
              Your financial education starts here.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Free for all military members and veterans. Straight to the
              point, built to get you taking action fast, not sitting through
              hours of fluff.
            </p>
            <dl className="mt-10 grid max-w-xl grid-cols-2 gap-6 sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label} className="border-t-2 border-navy pt-3">
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="text-3xl font-extrabold tracking-[-0.02em] text-navy">{f.value}</dd>
                  <dd className="mt-1 text-sm text-muted-foreground">{f.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <StatusCard state={state} firstName={user?.firstName} />
        </div>
      </section>

      {/* Curriculum */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-site px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-navy sm:text-4xl">The curriculum</h2>
          <p className="mt-4 max-w-2xl text-[17px] text-muted-foreground">
            Four courses, each broken into short sections. Start with Credit
            Basics, or jump to whatever you need right now.
          </p>

          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {courseCatalog.map((course) => {
              const { title, icon: Icon, desc, tag, sections } = course;
              return (
                <li key={title} className="flex flex-col rounded-2xl border border-border bg-card p-7">
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-navy">
                      <Icon className="size-[22px] text-white" strokeWidth={1.8} aria-hidden="true" />
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
                      <p className="mt-0.5 text-sm font-medium text-muted-foreground">{courseMeta(course)}</p>
                    </div>
                  </div>

                  <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">{desc}</p>

                  <p className="mt-6 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">What&apos;s inside</p>
                  <ol className="mt-3 flex-1 border-t border-border">
                    {sections.map((section, i) => (
                      <li key={section} className="flex gap-4 border-b border-border py-2.5 text-[15px] text-foreground/85">
                        <span className="w-5 shrink-0 text-sm font-semibold text-muted-foreground tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {section}
                      </li>
                    ))}
                  </ol>
                </li>
              );
            })}
          </ul>

          {/* Playbook bonus */}
          <div className="mt-5 flex flex-col gap-5 rounded-2xl bg-navy p-7 text-white sm:flex-row sm:items-center">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-white/10">
              <Compass className="size-[22px] text-brass" strokeWidth={1.8} aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold">Bonus: the &ldquo;What Would I Do If I&hellip;&rdquo; Playbook</h3>
              <p className="mt-1 text-[15px] text-[#c9d2e0]">
                Finish Credit Basics and Credit Cards 101 to unlock a
                step-by-step plan built for your situation, picked from{" "}
                {PLAYBOOK_GUIDE_COUNT} guides.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
