"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { ArrowRight, Check, HeartHandshake, Landmark, Lock, Medal, Shield, type LucideIcon } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

const MILITARY_OPTIONS: { value: string; label: string; desc: string; icon: LucideIcon }[] = [
  { value: "active-duty", label: "Active duty", desc: "Currently serving in the military", icon: Medal },
  { value: "veteran", label: "Veteran", desc: "Previously served and separated", icon: Landmark },
  { value: "law-enforcement", label: "Law enforcement", desc: "Currently serving or retired from law enforcement", icon: Shield },
  { value: "civilian", label: "Civilian supporter", desc: "Supporting the military community", icon: HeartHandshake },
];

/** Set by the invite page so the same invite is redeemed after sign-up. */
const INVITE_KEY = "vf-invite-code";

export default function OnboardingPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Read after hydration: undefined while loading, null when this browser has no invite.
  const invite = useSyncExternalStore(
    () => () => {},
    () => localStorage.getItem(INVITE_KEY),
    () => undefined,
  );

  const handleContinue = async () => {
    if (!selected) return;
    setLoading(true);
    setError("");

    const res = await fetch("/api/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inviteCode: invite ?? "", militaryStatus: selected }),
    });

    if (res.ok) {
      localStorage.removeItem(INVITE_KEY);
      document.cookie = "vf-invite=; path=/; max-age=0; samesite=lax";
      window.location.href = "/courses";
    } else {
      const { error: msg } = await res.json();
      setError(msg ?? "Something went wrong. Try your invite link again.");
      setLoading(false);
    }
  };

  // Already a member: nothing to set up.
  const { user } = useUser();
  const activated = !!user?.publicMetadata?.activated;
  useEffect(() => {
    if (activated) window.location.replace("/courses");
  }, [activated]);

  // Signed in without an invite (e.g. an account made outside the site): nothing to unlock.
  if (invite === null && !activated) {
    return (
      <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-surface px-4 py-12">
        <div className="w-full max-w-md rounded-3xl bg-card p-8 text-center ring-1 ring-border sm:p-10">
          <div className="flex justify-center">
            <Logo />
          </div>
          <span className="mx-auto mt-8 flex size-14 items-center justify-center rounded-2xl bg-navy">
            <Lock className="size-6 text-brass" strokeWidth={2} aria-hidden="true" />
          </span>
          <h1 className="mt-5 text-2xl font-extrabold tracking-[-0.02em] text-navy">Vet Finance is invite-only</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            Your account is set up, but access opens with an invite. If someone sent you an invite link,
            open it on this device to unlock everything.
          </p>
          <SignOutButton redirectUrl="/">
            <button
              type="button"
              className="mt-7 h-12 w-full rounded-full border border-input text-base font-semibold text-navy hover:bg-secondary"
            >
              Sign out
            </button>
          </SignOutButton>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-surface px-4 py-12">
      <div className="w-full max-w-md rounded-3xl bg-card p-7 ring-1 ring-border sm:p-9">
        <div className="flex justify-center">
          <Logo />
        </div>

        <p className="mt-8 text-center text-xs font-semibold tracking-[0.14em] text-[#7a5a22] uppercase">Last step</p>
        <h1 className="mt-2 text-center text-2xl font-extrabold tracking-[-0.02em] text-navy sm:text-3xl">
          Tell us about yourself
        </h1>
        <p className="mt-2 text-center text-[15px] text-muted-foreground">
          This helps us tailor your experience. Pick the one that fits best.
        </p>

        <div role="group" aria-label="Your background" className="mt-7 flex flex-col gap-3">
          {MILITARY_OPTIONS.map(({ value, label, desc, icon: Icon }) => {
            const isSelected = selected === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setSelected(value)}
                aria-pressed={isSelected}
                disabled={loading}
                className={cn(
                  "flex items-center gap-4 rounded-2xl p-4 text-left transition-all",
                  isSelected ? "bg-navy text-white shadow-md" : "bg-card ring-1 ring-border hover:ring-navy/40",
                )}
              >
                <span
                  className={cn(
                    "flex size-11 shrink-0 items-center justify-center rounded-[14px]",
                    isSelected ? "bg-white/10" : "bg-secondary",
                  )}
                >
                  <Icon className={cn("size-5", isSelected ? "text-brass" : "text-navy")} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={cn("block font-bold", isSelected ? "text-white" : "text-navy")}>{label}</span>
                  <span className={cn("block text-sm", isSelected ? "text-[#c9d2e0]" : "text-muted-foreground")}>{desc}</span>
                </span>
                {isSelected && (
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brass">
                    <Check className="size-3.5 text-navy-deep" strokeWidth={3} aria-hidden="true" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {error && (
          <p role="alert" className="mt-5 rounded-xl bg-[#b42318]/10 px-4 py-3 text-center text-sm font-medium text-[#b42318]">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleContinue}
          disabled={!selected || loading}
          className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-full bg-navy text-base font-semibold text-white transition-colors hover:bg-navy/90 disabled:opacity-40"
        >
          {loading ? "Setting up your account…" : "Get started"}
          {!loading && <ArrowRight className="size-4" aria-hidden="true" />}
        </button>
      </div>
    </main>
  );
}
