import { Shield, Users, MapPin, Calendar, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const existingMeetups = [
  {
    name: "Black Rifle Coffee",
    description:
      "Saturday meetups happening nationwide at BRC locations. Show up, grab a coffee, meet your people. No sign up, no cost — just veterans being veterans.",
    tag: "All ages · Every Saturday",
  },
  {
    name: "GORUCK Clubs",
    description:
      "Free local ruck clubs across the country. Grab a pack, hit the streets, and suffer together like the old days. Heavily veteran-populated and open to everyone.",
    tag: "All ages · Free to join",
  },
  {
    name: "MilSim West & MilSim East",
    description:
      "Large-scale military simulation events that put you back in the field with your boys. Think airsoft but at a whole different level — tactical, immersive, and a blast.",
    tag: "Younger vets · Tickets ~$50–150",
  },
  {
    name: "Airsoft & Paintball Events",
    description:
      "Local airsoft fields and paintball parks run open play days constantly. Easy to organize a group, low cost, and a great way to get the competitive edge back.",
    tag: "Younger vets · Low cost",
  },
  {
    name: "VFW & American Legion Posts",
    description:
      "Posts in nearly every city in the country. Events, support, and a place to sit down with veterans who have been through it all. A proven foundation.",
    tag: "All ages · Membership based",
  },
  {
    name: "Hunting & Fishing Groups",
    description:
      "Some of the most therapeutic time a veteran can have. Many veteran-specific hunting and fishing organizations operate nationwide and offer free or subsidized trips.",
    tag: "All ages · Varies by org",
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

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20">

      {/* Header */}
      <div className="mb-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
          <Users className="size-3.5" />
          <span>Community</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Find your people again.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          One of the hardest parts of leaving service isn&apos;t the paperwork
          or the transition — it&apos;s losing your unit. The people who had
          your back every day. We want to help you find that again.
        </p>
      </div>

      {/* Honest note */}
      <div className="mb-16 rounded-xl border border-border bg-muted/40 px-6 py-6 text-center">
        <p className="text-sm text-muted-foreground">
          We&apos;re not going to build a fake online forum and call it community.
          Veterans don&apos;t need another feed to scroll — they need real
          people, real places, and real connection. This page is a starting
          point: what already exists, how to find it, and where we&apos;re
          headed as we grow.
        </p>
      </div>

      {/* What already exists */}
      <div className="mb-20">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
          What already exists — go now, free
        </h2>
        <p className="mb-8 text-muted-foreground">
          You don&apos;t need Vet Finance to find your community. These are
          happening right now, in your city, with no funding required.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {existingMeetups.map((meetup) => (
            <div
              key={meetup.name}
              className="flex flex-col gap-2 rounded-xl border border-border bg-muted/20 p-5"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-foreground">{meetup.name}</h3>
                <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {meetup.tag}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{meetup.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* By age group */}
      <div className="mb-20">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
          Something for everyone
        </h2>
        <p className="mb-8 text-muted-foreground">
          Veterans aren&apos;t one size fits all. Here&apos;s what tends to
          resonate at different stages of life after service.
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          {ageGroups.map((group) => (
            <div
              key={group.age}
              className="flex flex-col rounded-xl border border-border bg-muted/20 p-5"
            >
              <p className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {group.age}
              </p>
              <h3 className="mb-4 font-semibold text-foreground">{group.label}</h3>
              <ul className="flex flex-col gap-2">
                {group.activities.map((activity) => (
                  <li key={activity} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="size-1.5 shrink-0 rounded-full bg-foreground/40" />
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Future vision */}
      <div className="mb-20 rounded-xl border border-border bg-muted/40 px-6 py-10">
        <div className="mb-6 flex items-center gap-2">
          <Calendar className="size-5 text-foreground" />
          <h2 className="text-xl font-bold text-foreground">Where we&apos;re headed</h2>
        </div>
        <div className="flex flex-col gap-4 text-sm text-muted-foreground">
          <p>
            As Vet Finance grows, the goal is to go from pointing veterans to
            existing events — to actually organizing and sponsoring our own.
          </p>
          <ul className="flex flex-col gap-3 pl-2">
            <li className="flex items-start gap-2">
              <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/40" />
              <span>Vet Finance x Black Rifle Coffee meetup series in major cities</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/40" />
              <span>Sponsored MilSim and airsoft events with Vet Finance branding</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/40" />
              <span>Annual summit — finance workshops in the morning, range day in the afternoon</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/40" />
              <span>Mentorship program pairing younger vets with older ones who&apos;ve figured it out</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/40" />
              <span>Partner with GORUCK for branded rucks supporting the mission</span>
            </li>
          </ul>
          <p className="font-medium text-foreground">
            None of this requires a big budget to start — just people who care
            showing up for each other.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <Heart className="size-6 text-foreground" />
        </div>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
          Want events in your city?
        </h2>
        <p className="mx-auto mb-8 max-w-md text-muted-foreground">
          Tell us where you are. As we grow, your city is where we want to
          show up first.
        </p>
        <form className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Your email"
            className="h-10 w-full rounded-md border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button type="submit" className="shrink-0">
            <MapPin className="size-4" />
            I&apos;m in
          </Button>
        </form>
        <p className="mt-4 text-xs text-muted-foreground">
          No spam. Just updates on events near you.
        </p>
      </div>

    </div>
  );
}
