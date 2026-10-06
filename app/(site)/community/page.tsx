import { Backpack, Check, Coffee, Crosshair, Fish, Landmark, MapPin, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const existingMeetups = [
  {
    icon: Coffee,
    name: "Black Rifle Coffee",
    description:
      "Saturday meetups happening nationwide at BRC locations. Show up, grab a coffee, meet your people. No sign up, no cost, just veterans being veterans.",
    tags: ["All ages", "Every Saturday"],
  },
  {
    icon: Backpack,
    name: "GORUCK Clubs",
    description:
      "Free local ruck clubs across the country. Grab a pack, hit the streets, and suffer together like the old days. Heavily veteran-populated and open to everyone.",
    tags: ["All ages", "Free to join"],
  },
  {
    icon: Crosshair,
    name: "MilSim West & MilSim East",
    description:
      "Large-scale military simulation events that put you back in the field with your boys. Think airsoft, but at a whole different level: tactical, immersive, and a blast.",
    tags: ["Younger vets", "Tickets ~$50–150"],
  },
  {
    icon: Target,
    name: "Airsoft & Paintball Events",
    description:
      "Local airsoft fields and paintball parks run open play days constantly. Easy to organize a group, low cost, and a great way to get the competitive edge back.",
    tags: ["Younger vets", "Low cost"],
  },
  {
    icon: Landmark,
    name: "VFW & American Legion Posts",
    description:
      "Posts in nearly every city in the country. Events, support, and a place to sit down with veterans who have been through it all. A proven foundation.",
    tags: ["All ages", "Membership based"],
  },
  {
    icon: Fish,
    name: "Hunting & Fishing Groups",
    description:
      "Some of the most therapeutic time a veteran can have. Many veteran-specific hunting and fishing organizations operate nationwide and offer free or subsidized trips.",
    tags: ["All ages", "Varies by org"],
  },
];

const ageGroups = [
  {
    age: "20s – 30s",
    label: "Just got out",
    activities: [
      "Airsoft & MilSim events",
      "Shooting range days",
      "GORUCK rucking clubs",
      "Gaming nights",
      "Rec sports leagues",
      "Hiking & camping trips",
    ],
  },
  {
    age: "30s – 40s",
    label: "Settled in, still active",
    activities: [
      "Golf outings",
      "Hunting & fishing trips",
      "BBQs & cookouts",
      "Motorcycle rides",
      "Home skills swap",
      "Financial literacy workshops",
    ],
  },
  {
    age: "50s+",
    label: "The OGs",
    activities: [
      "VFW & American Legion events",
      "Fishing tournaments",
      "Memorial & history events",
      "Mentoring younger vets",
      "Volunteer days",
      "Community leadership",
    ],
  },
];

const plans = [
  "Vet Finance x Black Rifle Coffee meetup series in major cities",
  "Sponsored MilSim and airsoft events with Vet Finance branding",
  "Annual summit: finance workshops in the morning, range day in the afternoon",
  "Mentorship program pairing younger vets with older ones who've figured it out",
  "Partner with GORUCK for branded rucks supporting the mission",
];

export default function CommunityPage() {
  return (
    <>
      {/* Intro */}
      <section className="bg-card">
        <div className="mx-auto flex max-w-site flex-col gap-10 px-4 pt-16 pb-16 sm:px-6 lg:flex-row lg:items-center lg:gap-20 lg:pt-20 lg:pb-20">
          <div className="flex-[1.2]">
            <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">Community</p>
            <h1 className="mt-5 text-4xl leading-[1.08] font-extrabold tracking-[-0.03em] text-navy sm:text-[2.75rem] lg:text-5xl">
              Find your people again.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              One of the hardest parts of leaving service isn&apos;t the
              paperwork or the transition. It&apos;s losing your unit, the
              people who had your back every day. We want to help you find that
              again.
            </p>
          </div>

          <figure className="flex-1 rounded-2xl bg-navy-deep p-8 text-white sm:p-9">
            <p className="text-xs font-semibold tracking-[0.14em] text-brass uppercase">Our approach</p>
            <blockquote className="mt-4 text-[17px] leading-relaxed text-[#d5dce7]">
              We&apos;re not going to build a fake online forum and call it
              community. Veterans don&apos;t need another feed to scroll. They
              need{" "}
              <span className="font-semibold text-white">
                real people, real places, and real connection.
              </span>
            </blockquote>
            <figcaption className="mt-6 border-t border-white/15 pt-5 text-sm text-[#9aa5b8]">
              This page is a starting point: what already exists, how to find
              it, and where we&apos;re headed as we grow.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* What already exists */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-site px-4 py-16 sm:px-6 lg:py-20">
          <p className="text-sm font-semibold tracking-[0.14em] text-[#7a5a22] uppercase">Go now, free</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] text-navy sm:text-4xl">
            What already exists
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] text-muted-foreground">
            You don&apos;t need Vet Finance to find your community. These are
            happening right now, in your city, with no funding required.
          </p>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {existingMeetups.map(({ icon: Icon, name, description, tags }) => (
              <li key={name} className="flex flex-col rounded-2xl border border-border bg-card p-7">
                <div className="flex size-12 items-center justify-center rounded-[14px] bg-secondary">
                  <Icon className="size-[22px] text-navy" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-navy">{name}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted-foreground">{description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* By age group */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-site px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-navy sm:text-4xl">Something for everyone</h2>
          <p className="mt-4 max-w-2xl text-[17px] text-muted-foreground">
            Veterans aren&apos;t one size fits all. Here&apos;s what tends to
            resonate at different stages of life after service.
          </p>

          <ul className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
            {ageGroups.map((group) => (
              <li key={group.age} className="border-t-[3px] border-navy pt-6">
                <p className="text-3xl font-extrabold tracking-[-0.02em] text-navy">{group.age}</p>
                <p className="mt-1 font-semibold text-muted-foreground">{group.label}</p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {group.activities.map((activity) => (
                    <li key={activity} className="flex items-start gap-2.5 text-[15px] text-foreground/80">
                      <Check className="mt-0.5 size-4 shrink-0 text-navy" strokeWidth={2.4} aria-hidden="true" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Where we're headed */}
      <section className="bg-navy text-white">
        <div className="mx-auto grid max-w-site gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:py-20">
          <div>
            <p className="text-sm font-semibold tracking-[0.14em] text-brass uppercase">Where we&apos;re headed</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
              From pointing the way to showing up.
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-[#c9d2e0]">
              As Vet Finance grows, the goal is to go from pointing veterans to
              existing events to actually organizing and sponsoring our own.
            </p>
            <p className="mt-6 font-semibold text-white">
              None of this requires a big budget to start, just people who care
              showing up for each other.
            </p>
          </div>

          <ol className="flex flex-col">
            {plans.map((plan, i) => (
              <li key={plan} className="flex gap-5 border-t border-white/12 py-5 last:border-b">
                <span className="w-6 shrink-0 text-sm font-bold text-brass tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[16px] leading-relaxed text-[#e1e7f0]">{plan}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-card">
        <div className="mx-auto max-w-site px-4 py-16 text-center sm:px-6 lg:py-20">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-secondary">
            <MapPin className="size-[22px] text-navy" strokeWidth={1.8} aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-3xl font-extrabold tracking-[-0.03em] text-navy sm:text-4xl">
            Want events in your city?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] text-muted-foreground">
            Tell us where you are. As we grow, your city is where we want to
            show up first.
          </p>
          <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <label htmlFor="community-email" className="sr-only">Email address</label>
            <input
              id="community-email"
              type="email"
              placeholder="Your email"
              className="h-12 w-full rounded-full border border-input bg-background px-5 text-[15px] text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none"
            />
            <Button type="submit" size="lg" className="h-12 shrink-0 rounded-full px-7 text-base font-semibold">
              I&apos;m in
            </Button>
          </form>
          <p className="mt-4 text-sm text-muted-foreground">No spam. Just updates on events near you.</p>
        </div>
      </section>
    </>
  );
}
