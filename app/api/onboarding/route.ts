import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { joinType, militaryStatus } = body as {
    joinType?: string;
    militaryStatus?: string;
  };

  if (!militaryStatus) {
    return NextResponse.json({ error: "Please select your background." }, { status: 400 });
  }

  let inviteCode;

  if (joinType === "cc") {
    inviteCode = await prisma.inviteCode.findFirst({
      where: { type: "event", isActive: true },
    });
    if (!inviteCode) {
      return NextResponse.json(
        { error: "This event access has ended. Reach out to David for a personal invite." },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      { error: "No valid invite found. Use your invite link or reach out to David." },
      { status: 400 }
    );
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
      militaryStatus,
      activatedAt: new Date().toISOString(),
    },
  });

  return NextResponse.json({ success: true });
}
