import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  { title: "My Story", status: "done" },
  { title: "Why Credit Matters", status: "done" },
  { title: "How Credit Works", status: "current" },
  { title: "Tracking Your Credit", status: "todo" },
  { title: "Protecting Your Credit", status: "todo" },
] as const;

const answers = ["3%", "30%", "300%"];
const picked = "30%";

/** Static, decorative snapshot of a Credit Basics lesson for the homepage hero. */
export function LessonPreview() {
  return (
    <figure
      aria-label="Preview of a lesson from the Credit Basics course"
      className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_48px_rgb(19_41_75/0.10)]"
    >
      <div aria-hidden="true">
        <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
          <span className="text-[15px] font-bold text-foreground">Credit Basics</span>
          <span className="text-sm text-muted-foreground">Section 3 of 5</span>
        </div>

        <div className="flex flex-col sm:flex-row">
          <ul className="hidden w-52 shrink-0 flex-col gap-1 border-r border-border bg-muted/40 px-3 py-4 text-sm sm:flex">
            {sections.map((s) => (
              <li
                key={s.title}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5",
                  s.status === "done" && "text-muted-foreground",
                  s.status === "current" && "bg-secondary font-semibold text-secondary-foreground",
                  s.status === "todo" && "text-muted-foreground/70",
                )}
              >
                {s.status === "done" ? (
                  <Check className="size-4 shrink-0 text-emerald-700 dark:text-emerald-400" strokeWidth={2.6} />
                ) : (
                  <span
                    className={cn(
                      "size-4 shrink-0 rounded-full border-2",
                      s.status === "current" ? "border-primary" : "border-border",
                    )}
                  />
                )}
                {s.title}
              </li>
            ))}
          </ul>

          <div className="flex-1 px-6 py-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              The 5 Factors of Your Score
            </p>
            <p className="mt-1 text-xl font-bold tracking-tight text-foreground">Credit utilization</p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              How much of your available credit you&apos;re using. Stay under 30%, ideally under 10%. It&apos;s
              the one people mess up the most without realizing it.
            </p>

            <div className="mt-5 rounded-xl border border-border bg-muted/40 px-4 py-3.5">
              <p className="text-sm font-semibold text-foreground">
                Quick check: a $300 balance on a $1,000 limit is…
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {answers.map((a) => (
                  <span
                    key={a}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 text-sm",
                      a === picked
                        ? "border-2 border-primary bg-secondary font-semibold text-secondary-foreground"
                        : "border-input bg-card text-muted-foreground",
                    )}
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="h-1 bg-muted">
          <div className="h-1 w-2/5 bg-brass" />
        </div>
      </div>
    </figure>
  );
}
