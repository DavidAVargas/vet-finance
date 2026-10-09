import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Consistent container for in-lesson diagrams and interactive visuals. */
export function VisualFrame({
  title,
  caption,
  children,
  className,
}: {
  title?: string;
  caption?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure className={cn("mb-8 overflow-hidden rounded-2xl border border-border bg-surface", className)}>
      {title && (
        <div className="border-b border-border bg-card px-5 py-3 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase sm:px-6">
          {title}
        </div>
      )}
      <div className="p-5 sm:p-6">{children}</div>
      {caption && (
        <figcaption className="border-t border-border bg-card px-5 py-3 text-sm text-muted-foreground sm:px-6">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Two-option segmented control used by several visuals. */
export function Toggle<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex rounded-full border border-border bg-card p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
            value === o.value ? "bg-navy text-white" : "text-muted-foreground hover:text-navy",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
