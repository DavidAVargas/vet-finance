"use client";

import { useActionState } from "react";
import { ArrowRight } from "lucide-react";
import { unlockAdmin } from "./actions";

export default function PasswordForm() {
  const [state, action, pending] = useActionState(unlockAdmin, null);

  return (
    <form action={action} className="w-full max-w-xs">
      <label htmlFor="admin-password" className="sr-only">
        Password
      </label>
      <div className="flex gap-2">
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          className="h-11 min-w-0 flex-1 rounded-full border border-border bg-card px-4 text-sm text-navy outline-none focus:border-navy focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          disabled={pending}
          aria-label="Continue"
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-navy text-white hover:bg-navy/90 disabled:opacity-50"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
      {state?.error && (
        <p role="alert" className="mt-3 text-center text-sm text-[#b42318]">
          {state.error}
        </p>
      )}
    </form>
  );
}
