"use client";

import { useState, useEffect } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import {
  ChartColumn,
  Check,
  ChevronLeft,
  CircleAlert,
  CircleCheck,
  Compass,
  CreditCard,
  Gauge,
  Gem,
  Info,
  Landmark,
  Lock,
  Medal,
  Plane,
  RotateCcw,
  Search,
  ShoppingBag,
  Shuffle,
  Sprout,
  TrendingUp,
  TriangleAlert,
  User,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { LogoMark } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type Answers = {
  q1: string | null;
  activeDuty: boolean | null;
  q3: string | null;
  q4: string | null;
};

type Step = { title: string; body: string };
type Guide = {
  title: string;
  subtitle: string;
  steps: Step[];
};

// ─── Military add-on (appended to any result when active duty = true) ─────────

const MILITARY_STEPS: Step[] = [
  {
    title: "Amex waives every annual fee for active duty — all of them",
    body: "The Amex Platinum ($895/yr), Amex Gold ($325/yr), every Amex card with a fee — gone for active duty servicemembers. Chase also waives fees under SCRA. This doesn't happen automatically. You have to call each issuer, tell them you're active duty, and request it. Have your orders ready.",
  },
  {
    title: "SCRA caps interest on your pre-service debt at 6%",
    body: "If you had credit card debt before you went active duty, the Servicemembers Civil Relief Act limits that interest rate to 6% — no matter what your original APR was. A 24% card becomes 6% for the duration of your service. Call your issuers and request SCRA protection.",
  },
  {
    title: "Get a Navy Federal account if you don't have one",
    body: "Navy Federal Credit Union exists specifically for military members and their families. Strong starter cards, competitive rates, and they actually understand your situation. If you're eligible, it should be one of your first calls.",
  },
];

// ─── All guides ───────────────────────────────────────────────────────────────

const GUIDES: Record<string, Guide> = {
  // ── 0 cards ───────────────────────────────────────────────────────────────
  "zero-clean": {
    title: "I'd start building the right way — right now",
    subtitle: "Zero cards · Clean slate",
    steps: [
      {
        title: "Get a secured card — pick the right one",
        body: "A secured card requires a deposit (usually $200–$500) that becomes your credit limit. It reports to all 3 bureaus just like a real card. Discover it Secured is my top pick if you're not military — no annual fee, and after a stretch of on-time payments you can graduate to an unsecured card and get your deposit back. Capital One Secured is another solid option.",
      },
      {
        title: "Put one recurring charge on it every month",
        body: "A subscription, gas, one grocery run — something small and predictable. You're not trying to earn rewards yet. You're building a track record. Every on-time payment is a data point working in your favor.",
      },
      {
        title: "Pay the full balance every single month",
        body: "Non-negotiable. Use it like a debit card — only spend money that's already sitting in your account. Pay it off before the due date every month. This keeps you at 0% interest and builds a perfect payment history.",
      },
      {
        title: "At 6 months — request a credit limit increase",
        body: "Call the issuer and ask. Many will approve without a hard pull on your credit. Higher limit with the same spending = lower utilization = better score.",
      },
      {
        title: "At 12 months — apply for your first real card",
        body: "After a year of on-time payments you should be in the 650–700+ range. Now you apply for an unsecured card — Chase Freedom Unlimited or Discover it are both great. No annual fee, solid rewards, and they start your next layer of history.",
      },
    ],
  },

  "zero-debt": {
    title: "I'd clear the debt first — then build",
    subtitle: "Zero cards · Has debt",
    steps: [
      {
        title: "Don't open any cards yet",
        body: "I know it feels like you should start building credit now. But opening cards while carrying other debt usually makes things harder. Get your debt to a manageable place first. Then build. The order matters.",
      },
      {
        title: "List everything you owe",
        body: "Write down every debt: who you owe, how much, and the interest rate. Medical debt, personal loans, car payments — all of it. You need the full picture before you can make a real plan.",
      },
      {
        title: "Attack it with the avalanche method",
        body: "Pay the minimum on everything. Take any extra money and throw it at the highest interest rate first. When that's gone, roll that payment into the next highest. This is mathematically the fastest way out of debt.",
      },
      {
        title: "Once it's manageable — get a secured card",
        body: "You don't have to be completely debt-free before you start building credit. But you should be at a point where you can comfortably pay a card bill on top of your other payments. When you're there, follow the zero-cards clean path above.",
      },
    ],
  },

  "zero-collections": {
    title: "I'd call the collection agency today — not tomorrow",
    subtitle: "Zero cards · Collections",
    steps: [
      {
        title: "Don't apply for any cards yet",
        body: "Collections on your record will get you denied and waste a hard inquiry on your credit. Deal with this first. The order matters.",
      },
      {
        title: "Call the collection agency directly",
        body: "This is the step most people skip because it feels uncomfortable. Don't. Collection agencies buy debt for pennies on the dollar — which means they have room to deal. Call them, tell them you want to settle. Be calm and direct.",
      },
      {
        title: "Negotiate a lump sum — it's more powerful than you think",
        body: "I helped someone with $6,700 in collections do exactly this. They called, pushed back, said all they had was $4,500. The agency countered at $5,000. They paid $5,000 and saved $1,700. These agencies want to close fast. A lump sum today beats chasing you for years.",
      },
      {
        title: "How to negotiate without showing your hand",
        body: "Let them throw out a number first. Come back lower than what you can actually pay — give yourself room to negotiate up. Make it believable: 'that's all I have saved right now' hits different than just asking for a discount. Say 'let me think about it' if you need to, then call back. Never pay without a written settlement letter first.",
      },
      {
        title: "Can't pay lump sum? Set up installments",
        body: "You won't get as big a discount on a payment plan, but it's still better than doing nothing. Ignoring collections can lead to a lawsuit and a court judgment — which is much worse. Call, make a deal, start paying.",
      },
      {
        title: "Skip the credit repair companies",
        body: "They charge $100+/month and usually can't remove legitimate debt — only dispute actual errors. What actually works: settling it. Newer scoring models (FICO 9 and 10, VantageScore 3 and 4) ignore paid collections completely, so your score can jump once it's paid. Older FICO 8, which many lenders still use, may keep counting it, so ask the agency to delete it from your report as part of the deal. The person I helped went from the 600s to 750 after settling 3 collections. That's real. Then get a secured card and build from there.",
      },
    ],
  },

  // ── 1-3 cards ─────────────────────────────────────────────────────────────
  "one-three-store-clean": {
    title: "I'd get my first real bank card",
    subtitle: "1–3 store cards · No debt",
    steps: [
      {
        title: "Store cards are a starting point — not a destination",
        body: "Store cards have low limits, high APRs, and only work at one retailer. They helped you start building history — but they can't take you where you want to go. Time to layer in something better.",
      },
      {
        title: "Keep your store cards open — don't close them",
        body: "Closing a card hurts your credit age and reduces your available credit. Even if you barely use it, keep it open. One small purchase a year is enough to keep the account active.",
      },
      {
        title: "Request a limit increase on each one",
        body: "Before you open anything new, call each issuer and ask for a credit limit increase. Higher limits with the same spending = lower utilization = better score.",
      },
      {
        title: "Apply for your first real bank card",
        body: "Chase Freedom Unlimited or Discover it are the best starting points — no annual fee, solid cash back on everything, and they build your relationship with major issuers that open doors to better cards down the road.",
      },
      {
        title: "Give it 6–12 months, then level up",
        body: "Once you have a bank card with solid history, you're ready to look at a rewards card. Amex Gold for dining and groceries, Chase Sapphire Preferred for travel. That's when the real game starts.",
      },
    ],
  },

  "one-three-bank-clean": {
    title: "I'd start optimizing what you already have",
    subtitle: "1–3 bank cards · No debt",
    steps: [
      {
        title: "Request limit increases on everything",
        body: "Before opening anything new, call each issuer and ask for a credit limit increase. Many do soft pulls — meaning no score impact. Higher limits lower your utilization without changing your spending at all.",
      },
      {
        title: "Get your utilization under 10%",
        body: "Under 30% is the common advice. But under 10% is where your score actually moves. If your combined limit is $5,000 and you're spending $1,500 a month, get those limits up first.",
      },
      {
        title: "If your score is 680+, look at the Amex Gold",
        body: "4x on dining and groceries is the best earning rate in those two categories. If you eat out or buy groceries — everyone does — this card earns fast. The $325 annual fee sounds like a lot but the rewards cover it if you use it right.",
      },
      {
        title: "If your score is 700+, look at the Chase Sapphire Preferred",
        body: "The best entry-level travel card out there. $95/yr, 3x on dining, 2x on travel, transferable points to airlines and hotels. This is the card that opens the door to real travel rewards.",
      },
      {
        title: "Space out applications — 3 to 6 months apart",
        body: "Don't open two cards in the same month. Each application is a hard inquiry that dips your score temporarily. Give each card time to build history before adding another.",
      },
    ],
  },

  "one-three-mix-clean": {
    title: "I'd upgrade your strategy without starting over",
    subtitle: "1–3 mixed cards · No debt",
    steps: [
      {
        title: "Keep everything open — don't close anything",
        body: "Don't close your store cards even if you feel like you've outgrown them. Every account adds to your credit age and available credit. Keep them active with one small purchase a year.",
      },
      {
        title: "Request limit increases across all cards",
        body: "Store cards, bank cards — request increases on everything. This is the fastest way to lower your utilization without changing how you spend.",
      },
      {
        title: "Shift your real spending to bank cards",
        body: "Use the store cards just enough to keep them alive. Put your actual day-to-day spending on your bank cards — better rewards, better fraud protection, better terms.",
      },
      {
        title: "Your next card should be a dedicated rewards card",
        body: "You've got the foundation. Time to add something that fits your lifestyle. Amex Gold if you dine out or buy groceries. Sapphire Preferred if you travel. Pick one that matches how you actually spend money.",
      },
    ],
  },

  "one-three-any-balance": {
    title: "I'd stop everything and pay this off first",
    subtitle: "1–3 cards · Carrying a balance",
    steps: [
      {
        title: "No new cards — full stop",
        body: "Opening new cards while carrying a balance is like filling a bucket with a hole in it. Get the balance to zero first. Then build. I know that's not what you want to hear but it's the right order.",
      },
      {
        title: "List your cards by APR — highest to lowest",
        body: "You probably have different rates on each card. The highest APR card is costing you the most money every month. That's your target.",
      },
      {
        title: "Minimum payments on everything, attack the highest APR",
        body: "Pay minimums on every card except the one with the highest APR. Put every extra dollar on that one. When it's paid off, roll that payment into the next highest. This is the avalanche method — mathematically the fastest way out.",
      },
      {
        title: "Don't close the cards as you pay them off",
        body: "Closing a paid card kills your credit age and reduces available credit — both hurt your score. Pay it off, keep it open, use it once in a while to keep it active.",
      },
      {
        title: "Consider a balance transfer",
        body: "Some cards offer 0% APR for 12–21 months on balance transfers. If your credit is good enough to qualify, moving high-interest debt to a 0% card and paying it off interest-free can save you hundreds. Read the fine print — know what the APR jumps to after the intro period.",
      },
    ],
  },

  "one-three-any-collections": {
    title: "I'd deal with collections first — then focus on what you have",
    subtitle: "1–3 cards · Collections",
    steps: [
      {
        title: "Don't open anything new right now",
        body: "You've already got cards — that's a good foundation. But adding new ones with collections on your record is a hard pull wasted on a likely denial. Handle the collection first.",
      },
      {
        title: "Call the collection agency and negotiate",
        body: "They bought your debt for less than face value — they have room to deal. Call and ask to settle. I helped someone knock $6,700 down to $5,000 just by calling and negotiating a lump sum. Let them name a number first, then come in lower.",
      },
      {
        title: "Get the settlement agreement in writing before you pay",
        body: "Ask them to send a letter confirming the settlement amount and that it will be marked as settled in full. Do not pay a single dollar until you have this in hand. Once you pay, keep that letter forever.",
      },
      {
        title: "Your score will jump once it's paid",
        body: "Newer scoring models ignore paid collections entirely, so your score can move fast once it's settled. (Older FICO 8 may still count it, which is why you ask for deletion in your settlement letter.) Once that's done, shift your focus back to the cards you already have.",
      },
      {
        title: "Now optimize what you've got",
        body: "Request credit limit increases on your existing cards. Make sure you're paying in full every month. Get your utilization down. You've already got history — now make it work for you.",
      },
    ],
  },

  // ── 3-5 cards ─────────────────────────────────────────────────────────────
  "three-five-balance": {
    title: "I'd make paying this off my only focus right now",
    subtitle: "3–5 cards · Carrying a balance",
    steps: [
      {
        title: "Put new card applications on hold",
        body: "You've already got a solid stack. Adding more cards while carrying a balance adds complexity without solving the real problem. Focus here first.",
      },
      {
        title: "Consider a balance transfer",
        body: "With 3–5 cards and some history, you may qualify for a 0% intro APR balance transfer card. Moving high-interest debt to interest-free for 12–21 months can save you hundreds and speed up payoff significantly.",
      },
      {
        title: "Avalanche method — highest APR first",
        body: "List all your balances and APRs. Pay minimums everywhere, throw everything extra at the highest rate. When it's gone, roll that payment to the next. Boring and it works.",
      },
      {
        title: "Don't close anything while you're paying down",
        body: "Closing cards lowers your available credit and raises your utilization — the opposite of what you want. Keep them all open and barely used while you pay down.",
      },
      {
        title: "Once you're at zero — then you optimize",
        body: "When you're paying in full every month, your stack of 3–5 cards is genuinely powerful. That's when Max Rewards, transfer partners, and premium cards start making real sense. Get to zero first.",
      },
    ],
  },

  "three-five-score": {
    title: "I'd focus on utilization and let time do the rest",
    subtitle: "3–5 cards · Building score",
    steps: [
      {
        title: "Request limit increases on every single card",
        body: "This is the fastest lever you have right now. Higher limits with the same spending = lower utilization = higher score. Most issuers will consider an increase after 6 months of on-time payments. Call each one.",
      },
      {
        title: "Get your utilization under 10% — not just under 30%",
        body: "Under 30% is the standard advice. But real score movement happens under 10%. Pay down before your statement closes — that's the date your balance gets reported to the bureaus.",
      },
      {
        title: "Make sure every card shows activity",
        body: "Issuers can close inactive accounts, which hurts your credit age. Put one small recurring charge on each card — even $5/month — and set up autopay so you never miss a payment.",
      },
      {
        title: "Never close an old account",
        body: "Your oldest card is one of your most valuable assets. Closing it removes years of history from your average account age calculation. It sits open forever, even if you barely touch it.",
      },
      {
        title: "If you open anything new, space it out",
        body: "One card at a time, 3–6 months apart. Each application is a hard inquiry and each new card temporarily lowers your average account age. Only open something new when it clearly adds to what you already have.",
      },
    ],
  },

  "three-five-rewards": {
    title: "I'd make sure every dollar is working as hard as possible",
    subtitle: "3–5 cards · Maximizing rewards",
    steps: [
      {
        title: "Map your spending to your cards",
        body: "Where does your money actually go each month? Dining, groceries, gas, travel, everything else. For each category, which card in your wallet earns the most? If you haven't done this exercise, you're leaving points on the table every single day.",
      },
      {
        title: "Find the gaps and fill them",
        body: "Look for categories where you're earning at 1x or 2x when a card exists that earns 4x. If you don't have an Amex Gold, your dining and grocery spend is underperforming. If you don't have a travel card, your flights and hotels aren't earning 3–4x. Fill one gap at a time.",
      },
      {
        title: "Download Max Rewards",
        body: "This app connects to all your cards and tells you which one to pull out for each purchase in real time. It also tracks benefits and credits so you don't let them expire unused. If you have 3+ cards, this app pays for itself immediately.",
      },
      {
        title: "Learn one transfer partner and actually use it",
        body: "Pick Chase → Hyatt or Chase/Amex → an airline. Research what a redemption looks like for a trip you actually want to take. Book it. The first time you book a $500 hotel room for 15,000 points, the whole system clicks into place.",
      },
      {
        title: "Don't let points sit forever",
        body: "Points accumulate fast but they lose value to inflation over time. If you're sitting on 100,000+ points, plan a trip. That's real money waiting to be used. Use it.",
      },
    ],
  },

  "three-five-premium": {
    title: "I'd run the math honestly before committing",
    subtitle: "3–5 cards · Premium card",
    steps: [
      {
        title: "List every benefit the card offers",
        body: "Get the full list from the issuer's website — every credit, every perk, every multiplier. For the Chase Sapphire Reserve: $300 travel credit, lounge access, 4x on flights and hotels booked directly, 3x on dining, primary rental car coverage. For the Amex Platinum: airline credit, hotel credits, Resy dining credits, Lululemon, Equinox, and dozens more.",
      },
      {
        title: "Mark only what you'd actually use",
        body: "Be honest with yourself. If you don't shop at Lululemon, cross it off. If you don't have a gym membership, the Equinox credit is worthless to you. Add up only the benefits you'd genuinely use this year. If that number beats the fee, the card makes sense.",
      },
      {
        title: "Match the card to your lifestyle",
        body: "The Amex Platinum is the most prestigious card out there — but at $895/yr it only makes sense if your life matches what it rewards. The Sapphire Reserve at $795/yr is simpler: $300 travel credit, lounge access, strong points on dining and travel. It fits more lifestyles and is often the better call.",
      },
      {
        title: "Don't get it just because you can",
        body: "Premium cards are a tool. If you're not using the benefits, you're just paying hundreds of dollars a year for a piece of metal. Get it when the math works. Not before.",
      },
      {
        title: "If you're on the fence — Sapphire Preferred first",
        body: "At $95/yr the Sapphire Preferred gives you most of the same points ecosystem as the Reserve at a fraction of the cost. You can upgrade later when your travel spending justifies the jump.",
      },
    ],
  },

  // ── 5+ cards ──────────────────────────────────────────────────────────────
  "five-plus-points": {
    title: "I'd go deep on transfer partners — that's the real game",
    subtitle: "5+ cards · Maximize points",
    steps: [
      {
        title: "Book a real trip using transfers — if you haven't already",
        body: "If you've been accumulating points and never transferred them, do it this year. Chase → Hyatt for a hotel stay is the easiest place to start. Pick a trip, research the points cost, transfer, book. That first redemption changes how you think about this game forever.",
      },
      {
        title: "Make sure every dollar earns maximum",
        body: "At 5+ cards there should be zero spending going through at 1x. Amex Gold for dining and groceries (4x), Sapphire Reserve for travel (4x booked direct) and dining (3x), a catch-all card for everything else at 2%. Every dollar should earn as much as possible.",
      },
      {
        title: "Use Max Rewards to find what you're still missing",
        body: "Even with a full stack, most people have at least one spending category that's underperforming. The app finds it fast.",
      },
      {
        title: "Know your points ecosystems",
        body: "Chase Ultimate Rewards → United, Hyatt, Southwest, British Airways. Amex Membership Rewards → Delta, Air France, Hilton, Marriott. Capital One Miles → Turkish Airlines, Air Canada, Wyndham. Know which program gets you the best value for the trips you actually want.",
      },
      {
        title: "Don't let airline miles expire",
        body: "Transferable bank points don't expire as long as your card is open. But airline miles can expire after 12–24 months of no account activity. One small purchase through the airline — a flight, a shopping portal purchase — resets the clock.",
      },
    ],
  },

  "five-plus-debt": {
    title: "I'd consolidate and attack this systematically",
    subtitle: "5+ cards · Paying down debt",
    steps: [
      {
        title: "Consider a balance transfer — you likely qualify",
        body: "With a solid card history, you should qualify for a 0% intro APR balance transfer card. Moving high-interest balances to 0% for 15–21 months can save hundreds in interest and let you attack the principal directly.",
      },
      {
        title: "Write out every balance and APR",
        body: "Full picture first. What you owe on each card, what rate you're paying, what the minimum is. You can't make a real plan without the full picture.",
      },
      {
        title: "Avalanche — minimum payments everywhere, everything extra on the highest rate",
        body: "When the highest APR is paid off, roll that payment to the next one. Don't deviate. This is the fastest way out mathematically.",
      },
      {
        title: "Don't close anything as you pay off",
        body: "Paid off does not mean close. Keep everything open. The credit age and available credit keeps working for your score while you pay down.",
      },
      {
        title: "No new cards until you're at zero",
        body: "Your stack is already strong. Adding more right now adds complexity and temptation. Get to zero balances. Then go back to optimizing.",
      },
    ],
  },

  "five-plus-checkup": {
    title: "I'd do a full audit — here's exactly how I'd run it",
    subtitle: "5+ cards · Spot check",
    steps: [
      {
        title: "Annual fee audit",
        body: "List every card with an annual fee. For each one, write down the benefits you actually used this year — not the ones you theoretically could use. If the real value you got doesn't beat the fee, downgrade or cancel before the next renewal.",
      },
      {
        title: "Utilization check",
        body: "Where does your combined utilization land? And per card? Even one card sitting near its limit drags your score down. Pay it down or request a limit increase on that specific card.",
      },
      {
        title: "Credit age — know what you have",
        body: "What's your oldest account? What's your average age across all cards? If you're thinking about closing anything, make sure it's not your oldest card. That one stays open indefinitely.",
      },
      {
        title: "Benefits you're not using",
        body: "Most people with premium cards leave credits sitting unused. Airline credits, hotel credits, dining credits that reset annually. Open Max Rewards, check what resets and when, and make sure you're actually capturing what you're paying for.",
      },
      {
        title: "Have you used your points for anything?",
        body: "If you've been accumulating for a year or more and haven't redeemed anything, plan a trip. Points sitting in an account aren't doing anything for you. That's the whole reason you built the stack — use it.",
      },
    ],
  },
};

// ─── Guide key logic ──────────────────────────────────────────────────────────

function getGuideKey(answers: Answers): string | null {
  const { q1, q3, q4 } = answers;
  if (!q1) return null;

  if (q1 === "zero") {
    if (!q3) return null;
    return `zero-${q3}`;
  }
  if (q1 === "one-three") {
    if (!q3 || !q4) return null;
    if (q4 === "balance") return "one-three-any-balance";
    if (q4 === "collections") return "one-three-any-collections";
    return `one-three-${q3}-clean`;
  }
  if (q1 === "three-five") {
    if (!q3) return null;
    if (q3 === "balance") return "three-five-balance";
    if (!q4) return null;
    return `three-five-${q4}`;
  }
  if (q1 === "five-plus") {
    if (!q3) return null;
    return `five-plus-${q3}`;
  }
  return null;
}

// ─── Question definitions ─────────────────────────────────────────────────────

type Option = { id: string; label: string; desc: string; icon: LucideIcon };

function getQuestions(answers: Answers): { id: string; question: string; options: Option[] }[] {
  const questions: { id: string; question: string; options: Option[] }[] = [
    {
      id: "q1",
      question: "How many credit cards do you have right now?",
      options: [
        { id: "zero", icon: Sprout, label: "Zero cards", desc: "I don't have any credit cards yet" },
        { id: "one-three", icon: ChartColumn, label: "1 to 3 cards", desc: "Just getting started" },
        { id: "three-five", icon: TrendingUp, label: "3 to 5 cards", desc: "Building momentum" },
        { id: "five-plus", icon: Zap, label: "5 or more cards", desc: "Already stacking" },
      ],
    },
    {
      id: "active-duty",
      question: "Are you currently active duty military?",
      options: [
        { id: "yes", icon: Medal, label: "Yes — active duty", desc: "I'm currently serving" },
        { id: "no", icon: User, label: "No", desc: "Veteran, civilian, or recently discharged" },
      ],
    },
  ];

  if (answers.q1 === "zero") {
    questions.push({
      id: "q3",
      question: "Do you have any debt or collections on your record?",
      options: [
        { id: "clean", icon: CircleCheck, label: "No debt — clean slate", desc: "Starting completely fresh" },
        { id: "debt", icon: CreditCard, label: "I have debt", desc: "Loans, medical bills, car payments" },
        { id: "collections", icon: CircleAlert, label: "I have collections", desc: "Debt that went to a collection agency" },
      ],
    });
  }

  if (answers.q1 === "one-three") {
    questions.push({
      id: "q3",
      question: "What kind of cards do you have?",
      options: [
        { id: "store", icon: ShoppingBag, label: "Store / retail cards", desc: "Target, Amazon, department stores, etc." },
        { id: "bank", icon: Landmark, label: "Bank cards", desc: "Visa, Mastercard, or Amex from a bank" },
        { id: "mix", icon: Shuffle, label: "A mix of both", desc: "Some store cards, some bank cards" },
      ],
    });
    questions.push({
      id: "q4",
      question: "Any debt or collections?",
      options: [
        { id: "clean", icon: CircleCheck, label: "No — I pay on time", desc: "In good standing" },
        { id: "balance", icon: TriangleAlert, label: "Carrying a balance", desc: "I owe money I can't pay off right now" },
        { id: "collections", icon: CircleAlert, label: "I have collections", desc: "Debt sent to a collection agency" },
      ],
    });
  }

  if (answers.q1 === "three-five") {
    questions.push({
      id: "q3",
      question: "Do you pay your full balance every month?",
      options: [
        { id: "full", icon: CircleCheck, label: "Yes — always in full", desc: "I pay the full statement balance before the due date" },
        { id: "balance", icon: TriangleAlert, label: "No — I carry a balance", desc: "I owe money across one or more cards" },
      ],
    });
    if (answers.q3 === "full") {
      questions.push({
        id: "q4",
        question: "What's your main goal right now?",
        options: [
          { id: "score", icon: Gauge, label: "Grow my credit score", desc: "I want a higher score" },
          { id: "rewards", icon: Plane, label: "Maximize points and rewards", desc: "I want to get the most out of every purchase" },
          { id: "premium", icon: Gem, label: "Get a premium card", desc: "I'm ready for a high-end card" },
        ],
      });
    }
  }

  if (answers.q1 === "five-plus") {
    questions.push({
      id: "q3",
      question: "What's your main goal right now?",
      options: [
        { id: "points", icon: Plane, label: "Maximize points and travel", desc: "I want to get the most value out of my points" },
        { id: "debt", icon: CreditCard, label: "Pay down debt", desc: "I'm carrying balances I want to eliminate" },
        { id: "checkup", icon: Search, label: "Just making sure I'm doing it right", desc: "I want a full audit of where I stand" },
      ],
    });
  }

  return questions;
}

// ─── QuestionStep component ───────────────────────────────────────────────────

function QuestionStep({
  question,
  questionId,
  options,
  stepIndex,
  totalSteps,
  onSelect,
  onBack,
}: {
  question: string;
  questionId: string;
  options: Option[];
  stepIndex: number;
  totalSteps: number;
  onSelect: (questionId: string, value: string) => void;
  onBack: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelected(id);
    // Brief pause before advancing so the selection is clearly visible and
    // reads as a deliberate confirmation rather than an instant context change.
    setTimeout(() => onSelect(questionId, id), 800);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Progress */}
      <div className="mb-8 flex items-center gap-2" aria-hidden="true">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={cn("h-1.5 flex-1 rounded-full transition-colors duration-300", i <= stepIndex ? "bg-navy" : "bg-muted")}
          />
        ))}
      </div>

      <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
        Question {stepIndex + 1} of {totalSteps}
      </p>
      <h2 className="mt-2 mb-7 text-2xl font-extrabold tracking-[-0.02em] text-navy sm:text-3xl">{question}</h2>

      <div className="flex flex-col gap-3">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelect(opt.id)}
              aria-pressed={isSelected}
              disabled={selected !== null && !isSelected}
              className={cn(
                "group flex items-center gap-4 rounded-2xl p-4 text-left transition-all duration-200 sm:p-5",
                isSelected
                  ? "bg-navy text-white shadow-md"
                  : "bg-card ring-1 ring-border hover:-translate-y-0.5 hover:ring-navy/40 hover:shadow-sm disabled:opacity-50 disabled:hover:translate-y-0",
              )}
            >
              <span
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center rounded-[14px] transition-colors",
                  isSelected ? "bg-white/10" : "bg-secondary group-hover:bg-navy/10",
                )}
              >
                <Icon className={cn("size-[22px]", isSelected ? "text-brass" : "text-navy")} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className={cn("block font-bold", isSelected ? "text-white" : "text-navy")}>{opt.label}</span>
                <span className={cn("block text-sm", isSelected ? "text-[#c9d2e0]" : "text-muted-foreground")}>{opt.desc}</span>
              </span>
              {isSelected && (
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brass">
                  <Check className="size-4 text-navy-deep" strokeWidth={3} aria-hidden="true" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {stepIndex > 0 && (
        <button
          type="button"
          onClick={onBack}
          className="mt-6 flex items-center gap-1.5 rounded-full px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-navy"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          Back
        </button>
      )}
    </div>
  );
}

// ─── Result component ─────────────────────────────────────────────────────────

const GUIDE_ICONS: Record<string, LucideIcon> = {
  zero: Sprout,
  "one-three": ChartColumn,
  "three-five": TrendingUp,
  "five-plus": Zap,
};

function ResultView({
  guide,
  guideKey,
  activeDuty,
  onRestart,
}: {
  guide: Guide;
  guideKey: string;
  activeDuty: boolean;
  onRestart: () => void;
}) {
  const Icon = GUIDE_ICONS[Object.keys(GUIDE_ICONS).find((k) => guideKey.startsWith(k)) ?? ""] ?? Compass;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header card */}
      <div className="rounded-2xl bg-navy-deep p-6 text-white sm:p-8">
        <div className="flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-white/10">
            <Icon className="size-6 text-brass" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-[0.14em] text-brass uppercase">What I would do if I&hellip;</p>
            <h1 className="mt-2 text-2xl leading-tight font-extrabold tracking-[-0.02em] sm:text-[1.75rem]">{guide.title}</h1>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-[#d5dce7]">
            {guide.subtitle}
          </span>
          {activeDuty && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brass px-3 py-1 text-xs font-bold text-navy-deep">
              <Medal className="size-3.5" aria-hidden="true" />
              Military benefits included below
            </span>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-4 flex gap-3 rounded-xl bg-surface p-4 ring-1 ring-border">
        <Info className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <p className="text-xs leading-relaxed text-muted-foreground">
          <span className="font-semibold text-navy">Not financial advice.</span>{" "}This is my personal take — what I would personally do in this situation. I&apos;m not a financial advisor. I&apos;ve shared this with real people, they took action on their own, and it worked. You make your own call.
        </p>
      </div>

      {/* Steps */}
      <p className="mt-10 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
        The plan · {guide.steps.length} steps
      </p>
      <ol className="mt-5 flex flex-col">
        {guide.steps.map((step, i) => (
          <li key={i} className="relative flex gap-4 pb-8 last:pb-0">
            {i < guide.steps.length - 1 && (
              <span className="absolute top-10 bottom-1 left-[17px] w-px bg-navy/15" aria-hidden="true" />
            )}
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
              {i + 1}
            </span>
            <div className="pt-1">
              <p className="text-[17px] font-bold text-navy">{step.title}</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* Military section */}
      {activeDuty && (
        <section aria-labelledby="military-heading" className="mt-10 overflow-hidden rounded-2xl ring-1 ring-border">
          <div className="flex items-center gap-3 bg-navy px-5 py-4 text-white">
            <Medal className="size-5 shrink-0 text-brass" aria-hidden="true" />
            <div>
              <h2 id="military-heading" className="font-bold">Since you&apos;re active duty, don&apos;t skip this</h2>
              <p className="text-xs text-[#c9d2e0]">Benefits most servicemembers never claim</p>
            </div>
          </div>
          <ol className="divide-y divide-border bg-card">
            {MILITARY_STEPS.map((step, i) => (
              <li key={i} className="flex gap-4 p-5">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brass text-xs font-bold text-navy-deep">
                  {i + 1}
                </span>
                <div>
                  <p className="font-bold text-navy">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Restart */}
      <button
        type="button"
        onClick={onRestart}
        className="mt-10 flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-secondary"
      >
        <RotateCcw className="size-4" aria-hidden="true" />
        Start over with a different situation
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PlaybookPage() {
  const { user } = useUser();
  const isFounder = user?.primaryEmailAddress?.emailAddress === "david.vargas024@gmail.com";
  const [cbProgress, setCbProgress] = useState(false);
  const [ccProgress, setCcProgress] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ q1: null, activeDuty: null, q3: null, q4: null });

  useEffect(() => {
    if (isFounder) return;
    fetch("/api/progress")
      .then((r) => r.json())
      .then((data) => {
        setCbProgress(((data["credit-basics"] ?? []) as string[]).includes("pyc-quiz"));
        setCcProgress(((data["credit-cards-101"] ?? []) as string[]).includes("bcs-quiz"));
      })
      .catch(() => {});
  }, [isFounder]);

  // The founder account has every course unlocked.
  const cbDone = isFounder || cbProgress;
  const ccDone = isFounder || ccProgress;
  const unlocked = cbDone && ccDone;

  const questions = getQuestions(answers);
  const guideKey = getGuideKey(answers);
  const guide = guideKey ? GUIDES[guideKey] : null;
  const showResult = !!guide;
  const currentQuestion = questions[stepIndex];

  const handleSelect = (questionId: string, value: string) => {
    const newAnswers = { ...answers };
    if (questionId === "q1") {
      newAnswers.q1 = value;
      newAnswers.q3 = null;
      newAnswers.q4 = null;
    } else if (questionId === "active-duty") {
      newAnswers.activeDuty = value === "yes";
    } else if (questionId === "q3") {
      newAnswers.q3 = value;
      newAnswers.q4 = null;
    } else if (questionId === "q4") {
      newAnswers.q4 = value;
    }
    setAnswers(newAnswers);
    setStepIndex((prev) => prev + 1);
  };

  const handleBack = () => {
    const prev = stepIndex - 1;
    setStepIndex(prev);
    const prevQuestion = questions[prev];
    const newAnswers = { ...answers };
    if (prevQuestion?.id === "q1") {
      newAnswers.q1 = null;
      newAnswers.q3 = null;
      newAnswers.q4 = null;
    } else if (prevQuestion?.id === "active-duty") {
      newAnswers.activeDuty = null;
    } else if (prevQuestion?.id === "q3") {
      newAnswers.q3 = null;
      newAnswers.q4 = null;
    } else if (prevQuestion?.id === "q4") {
      newAnswers.q4 = null;
    }
    setAnswers(newAnswers);
  };

  const handleRestart = () => {
    setAnswers({ q1: null, activeDuty: null, q3: null, q4: null });
    setStepIndex(0);
  };

  const courseStatus = [
    { title: "Credit Basics", href: "/courses/credit-basics", done: cbDone },
    { title: "Credit Cards 101", href: "/courses/credit-cards-101", done: ccDone },
  ];

  return (
    <div className="flex min-h-[100dvh] flex-col bg-surface">
      <header className="shrink-0 border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/courses"
              className="flex shrink-0 items-center gap-1.5 rounded-full px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-navy"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">All courses</span>
              <span className="sr-only sm:hidden">All courses</span>
            </Link>
            <span className="h-6 w-px shrink-0 bg-border" aria-hidden="true" />
            <LogoMark className="hidden h-6 w-5 sm:block" />
            <p className="truncate font-bold text-navy">David&apos;s Playbook</p>
          </div>
          <UserButton />
        </div>
      </header>

      <main className="flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-2xl">
          {/* Intro (while answering) */}
          {unlocked && !showResult && (
            <div className="mb-10">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#7a5a22] uppercase">Bonus · David&apos;s Playbook</p>
              <h1 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] text-navy sm:text-4xl">
                What I Would Do If I&hellip;
              </h1>
              <p className="mt-3 text-[17px] text-muted-foreground">
                Answer a few quick questions and get the step-by-step plan I&apos;d follow in your exact situation.
              </p>
            </div>
          )}

          <div className={cn(unlocked && !showResult && "rounded-2xl bg-card p-6 ring-1 ring-border sm:p-8")}>
            {/* Locked */}
            {!unlocked && (
              <div className="flex flex-col items-center py-12 text-center">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-card ring-1 ring-border">
                  <Lock className="size-7 text-muted-foreground" aria-hidden="true" />
                </div>
                <p className="mt-6 text-xs font-semibold tracking-[0.14em] text-[#7a5a22] uppercase">David&apos;s Playbook</p>
                <h1 className="mt-2 text-2xl font-extrabold tracking-[-0.02em] text-navy sm:text-3xl">
                  Finish both courses to unlock this
                </h1>
                <p className="mt-3 max-w-sm text-[15px] text-muted-foreground">
                  Complete Credit Basics and Credit Cards 101 first. This is where it all comes together.
                </p>
                <ul className="mt-8 flex w-full max-w-sm flex-col gap-3">
                  {courseStatus.map((c) => (
                    <li key={c.href}>
                      <Link
                        href={c.href}
                        className={cn(
                          "flex items-center justify-between gap-3 rounded-2xl bg-card p-4 text-left ring-1 transition-colors hover:bg-secondary/50",
                          c.done ? "ring-emerald-300" : "ring-border",
                        )}
                      >
                        <span className="flex items-center gap-3">
                          {c.done ? (
                            <CircleCheck className="size-5 text-emerald-600" aria-hidden="true" />
                          ) : (
                            <span className="size-5 rounded-full border-2 border-border" aria-hidden="true" />
                          )}
                          <span className="font-semibold text-navy">{c.title}</span>
                        </span>
                        <span className={cn("text-xs font-semibold", c.done ? "text-emerald-700" : "text-muted-foreground")}>
                          {c.done ? "Done" : "Not done"}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quiz flow */}
            {unlocked && !showResult && currentQuestion && (
              <QuestionStep
                key={stepIndex}
                question={currentQuestion.question}
                questionId={currentQuestion.id}
                options={currentQuestion.options}
                stepIndex={stepIndex}
                totalSteps={questions.length}
                onSelect={handleSelect}
                onBack={handleBack}
              />
            )}

            {/* Result */}
            {unlocked && showResult && guide && guideKey && (
              <ResultView
                guide={guide}
                guideKey={guideKey}
                activeDuty={answers.activeDuty === true}
                onRestart={handleRestart}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
