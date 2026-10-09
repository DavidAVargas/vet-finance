import { VisualFrame } from "@/components/lesson-visuals/VisualFrame";

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

// Illustrative example built on the lesson's steps; not a guaranteed outcome.
const steps = [
  { label: "The bill you receive", note: "Chargemaster price: the opening offer", amount: 12000 },
  { label: "Request the itemized bill", note: "Duplicate charges and errors removed", amount: 10800 },
  { label: "Ask for the cash-pay rate", note: "Close to what an insurer would pay", amount: 6500 },
  { label: "Offer a lump sum", note: "Paid in full today, settled for less", amount: 4800 },
];

const MAX = steps[0].amount;

/** Hospital Bills Are Negotiable: how each step in the lesson brings a bill down. */
export function BillStaircase() {
  const saved = steps[0].amount - steps[steps.length - 1].amount;

  return (
    <VisualFrame
      title="Example: how one hospital bill comes down"
      caption="Illustrative numbers. Results vary by hospital, but every step is worth asking for."
    >
      <ol className="flex flex-col gap-3">
        {steps.map((s, i) => (
          <li key={s.label} className="grid grid-cols-[1.75rem_1fr] items-center gap-3 sm:grid-cols-[1.75rem_13rem_1fr]">
            <span className="flex size-7 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-navy">{s.label}</p>
              <p className="text-xs text-muted-foreground">{s.note}</p>
            </div>
            <div className="col-span-2 flex items-center gap-3 sm:col-span-1">
              <div className="h-7 flex-1 overflow-hidden rounded-md bg-card ring-1 ring-border">
                <div
                  className={i === 0 ? "h-full bg-[#b42318]/80" : "h-full bg-navy"}
                  style={{ width: `${(s.amount / MAX) * 100}%`, opacity: i === 0 ? 1 : 0.55 + i * 0.15 }}
                />
              </div>
              <span className="w-16 text-right text-sm font-bold text-navy tabular-nums">{usd(s.amount)}</span>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-5 rounded-xl bg-navy px-4 py-3 text-sm text-white">
        Same care, same hospital: <span className="font-bold text-brass">{usd(saved)} less</span>, just by asking.
      </p>
    </VisualFrame>
  );
}
