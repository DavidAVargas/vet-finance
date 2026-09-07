"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, ToggleLeft, ToggleRight, Copy, Check } from "lucide-react";
import Link from "next/link";

type InviteCode = {
  id: string;
  code: string;
  type: string;
  label: string;
  isActive: boolean;
  maxUses: number | null;
  usedCount: number;
  expiresAt: Date | null;
  createdAt: Date;
};

export default function AdminClient({ inviteCodes: initial }: { inviteCodes: InviteCode[] }) {
  const router = useRouter();
  const [codes, setCodes] = useState(initial);
  const [newCode, setNewCode] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [newType, setNewType] = useState("personal");
  const [newMaxUses, setNewMaxUses] = useState("");
  const [newExpiry, setNewExpiry] = useState("");
  const [creating, setCreating] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const handleToggle = async (id: string, current: boolean) => {
    await fetch("/api/admin/invites", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isActive: !current }),
    });
    setCodes((prev) => prev.map((c) => (c.id === id ? { ...c, isActive: !current } : c)));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim() || !newLabel.trim()) return;
    setCreating(true);

    const res = await fetch("/api/admin/invites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: newCode.trim().toUpperCase(),
        label: newLabel.trim(),
        type: newType,
        maxUses: newMaxUses ? parseInt(newMaxUses) : null,
        expiresAt: newExpiry ? new Date(newExpiry).toISOString() : null,
      }),
    });

    if (res.ok) {
      const created = await res.json();
      setCodes((prev) => [created, ...prev]);
      setNewCode("");
      setNewLabel("");
      setNewType("personal");
      setNewMaxUses("");
      setNewExpiry("");
    }
    setCreating(false);
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  const typeColor: Record<string, string> = {
    event: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    personal: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    general: "bg-muted text-muted-foreground",
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="mb-1 text-sm text-muted-foreground">Admin</p>
          <h1 className="text-2xl font-bold text-foreground">Invite Codes</h1>
        </div>
        <Link
          href="/courses"
          className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
        >
          Back to courses
        </Link>
      </div>

      {/* Create form */}
      <div className="mb-8 rounded-xl border border-border bg-background p-6">
        <h2 className="mb-4 text-sm font-semibold text-foreground">Create invite code</h2>
        <form onSubmit={handleCreate} className="grid gap-3 sm:grid-cols-2">
          <input
            value={newCode}
            onChange={(e) => setNewCode(e.target.value)}
            placeholder="Code (e.g. CC-OCT2026)"
            className="rounded-xl border border-border bg-muted/30 px-4 py-2.5 text-sm font-mono uppercase text-foreground outline-none focus:border-foreground"
          />
          <input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="Label (e.g. Code & Coffee Oct 2026)"
            className="rounded-xl border border-border bg-muted/30 px-4 py-2.5 text-sm text-foreground outline-none focus:border-foreground"
          />
          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            className="rounded-xl border border-border bg-muted/30 px-4 py-2.5 text-sm text-foreground outline-none focus:border-foreground"
          >
            <option value="personal">Personal</option>
            <option value="event">Event</option>
            <option value="general">General</option>
          </select>
          <input
            value={newMaxUses}
            onChange={(e) => setNewMaxUses(e.target.value)}
            type="number"
            placeholder="Max uses (blank = unlimited)"
            className="rounded-xl border border-border bg-muted/30 px-4 py-2.5 text-sm text-foreground outline-none focus:border-foreground"
          />
          <input
            value={newExpiry}
            onChange={(e) => setNewExpiry(e.target.value)}
            type="datetime-local"
            placeholder="Expires at (optional)"
            className="rounded-xl border border-border bg-muted/30 px-4 py-2.5 text-sm text-foreground outline-none focus:border-foreground"
          />
          <button
            type="submit"
            disabled={!newCode.trim() || !newLabel.trim() || creating}
            className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
            style={{ background: "var(--brand-600)" }}
          >
            <Plus className="size-4" />
            {creating ? "Creating..." : "Create code"}
          </button>
        </form>
      </div>

      {/* Codes list */}
      <div className="flex flex-col gap-3">
        {codes.map((c) => (
          <div key={c.id} className="flex items-center justify-between gap-4 rounded-xl border border-border bg-background p-4">
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="font-mono text-sm font-bold text-foreground">{c.code}</span>
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${typeColor[c.type] ?? typeColor.general}`}>
                  {c.type}
                </span>
                {!c.isActive && (
                  <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[11px] font-medium text-red-500">
                    Inactive
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{c.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {c.usedCount} used{c.maxUses !== null ? ` / ${c.maxUses} max` : ""}
                {c.expiresAt && ` · expires ${new Date(c.expiresAt).toLocaleDateString()}`}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={() => copyToClipboard(c.code)}
                className="flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
              >
                {copied === c.code ? <Check className="size-3.5 text-green-500" /> : <Copy className="size-3.5" />}
              </button>
              <button
                onClick={() => handleToggle(c.id, c.isActive)}
                className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {c.isActive
                  ? <><ToggleRight className="size-3.5 text-green-500" /> Active</>
                  : <><ToggleLeft className="size-3.5" /> Inactive</>
                }
              </button>
            </div>
          </div>
        ))}
        {codes.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">No invite codes yet. Create one above.</p>
        )}
      </div>
    </div>
  );
}
