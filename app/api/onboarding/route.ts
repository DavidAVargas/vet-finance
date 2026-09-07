import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { code, type } = body as { code?: string; type?: string };

  let inviteCode;

  if (type === "cc") {
    // Code & Coffee: find active event invite
    inviteCode = await prisma.inviteCode.findFirst({
      where: { type: "event", isActive: true },
    });
    if (!inviteCode) {
      return NextResponse.json(
        { error: "This event access has ended. Reach out to David for a personal invite." },
        { status: 400 }
      );
    }
  } else if (code) {
    inviteCode = await prisma.inviteCode.findUnique({ where: { code } });
    if (!inviteCode || !inviteCode.isActive) {
      return NextResponse.json({ error: "Invalid or inactive invite code." }, { status: 400 });
    }
    if (inviteCode.maxUses !== null && inviteCode.usedCount >= inviteCode.maxUses) {
      return NextResponse.json({ error: "This code has already been used." }, { status: 400 });
    }
    if (inviteCode.expiresAt && inviteCode.expiresAt < new Date()) {
      return NextResponse.json({ error: "This invite code has expired." }, { status: 400 });
    }
  } else {
    return NextResponse.json({ error: "No invite code provided." }, { status: 400 });
  }

  // Increment usage
  await prisma.inviteCode.update({
    where: { id: inviteCode.id },
    data: { usedCount: { increment: 1 } },
  });

  // Activate user in Clerk
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      activated: true,
      tier: inviteCode.type,
      inviteCode: inviteCode.code,
      activatedAt: new Date().toISOString(),
    },
  });

  return NextResponse.json({ success: true });
}
