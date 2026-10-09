import Link from "next/link";
import { Logo } from "@/components/layout/Logo";

const columns = [
  {
    heading: "Learn",
    links: [
      { label: "Courses", href: "/learn" },
      { label: "Community", href: "/community" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "Our Mission", href: "/mission" },
      { label: "The Card", href: "/card" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy-deep text-[#c9d2e0]">
      <div className="mx-auto max-w-site px-4 pt-16 pb-10 sm:px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" aria-label="Vet Finance home" className="inline-block rounded-md">
              <Logo tone="inverted" />
            </Link>
            <p className="mt-4 text-[15px] leading-relaxed">
              Free financial education for those who served, and the families
              who served with them.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-3.5 py-1.5 text-xs font-semibold tracking-[0.12em] text-brass uppercase">
              <span className="size-1.5 rounded-full bg-brass" aria-hidden="true" />
              Free for those who served
            </p>
          </div>

          {/* Link columns */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-16">
            {columns.map((col) => (
              <div key={col.heading}>
                <p className="text-sm font-bold text-white">{col.heading}</p>
                <ul className="mt-4 flex flex-col gap-3 text-[15px]">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] leading-relaxed text-[#9aa5b8] lg:flex-row lg:justify-between lg:gap-10">
          <p className="shrink-0">© {new Date().getFullYear()} Vet Finance. All rights reserved.</p>
          <p className="max-w-3xl lg:text-right">
            Educational content only, not financial, legal, or tax advice. Vet
            Finance is not affiliated with or endorsed by the U.S. Department of
            Veterans Affairs, the Department of Defense, or any branch of the
            U.S. Armed Forces.
          </p>
        </div>
      </div>
    </footer>
  );
}
