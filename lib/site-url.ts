import { headers } from "next/headers";

/**
 * The public address of the site, for links we hand to people (invite links, QR codes).
 * On Vercel this is always the production domain, even when the admin page was opened
 * from a protected preview/deployment URL, which would otherwise send people to a Vercel login.
 */
export async function siteOrigin() {
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) return `https://${production}`;

  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}
