"use server";

import { prisma } from "@/lib/prisma";

export type WaitlistList = "card" | "community";
export type WaitlistState = { ok: boolean; message: string } | null;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Saves an email to one of the waitlists. Signing up twice is fine: it just says you're on the list. */
export async function joinWaitlist(
  list: WaitlistList,
  _prev: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  // Hidden field that people never see; bots that fill every field get a quiet "success".
  if (String(formData.get("company") ?? ""))
    return { ok: true, message: "You're on the list." };

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase()
    .slice(0, 254);
  const city =
    String(formData.get("city") ?? "")
      .trim()
      .slice(0, 80) || null;

  if (!EMAIL.test(email))
    return { ok: false, message: "Enter a valid email address." };
  if (list === "community" && !city)
    return { ok: false, message: "Tell us your city." };

  try {
    await prisma.waitlistEntry.upsert({
      where: { email_list: { email, list } },
      create: { email, list, city },
      update: city ? { city } : {},
    });
  } catch (err) {
    console.error("[waitlist] save failed", err);
    return { ok: false, message: "Something went wrong. Please try again in a minute." };
  }

  return { ok: true, message: "You're on the list." };
}
