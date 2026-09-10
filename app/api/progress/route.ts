import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/progress — returns { courseId: lessonId[] } for the current user
export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await prisma.lessonProgress.findMany({
    where: { clerkUserId: userId },
    select: { courseId: true, lessonId: true },
  });

  const grouped: Record<string, string[]> = {};
  for (const row of rows) {
    if (!grouped[row.courseId]) grouped[row.courseId] = [];
    grouped[row.courseId].push(row.lessonId);
  }

  return NextResponse.json(grouped);
}

// POST /api/progress — mark a lesson complete (idempotent)
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { courseId, lessonId } = await req.json() as { courseId: string; lessonId: string };
  if (!courseId || !lessonId) {
    return NextResponse.json({ error: "Missing courseId or lessonId" }, { status: 400 });
  }

  await prisma.lessonProgress.upsert({
    where: { clerkUserId_courseId_lessonId: { clerkUserId: userId, courseId, lessonId } },
    create: { clerkUserId: userId, courseId, lessonId },
    update: {},
  });

  return NextResponse.json({ success: true });
}
