import { Shield, BookOpen, CreditCard, Star, Zap } from "lucide-react";

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
          According to HUD&apos;s Annual Homeless Assessment Report, on any
          given night roughly <span className="font-semibold text-foreground">37,000 veterans are homeless</span> in
          the United States. The financial transition out of service — from a
          structured environment where everything is provided to suddenly
          managing rent, credit, and bills alone — is one of the documented
          contributing factors.
        </p>
        <p className="font-medium text-foreground">
          That is unacceptable for the people who gave everything for this
          country. Vet Finance was built to close that gap.
        </p>
      </div>

      {/* Divider */}
      <div className="my-16 border-t border-border" />

      {/* What we do */}
      <div className="mb-16">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
          What we do
        </h2>
        <p className="mb-8 text-muted-foreground">
          No bureaucracy. No overwhelming courses. Just straight-to-the-point
          knowledge designed to get you building credit and making smart
          financial decisions as fast as possible.
        </p>

        <div className="flex flex-col gap-8">
          <div className="flex gap-4">
            <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted">
              <BookOpen className="size-4 text-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Credit Education</h3>
              <p className="mt-1 text-muted-foreground">
                How credit works, what builds your score, what tanks it, and
                how to go from zero to a strong credit profile — explained
                clearly, without the fluff.
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
                How to use credit cards as a tool, not a trap. We also cover
                military-specific benefits most veterans don&apos;t know they
                have — SCRA interest rate protections, annual fee waivers on
                premium cards for active duty, and more.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted">
              <Zap className="size-4 text-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Built different from VA programs</h3>
              <p className="mt-1 text-muted-foreground">
                The VA and DoD have financial programs, but they&apos;re slow,
                bureaucratic, and hard to navigate. We cut through all of that.
                Our goal is simple: give you the right knowledge fast so you
                can take action today, not after a 12-week course.
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
              card — along with partnerships, sponsors, and impact investors
              who believe in this mission — funds real perks for military
              cardholders: travel benefits, gear discounts, and more.
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
