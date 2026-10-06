import Link from "next/link";
import { ArrowRight, BookOpen, CreditCard, Users, Zap } from "lucide-react";

const pillars = [
  {
    icon: BookOpen,
    title: "Credit education",
    desc: "How credit works, what builds your score, what tanks it, and how to go from zero to a strong credit profile, explained clearly and without the fluff.",
  },
  {
    icon: CreditCard,
    title: "Credit card education",
    desc: "How to use credit cards as a tool, not a trap, plus the military-specific benefits most people don't know they have: SCRA interest rate protections, annual fee waivers on premium cards for active duty, and more.",
  },
  {
    icon: Zap,
    title: "Built different from VA programs",
    desc: "The VA and DoD have financial programs, but they're slow and hard to navigate. Our goal is simple: give you the right knowledge fast so you can take action today, not after a 12-week course.",
  },
];

const tiers = ["Combat Black", "Platinum", "Supporter"];

export default function MissionPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-card">
        <div className="mx-auto flex max-w-site flex-col gap-12 px-4 pt-16 pb-20 sm:px-6 lg:flex-row lg:items-center lg:gap-20 lg:pt-20 lg:pb-24">
          <div className="flex-[1.3]">
            <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Our Mission
            </p>
            <h1 className="mt-5 max-w-2xl text-4xl leading-[1.08] font-extrabold tracking-[-0.03em] text-navy sm:text-[2.75rem] lg:text-5xl">
              Every service member should leave the military financially ready.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Free, straight-talk financial education for active duty,
              veterans, and their families, so the transition out of uniform
              doesn&apos;t become a financial cliff.
            </p>
          </div>

          <figure className="flex-1 rounded-2xl bg-navy-deep p-8 text-white sm:p-10">
            <p className="text-5xl font-extrabold tracking-[-0.03em] sm:text-6xl">32,495</p>
            <p className="mt-3 text-base leading-snug text-[#d5dce7]">
              veterans were experiencing homelessness on a single night in
              January 2025.
            </p>
            <figcaption className="mt-8 flex items-center gap-3 border-t border-white/15 pt-5 text-sm text-[#9aa5b8]">
              <span className="h-0.5 w-6 bg-brass" aria-hidden="true" />
              HUD 2025 Point-in-Time Count
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Story */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto grid max-w-site gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:gap-20 lg:py-20">
          <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-navy sm:text-4xl lg:sticky lg:top-28 lg:self-start">
            Why we built this
          </h2>

          <div className="flex flex-col gap-5 text-[17px] leading-relaxed text-muted-foreground">
            <p>
              Every service member is trained to be the best at what they do.
              They learn discipline, sacrifice, and how to operate under
              pressure. But nobody teaches them how to build credit, manage a
              credit card, or navigate the financial system when they come
              home.
            </p>
            <p>
              While serving, most of life is handled: housing, meals,
              healthcare, structure. It&apos;s all taken care of. The moment
              service ends, that safety net disappears overnight and veterans
              are expected to figure it out on their own.
            </p>
            <p>
              According to HUD&apos;s 2025 Point-in-Time Count,{" "}
              <span className="font-semibold text-foreground">
                32,495 veterans were homeless
              </span>{" "}
              on a single night in the United States. The financial transition
              out of service, from a structured environment where everything is
              provided to suddenly managing rent, credit, and bills alone, is
              one of the documented contributing factors.
            </p>

            <blockquote className="mt-4 border-l-[3px] border-brass pl-6 text-xl leading-snug font-bold tracking-tight text-navy sm:text-2xl">
              That is unacceptable for the people who gave everything for this
              country. Vet Finance was built to close that gap.
            </blockquote>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-site px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-navy sm:text-4xl">
            What we do
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] text-muted-foreground">
            No bureaucracy. No overwhelming courses. Just straight-to-the-point
            knowledge designed to get you building credit and making smart
            financial decisions as fast as possible.
          </p>

          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {pillars.map(({ icon: Icon, title, desc }) => (
              <li key={title} className="rounded-2xl border border-border bg-surface p-7">
                <div className="flex size-12 items-center justify-center rounded-[14px] bg-navy">
                  <Icon className="size-[22px] text-white" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-navy">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Where we're headed */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-site px-4 py-16 sm:px-6 lg:py-20">
          <p className="text-sm font-semibold tracking-[0.14em] text-brass uppercase">
            Where we&apos;re headed
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
            The education is just the beginning.
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] text-[#c9d2e0]">
            With enough support from this community, the vision goes much
            further.
          </p>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <div className="flex flex-col rounded-2xl border border-white/12 bg-white/[0.04] p-8">
              <CreditCard className="size-7 text-brass" strokeWidth={1.8} aria-hidden="true" />
              <h3 className="mt-5 text-xl font-bold">A military credit card, built for veterans</h3>
              <p className="mt-3 flex-1 leading-relaxed text-[#c9d2e0]">
                The long-term goal is a branded military credit card line with
                three tiers: Combat Black for combat veterans, Platinum for all
                active duty and veterans, and a Supporter card for civilians who
                want to give back. Supporter revenue, along with partnerships,
                sponsors, and impact investors, funds real perks for military
                cardholders: travel benefits, gear discounts, and more.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {tiers.map((t) => (
                  <span key={t} className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold tracking-wide text-[#d5dce7]">
                    {t}
                  </span>
                ))}
              </div>
              <Link href="/card" className="mt-7 inline-flex items-center gap-2 self-start font-semibold text-white hover:text-brass">
                Learn about the card <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="flex flex-col rounded-2xl border border-white/12 bg-white/[0.04] p-8">
              <Users className="size-7 text-brass" strokeWidth={1.8} aria-hidden="true" />
              <h3 className="mt-5 text-xl font-bold">A community built on purpose</h3>
              <p className="mt-3 flex-1 leading-relaxed text-[#c9d2e0]">
                One of the hardest parts of leaving service is losing the sense
                of belonging and purpose that comes with it. We want to build a
                community where veterans still have both, where they can learn,
                grow, and help each other succeed beyond the uniform.
              </p>
              <Link href="/community" className="mt-7 inline-flex items-center gap-2 self-start font-semibold text-white hover:text-brass">
                Explore the community <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <p className="mt-10 max-w-2xl text-[#c9d2e0]">
            None of this happens without the support of veterans, military
            families, and people who believe in this mission.{" "}
            <span className="font-semibold text-white">We&apos;re just getting started.</span>
          </p>
        </div>
      </section>
    </>
  );
}
