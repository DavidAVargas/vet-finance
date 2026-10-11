import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { INVITE_ERRORS, redeemInvite } from "@/lib/invites";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { inviteCode, militaryStatus } = body as {
    inviteCode?: string;
    militaryStatus?: string;
  };

  if (!militaryStatus) {
    return NextResponse.json({ error: "Please select your background." }, { status: 400 });
  }
  if (!inviteCode) {
    return NextResponse.json(
      { error: "No invite found. Open your invite link again, or ask the person who invited you." },
      { status: 400 },
    );
  }

  // Already unlocked (e.g. a double tap): don't use up another slot.
  const client = await clerkClient();
  const existing = await client.users.getUser(userId);
  if (existing.publicMetadata?.activated) {
    return NextResponse.json({ success: true });
  }

  const result = await redeemInvite(inviteCode);
  if (!result.ok) {
    return NextResponse.json({ error: INVITE_ERRORS[result.reason] }, { status: 400 });
  }
  const invite = result.invite;

  // Activate user in Clerk
  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      activated: true,
      tier: invite.type,
      inviteCode: invite.code,
      inviteLabel: invite.label,
      militaryStatus,
      activatedAt: new Date().toISOString(),
    },
  });

  return NextResponse.json({ success: true });
}
