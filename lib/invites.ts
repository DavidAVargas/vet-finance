import { prisma } from "@/lib/prisma";

export type InviteCheck =
  | { ok: true; invite: { id: string; code: string; label: string; type: string; expiresAt: Date | null } }
  | { ok: false; reason: "missing" | "inactive" | "expired" | "full" };

/** Whether an invite code can be used right now: exists, switched on, not expired, under its max uses. */
export async function checkInvite(rawCode: string): Promise<InviteCheck> {
  const code = rawCode.trim().toUpperCase();
  if (!code) return { ok: false, reason: "missing" };
  const invite = await prisma.inviteCode.findUnique({ where: { code } });
  if (!invite) return { ok: false, reason: "missing" };
  if (!invite.isActive) return { ok: false, reason: "inactive" };
  if (invite.expiresAt && invite.expiresAt <= new Date()) return { ok: false, reason: "expired" };
  if (invite.maxUses !== null && invite.usedCount >= invite.maxUses) return { ok: false, reason: "full" };
  return {
    ok: true,
    invite: { id: invite.id, code: invite.code, label: invite.label, type: invite.type, expiresAt: invite.expiresAt },
  };
}

/**
 * Re-checks the code and counts one use. With a max-uses limit, the count only goes up if no one
 * else redeemed in between, retrying a few times so a crowd scanning at once doesn't see false errors.
 */
export async function redeemInvite(rawCode: string): Promise<InviteCheck> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const check = await checkInvite(rawCode);
    if (!check.ok) return check;
    const { id } = check.invite;
    const current = await prisma.inviteCode.findUnique({ where: { id }, select: { usedCount: true, maxUses: true } });
    if (!current) return { ok: false, reason: "missing" };
    if (current.maxUses === null) {
      await prisma.inviteCode.update({ where: { id }, data: { usedCount: { increment: 1 } } });
      return check;
    }
    if (current.usedCount >= current.maxUses) return { ok: false, reason: "full" };
    const updated = await prisma.inviteCode.updateMany({
      where: { id, usedCount: current.usedCount },
      data: { usedCount: { increment: 1 } },
    });
    if (updated.count === 1) return check;
  }
  return { ok: false, reason: "full" };
}

export const INVITE_ERRORS: Record<Exclude<InviteCheck, { ok: true }>["reason"], string> = {
  missing: "This invite link isn't valid. Ask the person who invited you for a new one.",
  inactive: "This invite link has been turned off. Ask the person who invited you for a new one.",
  expired: "This invite link has expired. Ask the person who invited you for a new one.",
  full: "This invite link has reached its limit. Ask the person who invited you for a new one.",
};
