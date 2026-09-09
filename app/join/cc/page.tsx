"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { ArrowRight, Shield } from "lucide-react";
import Image from "next/image";

export default function JoinCCPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [eventActive, setEventActive] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/invite/validate?type=cc")
      .then((r) => r.json())
      .then((d) => setEventActive(d.active))
      .catch(() => setEventActive(false));
  }, []);

  // Already signed in and activated → go to courses
  useEffect(() => {
    if (isLoaded && isSignedIn && user?.publicMetadata?.activated) {
      router.replace("/courses");
    }
  }, [isLoaded, isSignedIn, user, router]);

  const handleJoin = () => {
    localStorage.setItem("vf-join-type", "cc");
    router.push("/sign-up");
  };

  const handleSignIn = () => {
    localStorage.setItem("vf-join-type", "cc");
    router.push("/sign-in");
  };

  if (!isLoaded || eventActive === null) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-background">
        <div className="size-6 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
      </div>
    );
  }

  if (!eventActive) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-6 py-16 text-center">
        <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-foreground">
          <span className="text-xl font-black text-background">VF</span>
        </div>
        <h1 className="mb-3 text-2xl font-bold text-foreground">This event has ended.</h1>
        <p className="mb-6 max-w-sm text-sm text-muted-foreground">
          The 💻 Code &amp; ☕️ Coffee beta window is closed. Want personal access? Reach out to David.
        </p>
        <a
          href="mailto:david.vargas024@gmail.com"
          className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: "var(--brand-600)" }}
        >
          Contact David
        </a>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-sm text-center">

        {/* Logos */}
        <div className="mb-6 flex items-center justify-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-foreground shadow-lg">
            <span className="text-xl font-black text-background">VF</span>
          </div>
          <span className="text-2xl text-muted-foreground font-light">×</span>
          <div className="flex size-14 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg border border-border">
            <Image
              src="/cc-logo.webp"
              alt="Code & Coffee"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
        </div>

        {/* Event badge */}
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          💻 Code &amp; ☕️ Coffee
        </p>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
          You&apos;re in.
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
          Free financial education built for military members and veterans —
          credit, debt, VA benefits, and more. Create your free account to start.
        </p>

        {/* What's inside */}
        <div className="mb-8 rounded-xl border border-border bg-muted/30 p-5 text-left">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            What&apos;s inside
          </p>
          <div className="flex flex-col gap-2">
            {[
              "Credit Basics — scores, utilization, building from zero",
              "Credit Cards 101 — pick the right card, military perks",
              "Debt Traps — car loans, medical bills, student loans",
              "Military Money — BAH, TSP, VA loan, GI Bill, disability",
              "David's Playbook — personalized step-by-step guide",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Shield className="mt-0.5 size-3.5 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleJoin}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: "var(--brand-600)" }}
        >
          Create your free account
          <ArrowRight className="size-4" />
        </button>

        <p className="mt-4 text-sm text-muted-foreground">
          Already have an account?{" "}
          <button
            onClick={handleSignIn}
            className="font-medium text-foreground underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            Sign in
          </button>
        </p>

        <p className="mt-6 text-xs text-muted-foreground">
          100% free — no credit card, no catch. Ever.
        </p>
      </div>
    </div>
  );
}
