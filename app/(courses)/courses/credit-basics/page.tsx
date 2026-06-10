"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  Clock,
  ChevronDown,
  ChevronRight,
  Lock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const sections = [
  { id: "why-this-matters", number: "01", title: "Why This Matters" },
  { id: "what-is-credit", number: "02", title: "What Is Credit?" },
  { id: "five-factors", number: "03", title: "The 5 Factors of Your Score" },
  { id: "how-cards-work", number: "04", title: "How Credit Cards Work" },
  { id: "military-benefits", number: "05", title: "Military Benefits You're Owed" },
  { id: "common-mistakes", number: "06", title: "Common Mistakes to Avoid" },
  { id: "building-from-zero", number: "07", title: "Building From Zero" },
];

export default function CreditBasicsPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("why-this-matters");
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-20% 0px -70% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setTocOpen(false);
  };

  return (
    <>
      {/* Reading progress bar */}
      <div
        className="fixed left-0 top-0 z-50 h-[3px] transition-[width] duration-75"
        style={{
          width: `${scrollProgress}%`,
          background: "var(--brand-600)",
        }}
      />

      <div className="mx-auto max-w-5xl px-4 py-12">

        {/* Breadcrumb */}
        <nav className="mb-10 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/learn" className="transition-colors hover:text-foreground">
            Learn
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground">Credit Basics</span>
        </nav>

        {/* Page header */}
        <div className="mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
            <BookOpen className="size-3.5" />
            <span>Credit Basics</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Everything you need to know about credit.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            No jargon. No fluff. The real knowledge you need to understand,
            build, and protect your credit — starting today.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              ~20 min read
            </span>
            <span className="size-1 rounded-full bg-border" />
            <span>7 sections</span>
            <span className="size-1 rounded-full bg-border" />
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
              Free
            </span>
          </div>
        </div>

        {/* Mobile TOC accordion */}
        <div className="mb-10 rounded-xl border border-border bg-muted/30 lg:hidden">
          <button
            onClick={() => setTocOpen(!tocOpen)}
            className="flex w-full items-center justify-between px-4 py-3.5 text-sm font-medium text-foreground"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="size-4 text-muted-foreground" />
              In this course — 7 sections
            </span>
            <ChevronDown
              className={`size-4 text-muted-foreground transition-transform duration-200 ${tocOpen ? "rotate-180" : ""}`}
            />
          </button>
          {tocOpen && (
            <div className="border-t border-border px-2 pb-2 pt-1">
              {sections.map(({ id, number, title }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <span className="font-mono text-xs opacity-50">{number}</span>
                  {title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Two-column layout */}
        <div className="flex gap-14">

          {/* Sidebar — desktop only */}
          <aside className="hidden w-[210px] shrink-0 lg:block">
            <div className="sticky top-8">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                In this course
              </p>
              <nav className="flex flex-col">
                {sections.map(({ id, number, title }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`flex items-start gap-2.5 border-l-2 px-3 py-2 text-left text-sm transition-all duration-150 ${
                      activeSection === id
                        ? "font-medium text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    style={{
                      borderLeftColor:
                        activeSection === id
                          ? "var(--brand-600)"
                          : "transparent",
                    }}
                  >
                    <span className="mt-px shrink-0 font-mono text-[11px] opacity-40">
                      {number}
                    </span>
                    <span className="leading-snug">{title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="min-w-0 flex-1">

            {/* Section 01 — Personal Story */}
            <section id="why-this-matters" className="mb-16 scroll-mt-8">
              <p className="mb-2 font-mono text-xs text-muted-foreground/50">01</p>
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
                Why This Matters
              </h2>
              <div
                className="mb-6 rounded-r-lg bg-muted/40 p-5"
                style={{ borderLeft: "2px solid var(--brand-600)" }}
              >
                <p className="italic leading-relaxed text-muted-foreground">
                  [Your personal story goes here — a real moment where financial
                  knowledge, or the lack of it, changed something for you. This
                  is the hook that makes everything else land differently.]
                </p>
              </div>
              <p className="leading-relaxed text-muted-foreground">
                This is placeholder body text for the section intro. The
                personal story will set the tone for the entire course —
                authentic, direct, and grounded in real experience rather than
                textbook theory.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Everything in this course is built around one idea: you
                don&apos;t need a finance degree, you just need the right
                information explained clearly. Let&apos;s get into it.
              </p>
            </section>

            <div className="mb-16 border-t border-border" />

            {/* Section 02 */}
            <section id="what-is-credit" className="mb-16 scroll-mt-8">
              <p className="mb-2 font-mono text-xs text-muted-foreground/50">02</p>
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
                What Is Credit?
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Placeholder section body. This section will explain what credit
                is at its core — a trust system between you and lenders — and
                why it affects far more than just loans.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Credit touches your ability to rent an apartment, get a phone
                plan, buy a car, and sometimes even get a job. Understanding
                what it is and how it works is the foundation everything else
                builds on.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                More placeholder content. This will cover the three credit
                bureaus, what a credit report contains, and the difference
                between a credit report and a credit score.
              </p>
            </section>

            <div className="mb-16 border-t border-border" />

            {/* Section 03 */}
            <section id="five-factors" className="mb-16 scroll-mt-8">
              <p className="mb-2 font-mono text-xs text-muted-foreground/50">03</p>
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
                The 5 Factors of Your Score
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Your credit score isn&apos;t random — it&apos;s calculated from
                five specific factors. This section breaks down each one, how
                much it counts, and what you can actually do to move the needle.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Payment history, amounts owed, length of credit history, new
                credit, and credit mix. Knowing the weight of each one changes
                how you make decisions. Full breakdown coming here.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Placeholder for visual breakdown of score factors — a simple
                percentage breakdown showing each factor&apos;s weight and what
                actions move it up or down.
              </p>
            </section>

            <div className="mb-16 border-t border-border" />

            {/* Section 04 */}
            <section id="how-cards-work" className="mb-16 scroll-mt-8">
              <p className="mb-2 font-mono text-xs text-muted-foreground/50">04</p>
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
                How Credit Cards Work
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Most people think of credit cards as a way to spend money they
                don&apos;t have. That&apos;s the wrong mental model. This
                section reframes cards as a tool — one that, used right, builds
                your score and earns you rewards.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                How billing cycles work, what APR actually means in real
                dollars, why paying in full matters, and how utilization ties
                directly back to your score.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Placeholder for content on statement balance vs. current
                balance, and why the timing of your payments matters more than
                most people realize.
              </p>
            </section>

            <div className="mb-16 border-t border-border" />

            {/* Section 05 */}
            <section id="military-benefits" className="mb-16 scroll-mt-8">
              <p className="mb-2 font-mono text-xs text-muted-foreground/50">05</p>
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
                Military Benefits You&apos;re Owed
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                There are financial protections and perks that exist
                specifically for service members — and most don&apos;t know
                about them. SCRA caps your interest rates at 6% on pre-service
                debt. Premium credit cards waive annual fees entirely for active
                duty.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                This section covers what you&apos;re actually entitled to and
                how to claim it. These aren&apos;t small perks — on the right
                card, you&apos;re looking at $500+ in annual fees waived every
                year.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Placeholder for a list of specific cards and the SCRA/MLA
                request process explained step by step.
              </p>
            </section>

            <div className="mb-16 border-t border-border" />

            {/* Section 06 */}
            <section id="common-mistakes" className="mb-16 scroll-mt-8">
              <p className="mb-2 font-mono text-xs text-muted-foreground/50">06</p>
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
                Common Mistakes to Avoid
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Most credit damage is avoidable once you know what causes it.
                This section covers the mistakes that hurt people most —
                closing old accounts, applying for too many cards at once,
                ignoring collections, and more.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Some of these are counterintuitive. Closing a card to
                &quot;simplify&quot; your finances can actually drop your score.
                Understanding the why behind each mistake makes it easy to
                avoid.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Placeholder for mistake list with brief explanation of each
                one and what to do instead.
              </p>
            </section>

            <div className="mb-16 border-t border-border" />

            {/* Section 07 */}
            <section id="building-from-zero" className="mb-16 scroll-mt-8">
              <p className="mb-2 font-mono text-xs text-muted-foreground/50">07</p>
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
                Building From Zero
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                No credit history isn&apos;t the same as bad credit — but it
                can feel just as limiting. This section is a practical playbook
                for getting started from scratch: secured cards, credit-builder
                loans, and becoming an authorized user.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                The timeline is real — you can have a solid credit profile in
                12–18 months if you&apos;re consistent. This section lays out
                exactly what to do and in what order.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Placeholder for step-by-step starter roadmap with specific
                product recommendations.
              </p>
            </section>

            <div className="mb-16 border-t border-border" />

            {/* Quiz placeholder */}
            <div className="mb-16 rounded-xl border border-dashed border-border p-10 text-center">
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full border border-border bg-muted">
                <Lock className="size-5 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">
                Knowledge Check
              </h3>
              <p className="mx-auto mb-6 max-w-sm text-sm text-muted-foreground">
                Quiz coming soon — this will test what you learned in Credit
                Basics so you know exactly where you stand.
              </p>
              <Button variant="outline" disabled className="opacity-50">
                Start Quiz
              </Button>
            </div>

            {/* Bottom navigation */}
            <div className="flex items-center justify-end border-t border-border pt-8">
              <Link
                href="/learn"
                className="group flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Next: Credit Cards 101
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/learn"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                ← Back to Learn
              </Link>
            </div>

          </main>
        </div>
      </div>
    </>
  );
}
