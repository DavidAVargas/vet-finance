import { clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { adminAccess } from "@/lib/admin-gate";
import { prisma } from "@/lib/prisma";
import AdminClient, { type Member } from "./AdminClient";

export default async function AdminPage() {
  // Password step first, then the admin account.
  const access = await adminAccess();
  if (access === "gate") redirect("/admin/sign-in");
  if (access === "sign-in") redirect("/sign-in?redirect_url=/admin");
  if (access === "denied") redirect("/");

  const [inviteCodes, feedbackCount] = await Promise.all([
    prisma.inviteCode.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.feedbackPost.count(),
  ]);

  // Who redeemed each code (stored on the member's account when they unlocked access).
  const client = await clerkClient();
  const { data: users } = await client.users.getUserList({ limit: 500, orderBy: "-created_at" });
  const membersByCode: Record<string, Member[]> = {};
  for (const u of users) {
    const code = u.publicMetadata?.inviteCode as string | undefined;
    if (!code) continue;
    (membersByCode[code] ??= []).push({
      name: [u.firstName, u.lastName].filter(Boolean).join(" ") || "No name",
      email: u.primaryEmailAddress?.emailAddress ?? u.emailAddresses[0]?.emailAddress ?? "",
      joinedAt: (u.publicMetadata?.activatedAt as string | undefined) ?? null,
    });
  }

  return <AdminClient inviteCodes={inviteCodes} membersByCode={membersByCode} feedbackCount={feedbackCount} />;
}
