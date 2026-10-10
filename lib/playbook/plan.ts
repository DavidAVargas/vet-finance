import {
  Banknote,
  BriefcaseBusiness,
  Car,
  ChartColumn,
  ChartLine,
  CircleAlert,
  CircleCheck,
  CircleDollarSign,
  CreditCard,
  Gauge,
  Gem,
  GraduationCap,
  HandCoins,
  House,
  Landmark,
  Medal,
  PiggyBank,
  Plane,
  Scale,
  Search,
  Shield,
  ShoppingBag,
  Shuffle,
  Sprout,
  Stethoscope,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  User,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { ACTIVE_DUTY_CARD_STEPS, GUIDES, getGuideKey, type Step } from "@/lib/playbook/credit-guides";

// ─── Answers ──────────────────────────────────────────────────────────────────

export type Status = "active" | "guard" | "separating" | "veteran" | "civilian";

export type Answers = {
  status: Status | null;
  age: string | null;
  cashflow: string | null;
  savings: string | null;
  savingsWhere: string | null;
  q1: string | null;
  q3: string | null;
  q4: string | null;
  debt: string | null;
  goals: string[] | null;
};

export const EMPTY_ANSWERS: Answers = {
  status: null,
  age: null,
  cashflow: null,
  savings: null,
  savingsWhere: null,
  q1: null,
  q3: null,
  q4: null,
  debt: null,
  goals: null,
};

const isMilitary = (s: Status | null) => s !== null && s !== "civilian";

// ─── Questions ────────────────────────────────────────────────────────────────

export type Option = { id: string; label: string; desc: string; icon: LucideIcon };
export type QuestionId = keyof Answers;
export type Question = {
  id: QuestionId;
  section: number;
  question: string;
  options: Option[];
  /** Multi-select questions let the person pick up to this many options. */
  multi?: number;
};

export const SECTIONS = ["About you", "Your money", "Your credit", "Your debt", "Your goals"];

export function getQuestions(a: Answers): Question[] {
  const q: Question[] = [
    {
      id: "status",
      section: 0,
      question: "Which describes you?",
      options: [
        { id: "active", icon: Medal, label: "Active duty", desc: "Currently serving full time" },
        { id: "guard", icon: Shield, label: "Guard or Reserve", desc: "Serving part time" },
        { id: "separating", icon: Sprout, label: "Getting out within a year", desc: "Transitioning to civilian life" },
        { id: "veteran", icon: Landmark, label: "Veteran", desc: "Already separated from service" },
        { id: "civilian", icon: User, label: "Civilian", desc: "Never served in the military" },
      ],
    },
    {
      id: "age",
      section: 0,
      question: "How old are you?",
      options: [
        { id: "under-25", icon: Sprout, label: "Under 25", desc: "Time is your biggest advantage" },
        { id: "25-34", icon: TrendingUp, label: "25 to 34", desc: "Building your foundation" },
        { id: "35-44", icon: ChartLine, label: "35 to 44", desc: "Catching up and leveling up" },
        { id: "45-plus", icon: Landmark, label: "45 or older", desc: "Making every year count" },
      ],
    },
    {
      id: "cashflow",
      section: 1,
      question: "At the end of most months, where do you land?",
      options: [
        { id: "positive", icon: CircleCheck, label: "Money left over, and I track it", desc: "I know where my money goes" },
        { id: "even", icon: Scale, label: "About even", desc: "Not much left, but not short" },
        { id: "short", icon: TrendingDown, label: "Short, or I'm not sure", desc: "Money runs out or I don't track it" },
      ],
    },
    {
      id: "savings",
      section: 1,
      question: "How much do you have saved right now?",
      options: [
        { id: "none", icon: Wallet, label: "Nothing yet", desc: "Starting from zero" },
        { id: "under-1k", icon: PiggyBank, label: "Under $1,000", desc: "A small start" },
        { id: "1k-5k", icon: PiggyBank, label: "$1,000 to $5,000", desc: "Building up" },
        { id: "5k-25k", icon: Banknote, label: "$5,000 to $25,000", desc: "A solid cushion" },
        { id: "25k-plus", icon: Landmark, label: "$25,000 or more", desc: "Strong savings" },
      ],
    },
  ];

  if (a.savings && a.savings !== "none") {
    q.push({
      id: "savingsWhere",
      section: 1,
      question: "Where is most of that money sitting?",
      options: [
        { id: "checking", icon: Wallet, label: "In my checking account", desc: "Mixed in with everyday spending" },
        { id: "bank-savings", icon: Landmark, label: "In a regular bank savings account", desc: "Usually a big bank, earning almost nothing" },
        { id: "hysa", icon: PiggyBank, label: "In a high-yield savings account", desc: "Already earning real interest" },
        { id: "invested", icon: ChartLine, label: "Invested", desc: "Stocks, funds, or retirement accounts" },
      ],
    });
  }

  // Credit section — the original card questions, unchanged.
  q.push({
    id: "q1",
    section: 2,
    question: "How many credit cards do you have right now?",
    options: [
      { id: "zero", icon: Sprout, label: "Zero cards", desc: "I don't have any credit cards yet" },
      { id: "one-three", icon: ChartColumn, label: "1 to 3 cards", desc: "Just getting started" },
      { id: "three-five", icon: TrendingUp, label: "3 to 5 cards", desc: "Building momentum" },
      { id: "five-plus", icon: Zap, label: "5 or more cards", desc: "Already stacking" },
    ],
  });
  if (a.q1 === "zero") {
    q.push({
      id: "q3",
      section: 2,
      question: "Do you have any debt or collections on your record?",
      options: [
        { id: "clean", icon: CircleCheck, label: "No debt — clean slate", desc: "Starting completely fresh" },
        { id: "debt", icon: CreditCard, label: "I have debt", desc: "Loans, medical bills, car payments" },
        { id: "collections", icon: CircleAlert, label: "I have collections", desc: "Debt that went to a collection agency" },
      ],
    });
  }
  if (a.q1 === "one-three") {
    q.push({
      id: "q3",
      section: 2,
      question: "What kind of cards do you have?",
      options: [
        { id: "store", icon: ShoppingBag, label: "Store / retail cards", desc: "Target, Amazon, department stores, etc." },
        { id: "bank", icon: Landmark, label: "Bank cards", desc: "Visa, Mastercard, or Amex from a bank" },
        { id: "mix", icon: Shuffle, label: "A mix of both", desc: "Some store cards, some bank cards" },
      ],
    });
    q.push({
      id: "q4",
      section: 2,
      question: "Any credit card debt or collections?",
      options: [
        { id: "clean", icon: CircleCheck, label: "No — I pay on time", desc: "In good standing" },
        { id: "balance", icon: TriangleAlert, label: "Carrying a balance", desc: "I owe money I can't pay off right now" },
        { id: "collections", icon: CircleAlert, label: "I have collections", desc: "Debt sent to a collection agency" },
      ],
    });
  }
  if (a.q1 === "three-five") {
    q.push({
      id: "q3",
      section: 2,
      question: "Do you pay your full balance every month?",
      options: [
        { id: "full", icon: CircleCheck, label: "Yes — always in full", desc: "I pay the full statement balance before the due date" },
        { id: "balance", icon: TriangleAlert, label: "No — I carry a balance", desc: "I owe money across one or more cards" },
      ],
    });
    if (a.q3 === "full") {
      q.push({
        id: "q4",
        section: 2,
        question: "What's your main credit card goal right now?",
        options: [
          { id: "score", icon: Gauge, label: "Grow my credit score", desc: "I want a higher score" },
          { id: "rewards", icon: Plane, label: "Maximize points and rewards", desc: "I want to get the most out of every purchase" },
          { id: "premium", icon: Gem, label: "Get a premium card", desc: "I'm ready for a high-end card" },
        ],
      });
    }
  }
  if (a.q1 === "five-plus") {
    q.push({
      id: "q3",
      section: 2,
      question: "What's your main credit card goal right now?",
      options: [
        { id: "points", icon: Plane, label: "Maximize points and travel", desc: "I want to get the most value out of my points" },
        { id: "debt", icon: TrendingDown, label: "Pay down debt", desc: "I'm carrying balances I want to eliminate" },
        { id: "checkup", icon: Search, label: "Just making sure I'm doing it right", desc: "I want a full audit of where I stand" },
      ],
    });
  }

  q.push({
    id: "debt",
    section: 3,
    question: "Besides credit cards, what's your biggest debt?",
    options: [
      { id: "none", icon: CircleCheck, label: "No other debt", desc: "Nothing besides credit cards" },
      { id: "car", icon: Car, label: "A car loan", desc: "Financing a vehicle" },
      { id: "student", icon: GraduationCap, label: "Student loans", desc: "Federal or private" },
      { id: "medical", icon: Stethoscope, label: "Medical bills", desc: "Hospital or doctor bills" },
      { id: "payday", icon: HandCoins, label: "Payday or personal loans", desc: "High-interest short-term loans" },
    ],
  });

  const goals: Option[] = [
    { id: "car", icon: Car, label: "Buy a car", desc: "The smart way, without the trap" },
    { id: "house", icon: House, label: "Buy a house", desc: "Get ready to own a home" },
    { id: "debt-free", icon: TrendingDown, label: "Pay off debt faster", desc: "Get out and stay out" },
    { id: "credit", icon: Gauge, label: "Grow my credit score", desc: "Unlock better rates on everything" },
    { id: "travel", icon: Plane, label: "Travel with points", desc: "Make your spending pay for trips" },
    { id: "invest", icon: ChartLine, label: "Start investing", desc: "Build long-term wealth" },
  ];
  if (a.status === "active" || a.status === "guard") {
    goals.push({ id: "transition", icon: BriefcaseBusiness, label: "Get ready to get out", desc: "Set up for life after service" });
  }
  q.push({ id: "goals", section: 4, question: "What are your next big goals? Pick up to 2.", options: goals, multi: 2 });

  return q;
}

// ─── Plan ─────────────────────────────────────────────────────────────────────

export type PlanSection = {
  id: string;
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  steps: Step[];
  /** Personal note from David, shown as a quote. */
  note?: string;
  /** Show the high-yield savings calculator, starting at this amount. */
  hysaAmount?: number;
  military?: boolean;
};

const SAVINGS_EXAMPLE: Record<string, number> = { "under-1k": 500, "1k-5k": 3000, "5k-25k": 10000, "25k-plus": 30000 };
const SECOND_JOB_NOTE =
  "When I was paying off my debt and living on my own, I worked two full-time jobs for about six months. It sucked. But I paid everything back and got myself situated, and I wouldn't be where I am without it. Push hard now so you don't have to keep pushing later.";
const MONTH_AHEAD_NOTE =
  "My partner and I always stay a month ahead on our bills, so rent is never a stress. I'm also building six months to a year of rent in a high-yield savings account. That cushion means losing a job wouldn't mean losing our home.";

const titleOfGoal: Record<string, string> = {
  car: "Your goal: buy a car the smart way",
  house: "Your goal: buy a house",
  "debt-free": "Your goal: pay off debt faster",
  credit: "Your goal: grow your credit score",
  travel: "Your goal: travel with points",
  invest: "Your goal: start investing",
  transition: "Your goal: get ready to get out",
};

export function buildPlan(a: Answers): PlanSection[] {
  const plan: PlanSection[] = [];
  const military = isMilitary(a.status);
  const young = a.age === "under-25" || a.age === "25-34";
  const creditKey = getGuideKey(a);
  const creditGuide = creditKey ? GUIDES[creditKey] : null;
  const cardDebt =
    a.q4 === "balance" || a.q4 === "collections" || a.q3 === "balance" || a.q3 === "debt" || a.q3 === "collections";
  const hasDebt = cardDebt || (a.debt !== null && a.debt !== "none");
  const tight = a.cashflow === "short" || a.cashflow === "even";

  // 1. Know your numbers
  const numbers: Step[] = [
    {
      title: "Track every dollar for one month",
      body:
        a.cashflow === "positive"
          ? "You're already tracking. Keep doing it every month. Review where your money went, look for anything creeping up, and make sure every month ends positive."
          : "Use a budgeting app or a simple spreadsheet and write down everything you spend for 30 days. Most people find $100–$300 a month leaking out on things they don't even care about.",
    },
    {
      title: "Stay positive every single paycheck",
      body: "Positive means you spend less than you make, every paycheck, no exceptions. Even $25 left over is a win. If you're spending more than you bring in, nothing else in this plan works until you fix that.",
    },
    {
      title: "Pay yourself first, automatically",
      body: "Set up an automatic transfer from checking to your high-yield savings account every payday. Start with whatever you can, even $25. Automating it means you never have to decide.",
    },
  ];
  if (tight) {
    numbers.push({
      title: "Add a second income for 3 to 12 months",
      body: "If money is tight, cutting back only goes so far. Pick up a second job, overtime, or a side gig for a set stretch, 3 months, 6 months, maybe a year. It's hard, but it gets you where you want to be faster, and the longer you wait, the harder it gets.",
    });
  }
  plan.push({
    id: "numbers",
    title: "Know your numbers",
    subtitle: "Everything starts with knowing where your money goes",
    icon: ChartColumn,
    steps: numbers,
    note: tight ? SECOND_JOB_NOTE : undefined,
  });

  // 2. Build your safety net
  const safety: Step[] = [];
  const where = a.savingsWhere;
  if (a.savings === "none" || !a.savings) {
    safety.push({
      title: "Open a high-yield savings account today",
      body: "They're free, take a few minutes to open online, and pay around 10 times the national average savings rate or more. Start with whatever you have, even $25, and let your automatic transfer build it.",
    });
  } else if (where === "checking" || where === "bank-savings") {
    safety.push({
      title: "Move your savings into a high-yield savings account",
      body: "Money sitting in checking or a big-bank savings account earns next to nothing. A high-yield savings account pays real interest, has no fees, no lock-up, and you can pull money out anytime for an emergency. It's the most flexible place for savings. Use the calculator below to see what your money could earn.",
    });
  } else if (where === "hysa") {
    safety.push({
      title: "You're already in a high-yield account. Keep feeding it",
      body: "Good move. Keep your automatic transfers going, and check your rate every few months. If your bank drops its rate well below others, moving is free and takes minutes.",
    });
  } else if (where === "invested") {
    safety.push({
      title: "Keep your safety net in cash, not the market",
      body: "Investing is great for long-term money, but emergency money and rent money should be in a high-yield savings account where it can't drop 20% the month you need it.",
    });
  }
  safety.push(
    {
      title: young ? "Build a $1,000–$2,000 emergency fund" : "Build an emergency fund of 1–3 months of expenses",
      body: young
        ? "In your 20s and early 30s, a $1,000 to $2,000 emergency fund covers most surprises, like a car repair or a medical bill, without reaching for a credit card. Most people don't have one at all."
        : "With more responsibilities, aim for at least 1 to 3 months of your essential expenses set aside for true emergencies.",
    },
    {
      title: "Get a month ahead on your bills",
      body: "Work toward having next month's rent and bills already covered before this month ends. Paying everyday expenses with a card and paying it in full each month helps you get there. Once you're one month ahead, push for two.",
    },
    {
      title: "Then build a rent cushion: 6 to 12 months",
      body: "Separate from your emergency fund, save 6 to 12 months of rent in your high-yield account. If you lose your job, your home is covered while you figure out what's next. Bonus: the interest it earns can help grow your emergency fund.",
    },
    {
      title: "Want a higher locked rate? Know the tradeoff with CDs",
      body: "Certificates of deposit can pay a bit more, but your money is locked for a set term and you pay a penalty to take it out early. For most people, a high-yield savings account's flexibility is worth more. If you have money you truly won't touch, a CD is an option.",
    },
  );
  plan.push({
    id: "safety",
    title: "Build your safety net",
    subtitle: "So one bad month never becomes a crisis",
    icon: PiggyBank,
    steps: safety,
    note: MONTH_AHEAD_NOTE,
    hysaAmount: a.savings && a.savings !== "none" ? SAVINGS_EXAMPLE[a.savings] : 1000,
  });

  // 3. Clear high-cost debt
  if (hasDebt) {
    const debt: Step[] = [
      {
        title: "List every debt by interest rate",
        body: "Write down each debt: who you owe, the balance, the interest rate, and the minimum payment. Pay the minimum on everything, then throw every extra dollar at the highest rate first. When it's gone, roll that payment into the next one.",
      },
      {
        title: "Push hard for a set amount of time",
        body: "A second job or side gig for 3 to 12 months, with every extra dollar going to debt, can wipe out in months what would otherwise take years. It's temporary, and it's worth it.",
      },
    ];
    if (a.debt === "payday") {
      debt.unshift({
        title: "Get out of payday loans first",
        body: military
          ? "Payday and high-interest personal loans are the most expensive debt there is. Your branch's relief society (Army Emergency Relief, Navy-Marine Corps Relief Society, Air Force Aid Society) offers interest-free loans and grants that can help you escape. The Military Lending Act also caps most loans to you at 36%."
          : "Payday and high-interest personal loans are the most expensive debt there is. Many federal credit unions offer payday alternative loans (PALs) capped at 28% APR that can pay them off. Never roll a payday loan over.",
      });
    }
    if (a.debt === "car") {
      debt.push({
        title: "Car loan: stop the cycle",
        body: "Don't trade in early and roll what you owe into a new loan. If your rate is high and your credit has improved, look into refinancing with a credit union. Pay extra toward principal when you can.",
      });
    }
    if (a.debt === "student") {
      debt.push({
        title: "Student loans: keep federal loans federal",
        body: military
          ? "Never refinance federal loans into private ones; you'd lose income-driven repayment, forgiveness, and military benefits like 0% interest in hostile-fire areas and PSLF credit for your service. Pay extra toward the highest-rate loan."
          : "Never refinance federal loans into private ones; you'd lose income-driven repayment and forgiveness options. Check studentaid.gov for the plan that fits your income, and pay extra toward the highest-rate loan.",
      });
    }
    if (a.debt === "medical") {
      debt.push({
        title: "Medical bills: negotiate before you pay",
        body: "Ask for an itemized bill, look for errors, ask about financial assistance or the cash-pay rate, and offer a lump sum. Paid medical debt and medical debt under $500 don't show up on your credit reports.",
      });
    }
    plan.push({
      id: "debt",
      title: "Clear high-cost debt",
      subtitle: "Every dollar of interest you stop paying is a raise",
      icon: TrendingDown,
      steps: debt,
      note: tight ? undefined : SECOND_JOB_NOTE,
    });
  }

  // 4. Your credit plan (the original guides)
  if (creditGuide) {
    const steps = [...creditGuide.steps];
    if (a.q1 === "zero" && !young) {
      steps.unshift({
        title: "Starting later is okay. Start now",
        body: "Building credit later in life takes patience, because you're starting without years of history. But 12 to 24 months of perfect payments can get you to a solid score. Being added as an authorized user on a trusted family member's long-standing card can also give you a head start.",
      });
    }
    if (a.q1 === "zero" && a.age === "under-25") {
      steps.unshift({
        title: "Time is your biggest advantage",
        body: "Every year your first card stays open makes your credit history longer. Starting in your teens or early 20s puts you years ahead of people who wait.",
      });
    }
    plan.push({
      id: "credit",
      title: "Your credit plan",
      subtitle: creditGuide.title,
      icon: CreditCard,
      steps,
    });
  }

  // 5. Goals
  for (const goal of a.goals ?? []) {
    const steps = goalSteps(goal, a);
    if (steps.length) {
      plan.push({ id: `goal-${goal}`, title: titleOfGoal[goal], icon: goalIcon[goal] ?? CircleDollarSign, steps });
    }
  }

  // 6. Military extras — never shown to civilians
  if (military && a.status) {
    plan.push({
      id: "military",
      title: militaryTitle[a.status as Exclude<Status, "civilian">],
      subtitle: "Benefits most people never claim",
      icon: Medal,
      steps: militarySteps(a.status as Exclude<Status, "civilian">),
      military: true,
    });
  }

  return plan;
}

const goalIcon: Record<string, LucideIcon> = {
  car: Car,
  house: House,
  "debt-free": TrendingDown,
  credit: Gauge,
  travel: Plane,
  invest: ChartLine,
  transition: BriefcaseBusiness,
};

function goalSteps(goal: string, a: Answers): Step[] {
  const military = isMilitary(a.status);
  switch (goal) {
    case "car":
      return [
        { title: "Set a total price, not a monthly payment", body: "Decide the most you'll pay out the door, including taxes and fees. When a dealer asks what monthly payment you want, answer with your total price instead." },
        { title: "Buy used, 2 to 4 years old", body: "A new car loses about 20% of its value in the first year. Let someone else take that hit. A 3-year-old car runs the same and costs thousands less." },
        { title: "Get pre-approved before you shop", body: "Get a loan offer from a credit union before you visit a dealer. Then you can compare their financing to a rate you already have." },
        { title: "Keep the loan short: 36 to 48 months", body: "Put money down and keep the term short. A 72-month loan keeps you underwater for years and costs far more in interest." },
        { title: "Budget the full cost of owning it", body: "Insurance, gas, maintenance, and registration can add $400–$500 a month on top of the payment. Make sure all of it fits." },
      ];
    case "house": {
      const steps: Step[] = [
        { title: "Get your credit score to 740+", body: "Your mortgage rate is driven by your score. On a $300,000 loan, the gap between a good and a bad score can cost over $200,000 over 30 years." },
      ];
      if (military) {
        steps.push(
          { title: "Use your VA loan", body: "$0 down, no PMI, and often a lower rate. If you have a 10%+ disability rating, the funding fee is waived. Get your Certificate of Eligibility through your lender or va.gov." },
          { title: "Consider house hacking", body: "A VA loan can buy a 2–4 unit property if you live in one unit. Tenants help cover the mortgage while you build equity." },
        );
      } else {
        steps.push(
          { title: "Save for the down payment and closing costs", body: "Under 20% down usually means paying PMI. FHA loans allow as little as 3.5% down with a 580+ score, and many states have first-time buyer programs. Closing costs often run 2–5% of the price." },
        );
      }
      steps.push(
        { title: "Keep your safety net intact", body: "Don't empty your savings to buy. Owning comes with repairs. Keep your emergency fund and some cushion after closing." },
        { title: "Get pre-approved and compare 3 lenders", body: "Rates and fees vary. Comparing a few lenders within a couple of weeks counts as one credit inquiry and can save you thousands." },
      );
      return steps;
    }
    case "debt-free":
      return [
        { title: "Pick your target", body: "Highest interest rate first (the avalanche method). It's the fastest, cheapest way out." },
        { title: "Go all in for 3 to 12 months", body: "A second job, overtime, or a side gig, with every extra dollar going straight to debt. Set an end date so you can see the finish line." },
        { title: "Cut the extras while you push", body: "Pause subscriptions, eating out, and anything you won't miss. It's temporary." },
        { title: "When a debt is gone, redirect the payment", body: "Roll that payment into the next debt. When they're all gone, point the same amount at your high-yield savings. You're already used to living without it." },
      ];
    case "credit":
      return [
        { title: "Set up autopay on every card", body: "Payment history is 35% of your score. Autopay at least the minimum so you never miss one, then pay the full balance yourself." },
        { title: "Get utilization under 10%", body: "Pay down balances before your statement closes, and ask for credit limit increases every 6–12 months." },
        { title: "Never close your oldest card", body: "Older accounts help your score. Keep them open with a small purchase every few months." },
        { title: "Check your credit monthly", body: "Use a free app to watch for changes and errors. Freeze your credit at all three bureaus when you're not applying for anything." },
      ];
    case "travel":
      return [
        { title: "Pay in full, always", body: "Points are only worth it if you never pay interest. One month of carrying a balance can wipe out a year of rewards." },
        { title: "Pick one points program to focus on", body: "Chase Ultimate Rewards or Amex Membership Rewards are great places to start. Concentrating your points makes them add up faster." },
        { title: "Learn one transfer partner", body: "Transferring to partners like Hyatt or an airline can make your points worth 2–3 times more than the travel portal. Start with one trip." },
        { title: "Track your benefits", body: "Use an app like Max Rewards to track which card to use and which credits are about to expire." },
      ];
    case "invest": {
      const steps: Step[] = [
        military && (a.status === "active" || a.status === "guard")
          ? { title: "Get the full TSP match: contribute 5%", body: "Under the Blended Retirement System, contributing 5% of your base pay unlocks the full 5% from the government. It's a 100% instant return." }
          : { title: "Get your full employer match first", body: "If your job offers a 401(k) match, contribute at least enough to get all of it. It's free money and an instant return." },
        { title: "Then open a Roth IRA", body: "You can contribute up to $7,500 in 2026. Money grows tax-free and comes out tax-free in retirement." },
        { title: "Keep it simple with index funds", body: "Low-cost index funds or target-date funds spread your money across the whole market. No stock picking needed." },
        { title: "Automate it and leave it alone", body: "Set up automatic contributions every payday and don't panic when the market drops. Time in the market is what builds wealth." },
      ];
      if (a.age === "45-plus") {
        steps.push({ title: "Use catch-up contributions at 50+", body: "Once you turn 50, you can contribute extra to retirement accounts each year on top of the normal limits. Use it to make up ground." });
      }
      return steps;
    }
    case "transition":
      return [
        { title: "File your disability claim before you get out", body: "The Benefits Delivery at Discharge program lets you file 180 to 90 days before separation, so your rating can be ready right after you get out." },
        { title: "Line up your next job with SkillBridge", body: "In your last 180 days, you can intern or train with a civilian employer while still getting military pay, with your command's approval." },
        { title: "Build your rent cushion before your last paycheck", body: "BAH stops when you separate. Have several months of rent saved in a high-yield savings account before your final paycheck." },
        { title: "Know your deadlines", body: "VGLI with no health questions within 240 days. One-time VA dental within 180 days. Disability claims filed within a year can pay back to the day after discharge." },
      ];
    default:
      return [];
  }
}

const militaryTitle: Record<Exclude<Status, "civilian">, string> = {
  active: "Since you're active duty, don't skip this",
  guard: "Since you're Guard or Reserve, don't skip this",
  separating: "Since you're getting out, don't skip this",
  veteran: "Since you're a veteran, don't skip this",
};

function militarySteps(status: Exclude<Status, "civilian">): Step[] {
  switch (status) {
    case "active":
      return [
        { title: "Contribute at least 5% to your TSP", body: "That unlocks the full government match under the Blended Retirement System. Remember, the match starts in your third year of service." },
        ...ACTIVE_DUTY_CARD_STEPS,
        { title: "Deploying? Use the Savings Deposit Program", body: "In a combat zone with hostile fire or imminent danger pay, you can deposit up to $10,000 and earn a guaranteed 10% a year." },
      ];
    case "guard":
      return [
        { title: "Get your TSP match", body: "The Blended Retirement System applies to Guard and Reserve too. Contribute at least 5% of your drill pay to get the full match." },
        { title: "SCRA and card perks when you're activated", body: "On qualifying federal active-duty orders, SCRA can cap interest on pre-service debt at 6%, and many issuers waive annual fees. Send them your orders." },
        { title: "USERRA protects your civilian job", body: "When you're called to duty, your employer has to hold your job and bring you back to the same or an equivalent position." },
      ];
    case "separating":
      return [
        { title: "File for disability 180 to 90 days before you get out", body: "Benefits Delivery at Discharge can have your rating ready right after separation. Or file an Intent to File to lock in your back-pay date." },
        { title: "Watch the deadlines", body: "VGLI within 240 days with no health questions. One-time VA dental within 180 days. Free MilTax filing for a year after separation." },
        { title: "Use SkillBridge", body: "Intern or train with a civilian employer during your last 180 days while still on military pay." },
        { title: "Know your VA home loan", body: "$0 down and no PMI, and you can use it again and again. A 10%+ disability rating waives the funding fee." },
      ];
    case "veteran":
      return [
        { title: "Use your VA home loan", body: "$0 down, no PMI, reusable, and the funding fee is waived with a 10%+ disability rating." },
        { title: "Make sure you've filed for disability", body: "If a condition is connected to your service, file a claim. Start with an Intent to File to lock in your back-pay date, and use a free VSO to help." },
        { title: "Enroll in VA health care", body: "Combat veterans can enroll without a rating for up to 10 years after discharge. Many others qualify too, so check va.gov." },
        { title: "Claim the perks you've earned", body: "A free lifetime national parks pass, online exchange shopping, and, with any service-connected rating, commissary and exchange access on base." },
      ];
  }
}

export const STATUS_LABEL: Record<Status, string> = {
  active: "Active duty",
  guard: "Guard / Reserve",
  separating: "Getting out soon",
  veteran: "Veteran",
  civilian: "Civilian",
};

