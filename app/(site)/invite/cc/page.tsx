"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Shield, ArrowRight, Users } from "lucide-react";
import Link from "next/link";

export default function CodeAndCoffeePage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const [eventActive, setEventActive] = useState<boolean | null>(null);
  const [activating, setActivating] = useState(false);

  useEffect(() => {
    // Check if the Code & Coffee invite is active
    fetch("/api/invite/validate?type=cc")
      .then((r) => r.json())
      .then((d) => setEventActive(d.active))
      .catch(() => setEventActive(false));
  }, []);

  // If already signed in and activated, go straight to courses
  useEffect(() => {
    if (isLoaded && isSignedIn && user?.publicMetadata?.activated) {
      router.replace("/courses");
    }
  }, [isLoaded, isSignedIn, user, router]);

  const handleActivateExisting = async () => {
    setActivating(true);
    const res = await fetch("/api/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "cc" }),
    });
    if (res.ok) {
      router.push("/courses");
    } else {
      const { error } = await res.json();
      alert(error ?? "Something went wrong.");
      setActivating(false);
    }
  };

  const handleNewAccount = () => {
    localStorage.setItem("vf-join-type", "cc");
    router.push("/join/cc");
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
        <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-foreground shadow-lg">
          <span className="text-xl font-black text-background">VF</span>
        </div>
        <h1 className="mb-3 text-2xl font-bold text-foreground">This event access has ended.</h1>
        <p className="mb-6 max-w-sm text-sm text-muted-foreground">
          The Code &amp; Coffee beta window is closed. If you&apos;d like personal access, reach out to David.
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

        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-foreground shadow-lg">
            <span className="text-xl font-black text-background">VF</span>
          </div>
        </div>

        {/* Event badge */}
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white"
          style={{ background: "var(--brand-600)" }}
        >
          <Users className="size-3" />
          Code &amp; Coffee
        </div>

        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
          You&apos;re in.
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
          Welcome to Vet Finance beta — free financial education built for military members and veterans.
          Create your account to start learning.
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

        {isSignedIn ? (
          // Already signed in but not activated
          <button
            onClick={handleActivateExisting}
            disabled={activating}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ background: "var(--brand-600)" }}
          >
            {activating ? "Activating..." : "Unlock my access"}
            <ArrowRight className="size-4" />
          </button>
        ) : (
          <>
            <button
              onClick={handleNewAccount}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--brand-600)" }}
            >
              Create your free account
              <ArrowRight className="size-4" />
            </button>
            <p className="mt-4 text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/sign-in" className="font-medium text-foreground underline underline-offset-2 hover:opacity-80 transition-opacity">
                Sign in
              </Link>
            </p>
          </>
        )}

        <p className="mt-6 text-xs text-muted-foreground">
          100% free — no credit card, no catch.
        </p>
      </div>
    </div>
  );
}
