import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { currentUser } from "@clerk/nextjs/server";

/**
 * A password step in front of the admin area (/admin/sign-in). The password lives only in the
 * ADMIN_GATE_PASSWORD environment variable — never in the code. Passing it sets a signed cookie.
 */
export const ADMIN_GATE_COOKIE = "vf-admin-gate";
/** Lets the hidden /sign-in page open for a short window (see middleware.ts). */
export const AUTH_PASS_COOKIE = "vf-auth-pass";

const secret = () => process.env.ADMIN_GATE_PASSWORD ?? "";

export const adminGateConfigured = () => secret().length > 0;

function token() {
  return createHmac("sha256", secret()).update("vf-admin-gate-v1").digest("hex");
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function passwordMatches(input: string) {
  return adminGateConfigured() && safeEqual(input, secret());
}

export function gateCookieValue() {
  return token();
}

/** True when this browser has passed the admin password step. */
export async function adminGateOpen() {
  if (!adminGateConfigured()) return false;
  const value = (await cookies()).get(ADMIN_GATE_COOKIE)?.value;
  return !!value && safeEqual(value, token());
}

export const ADMIN_EMAIL = "david.vargas024@gmail.com";

/**
 * Where the current visitor stands with the admin area:
 * "gate" = needs the password step, "sign-in" = needs to sign in, "denied" = signed in as someone else.
 */
export async function adminAccess(): Promise<"ok" | "gate" | "sign-in" | "denied"> {
  if (!(await adminGateOpen())) return "gate";
  const user = await currentUser();
  if (!user) return "sign-in";
  return user.emailAddresses?.[0]?.emailAddress === ADMIN_EMAIL ? "ok" : "denied";
}
