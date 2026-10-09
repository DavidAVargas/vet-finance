"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { VisualFrame } from "@/components/lesson-visuals/VisualFrame";
import { cn } from "@/lib/utils";

const LIMIT_PER_CARD = 5000;
const SPEND = 2000;
const MAX_CARDS = 5;
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

// Same thresholds as the utilization meter in Credit Basics.
function status(pct: number) {
  if (pct <= 10) return { label: "Excellent", tone: "text-emerald-700", bar: "bg-emerald-600" };
  if (pct <= 30) return { label: "OK, don't go higher", tone: "text-navy", bar: "bg-navy" };
  if (pct <= 60) return { label: "Hurting your score", tone: "text-amber-800", bar: "bg-amber-600" };
  return { label: "Serious damage", tone: "text-[#b42318]", bar: "bg-[#b42318]" };
}

/** Why You Want 5+ Cards: the same spending spread over more available credit. */
export function StackUtilization() {
  const [cards, setCards] = useState(1);
  const limit = cards * LIMIT_PER_CARD;
  const pct = Math.round((SPEND / limit) * 100);
  const s = status(pct);

  return (
    <VisualFrame
      title="Same $2,000 a month, more cards"
      tryIt="Add cards and watch your utilization drop"
      caption="Each card has a $5,000 limit. Add cards slowly, one or two a year."
    >
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2" data-nudge>
          <button
            type="button"
            onClick={() => setCards((c) => Math.max(1, c - 1))}
            disabled={cards === 1}
            aria-label="Remove a card"
            className="flex size-10 items-center justify-center rounded-full border border-brass-deep/50 bg-card text-navy hover:bg-secondary disabled:opacity-40"
          >
            <Minus className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setCards((c) => Math.min(MAX_CARDS, c + 1))}
            disabled={cards === MAX_CARDS}
            aria-label="Add a card"
            className="flex size-10 items-center justify-center rounded-full bg-navy text-white hover:bg-navy/90 disabled:opacity-40"
          >
            <Plus className="size-4" />
          </button>
        </div>
        <ul className="flex gap-2" aria-label={`${cards} of ${MAX_CARDS} cards`}>
          {Array.from({ length: MAX_CARDS }, (_, i) => (
            <li
              key={i}
              aria-hidden="true"
              className={cn(
                "h-9 w-14 rounded-md transition-colors sm:h-10 sm:w-16",
                i < cards
                  ? "bg-[linear-gradient(140deg,#2e5a9a,#13294b)] shadow-sm"
                  : "border-2 border-dashed border-border bg-card",
              )}
            />
          ))}
        </ul>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3" aria-live="polite">
        <div>
          <p className="text-xs text-muted-foreground">Cards</p>
          <p className="text-2xl font-extrabold text-navy tabular-nums">{cards}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Total limit</p>
          <p className="text-2xl font-extrabold text-navy tabular-nums">{usd(limit)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Utilization</p>
          <p className={cn("text-2xl font-extrabold tabular-nums", s.tone)}>{pct}%</p>
        </div>
      </div>

      <div className="relative mt-4 h-3 overflow-hidden rounded-full bg-card ring-1 ring-border">
        <div className={cn("h-full transition-all duration-300", s.bar)} style={{ width: `${pct}%` }} />
        <span className="absolute inset-y-0 left-[10%] w-px bg-navy/30" aria-hidden="true" />
        <span className="absolute inset-y-0 left-[30%] w-0.5 bg-brass" aria-hidden="true" />
      </div>
      <p className={cn("mt-2 text-sm font-bold", s.tone)}>{s.label}</p>
    </VisualFrame>
  );
}
