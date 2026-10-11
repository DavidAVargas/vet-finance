import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { INVITE_ERRORS, checkInvite } from "@/lib/invites";
import JoinInvite from "./JoinInvite";

// Invite links are private; keep them out of search results.
export const metadata: Metadata = {
  title: "You're invited · Vet Finance",
  robots: { index: false, follow: false },
};

export default async function JoinPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const result = await checkInvite(decodeURIComponent(code));

  if (!result.ok) {
    return (
      <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-surface px-4 py-16">
        <div className="w-full max-w-md rounded-3xl bg-card p-8 text-center ring-1 ring-border sm:p-10">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div className="mx-auto mt-8 flex size-14 items-center justify-center rounded-2xl bg-secondary">
            <Clock className="size-6 text-navy" strokeWidth={1.8} aria-hidden="true" />
          </div>
          <h1 className="mt-5 text-2xl font-extrabold tracking-[-0.02em] text-navy">This invite isn&apos;t open</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{INVITE_ERRORS[result.reason]}</p>
          <p className="mt-6 text-sm text-muted-foreground">
            Already a member?{" "}
            <Link href="/sign-in" className="font-semibold text-navy underline underline-offset-2">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    );
  }

  const { invite } = result;
  return (
    <JoinInvite
      code={invite.code}
      label={invite.label}
      expiresAt={invite.expiresAt ? invite.expiresAt.toISOString() : null}
      showPartnerLogo={/code\s*(&|and)\s*coffee/i.test(invite.label)}
    />
  );
}
