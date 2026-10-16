"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Lock, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";
import { AccountButton } from "@/components/layout/AccountButton";

const FOUNDER_EMAIL = "david.vargas024@gmail.com";

const navLinks = [
  { label: "Courses", href: "/learn" },
  { label: "Our Mission", href: "/mission" },
  { label: "Community", href: "/community" },
  { label: "The Card", href: "/card" },
];

/** Sign-in stays hidden from people who type the URL; this link opens it for returning members. */
const MEMBER_SIGN_IN = "/sign-in?redirect_url=/courses";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isLoaded } = useUser();
  const pathname = usePathname();

  const email = user?.primaryEmailAddress?.emailAddress;
  const isFounder = email === FOUNDER_EMAIL;
  const isActivated = !!user?.publicMetadata?.activated;
  const hasAccess = isFounder || isActivated;
  const ctaHref = !user ? "/learn" : hasAccess ? "/courses" : "/onboarding";

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <nav aria-label="Main" className="mx-auto max-w-site px-4 sm:px-6">
        <div className="flex h-[4.5rem] items-center justify-between gap-6">
          <Link href="/" aria-label="Vet Finance home" className="rounded-md">
            <Logo />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2 text-[15px] font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-secondary text-secondary-foreground"
                    : "text-navy hover:text-[#2e5a9a]",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {isLoaded && user ? (
              <>
                {isFounder && (
                  <Link
                    href="/admin"
                    aria-current={isActive("/admin") ? "page" : undefined}
                    className="hidden items-center gap-1.5 rounded-full px-4 py-2 text-[15px] font-semibold text-navy hover:text-[#2e5a9a] md:inline-flex"
                  >
                    <LayoutDashboard className="size-4 text-brass-deep" aria-hidden="true" />
                    Admin
                  </Link>
                )}
                <Button size="lg" className="hidden rounded-full px-5 md:inline-flex" asChild>
                  <Link href={ctaHref}>Go to courses</Link>
                </Button>
                <AccountButton />
              </>
            ) : (
              <>
                <Link
                  href={MEMBER_SIGN_IN}
                  className="hidden rounded-full px-4 py-2 text-[15px] font-semibold text-navy hover:text-[#2e5a9a] md:inline-flex"
                >
                  Member sign in
                </Link>
                <span className="hidden items-center gap-1.5 rounded-full bg-secondary px-4 py-2.5 text-sm font-semibold text-navy md:inline-flex">
                  <Lock className="size-3.5 text-brass-deep" aria-hidden="true" />
                  Invite only
                </span>
              </>
            )}
            {/* Mobile hamburger */}
            <button
              className="rounded-full p-2.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="flex flex-col gap-1 border-t border-border py-4 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-3 text-base font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isFounder && (
              <Link
                href="/admin"
                className="flex items-center gap-2 rounded-lg px-3 py-3 text-base font-semibold text-navy hover:bg-secondary"
                onClick={() => setOpen(false)}
              >
                <LayoutDashboard className="size-4 text-brass-deep" aria-hidden="true" />
                Admin
              </Link>
            )}
            {user ? (
              <Button size="lg" className="mt-3 w-full rounded-full" asChild>
                <Link href={ctaHref} onClick={() => setOpen(false)}>Go to courses</Link>
              </Button>
            ) : (
              <Button size="lg" variant="outline" className="mt-3 w-full rounded-full text-navy" asChild>
                <Link href={MEMBER_SIGN_IN} onClick={() => setOpen(false)}>Member sign in</Link>
              </Button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
