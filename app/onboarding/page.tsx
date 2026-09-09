"use client";

import { useState } from "react";

const MILITARY_OPTIONS = [
  { value: "active-duty", label: "🎖️ Active Duty", desc: "Currently serving in the military" },
  { value: "veteran", label: "🎖️ Veteran", desc: "Previously served and separated" },
  { value: "gold-star", label: "⭐ Gold Star Family", desc: "Lost a family member in service" },
  { value: "mil-family", label: "🫂 Military Family", desc: "Spouse, parent, or dependent of a service member" },
  { value: "civilian", label: "👤 Civilian Supporter", desc: "Supporting the military community" },
] as const;

type MilitaryStatus = (typeof MILITARY_OPTIONS)[number]["value"];

export default function OnboardingPage() {
  const [selected, setSelected] = useState<MilitaryStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = async () => {
    if (!selected) return;
    setLoading(true);
    setError("");

    const joinType = localStorage.getItem("vf-join-type") ?? "";

    const res = await fetch("/api/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ joinType, militaryStatus: selected }),
    });

    if (res.ok) {
      localStorage.removeItem("vf-join-type");
      window.location.href = "/courses";
    } else {
      const { error: msg } = await res.json();
      setError(msg ?? "Something went wrong. Contact David.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto mb-4 size-8 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
          <p className="text-sm text-muted-foreground">Setting up your account…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-foreground shadow-lg">
            <span className="text-xl font-black text-background">VF</span>
          </div>
        </div>

        <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground text-center">
          Tell us about yourself.
        </h1>
        <p className="mb-8 text-sm text-muted-foreground text-center">
          This helps us tailor your experience. Pick the one that fits best.
        </p>

        {/* Options */}
        <div className="flex flex-col gap-3 mb-6">
          {MILITARY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSelected(opt.value)}
              className={`w-full rounded-xl border p-4 text-left transition-colors ${
                selected === opt.value
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background text-foreground hover:border-foreground/40 hover:bg-muted/30"
              }`}
            >
              <p className="font-semibold text-sm">{opt.label}</p>
              <p className={`text-xs mt-0.5 ${selected === opt.value ? "text-background/70" : "text-muted-foreground"}`}>
                {opt.desc}
              </p>
            </button>
          ))}
        </div>

        {error && <p className="mb-4 text-center text-xs text-red-500">{error}</p>}

        <button
          onClick={handleContinue}
          disabled={!selected}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          style={{ background: "var(--brand-600)" }}
        >
          Continue
        </button>

      </div>
    </div>
  );
}
