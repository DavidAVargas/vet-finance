import { ArrowRight, Check, Handshake, BookOpen, Rocket, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardArt, type CardTier } from "@/components/card/CardArt";
import { cn } from "@/lib/utils";

const tiers: {
  id: CardTier;
  name: string;
  who: string;
  badge: string;
  description: string;
  perks: string[];
}[] = [
  {
    id: "combat-black",
    name: "Combat Black",
    who: "Combat veterans only",
    badge: "Most exclusive",
    description:
      "The elite tier. Reserved exclusively for those who faced combat, who stood toe to toe with danger so the rest of us never had to.",
    perks: [
      "Highest rewards rate",
      "Elite travel benefits",
      "Priority concierge support",
      "Exclusive Combat Black events",
      "Zero annual fee, earned in full",
      "“Thank you for your service” on every receipt",
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    who: "All active duty & veterans",
    badge: "Most popular",
    description:
      "Built for every service member: active duty, reserves, and veterans. Every role makes the military work, and this card honors that.",
    perks: [
      "Competitive rewards rate",
      "SCRA and MLA protections applied automatically",
      "Annual fee waived",
      "Military travel perks",
      "Access to all Vet Finance content",
      "“Thank you for your service” on every receipt",
    ],
  },
  {
    id: "supporter",
    name: "Supporter",
    who: "Civilians who give back",
    badge: "~$100/yr",
    description:
      "You didn't serve, but you want to support those who did. Your annual fee directly funds veteran perks and keeps education free.",
    perks: [
      "Standard rewards rate",
      "Supporter badge & recognition",
      "Access to the Vet Finance community",
      "Annual fee funds veteran benefits",
      "“Thank you for your support” on receipts",
    ],
  },
];

const steps = [
  {
    title: "Supporters join",
    desc: "Civilians sign up for the Supporter card and pay the annual fee.",
  },
  {
    title: "Revenue is pooled",
    desc: "Supporter fees, sponsorships, and partners fund the veteran benefit pool.",
  },
  {
    title: "Veterans get rewarded",
    desc: "Combat Black and Platinum cardholders receive travel perks, gear discounts, and more, at no cost.",
  },
];

const roadmap = [
  {
    icon: BookOpen,
    status: "Live now",
    title: "Free financial education",
    desc: "Four courses and a personalized playbook, free for the military community.",
    active: true,
  },
  {
    icon: UsersRound,
    status: "In progress",
    title: "Build the community",
    desc: "Every sign-up strengthens the case we bring to banking partners and investors.",
    active: true,
  },
  {
    icon: Handshake,
    status: "Next",
    title: "Banking partnership",
    desc: "We're actively looking to partner with Bank of America. A card for veterans deserves a bank that carries America in its name. If you have a connection, reach out.",
    active: false,
  },
  {
    icon: Rocket,
    status: "The goal",
    title: "Launch the card",
    desc: "Combat Black, Platinum, and Supporter cards in the hands of the people they were built for.",
    active: false,
  },
];

export default function CardPage() {
  return (
    <>
      {/* Intro */}
      <section className="bg-card">
        <div className="mx-auto max-w-site px-4 pt-16 pb-14 sm:px-6 lg:pt-20 lg:pb-16">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface py-1.5 pr-3.5 pl-2 text-sm font-medium text-foreground/80">
            <span className="rounded-full bg-brass/20 px-2.5 py-0.5 text-xs font-semibold text-[#7a5a22]">
              In development
            </span>
            Our long-term goal
          </p>
          <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div className="max-w-2xl">
              <h1 className="text-4xl leading-[1.08] font-extrabold tracking-[-0.03em] text-navy sm:text-[2.75rem] lg:text-5xl">
                The card built for those who served.
              </h1>
              <p className="mt-5 text-lg text-muted-foreground">
                Our goal is to not just help veterans learn, but to help them
                earn. A military credit card line designed from the ground up,
                with a way for civilians to support the mission too.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button size="lg" className="h-12 rounded-full px-7 text-base font-semibold" asChild>
                <a href="#waitlist">
                  Join the waitlist
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-12 rounded-full border-input bg-card px-7 text-base font-semibold text-navy" asChild>
                <a href="#how-it-works">How it works</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tier showcase */}
      <section aria-labelledby="tiers-heading" className="bg-navy-deep text-white">
        <div className="mx-auto max-w-site px-4 py-16 sm:px-6 lg:py-20">
          <p className="text-sm font-semibold tracking-[0.14em] text-brass uppercase">The tiers</p>
          <h2 id="tiers-heading" className="mt-3 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
            Three cards. One mission.
          </h2>

          <ul className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8">
            {tiers.map((tier) => (
              <li key={tier.id} className="flex flex-col">
                <CardArt tier={tier.id} />
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl font-bold">{tier.name}</h3>
                  <span className="rounded-full border border-white/20 px-2.5 py-0.5 text-xs font-semibold text-[#d5dce7]">
                    {tier.badge}
                  </span>
                </div>
                <p className="mt-1 text-sm font-semibold tracking-[0.1em] text-brass uppercase">{tier.who}</p>
                <p className="mt-4 leading-relaxed text-[#c9d2e0]">{tier.description}</p>

                <p className="mt-6 text-xs font-semibold tracking-[0.14em] text-[#9aa5b8] uppercase">Planned perks</p>
                <ul className="mt-3 flex flex-col gap-2.5 border-t border-white/10 pt-4">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5 text-[15px] text-[#d5dce7]">
                      <Check className="mt-0.5 size-4 shrink-0 text-brass" strokeWidth={2.4} aria-hidden="true" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* A note on Combat Black */}
      <section className="bg-card">
        <div className="mx-auto grid max-w-site gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:gap-20 lg:py-20">
          <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-navy sm:text-4xl lg:self-start">
            A note on Combat Black
          </h2>
          <div className="flex flex-col gap-5 text-[17px] leading-relaxed text-muted-foreground">
            <p>
              We want to be clear: every single role in the military matters.
              From the cooks to the medics to the logistics teams, the military
              only works because every person shows up and does their part.
              That service is honorable and we respect it fully.
            </p>
            <p>
              Combat Black exists because we also believe that those who were
              sent directly into harm&apos;s way, who stood face to face with
              danger, who risked everything in the most extreme conditions,
              deserve a specific acknowledgment of that bravery. It is not about
              rank or status. It is about recognizing the sacrifice of those who
              were closest to the fight, and making sure they know we see that.
            </p>
            <p className="mt-2 border-l-[3px] border-brass pl-6 text-xl leading-snug font-bold tracking-tight text-navy sm:text-2xl">
              No hard feelings between tiers. Just honor where honor is due.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-20 border-t border-border bg-surface">
        <div className="mx-auto max-w-site px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-navy sm:text-4xl">How it works</h2>
          <p className="mt-4 max-w-2xl text-[17px] text-muted-foreground">
            Civilians who believe in the mission fund the perks for those who
            served.
          </p>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step.title} className="relative rounded-2xl border border-border bg-card p-7">
                <span className="flex size-10 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{step.desc}</p>
                {i < steps.length - 1 && (
                  <ArrowRight
                    className="absolute top-1/2 -right-[18px] z-10 hidden size-5 -translate-y-1/2 rounded-full bg-surface text-navy/50 md:block"
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>

          {/* Road to launch */}
          <h2 className="mt-16 text-3xl font-extrabold tracking-[-0.03em] text-navy sm:text-4xl lg:mt-20">The road to launch</h2>
          <p className="mt-4 max-w-2xl text-[17px] text-muted-foreground">
            This becomes real one step at a time, and the more people who sign
            up, the faster we get there.
          </p>
          <ol className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {roadmap.map(({ icon: Icon, status, title, desc, active }) => (
              <li key={title} className={cn("border-t-[3px] pt-6", active ? "border-navy" : "border-border")}>
                <div className="flex items-center justify-between">
                  <Icon className={cn("size-6", active ? "text-navy" : "text-muted-foreground")} strokeWidth={1.8} aria-hidden="true" />
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                      active ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground",
                    )}
                  >
                    {status}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-navy">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="scroll-mt-20 bg-navy text-white">
        <div className="mx-auto max-w-site px-4 py-16 text-center sm:px-6 lg:py-20">
          <h2 className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">Help us make this real.</h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] text-[#c9d2e0]">
            The more people who sign up, the stronger the case we can make to
            banking partners and investors. Join the founding member list and
            be first in line when we launch.
          </p>
          <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <label htmlFor="card-waitlist-email" className="sr-only">Email address</label>
            <input
              id="card-waitlist-email"
              type="email"
              placeholder="Enter your email"
              className="h-12 w-full rounded-full border border-white/20 bg-white/10 px-5 text-[15px] text-white placeholder:text-[#9aa5b8] focus:border-white/40 focus:ring-2 focus:ring-brass/60 focus:outline-none"
            />
            <Button type="submit" size="lg" className="h-12 shrink-0 rounded-full bg-brass px-7 text-base font-semibold text-navy-deep hover:bg-brass/90">
              Join the mission
            </Button>
          </form>
          <p className="mt-4 text-sm text-[#9aa5b8]">No spam. Just a heads up when we launch.</p>

          <p className="mx-auto mt-12 max-w-2xl border-t border-white/10 pt-6 text-xs leading-relaxed text-[#9aa5b8]">
            The Vet Finance card is a concept in development. It is not
            currently available, and nothing on this page is an offer of credit
            or an application. Tiers, perks, and fees shown are planned and may
            change.
          </p>
        </div>
      </section>
    </>
  );
}
