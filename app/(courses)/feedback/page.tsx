"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp, ChevronLeft, Loader2, MessageSquare, Send } from "lucide-react";
import { SkipLink } from "@/components/layout/SkipLink";
import { Logo } from "@/components/layout/Logo";
import { AccountButton } from "@/components/layout/AccountButton";
import { cn } from "@/lib/utils";

type Post = {
  id: string;
  authorName: string;
  content: string;
  category: string;
  createdAt: string;
  upvoteCount: number;
  upvotedByMe: boolean;
};

const CATEGORIES = [
  { value: "general", label: "General", color: "bg-secondary text-navy" },
  { value: "feature", label: "Feature idea", color: "bg-blue-500/10 text-blue-700" },
  { value: "bug", label: "Bug", color: "bg-red-500/10 text-red-700" },
  { value: "content", label: "Content", color: "bg-amber-500/15 text-amber-800" },
];

const categoryOf = (value: string) => CATEGORIES.find((c) => c.value === value) ?? CATEGORIES[0];

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function FeedbackPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");
  const [submitting, setSubmitting] = useState(false);
  const [postError, setPostError] = useState("");
  const [justPosted, setJustPosted] = useState(false);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState<"top" | "new">("top");

  useEffect(() => {
    fetch("/api/feedback")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || submitting) return;
    setSubmitting(true);
    setPostError("");

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, category }),
    });

    if (res.ok) {
      const newPost = await res.json();
      setPosts((prev) => [newPost, ...prev]);
      setContent("");
      setJustPosted(true);
      setTimeout(() => setJustPosted(false), 3000);
    } else {
      setPostError("That didn't go through. Try again in a moment.");
    }
    setSubmitting(false);
  };

  const handleUpvote = async (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, upvotedByMe: !p.upvotedByMe, upvoteCount: p.upvotedByMe ? p.upvoteCount - 1 : p.upvoteCount + 1 }
          : p,
      ),
    );
    await fetch(`/api/feedback/${postId}/upvote`, { method: "POST" });
  };

  const filtered = (filter === "all" ? posts : posts.filter((p) => p.category === filter))
    .slice()
    .sort((a, b) =>
      sort === "new"
        ? b.createdAt.localeCompare(a.createdAt)
        : b.upvoteCount - a.upvoteCount || b.createdAt.localeCompare(a.createdAt),
    );

  const tabs = [{ value: "all", label: "All" }, ...CATEGORIES];

  return (
    <div className="flex min-h-[100dvh] flex-col bg-surface">
      <SkipLink targetId="main-content" />

      {/* Top bar */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-[4.5rem] max-w-site items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" aria-label="Vet Finance home" className="rounded-md">
            <Logo />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/courses"
              className="flex items-center gap-1 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium text-navy transition-colors hover:bg-secondary"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
              My courses
            </Link>
            <AccountButton />
          </div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {/* Intro */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:py-14">
            <p className="text-sm font-semibold tracking-[0.14em] text-[#7a5a22] uppercase">Beta feedback</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.03em] text-navy sm:text-[2.75rem]">
              What do you think?
            </h1>
            <p className="mt-3 text-[17px] leading-relaxed text-[#3b4658]">
              Your feedback shapes what gets built next. Tell us what&apos;s working, what&apos;s not, and upvote
              the ideas you agree with.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
          {/* Post form */}
          <form onSubmit={handleSubmit} className="rounded-2xl bg-card p-5 ring-1 ring-border sm:p-6">
            <label htmlFor="feedback-content" className="block font-bold text-navy">
              Share your feedback
            </label>
            <textarea
              id="feedback-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's working, what's not, or what you wish existed…"
              rows={4}
              className="mt-3 w-full resize-none rounded-xl border border-input bg-surface px-4 py-3 text-[15px] text-navy transition-colors outline-none placeholder:text-muted-foreground focus:border-navy focus:bg-card focus:ring-2 focus:ring-ring"
            />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div role="group" aria-label="Category" className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setCategory(c.value)}
                    aria-pressed={category === c.value}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                      category === c.value ? "bg-navy text-white" : "bg-secondary text-navy hover:bg-secondary/70",
                    )}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <button
                type="submit"
                disabled={!content.trim() || submitting}
                className="flex h-11 shrink-0 items-center gap-2 rounded-full bg-navy px-6 text-sm font-semibold text-white transition-colors hover:bg-navy/90 disabled:opacity-40"
              >
                {submitting ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Send className="size-4" aria-hidden="true" />
                )}
                Post
              </button>
            </div>
            <p aria-live="polite" className="text-sm">
              {postError && <span className="mt-3 block font-medium text-[#b42318]">{postError}</span>}
              {justPosted && <span className="mt-3 block font-medium text-emerald-700">Thanks. Your feedback is posted.</span>}
            </p>
          </form>

          {/* Filters + sort */}
          <div className="mt-10 mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {tabs.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setFilter(c.value)}
                  aria-pressed={filter === c.value}
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors sm:px-3.5",
                    filter === c.value ? "bg-navy text-white" : "text-navy hover:bg-secondary",
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div role="group" aria-label="Sort feedback" className="flex shrink-0 rounded-full bg-card p-1 text-sm font-semibold ring-1 ring-border">
              {(
                [
                  ["top", "Top"],
                  ["new", "Newest"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSort(value)}
                  aria-pressed={sort === value}
                  className={cn(
                    "rounded-full px-3.5 py-1 transition-colors",
                    sort === value ? "bg-secondary text-navy" : "text-muted-foreground hover:text-navy",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Posts */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="size-5 animate-spin text-muted-foreground" aria-label="Loading feedback" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border py-14 text-center">
              <MessageSquare className="mx-auto size-6 text-muted-foreground" aria-hidden="true" />
              <p className="mt-3 font-semibold text-navy">Nothing here yet</p>
              <p className="mt-1 text-sm text-muted-foreground">Be the first to share what you think.</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {filtered.map((post) => {
                const cat = categoryOf(post.category);
                return (
                  <li key={post.id} className="flex gap-4 rounded-2xl bg-card p-5 ring-1 ring-border">
                    <button
                      type="button"
                      onClick={() => handleUpvote(post.id)}
                      aria-pressed={post.upvotedByMe}
                      aria-label={`Upvote, ${post.upvoteCount} vote${post.upvoteCount === 1 ? "" : "s"}`}
                      className={cn(
                        "flex h-14 w-12 shrink-0 flex-col items-center justify-center gap-0.5 rounded-xl text-sm font-bold transition-colors",
                        post.upvotedByMe ? "bg-navy text-white" : "bg-secondary text-navy hover:bg-secondary/70",
                      )}
                    >
                      <ArrowUp className={cn("size-4", post.upvotedByMe && "text-brass")} aria-hidden="true" />
                      {post.upvoteCount}
                    </button>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-semibold text-navy">{post.authorName}</span>
                        <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", cat.color)}>{cat.label}</span>
                        <span className="text-xs text-muted-foreground">{timeAgo(post.createdAt)}</span>
                      </div>
                      <p className="mt-1.5 text-[15px] leading-relaxed whitespace-pre-line text-[#3b4658]">{post.content}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
