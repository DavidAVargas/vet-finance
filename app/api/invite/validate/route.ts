import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const code = searchParams.get("code");

  if (type === "cc") {
    const invite = await prisma.inviteCode.findFirst({
      where: { type: "event", isActive: true },
    });
    return NextResponse.json({ active: !!invite });
  }

  if (code) {
    const invite = await prisma.inviteCode.findUnique({ where: { code: code.toUpperCase() } });
    const valid =
      !!invite &&
      invite.isActive &&
      (invite.maxUses === null || invite.usedCount < invite.maxUses) &&
      (!invite.expiresAt || invite.expiresAt > new Date());
    return NextResponse.json({ valid, type: invite?.type });
  }

  return NextResponse.json({ error: "Missing type or code" }, { status: 400 });
}
