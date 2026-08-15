"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, ArrowRight } from "lucide-react";

const BETA_CODE = "VETBETA";
const BETA_KEY = "vf-beta-access";

export default function InvitePage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().toUpperCase() === BETA_CODE) {
      localStorage.setItem(BETA_KEY, "true");
      router.push("/courses");
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-sm text-center">

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-foreground shadow-lg">
            <span className="text-xl font-black text-background">VF</span>
          </div>
        </div>

        {/* Heading */}
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          You&apos;re invited
        </p>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
          Vet Finance Beta
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
          Free financial education built specifically for military members and veterans.
          Credit, debt, VA benefits, and more — straight to the point.
        </p>

        {/* Code hint card */}
        <div
          className="mb-6 rounded-2xl p-6 text-white"
          style={{ background: "var(--brand-600)" }}
        >
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/70">
            Your access code
          </p>
          <p className="font-mono text-4xl font-black tracking-widest">
            VETBETA
          </p>
          <p className="mt-1 text-xs text-white/60">Enter it below to unlock</p>
        </div>

        {/* Code input */}
        <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3">
          <input
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(false); }}
            placeholder="Type your code here"
            autoComplete="off"
            autoCapitalize="characters"
            className={`w-full rounded-xl border bg-background px-4 py-3 text-center text-sm font-mono tracking-widest text-foreground outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-foreground ${
              error ? "border-red-400" : "border-border"
            } ${shake ? "animate-[shake_0.4s_ease-in-out]" : ""}`}
          />
          {error && (
            <p className="text-xs text-red-500">That code doesn&apos;t look right — try again.</p>
          )}
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--brand-600)" }}
          >
            Enter
            <ArrowRight className="size-4" />
          </button>
        </form>

        {/* What's inside */}
        <div className="rounded-xl border border-border bg-muted/30 p-5 text-left">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">What&apos;s inside</p>
          <div className="flex flex-col gap-2">
            {[
              "Credit Basics — scores, utilization, building from zero",
              "Credit Cards 101 — pick the right card, maximize rewards",
              "Debt Traps — car loans, medical bills, student loans",
              "Military Money — BAH, TSP, VA loan, GI Bill, disability",
              "David's Playbook — personalized step-by-step guide",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm">
                <Shield className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                <p className="text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Early beta — 100% free, always.
        </p>

      </div>
    </div>
  );
}
