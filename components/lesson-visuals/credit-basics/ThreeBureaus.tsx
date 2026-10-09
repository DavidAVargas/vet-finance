import { CircleCheck, CircleX } from "lucide-react";
import { VisualFrame } from "@/components/lesson-visuals/VisualFrame";
import { cn } from "@/lib/utils";

// Scores match the lesson's mortgage example (710 / 725 / 740 → middle score 725).
const bureaus = [
  { name: "Equifax", score: 725, accounts: { "Visa card": true, "Auto loan": true, "Store card": false }, middle: true },
  { name: "TransUnion", score: 740, accounts: { "Visa card": true, "Auto loan": true, "Store card": true }, middle: false },
  { name: "Experian", score: 710, accounts: { "Visa card": true, "Auto loan": false, "Store card": false }, middle: false },
];

/** The 3 Bureaus: separate files, slightly different scores, and the middle score lenders use. */
export function ThreeBureaus() {
  return (
    <VisualFrame
      title="Three bureaus, three files on the same person"
      caption="Each lender chooses which bureaus it reports to, so each file, and each score, can be a little different."
    >
      <ul className="grid gap-3 sm:grid-cols-3">
        {bureaus.map((b) => (
          <li
            key={b.name}
            className={cn(
              "relative flex flex-col rounded-2xl bg-card p-5 ring-1",
              b.middle ? "ring-2 ring-brass" : "ring-border",
            )}
          >
            {b.middle && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brass px-2.5 py-0.5 text-[11px] font-bold whitespace-nowrap text-navy-deep">
                Middle score
              </span>
            )}
            <p className="text-sm font-bold text-muted-foreground">{b.name}</p>
            <p className="mt-1 text-4xl font-extrabold tracking-tight text-navy tabular-nums">{b.score}</p>

            <p className="mt-4 text-[11px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">On this file</p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {Object.entries(b.accounts).map(([acct, reported]) => (
                <li
                  key={acct}
                  className={cn("flex items-center gap-2 text-sm", reported ? "text-foreground/85" : "text-muted-foreground line-through")}
                >
                  {reported ? (
                    <CircleCheck className="size-4 shrink-0 text-emerald-600" aria-label="Reported" />
                  ) : (
                    <CircleX className="size-4 shrink-0 text-muted-foreground/60" aria-label="Not reported" />
                  )}
                  {acct}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <p className="mt-5 rounded-xl bg-navy px-4 py-3 text-sm text-white">
        <span className="font-bold">Applying for a mortgage?</span> The lender pulls all three and uses the{" "}
        <span className="font-bold text-brass">middle score, 725</span>, not the highest.
      </p>
    </VisualFrame>
  );
}
