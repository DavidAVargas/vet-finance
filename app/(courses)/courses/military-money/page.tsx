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
import { ThemeToggle } from "@/components/DarkLightMode/theme-toggle";
import Link from "next/link";

// ─── Mock user ────────────────────────────────────────────────────────────────

const mockUser = { name: "David", rank: "Veteran" };

// ─── Course structure ─────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: "active-duty-pay",
    title: "Active Duty Pay",
    noQuiz: true,
    lessons: [
      { id: "amp-1", title: "Your LES — What All Those Numbers Mean" },
      { id: "amp-2", title: "BAH, BAS, and the Tax-Free Advantage" },
    ],
  },
  {
    id: "tsp-retirement",
    title: "TSP & Retirement",
    noQuiz: true,
    lessons: [
      { id: "tsp-1", title: "The Blended Retirement System" },
      { id: "tsp-2", title: "The Combat Zone TSP Trick" },
    ],
  },
  {
    id: "va-home-loan",
    title: "The VA Home Loan",
    noQuiz: true,
    lessons: [
      { id: "va-1", title: "Why This Is Your Biggest Benefit" },
      { id: "va-2", title: "How to Actually Use It" },
    ],
  },
  {
    id: "education-benefits",
    title: "Education Benefits",
    noQuiz: true,
    lessons: [
      { id: "ed-1", title: "GI Bill vs. VR&E — Know the Difference" },
      { id: "ed-2", title: "Getting Every Dollar You're Owed" },
    ],
  },
  {
    id: "va-disability",
    title: "VA Disability & Healthcare",
    noQuiz: true,
    lessons: [
      { id: "dis-1", title: "How Ratings Work and Why They Matter" },
      { id: "dis-2", title: "What Each Rating Unlocks" },
    ],
  },
  {
    id: "hidden-benefits",
    title: "The Hidden Stuff",
    noQuiz: true,
    lessons: [
      { id: "hid-1", title: "Benefits Most Vets Never Claim" },
      { id: "hid-2", title: "State Benefits and Federal Hiring" },
    ],
  },
];

// ─── Lesson content ───────────────────────────────────────────────────────────

function LessonContent({ lessonId }: { lessonId: string }) {
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


    case "tsp-1":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            TSP & Retirement · Lesson 1
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            The Blended Retirement System
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Before 2018, the military ran on a simple deal: serve 20 years and
            get a pension for life. If you left at 19 years and 11 months, you
            got nothing. That system is gone for most servicemembers today.
            The Blended Retirement System — BRS — replaced it, and
            understanding it is the difference between leaving the military
            with a head start on retirement or leaving with nothing.
          </p>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-4 font-semibold text-foreground">Old system vs. BRS — what changed</p>
            <div className="grid grid-cols-3 gap-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              <p></p>
              <p>Legacy (pre-2018)</p>
              <p>BRS (current)</p>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: "Pension after 20 yrs", legacy: "2.5% × years × base pay", brs: "2.0% × years × base pay" },
                { label: "TSP matching", legacy: "None", brs: "Up to 5% of base pay matched" },
                { label: "If you leave before 20 yrs", legacy: "No pension, no TSP match", brs: "Keep TSP + matching (vested after 2 yrs)" },
                { label: "Continuation bonus", legacy: "Not applicable", brs: "Lump sum at 12 yrs if you re-up 4 more" },
                { label: "Who it benefits most", legacy: "Career servicemembers (20+ yrs)", brs: "Everyone, especially those who serve 4–12 yrs" },
              ].map(({ label, legacy, brs }) => (
                <div key={label} className="grid grid-cols-3 gap-3 border-b border-border pb-3 last:border-0 last:pb-0 text-sm">
                  <p className="font-medium text-foreground">{label}</p>
                  <p className="text-muted-foreground">{legacy}</p>
                  <p className="text-muted-foreground">{brs}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">The TSP match — free money you should never leave behind</p>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              Under BRS, the government automatically contributes 1% of your
              base pay to your TSP whether you contribute or not. Then they
              match your contributions dollar-for-dollar up to 3%, and 50
              cents on the dollar for the next 2%. Here&apos;s what that looks like:
            </p>
            <div className="flex flex-col gap-2 mb-4">
              {[
                { you: "0%", gov: "1%", total: "1%" },
                { you: "1%", gov: "2%", total: "3%" },
                { you: "3%", gov: "4%", total: "7%" },
                { you: "5%", gov: "5%", total: "10%", highlight: true },
              ].map(({ you, gov, total, highlight }) => (
                <div
                  key={you}
                  className={`grid grid-cols-3 gap-3 rounded-lg px-3 py-2 text-sm ${highlight ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                  style={highlight ? { background: "var(--brand-600)15", border: "1px solid var(--brand-600)30" } : {}}
                >
                  <p>You contribute: {you}</p>
                  <p>Gov adds: {gov}</p>
                  <p>Total: {total}</p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Contributing 5% of your base pay gets you the full 5% government
              match — that&apos;s a 100% instant return on that portion of your
              money. There is no investment on earth that guarantees that.
              If you&apos;re not contributing at least 5%, you are leaving free
              money on the table every single month.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">Vesting — when the match is actually yours</p>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              The automatic 1% contribution vests after 2 years of service.
              The matching contributions vest immediately. So after 2 years,
              everything in your TSP — your contributions, the match, and the
              automatic 1% — is fully yours even if you leave the military.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              This is a massive shift from the old system. Under legacy
              retirement, leaving at 10 years meant walking away with zero.
              Under BRS, 10 years of 5% contributions with full matching
              can mean six figures in your TSP before you ever transition out.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">Traditional TSP vs. Roth TSP — which one?</p>
            <div className="flex flex-col gap-3">
              {[
                {
                  label: "Traditional TSP",
                  body: "Contributions reduce your taxable income now. You pay taxes when you withdraw in retirement. Best if you expect to be in a lower tax bracket in retirement than you are today.",
                },
                {
                  label: "Roth TSP",
                  body: "Contributions come from after-tax dollars. Growth and withdrawals in retirement are completely tax-free. Best if you're early in your career (lower income now = lower tax rate now). Also the right call during combat zone deployments — more on that next lesson.",
                },
              ].map(({ label, body }) => (
                <div key={label} className="rounded-xl border border-border p-4">
                  <p className="mb-1 text-sm font-semibold text-foreground">{label}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Note: Government matching always goes into traditional TSP regardless of which you choose.
            </p>
          </div>

          <div className="rounded-xl p-5 text-white" style={{ background: "var(--brand-600)" }}>
            <p className="mb-1 font-bold">The action item</p>
            <p className="text-sm leading-relaxed text-white/85">
              Log into myPay and make sure you&apos;re contributing at least 5% of
              your base pay to TSP. If you&apos;re junior enlisted and money is tight,
              even 3–4% gets you most of the match. If you can swing 5%, do it —
              the match is the best guaranteed return you&apos;ll ever get. Early in
              your career, lean toward Roth TSP. You&apos;re in a lower tax bracket
              now than you&apos;ll likely be later, and tax-free growth over 20–30
              years is a powerful thing.
            </p>
          </div>
        </div>
      );

    case "tsp-2":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            TSP & Retirement · Lesson 2
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            The Combat Zone TSP Trick
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            This is one of the most underused financial moves in the military.
            Most servicemembers know that combat zone pay is tax-free. Fewer
            know that when you contribute that tax-free pay into a Roth TSP,
            those dollars go in tax-free AND come out tax-free in retirement.
            That&apos;s something civilians literally cannot do — no matter how
            much they earn.
          </p>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">How the math works normally</p>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              With a regular Roth IRA or Roth TSP, you contribute money
              that&apos;s already been taxed. It grows tax-free, and you withdraw
              it tax-free. You pay tax once — on the way in.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              In a combat zone, your pay is excluded from federal income tax.
              When you contribute that tax-excluded pay into a Roth TSP, you
              never pay tax on it at all — not going in, not coming out.
              These are called <span className="font-semibold text-foreground">tax-exempt contributions</span>,
              and they are only available to servicemembers deployed to a
              combat zone.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-4 font-semibold text-foreground">Regular Roth vs. Combat Zone Roth TSP</p>
            <div className="grid grid-cols-3 gap-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              <p></p>
              <p>Regular Roth</p>
              <p>Combat Zone Roth TSP</p>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: "Taxed going in?", regular: "Yes (after-tax dollars)", combat: "No — pay already excluded" },
                { label: "Growth taxed?", regular: "No", combat: "No" },
                { label: "Withdrawals taxed?", regular: "No", combat: "No" },
                { label: "Tax paid at any point?", regular: "Once (on contribution)", combat: "Never" },
                { label: "Annual contribution limit", regular: "$7,000 (2025, IRA)", combat: "$70,000 (2025, total TSP)" },
              ].map(({ label, regular, combat }) => (
                <div key={label} className="grid grid-cols-3 gap-3 border-b border-border pb-3 last:border-0 last:pb-0 text-sm">
                  <p className="font-medium text-foreground">{label}</p>
                  <p className="text-muted-foreground">{regular}</p>
                  <p className="text-muted-foreground">{combat}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">The contribution limit advantage</p>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              In 2025 a civilian can contribute a maximum of $23,500/year to
              a 401(k) or $7,000 to an IRA. During a combat zone deployment,
              the TSP&apos;s annual limit rises to $70,000 — the IRS limit for
              defined contribution plans. A 6-month deployment with aggressive
              saving could mean $30,000–$40,000+ in tax-exempt Roth TSP
              contributions in a single year.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              At 7% annual growth over 25 years, $35,000 in tax-exempt Roth
              TSP contributions from one deployment becomes roughly $190,000 —
              all of it completely tax-free when you pull it out in retirement.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">How to set this up before deployment</p>
            <div className="flex flex-col gap-3">
              {[
                { num: "1", title: "Switch your TSP election to Roth", body: "Log into myPay or TSP.gov and change your contribution type from Traditional to Roth before you deploy. Do this early — it can take a pay cycle to process." },
                { num: "2", title: "Increase your contribution percentage", body: "During deployment your expenses drop dramatically — no rent if you're on base, meals often provided, nothing to spend money on. Increase your TSP contribution to capture as much of that tax-free pay as possible." },
                { num: "3", title: "Watch the annual limit", body: "You can contribute up to $70,000 total to TSP in a year during a combat deployment. The standard $23,500 limit doesn't apply while you're in the zone. Don't over-contribute beyond that though — excess contributions get returned." },
                { num: "4", title: "Switch back after returning", body: "When you return from deployment, consider your tax situation. If you're back to taxable income, Traditional TSP might make more sense again depending on your bracket." },
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
            <p className="mb-1 font-bold">Why this matters long-term</p>
            <p className="text-sm leading-relaxed text-white/85">
              A single 6–9 month combat deployment, managed correctly, can
              fund a meaningful chunk of your retirement with money that will
              never be taxed again. Most servicemembers come home and spend
              the money they saved. The ones who build wealth use that window
              to stack tax-exempt Roth TSP contributions they can never
              replicate as civilians. It&apos;s one of the few irreplaceable
              financial advantages of military service — and most people
              never use it.
            </p>
          </div>
        </div>
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
    section.lessons.every((l) => completedLessons.includes(l.id));

  const handleNext = () => {
    markComplete(activeLessonId);

    const nextInSection = activeSection.lessons[activeLessonIndex + 1];
    if (nextInSection) {
      setActiveLessonId(nextInSection.id);
      return;
    }

    const currentIdx = SECTIONS.findIndex((s) => s.id === activeSectionId);
    const nextSection = SECTIONS[currentIdx + 1];
    if (nextSection) {
      unlockNextSection(activeSectionId);
      setActiveSectionId(nextSection.id);
      setActiveLessonId(nextSection.lessons[0].id);
    }
  };

  const isLastLesson =
    activeLessonId === SECTIONS[SECTIONS.length - 1].lessons[SECTIONS[SECTIONS.length - 1].lessons.length - 1].id;

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
                        const isLessonQuizLocked = false;
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
              <LessonContent lessonId={activeLessonId} />

            {/* Navigation */}
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
                  className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  style={{ background: "var(--brand-600)" }}
                >
                  Next Lesson
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
          </div>
        </main>
      </div>
    </div>
  );
}
