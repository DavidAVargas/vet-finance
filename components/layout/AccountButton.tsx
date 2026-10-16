"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";

const ADMIN_EMAIL = "david.vargas024@gmail.com";

/** The profile menu. For the admin it also links to the admin console. */
export function AccountButton() {
  const { user } = useUser();
  const isAdmin = user?.primaryEmailAddress?.emailAddress === ADMIN_EMAIL;

  if (!isAdmin) return <UserButton />;

  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Link label="Admin console" labelIcon={<LayoutDashboard className="size-4" />} href="/admin" />
      </UserButton.MenuItems>
    </UserButton>
  );
}
