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
    id: "active-duty-pay",
    title: "Active Duty Pay",
    noQuiz: false,
    lessons: [
      { id: "amp-1", title: "Your LES — What All Those Numbers Mean" },
      { id: "amp-2", title: "BAH, BAS, and the Tax-Free Advantage" },
      { id: "amp-quiz", title: "Quiz", isQuiz: true },
    ],
  },
  {
    id: "tsp-retirement",
    title: "TSP & Retirement",
    noQuiz: false,
    lessons: [
      { id: "tsp-1", title: "The Blended Retirement System" },
      { id: "tsp-2", title: "The Combat Zone TSP Trick" },
      { id: "tsp-quiz", title: "Quiz", isQuiz: true },
    ],
  },
  {
    id: "va-home-loan",
    title: "The VA Home Loan",
    noQuiz: false,
    lessons: [
      { id: "va-1", title: "Why This Is Your Biggest Benefit" },
      { id: "va-2", title: "How to Actually Use It" },
      { id: "va-quiz", title: "Quiz", isQuiz: true },
    ],
  },
  {
    id: "education-benefits",
    title: "Education Benefits",
    noQuiz: false,
    lessons: [
      { id: "ed-1", title: "GI Bill vs. VR&E — Know the Difference" },
      { id: "ed-2", title: "Getting Every Dollar You're Owed" },
      { id: "ed-quiz", title: "Quiz", isQuiz: true },
    ],
  },
  {
    id: "va-disability",
    title: "VA Disability & Healthcare",
    noQuiz: false,
    lessons: [
      { id: "dis-1", title: "How Ratings Work and Why They Matter" },
      { id: "dis-2", title: "What Each Rating Unlocks" },
      { id: "dis-quiz", title: "Quiz", isQuiz: true },
    ],
  },
  {
    id: "hidden-benefits",
    title: "The Hidden Stuff",
    noQuiz: false,
    lessons: [
      { id: "hid-1", title: "Benefits Most Vets Never Claim" },
      { id: "hid-2", title: "State Benefits and Federal Hiring" },
      { id: "hid-quiz", title: "Quiz", isQuiz: true },
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

    case "amp-1":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Active Duty Pay · Lesson 1
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            Your LES — What All Those Numbers Mean
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Every servicemember gets a Leave and Earnings Statement — your LES
            — every month. Most people glance at the net pay and move on.
            That&apos;s a mistake. Your LES tells you exactly where every dollar
            is going, and understanding it is the first step to actually
            controlling your money in the military.
          </p>

          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            myPay (at mypay.dfas.mil) is where you access it. You&apos;ll see a
            wall of numbers and codes. Here&apos;s how to read it.
          </p>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-4 font-semibold text-foreground">The three sections that matter most</p>
            <div className="flex flex-col gap-4">
              {[
                {
                  label: "ENTITLEMENTS",
                  color: "text-green-600 dark:text-green-400",
                  items: [
                    { code: "BASE PAY", desc: "Your rank + years of service pay. This is taxed." },
                    { code: "BAH", desc: "Basic Allowance for Housing. Based on your duty station zip code, rank, and dependent status. Not taxed." },
                    { code: "BAS", desc: "Basic Allowance for Subsistence — food money. Not taxed." },
                    { code: "COLA", desc: "Cost of Living Allowance for high-cost areas or overseas. Not taxed." },
                    { code: "HFAC / HFP", desc: "Hostile Fire / Imminent Danger Pay — extra pay for combat or hazardous duty. Not taxed if in a combat zone." },
                  ],
                },
                {
                  label: "DEDUCTIONS",
                  color: "text-red-500",
                  items: [
                    { code: "FED TAX", desc: "Federal income tax withheld. Only applied to taxable pay (base pay and some special pays)." },
                    { code: "STATE TAX", desc: "State income tax. Varies by your state of legal residence — some states exempt military pay entirely." },
                    { code: "SGLI", desc: "Servicemembers Group Life Insurance premium. Usually $28–$29/month for $400,000 in coverage." },
                    { code: "TSP", desc: "What you're contributing to your Thrift Savings Plan retirement account." },
                    { code: "MED/DEN", desc: "TRICARE dental and vision premiums if enrolled." },
                  ],
                },
                {
                  label: "SUMMARY",
                  color: "text-foreground",
                  items: [
                    { code: "TOTAL ENT", desc: "Everything you earned — taxable and non-taxable combined." },
                    { code: "TOTAL DED", desc: "Everything coming out before you see a dollar." },
                    { code: "NET PAY", desc: "What actually hits your bank account." },
                    { code: "YTD", desc: "Year-to-date totals for both columns — useful for tax season." },
                  ],
                },
              ].map(({ label, color, items }) => (
                <div key={label}>
                  <p className={`mb-2 text-xs font-bold uppercase tracking-widest ${color}`}>{label}</p>
                  <div className="flex flex-col gap-2">
                    {items.map(({ code, desc }) => (
                      <div key={code} className="grid grid-cols-[auto_1fr] gap-3 text-sm">
                        <span className="font-mono font-semibold text-foreground w-24 shrink-0">{code}</span>
                        <span className="text-muted-foreground">{desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">The leave section — don&apos;t ignore it</p>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              The bottom of your LES shows your leave balance — how many days
              you&apos;ve earned vs. how many you&apos;ve used. You earn 2.5 days per
              month (30 days per year). The cap is 60 days at the end of the
              fiscal year (September 30). Any days above 60 are forfeited unless
              you&apos;re deployed — then the cap is 120 days.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Every day of unused leave you forfeit is money lost. At an E-5
              pay rate, one day of leave is worth roughly $90–$110. Letting
              30 days expire at the end of September is throwing away $2,700–$3,300.
              Check your leave balance regularly and use it or sell it at terminal leave.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">Three things to check on your LES every month</p>
            <div className="flex flex-col gap-3">
              {[
                { num: "1", title: "Is your TSP contribution correct?", body: "If you enrolled and aren't seeing it deducted, contact your finance office immediately. You can't go back and make up missed contributions." },
                { num: "2", title: "Is your BAH rate right?", body: "If your dependent status changed (married, had a child, divorced) or you PCS'd, your BAH should have updated. Finance errors happen and they can go unnoticed for months." },
                { num: "3", title: "Check your leave balance before September", body: "Don't forfeit days. Request leave, sell it at terminal, or make sure you're below 60 by fiscal year end." },
              ].map(({ num, title, body }) => (
                <div key={num} className="flex gap-4">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: "var(--brand-600)" }}>
                    {num}
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
              Your LES is your monthly financial report card. Finance offices
              make errors — wrong BAH rates, missing allowances, incorrect
              deductions — and if you&apos;re not checking, you might not catch them
              for months. Five minutes a month reviewing your LES is one of the
              highest-ROI habits in the military. Know what you earn, know what
              comes out, and make sure the numbers are right.
            </p>
          </div>
        </div>
      );

    case "amp-2":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Active Duty Pay · Lesson 2
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            BAH, BAS, and the Tax-Free Advantage
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            One of the most underappreciated parts of military compensation is
            how much of it is tax-free. When civilians compare their salary to
            your base pay, they&apos;re missing the full picture. Your real
            compensation — what you actually take home — is often significantly
            higher than the base pay number suggests.
          </p>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">BAH — Basic Allowance for Housing</p>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              BAH covers your housing costs when you live off base. It&apos;s
              calculated based on three things: your duty station zip code,
              your pay grade (rank), and whether you have dependents.
            </p>
            <div className="mb-4 flex flex-col gap-2">
              {[
                { label: "Is it taxed?", value: "No — never" },
                { label: "Based on", value: "Duty station zip code + rank + dependent status" },
                { label: "Designed to cover", value: "Median rental cost in your area for your rank" },
                { label: "What if you spend less?", value: "You keep the difference — this is how military families build savings" },
                { label: "What if you live on base?", value: "BAH is waived — housing is provided instead" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start justify-between gap-4 border-b border-border pb-2 last:border-0 last:pb-0 text-sm">
                  <p className="text-muted-foreground">{label}</p>
                  <p className="font-semibold text-foreground text-right">{value}</p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              BAH ranges widely by location. A married E-5 in San Diego might
              receive $3,400+/month in BAH. The same rank in a rural area
              might get $1,200. If you can find housing below your BAH rate,
              the difference is yours to keep — tax-free. This is one of the
              most powerful savings opportunities in the military.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">BAS — Basic Allowance for Subsistence</p>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              BAS is a flat monthly food allowance. It doesn&apos;t vary by
              location or dependent status — it&apos;s the same for everyone
              at the same pay level.
            </p>
            <div className="flex flex-col gap-2">
              {[
                { label: "Enlisted (2025 rate)", value: "~$460/month" },
                { label: "Officer (2025 rate)", value: "~$317/month" },
                { label: "Is it taxed?", value: "No" },
                { label: "Do you get it on deployment?", value: "Generally yes, unless meals are provided" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start justify-between gap-4 border-b border-border pb-2 last:border-0 last:pb-0 text-sm">
                  <p className="text-muted-foreground">{label}</p>
                  <p className="font-semibold text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-4 font-semibold text-foreground">The tax-free advantage — what this actually means</p>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              Because BAH and BAS are not taxed, your effective compensation is
              higher than your base pay alone. Here&apos;s what that looks like for
              a married E-5 in a medium cost-of-living area:
            </p>
            <div className="flex flex-col gap-2 mb-4">
              {[
                { label: "Base pay (E-5, 4 yrs)", value: "$3,276/mo", taxed: true },
                { label: "BAH (w/ dependents, medium COL)", value: "$1,800/mo", taxed: false },
                { label: "BAS", value: "$460/mo", taxed: false },
                { label: "Total compensation", value: "$5,536/mo", taxed: null },
              ].map(({ label, value, taxed }) => (
                <div key={label} className="flex items-center justify-between gap-4 border-b border-border pb-2 last:border-0 last:pb-0 text-sm">
                  <div className="flex items-center gap-2">
                    <p className="text-muted-foreground">{label}</p>
                    {taxed === true && <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-medium text-red-500">taxed</span>}
                    {taxed === false && <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-medium text-green-600 dark:text-green-400">tax-free</span>}
                  </div>
                  <p className="font-semibold text-foreground">{value}</p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A civilian earning $5,536/month pays income tax on the full
              amount. This servicemember only pays tax on $3,276. That&apos;s a
              meaningful difference in take-home pay — and it compounds over
              a career.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">Combat zone pay exclusion</p>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              When you&apos;re deployed to a designated combat zone, your base
              pay also becomes tax-free — for every month you spend at least
              one day in the combat zone. For enlisted members, all pay is
              excluded. For officers, the exclusion is capped at the highest
              enlisted pay rate.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              This means during a 6-month combat deployment, you could receive
              6 months of base pay with zero federal income tax withheld. Many
              servicemembers use this window to aggressively build savings or
              pay down debt — because your expenses are low while deployed
              and everything coming in is completely tax-free.
            </p>
          </div>

          <div className="rounded-xl p-5 text-white" style={{ background: "var(--brand-600)" }}>
            <p className="mb-1 font-bold">How to take advantage of this</p>
            <p className="text-sm leading-relaxed text-white/85">
              Find housing below your BAH rate — every dollar under that number
              is tax-free savings. During deployment, expenses drop and income
              stays fully tax-free — that&apos;s the best savings window you&apos;ll
              have in your career. Max your TSP contribution during that window
              especially. The tax advantages of military pay are real — but only
              if you use them intentionally instead of spending up to your income.
            </p>
          </div>
        </div>
      );

    case "amp-quiz":
      return (
        <QuizBlock
          sectionLabel="Active Duty Pay"
          onPass={onQuizPass}
          questions={[
            {
              question: "Which parts of your military pay are NOT subject to federal income tax?",
              options: [
                "Base pay and BAH",
                "BAH, BAS, and combat zone pay",
                "Only base pay",
                "All military pay is tax-free",
              ],
              correct: 1,
              explanation: "BAH and BAS are always tax-free. Base pay is normally taxed but becomes tax-free when you're deployed to a designated combat zone. Base pay by itself is always taxable outside of a combat zone.",
            },
            {
              question: "What three factors determine your BAH rate?",
              options: [
                "Years of service, base pay, and branch of service",
                "Duty station zip code, pay grade (rank), and dependent status",
                "Base pay, number of children, and housing cost nationwide",
                "Rank, years of service, and whether you live on or off base",
              ],
              correct: 1,
              explanation: "BAH is based on where you're stationed (zip code), your pay grade, and whether you have dependents. A married E-5 in San Diego gets a very different BAH than a single E-5 in rural Georgia — even at the same rank and years of service.",
            },
            {
              question: "You receive $1,800/month in BAH but find an apartment for $1,400/month. What happens to the $400 difference?",
              options: [
                "It goes back to the government",
                "You must use it on approved housing expenses",
                "You keep it — tax-free",
                "It reduces your BAH rate next year",
              ],
              correct: 2,
              explanation: "BAH is yours to keep regardless of what you spend on housing. If you find housing below your BAH rate, the difference is yours — tax-free. This is one of the most powerful savings opportunities in the military. Living frugally on BAH builds real wealth over a career.",
            },
            {
              question: "How many days of leave do you earn per month, and what is the fiscal year-end cap?",
              options: [
                "1.5 days/month, capped at 45 days",
                "2.5 days/month, capped at 60 days (120 during deployment)",
                "3 days/month, capped at 90 days",
                "2 days/month, no cap",
              ],
              correct: 1,
              explanation: "You earn 2.5 days of leave per month — 30 days per year. Any days above 60 at the end of the fiscal year (September 30) are forfeited unless you're deployed, in which case the cap rises to 120. Each forfeited day is real money lost.",
            },
            {
              question: "Why is it important to check your LES every month?",
              options: [
                "It's required by military regulation",
                "Finance offices don't make errors so it's purely informational",
                "To catch errors in BAH rate, TSP contributions, or deductions before they go unnoticed for months",
                "To verify your credit score",
              ],
              correct: 2,
              explanation: "Finance offices do make errors — wrong BAH rates after a PCS or marriage, missing TSP deductions, incorrect allowances. If you're not checking your LES monthly, those errors can compound for months before you notice. Five minutes a month reviewing your LES is one of the highest-ROI habits in the military.",
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
          <p className="text-muted-foreground">
            This lesson is being written. Check back soon.
          </p>
        </div>
      );
  }
}

// ─── Main page ────────────────────────────────────────────────────────────────

const STORAGE_COMPLETED = "mm-completed";
const STORAGE_UNLOCKED = "mm-unlocked";

export default function MilitaryMoneyPage() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [unlockedSections, setUnlockedSections] = useState<string[]>([SECTIONS[0].id]);
  const [activeSectionId, setActiveSectionId] = useState(SECTIONS[0].id);
  const [activeLessonId, setActiveLessonId] = useState(SECTIONS[0].lessons[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    try {
      const saved: string[] = JSON.parse(localStorage.getItem(STORAGE_COMPLETED) ?? "[]");
      const savedUnlocked: string[] = JSON.parse(localStorage.getItem(STORAGE_UNLOCKED) ?? "[]");
      setCompletedLessons(saved);
      setUnlockedSections([SECTIONS[0].id, ...savedUnlocked]);
    } catch {
      setUnlockedSections([SECTIONS[0].id]);
    }
  }, []);

  const markComplete = (lessonId: string) => {
    setCompletedLessons((prev) => {
      if (prev.includes(lessonId)) return prev;
      const next = [...prev, lessonId];
      localStorage.setItem(STORAGE_COMPLETED, JSON.stringify(next));
      return next;
    });
  };

  const unlockNextSection = (currentSectionId: string) => {
    const idx = SECTIONS.findIndex((s) => s.id === currentSectionId);
    if (idx < 0 || idx >= SECTIONS.length - 1) return;
    const nextId = SECTIONS[idx + 1].id;
    setUnlockedSections((prev) => {
      if (prev.includes(nextId)) return prev;
      const next = [...prev, nextId];
      localStorage.setItem(STORAGE_UNLOCKED, JSON.stringify(next.filter((id) => id !== SECTIONS[0].id)));
      return next;
    });
  };

  const activeSection = SECTIONS.find((s) => s.id === activeSectionId) ?? SECTIONS[0];
  const activeLessonIndex = activeSection.lessons.findIndex((l) => l.id === activeLessonId);
  const activeLesson = activeSection.lessons[activeLessonIndex];

  const allLessonsInSectionComplete = (section: typeof SECTIONS[0]) =>
    section.lessons
      .filter((l) => !l.isQuiz)
      .every((l) => completedLessons.includes(l.id));

  const handleNext = () => {
    markComplete(activeLessonId);

    if (!activeLesson.isQuiz) {
      const nextInSection = activeSection.lessons[activeLessonIndex + 1];
      if (nextInSection) {
        setActiveLessonId(nextInSection.id);
        return;
      }
    }

    const currentIdx = SECTIONS.findIndex((s) => s.id === activeSectionId);
    const nextSection = SECTIONS[currentIdx + 1];
    if (nextSection) {
      unlockNextSection(activeSectionId);
      setActiveSectionId(nextSection.id);
      setActiveLessonId(nextSection.lessons[0].id);
    }
  };

  const handleQuizPass = () => {
    markComplete(activeLessonId);
    unlockNextSection(activeSectionId);
  };

  const isLastLesson =
    activeLessonId === SECTIONS[SECTIONS.length - 1].lessons[SECTIONS[SECTIONS.length - 1].lessons.length - 1].id;

  const isSectionQuizLesson = activeLesson?.isQuiz;

  const canAdvance = isSectionQuizLesson
    ? completedLessons.includes(activeLessonId)
    : true;

  const sectionQuizId = activeSection.lessons.find((l) => l.isQuiz)?.id;
  const quizSectionUnlocked =
    activeSection.noQuiz || allLessonsInSectionComplete(activeSection);
  const isQuizLocked = activeLesson.isQuiz && !quizSectionUnlocked;

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      {/* Top bar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Link href="/courses" className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <div className="flex size-6 items-center justify-center rounded-md bg-foreground">
              <span className="text-[10px] font-bold text-background">VF</span>
            </div>
            <span className="hidden sm:inline">Vet Finance</span>
          </Link>
          <span className="text-muted-foreground/40">·</span>
          <span className="text-sm font-medium text-muted-foreground">Military Money</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground sm:hidden"
            onClick={() => setSidebarOpen((v) => !v)}
          >
            <BookOpen className="size-3.5" />
            Lessons
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? "flex" : "hidden"} sm:flex w-72 shrink-0 flex-col border-r border-border overflow-y-auto absolute sm:relative inset-0 top-14 bg-background z-10`}>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex size-7 items-center justify-center rounded-md text-sm" style={{ background: "var(--brand-600)15" }}>
                🎖️
              </div>
              <div>
                <p className="text-xs font-bold text-foreground leading-none">Military Money</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{completedLessons.length} lessons completed</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 px-3 pb-6">
            {SECTIONS.map((section) => {
              const isUnlocked = unlockedSections.includes(section.id);
              const isActive = section.id === activeSectionId;
              return (
                <div key={section.id} className="mb-1">
                  <button
                    disabled={!isUnlocked}
                    onClick={() => {
                      if (!isUnlocked) return;
                      setActiveSectionId(section.id);
                      setActiveLessonId(section.lessons[0].id);
                      setSidebarOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider transition-colors ${
                      isActive ? "text-foreground" : isUnlocked ? "text-muted-foreground hover:text-foreground" : "text-muted-foreground/40 cursor-not-allowed"
                    }`}
                  >
                    <span>{section.title}</span>
                    {!isUnlocked ? (
                      <Lock className="size-3 shrink-0" />
                    ) : (
                      <ChevronDown className={`size-3 shrink-0 transition-transform ${isActive ? "rotate-0" : "-rotate-90"}`} />
                    )}
                  </button>
                  {isActive && isUnlocked && (
                    <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-border pl-3">
                      {section.lessons.map((lesson) => {
                        const isDone = completedLessons.includes(lesson.id);
                        const isLessonActive = lesson.id === activeLessonId;
                        const isLessonQuizLocked = lesson.isQuiz && !allLessonsInSectionComplete(section);
                        return (
                          <button
                            key={lesson.id}
                            disabled={isLessonQuizLocked}
                            onClick={() => {
                              if (isLessonQuizLocked) return;
                              setActiveLessonId(lesson.id);
                              setSidebarOpen(false);
                            }}
                            className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors ${
                              isLessonActive ? "bg-muted font-medium text-foreground"
                              : isLessonQuizLocked ? "text-muted-foreground/40 cursor-not-allowed"
                              : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {isDone ? (
                              <CheckCircle2 className="size-3 shrink-0 text-green-500" />
                            ) : isLessonQuizLocked ? (
                              <Lock className="size-3 shrink-0" />
                            ) : (
                              <Circle className="size-3 shrink-0" />
                            )}
                            {lesson.title}
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

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-2xl px-6 py-10">
            {isQuizLocked ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Lock className="mb-4 size-8 text-muted-foreground" />
                <p className="font-semibold text-foreground">Complete all lessons first</p>
                <p className="mt-1 text-sm text-muted-foreground">Finish the lessons above to unlock this quiz.</p>
              </div>
            ) : (
              <LessonContent lessonId={activeLessonId} onQuizPass={handleQuizPass} />
            )}

            {/* Navigation */}
            {!isQuizLocked && (
              <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
                <button
                  onClick={() => {
                    if (activeLessonIndex > 0) {
                      setActiveLessonId(activeSection.lessons[activeLessonIndex - 1].id);
                    } else {
                      const currentIdx = SECTIONS.findIndex((s) => s.id === activeSectionId);
                      if (currentIdx > 0) {
                        const prev = SECTIONS[currentIdx - 1];
                        setActiveSectionId(prev.id);
                        setActiveLessonId(prev.lessons[prev.lessons.length - 1].id);
                      }
                    }
                  }}
                  disabled={activeSectionId === SECTIONS[0].id && activeLessonIndex === 0}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="size-4" />
                  Previous
                </button>

                {!isLastLesson && (
                  <button
                    onClick={handleNext}
                    disabled={!canAdvance}
                    className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{ background: "var(--brand-600)" }}
                  >
                    {isSectionQuizLesson ? "Next Section" : "Next Lesson"}
                    <ChevronRight className="size-4" />
                  </button>
                )}

                {isLastLesson && (
                  <Link
                    href="/courses"
                    className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                    style={{ background: "var(--brand-600)" }}
                  >
                    Back to Courses
                    <ChevronRight className="size-4" />
                  </Link>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
