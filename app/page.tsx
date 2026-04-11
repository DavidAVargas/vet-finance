import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, BookOpen, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
      {/* Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
        <Shield className="size-3.5" />
        <span>Built for those who served</span>
      </div>

      {/* Headline */}
      <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        Financial freedom,{" "}
        <span className="text-foreground/50">earned and free.</span>
      </h1>

      {/* Subheadline */}
      <p className="mt-6 max-w-xl text-lg text-muted-foreground">
        Free credit and finance education for active duty, veterans, and
        military families. Know your benefits. Build your future.
      </p>

      {/* CTAs */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button size="lg" asChild>
          <Link href="/learn">
            <BookOpen className="size-4" />
            Start Learning
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/card">
            The Card
            <ChevronRight className="size-4" />
          </Link>
        </Button>
      </div>

      {/* Trust line */}
      <p className="mt-12 text-sm text-muted-foreground">
        Veteran-founded · Free for military · No credit card required
      </p>

      {/* Stats row */}
      <div className="mt-16 grid grid-cols-1 gap-8 border-t border-border pt-16 sm:grid-cols-3 sm:gap-12">
        <div className="flex flex-col items-center gap-1">
          <span className="text-3xl font-bold text-foreground">18M+</span>
          <span className="text-sm text-muted-foreground">Veterans in the U.S.</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-3xl font-bold text-foreground">100%</span>
          <span className="text-sm text-muted-foreground">Free for military members</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-3xl font-bold text-foreground">$0</span>
          <span className="text-sm text-muted-foreground">Cost to get started</span>
        </div>
      </div>
    </div>
  );
}
