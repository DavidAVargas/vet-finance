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

// ─── Mock user ────────────────────────────────────────────────────────────────

const mockUser = { name: "David", rank: "Veteran" };

// ─── Course structure ─────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: "car-trap",
    title: "The Car Trap",
    noQuiz: false,
    lessons: [
      { id: "ct-1", title: "The 72-Month Lie" },
      { id: "ct-2", title: "What a Car Actually Costs You" },
      { id: "ct-quiz", title: "Quiz", isQuiz: true },
    ],
  },
  {
    id: "medical-debt",
    title: "Medical Debt",
    noQuiz: false,
    lessons: [
      { id: "md-1", title: "Hospital Bills Are Negotiable" },
      { id: "md-2", title: "Surprise Bills and What To Do" },
      { id: "md-quiz", title: "Quiz", isQuiz: true },
    ],
  },
  {
    id: "student-loans",
    title: "Student Loans",
    noQuiz: false,
    lessons: [
      { id: "sl-1", title: "It's Manageable — If You're Smart" },
      { id: "sl-2", title: "Pay It Off As Fast As You Can" },
      { id: "sl-quiz", title: "Quiz", isQuiz: true },
    ],
  },
];

// ─── Quiz component ───────────────────────────────────────────────────────────

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
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">Knowledge Check</h1>
      <p className="mb-8 text-base text-muted-foreground">
        You need {passThreshold} out of {questions.length} to pass.
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
                        isCorrectOption ? "border-green-500 bg-green-500/10 text-foreground"
                        : isWrongSelected ? "border-red-400 bg-red-400/10 text-foreground"
                        : isSelected ? "border-foreground bg-muted text-foreground"
                        : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                      } ${submitted ? "cursor-default" : "cursor-pointer"}`}
                    >
                      <span className={`flex size-5 shrink-0 items-center justify-center rounded-full border text-xs font-medium ${
                        isCorrectOption ? "border-green-500 bg-green-500 text-white"
                        : isWrongSelected ? "border-red-400 bg-red-400 text-white"
                        : isSelected ? "border-foreground bg-foreground text-background"
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

function LessonContent({ lessonId, onQuizPass }: { lessonId: string; onQuizPass?: () => void }) {
  switch (lessonId) {

    case "ct-1":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            The Car Trap · Lesson 1
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            The 72-Month Lie
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Walk into any car dealership in America and within five minutes
            someone will ask you: "What monthly payment are you comfortable
            with?" That question is a trap. The moment you answer it, you&apos;ve
            already lost.
          </p>

          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            The 72-month, zero down car loan is one of the most effective
            wealth killers in this country. It&apos;s dressed up to look like a
            good deal — low monthly payment, no money out of pocket today.
            But the numbers behind it tell a completely different story.
          </p>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-4 font-semibold text-foreground">What a $35,000 car actually costs you</p>
            <div className="flex flex-col gap-3">
              {[
                { label: "Sticker price", value: "$35,000", note: "" },
                { label: "72-month loan at 7% APR", value: "$548/mo", note: "Sounds manageable, right?" },
                { label: "Total paid over 6 years", value: "$39,456", note: "$4,456 just in interest" },
                { label: "Car's value after 1 year", value: "~$28,000", note: "New cars lose ~20% immediately" },
                { label: "What you still owe after 1 year", value: "~$30,500", note: "You're $2,500 underwater — already" },
                { label: "Insurance on a $35k car", value: "$150–$250/mo", note: "Required when financing" },
              ].map(({ label, value, note }) => (
                <div key={label} className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0 text-sm">
                  <div>
                    <p className="font-medium text-foreground">{label}</p>
                    {note && <p className="text-xs text-muted-foreground">{note}</p>}
                  </div>
                  <p className="shrink-0 font-semibold text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">What "underwater" actually means</p>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              When you owe more on your car than it&apos;s worth, you&apos;re underwater —
              also called negative equity. On a 72-month loan you&apos;re almost
              guaranteed to be underwater for the first 2 to 3 years because
              the car is depreciating faster than you&apos;re paying it down.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              This means if your car gets totaled, stolen, or you need to sell
              it — your insurance or buyer pays what the car is worth, not what
              you owe. You&apos;re left covering the difference out of pocket. On a
              $35k car that could be $3,000–$6,000 you didn&apos;t plan for.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">Why dealers push this so hard</p>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              Stretching the loan to 72 months lowers your monthly payment
              enough that you stop questioning the price of the car. A $40,000
              car at $600/month feels different than $650/month — even though
              you&apos;re paying an extra $3,600 over the life of the loan. They&apos;re
              selling you a monthly payment, not a car.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Dealerships near military bases are especially aggressive about
              this. They know servicemembers have steady paychecks and may be
              young, first-time buyers with less experience negotiating. The
              72-month loan with add-ons like extended warranties and paint
              protection is one of the most common ways military members get
              taken advantage of financially.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">The right questions to ask instead</p>
            <div className="flex flex-col gap-3">
              {[
                { wrong: "What&apos;s my monthly payment?", right: "What is the total out-of-pocket cost including all fees and interest?" },
                { wrong: "Can I afford this monthly?", right: "Can I afford to own this car — insurance, maintenance, and the loan — for 6 years?" },
                { wrong: "What's the best deal on this car?", right: "Is a new car the right move at all, or should I be buying used?" },
              ].map(({ wrong, right }, i) => (
                <div key={i} className="rounded-lg bg-muted/40 p-3 text-sm">
                  <p className="mb-1 text-red-500 line-through">{wrong}</p>
                  <p className="font-medium text-foreground">{right}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-5 text-white" style={{ background: "var(--brand-600)" }}>
            <p className="mb-1 font-bold">What I would do</p>
            <p className="text-sm leading-relaxed text-white/85">
              Buy a used car that&apos;s 2 to 4 years old in cash or with a short
              loan — 24 to 36 months max. Let someone else take the
              depreciation hit. A 3-year-old car with 30,000 miles runs the
              same as a new one and costs a fraction of the price. The
              $300–$400/month you save goes toward building wealth instead
              of a dealer&apos;s bottom line. A car is a depreciating asset — spend
              as little as you reasonably can on it.
            </p>
          </div>
        </div>
      );

    case "ct-2":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            The Car Trap · Lesson 2
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            What a Car Actually Costs You
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Most people think of a car payment as the cost of the car. It&apos;s
            not. The monthly payment is just one piece of a much bigger number
            — and when you add everything up, most people are shocked by what
            they&apos;re actually spending to keep a car on the road.
          </p>

          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            The real cost of a car isn&apos;t just the loan. It&apos;s the total cost
            of ownership — every dollar that leaves your pocket because you
            own that vehicle.
          </p>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-4 font-semibold text-foreground">True monthly cost of a $35,000 financed car</p>
            <div className="flex flex-col gap-3">
              {[
                { item: "Loan payment (72 mo, 7% APR)", cost: "$548/mo" },
                { item: "Full coverage insurance", cost: "$175/mo" },
                { item: "Gas", cost: "$150/mo" },
                { item: "Maintenance & tires (averaged)", cost: "$100/mo" },
                { item: "Registration & taxes", cost: "$30/mo" },
              ].map(({ item, cost }) => (
                <div key={item} className="flex items-center justify-between border-b border-border pb-2 last:border-0 last:pb-0 text-sm">
                  <p className="text-muted-foreground">{item}</p>
                  <p className="font-semibold text-foreground">{cost}</p>
                </div>
              ))}
              <div className="flex items-center justify-between pt-1 text-sm">
                <p className="font-bold text-foreground">Total monthly cost</p>
                <p className="font-bold text-red-500">~$1,003/mo</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Over 72 months that&apos;s over $72,000 out of pocket — on a $35,000 car.</p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-2 font-semibold text-foreground">Your credit score has a real dollar cost — here&apos;s the proof</p>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              The 7% APR example above is best-case — good credit territory.
              Most people financing a car aren&apos;t getting 7%. And the difference
              between a good rate and a bad rate on the same $35,000 car over
              72 months is staggering.
            </p>
            <div className="mb-3 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-2 text-left font-semibold text-foreground">Credit</th>
                    <th className="pb-2 text-center font-semibold text-foreground">APR</th>
                    <th className="pb-2 text-center font-semibold text-foreground">Monthly</th>
                    <th className="pb-2 text-right font-semibold text-foreground">Interest paid</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { credit: "Excellent (750+)", apr: "7%", monthly: "$548", interest: "$4,456", highlight: false },
                    { credit: "Good (700–749)", apr: "11%", monthly: "$612", interest: "$9,064", highlight: false },
                    { credit: "Fair (650–699)", apr: "18%", monthly: "$731", interest: "$17,632", highlight: false },
                    { credit: "Bad (below 650)", apr: "24%", monthly: "$816", interest: "$23,752", highlight: true },
                    { credit: "Buy here pay here", apr: "29%", monthly: "$903", interest: "$30,016", highlight: true },
                  ].map(({ credit, apr, monthly, interest, highlight }) => (
                    <tr key={apr} className="border-b border-border last:border-0">
                      <td className={`py-2.5 text-left ${highlight ? "font-medium text-red-500" : "text-muted-foreground"}`}>{credit}</td>
                      <td className={`py-2.5 text-center ${highlight ? "font-medium text-red-500" : "text-muted-foreground"}`}>{apr}</td>
                      <td className={`py-2.5 text-center ${highlight ? "font-medium text-red-500" : "text-muted-foreground"}`}>{monthly}</td>
                      <td className={`py-2.5 text-right font-semibold ${highlight ? "text-red-500" : "text-foreground"}`}>{interest}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              At 29% APR you&apos;re paying <span className="font-semibold text-foreground">$30,000 in pure interest</span> on a $35,000 car.
              You&apos;re essentially buying the car twice. This is exactly why building
              your credit score before making a big purchase isn&apos;t just about
              a number — it&apos;s about real money staying in your pocket.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">The opportunity cost — what that money could do instead</p>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              That $548 car payment every month for 6 years is $39,456 total.
              If you invested that same $548 a month into an index fund averaging
              7% annual returns instead, here&apos;s what it would be worth:
            </p>
            <div className="flex flex-col gap-2">
              {[
                { period: "After 6 years (loan term)", value: "~$45,800" },
                { period: "After 10 years", value: "~$95,000" },
                { period: "After 20 years", value: "~$285,000" },
              ].map(({ period, value }) => (
                <div key={period} className="flex items-center justify-between rounded-lg bg-muted/40 px-4 py-3 text-sm">
                  <p className="text-muted-foreground">{period}</p>
                  <p className="font-bold text-foreground">{value}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">A car loses value every year. Investments compound. That&apos;s the real trade-off.</p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">The used car math</p>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              A 3-year-old version of that same $35,000 car costs roughly
              $20,000–$22,000. Someone else already took the depreciation hit.
              The car runs the same. Here&apos;s the difference:
            </p>
            <div className="flex flex-col gap-3">
              {[
                { label: "Purchase price", new: "$35,000", used: "$21,000" },
                { label: "Loan (36 mo, 6% APR)", new: "$548/mo × 72 mo", used: "$639/mo × 36 mo" },
                { label: "Total paid in loan", new: "$39,456", used: "$23,004" },
                { label: "Insurance cost", new: "Higher (lender requires)", used: "Lower" },
                { label: "Savings vs. new", new: "—", used: "~$16,000+" },
              ].map(({ label, new: newVal, used }) => (
                <div key={label} className="grid grid-cols-3 gap-2 border-b border-border pb-2 last:border-0 last:pb-0 text-sm">
                  <p className="font-medium text-foreground">{label}</p>
                  <p className="text-center text-muted-foreground">{newVal}</p>
                  <p className="text-right font-medium text-foreground">{used}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-2 font-semibold text-foreground">When a car loan isn&apos;t the end of the world</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Not everyone can buy a car in cash — and that&apos;s fine. If you need
              to finance, keep it short (24–36 months max), put money down, and
              keep the total loan amount as low as possible. A $12,000 used car
              on a 36-month loan is a completely different situation than a
              $40,000 new car on 72 months. The trap isn&apos;t financing itself —
              it&apos;s overpaying for too long on something that&apos;s losing value.
            </p>
          </div>

          <div className="rounded-xl p-5 text-white" style={{ background: "var(--brand-600)" }}>
            <p className="mb-1 font-bold">The mindset shift</p>
            <p className="text-sm leading-relaxed text-white/85">
              A car is a tool to get you from point A to point B. It is not a
              status symbol, it is not an investment, and it is not worth going
              broke over. The people building real wealth drive boring, paid-off
              cars and put the difference to work. The flashy car payment is
              one of the most common reasons people with good incomes still
              live paycheck to paycheck.
            </p>
          </div>
        </div>
      );

    case "ct-quiz":
      return (
        <QuizBlock
          sectionLabel="The Car Trap"
          onPass={onQuizPass}
          questions={[
            {
              question: "A dealer asks 'What monthly payment are you comfortable with?' Why is this a trap?",
              options: [
                "Because monthly payments always include hidden fees",
                "Because it shifts your focus to affordability instead of the total cost — making you ignore how much you're actually paying",
                "Because dealers are required by law to ask this question",
                "Because it means the dealer won't negotiate on price",
              ],
              correct: 1,
              explanation: "When you anchor to a monthly payment, dealers can stretch the loan term, increase the price, or add extras and it still 'fits' your budget. The right question is total out-of-pocket cost — not monthly payment.",
            },
            {
              question: "What does it mean to be 'underwater' on a car loan?",
              options: [
                "Your interest rate is higher than the national average",
                "You missed more than two payments in a row",
                "You owe more on the loan than the car is currently worth",
                "Your loan has more than 36 months remaining",
              ],
              correct: 2,
              explanation: "Being underwater means negative equity — the car's value dropped faster than you paid down the loan. On a 72-month loan this is almost guaranteed for the first 2–3 years because new cars depreciate fast.",
            },
            {
              question: "A $35,000 car loses roughly how much value in the first year?",
              options: [
                "About 5% (~$1,750)",
                "About 10% (~$3,500)",
                "About 20% (~$7,000)",
                "Nothing — cars hold their value for the first two years",
              ],
              correct: 2,
              explanation: "New cars typically lose around 20% of their value in the first year. That means a $35,000 car is worth roughly $28,000 after 12 months — while you still owe closer to $30,500 on a 72-month loan.",
            },
            {
              question: "What is the biggest advantage of buying a 3-year-old used car instead of new?",
              options: [
                "Used cars never need repairs",
                "You avoid the sharpest depreciation — someone else already took that hit",
                "Used cars always have lower interest rates",
                "Dealers are required to give bigger discounts on used cars",
              ],
              correct: 1,
              explanation: "A new car's steepest depreciation happens in years 1–3. Buying used means you pay for the car at its post-depreciation price while it still has most of its useful life left.",
            },
            {
              question: "If a car loan is unavoidable, what's the best approach?",
              options: [
                "Take the longest term possible to keep payments low",
                "Finance the most expensive car you can qualify for",
                "Keep the loan short (24–36 months), put money down, and borrow as little as possible",
                "0% APR promotions are always the best deal regardless of loan length",
              ],
              correct: 2,
              explanation: "Short loan terms mean less interest paid and less time underwater. Putting money down reduces the loan amount and builds immediate equity. The goal is to minimize how long you owe more than the car is worth.",
            },
          ]}
        />
      );

    case "md-1":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Medical Debt · Lesson 1
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            Hospital Bills Are Negotiable
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Most people get a hospital bill and either pay it immediately or
            panic because they can&apos;t. What almost nobody does — and what
            actually works — is pick up the phone and negotiate. Hospital
            bills are not fixed prices. They are opening offers. And the
            system is specifically set up so that the people who push back
            pay less.
          </p>

          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            Medical debt is the number one cause of personal bankruptcy in
            America. Not because the care is always that expensive — but
            because most people don&apos;t know they have options.
          </p>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">The chargemaster — the number nobody actually pays</p>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              Every hospital has a chargemaster — a master list of prices for
              every service, procedure, and supply. These are the sticker
              prices. Insurance companies negotiate them down by 40–80%.
              Medicare pays even less. The only people who pay the full
              chargemaster rate are uninsured patients who don&apos;t know to ask.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              When you call and ask for the cash pay rate or the uninsured
              rate, you&apos;re essentially asking for what the hospital would
              accept from an insurer. Most hospitals will give it to you —
              sometimes right away, sometimes after a little back and forth.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">Request an itemized bill first</p>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              Before you negotiate anything, ask for an itemized bill — a
              line-by-line breakdown of every charge. Studies show that up
              to 80% of hospital bills contain errors. Common ones include
              duplicate charges, charges for services you didn&apos;t receive,
              and incorrect billing codes.
            </p>
            <div className="flex flex-col gap-2">
              {[
                "Being charged for a private room when you had a shared one",
                "Supplies billed individually that should be bundled",
                "Procedures listed that were ordered but never performed",
                "Wrong billing codes that inflate the price",
              ].map((error) => (
                <div key={error} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-red-400" />
                  {error}
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">You have the right to request an itemized bill. If they push back, ask again.</p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-4 font-semibold text-foreground">How to negotiate a hospital bill — step by step</p>
            <div className="flex flex-col gap-3">
              {[
                { step: "1", title: "Call the billing department — not the collections number", body: "The billing department has more flexibility than a collections agency. Call them directly and tell them you want to discuss your bill." },
                { step: "2", title: "Ask for the cash pay or financial assistance rate", body: "Say: 'I don't have insurance / I'm paying out of pocket — is there a cash pay discount or financial assistance available?' Many hospitals have formal programs and are legally required to tell you about them." },
                { step: "3", title: "Ask about charity care", body: "Nonprofit hospitals receive tax exemptions and are required to offer charity care — free or reduced-cost care for people who qualify based on income. You may qualify even if you have a job. Ask specifically for their charity care application." },
                { step: "4", title: "Offer a lump sum", body: "Same principle as collections — a payment in full today is worth more to them than a payment plan. 'I can pay $X today if we can settle this' often gets you a significant reduction." },
                { step: "5", title: "Set up a payment plan if you can't pay now", body: "Most hospitals offer 0% interest payment plans. Always ask for interest-free. Do not agree to medical credit cards (like CareCredit) without understanding the deferred interest terms — they can be a trap." },
              ].map(({ step, title, body }) => (
                <div key={step} className="flex gap-4">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: "var(--brand-600)" }}>
                    {step}
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-semibold text-foreground">{title}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-5 text-white" style={{ background: "var(--brand-600)" }}>
            <p className="mb-1 font-bold">The bottom line</p>
            <p className="text-sm leading-relaxed text-white/85">
              The hospital sent you a bill. That&apos;s not the final number —
              that&apos;s the starting point. Call them. Ask questions. Request
              the itemized bill, ask about financial assistance, and make
              an offer. The worst they can say is no. Most of the time
              they&apos;ll work with you.
            </p>
          </div>
        </div>
      );

    case "md-2":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Medical Debt · Lesson 2
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            Surprise Bills and What To Do
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            You go to an in-network hospital for surgery. You check — the
            hospital is covered by your insurance. You get the procedure done.
            Then a few weeks later you get a bill from a doctor you never met
            who was in the operating room — and they&apos;re out-of-network.
            That&apos;s a surprise bill. And it used to be completely legal.
          </p>

          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            The No Surprises Act went into effect in January 2022 and changed
            a lot of this. But it doesn&apos;t cover everything — and you still need
            to know what to do when a surprise bill lands in your mailbox.
          </p>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">What the No Surprises Act covers</p>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              As of 2022, federal law limits surprise billing in these situations:
            </p>
            <div className="flex flex-col gap-2 mb-3">
              {[
                "Emergency care at any hospital, regardless of network",
                "Non-emergency care at in-network facilities when you didn't have a choice of provider",
                "Air ambulance services from certain providers",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-green-500" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              In these cases, you can only be billed at your in-network cost
              sharing rate — even if the provider is out of network.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">What to do when you get a surprise bill</p>
            <div className="flex flex-col gap-3">
              {[
                { title: "Don't pay it immediately", body: "Take a breath. A bill arriving doesn't mean you owe that amount. Review it before doing anything." },
                { title: "Check if the No Surprises Act applies", body: "Was it emergency care? Were you at an in-network facility? If yes, contact your insurance company — they are required to process it at in-network rates." },
                { title: "File a complaint if needed", body: "If you believe you were wrongly billed, you can file a complaint with the federal No Surprises Act help desk at cms.gov or call 1-800-985-3059. This is a real option — use it." },
                { title: "Dispute directly with the provider", body: "Call the billing department. Tell them you received a surprise bill and you believe it may be covered under the No Surprises Act. Ask them to review it before you pay." },
              ].map(({ title, body }, i) => (
                <div key={i} className="flex gap-4 rounded-xl border border-border p-4">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: "var(--brand-600)" }}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-semibold text-foreground">{title}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">Medical debt and your credit score</p>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              The credit bureaus have been moving away from medical debt in
              recent years. Here&apos;s where things stand:
            </p>
            <div className="flex flex-col gap-2">
              {[
                { label: "Medical debt under $500", status: "Removed from all 3 credit reports as of 2023" },
                { label: "Paid medical debt", status: "No longer reported by Equifax, Experian, and TransUnion" },
                { label: "Unpaid medical debt over $500", status: "Can still appear after a 1-year grace period" },
              ].map(({ label, status }) => (
                <div key={label} className="rounded-lg bg-muted/40 p-3 text-sm">
                  <p className="font-semibold text-foreground">{label}</p>
                  <p className="text-muted-foreground">{status}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-red-500/20 bg-red-500/5 p-5">
            <p className="mb-2 font-semibold text-foreground">Watch out for medical credit cards</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              CareCredit and similar medical credit cards are often offered
              right at the front desk when you&apos;re stressed and just want to
              leave. They advertise 0% interest — but most of them use
              deferred interest, not true 0%. If you don&apos;t pay the full
              balance before the promotional period ends, you get charged
              all the back interest from day one. Read the fine print before
              signing anything at a doctor&apos;s office.
            </p>
          </div>

          <div className="rounded-xl p-5 text-white" style={{ background: "var(--brand-600)" }}>
            <p className="mb-1 font-bold">The key takeaway</p>
            <p className="text-sm leading-relaxed text-white/85">
              Medical bills feel official and final. They&apos;re not. You have
              more rights and more options than the bill implies. Don&apos;t pay
              immediately, don&apos;t panic, and don&apos;t sign up for a medical
              credit card without reading every word. Ask questions, dispute
              what doesn&apos;t look right, and negotiate everything else.
            </p>
          </div>
        </div>
      );

    case "md-quiz":
      return (
        <QuizBlock
          sectionLabel="Medical Debt"
          onPass={onQuizPass}
          questions={[
            {
              question: "What is the 'chargemaster' and why does it matter?",
              options: [
                "A credit score specifically for medical debt",
                "A hospital's full sticker price list — which almost nobody actually pays after negotiation",
                "A federal program that caps medical bills for low-income patients",
                "The rate Medicare pays for hospital procedures",
              ],
              correct: 1,
              explanation: "The chargemaster is the hospital's list of maximum prices. Insurance companies negotiate these down 40–80%. When you call and ask for a cash pay or uninsured rate, you're asking for that same negotiated reduction.",
            },
            {
              question: "What should you do before negotiating or paying any hospital bill?",
              options: [
                "Pay the minimum to avoid collections",
                "Apply for a medical credit card to buy time",
                "Request an itemized bill and check every line for errors",
                "Wait 90 days to see if the bill changes",
              ],
              correct: 2,
              explanation: "Studies show up to 80% of hospital bills contain errors — duplicate charges, services you didn't receive, wrong billing codes. An itemized bill lets you catch these before you negotiate or pay.",
            },
            {
              question: "What does the No Surprises Act protect you from?",
              options: [
                "Any medical bill over $1,000",
                "Out-of-network surprise bills for emergency care and certain in-network facility visits",
                "Medical debt appearing on your credit report",
                "Interest charges on hospital payment plans",
              ],
              correct: 1,
              explanation: "The No Surprises Act (2022) limits surprise out-of-network billing for emergency care and situations where you didn't choose your provider. You can only be charged your in-network cost-sharing rate in these cases.",
            },
            {
              question: "How has medical debt changed on credit reports as of 2023?",
              options: [
                "All medical debt was removed from credit reports permanently",
                "Medical debt now stays on reports for 10 years instead of 7",
                "Medical debt under $500 and all paid medical debt no longer appears on credit reports",
                "Medical debt only affects your score if it's over $2,500",
              ],
              correct: 2,
              explanation: "As of 2023, all three major credit bureaus removed medical debt under $500 and paid medical debt from credit reports. Unpaid debt over $500 can still appear after a 1-year grace period.",
            },
            {
              question: "What's the danger of medical credit cards like CareCredit?",
              options: [
                "They charge interest from the moment you use them",
                "They report to credit bureaus differently than regular cards",
                "They use deferred interest — if you don't pay in full before the promo period ends, all back interest is charged at once",
                "They can only be used at certain hospitals",
              ],
              correct: 2,
              explanation: "Most medical credit cards use deferred interest, not true 0%. If you have any balance left when the promotional period ends, you get hit with all the interest that accumulated from day one. It's one of the most common financial traps offered right at the front desk.",
            },
          ]}
        />
      );

    case "sl-1":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Student Loans · Lesson 1
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            It&apos;s Manageable — If You&apos;re Smart About It
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Student loans are different from every other debt trap in this
            course. A car loan is almost always a bad deal. A medical bill
            is something that happened to you. But student loans — done right
            — are an investment in your earning potential. The problem isn&apos;t
            the debt itself. It&apos;s when people borrow without thinking about
            what comes after.
          </p>

          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            If you have student loans, you&apos;re not alone and you&apos;re not stuck.
            But managing them well requires understanding what you actually
            signed up for.
          </p>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-4 font-semibold text-foreground">Federal vs. private loans — know the difference</p>
            <div className="flex flex-col gap-3">
              {[
                { label: "Interest rates", federal: "Fixed by Congress — predictable", private: "Set by lender — can be variable and higher" },
                { label: "Income-driven repayment", federal: "Available — payments capped at % of income", private: "Rarely available" },
                { label: "Forgiveness programs", federal: "PSLF, IDR forgiveness, military benefits", private: "Almost never" },
                { label: "Deferment / forbearance", federal: "Flexible options available", private: "Limited, varies by lender" },
                { label: "Military benefits", federal: "0% interest during active combat deployment", private: "SCRA applies (6% cap), but varies" },
              ].map(({ label, federal, private: priv }) => (
                <div key={label} className="grid grid-cols-3 gap-3 border-b border-border pb-3 last:border-0 last:pb-0 text-sm">
                  <p className="font-medium text-foreground">{label}</p>
                  <p className="text-muted-foreground">{federal}</p>
                  <p className="text-muted-foreground">{priv}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Rule #1:</span> Never refinance federal loans into private loans. You lose every protection above and can never get them back.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">Income-driven repayment — your safety net</p>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              If your federal loan payments feel unmanageable, income-driven
              repayment (IDR) plans cap your monthly payment at 5–10% of your
              discretionary income. If you&apos;re making $40,000 a year, your
              payment could be as low as $50–$100/month regardless of how
              much you owe.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              After 20–25 years of payments on an IDR plan, any remaining
              balance is forgiven. It&apos;s not the fastest way out — but it
              makes sure the debt never breaks you while you&apos;re building
              your income.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">Military and veteran benefits on student loans</p>
            <div className="flex flex-col gap-3">
              {[
                {
                  title: "0% interest during combat deployment",
                  body: "Active duty servicemembers deployed to a hostile fire or imminent danger area pay 0% interest on federal student loans for the duration of that deployment. Request this through your loan servicer with deployment orders.",
                },
                {
                  title: "Public Service Loan Forgiveness (PSLF)",
                  body: "Military service counts as qualifying employment for PSLF. After 10 years of qualifying payments while working for the government or a nonprofit — including active duty service — your remaining federal loan balance is forgiven tax-free.",
                },
                {
                  title: "SCRA on private loans",
                  body: "The Servicemembers Civil Relief Act caps interest on private student loans taken before active duty at 6%. Request this from your private loan servicer with a copy of your orders.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-border p-4">
                  <p className="mb-1 text-sm font-semibold text-foreground">{title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-5 text-white" style={{ background: "var(--brand-600)" }}>
            <p className="mb-1 font-bold">The honest take on student loans</p>
            <p className="text-sm leading-relaxed text-white/85">
              Student loans are manageable. They&apos;re not fun, and they&apos;re not
              free money — but they&apos;re also not the end of the world. The
              people who struggle most are the ones who ignore them or make
              uninformed decisions like refinancing federal loans into private
              ones. Know what you have, know your options, and have a plan.
              That&apos;s all it takes.
            </p>
          </div>
        </div>
      );

    case "sl-2":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Student Loans · Lesson 2
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            Pay It Off As Fast As You Can
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Income-driven repayment is a safety net — not a strategy.
            Stretching your loans out for 20 years means paying interest
            for 20 years. The goal should always be to eliminate student
            debt as fast as your life realistically allows. Here&apos;s how to
            think about it.
          </p>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">What interest does to your balance over time</p>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              If you borrowed $40,000 at 6.5% interest and only made minimum
              payments on a standard 10-year plan, here&apos;s what it looks like:
            </p>
            <div className="flex flex-col gap-2">
              {[
                { label: "Original balance", value: "$40,000" },
                { label: "Monthly payment (10-yr standard)", value: "$454/mo" },
                { label: "Total paid over 10 years", value: "$54,480" },
                { label: "Total interest paid", value: "$14,480" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between border-b border-border pb-2 last:border-0 last:pb-0 text-sm">
                  <p className="text-muted-foreground">{label}</p>
                  <p className="font-semibold text-foreground">{value}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              $14,480 extra just for taking 10 years. Pay it off in 5 and you&apos;d save around $8,000 in interest.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-4 font-semibold text-foreground">How to attack it faster</p>
            <div className="flex flex-col gap-3">
              {[
                {
                  title: "Live below your means right after graduation",
                  body: "This is the most important window. Your first job after school is when most people upgrade their lifestyle — new car, nicer apartment, going out more. Resist that. Keep your expenses low for 2–3 years and throw everything extra at the loans. This one move can cut years off your payoff timeline.",
                },
                {
                  title: "Pay more than the minimum — even a little",
                  body: "An extra $100–$200 a month on a $40,000 loan at 6.5% cuts years off your payoff and saves thousands in interest. Most loan servicers let you specify that extra payments go toward principal — make sure to request that.",
                },
                {
                  title: "Attack the highest interest rate first",
                  body: "If you have multiple loans at different rates, minimum payments on everything and throw your extra money at the highest rate. That's the one costing you the most every month.",
                },
                {
                  title: "Don't over-focus on loans if you have high-interest debt",
                  body: "If you have credit card debt at 24% APR and student loans at 6%, pay off the credit cards first. Student loan interest, especially federal, is lower than most other debt. Prioritize by rate.",
                },
              ].map(({ title, body }, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: "var(--brand-600)" }}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-semibold text-foreground">{title}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-2 font-semibold text-foreground">Should you invest or pay off loans first?</p>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              If your employer offers a 401(k) match — contribute enough to
              get the full match first, always. That&apos;s a 50–100% instant
              return. Nothing beats it.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              After that, if your loan interest rate is below 6%, you could
              make a case for investing the rest since markets average 7–10%
              long term. Above 6–7%, pay the loans down aggressively. The
              math gets close but the peace of mind from being debt-free
              is worth a lot too.
            </p>
          </div>

          <div className="rounded-xl p-5 text-white" style={{ background: "var(--brand-600)" }}>
            <p className="mb-1 font-bold">The mindset that actually works</p>
            <p className="text-sm leading-relaxed text-white/85">
              Get the degree, get the job, live like you&apos;re still broke for
              a few years, and hit those loans hard. The people who pay off
              $50,000 in student debt in 3–4 years aren&apos;t making six figures
              — they&apos;re just disciplined about lifestyle creep. You don&apos;t
              have to live that way forever. Just long enough to get free.
              Then everything you were throwing at loans goes toward building
              wealth instead.
            </p>
          </div>
        </div>
      );

    case "sl-quiz":
      return (
        <QuizBlock
          sectionLabel="Student Loans"
          onPass={onQuizPass}
          questions={[
            {
              question: "What is the biggest risk of refinancing federal student loans into private loans?",
              options: [
                "Your interest rate will always go up",
                "You permanently lose federal protections like income-driven repayment, forgiveness programs, and military benefits",
                "You can only refinance once",
                "Private loans always have shorter repayment terms",
              ],
              correct: 1,
              explanation: "Federal loans come with income-driven repayment, PSLF eligibility, deferment options, and military benefits. Refinancing into a private loan eliminates all of these permanently. Never trade federal loans for private ones.",
            },
            {
              question: "What does an income-driven repayment plan do?",
              options: [
                "Forgives your loans after 5 years of payments",
                "Caps your monthly payment at a percentage of your income, making payments manageable regardless of balance",
                "Converts federal loans to private loans at a lower rate",
                "Automatically deducts payments from your paycheck",
              ],
              correct: 1,
              explanation: "IDR plans cap payments at 5–10% of discretionary income. If you're earning $40k/year, your payment could be $50–$100/month even on a large balance. After 20–25 years, the remaining balance is forgiven.",
            },
            {
              question: "As an active duty servicemember deployed to a combat zone, what happens to your federal student loan interest?",
              options: [
                "It doubles as a penalty for not making payments",
                "It drops to 6% under SCRA automatically",
                "It goes to 0% for the duration of your combat deployment",
                "Payments are paused but interest still accrues",
              ],
              correct: 2,
              explanation: "Active duty servicemembers deployed to a hostile fire or imminent danger area pay 0% interest on federal student loans during that deployment. You need to request this through your loan servicer with your deployment orders.",
            },
            {
              question: "You have $40,000 in student loans at 6.5% and $5,000 in credit card debt at 24%. Which should you pay off first?",
              options: [
                "Student loans — they're the larger balance",
                "Split payments evenly between both",
                "Credit card debt — the 24% interest rate costs you far more per dollar owed",
                "Neither — invest everything in the stock market instead",
              ],
              correct: 2,
              explanation: "Always attack the highest interest rate first. 24% APR on your credit card is costing you far more per dollar than 6.5% on your student loans. Pay minimums on loans, destroy the credit card balance, then redirect that payment to loans.",
            },
            {
              question: "What is the most important financial move right after getting your first job out of school?",
              options: [
                "Upgrade your apartment and car to reflect your new income",
                "Open as many credit cards as possible to build credit fast",
                "Live below your means and throw extra money at your loans for 2–3 years",
                "Put all extra income into crypto before paying any debt",
              ],
              correct: 2,
              explanation: "The years right after graduation are the most powerful window for paying down debt. Lifestyle creep — a new car, nicer apartment, going out more — is the #1 reason people stay in debt for 10+ years. Keep expenses low, hit the loans hard, and get free faster.",
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

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DebtTrapsPage() {
  const lastSection = SECTIONS[SECTIONS.length - 1];
  const lastLesson = lastSection.lessons[lastSection.lessons.length - 1];

  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem("dt-completed") ?? "[]"); } catch { return []; }
  });
  const [unlockedSectionIds, setUnlockedSectionIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [SECTIONS[0].id];
    try { return JSON.parse(localStorage.getItem("dt-unlocked") ?? `["${SECTIONS[0].id}"]`); } catch { return [SECTIONS[0].id]; }
  });
  const [activeLessonId, setActiveLessonId] = useState<string>(SECTIONS[0].lessons[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("dt-completed", JSON.stringify(completedLessons));
    localStorage.setItem("dt-unlocked", JSON.stringify(unlockedSectionIds));
  }, [completedLessons, unlockedSectionIds]);

  const activeSection = SECTIONS.find((s) => s.lessons.some((l) => l.id === activeLessonId))!;
  const allLessonsInSection = activeSection.lessons;
  const allNonQuizLessons = allLessonsInSection.filter((l) => !("isQuiz" in l && l.isQuiz));
  const allNonQuizCompleted = allNonQuizLessons.every((l) => completedLessons.includes(l.id));
  const activeLessonIndex = allLessonsInSection.findIndex((l) => l.id === activeLessonId);
  const nextLesson = allLessonsInSection[activeLessonIndex + 1]
    ?? SECTIONS[SECTIONS.indexOf(activeSection) + 1]?.lessons[0];
  const isActiveQuiz = ("isQuiz" in (allLessonsInSection[activeLessonIndex] ?? {}));
  const isFinalLesson = activeLessonId === lastLesson.id;
  const isCompleted = completedLessons.includes(activeLessonId);

  const handleComplete = () => {
    if (isCompleted) { if (nextLesson) setActiveLessonId(nextLesson.id); return; }
    const updated = [...completedLessons, activeLessonId];
    setCompletedLessons(updated);
    if (activeSection.noQuiz && allNonQuizLessons.every((l) => updated.includes(l.id))) {
      const nextSectionIndex = SECTIONS.indexOf(activeSection) + 1;
      if (nextSectionIndex < SECTIONS.length) {
        const nextSectionId = SECTIONS[nextSectionIndex].id;
        if (!unlockedSectionIds.includes(nextSectionId)) {
          setUnlockedSectionIds((prev) => [...prev, nextSectionId]);
        }
      }
    }
    if (nextLesson) setActiveLessonId(nextLesson.id);
  };

  const handleQuizPass = () => {
    const updated = [...completedLessons, activeLessonId];
    setCompletedLessons(updated);
    const nextSectionIndex = SECTIONS.indexOf(activeSection) + 1;
    if (nextSectionIndex < SECTIONS.length) {
      const nextSectionId = SECTIONS[nextSectionIndex].id;
      if (!unlockedSectionIds.includes(nextSectionId)) {
        setUnlockedSectionIds((prev) => [...prev, nextSectionId]);
      }
    }
  };

  const canAccessLesson = (lesson: { id: string }, section: typeof SECTIONS[0]) => {
    if (unlockedSectionIds.includes(section.id)) return true;
    return completedLessons.includes(lesson.id);
  };

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-background">

      {/* Top bar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-3">
          <Link href="/courses" className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ChevronLeft className="size-4" />
            <span className="hidden sm:inline">Courses</span>
          </Link>
          <span className="text-border">·</span>
          <span className="text-sm font-semibold text-foreground">Debt Traps</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted lg:hidden"
          >
            <BookOpen className="size-3.5" />
            Contents
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside className={`${sidebarOpen ? "flex" : "hidden"} lg:flex w-72 shrink-0 flex-col border-r border-border bg-background overflow-y-auto absolute inset-y-14 z-20 lg:relative lg:inset-auto`}>
          <div className="flex-1 p-4">
            {SECTIONS.map((section) => {
              const isUnlocked = unlockedSectionIds.includes(section.id);
              const sectionCompleted = section.lessons.every((l) => completedLessons.includes(l.id));
              return (
                <div key={section.id} className="mb-6">
                  <div className="mb-2 flex items-center gap-2">
                    {!isUnlocked && <Lock className="size-3 text-muted-foreground" />}
                    {sectionCompleted && <CheckCircle2 className="size-3 text-green-500" />}
                    <p className={`text-xs font-semibold uppercase tracking-wider ${isUnlocked ? "text-foreground" : "text-muted-foreground"}`}>
                      {section.title}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    {section.lessons.map((lesson) => {
                      const accessible = canAccessLesson(lesson, section);
                      const done = completedLessons.includes(lesson.id);
                      const active = lesson.id === activeLessonId;
                      return (
                        <button
                          key={lesson.id}
                          disabled={!accessible}
                          onClick={() => { if (accessible) { setActiveLessonId(lesson.id); setSidebarOpen(false); } }}
                          className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                            active ? "font-medium text-white" : accessible ? "text-muted-foreground hover:bg-muted hover:text-foreground" : "cursor-not-allowed opacity-40 text-muted-foreground"
                          }`}
                          style={active ? { background: "var(--brand-600)" } : {}}
                        >
                          {done && !active ? <CheckCircle2 className="size-3.5 shrink-0 text-green-500" /> : !accessible ? <Lock className="size-3.5 shrink-0" /> : <Circle className="size-3.5 shrink-0 opacity-40" />}
                          {lesson.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && <div className="fixed inset-0 z-10 bg-background/60 lg:hidden" onClick={() => setSidebarOpen(false)} />}

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-2xl px-6 py-10 sm:px-10">
            <LessonContent lessonId={activeLessonId} onQuizPass={handleQuizPass} />

            {/* Navigation */}
            {!isActiveQuiz && (
              <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
                <button
                  onClick={() => {
                    const prev = allLessonsInSection[activeLessonIndex - 1]
                      ?? SECTIONS[SECTIONS.indexOf(activeSection) - 1]?.lessons.slice(-1)[0];
                    if (prev) setActiveLessonId(prev.id);
                  }}
                  disabled={activeLessonIndex === 0 && SECTIONS.indexOf(activeSection) === 0}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
                >
                  <ChevronLeft className="size-4" />
                  Previous
                </button>

                {isFinalLesson ? (
                  isCompleted ? (
                    <div className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white" style={{ background: "var(--brand-600)" }}>
                      <CheckCircle2 className="size-4" />
                      Course Complete
                    </div>
                  ) : (
                    <button onClick={handleComplete} className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: "var(--brand-600)" }}>
                      <CheckCircle2 className="size-4" />
                      Mark Complete
                    </button>
                  )
                ) : (
                  <button onClick={handleComplete} className="flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: "var(--brand-600)" }}>
                    {isCompleted ? "Next lesson" : "Mark Complete"}
                    <ChevronRight className="size-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
