/**
 * The original 15 "What I would do" credit guides, keyed by credit situation.
 * Used as the "Your credit plan" part of David's Playbook.
 */

export type Step = { title: string; body: string };
export type Guide = {
  title: string;
  subtitle: string;
  steps: Step[];
};

export type CreditAnswers = {
  q1: string | null;
  q3: string | null;
  q4: string | null;
};

// ─── Active duty card perks (shown only to active duty) ───────────────────────

export const ACTIVE_DUTY_CARD_STEPS: Step[] = [
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

export const GUIDES: Record<string, Guide> = {
  // ── 0 cards ───────────────────────────────────────────────────────────────
  "zero-clean": {
    title: "I'd start building the right way — right now",
    subtitle: "Zero cards · Clean slate",
    steps: [
      {
        title: "Get a basic, no-annual-fee card from your own bank",
        body: "Start with the bank or credit union you already use. You already have a relationship with them, which makes approval easier. Ask for their basic credit card with no annual fee. You don't need rewards yet; this card is about building history. If you get denied, a secured card is the backup: it works like a normal card, except you put down a refundable deposit (usually $200–$500) that becomes your limit. After months of on-time payments, you can usually move to a regular card and get the deposit back.",
      },
      {
        title: "Put one recurring charge on it every month",
        body: "A subscription, gas, one grocery run — something small and predictable. Keep the balance under 30% of your limit (under 10% is even better). You're not trying to earn rewards yet. You're building a track record. Every on-time payment is a data point working in your favor.",
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
        title: "At 12 months — add a rewards card",
        body: "After a year of on-time payments you should be in the 650–700+ range. Now add a no-annual-fee rewards card like Chase Freedom Unlimited or Discover it. Keep your first card open; its age keeps working for your score.",
      },
    ],
  },

  "zero-debt": {
    title: "I'd get my footing first — then build credit alongside the payoff",
    subtitle: "Zero cards · Has debt",
    steps: [
      {
        title: "Get your spending and income under control first",
        body: "Before you add a card, make sure you're tracking every dollar, staying positive every paycheck, and ideally have that second income started. A card only helps if you can pay it in full every month.",
      },
      {
        title: "Then get a basic, no-annual-fee card from your own bank",
        body: "Start with the bank or credit union you already use; your relationship with them makes approval easier. No rewards needed yet. If you get denied, a secured card is the backup: you put down a refundable deposit (usually $200–$500) that becomes your limit.",
      },
      {
        title: "Put one small charge on it every month",
        body: "A subscription or a tank of gas. Keep the balance under 30% of your limit (under 10% is even better). Every on-time payment builds your history while you pay down your other debt.",
      },
      {
        title: "Pay it in full before the due date, every time",
        body: "Never carry a balance on it. Your new card should never become new debt. Set up autopay so you can't miss a payment.",
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
        body: "They charge $100+/month and usually can't remove legitimate debt — only dispute actual errors. What actually works: settling it. Newer scoring models (FICO 9 and 10, VantageScore 3 and 4) ignore paid collections completely, so your score can jump once it's paid. Older FICO 8, which many lenders still use, may keep counting it, so ask the agency to delete it from your report as part of the deal. The person I helped went from the 600s to 750 after settling 3 collections. That's real. Then get a basic no-annual-fee card from your bank (or a secured card if you're denied) and build from there.",
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

export function getGuideKey(answers: CreditAnswers): string | null {
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

