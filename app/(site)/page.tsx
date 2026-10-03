import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { Shield, BookOpen, ArrowRight, CreditCard } from "lucide-react";
import { LessonPreview } from "@/components/home/LessonPreview";

const FOUNDER_EMAIL = "david.vargas024@gmail.com";

const creditBasics = [
  { topic: "Credit Scores", desc: "What they are, how they're calculated, and what's considered good vs. bad." },
  { topic: "Hard & Soft Pulls", desc: "The difference between a hard inquiry and a soft pull — and when each one hits your score." },
  { topic: "Credit Age", desc: "Why the age of your accounts matters and how to protect it." },
  { topic: "Derogatory Marks", desc: "Late payments, collections, charge-offs — what they are and how to deal with them." },
  { topic: "Credit Utilization", desc: "The ratio that can make or break your score and how to keep it in check." },
  { topic: "And a lot more to learn...", desc: "Bureaus, disputes, building from zero, authorized users, credit mix, and more." },
];

const creditCards = [
  { topic: "Travel Cards", desc: "Earn points and miles to fly, stay in hotels, and explore — the right way." },
  { topic: "Cash Back Cards", desc: "Simple rewards that put money back in your pocket on everyday purchases." },
  { topic: "Store & Co-Branded Cards", desc: "When they're worth it and when they're a trap." },
  { topic: "Secured Cards", desc: "The best tool for building credit from zero — and how to graduate off them." },
  { topic: "Military Benefits", desc: "SCRA protections, annual fee waivers, and perks most banks don't advertise." },
  { topic: "And a lot more to learn...", desc: "APR, minimum payment traps, balance transfers, sign-up bonuses, and more." },
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
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-14 py-16 sm:py-20 lg:min-h-[calc(100dvh-4.5rem)] lg:flex-row lg:gap-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card py-1.5 pr-4 pl-1.5 text-sm font-medium text-foreground/80">
              <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                Free
              </span>
              By a veteran, for the military community
            </div>

            <h1 className="mt-7 max-w-xl text-4xl leading-[1.05] font-extrabold tracking-[-0.035em] text-foreground sm:text-5xl lg:text-6xl">
              The money stuff nobody taught us in uniform.
            </h1>

            <p className="mt-6 max-w-lg text-lg text-muted-foreground sm:text-xl">
              Credit, military pay, the VA home loan, the GI Bill. Explained in
              plain English by someone who&apos;s been there. No sales pitch.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              {user ? (
                <Button size="lg" className="h-12 rounded-full px-7 text-base" asChild>
                  <Link href={ctaHref}>
                    {ctaLabel}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              ) : (
                <Button size="lg" className="h-12 rounded-full px-7 text-base" disabled>
                  {ctaLabel}
                  <ArrowRight className="size-4" />
                </Button>
              )}
              <Button size="lg" variant="outline" className="h-12 rounded-full bg-card px-7 text-base" asChild>
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
      </section>

      {/* What You'll Learn */}
      <section id="whats-inside" className="scroll-mt-20 border-t border-border bg-muted/40 px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
            What You&apos;ll Learn
          </p>
          <h2 className="mb-4 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need. Nothing you don&apos;t.
          </h2>
          <p className="mx-auto mb-16 max-w-xl text-center text-muted-foreground">
            Straight to the point. No fluff, no overwhelming courses — just
            the knowledge that actually moves the needle on your financial life.
          </p>

          <div className="grid gap-12 md:grid-cols-2">
            {/* Credit Basics */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-full border border-border bg-background">
                  <Shield className="size-4 text-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Credit Basics</h3>
              </div>
              <div className="flex flex-col gap-4">
                {creditBasics.map((item) => (
                  <div key={item.topic} className="flex gap-3">
                    <div className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/40" />
                    <div>
                      <p className={`font-medium ${item.topic === "More coming..." ? "text-muted-foreground italic" : "text-foreground"}`}>
                        {item.topic}
                      </p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Credit Cards */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-full border border-border bg-background">
                  <CreditCard className="size-4 text-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Credit Cards</h3>
              </div>
              <div className="flex flex-col gap-4">
                {creditCards.map((item) => (
                  <div key={item.topic} className="flex gap-3">
                    <div className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/40" />
                    <div>
                      <p className={`font-medium ${item.topic === "More coming..." ? "text-muted-foreground italic" : "text-foreground"}`}>
                        {item.topic}
                      </p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            {user ? (
              <Button size="lg" asChild>
                <Link href={ctaHref}>
                  <BookOpen className="size-4" />
                  Go to your courses
                </Link>
              </Button>
            ) : (
              <Button size="lg" disabled className="opacity-50 cursor-default">
                <BookOpen className="size-4" />
                Start Learning — It&apos;s Free
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
