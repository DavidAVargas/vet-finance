import { NextResponse } from "next/server";
import { adminAccess } from "@/lib/admin-gate";
import { prisma } from "@/lib/prisma";

/** Admin account and the password step are both required. */
async function checkAdmin() {
  return (await adminAccess()) === "ok";
}

export async function POST(req: Request) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { code, label, type, maxUses, expiresAt } = await req.json();

  const invite = await prisma.inviteCode.create({
    data: {
      code: code.toUpperCase(),
      label,
      type,
      maxUses: maxUses ?? null,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    },
  });

  return NextResponse.json(invite);
}

export async function PATCH(req: Request) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, isActive } = await req.json();

  const invite = await prisma.inviteCode.update({
    where: { id },
    data: { isActive },
  });

  return NextResponse.json(invite);
}

/** Removes a code for good. Members who already joined with it keep their access. */
export async function DELETE(req: Request) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  await prisma.inviteCode.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
