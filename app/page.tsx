import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, BookOpen, ChevronRight, Target, GraduationCap, Users } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
          <Shield className="size-3.5" />
          <span>Built for those who served</span>
        </div>

        {/* Headline */}
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Financial freedom starts here —{" "}
          <span className="text-foreground/50">for those who earned it.</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Free credit and finance education for active duty, veterans, and
          military families. Know your benefits. Build your future.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/learn">
              <BookOpen className="size-4" />
              Start Learning
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/card">
              The Card
              <ChevronRight className="size-4" />
            </Link>
          </Button>
        </div>

        {/* Trust line */}
        <p className="mt-12 text-sm text-muted-foreground">
          Veteran-founded · Free for military · No credit card required
        </p>
      </section>

      {/* Mission */}
      <section className="border-t border-border bg-muted/40 px-4 py-24">
        <div className="mx-auto max-w-4xl">
          {/* Section label */}
          <p className="mb-4 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Our Mission
          </p>

          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Trained to serve. Now let&apos;s train for life.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-muted-foreground">
            Service members are trained to be the best in the world at what they
            do — but financial literacy isn&apos;t part of the curriculum. On
            base, most of life is handled: housing, meals, structure. When
            service ends, that safety net disappears overnight.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
            That gap — between dedicated service and civilian life — contributes
            to veteran financial hardship and, too often, homelessness. We
            believe that&apos;s unacceptable. Veterans deserve the same
            dedication to their future that they gave to this country.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-center text-lg font-medium text-foreground">
            Vet Finance exists to close that gap — for free, for every veteran
            who needs it.
          </p>

          {/* Three pillars */}
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full border border-border bg-background">
                <GraduationCap className="size-5 text-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">Free Education</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Credit basics, credit cards, and military financial benefits —
                all free for verified service members.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full border border-border bg-background">
                <Target className="size-5 text-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">Real Benefits</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                SCRA protections, annual fee waivers, and exclusive perks most
                veterans don&apos;t know they&apos;re entitled to.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full border border-border bg-background">
                <Users className="size-5 text-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">Built Community</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                A place where veterans still belong, still have purpose, and can
                help each other succeed beyond service.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
