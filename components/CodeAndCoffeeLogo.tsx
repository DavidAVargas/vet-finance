import Image from "next/image";
import { cn } from "@/lib/utils";

/** The Code & Coffee wordmark on a white tile, sized for dark headers. The logo is 3:1. */
export function CodeAndCoffeeLogo({ className, imageClassName }: { className?: string; imageClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-2xl bg-white px-3.5 py-2.5 shadow-sm", className)}>
      <Image
        src="/cc-logo.webp"
        alt="Code & Coffee"
        width={925}
        height={308}
        className={cn("h-9 w-auto", imageClassName)}
        priority
      />
    </span>
  );
}
