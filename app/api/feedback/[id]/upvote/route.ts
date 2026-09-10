import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const existing = await prisma.feedbackUpvote.findUnique({
    where: { clerkUserId_feedbackPostId: { clerkUserId: userId, feedbackPostId: id } },
  });

  if (existing) {
    await prisma.feedbackUpvote.delete({ where: { id: existing.id } });
    const count = await prisma.feedbackUpvote.count({ where: { feedbackPostId: id } });
    return NextResponse.json({ upvoteCount: count, upvotedByMe: false });
  } else {
    await prisma.feedbackUpvote.create({
      data: { clerkUserId: userId, feedbackPostId: id },
    });
    const count = await prisma.feedbackUpvote.count({ where: { feedbackPostId: id } });
    return NextResponse.json({ upvoteCount: count, upvotedByMe: true });
  }
}
