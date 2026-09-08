import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ADMIN_EMAIL = "david.vargas024@gmail.com";

async function checkAdmin() {
  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;
  return email === ADMIN_EMAIL;
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
