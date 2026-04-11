import Link from "next/link";
import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-8">
      <div className="mx-auto max-w-6xl flex flex-col items-center justify-between gap-4 sm:flex-row">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
          <Shield className="size-4" />
          <span>Vet Finance</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-foreground/60">
          <Link href="/learn" className="transition-colors hover:text-foreground">Learn</Link>
          <Link href="/mission" className="transition-colors hover:text-foreground">Our Mission</Link>
          <Link href="/card" className="transition-colors hover:text-foreground">The Card</Link>
          <Link href="/community" className="transition-colors hover:text-foreground">Community</Link>
        </div>

        {/* Copyright */}
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Vet Finance
        </p>
      </div>
    </footer>
  );
}
