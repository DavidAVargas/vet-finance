"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_GATE_COOKIE, AUTH_PASS_COOKIE, gateCookieValue, passwordMatches } from "@/lib/admin-gate";

export async function unlockAdmin(_prev: { error: string } | null, formData: FormData): Promise<{ error: string }> {
  const password = String(formData.get("password") ?? "");

  if (!passwordMatches(password)) {
    // Slow down guessing.
    await new Promise((r) => setTimeout(r, 1200));
    return { error: "That's not it." };
  }

  const jar = await cookies();
  const secure = process.env.NODE_ENV === "production";
  jar.set(ADMIN_GATE_COOKIE, gateCookieValue(), {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  // Opens the hidden sign-in page long enough to finish signing in.
  jar.set(AUTH_PASS_COOKIE, "1", { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 60 * 30 });

  redirect("/sign-in?redirect_url=/admin");
}
