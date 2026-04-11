import Link from "next/link";
import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40 px-4 py-12">
      <div className="mx-auto max-w-6xl grid grid-cols-1 gap-10 sm:grid-cols-3">
        {/* Brand */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <Shield className="size-4" />
            <span>Vet Finance</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Free financial education for those who served. Built to help veterans thrive after service.
          </p>
        </div>

        {/* Quick links */}
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-foreground">Quick Links</p>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link href="/learn" className="hover:text-foreground transition-colors">Learn</Link>
            <Link href="/mission" className="hover:text-foreground transition-colors">Our Mission</Link>
            <Link href="/card" className="hover:text-foreground transition-colors">The Card</Link>
            <Link href="/community" className="hover:text-foreground transition-colors">Community</Link>
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-foreground">Legal</p>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto max-w-6xl mt-10 pt-6 border-t border-border flex flex-col items-center justify-between gap-2 sm:flex-row">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Vet Finance. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground">
          Free for all military members & veterans.
        </p>
      </div>
    </footer>
  );
}
