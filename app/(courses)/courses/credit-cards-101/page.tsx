"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Lock,
  CheckCircle2,
  Circle,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/DarkLightMode/theme-toggle";
import Link from "next/link";
import Image from "next/image";

// ─── Mock user ───────────────────────────────────────────────────────────────

const mockUser = { name: "David", rank: "Veteran" };

// ─── Course structure ─────────────────────────────────────────────────────────
// noQuiz: true  = completing all lessons auto-unlocks next section
// noQuiz: false = must pass quiz to unlock next section

const SECTIONS = [
  {
    id: "my-cc-story",
    title: "My Credit Card Story",
    noQuiz: true,
    lessons: [
      { id: "mcs-1", title: "How I Got Started" },
      { id: "mcs-2", title: "What I Learned the Hard Way" },
    ],
  },
  {
    id: "how-credit-cards-work",
    title: "How Credit Cards Work",
    noQuiz: false,
    lessons: [
      { id: "ccw-1", title: "What a Credit Card Actually Is" },
      { id: "ccw-2", title: "Annual Fees — When They're Worth It" },
      { id: "ccw-3", title: "APR and Interest" },
      { id: "ccw-quiz", title: "Quiz", isQuiz: true },
    ],
  },
  {
    id: "power-of-points",
    title: "The Power of Points",
    noQuiz: false,
    lessons: [
      { id: "pop-1", title: "Why Points Beat Cash" },
      { id: "pop-2", title: "How to Actually Use Your Points" },
      { id: "pop-3", title: "Keeping Track" },
      { id: "pop-quiz", title: "Quiz", isQuiz: true },
    ],
  },
  {
    id: "building-your-stack",
    title: "Building Your Card Stack",
    noQuiz: false,
    lessons: [
      { id: "bcs-1", title: "Why You Want 5+ Cards Eventually" },
      { id: "bcs-2", title: "A Card for Everything" },
      { id: "bcs-3", title: "Military Benefits" },
      { id: "bcs-quiz", title: "Quiz", isQuiz: true },
    ],
  },
  {
    id: "find-your-start",
    title: "Find Your Starting Point",
    noQuiz: true,
    lessons: [
      { id: "fysp-1", title: "No Credit History? Start Here" },
      { id: "fysp-2", title: "Already Have Cards? Level Up" },
      { id: "fysp-rec", title: "Find Your Card" },
    ],
  },
];

// ─── Quiz component ──────────────────────────────────────────────────────────

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

function QuizBlock({ sectionLabel, questions, onPass }: {
  sectionLabel: string;
  questions: QuizQuestion[];
  onPass?: () => void;
}) {
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [passed, setPassed] = useState(false);

  const allAnswered = questions.every((_, i) => selected[i] !== undefined);
  const score = questions.filter((q, i) => selected[i] === q.correct).length;
  const passThreshold = Math.ceil(questions.length * (2 / 3));

  const handleSubmit = () => {
    const didPass = score >= passThreshold;
    setSubmitted(true);
    setPassed(didPass);
    if (didPass) onPass?.();
  };

  const handleRetry = () => {
    setSelected({});
    setSubmitted(false);
    setPassed(false);
  };

  return (
    <div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {sectionLabel} · Quiz
      </p>
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
        Knowledge Check
      </h1>
      <p className="mb-8 text-base text-muted-foreground">
        Answer all questions to unlock the next section. You need {passThreshold} out of {questions.length} to pass.
      </p>

      <div className="flex flex-col gap-8">
        {questions.map((q, qi) => {
          const isCorrect = submitted && selected[qi] === q.correct;

          return (
            <div key={qi}>
              <p className="mb-3 font-semibold text-foreground">
                <span className="mr-2 font-mono text-xs text-muted-foreground/60">{qi + 1}.</span>
                {q.question}
              </p>
              <div className="flex flex-col gap-2">
                {q.options.map((opt, oi) => {
                  const isSelected = selected[qi] === oi;
                  const isCorrectOption = submitted && oi === q.correct;
                  const isWrongSelected = submitted && isSelected && oi !== q.correct;

                  return (
                    <button
                      key={oi}
                      disabled={submitted}
                      onClick={() => !submitted && setSelected((prev) => ({ ...prev, [qi]: oi }))}
                      className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                        isCorrectOption
                          ? "border-green-500 bg-green-500/10 text-foreground"
                          : isWrongSelected
                          ? "border-red-400 bg-red-400/10 text-foreground"
                          : isSelected
                          ? "border-foreground bg-muted text-foreground"
                          : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                      } ${submitted ? "cursor-default" : "cursor-pointer"}`}
                    >
                      <span className={`flex size-5 shrink-0 items-center justify-center rounded-full border text-xs font-medium ${
                        isCorrectOption
                          ? "border-green-500 bg-green-500 text-white"
                          : isWrongSelected
                          ? "border-red-400 bg-red-400 text-white"
                          : isSelected
                          ? "border-foreground bg-foreground text-background"
                          : "border-border"
                      }`}>
                        {isCorrectOption ? "✓" : isWrongSelected ? "✗" : String.fromCharCode(65 + oi)}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <p className={`mt-3 rounded-lg px-3 py-2 text-sm ${isCorrect ? "bg-green-500/10 text-green-700 dark:text-green-400" : "bg-muted text-muted-foreground"}`}>
                  {q.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {submitted ? (
        <div className={`mt-8 rounded-xl border p-5 text-center ${passed ? "border-green-500 bg-green-500/10" : "border-border bg-muted/30"}`}>
          {passed ? (
            <>
              <p className="text-lg font-bold text-foreground">You passed! {score}/{questions.length} correct.</p>
              <p className="mt-1 text-sm text-muted-foreground">The next section is now unlocked.</p>
            </>
          ) : (
            <>
              <p className="text-lg font-bold text-foreground">{score}/{questions.length} correct — not quite.</p>
              <p className="mt-1 mb-4 text-sm text-muted-foreground">Review the lessons above and try again.</p>
              <Button size="sm" variant="outline" onClick={handleRetry}>Try Again</Button>
            </>
          )}
        </div>
      ) : (
        <Button
          className="mt-8"
          disabled={!allAnswered}
          onClick={handleSubmit}
          style={allAnswered ? { background: "var(--brand-600)", color: "white" } : {}}
        >
          Submit Answers
        </Button>
      )}
    </div>
  );
}

// ─── Lesson content ───────────────────────────────────────────────────────────

function LessonContent({
  lessonId,
  onQuizPass,
}: {
  lessonId: string;
  onQuizPass?: () => void;
}) {
  switch (lessonId) {
    case "mcs-1":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            My Credit Card Story · Lesson 1
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            How I Got Started
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            My first credit card wasn&apos;t something I planned. I was at the mall
            and they did what they always do — offered me a discount if I
            signed up for their store card. I didn&apos;t know anything about credit
            at the time. I just wanted the discount. I applied, got accepted,
            and that was it. That store card was my first piece of credit.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            The lucky part was my mom. She always told me to be careful with
            credit cards — don&apos;t spend what you don&apos;t have, don&apos;t max it out.
            I didn&apos;t fully understand why at the time, but I listened. I never
            maxed it out. I kept the balance low, paid it off, and that card
            quietly started building my credit without me even realizing it.
          </p>

          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            I actually think I had that store card before I even had a bank
            account. I&apos;m not 100% sure, but I remember opening my bank account
            sometime around then and waiting a bit. Then I walked into my bank
            and applied for my first real bank credit card. No annual fee. Got
            accepted. Those two cards — the store card and the bank card — were
            all I had for a few years.
          </p>

          <div className="mb-8 rounded-xl border-l-2 bg-muted/40 p-5" style={{ borderColor: "var(--brand-600)" }}>
            <p className="mb-1 text-sm font-semibold text-foreground">The store card: was it a good move?</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Honestly? I got lucky. The card I got happens to be accepted
              basically everywhere across the US so it&apos;s still useful to me
              today. But I wouldn&apos;t recommend a store card to most people unless
              you actually shop there regularly and plan to keep shopping there.
              A lot of store cards only work at that one store — and if you stop
              going, the card just sits there aging which is actually good for
              your credit age but you got into it for the wrong reasons.
            </p>
          </div>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            The most important thing I did without knowing it was choosing
            cards with no annual fee. That mattered more than I realized at
            the time. A no-annual-fee card costs you nothing to keep open
            forever — which means your credit age keeps growing and you never
            have to think about whether it&apos;s worth keeping.
          </p>

          <p className="text-base leading-relaxed text-muted-foreground">
            That&apos;s how it started. Not some big plan. A mall discount, a
            mom&apos;s advice, and two simple cards. In the next lesson I&apos;ll tell
            you what happened after — including what I did wrong.
          </p>
        </div>
      );

    case "mcs-2":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            My Credit Card Story · Lesson 2
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            What I Learned the Hard Way
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            A few years into having those two cards, I applied for another
            one. This time I got approved for a $5,000 limit on the first
            application — which at a young age felt like a big deal. Looking
            back, I think that happened because I already had a couple years of
            clean credit history. I never maxed anything out, always paid, and
            lenders saw that.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            But I still didn&apos;t really know what I was doing with credit cards.
            I&apos;d use the card here and there, pay it off, never came close to
            the full limit. Just having that credit history quietly working for
            me. From there I started getting credit limit increases, got a
            couple more cards, and slowly started to learn more about how it
            all worked.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Then life happened. Like most people, there were times I thought
            I had more room than I did. Used the card expecting money that
            didn&apos;t come. Missed a payment here and there. And eventually —
            the same situation I talked about in Credit Basics — the car
            accident, the surgery, time off work. That&apos;s when things really
            fell apart. Cards got maxed out. My score dropped. That&apos;s the
            moment I stopped treating credit like something that just happened
            in the background and started taking it seriously.
          </p>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-2 font-semibold text-foreground">What I&apos;d tell someone just starting out</p>
            <div className="flex flex-col gap-3">
              {[
                "Your first card should have no annual fee — always. Not 'free for the first year.' Free forever. Get the hang of things before you start paying for premium cards.",
                "Watch for the trap: some cards advertise no annual fee for year one, then charge $90 or more starting year two. Read the terms before you apply.",
                "Any card that gets you started is better than no card if you have zero credit. The goal in the beginning is just to build history. The card you get later is what matters more.",
                "Store cards are fine if you actually shop there. But don't get one just for a one-time discount. Think about whether you'll still be going there in 5 years.",
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: "var(--brand-600)" }}>
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">
            The point of this course isn&apos;t to scare you away from credit
            cards. It&apos;s the opposite — a credit card used the right way is one
            of the most powerful financial tools you have. It builds your
            score, earns you rewards, gives you protection on purchases, and
            costs you nothing if you use it correctly. The rest of this course
            is about how to actually do that.
          </p>
        </div>
      );

    case "ccw-1":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            How Credit Cards Work · Lesson 1
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            What a Credit Card Actually Is
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            A credit card is borrowed money. That&apos;s it. The bank is letting you
            spend their money with the expectation that you&apos;ll pay it back.
            The difference between a credit card and a loan is that if you pay
            it back within the billing cycle — you pay nothing for that
            borrowing. Zero. That&apos;s the opportunity most people miss.
          </p>

          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            Used correctly, a credit card is the only financial product where
            someone lets you borrow money for free, build your credit score,
            and earn rewards on top of it. But that only works if you
            understand how the cycle actually works.
          </p>

          <p className="mb-4 text-base font-semibold text-foreground">How the billing cycle works:</p>
          <div className="mb-8 flex flex-col gap-3">
            {[
              {
                step: "1",
                title: "The billing cycle",
                body: "Your card has a billing cycle — usually about 30 days. Every purchase you make during that period gets added to your balance.",
              },
              {
                step: "2",
                title: "Statement closes",
                body: "At the end of the cycle your statement closes. This is when your balance gets reported to the credit bureaus. That's why keeping your balance low before this date matters for your utilization.",
              },
              {
                step: "3",
                title: "Due date",
                body: "About 21–25 days after your statement closes, your payment is due. If you pay the full statement balance by this date, you owe zero interest. That window between statement close and due date is called the grace period.",
              },
              {
                step: "4",
                title: "If you don't pay in full",
                body: "Any balance left after the due date starts accruing interest at your APR. This is where the card stops working for you and starts working against you.",
              },
            ].map(({ step, title, body }) => (
              <div key={step} className="flex gap-4 rounded-xl border border-border p-4">
                <div
                  className="flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ background: "var(--brand-600)" }}
                >
                  {step}
                </div>
                <div>
                  <p className="mb-1 text-sm font-semibold text-foreground">{title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CC vs Debit side-by-side */}
          <div className="mb-8">
            <p className="mb-4 font-semibold text-foreground">Credit card vs. debit card</p>
            <div className="overflow-hidden rounded-xl border border-border">
              {/* Column headers */}
              <div className="grid grid-cols-[1.1fr_1fr_1fr]">
                <div className="border-b border-r border-border bg-muted/40 p-3" />
                <div className="border-b border-r border-border p-3 text-center" style={{ background: "var(--brand-600)" }}>
                  <p className="text-xs font-bold uppercase tracking-wider text-white">Credit Card</p>
                </div>
                <div className="border-b border-border bg-muted/40 p-3 text-center">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Debit Card</p>
                </div>
              </div>

              {/* Rows */}
              {[
                {
                  label: "Fraud protection",
                  cc: { text: "Bank investigates. You get your money back if it's real fraud — and you're never out of pocket during the investigation.", good: true },
                  dc: { text: "Money is gone the moment fraud happens. You have to fight to get it back — and often you can't.", good: false },
                },
                {
                  label: "Credit building",
                  cc: { text: "Every on-time payment is reported to all 3 bureaus. This is how you build your score over time.", good: true },
                  dc: { text: "Never reported to credit bureaus. Using a debit card your whole life does zero for your credit score.", good: false },
                },
                {
                  label: "Rewards",
                  cc: { text: "Cash back, points, and miles on every single purchase. Spend money you'd spend anyway — get rewarded for it.", good: true },
                  dc: { text: "Almost none. Most debit cards offer nothing back on your spending.", good: false },
                },
                {
                  label: "Misuse risk",
                  cc: { text: "If you carry a balance, interest compounds fast. This is the only real danger — and it's fully avoidable.", good: false },
                  dc: { text: "Overdraft fees if you spend more than you have — but no debt spiral since you can't borrow.", good: true },
                },
              ].map(({ label, cc, dc }, i) => (
                <div key={label} className={`grid grid-cols-[1.1fr_1fr_1fr] ${i < 3 ? "border-b border-border" : ""}`}>
                  <div className="border-r border-border bg-muted/20 p-3">
                    <p className="text-xs font-semibold text-foreground">{label}</p>
                  </div>
                  <div className="border-r border-border p-3" style={{ background: "var(--brand-600)10" }}>
                    <p className={`text-xs leading-relaxed ${cc.good ? "text-green-600 dark:text-green-400 font-medium" : "text-red-500 dark:text-red-400"}`}>
                      {cc.text}
                    </p>
                  </div>
                  <div className="bg-muted/10 p-3">
                    <p className={`text-xs leading-relaxed ${dc.good ? "text-green-600 dark:text-green-400 font-medium" : "text-red-500 dark:text-red-400"}`}>
                      {dc.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Three major pros vs. one avoidable con. The credit card wins every time — as long as you pay in full.
            </p>
          </div>

          <div className="rounded-xl p-5 text-white" style={{ background: "var(--brand-600)" }}>
            <p className="mb-1 font-bold">The rule that makes all of this work</p>
            <p className="text-sm leading-relaxed text-white/85">
              Use your credit card like a debit card. Only spend money that&apos;s
              already sitting in your bank account. If you wouldn&apos;t buy it with
              cash, don&apos;t put it on the card. This one rule makes the grace
              period work in your favor every single month — you borrow for
              free, earn rewards, and never pay a dollar in interest.
            </p>
          </div>
        </div>
      );

    case "ccw-2":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            How Credit Cards Work · Lesson 2
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            Annual Fees — When They&apos;re Worth It
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            An annual fee is what some credit cards charge you once a year
            just to keep the card open. It can range from $95 to $895. Most
            people hear "annual fee" and think it sounds like a bad deal. But
            here&apos;s the thing — the right card with an annual fee can actually
            pay you far more than it costs. The wrong card with an annual fee
            is just money wasted.
          </p>

          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            Knowing the difference is what separates someone who uses credit
            cards well from someone who just pays for the privilege of having one.
          </p>

          <div className="mb-8 flex flex-col gap-4">
            <div className="rounded-xl border border-border p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-bold text-foreground">No annual fee cards</p>
                <span className="rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-600">Best to start</span>
              </div>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                These cards cost you nothing to keep open. That makes them
                perfect for your first cards — and for keeping long term to
                help your credit age. Even if you stop using a no-fee card,
                you can leave it open forever without losing anything. The
                age of that account keeps working for your score.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Most starter cards, student cards, and basic cash back cards
                fall into this category. This is where everyone should begin.
              </p>
            </div>

            <div className="rounded-xl border border-border p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-bold text-foreground">Annual fee cards</p>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">Once you know what you&apos;re doing</span>
              </div>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                These cards charge you yearly but give back more than they take
                — through travel credits, points multipliers, lounge access,
                or statement credits. The math has to work in your favor. If
                you&apos;re not using the benefits, you&apos;re just paying for a card.
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { card: "Chase Sapphire Preferred", fee: "$95/yr", value: "$200+ in travel value if you use the points right" },
                  { card: "Chase Sapphire Reserve", fee: "$795/yr", value: "$300 travel credit + lounge access + 3x points on travel and dining — worth it if you travel regularly" },
                  { card: "Amex Platinum", fee: "$895/yr", value: "$1,500+ in credits if you use every benefit — lounge access, airline credit, hotel status, and more" },
                ].map(({ card, fee, value }) => (
                  <div key={card} className="rounded-lg bg-muted/40 p-3">
                    <div className="mb-1 flex items-center justify-between">
                      <p className="text-sm font-semibold text-foreground">{card}</p>
                      <span className="text-xs text-muted-foreground">{fee}</span>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-bold text-foreground">Match the card to your lifestyle — not the hype</p>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              The dollar math only tells half the story. A $895 annual fee card
              might technically offer $1,500 in credits — but if half those
              credits are for things you&apos;d never buy anyway, you&apos;re not getting
              $1,500 back. You&apos;re getting whatever you actually use.
            </p>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              Take the Amex Platinum. It&apos;s often called the ultimate luxury card
              — and it can be, if you travel constantly, shop at certain stores,
              and use every single perk. But a lot of those credits are for
              specific brands: Lululemon, SoulCycle, Equinox. If none of that
              fits your life, you&apos;re paying $895 for a card that doesn&apos;t really
              serve you.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The Chase Sapphire Reserve at $795/yr has a simpler value prop:
              $300 back on travel, lounge access, and strong points on dining
              and travel. If you travel even a few times a year and eat out
              regularly, the math is almost automatic. That&apos;s why it fits more
              lifestyles than the Platinum does — and why someone might have
              the Reserve but skip the Platinum entirely.
            </p>
            <div className="mt-4 rounded-lg bg-muted/40 p-3">
              <p className="text-xs font-semibold text-foreground">The rule:</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Before getting any annual fee card, list out every benefit and
                ask yourself: would I actually use this? Add up only the ones
                you&apos;d genuinely use. If that number beats the fee, it makes
                sense. If it doesn&apos;t, move on — there&apos;s a better card for you.
              </p>
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-red-500/20 bg-red-500/5 p-5">
            <p className="mb-2 font-semibold text-foreground">Watch out for the first-year trap</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Some cards advertise no annual fee for the first year, then start
              charging $90 or more in year two. If you&apos;re just starting out,
              avoid these. You don&apos;t want to be thinking about whether a card
              is worth keeping while you&apos;re still figuring out how to use it.
              Start with cards that are free forever.
            </p>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">
            The goal with any credit card — annual fee or not — is for the
            card to pay you more than you pay for it. No-fee cards do that
            through rewards alone. Premium cards do it through bigger rewards
            and benefits. Once you understand points well enough to maximize
            them, the math on premium cards starts making a lot of sense.
            That&apos;s what the next section covers.
          </p>
        </div>
      );

    case "ccw-3":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            How Credit Cards Work · Lesson 3
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            APR and Interest
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            APR stands for Annual Percentage Rate. It&apos;s the interest rate the
            card charges on any balance you carry past your due date. Right now
            the average credit card APR is somewhere between 20% and 28%.
            That&apos;s high. Higher than almost any other type of loan you can get.
          </p>

          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            But here&apos;s the thing — if you pay your balance in full every month,
            your APR is completely irrelevant. Zero. It doesn&apos;t matter if it&apos;s
            29%. You&apos;ll never pay a single dollar in interest. The grace period
            means you borrow for free. APR only becomes a problem when you
            carry a balance.
          </p>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-4 font-semibold text-foreground">What carrying a balance actually costs you</p>
            <div className="flex flex-col gap-3">
              {[
                { balance: "$500", apr: "24%", monthly: "~$10/mo", yearly: "~$120/yr" },
                { balance: "$1,000", apr: "24%", monthly: "~$20/mo", yearly: "~$240/yr" },
                { balance: "$3,000", apr: "24%", monthly: "~$60/mo", yearly: "~$720/yr" },
                { balance: "$5,000", apr: "24%", monthly: "~$100/mo", yearly: "~$1,200/yr" },
              ].map(({ balance, apr, monthly, yearly }) => (
                <div key={balance} className="grid grid-cols-4 items-center gap-2 border-b border-border pb-2 last:border-0 last:pb-0 text-sm">
                  <p className="font-semibold text-foreground">{balance}</p>
                  <p className="text-center text-muted-foreground">{apr} APR</p>
                  <p className="text-center text-muted-foreground">{monthly}</p>
                  <p className="text-right font-medium text-red-500">{yearly}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">That&apos;s money gone — on top of what you already spent.</p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-2 font-semibold text-foreground">The minimum payment trap</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Credit card companies set minimum payments low on purpose. If you
              have a $5,000 balance and only pay the minimum every month, it
              can take 10 to 15 years to pay it off — and you&apos;ll pay thousands
              in interest on top of the original $5,000. The minimum payment
              keeps you in debt. Always pay more than the minimum. Pay the full
              balance if you can.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-2 font-semibold text-foreground">What about 0% APR offers?</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Some cards offer 0% intro APR for 12 to 21 months on new
              purchases or balance transfers. This can be useful if you have
              an existing high-interest balance you want to move over and pay
              down interest-free. Just know what the APR jumps to when the
              intro period ends — and make sure you&apos;ve paid it off by then.
            </p>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">
            The people who use credit cards well don&apos;t think about APR because
            it never applies to them. They pay in full every month, earn
            rewards on every purchase, and the card costs them nothing. That&apos;s
            the goal. APR is only something to worry about if you break the
            debit card rule.
          </p>
        </div>
      );

    case "ccw-quiz":
      return (
        <QuizBlock
          sectionLabel="How Credit Cards Work"
          onPass={onQuizPass}
          questions={[
            {
              question: "What happens if you pay your full credit card balance by the due date every month?",
              options: ["You still pay a small amount of interest", "You pay zero interest — the grace period lets you borrow for free", "Your APR goes down over time as a reward", "The card charges a small processing fee instead"],
              correct: 1,
              explanation: "Paying your full statement balance by the due date means you owe zero interest. The grace period between when your statement closes and your due date is your window to borrow completely free.",
            },
            {
              question: "A credit card has a $95 annual fee but gives you $200 in travel credits and 3x points on dining. Is it worth it?",
              options: ["No — always avoid cards with annual fees", "Yes — if you use those benefits, you come out ahead by more than the fee", "Only if your credit score is above 750", "No — annual fee cards are only for wealthy people"],
              correct: 1,
              explanation: "Annual fee cards can absolutely be worth it — as long as the benefits you actually use outweigh the cost. $200 in travel credits alone already covers a $95 fee. The math has to work in your favor.",
            },
            {
              question: "What is APR?",
              options: ["A monthly fee credit card companies charge", "The annual interest rate charged on balances you carry past your due date", "A credit score measurement used by lenders", "The annual rewards rate on your card"],
              correct: 1,
              explanation: "APR is the Annual Percentage Rate — the interest rate applied to any balance you carry after your due date. If you pay in full every month, APR never affects you.",
            },
            {
              question: "You have a $3,000 balance on a card with 24% APR and only pay the minimum each month. What's the real danger?",
              options: ["Your credit score drops to zero automatically", "The card company closes your account after 3 months", "Interest keeps compounding, making the debt much harder to pay off and costing you hundreds more", "You get charged a late fee even though you paid the minimum"],
              correct: 2,
              explanation: "At 24% APR, a $3,000 balance costs you roughly $720 a year in interest alone — and minimum payments barely reduce the principal. You can end up paying back double what you originally spent.",
            },
            {
              question: "What is the single best rule to make sure a credit card never costs you money?",
              options: ["Only use it for purchases over $100", "Always pay at least the minimum payment on time", "Use your credit card like a debit card — only spend what's already in your bank account", "Keep your balance under 50% of your credit limit"],
              correct: 2,
              explanation: "If the money is already in your account, you can always pay the full balance. That keeps you in the grace period every month — you borrow for free, earn rewards, and never pay interest.",
            },
          ]}
        />
      );

    default:
      return (
        <div>
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground">
            Coming Soon
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            This lesson is still being written. Check back soon.
          </p>
        </div>
      );
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CreditCards101Page() {
  const [activeLessonId, setActiveLessonId] = useState("mcs-1");
  const [expandedSections, setExpandedSections] = useState<string[]>(["my-cc-story"]);
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("cc101-completed") ?? "[]");
    } catch {
      return [];
    }
  });
  const [unlockedSectionIds, setUnlockedSectionIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return ["my-cc-story"];
    try {
      return JSON.parse(localStorage.getItem("cc101-unlocked") ?? '["my-cc-story"]');
    } catch {
      return ["my-cc-story"];
    }
  });
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cc101-completed", JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem("cc101-unlocked", JSON.stringify(unlockedSectionIds));
  }, [unlockedSectionIds]);

  const sections = SECTIONS.map((s) => ({
    ...s,
    locked: !unlockedSectionIds.includes(s.id),
  }));

  const navigableLessons = sections
    .filter((s) => !s.locked)
    .flatMap((s) =>
      s.lessons.map((l) => ({ ...l, sectionId: s.id, locked: false }))
    );

  const activeIndex = navigableLessons.findIndex((l) => l.id === activeLessonId);
  const prevLesson = activeIndex > 0 ? navigableLessons[activeIndex - 1] : null;
  const nextLesson =
    activeIndex < navigableLessons.length - 1 ? navigableLessons[activeIndex + 1] : null;

  const activeSection = sections.find((s) =>
    s.lessons.some((l) => l.id === activeLessonId)
  );
  const isLastLessonOfNoQuizSection =
    activeSection?.noQuiz &&
    activeSection.lessons[activeSection.lessons.length - 1].id === activeLessonId;

  const lastSection = SECTIONS[SECTIONS.length - 1];
  const lastLesson = lastSection.lessons[lastSection.lessons.length - 1];
  const isFinalLesson = activeLessonId === lastLesson.id;

  const activeLesson = activeSection?.lessons.find((l) => l.id === activeLessonId);
  const isActiveQuiz = "isQuiz" in (activeLesson ?? {}) && (activeLesson as { isQuiz?: boolean }).isQuiz;

  const nextSectionIndex = activeSection
    ? SECTIONS.findIndex((s) => s.id === activeSection.id) + 1
    : -1;
  const nextSection = nextSectionIndex < SECTIONS.length ? SECTIONS[nextSectionIndex] : null;

  const totalLessons = SECTIONS.flatMap((s) => s.lessons).filter(
    (l) => !("isQuiz" in l && l.isQuiz)
  ).length;
  const progressPct = Math.round((completedLessons.length / totalLessons) * 100);

  const isCompleted = completedLessons.includes(activeLessonId);

  const unlockNextSection = (currentSectionId: string) => {
    const idx = SECTIONS.findIndex((s) => s.id === currentSectionId);
    const next = idx >= 0 && idx + 1 < SECTIONS.length ? SECTIONS[idx + 1] : null;
    if (!next) return;
    setUnlockedSectionIds((prev) =>
      prev.includes(next.id) ? prev : [...prev, next.id]
    );
    setExpandedSections((prev) =>
      prev.includes(next.id) ? prev : [...prev, next.id]
    );
  };

  const handleQuizPass = () => {
    if (!completedLessons.includes(activeLessonId)) {
      setCompletedLessons((prev) => [...prev, activeLessonId]);
    }
    if (activeSection) unlockNextSection(activeSection.id);
  };

  const markComplete = () => {
    const updated = completedLessons.includes(activeLessonId)
      ? completedLessons
      : [...completedLessons, activeLessonId];
    setCompletedLessons(updated);

    if (isLastLessonOfNoQuizSection && nextSection) {
      unlockNextSection(activeSection!.id);
      setActiveLessonId(nextSection.lessons[0].id);
    } else if (nextLesson) {
      setActiveLessonId(nextLesson.id);
    }
  };

  const goToLesson = (id: string) => {
    setActiveLessonId(id);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0 });
  };

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-background">

      {/* ── Top bar ── */}
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/courses"
            className="flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="size-4" />
            <span className="hidden sm:inline">Courses</span>
          </Link>
          <span className="hidden text-muted-foreground/40 sm:inline">/</span>
          <span className="truncate text-sm font-semibold text-foreground">
            Credit Cards 101
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden items-center gap-2 sm:flex">
            <div className="h-1.5 w-28 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${progressPct}%`, background: "var(--brand-600)" }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{progressPct}%</span>
          </div>
          <ThemeToggle />
          <div className="flex size-7 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
            {mockUser.name[0]}
          </div>
          <span className="hidden text-sm font-medium text-foreground sm:inline">
            {mockUser.name}
          </span>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar ── */}
        <aside
          className={`absolute inset-y-12 left-0 z-20 flex w-72 shrink-0 flex-col border-r border-border bg-background transition-transform lg:static lg:translate-x-0 ${
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <BookOpen className="size-3.5" />
              <span>{completedLessons.length} / {totalLessons} lessons</span>
            </div>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="text-muted-foreground hover:text-foreground lg:hidden"
            >
              <ChevronLeft className="size-4" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-2">
            {sections.map((section) => {
              const isExpanded = expandedSections.includes(section.id);
              const sectionLessons = section.lessons.filter(
                (l) => !("isQuiz" in l && l.isQuiz)
              );
              const completedInSection = sectionLessons.filter((l) =>
                completedLessons.includes(l.id)
              ).length;

              return (
                <div key={section.id} className="mb-1">
                  <button
                    onClick={() => !section.locked && toggleSection(section.id)}
                    className={`flex w-full items-center gap-2 px-4 py-2.5 text-left transition-colors ${
                      section.locked
                        ? "cursor-not-allowed opacity-40"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    {section.locked ? (
                      <Lock className="size-3.5 shrink-0 text-muted-foreground" />
                    ) : (
                      <ChevronDown
                        className={`size-3.5 shrink-0 text-muted-foreground transition-transform ${
                          isExpanded ? "rotate-0" : "-rotate-90"
                        }`}
                      />
                    )}
                    <span className="flex-1 text-xs font-semibold uppercase tracking-wide text-foreground">
                      {section.title}
                    </span>
                    {!section.locked && (
                      <span className="text-[10px] text-muted-foreground">
                        {completedInSection}/{sectionLessons.length}
                      </span>
                    )}
                  </button>

                  {isExpanded && !section.locked && (
                    <div className="pb-1">
                      {section.lessons.map((lesson) => {
                        const isActive = lesson.id === activeLessonId;
                        const isDone = completedLessons.includes(lesson.id);

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => goToLesson(lesson.id)}
                            className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition-colors ${
                              isActive
                                ? "font-medium text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                            style={
                              isActive
                                ? { background: "var(--brand-600)15" }
                                : undefined
                            }
                          >
                            {isDone ? (
                              <CheckCircle2
                                className="size-3.5 shrink-0"
                                style={{ color: "var(--brand-600)" }}
                              />
                            ) : (
                              <Circle className="size-3.5 shrink-0 text-muted-foreground/40" />
                            )}
                            <span className="truncate">{lesson.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* ── Mobile sidebar overlay ── */}
        {mobileSidebarOpen && (
          <div
            className="absolute inset-0 z-10 bg-background/60 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* ── Main content ── */}
        <main className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-10 sm:px-10">
            <div className="mx-auto max-w-2xl">
              {/* Mobile sidebar toggle */}
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground lg:hidden"
              >
                <BookOpen className="size-4" />
                Course contents
              </button>

              <LessonContent lessonId={activeLessonId} onQuizPass={handleQuizPass} />
            </div>
          </div>

          {/* ── Bottom nav ── */}
          <div className="shrink-0 border-t border-border bg-background px-6 py-3">
            <div className="mx-auto flex max-w-2xl items-center justify-between">

              {prevLesson ? (
                <button
                  onClick={() => goToLesson(prevLesson.id)}
                  className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <ChevronLeft className="size-4" />
                  <span className="hidden sm:inline">{prevLesson.title}</span>
                  <span className="sm:hidden">Previous</span>
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-3">
                {isCompleted ? (
                  <>
                    <span className="flex items-center gap-1.5 text-sm text-green-600">
                      <CheckCircle2 className="size-4" />
                      Completed
                    </span>
                    {isLastLessonOfNoQuizSection && nextSection && (
                      <button
                        onClick={() => goToLesson(nextSection.lessons[0].id)}
                        className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <span>{nextSection.title}</span>
                        <ChevronRight className="size-4" />
                      </button>
                    )}
                    {!isLastLessonOfNoQuizSection && nextLesson && (
                      <button
                        onClick={() => goToLesson(nextLesson.id)}
                        className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <span className="hidden sm:inline">{nextLesson.title}</span>
                        <span className="sm:hidden">Next</span>
                        <ChevronRight className="size-4" />
                      </button>
                    )}
                    {isFinalLesson && (
                      <Link
                        href="/courses"
                        className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        style={{ background: "var(--brand-600)" }}
                      >
                        Back to Courses
                        <ChevronRight className="size-4" />
                      </Link>
                    )}
                  </>
                ) : !isActiveQuiz ? (
                  <Button size="sm" onClick={markComplete}>
                    {isLastLessonOfNoQuizSection && nextSection
                      ? `Complete & Start ${nextSection.title}`
                      : nextLesson
                      ? "Complete & Continue"
                      : "Mark Complete"}
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
