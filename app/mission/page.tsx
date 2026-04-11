import { Shield, BookOpen, CreditCard, Star } from "lucide-react";

export default function MissionPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20">

      {/* Header */}
      <div className="mb-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
          <Shield className="size-3.5" />
          <span>Our Mission</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Why we built this
        </h1>
      </div>

      {/* Story */}
      <div className="flex flex-col gap-6 text-lg text-muted-foreground">
        <p>
          Every service member is trained to be the best at what they do.
          They learn discipline, sacrifice, and how to operate under pressure.
          But nobody teaches them how to build credit, manage a credit card,
          or navigate the financial system when they come home.
        </p>
        <p>
          While serving, most of life is handled — housing, meals, healthcare,
          structure. It&apos;s all taken care of. The moment service ends,
          that safety net disappears overnight and veterans are expected to
          figure it out on their own.
        </p>
        <p>
          That gap is one of the leading reasons veterans struggle financially
          after service — and too often, it leads to homelessness. We believe
          that is unacceptable for the people who gave everything for this country.
        </p>
        <p className="font-medium text-foreground">
          Vet Finance was built to close that gap. Free financial education,
          built specifically for those who served.
        </p>
      </div>

      {/* Divider */}
      <div className="my-16 border-t border-border" />

      {/* What we do */}
      <div className="mb-16">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
          What we do
        </h2>
        <div className="flex flex-col gap-8">
          <div className="flex gap-4">
            <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted">
              <BookOpen className="size-4 text-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Credit Education</h3>
              <p className="mt-1 text-muted-foreground">
                We break down how credit works from the ground up — credit
                scores, credit history, what hurts you and what helps you.
                No jargon, no fluff. Just what you need to know to start
                building a strong financial foundation.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted">
              <CreditCard className="size-4 text-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Credit Card Education</h3>
              <p className="mt-1 text-muted-foreground">
                Credit cards are one of the most powerful financial tools
                available — when used right. We teach veterans how to use
                them strategically, understand APR, avoid debt traps, and
                take advantage of military-specific benefits like SCRA
                protections and annual fee waivers that most banks don&apos;t
                advertise loudly enough.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-16 border-t border-border" />

      {/* Future plans */}
      <div>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
          Where we&apos;re headed
        </h2>
        <p className="mb-8 text-muted-foreground">
          The education is just the beginning. With enough support from this
          community, the vision goes much further.
        </p>

        <div className="flex flex-col gap-6">
          <div className="rounded-lg border border-border bg-muted/40 p-6">
            <div className="mb-3 flex items-center gap-2">
              <Star className="size-4 text-foreground" />
              <h3 className="font-semibold text-foreground">A Military Credit Card — Built for Veterans</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              The long-term goal is to launch a branded military credit card
              line with three tiers — Combat Black for combat veterans,
              Platinum for all active duty and veterans, and a Supporter card
              for civilians who want to give back. Revenue from the Supporter
              card funds real perks for military cardholders: travel benefits,
              gear discounts, and more.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-muted/40 p-6">
            <div className="mb-3 flex items-center gap-2">
              <Shield className="size-4 text-foreground" />
              <h3 className="font-semibold text-foreground">A Community Built on Purpose</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              One of the hardest parts of leaving service is losing the sense
              of belonging and purpose that comes with it. We want to build
              a community where veterans still have both — where they can
              learn, grow, and help each other succeed beyond the uniform.
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          None of this happens without the support of veterans, military
          families, and people who believe in this mission.{" "}
          <span className="font-medium text-foreground">
            We&apos;re just getting started.
          </span>
        </p>
      </div>

    </div>
  );
}
