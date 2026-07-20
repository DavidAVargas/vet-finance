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


    case "va-1":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            The VA Home Loan · Lesson 1
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            Why This Is Your Biggest Benefit
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            The VA Home Loan is the single most powerful financial benefit
            most veterans never fully use. No down payment. No private
            mortgage insurance. Competitive interest rates. And you can use
            it more than once. A civilian buying the same house pays tens of
            thousands of dollars more over the life of the loan just because
            they don&apos;t have this benefit. You do.
          </p>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-4 font-semibold text-foreground">VA loan vs. conventional loan — the real numbers</p>
            <p className="mb-4 text-sm text-muted-foreground">Buying a $350,000 home:</p>
            <div className="grid grid-cols-3 gap-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              <p></p>
              <p>Conventional (5% down)</p>
              <p>VA Loan</p>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: "Down payment required", conv: "$17,500", va: "$0" },
                { label: "PMI (private mortgage insurance)", conv: "~$150–$200/mo until 20% equity", va: "None — ever" },
                { label: "Interest rate (typical)", conv: "7.0–7.5%", va: "6.5–7.0% (often lower)" },
                { label: "Funding fee (first use)", conv: "N/A", va: "2.15% of loan (one-time, can be financed)" },
                { label: "10-year PMI cost", conv: "~$18,000–$24,000", va: "$0" },
                { label: "Cash needed to close", conv: "$17,500+", va: "Funding fee only (or $0 if exempt)" },
              ].map(({ label, conv, va }) => (
                <div key={label} className="grid grid-cols-3 gap-3 border-b border-border pb-3 last:border-0 last:pb-0 text-sm">
                  <p className="font-medium text-foreground">{label}</p>
                  <p className="text-muted-foreground">{conv}</p>
                  <p className="font-medium" style={{ color: "var(--brand-600)" }}>{va}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              On a $350,000 home, not having PMI alone saves a veteran $18,000–$24,000 over the first 10 years.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">The benefits most people miss</p>
            <div className="flex flex-col gap-3">
              {[
                {
                  title: "No PMI — ever",
                  body: "Conventional loans require PMI until you hit 20% equity. On a $350k home that can be $150–$200/month for 7–10 years. VA loans never charge PMI at any loan-to-value ratio.",
                },
                {
                  title: "It's reusable",
                  body: "You don't just get one VA loan. You can use it multiple times over your lifetime. Buy a starter home, sell it, restore your entitlement, and buy again. Or in some cases keep the first home and buy a second with remaining entitlement.",
                },
                {
                  title: "Funding fee exemption for disabled vets",
                  body: "If you have a VA service-connected disability rating of 10% or higher, the funding fee is completely waived. That's a savings of $7,525 on a $350k loan. If you get a disability rating after closing, you can request a refund of the funding fee you paid.",
                },
                {
                  title: "Seller can pay your closing costs",
                  body: "VA loans allow sellers to pay up to 4% of the loan amount in concessions — including your closing costs, funding fee, and even paying down debt on your behalf. In the right market, you can close with truly $0 out of pocket.",
                },
                {
                  title: "No prepayment penalty",
                  body: "Pay it off early with no penalty. Extra payments go straight to principal.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-border p-4">
                  <p className="mb-1 text-sm font-semibold text-foreground">{title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">Who qualifies</p>
            <div className="flex flex-col gap-2 text-sm">
              {[
                "90+ days active duty during wartime",
                "181+ days active duty during peacetime",
                "6+ years in the National Guard or Reserves",
                "Surviving spouse of a servicemember who died in service or from a service-connected disability",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 border-b border-border pb-2 last:border-0 last:pb-0">
                  <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: "var(--brand-600)" }}>✓</span>
                  <p className="text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Must have been discharged under conditions other than dishonorable. Your Certificate of Eligibility (COE) confirms your entitlement — your lender can pull this for you.</p>
          </div>

          <div className="rounded-xl p-5 text-white" style={{ background: "var(--brand-600)" }}>
            <p className="mb-1 font-bold">Why most vets don&apos;t use it</p>
            <p className="text-sm leading-relaxed text-white/85">
              Most veterans either don&apos;t know they have it, don&apos;t think they
              qualify, or are talked out of it by lenders or real estate
              agents who aren&apos;t familiar with it. Some sellers have historically
              been skeptical of VA offers — but that bias has faded as VA loans
              have become more common. Work with a lender who specializes in
              VA loans and an agent who knows how to write a strong VA offer.
              Don&apos;t leave this benefit on the table.
            </p>
          </div>
        </div>
      );

    case "va-2":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            The VA Home Loan · Lesson 2
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            How to Actually Use It — Including House Hacking
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Using your VA loan to buy a single-family home is good. Using it
            to buy a duplex, triplex, or fourplex — living in one unit and
            renting the others — is a level up. This strategy is called house
            hacking, and the VA loan makes it more accessible than any other
            loan product available.
          </p>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">What is house hacking?</p>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              House hacking means buying a multi-unit property, living in
              one unit, and renting out the others. The rental income from
              your tenants covers part or all of your mortgage. In the
              best cases, you live for free — or close to it — while building
              equity in a property someone else is paying for.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The VA loan allows you to buy properties with up to 4 units
              as long as you live in one of them as your primary residence.
              Combined with no down payment and no PMI, this is one of the
              most powerful wealth-building moves available to any veteran.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-4 font-semibold text-foreground">The house hacking math — real example</p>
            <p className="mb-4 text-sm text-muted-foreground">Buying a $400,000 triplex with a VA loan:</p>
            <div className="flex flex-col gap-2 mb-4">
              {[
                { label: "Down payment", value: "$0" },
                { label: "Monthly mortgage (6.75%, 30yr)", value: "~$2,594/mo" },
                { label: "Unit 2 rent", value: "$1,100/mo" },
                { label: "Unit 3 rent", value: "$1,100/mo" },
                { label: "Your effective housing cost", value: "~$394/mo", highlight: true },
              ].map(({ label, value, highlight }) => (
                <div
                  key={label}
                  className={`flex items-center justify-between border-b border-border pb-2 last:border-0 last:pb-0 text-sm ${highlight ? "font-bold" : ""}`}
                >
                  <p className={highlight ? "text-foreground" : "text-muted-foreground"}>{label}</p>
                  <p className={highlight ? "text-foreground" : "text-foreground font-semibold"}
                    style={highlight ? { color: "var(--brand-600)" } : {}}>{value}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Instead of paying $2,594/month in rent or mortgage, you pay ~$394/month — while building equity in a $400k asset. Your tenants are covering the rest. In many markets, rents cover the full mortgage and you live completely free.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">Why this beats a single-family home</p>
            <div className="flex flex-col gap-3">
              {[
                {
                  title: "Your housing cost drops dramatically",
                  body: "The rental income from other units offsets your mortgage. Instead of your full payment coming out of your pocket every month, tenants cover most of it.",
                },
                {
                  title: "You build equity with no money down",
                  body: "You're not just avoiding rent — you're building ownership in an asset that appreciates over time. Every mortgage payment (mostly paid by tenants) builds your net worth.",
                },
                {
                  title: "You qualify using projected rental income",
                  body: "VA lenders can count a percentage of the expected rental income from the other units when calculating your debt-to-income ratio. This means you can qualify for a larger loan than you could on your income alone.",
                },
                {
                  title: "You can do it again",
                  body: "The VA loan is reusable. After you move out — PCS, upgrade, whatever — you can rent your unit too, turning the whole property into a cash-flowing investment. Then use your restored VA entitlement to buy your next home.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="flex gap-4">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: "var(--brand-600)" }}>✓</span>
                  <div>
                    <p className="mb-1 text-sm font-semibold text-foreground">{title}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-4 font-semibold text-foreground">How to get started — step by step</p>
            <div className="flex flex-col gap-3">
              {[
                { num: "1", title: "Get your Certificate of Eligibility (COE)", body: "Your lender can pull this directly from the VA system — you usually don't need to request it yourself. It confirms your entitlement amount. You can also get it at va.gov." },
                { num: "2", title: "Find a VA-experienced lender", body: "Not all lenders know VA loans well. Use one that does a high volume of VA loans — they'll know how to handle multi-unit properties, appraisal issues, and seller concession negotiations. Navy Federal, USAA, and Veterans United are good starting points." },
                { num: "3", title: "Get pre-approved before you search", body: "A pre-approval letter makes your offer competitive. For a multi-unit property, your lender will want to see the expected rental income — have market comps ready." },
                { num: "4", title: "Look for 2–4 unit properties in your target area", body: "Duplexes, triplexes, and fourplexes. The VA requires one unit to be your primary residence. Stay in it for at least a year — that's the occupancy requirement." },
                { num: "5", title: "Check if you're exempt from the funding fee", body: "10%+ service-connected disability = no funding fee. If you're not yet rated, consider filing a claim before closing. If you get rated after closing, request a refund from the VA." },
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

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">Things to know before you buy multi-unit</p>
            <div className="flex flex-col gap-2 text-sm">
              {[
                { label: "Occupancy requirement", note: "You must move in within 60 days of closing and live there as your primary residence." },
                { label: "Property condition", note: "VA appraisers check that the property meets Minimum Property Requirements (MPR). Multi-unit fixer-uppers may not pass — look for properties in livable condition." },
                { label: "Being a landlord", note: "You'll be managing tenants. Screen them carefully. A bad tenant can eliminate the financial advantage entirely. Start with one property and learn before scaling." },
                { label: "Reserve funds", note: "Set aside 3–6 months of mortgage payments as a reserve in case of vacancies or repairs. Even if the rent covers the mortgage, have a cushion." },
              ].map(({ label, note }) => (
                <div key={label} className="flex gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
                  <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-muted-foreground">!</span>
                  <div>
                    <p className="font-semibold text-foreground">{label}</p>
                    <p className="text-muted-foreground">{note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-5 text-white" style={{ background: "var(--brand-600)" }}>
            <p className="mb-1 font-bold">The big picture</p>
            <p className="text-sm leading-relaxed text-white/85">
              Most people use their VA loan to buy a single-family home and
              call it done. That&apos;s fine. But if you use it to buy a duplex
              or triplex with no money down, live in one unit, and let tenants
              pay your mortgage — you&apos;re building wealth in a way most people
              your age can&apos;t touch. A few years later you move out, rent that
              unit too, and now you own a fully cash-flowing rental property.
              Use your VA loan again for the next house. This is how military
              members build real wealth on a servicemember&apos;s income.
            </p>
          </div>
        </div>
      );

    case "ed-1":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Education Benefits · Lesson 1
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            GI Bill vs. VR&amp;E — Know the Difference
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Most veterans know they have education benefits. Fewer know that
            there are two separate programs — the GI Bill and Vocational
            Rehabilitation &amp; Employment (VR&amp;E) — and that choosing the wrong
            one can cost you thousands of dollars and years of flexibility.
            Here&apos;s how they actually compare.
          </p>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">Post-9/11 GI Bill (Chapter 33)</p>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              The most commonly used education benefit. If you served 90+
              days on active duty after September 10, 2001, you likely qualify.
              At 36 months of entitlement (the max), it covers:
            </p>
            <div className="flex flex-col gap-2 mb-4">
              {[
                { label: "Tuition & fees", value: "100% at public in-state schools; capped at ~$28,937/yr at private schools (2024–25)" },
                { label: "Monthly housing allowance", value: "E-5 with dependents BAH rate for your school's zip code — while attending more than half-time" },
                { label: "Books & supplies", value: "Up to $1,000/yr" },
                { label: "Yellow Ribbon Program", value: "For private schools above the cap — school and VA split the difference" },
                { label: "Time limit", value: "15 years from your last discharge date to use it" },
                { label: "Who qualifies", value: "Veterans, active duty, and in some cases dependents (transferability)" },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-0.5 border-b border-border pb-2 last:border-0 last:pb-0 text-sm">
                  <p className="font-semibold text-foreground">{label}</p>
                  <p className="text-muted-foreground">{value}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              The housing allowance is paid based on the zip code of your school — not where you live. Online-only students receive half the national average BAH (~$1,050/mo in 2024), not the local rate.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">VR&amp;E — Vocational Rehabilitation &amp; Employment (Chapter 31)</p>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              VR&amp;E is for veterans with a service-connected disability rating
              of 10% or higher who have an employment handicap due to that
              disability. It&apos;s more restrictive to qualify for — but if you do,
              it&apos;s often significantly better than the GI Bill.
            </p>
            <div className="flex flex-col gap-2 mb-4">
              {[
                { label: "Tuition & fees", value: "Paid directly — no cap. Covers private schools and grad programs that would exceed GI Bill limits" },
                { label: "Books & supplies", value: "Covered — no dollar cap" },
                { label: "Subsistence allowance", value: "Monthly living stipend paid on top of everything else — similar to BAH but separate" },
                { label: "Scope", value: "Covers certifications, trade school, non-degree programs, and tools/equipment for your field" },
                { label: "Time limit", value: "No hard expiration if your disability is the reason you need training" },
                { label: "Who qualifies", value: "Vets with 10%+ service-connected disability rating AND an employment handicap" },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-0.5 border-b border-border pb-2 last:border-0 last:pb-0 text-sm">
                  <p className="font-semibold text-foreground">{label}</p>
                  <p className="text-muted-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-4 font-semibold text-foreground">GI Bill vs. VR&amp;E — side by side</p>
            <div className="grid grid-cols-3 gap-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              <p></p>
              <p>GI Bill (Ch. 33)</p>
              <p>VR&amp;E (Ch. 31)</p>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: "Tuition cap", gi: "~$28,937/yr private", vre: "No cap — full cost paid" },
                { label: "Grad school", gi: "Yes, within cap", vre: "Yes, no cap if disability-related" },
                { label: "Trade / cert programs", gi: "Limited", vre: "Yes, broadly covered" },
                { label: "Monthly living stipend", gi: "BAH rate (school zip)", vre: "Subsistence allowance + can stack with BAH" },
                { label: "Books / supplies", gi: "Up to $1,000/yr", vre: "Fully covered, no cap" },
                { label: "Disability rating required", gi: "No", vre: "Yes — 10%+ with employment handicap" },
                { label: "Time limit", gi: "15 yrs from discharge", vre: "No limit if disability-related" },
              ].map(({ label, gi, vre }) => (
                <div key={label} className="grid grid-cols-3 gap-3 border-b border-border pb-3 last:border-0 last:pb-0 text-sm">
                  <p className="font-medium text-foreground">{label}</p>
                  <p className="text-muted-foreground">{gi}</p>
                  <p className="font-medium" style={{ color: "var(--brand-600)" }}>{vre}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-5 text-white" style={{ background: "var(--brand-600)" }}>
            <p className="mb-1 font-bold">Which one should you use?</p>
            <p className="text-sm leading-relaxed text-white/85">
              If you have a 10%+ disability rating and an employment handicap,
              apply for VR&amp;E first — especially if you&apos;re going to a private
              school, grad program, or trade certification. The tuition coverage
              is uncapped, the subsistence allowance is on top, and there&apos;s
              no expiration if your disability is the driver. Save the GI Bill
              for situations where VR&amp;E doesn&apos;t apply, or transfer it to a
              dependent. Don&apos;t burn your GI Bill when VR&amp;E would cover the
              same cost for free.
            </p>
          </div>
        </div>
      );

    case "ed-2":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Education Benefits · Lesson 2
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            Getting Every Dollar You&apos;re Owed
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            The GI Bill and VR&amp;E are just the starting point. There are
            stacking strategies, state-level benefits, and common mistakes
            that determine whether you get the full value of your education
            benefits or leave money behind. Here&apos;s what you need to know.
          </p>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">The BAH rate nobody talks about</p>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              The GI Bill housing allowance is based on the E-5 with
              dependents BAH rate for your school&apos;s zip code — regardless
              of your actual rank or whether you have dependents. This is
              a flat rate that has nothing to do with your military record.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              In high cost-of-living areas this can be substantial. A vet
              attending a school in San Diego could receive $3,200–$3,500/month
              in housing allowance — tax-free — while in school full time.
              That&apos;s on top of tuition being paid directly to the school.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              {[
                { label: "In-person, half-time+", value: "Full E-5 w/ dependents BAH for school zip" },
                { label: "Online only", value: "Half the national average BAH (~$1,050/mo)" },
                { label: "Mix of in-person + online", value: "Prorated based on in-person credit hours" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start justify-between gap-4 border-b border-border pb-2 last:border-0 last:pb-0">
                  <p className="text-muted-foreground">{label}</p>
                  <p className="font-semibold text-foreground text-right">{value}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              This means going to school in person — even one day a week — triggers the full local BAH rate instead of the reduced online rate. If your school offers hybrid options, take at least some in-person credits.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">Transfer your GI Bill to a dependent</p>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              If you don&apos;t need your GI Bill for yourself, you can transfer
              unused months to a spouse or child — but only while you&apos;re
              still on active duty, and only if you commit to at least 4
              more years of service (or until 20 years, whichever comes first).
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              This is a massive benefit for military families. A spouse can
              use it to finish a degree, or you can bank it for a child to
              use after they turn 18. The transfer must be approved through
              milConnect before you leave active duty — you cannot transfer
              it after separation.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">State education benefits — the hidden layer</p>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              On top of federal benefits, many states offer their own
              education programs for veterans and their families. These
              can stack on top of the GI Bill.
            </p>
            <div className="flex flex-col gap-3">
              {[
                {
                  title: "Free or reduced tuition at state schools",
                  body: "Some states waive tuition entirely at public universities for eligible veterans — Texas, Illinois, and others have strong programs. Check your state's veterans affairs website.",
                },
                {
                  title: "Dependent tuition waivers",
                  body: "Several states extend tuition waivers to children and spouses of disabled veterans or veterans killed in action. These can stack with federal education benefits.",
                },
                {
                  title: "Fry Scholarship",
                  body: "For children and surviving spouses of servicemembers who died in the line of duty on or after September 11, 2001. Provides the same GI Bill benefits — full tuition, BAH, and book stipend.",
                },
                {
                  title: "DEA — Dependents Educational Assistance (Chapter 35)",
                  body: "For spouses and children of veterans who are permanently and totally disabled, or who died from a service-connected condition. Monthly stipend for education — separate from GI Bill entitlement.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-border p-4">
                  <p className="mb-1 text-sm font-semibold text-foreground">{title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">Common mistakes that cost veterans money</p>
            <div className="flex flex-col gap-3">
              {[
                {
                  mistake: "Using GI Bill at a for-profit school",
                  fix: "For-profit colleges routinely consume veterans' GI Bill entitlement while delivering degrees with limited job market value. Maximize your benefit at a public university or reputable private school. Research graduate outcomes before you commit.",
                },
                {
                  mistake: "Going fully online to \"save time\" when local BAH is high",
                  fix: "Online-only students get half the national average BAH instead of the local rate. In a high-cost city, taking even one in-person class can be worth $1,000–$2,000 more per month in housing allowance.",
                },
                {
                  mistake: "Not applying for VR&E before using GI Bill",
                  fix: "If you have a 10%+ disability rating, apply for VR&E first. If you qualify, it covers more and has no expiration. You can always fall back to GI Bill — you can't un-burn months you already used.",
                },
                {
                  mistake: "Forgetting to check state benefits",
                  fix: "Federal benefits and state benefits are separate programs that can often be stacked. Google your state's name + \"veteran education benefits\" and check what your state offers on top of the GI Bill.",
                },
                {
                  mistake: "Not transferring GI Bill before leaving active duty",
                  fix: "Transfer must happen while on active duty with enough service commitment remaining. If you wait until after separation, it's too late.",
                },
              ].map(({ mistake, fix }) => (
                <div key={mistake} className="rounded-xl border border-border p-4">
                  <p className="mb-1 text-sm font-semibold text-red-500">{mistake}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{fix}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-5 text-white" style={{ background: "var(--brand-600)" }}>
            <p className="mb-1 font-bold">Make it count</p>
            <p className="text-sm leading-relaxed text-white/85">
              You earned these benefits. The GI Bill and VR&amp;E combined are
              worth $100,000+ in real value if used well — and far less if
              wasted on the wrong school or the wrong program. Check your
              state benefits, apply for VR&amp;E if you have a disability rating,
              go in-person when the BAH math makes it worth it, and protect
              your months. This benefit doesn&apos;t roll over to a savings account
              if you don&apos;t use it — but used right, it can fund a career change,
              a degree, or your kids&apos; entire college education.
            </p>
          </div>
        </div>
      );

    case "dis-1":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            VA Disability & Healthcare · Lesson 1
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            How Ratings Work and Why They Matter
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            A VA disability rating is a percentage the VA assigns based on
            how much a service-connected condition affects your ability to
            function. It determines your monthly tax-free compensation, your
            healthcare access, and a cascade of other benefits. Most veterans
            are underrated — or never file at all. That&apos;s money and benefits
            left on the table permanently.
          </p>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">What "service-connected" means</p>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              A condition is service-connected if it was caused by, aggravated
              by, or directly related to your military service. This is broader
              than most people think. It includes:
            </p>
            <div className="flex flex-col gap-2">
              {[
                "Physical injuries from training, combat, or accidents during service",
                "Conditions that existed before service but were made worse by service",
                "Hearing loss or tinnitus from noise exposure (one of the most common claims)",
                "Mental health conditions like PTSD, depression, or anxiety related to service",
                "Toxic exposure conditions — burn pits, Agent Orange, radiation (PACT Act expanded eligibility significantly)",
                "Musculoskeletal issues from physical demands of service (knees, back, shoulders)",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 border-b border-border pb-2 last:border-0 last:pb-0 text-sm">
                  <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: "var(--brand-600)" }}>✓</span>
                  <p className="text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">How the rating percentage works</p>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              Ratings go from 0% to 100% in 10% increments. A 0% rating means
              the condition is service-connected but not currently disabling
              enough to warrant compensation — it still matters because it
              opens the door to future claims if it worsens.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              When you have multiple conditions, the VA uses a &quot;whole person&quot;
              method — not simple addition. If your first condition is rated
              40%, the VA treats you as 60% able-bodied. A second condition
              rated 20% applies to that remaining 60%, adding 12 points for
              a combined 52% — rounded to 50%. This is why having many
              conditions doesn&apos;t simply add up to 100%.
            </p>
            <div className="rounded-lg bg-muted/40 p-4 text-sm">
              <p className="mb-2 font-semibold text-foreground">Example: combined rating math</p>
              <div className="flex flex-col gap-1 text-muted-foreground">
                <p>Condition 1: 40% → leaves 60% "whole person"</p>
                <p>Condition 2: 20% of 60% = 12 → combined 52%</p>
                <p>Condition 3: 10% of 48% = ~5 → combined 57%</p>
                <p className="mt-1 font-medium text-foreground">VA rounds to nearest 10% → rated at 60%</p>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">How to file a claim</p>
            <div className="flex flex-col gap-3">
              {[
                { num: "1", title: "Gather your evidence", body: "Service records, medical records from service, and current treatment records. The VA needs a nexus — a connection between your service and your condition. A doctor's \"nexus letter\" is extremely helpful." },
                { num: "2", title: "File at va.gov or with a VSO", body: "You can file online at va.gov/disability. A Veterans Service Organization (VSO) — DAV, VFW, American Legion — can help you file for free. They know the system and can help you avoid common mistakes." },
                { num: "3", title: "Claim everything", body: "Don't self-filter. File claims for every condition that relates to your service, even if it seems minor. A 10% rating you didn't claim is money you're not receiving." },
                { num: "4", title: "Appeal if you're underrated", body: "If you believe your rating is wrong, appeal. Many veterans are initially underrated. The supplemental claim process allows you to submit new evidence without starting over." },
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
            <p className="mb-1 font-bold">File your claim — don&apos;t wait</p>
            <p className="text-sm leading-relaxed text-white/85">
              Every month you don&apos;t have a rating is a month of compensation
              you can&apos;t recover. The effective date of your claim matters —
              the VA pays back to the date you filed, not when they finish
              processing it. Filing now and waiting beats waiting to file.
              Even if your conditions feel manageable today, service-connected
              conditions tend to worsen over time. Get them on record now.
            </p>
          </div>
        </div>
      );

    case "dis-2":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            VA Disability & Healthcare · Lesson 2
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            What Each Rating Unlocks
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Your disability rating isn&apos;t just a number — it&apos;s a key that
            unlocks different layers of benefits. Each threshold you cross
            adds compensation, healthcare access, and other perks that stack
            on each other. Here&apos;s what each level actually means in
            practical terms.
          </p>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-4 font-semibold text-foreground">Monthly compensation by rating (2024 rates, single veteran)</p>
            <div className="flex flex-col gap-2">
              {[
                { rating: "10%", amount: "$171/mo", note: "" },
                { rating: "20%", amount: "$338/mo", note: "" },
                { rating: "30%", amount: "$524/mo", note: "Dependent allowances begin" },
                { rating: "40%", amount: "$755/mo", note: "" },
                { rating: "50%", amount: "$1,075/mo", note: "CRDP eligibility — can collect pension + disability" },
                { rating: "60%", amount: "$1,361/mo", note: "" },
                { rating: "70%", amount: "$1,716/mo", note: "Individual Unemployability consideration begins" },
                { rating: "80%", amount: "$1,995/mo", note: "" },
                { rating: "90%", amount: "$2,241/mo", note: "" },
                { rating: "100%", amount: "$3,737/mo", note: "Full benefits package — massive state-level perks", highlight: true },
              ].map(({ rating, amount, note, highlight }) => (
                <div
                  key={rating}
                  className={`flex items-center justify-between gap-4 border-b border-border pb-2 last:border-0 last:pb-0 text-sm ${highlight ? "font-bold" : ""}`}
                >
                  <div>
                    <p className={highlight ? "text-foreground" : "text-muted-foreground"}>{rating} {note && <span className="ml-2 text-xs font-normal" style={{ color: "var(--brand-600)" }}>{note}</span>}</p>
                  </div>
                  <p className="shrink-0 font-semibold text-foreground">{amount}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">All compensation is tax-free. Rates increase annually with COLA adjustments. Dependents (spouse, children) add to the base amount starting at 30%.</p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-4 font-semibold text-foreground">Key thresholds and what they unlock</p>
            <div className="flex flex-col gap-4">
              {[
                {
                  rating: "10%+",
                  unlocks: ["VA healthcare enrollment", "Monthly tax-free compensation", "Funding fee waiver on VA home loan", "10-point federal hiring preference"],
                },
                {
                  rating: "30%+",
                  unlocks: ["Additional monthly allowance for spouse", "Additional allowance for each dependent child", "Aid & Attendance allowance if needed"],
                },
                {
                  rating: "50%+",
                  unlocks: ["CRDP — collect both retirement pension AND disability pay concurrently (no offset)", "Priority Group 1 VA healthcare (lowest or no copays)"],
                },
                {
                  rating: "70%+",
                  unlocks: ["Individual Unemployability (TDIU) — if you can't work due to your disability, may be compensated at the 100% rate even with a lower rating"],
                },
                {
                  rating: "100% (or P&T)",
                  unlocks: [
                    "Maximum monthly compensation (~$3,737+/mo)",
                    "Free VA healthcare for all conditions",
                    "Commissary and exchange access for life",
                    "Many states: full property tax exemption",
                    "Many states: free vehicle registration, hunting/fishing licenses",
                    "Free America the Beautiful national parks pass",
                    "CHAMPVA — healthcare coverage for dependents",
                  ],
                },
              ].map(({ rating, unlocks }) => (
                <div key={rating}>
                  <p className="mb-2 text-sm font-bold text-foreground" style={{ color: "var(--brand-600)" }}>{rating}</p>
                  <div className="flex flex-col gap-1.5">
                    {unlocks.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-sm">
                        <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: "var(--brand-600)" }}>✓</span>
                        <p className="text-muted-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">Permanent & Total (P&T) — the designation that matters most</p>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              A 100% rating can be either temporary or Permanent & Total.
              P&T means the VA has determined your condition is not expected
              to improve. This matters because:
            </p>
            <div className="flex flex-col gap-2 text-sm">
              {[
                "Your rating cannot be reduced without your consent",
                "You qualify for CHAMPVA — VA healthcare for your spouse and dependents",
                "State property tax exemptions almost always require P&T status",
                "Some states offer free college tuition for your children if you hold P&T",
                "Commissary/exchange access for life is tied to P&T in some cases",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 border-b border-border pb-2 last:border-0 last:pb-0">
                  <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: "var(--brand-600)" }}>✓</span>
                  <p className="text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-5 text-white" style={{ background: "var(--brand-600)" }}>
            <p className="mb-1 font-bold">Don&apos;t leave your rating where it is if it&apos;s wrong</p>
            <p className="text-sm leading-relaxed text-white/85">
              Many veterans accept their initial rating without questioning it.
              If your conditions have worsened, file for an increase. If you
              have new conditions connected to service, file new claims. The
              difference between a 60% rating and a 100% P&T rating isn&apos;t
              just monthly compensation — it&apos;s property tax exemptions,
              dependent healthcare, state-level perks, and financial security
              that compounds for the rest of your life. Know your rating,
              understand what it unlocks, and fight for what you earned.
            </p>
          </div>
        </div>
      );

    case "hid-1":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            The Hidden Stuff · Lesson 1
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            Benefits Most Vets Never Claim
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            The big benefits — VA loan, GI Bill, disability compensation —
            get most of the attention. But there&apos;s a whole layer of perks
            most veterans never know about. These aren&apos;t small either. Some
            are worth thousands of dollars a year. Here&apos;s what you&apos;re probably
            leaving behind.
          </p>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-4 font-semibold text-foreground">Financial benefits most vets miss</p>
            <div className="flex flex-col gap-4">
              {[
                {
                  title: "VA funding fee refund",
                  body: "If you used a VA home loan and later received a service-connected disability rating, you may be entitled to a refund of the funding fee you paid at closing. At 2.15% on a $300k loan, that's $6,450 back in your pocket. File through the VA with your loan paperwork and rating letter.",
                },
                {
                  title: "CRSC — Combat Related Special Compensation",
                  body: "Military retirees who have both a retirement pension and a VA disability rating normally see an offset — one reduces the other. CRSC is an exception that allows combat-disabled retirees to receive both, in full, without offset. Separate from CRDP and available even below 50% if the disability is combat-related.",
                },
                {
                  title: "MilTax — free tax prep",
                  body: "Military OneSource provides free federal and state tax software through H&R Block equivalent tools. Available to active duty, Guard, Reserve, and veterans in their first year after separation. It handles military-specific situations like combat zone exclusions and multiple state returns — no income limit, completely free.",
                },
                {
                  title: "SGLI to VGLI conversion",
                  body: "When you leave the military, you have 1 year and 120 days to convert your SGLI life insurance to Veterans Group Life Insurance without any medical exam. After that window closes, you need to qualify medically. If you have any health conditions, convert before the window closes — you can always reduce coverage later.",
                },
                {
                  title: "National Cemetery burial benefits",
                  body: "Honorably discharged veterans are entitled to burial in a national cemetery at no cost — including the grave, opening and closing, liner, and marker. Spouses and dependents can be buried there too. This benefit alone is worth several thousand dollars. Inform your family so they know to request it.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-border p-4">
                  <p className="mb-1 text-sm font-semibold text-foreground">{title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-4 font-semibold text-foreground">Lifestyle benefits worth real money</p>
            <div className="flex flex-col gap-3">
              {[
                {
                  title: "Exchange (PX/BX/NEX) access for life",
                  body: "As of 2020, all honorably discharged veterans — not just retirees — can shop the military exchange online. No sales tax, military pricing on electronics, appliances, and more. shopmy.exchange is the online portal. On average 20–30% below retail prices.",
                },
                {
                  title: "Space-A travel",
                  body: "Space Available (Space-A) flights let military members and eligible veterans fly on military aircraft as space allows — for free or very low cost. Retirees have Space-A access. Active duty can fly worldwide. A round trip to Europe for $30 in fees is not unusual. Requires flexibility since you're flying standby.",
                },
                {
                  title: "America the Beautiful national parks pass",
                  body: "Veterans with a permanent service-connected disability (any rating) receive a free lifetime America the Beautiful pass — free entry to all national parks, monuments, recreation areas, and federal lands. Normally $80/year. Pick it up at any federal recreation site or order online through the USGS.",
                },
                {
                  title: "Free or reduced admission at state parks and museums",
                  body: "Many states offer free or discounted admission to state parks, museums, and recreational facilities for veterans. Some require a disability rating; others just need a DD-214. Check your state's veterans affairs website for the full list.",
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
            <p className="mb-1 font-bold">The pattern here</p>
            <p className="text-sm leading-relaxed text-white/85">
              These benefits exist. The VA and the government don&apos;t send you
              a checklist when you separate. Nobody calls you to say your
              funding fee is refundable or that your SGLI conversion window
              is closing. You have to know to look. The veterans who get
              the most out of their service are the ones who stay informed,
              ask questions, and claim what they earned. That&apos;s what this
              course is for.
            </p>
          </div>
        </div>
      );

    case "hid-2":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            The Hidden Stuff · Lesson 2
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            State Benefits and Federal Hiring
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Two of the most underused post-service advantages are state-level
            benefits — which vary dramatically but can be worth tens of thousands
            of dollars — and federal hiring preference, which can be the
            difference between getting a government job and being passed over.
            Most veterans don&apos;t fully understand either.
          </p>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">State benefits — why they matter so much</p>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              Federal benefits are the floor. State benefits are wildly
              variable — some states offer almost nothing, others provide
              benefits worth $20,000–$50,000+ per year to eligible veterans.
              The key is knowing what your state offers and claiming it.
            </p>
            <div className="flex flex-col gap-4">
              {[
                {
                  title: "Property tax exemptions",
                  body: "This is the biggest one. Many states offer full or partial property tax exemptions for disabled veterans. Texas exempts 100% P&T veterans from all property taxes — on a $400,000 home with a $10,000/yr tax bill, that's $10,000/year in savings. Florida, Virginia, and others have strong programs too. Eligibility thresholds vary — some require 100% P&T, others start at 10%.",
                },
                {
                  title: "Income tax exemption on military pay and disability",
                  body: "Many states don't tax military retirement pay, VA disability compensation, or both. States like Texas and Florida have no income tax at all. Others like Virginia, North Carolina, and Colorado specifically exempt military retirement income. This can save a military retiree $3,000–$8,000/year in state taxes.",
                },
                {
                  title: "Free or reduced college tuition",
                  body: "Some states offer free tuition at public universities for eligible veterans or their dependents — separate from the GI Bill. Texas' Hazlewood Act gives eligible vets and their children up to 150 credit hours of tuition-free education at state schools. Illinois, Maryland, and others have similar programs.",
                },
                {
                  title: "Vehicle registration and license fee waivers",
                  body: "Many states waive vehicle registration fees for disabled veterans. Some offer specialized license plates that come with additional perks like free or reduced tolls. Minor benefit individually, but worth claiming.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-border p-4">
                  <p className="mb-1 text-sm font-semibold text-foreground">{title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">How to find yours:</span> Search your state name + "veteran benefits" or go directly to your state's Department of Veterans Affairs website. If you're choosing where to live after service, factoring in state benefits is a legitimate financial decision — the difference between two states can be tens of thousands of dollars per year.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">Federal hiring preference — how it actually works</p>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              If you&apos;re applying for a federal government job, veteran&apos;s
              preference gives you an advantage over non-veteran applicants
              with the same qualifications. It&apos;s not just symbolic — it
              directly affects your position on ranked candidate lists.
            </p>
            <div className="flex flex-col gap-3 mb-4">
              {[
                {
                  label: "5-point preference (TP)",
                  desc: "Most honorably discharged veterans who served during a war or in a campaign with a campaign badge. 5 points added to your passing civil service exam score.",
                },
                {
                  label: "10-point preference (CP/CPS/XP)",
                  desc: "Veterans with a service-connected disability rating of 10% or higher. 10 points added, and you're placed at the top of the certificate above other preference eligibles.",
                },
                {
                  label: "30%+ disabled veteran (Schedule A)",
                  desc: "Veterans with a 30%+ disability rating can be hired non-competitively under Schedule A — meaning an agency can hire you without a competitive job posting. Agencies can bring you in directly.",
                },
              ].map(({ label, desc }) => (
                <div key={label} className="rounded-xl border border-border p-4">
                  <p className="mb-1 text-sm font-semibold text-foreground">{label}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Federal jobs come with strong benefits — pension (FERS), TSP
              matching, health insurance, and job security. The hiring
              preference makes an already competitive option even more
              accessible for veterans. When you apply on USAJOBS, indicate
              your veteran&apos;s preference and upload your DD-214 and any
              VA rating letters.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-3 font-semibold text-foreground">USERRA — your job is protected when you&apos;re called up</p>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              The Uniformed Services Employment and Reemployment Rights Act
              (USERRA) protects your civilian job when you leave for military
              duty. Key protections:
            </p>
            <div className="flex flex-col gap-2 text-sm">
              {[
                "Your employer must reinstate you to the same or equivalent position when you return",
                "You cannot be fired or discriminated against because of military service",
                "Your employer must continue your health insurance for up to 24 months during deployment",
                "Pension and retirement benefits continue to accrue as if you never left",
                "Applies to Guard and Reserve members called to active duty",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 border-b border-border pb-2 last:border-0 last:pb-0">
                  <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: "var(--brand-600)" }}>✓</span>
                  <p className="text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-5 text-white" style={{ background: "var(--brand-600)" }}>
            <p className="mb-1 font-bold">You earned all of this</p>
            <p className="text-sm leading-relaxed text-white/85">
              The financial advantage of military service isn&apos;t just the
              paycheck — it&apos;s the benefits that compound for decades after
              you separate. A 100% P&T veteran in Texas pays no property
              taxes, no state income tax, gets free tuition for their kids,
              shops the exchange tax-free, has free healthcare, and receives
              $3,700+/month tax-free. That&apos;s a financial position most
              people never reach. Know what you have, claim what you earned,
              and build on it.
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
