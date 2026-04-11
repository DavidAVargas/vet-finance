import { Shield, Star, Heart, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Combat Black",
    icon: <Star className="size-5" />,
    who: "Combat Veterans Only",
    description:
      "The elite tier. Reserved exclusively for those who saw combat. The highest level of benefits and recognition we offer.",
    perks: [
      "Highest rewards rate",
      "Elite travel benefits",
      "Priority concierge support",
      "Exclusive Combat Black events",
      "Zero annual fee — earned in full",
    ],
    badge: "Most Exclusive",
    badgeColor: "bg-foreground text-background",
    cardStyle: "border-foreground/30 bg-foreground/5",
  },
  {
    name: "Platinum",
    icon: <Shield className="size-5" />,
    who: "All Active Duty & Veterans",
    description:
      "Built for every service member — active duty, reserves, and veterans. Strong benefits, zero cost, full access.",
    perks: [
      "Competitive rewards rate",
      "SCRA interest protections",
      "Annual fee waived",
      "Military travel perks",
      "Access to all Vet Finance content",
    ],
    badge: "Most Popular",
    badgeColor: "bg-primary text-primary-foreground",
    cardStyle: "border-primary/30 bg-primary/5",
  },
  {
    name: "Supporter",
    icon: <Heart className="size-5" />,
    who: "Civilians Who Give Back",
    description:
      "You didn't serve, but you want to support those who did. Your annual fee directly funds veteran perks and keeps education free.",
    perks: [
      "Standard rewards rate",
      "Supporter badge & recognition",
      "Access to Vet Finance community",
      "Annual fee funds veteran benefits",
      '"Thank you for your support" on receipts',
    ],
    badge: "~$100/yr",
    badgeColor: "bg-muted text-muted-foreground",
    cardStyle: "border-border bg-muted/20",
  },
];

export default function CardPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20">

      {/* Header */}
      <div className="mb-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
          <Clock className="size-3.5" />
          <span>Coming Soon</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          The card built for those who served.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          A military credit card line designed from the ground up for veterans
          and active duty — with a way for civilians to support the mission too.
        </p>
      </div>

      {/* Tiers */}
      <div className="mb-20 grid gap-6 sm:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative flex flex-col rounded-xl border p-6 ${tier.cardStyle}`}
          >
            {/* Badge */}
            <div className={`mb-4 self-start rounded-full px-3 py-1 text-xs font-medium ${tier.badgeColor}`}>
              {tier.badge}
            </div>

            {/* Icon + Name */}
            <div className="mb-2 flex items-center gap-2">
              {tier.icon}
              <h2 className="text-lg font-bold text-foreground">{tier.name}</h2>
            </div>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {tier.who}
            </p>
            <p className="mb-6 text-sm text-muted-foreground">{tier.description}</p>

            {/* Perks */}
            <ul className="mt-auto flex flex-col gap-2">
              {tier.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-foreground" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="mb-20 rounded-xl border border-border bg-muted/40 px-6 py-10 text-center">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
          How it works
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="flex flex-col items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-sm font-bold text-foreground">
              1
            </div>
            <p className="font-medium text-foreground">Supporters join</p>
            <p className="text-sm text-muted-foreground">
              Civilians sign up for the Supporter card and pay the annual fee.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-sm font-bold text-foreground">
              2
            </div>
            <p className="font-medium text-foreground">Revenue is pooled</p>
            <p className="text-sm text-muted-foreground">
              Supporter fees, sponsorships, and partners fund the veteran benefit pool.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-sm font-bold text-foreground">
              3
            </div>
            <p className="font-medium text-foreground">Veterans get rewarded</p>
            <p className="text-sm text-muted-foreground">
              Combat Black and Platinum cardholders receive travel perks, gear
              discounts, and more — at no cost.
            </p>
          </div>
        </div>
      </div>

      {/* Waitlist */}
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
          Be first in line.
        </h2>
        <p className="mx-auto mb-8 max-w-md text-muted-foreground">
          The card isn&apos;t live yet — but the mission is. Join the founding
          member waitlist and be notified the moment we launch.
        </p>
        <form className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="h-10 w-full rounded-md border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button type="submit" className="shrink-0">
            Join Waitlist
          </Button>
        </form>
        <p className="mt-4 text-xs text-muted-foreground">
          No spam. Just a heads up when we launch.
        </p>
      </div>

    </div>
  );
}
