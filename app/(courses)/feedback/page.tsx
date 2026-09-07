"use client";

import { useEffect, useState, useOptimistic, startTransition } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { ArrowUp, ChevronLeft, Loader2, Send } from "lucide-react";
import Link from "next/link";

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
  { value: "general", label: "General", color: "bg-muted text-muted-foreground" },
  { value: "feature", label: "Feature idea", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  { value: "bug", label: "Bug", color: "bg-red-500/10 text-red-600 dark:text-red-400" },
  { value: "content", label: "Content", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
];

function categoryStyle(value: string) {
  return CATEGORIES.find((c) => c.value === value)?.color ?? "bg-muted text-muted-foreground";
}
function categoryLabel(value: string) {
  return CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

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
  const { user } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/api/feedback")
      .then((r) => r.json())
      .then((data) => { setPosts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || submitting) return;
    setSubmitting(true);

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, category }),
    });

    if (res.ok) {
      const newPost = await res.json();
      setPosts((prev) => [newPost, ...prev]);
      setContent("");
    }
    setSubmitting(false);
  };

  const handleUpvote = async (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, upvotedByMe: !p.upvotedByMe, upvoteCount: p.upvotedByMe ? p.upvoteCount - 1 : p.upvoteCount + 1 }
          : p
      )
    );

    await fetch(`/api/feedback/${postId}/upvote`, { method: "POST" });
  };

  const filtered = filter === "all" ? posts : posts.filter((p) => p.category === filter);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <header className="flex h-14 items-center justify-between border-b border-border px-6">
        <Link href="/courses" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="size-4" />
          Back to courses
        </Link>
        <UserButton afterSignOutUrl="/" />
      </header>

      <main className="flex-1 px-6 py-10">
        <div className="mx-auto max-w-2xl">

          {/* Header */}
          <div className="mb-8">
            <p className="mb-1 text-sm text-muted-foreground">Beta feedback</p>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">What do you think?</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Your feedback shapes what gets built next. Upvote what others said if you feel the same.
            </p>
          </div>

          {/* Post form */}
          <div className="mb-8 rounded-xl border border-border bg-background p-5">
            <p className="mb-3 text-sm font-medium text-foreground">Share your feedback</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's working, what's not, or what you wish existed..."
                rows={3}
                className="w-full resize-none rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-foreground"
              />
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setCategory(c.value)}
                      className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all ${
                        category === c.value
                          ? c.color + " ring-1 ring-current/20"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
                <button
                  type="submit"
                  disabled={!content.trim() || submitting}
                  className="flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
                  style={{ background: "var(--brand-600)" }}
                >
                  {submitting ? <Loader2 className="size-3.5 animate-spin" /> : <Send className="size-3.5" />}
                  Post
                </button>
              </div>
            </form>
          </div>

          {/* Filter tabs */}
          <div className="mb-5 flex items-center gap-2 overflow-x-auto pb-1">
            {[{ value: "all", label: "All" }, ...CATEGORIES].map((c) => (
              <button
                key={c.value}
                onClick={() => setFilter(c.value)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  filter === c.value
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {"label" in c ? c.label : c.value}
              </button>
            ))}
          </div>

          {/* Posts */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="size-5 animate-spin text-muted-foreground" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-sm text-muted-foreground">
              No feedback yet — be the first to share.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filtered.map((post) => (
                <div key={post.id} className="flex gap-4 rounded-xl border border-border bg-background p-5">
                  {/* Upvote */}
                  <button
                    onClick={() => handleUpvote(post.id)}
                    className={`flex shrink-0 flex-col items-center gap-0.5 rounded-lg p-2 text-xs font-semibold transition-colors ${
                      post.upvotedByMe
                        ? "text-white"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    style={post.upvotedByMe ? { background: "var(--brand-600)" } : undefined}
                  >
                    <ArrowUp className="size-3.5" />
                    {post.upvoteCount}
                  </button>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{post.authorName}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${categoryStyle(post.category)}`}>
                        {categoryLabel(post.category)}
                      </span>
                      <span className="text-xs text-muted-foreground">{timeAgo(post.createdAt)}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{post.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
