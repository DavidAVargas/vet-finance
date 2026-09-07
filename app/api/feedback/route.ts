import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const posts = await prisma.feedbackPost.findMany({
    include: { upvotes: true },
    orderBy: [{ upvotes: { _count: "desc" } }, { createdAt: "desc" }],
  });

  const data = posts.map((p) => ({
    id: p.id,
    authorName: p.authorName,
    content: p.content,
    category: p.category,
    createdAt: p.createdAt,
    upvoteCount: p.upvotes.length,
    upvotedByMe: p.upvotes.some((u) => u.clerkUserId === userId),
  }));

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await currentUser();
  const authorName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.firstName ?? user?.username ?? "Beta Tester";

  const { content, category } = await req.json();
  if (!content?.trim()) {
    return NextResponse.json({ error: "Content is required." }, { status: 400 });
  }

  const post = await prisma.feedbackPost.create({
    data: {
      clerkUserId: userId,
      authorName,
      content: content.trim(),
      category: category ?? "general",
    },
  });

  return NextResponse.json({ ...post, upvoteCount: 0, upvotedByMe: false });
}
