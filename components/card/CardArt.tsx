import { Nfc } from "lucide-react";
import { LogoMark } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

export type CardTier = "combat-black" | "platinum" | "supporter";

const styles: Record<CardTier, { label: string; surface: string; text: string; sub: string; inverted: boolean }> = {
  "combat-black": {
    label: "COMBAT BLACK",
    surface: "bg-[linear-gradient(140deg,#2a2d33_0%,#0a0b0d_55%,#1b1d22_100%)] ring-1 ring-white/10",
    text: "text-white",
    sub: "text-brass",
    inverted: true,
  },
  platinum: {
    label: "PLATINUM",
    surface: "bg-[linear-gradient(135deg,#f0f2f5_0%,#c3c9d2_42%,#e6e9ee_68%,#aab2be_100%)] ring-1 ring-black/5",
    text: "text-navy",
    sub: "text-[#33415a]",
    inverted: false,
  },
  supporter: {
    label: "SUPPORTER",
    surface: "bg-[linear-gradient(140deg,#2e5a9a_0%,#13294b_58%,#0b1f3a_100%)] ring-1 ring-white/10",
    text: "text-white",
    sub: "text-[#c7d5ee]",
    inverted: true,
  },
};

/** Decorative render of a Vet Finance card tier. */
export function CardArt({ tier, className }: { tier: CardTier; className?: string }) {
  const s = styles[tier];
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative aspect-[1.586] w-full overflow-hidden rounded-2xl shadow-[0_24px_50px_rgb(0_0_0/0.35)]",
        s.surface,
        className,
      )}
    >
      {/* Sheen */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_0%_0%,rgb(255_255_255/0.18),transparent_55%)]" />

      <div className="absolute top-[9%] left-[7%] flex items-center gap-2">
        <LogoMark tone={s.inverted ? "inverted" : "default"} className="h-6 w-5" />
        <span className={cn("text-[15px] font-extrabold tracking-tight", s.text)}>Vet Finance</span>
      </div>
      <Nfc className={cn("absolute top-[10%] right-[7%] size-6 opacity-70", s.text)} strokeWidth={1.6} />

      {/* Chip */}
      <div className="absolute top-[40%] left-[7%] h-[19%] w-[15%] rounded-md bg-[linear-gradient(135deg,#e2c993,#a8844a)] shadow-inner">
        <div className="absolute inset-x-0 top-1/2 h-px bg-black/20" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-black/20" />
      </div>

      <p className={cn("absolute bottom-[10%] left-[7%] text-xs font-semibold tracking-[0.2em]", s.sub)}>
        {s.label}
      </p>
    </div>
  );
}
