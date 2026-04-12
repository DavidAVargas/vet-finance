import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, BookOpen, ChevronRight, CreditCard } from "lucide-react";

const creditBasics = [
  { topic: "Credit Scores", desc: "What they are, how they're calculated, and what's considered good vs. bad." },
  { topic: "Payment History", desc: "The single biggest factor in your score (35%) — and why missing one payment hurts more than you think." },
  { topic: "Hard & Soft Pulls", desc: "The difference between a hard inquiry and a soft pull — and when each one hits your score." },
  { topic: "Hard Inquiries", desc: "How long they stay on your report and how much they actually affect you." },
  { topic: "Credit Age", desc: "Why the age of your accounts matters and how to protect it." },
  { topic: "Credit Utilization", desc: "The ratio that can make or break your score and how to keep it in check." },
  { topic: "Credit Mix", desc: "Why having different types of credit — cards, loans, etc. — works in your favor." },
  { topic: "Derogatory Marks", desc: "Late payments, collections, charge-offs — what they are and how to deal with them." },
  { topic: "The 3 Credit Bureaus", desc: "Equifax, Experian, and TransUnion — why your score differs between them and which one matters most." },
  { topic: "How to Read Your Credit Report", desc: "What's on it, how to get it for free, and what to look for." },
  { topic: "Disputing Errors", desc: "How to fight incorrect information on your report and get it removed." },
  { topic: "Building Credit from Zero", desc: "No credit history? Here's exactly where to start and in what order." },
  { topic: "Authorized User Strategy", desc: "How being added to someone else's card can boost your score fast — and the risks." },
  { topic: "Credit Freeze", desc: "What it is, when to use it, and how it protects you from identity theft." },
  { topic: "More coming...", desc: "We're building out the full curriculum. Sign up to get notified when new lessons drop." },
];

const creditCards = [
  { topic: "How Credit Cards Actually Work", desc: "The basics — billing cycles, statements, due dates, and how interest kicks in." },
  { topic: "APR Explained", desc: "What interest actually costs you in real numbers — not just a percentage on paper." },
  { topic: "The Minimum Payment Trap", desc: "Why paying the minimum is a slow-motion debt spiral and how to avoid it." },
  { topic: "How to Pick Your First Card", desc: "A simple decision framework for beginners — no overwhelm, just the right move." },
  { topic: "Secured Cards", desc: "The best tool for building credit from zero — and how to graduate off them." },
  { topic: "Travel Cards", desc: "Earn points and miles to fly and stay in hotels — the right way." },
  { topic: "Cash Back Cards", desc: "Simple rewards that put money back in your pocket on everyday purchases." },
  { topic: "Sign-Up Bonuses & Welcome Offers", desc: "How to earn them without getting burned by the fine print." },
  { topic: "Annual Fees — Worth It or Not", desc: "How to do the math and know when a fee card actually pays for itself." },
  { topic: "Balance Transfers", desc: "When moving debt to a new card makes sense and when it's just kicking the can." },
  { topic: "Store & Co-Branded Cards", desc: "When they're worth it and when they're a trap." },
  { topic: "Foreign Transaction Fees", desc: "Matters especially for military stationed or deployed overseas — know which cards to carry." },
  { topic: "Authorized Users on Cards", desc: "Adding family members, the impact on their credit, and the pros and cons." },
  { topic: "Military Benefits", desc: "SCRA protections, annual fee waivers, and perks most banks don't advertise loudly enough." },
  { topic: "Card Tiers Explained", desc: "No-fee starter cards all the way up to premium metal cards — and when to upgrade." },
  { topic: "More coming...", desc: "More card topics, advanced strategies, and military-specific guides on the way." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
          <Shield className="size-3.5" />
          <span>Built for those who served</span>
        </div>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Financial freedom,{" "}
          <span className="text-foreground/50">earned and free.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Free credit and finance education for active duty, veterans, and
          military families. Know your benefits. Build your future.
        </p>

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

        <p className="mt-12 text-sm text-muted-foreground">
          Veteran-founded · Free for military · No credit card required
        </p>

        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-border pt-16 sm:grid-cols-3 sm:gap-12">
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold text-foreground">18M+</span>
            <span className="text-sm text-muted-foreground">Veterans in the U.S.</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold text-foreground">100%</span>
            <span className="text-sm text-muted-foreground">Free for military members</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold text-foreground">$0</span>
            <span className="text-sm text-muted-foreground">Cost to get started</span>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="border-t border-border bg-muted/40 px-4 py-24">
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
            <Button size="lg" asChild>
              <Link href="/learn">
                <BookOpen className="size-4" />
                Start Learning — It&apos;s Free
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
