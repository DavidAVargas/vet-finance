import type { Metadata } from "next";
import { adminGateConfigured } from "@/lib/admin-gate";
import PasswordForm from "./PasswordForm";

export const metadata: Metadata = { title: "Vet Finance", robots: { index: false, follow: false } };

/** Deliberately bare: a single password box in front of the admin sign-in. */
export default function AdminSignInPage() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-surface px-4">
      {adminGateConfigured() ? <PasswordForm /> : <p className="text-sm text-muted-foreground">Not available.</p>}
    </main>
  );
}
