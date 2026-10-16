import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { adminAccess } from "@/lib/admin-gate";
import { prisma } from "@/lib/prisma";
import WaitlistAdmin from "./WaitlistAdmin";

export const metadata: Metadata = {
  title: "Waitlist · Admin",
  robots: { index: false, follow: false },
};

export default async function AdminWaitlistPage() {
  const access = await adminAccess();
  if (access === "gate") redirect("/admin/sign-in");
  if (access === "sign-in") redirect("/sign-in?redirect_url=/admin/waitlist");
  if (access === "denied") redirect("/");

  const entries = await prisma.waitlistEntry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <WaitlistAdmin
      entries={entries.map((e) => ({
        id: e.id,
        email: e.email,
        list: e.list,
        city: e.city,
        createdAt: e.createdAt.toISOString(),
      }))}
    />
  );
}
