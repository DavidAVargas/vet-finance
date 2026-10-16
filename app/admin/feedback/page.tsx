import type { Metadata } from "next";
import { clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { adminAccess } from "@/lib/admin-gate";
import { prisma } from "@/lib/prisma";
import FeedbackAdmin, { type AdminPost } from "./FeedbackAdmin";

export const metadata: Metadata = {
  title: "Feedback · Admin",
  robots: { index: false, follow: false },
};

export default async function AdminFeedbackPage() {
  const access = await adminAccess();
  if (access === "gate") redirect("/admin/sign-in");
  if (access === "sign-in") redirect("/sign-in?redirect_url=/admin/feedback");
  if (access === "denied") redirect("/");

  const posts = await prisma.feedbackPost.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { upvotes: true } } },
  });

  // Author emails, so you can follow up with someone.
  const ids = [...new Set(posts.map((p) => p.clerkUserId))];
  const emails: Record<string, string> = {};
  if (ids.length > 0) {
    const client = await clerkClient();
    const { data: users } = await client.users.getUserList({
      userId: ids,
      limit: 500,
    });
    for (const u of users) {
      emails[u.id] =
        u.primaryEmailAddress?.emailAddress ??
        u.emailAddresses[0]?.emailAddress ??
        "";
    }
  }

  const data: AdminPost[] = posts.map((p) => ({
    id: p.id,
    authorName: p.authorName,
    authorEmail: emails[p.clerkUserId] ?? "",
    content: p.content,
    category: p.category,
    createdAt: p.createdAt.toISOString(),
    upvoteCount: p._count.upvotes,
  }));

  return <FeedbackAdmin posts={data} />;
}
