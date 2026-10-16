"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowUp, ChevronLeft, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type AdminPost = {
  id: string;
  authorName: string;
  authorEmail: string;
  content: string;
  category: string;
  createdAt: string;
  upvoteCount: number;
};

const CATEGORIES: Record<string, { label: string; color: string }> = {
  general: { label: "General", color: "bg-secondary text-navy" },
  feature: { label: "Feature idea", color: "bg-blue-500/10 text-blue-700" },
  bug: { label: "Bug", color: "bg-red-500/10 text-red-700" },
  content: { label: "Content", color: "bg-amber-500/15 text-amber-800" },
};

export default function FeedbackAdmin({
  posts: initial,
}: {
  posts: AdminPost[];
}) {
  const [posts, setPosts] = useState(initial);
  const [filter, setFilter] = useState("all");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  // Dates in the admin's own time zone, after hydration.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

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
    const res = await fetch("/api/admin/feedback", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const counts = posts.reduce<Record<string, number>>(
    (acc, p) => ({ ...acc, [p.category]: (acc[p.category] ?? 0) + 1 }),
    {},
  );
  const shown =
    filter === "all" ? posts : posts.filter((p) => p.category === filter);
  const tabs = [{ value: "all", label: "All", count: posts.length }].concat(
    Object.entries(CATEGORIES).map(([value, { label }]) => ({
      value,
      label,
      count: counts[value] ?? 0,
    })),
  );

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
        <h1 className="text-navy text-2xl font-bold">Feedback</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Newest first. Deleting removes it from the members&apos; board too.
        </p>
      </div>

      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setFilter(t.value)}
            aria-pressed={filter === t.value}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
              filter === t.value
                ? "bg-navy text-white"
                : "bg-secondary text-navy hover:bg-secondary/70",
            )}
          >
            {t.label} <span className="opacity-60">{t.count}</span>
          </button>
        ))}
      </div>

      <ul className="flex flex-col gap-3">
        {shown.map((p) => {
          const cat = CATEGORIES[p.category] ?? CATEGORIES.general;
          return (
            <li
              key={p.id}
              className="border-border bg-background rounded-xl border p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                    <span className="text-navy text-sm font-semibold">
                      {p.authorName}
                    </span>
                    {p.authorEmail && (
                      <span className="text-muted-foreground">
                        {p.authorEmail}
                      </span>
                    )}
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                        cat.color,
                      )}
                    >
                      {cat.label}
                    </span>
                  </div>
                  <p className="text-foreground mt-2 text-sm leading-relaxed whitespace-pre-line">
                    {p.content}
                  </p>
                  <p className="text-muted-foreground mt-2 flex items-center gap-3 text-xs">
                    <span className="inline-flex items-center gap-1">
                      <ArrowUp className="size-3" aria-hidden="true" />
                      {p.upvoteCount} upvote{p.upvoteCount === 1 ? "" : "s"}
                    </span>
                    {mounted && (
                      <span>
                        {new Date(p.createdAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </span>
                    )}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(p.id)}
                  aria-label={
                    confirmDelete === p.id
                      ? "Tap again to delete this feedback"
                      : `Delete feedback from ${p.authorName}`
                  }
                  className={
                    confirmDelete === p.id
                      ? "flex shrink-0 items-center gap-1.5 rounded-lg bg-[#b42318] px-3 py-1.5 text-xs font-semibold text-white"
                      : "border-border text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-lg border transition-colors hover:border-[#b42318]/40 hover:text-[#b42318]"
                  }
                >
                  <Trash2 className="size-3.5" />
                  {confirmDelete === p.id && "Tap again to delete"}
                </button>
              </div>
            </li>
          );
        })}
        {shown.length === 0 && (
          <p className="text-muted-foreground py-10 text-center text-sm">
            No feedback here yet.
          </p>
        )}
      </ul>
    </div>
  );
}
