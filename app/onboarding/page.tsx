"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, ArrowRight } from "lucide-react";

export default function OnboardingPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle Code & Coffee auto-activate (type stored in sessionStorage by /invite/cc)
  useEffect(() => {
    const inviteType = sessionStorage.getItem("vf-invite-type");
    if (inviteType === "cc") {
      sessionStorage.removeItem("vf-invite-type");
      activateWithType("cc");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function activateWithType(type: string) {
    setLoading(true);
    const res = await fetch("/api/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    });
    if (res.ok) {
      router.push("/courses");
    } else {
      const { error } = await res.json();
      setError(error ?? "Something went wrong. Contact David.");
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: code.trim().toUpperCase() }),
    });

    if (res.ok) {
      router.push("/courses");
    } else {
      const { error: msg } = await res.json();
      setError(msg ?? "Invalid code.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto mb-4 size-8 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
          <p className="text-sm text-muted-foreground">Setting up your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-sm text-center">

        <div className="mb-8 flex justify-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-foreground shadow-lg">
            <span className="text-xl font-black text-background">VF</span>
          </div>
        </div>

        <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
          One last step.
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Enter your invite code to unlock your courses.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(""); }}
            placeholder="Invite code"
            autoComplete="off"
            autoCapitalize="characters"
            autoFocus
            className={`w-full rounded-xl border bg-background px-4 py-3 text-center text-sm font-mono tracking-widest text-foreground outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-foreground ${
              error ? "border-red-400" : "border-border"
            } ${shake ? "animate-[shake_0.4s_ease-in-out]" : ""}`}
          />
          {error && <p className="text-center text-xs text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={!code.trim()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
            style={{ background: "var(--brand-600)" }}
          >
            Continue
            <ArrowRight className="size-4" />
          </button>
        </form>

        <div className="mt-8 rounded-xl border border-border bg-muted/30 p-5 text-left">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            What you&apos;re unlocking
          </p>
          <div className="flex flex-col gap-2">
            {[
              "Credit Basics",
              "Credit Cards 101",
              "Debt Traps",
              "Military Money",
              "David's Playbook",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="size-3.5 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Don&apos;t have a code? Reach out to{" "}
          <a href="mailto:david.vargas024@gmail.com" className="underline underline-offset-2 hover:text-foreground transition-colors">
            David
          </a>
          .
        </p>
      </div>
    </div>
  );
}
