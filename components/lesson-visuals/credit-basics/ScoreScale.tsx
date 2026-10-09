"use client";

import { useId, useState } from "react";
import { VisualFrame } from "@/components/lesson-visuals/VisualFrame";
import { cn } from "@/lib/utils";

const MIN = 300;
const MAX = 850;
const TARGET = 740;

// Tiers and descriptions match the table in the "What Is Credit?" lesson.
const tiers = [
  { min: 300, max: 579, label: "Poor", desc: "Most lenders will decline or require a co-signer.", fill: "bg-[#d9e3f1]" },
  { min: 580, max: 669, label: "Fair", desc: "Getting approved is harder. Rates start climbing.", fill: "bg-[#b4c7e3]" },
  { min: 670, max: 739, label: "Good", desc: "Approved for most things, not always the best rate.", fill: "bg-[#84a3d0]" },
  { min: 740, max: 799, label: "Very Good", desc: "Close to the best rates. This is the real target.", fill: "bg-[#2e5a9a]" },
  { min: 800, max: 850, label: "Exceptional", desc: "Best rates on everything. Lenders compete for you.", fill: "bg-navy" },
];

const pos = (score: number) => ((score - MIN) / (MAX - MIN)) * 100;

/** What Is Credit?: the 300–850 scale with tiers, a 740 target, and a score you can drag. */
export function ScoreScale() {
  const [score, setScore] = useState(650);
  const inputId = useId();
  const tier = tiers.find((t) => score >= t.min && score <= t.max) ?? tiers[0];

  return (
    <VisualFrame title="The credit score scale" tryIt="Drag the slider to see where a score lands">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div aria-live="polite">
          <p className="text-4xl font-extrabold tracking-tight text-navy tabular-nums">{score}</p>
          <p className="mt-1 text-sm">
            <span className="font-bold text-navy">{tier.label}.</span>{" "}
            <span className="text-muted-foreground">{tier.desc}</span>
          </p>
        </div>
        <p className="text-sm font-semibold text-muted-foreground">
          {score >= TARGET ? "At or above the 740 target" : `${TARGET - score} points to the 740 target`}
        </p>
      </div>

      {/* Scale */}
      <div className="relative mt-8">
        {/* Target line */}
        <div className="absolute -top-6 bottom-0 z-10 flex -translate-x-1/2 flex-col items-center" style={{ left: `${pos(TARGET)}%` }} aria-hidden="true">
          <span className="text-[11px] font-bold whitespace-nowrap text-navy">Target 740</span>
          <span className="flex-1 border-l-2 border-dashed border-navy" />
        </div>

        <div className="relative h-10 overflow-hidden rounded-xl" aria-hidden="true">
          {tiers.map((t, i) => {
            const end = i < tiers.length - 1 ? tiers[i + 1].min : MAX;
            return (
              <div
                key={t.label}
                className={cn("absolute inset-y-0 transition-opacity", t.fill, t !== tier && "opacity-45")}
                style={{ left: `${pos(t.min)}%`, width: `${pos(end) - pos(t.min)}%` }}
              />
            );
          })}
        </div>

        {/* Your score marker */}
        <div
          className="absolute -top-1.5 h-[3.25rem] w-1 -translate-x-1/2 rounded-full bg-brass ring-2 ring-white transition-[left] duration-150"
          style={{ left: `${pos(score)}%` }}
          aria-hidden="true"
        />
      </div>

      {/* Boundary ticks at their true positions */}
      <div className="relative mt-2 h-4 text-xs font-medium text-muted-foreground tabular-nums" aria-hidden="true">
        {[300, 580, 670, 740, 800, 850].map((n) => (
          <span
            key={n}
            className={cn("absolute", n === 300 ? "left-0" : n === 850 ? "right-0" : "-translate-x-1/2", n === 800 && "hidden sm:inline")}
            style={n === 300 || n === 850 ? undefined : { left: `${pos(n)}%` }}
          >
            {n}
          </span>
        ))}
      </div>

      <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2" aria-label="Score tiers">
        {tiers.map((t) => (
          <li key={t.label} className={cn("flex items-center gap-1.5 text-sm", t === tier ? "font-bold text-navy" : "text-muted-foreground")}>
            <span className={cn("size-3 rounded-sm", t.fill)} aria-hidden="true" />
            {t.label}
            <span className="text-xs font-normal text-muted-foreground tabular-nums">
              {t.min}–{t.max}
            </span>
          </li>
        ))}
      </ul>

      <label htmlFor={inputId} className="mt-6 block text-sm font-semibold text-navy">
        Drag to try a score
      </label>
      <input
        id={inputId}
        type="range"
        min={MIN}
        max={MAX}
        step={5}
        value={score}
        onChange={(e) => setScore(Number(e.target.value))}
        aria-valuetext={`${score}, ${tier.label}`}
        data-nudge
        className="mt-2 w-full rounded-full accent-brass-deep"
      />
    </VisualFrame>
  );
}
