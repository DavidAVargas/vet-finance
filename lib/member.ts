import { currentUser } from "@clerk/nextjs/server";
import { ADMIN_EMAIL } from "@/lib/admin-gate";

/**
 * The signed-in user's id, but only for real members: people who unlocked access with an invite
 * (or the founder). Clerk accounts can be created outside the site, so being signed in isn't enough.
 */
export async function memberId(): Promise<string | null> {
  const user = await currentUser();
  if (!user) return null;
  const isFounder = user.emailAddresses?.[0]?.emailAddress === ADMIN_EMAIL;
  return isFounder || user.publicMetadata?.activated ? user.id : null;
}
