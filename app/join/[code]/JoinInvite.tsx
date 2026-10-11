"use client";

import { useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { ArrowRight, Compass } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { courseCatalog } from "@/lib/course-catalog";

/** Remembered through sign-up so onboarding can redeem the same invite. */
const INVITE_KEY = "vf-invite-code";

export default function JoinInvite({
  code,
  label,
  expiresAt,
  showPartnerLogo,
}: {
  code: string;
  label: string;
  expiresAt: string | null;
  showPartnerLogo: boolean;
}) {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const activated = !!user?.publicMetadata?.activated;

  // Already a member → straight to the courses.
  useEffect(() => {
    if (isLoaded && isSignedIn && activated) router.replace("/courses");
  }, [isLoaded, isSignedIn, activated, router]);

  const go = (path: string) => {
    localStorage.setItem(INVITE_KEY, code);
    // Lets the hidden sign-in / sign-up pages open for invite visitors (see middleware.ts).
    document.cookie = `vf-invite=${encodeURIComponent(code)}; path=/; max-age=86400; samesite=lax`;
    router.push(path);
  };

  // Signed in but not unlocked → onboarding redeems the code. Signed out → create an account first.
  const unlock = () => go(isSignedIn ? "/onboarding" : "/sign-up");

  // Format the closing time in the attendee's own time zone, after hydration.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const closes = mounted && expiresAt
    ? new Date(expiresAt).toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit" })
    : null;

  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-surface px-4 py-12">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-card ring-1 ring-border">
        {/* Header */}
        <div className="bg-navy-deep px-7 pt-8 pb-7 text-center text-white sm:px-9">
          <div className="flex items-center justify-center gap-4">
            <Logo tone="inverted" />
            {showPartnerLogo && (
              <>
                <span className="text-xl font-light text-white/40" aria-hidden="true">×</span>
                <span className="flex size-11 items-center justify-center overflow-hidden rounded-xl bg-white">
                  <Image src="/cc-logo.webp" alt="Code & Coffee" width={44} height={44} className="object-contain" />
                </span>
              </>
            )}
          </div>
          <p className="mt-7 inline-flex items-center gap-2 rounded-full bg-brass/20 px-3 py-1 text-xs font-bold tracking-[0.12em] text-brass uppercase">
            <span className="size-1.5 rounded-full bg-brass" aria-hidden="true" />
            You&apos;re invited · {label}
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-[-0.03em]">Welcome to Vet Finance</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-[#c9d2e0]">
            Free financial education built for the military community. Straight to the point, no fluff.
          </p>
        </div>

        {/* What's inside */}
        <div className="px-7 py-7 sm:px-9">
          <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">What you get</p>
          <ul className="mt-4 flex flex-col gap-3">
            {courseCatalog.map(({ id, title, icon: Icon }) => (
              <li key={id} className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondary">
                  <Icon className="size-[18px] text-navy" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className="font-semibold text-navy">{title}</span>
              </li>
            ))}
            <li className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-navy">
                <Compass className="size-[18px] text-brass" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className="font-semibold text-navy">David&apos;s Playbook</span>
            </li>
          </ul>

          <button
            type="button"
            onClick={unlock}
            disabled={!isLoaded}
            className="mt-8 flex h-13 w-full items-center justify-center gap-2 rounded-full bg-navy text-base font-semibold text-white transition-colors hover:bg-navy/90 disabled:opacity-60"
          >
            Unlock my access
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>

          {isLoaded && !isSignedIn && (
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => go("/sign-in")}
                className="font-semibold text-navy underline underline-offset-2 hover:text-[#2e5a9a]"
              >
                Sign in
              </button>
            </p>
          )}

          <div className="mt-6 border-t border-border pt-5 text-center text-xs leading-relaxed text-muted-foreground">
            <p>100% free. No credit card, no catch.</p>
            {closes && <p className="mt-1 font-semibold text-navy">This invite closes {closes}.</p>}
            <p className="mt-1">Once you&apos;re in, you keep full access.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
