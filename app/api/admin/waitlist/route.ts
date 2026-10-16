import { NextResponse } from "next/server";
import { adminAccess } from "@/lib/admin-gate";
import { prisma } from "@/lib/prisma";

/** Removes a waitlist sign-up. Admin account and password step required. */
export async function DELETE(req: Request) {
  if ((await adminAccess()) !== "ok") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  await prisma.waitlistEntry.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
