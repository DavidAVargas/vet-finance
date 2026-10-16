"use client";

import { useActionState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { joinWaitlist, type WaitlistList } from "@/lib/actions/waitlist";
import { cn } from "@/lib/utils";

/** Email sign-up for the Card and Community waitlists. Entries show up in /admin/waitlist. */
export function WaitlistForm({
  list,
  buttonLabel,
  dark = false,
  askCity = false,
  successNote,
}: {
  list: WaitlistList;
  buttonLabel: string;
  dark?: boolean;
  askCity?: boolean;
  successNote: string;
}) {
  const [state, action, pending] = useActionState(
    joinWaitlist.bind(null, list),
    null,
  );

  if (state?.ok) {
    return (
      <div
        role="status"
        className={cn(
          "mx-auto mt-8 flex max-w-md items-center justify-center gap-3 rounded-full px-6 py-3.5",
          dark ? "bg-white/10 text-white" : "bg-secondary text-navy",
        )}
      >
        <span className="bg-brass flex size-6 shrink-0 items-center justify-center rounded-full">
          <Check
            className="text-navy-deep size-3.5"
            strokeWidth={3}
            aria-hidden="true"
          />
        </span>
        <span className="text-[15px] font-semibold">
          {state.message}{" "}
          <span
            className={cn(
              "font-normal",
              dark ? "text-[#c9d2e0]" : "text-muted-foreground",
            )}
          >
            {successNote}
          </span>
        </span>
      </div>
    );
  }

  const field = dark
    ? "border-white/20 bg-white/10 text-white placeholder:text-[#9aa5b8] focus:border-white/40 focus:ring-brass/60"
    : "border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring";

  return (
    <form action={action} className="mx-auto mt-8 flex max-w-md flex-col gap-3">
      {/* Honeypot: hidden from people and screen readers */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={`${list}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${list}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={askCity ? "Your email" : "Enter your email"}
          className={cn(
            "h-12 w-full rounded-full border px-5 text-[15px] focus:ring-2 focus:outline-none",
            field,
          )}
        />
        {askCity && (
          <>
            <label htmlFor={`${list}-city`} className="sr-only">
              Your city
            </label>
            <input
              id={`${list}-city`}
              name="city"
              type="text"
              required
              autoComplete="address-level2"
              placeholder="Your city"
              className={cn(
                "h-12 w-full rounded-full border px-5 text-[15px] focus:ring-2 focus:outline-none sm:w-44",
                field,
              )}
            />
          </>
        )}
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className={cn(
          "h-12 rounded-full px-7 text-base font-semibold",
          dark && "bg-brass text-navy-deep hover:bg-brass/90",
        )}
      >
        {pending ? "Adding you…" : buttonLabel}
      </Button>
      {state && !state.ok && (
        <p
          role="alert"
          className={cn(
            "text-sm font-medium",
            dark ? "text-[#ffb4ab]" : "text-[#b42318]",
          )}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
