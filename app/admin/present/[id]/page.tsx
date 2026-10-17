import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import QRCode from "qrcode";
import { ChevronLeft } from "lucide-react";
import { CodeAndCoffeeLogo } from "@/components/CodeAndCoffeeLogo";
import { Logo } from "@/components/layout/Logo";
import { LocalTime } from "@/components/LocalTime";
import { adminAccess } from "@/lib/admin-gate";
import { isCodeAndCoffee } from "@/lib/invite-code";
import { checkInvite } from "@/lib/invites";
import { prisma } from "@/lib/prisma";
import { siteOrigin } from "@/lib/site-url";

export const metadata: Metadata = { title: "Present invite · Vet Finance", robots: { index: false, follow: false } };

/** Full-screen QR code for an invite, made to put on a projector or TV. */
export default async function PresentInvitePage({ params }: { params: Promise<{ id: string }> }) {
  if ((await adminAccess()) !== "ok") redirect("/admin");

  const { id } = await params;
  const invite = await prisma.inviteCode.findUnique({ where: { id } });
  if (!invite) notFound();

  const url = `${await siteOrigin()}/join/${invite.code}`;
  const qr = await QRCode.toString(url, {
    type: "svg",
    margin: 1,
    errorCorrectionLevel: "M",
    color: { dark: "#0b1f3a", light: "#ffffff" },
  });

  const status = await checkInvite(invite.code);
  const open = status.ok;

  return (
    <main className="flex min-h-[100dvh] flex-col bg-navy-deep text-white">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/admin" className="flex items-center gap-1.5 text-sm text-[#9aa5b8] hover:text-white">
          <ChevronLeft className="size-4" aria-hidden="true" />
          Back to admin
        </Link>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${open ? "bg-emerald-500/15 text-emerald-300" : "bg-[#b42318]/20 text-[#ffb4ab]"}`}
        >
          {open ? "Open" : "Closed"} · {invite.usedCount} joined
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-10 px-6 pb-12 lg:flex-row lg:gap-20">
        <div className="max-w-md text-center lg:text-left">
          {isCodeAndCoffee(invite.label) ? (
            <div className="flex flex-col items-center gap-5 lg:items-start">
              <CodeAndCoffeeLogo className="px-5 py-4" imageClassName="h-16 sm:h-20" />
              <div className="flex items-center gap-3 text-[#9aa5b8]">
                <span className="text-base">presented with</span>
                <Logo tone="inverted" />
              </div>
            </div>
          ) : (
            <div className="flex justify-center lg:justify-start">
              <Logo tone="inverted" />
            </div>
          )}
          <p className="mt-8 text-sm font-bold tracking-[0.16em] text-brass uppercase">{invite.label}</p>
          <h1 className="mt-3 text-5xl leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-6xl">
            Scan to get free access
          </h1>
          <p className="mt-5 text-xl text-[#c9d2e0]">
            Point your phone camera at the code, tap the link, and hit <span className="font-semibold text-white">Unlock my access</span>.
          </p>
          {invite.expiresAt && (
            <p className="mt-6 text-lg font-semibold text-brass">
              Open until <LocalTime iso={invite.expiresAt.toISOString()} options={{ weekday: "long", hour: "numeric", minute: "2-digit" }} />
            </p>
          )}
        </div>

        <figure className="flex flex-col items-center">
          <div
            className="w-[min(78vw,26rem)] rounded-3xl bg-white p-5 shadow-2xl [&>svg]:h-auto [&>svg]:w-full"
            role="img"
            aria-label={`QR code for ${url}`}
            dangerouslySetInnerHTML={{ __html: qr }}
          />
          <figcaption className="mt-5 font-mono text-lg tracking-wide text-[#d5dce7]">{url.replace(/^https?:\/\//, "")}</figcaption>
        </figure>
      </div>
    </main>
  );
}
