"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Check, ChevronLeft, Copy, Download, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Entry = {
  id: string;
  email: string;
  list: string;
  city: string | null;
  createdAt: string;
};

const LISTS = [
  { value: "card", label: "The Card" },
  { value: "community", label: "Community" },
];

export default function WaitlistAdmin({
  entries: initial,
}: {
  entries: Entry[];
}) {
  const [entries, setEntries] = useState(initial);
  const [list, setList] = useState("card");
  const [copied, setCopied] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  // Dates in the admin's own time zone, after hydration.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const shown = entries.filter((e) => e.list === list);
  const listLabel = LISTS.find((l) => l.value === list)?.label ?? list;

  const copyEmails = () => {
    navigator.clipboard.writeText(shown.map((e) => e.email).join(", "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCsv = () => {
    const quote = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const rows = [
      ["email", "city", "signed_up"],
      ...shown.map((e) => [e.email, e.city ?? "", e.createdAt]),
    ];
    const csv = rows.map((r) => r.map(quote).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = Object.assign(document.createElement("a"), {
      href: url,
      download: `vet-finance-${list}-waitlist.csv`,
    });
    a.click();
    URL.revokeObjectURL(url);
  };

  /** Two taps: the first arms the button, the second deletes. */
  const handleDelete = async (id: string) => {
    if (confirmDelete !== id) {
      setConfirmDelete(id);
      setTimeout(
        () => setConfirmDelete((cur) => (cur === id ? null : cur)),
        4000,
      );
      return;
    }
    setConfirmDelete(null);
    const res = await fetch("/api/admin/waitlist", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/admin"
        className="text-muted-foreground hover:text-navy inline-flex items-center gap-1 text-sm"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        Invite codes
      </Link>
      <div className="mt-3 mb-8">
        <p className="text-muted-foreground mb-1 text-sm">Admin</p>
        <h1 className="text-navy text-2xl font-bold">Waitlists</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Sign-ups from The Card and Community pages. Stored only in your
          database.
        </p>
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {LISTS.map((l) => (
            <button
              key={l.value}
              type="button"
              onClick={() => setList(l.value)}
              aria-pressed={list === l.value}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors",
                list === l.value
                  ? "bg-navy text-white"
                  : "bg-secondary text-navy hover:bg-secondary/70",
              )}
            >
              {l.label}{" "}
              <span className="opacity-60">
                {entries.filter((e) => e.list === l.value).length}
              </span>
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={copyEmails}
            disabled={shown.length === 0}
            className="border-border text-navy hover:bg-secondary flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold disabled:opacity-40"
          >
            {copied ? (
              <Check className="size-3.5 text-green-600" />
            ) : (
              <Copy className="size-3.5" />
            )}
            {copied ? "Copied" : "Copy all emails"}
          </button>
          <button
            type="button"
            onClick={downloadCsv}
            disabled={shown.length === 0}
            className="border-border text-navy hover:bg-secondary flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold disabled:opacity-40"
          >
            <Download className="size-3.5" />
            Download CSV
          </button>
        </div>
      </div>

      {shown.length === 0 ? (
        <p className="border-border text-muted-foreground rounded-xl border border-dashed py-12 text-center text-sm">
          No one on the {listLabel} list yet.
        </p>
      ) : (
        <ul className="divide-border border-border bg-background divide-y rounded-xl border">
          {shown.map((e) => (
            <li
              key={e.id}
              className="flex items-center justify-between gap-4 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="text-navy truncate text-sm font-semibold">
                  {e.email}
                </p>
                <p className="text-muted-foreground text-xs">
                  {e.city && <>{e.city} · </>}
                  {mounted &&
                    new Date(e.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(e.id)}
                aria-label={
                  confirmDelete === e.id
                    ? `Tap again to remove ${e.email}`
                    : `Remove ${e.email}`
                }
                className={
                  confirmDelete === e.id
                    ? "flex shrink-0 items-center gap-1.5 rounded-lg bg-[#b42318] px-3 py-1.5 text-xs font-semibold text-white"
                    : "border-border text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-lg border transition-colors hover:border-[#b42318]/40 hover:text-[#b42318]"
                }
              >
                <Trash2 className="size-3.5" />
                {confirmDelete === e.id && "Tap again to remove"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
