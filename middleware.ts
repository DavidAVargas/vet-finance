import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

const isProtectedRoute = createRouteMatcher(["/courses(.*)", "/feedback(.*)", "/onboarding(.*)"]);
const isSignIn = createRouteMatcher(["/sign-in(.*)"]);
const isSignUp = createRouteMatcher(["/sign-up(.*)"]);

// Set by the invite page (/join/[code]) and by the admin password step (/admin/sign-in).
const INVITE_COOKIE = "vf-invite";
const ADMIN_GATE_COOKIE = "vf-admin-gate";
const AUTH_PASS_COOKIE = "vf-auth-pass";

/**
 * While the site is invite-only, sign-in and sign-up stay hidden from anyone who just types the URL.
 * - Sign-up opens only for people who came through an invite link.
 * - Sign-in also opens for members being sent there from a protected page (Clerk adds redirect_url)
 *   and for the admin after the password step.
 * Real access is still decided by the redeemed invite, not by these pages.
 */
function hiddenAuthPage(req: NextRequest) {
  const cookies = req.cookies;
  const viaInvite = cookies.has(INVITE_COOKIE);
  const viaAdmin = cookies.has(ADMIN_GATE_COOKIE);
  const hasPass = cookies.has(AUTH_PASS_COOKIE);

  if (isSignUp(req)) {
    return viaInvite || viaAdmin ? null : "hide";
  }
  const fromProtectedPage = req.nextUrl.searchParams.has("redirect_url");
  if (viaInvite || viaAdmin || hasPass) return null;
  // Opening sign-in from a protected page: allow it and keep the Clerk flow's sub-pages open briefly.
  return fromProtectedPage ? "pass" : "hide";
}

export default clerkMiddleware(async (auth, req) => {
  if (isSignIn(req) || isSignUp(req)) {
    const { userId } = await auth();
    if (!userId) {
      const decision = hiddenAuthPage(req);
      if (decision === "hide") {
        return NextResponse.rewrite(new URL("/not-found-hidden", req.url), { status: 404 });
      }
      if (decision === "pass") {
        const res = NextResponse.next();
        res.cookies.set(AUTH_PASS_COOKIE, "1", {
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 60 * 30,
        });
        return res;
      }
    }
  }

  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/:path*",
  ],
};
