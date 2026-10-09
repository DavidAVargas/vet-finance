"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Pointer } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Consistent container for in-lesson diagrams and interactive visuals.
 * Pass `tryIt` (a short instruction) for interactive visuals: the frame gets a brass
 * top edge and a "Try it" header, and controls marked `data-nudge` pulse once when
 * the frame first scrolls into view.
 */
export function VisualFrame({
  title,
  tryIt,
  caption,
  children,
  className,
}: {
  title?: string;
  tryIt?: string;
  caption?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!tryIt || !el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [tryIt]);

  return (
    <figure
      ref={ref}
      data-seen={seen || undefined}
      className={cn(
        "mb-8 overflow-hidden rounded-2xl border border-border bg-surface",
        tryIt && "border-t-[3px] border-t-brass",
        className,
      )}
    >
      {(title || tryIt) && (
        <div className="border-b border-border bg-card px-5 py-3 sm:px-6">
          {title && (
            <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">{title}</p>
          )}
          {tryIt && (
            <p className={cn("flex flex-wrap items-center gap-x-2.5 gap-y-1", title && "mt-2")}>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brass/20 px-2.5 py-0.5 text-xs font-bold tracking-wide text-[#7a5a22] uppercase">
                <Pointer className="size-3.5" aria-hidden="true" />
                Try it
              </span>
              <span className="text-sm font-semibold text-navy">{tryIt}</span>
            </p>
          )}
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
    <div
      role="group"
      aria-label={label}
      data-nudge
      className="inline-flex rounded-full border border-brass-deep/50 bg-card p-1"
    >
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
