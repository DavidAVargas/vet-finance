"use client";

import { useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

const FOUNDER_EMAIL = "david.vargas024@gmail.com";

const navLinks = [
  { label: "Courses", href: "/learn" },
  { label: "Our Mission", href: "/mission" },
  { label: "Community", href: "/community" },
  { label: "The Card", href: "/card" },
];

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
      <nav aria-label="Main" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
                    : "text-muted-foreground hover:text-foreground",
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
                <Button size="lg" className="hidden rounded-full px-5 md:inline-flex" asChild>
                  <Link href={ctaHref}>Go to courses</Link>
                </Button>
                <UserButton />
              </>
            ) : (
              <Button size="lg" className="hidden rounded-full px-5 md:inline-flex" disabled>
                Get Started
              </Button>
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
            {user ? (
              <Button size="lg" className="mt-3 w-full rounded-full" asChild>
                <Link href={ctaHref} onClick={() => setOpen(false)}>Go to courses</Link>
              </Button>
            ) : (
              <Button size="lg" className="mt-3 w-full rounded-full" disabled>
                Get Started
              </Button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
