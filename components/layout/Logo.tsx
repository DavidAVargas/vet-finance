import { cn } from "@/lib/utils";

type Tone = "default" | "inverted";

/** Shield with two chevrons — the Vet Finance mark. Use `inverted` on navy backgrounds. */
export function LogoMark({ className, tone = "default" }: { className?: string; tone?: Tone }) {
  const inverted = tone === "inverted";
  return (
    <svg
      viewBox="0 0 32 36"
      aria-hidden="true"
      className={cn("h-8 w-7 shrink-0", className)}
    >
      <path
        d="M16 1.5 L30 6.5 V17 C30 25.8 23.8 31.6 16 34.5 C8.2 31.6 2 25.8 2 17 V6.5 Z"
        className={inverted ? "fill-white" : "fill-navy"}
      />
      <path
        d="M9 13.5 L16 18.5 L23 13.5"
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={inverted ? "stroke-navy-deep" : "stroke-white"}
      />
      <path
        d="M9 20 L16 25 L23 20"
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-brass"
      />
    </svg>
  );
}

export function Logo({ className, tone = "default" }: { className?: string; tone?: Tone }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark tone={tone} />
      <span
        className={cn(
          "text-xl font-extrabold tracking-tight",
          tone === "inverted" ? "text-white" : "text-navy",
        )}
      >
        Vet Finance
      </span>
    </span>
  );
}
