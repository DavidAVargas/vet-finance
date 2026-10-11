"use client";

import { useState, useSyncExternalStore } from "react";
import {
  Plus,
  ToggleLeft,
  ToggleRight,
  Copy,
  Check,
  Link2,
  QrCode,
  Shuffle,
  Moon,
  Zap,
  Trash2,
  UserCheck,
} from "lucide-react";
import { generateInviteCode } from "@/lib/invite-code";
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

export type Member = { name: string; email: string; joinedAt: string | null };

/** Personal codes are for one person, so they start at one use (editable). */
const PERSONAL_MAX_USES = "1";

export default function AdminClient({
  inviteCodes: initial,
  membersByCode,
}: {
  inviteCodes: InviteCode[];
  membersByCode: Record<string, Member[]>;
}) {
  const [codes, setCodes] = useState(initial);
  const [newCode, setNewCode] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [newType, setNewType] = useState("personal");
  const [newMaxUses, setNewMaxUses] = useState(PERSONAL_MAX_USES);
  const [newExpiry, setNewExpiry] = useState("");
  const [creating, setCreating] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const changeType = (type: string) => {
    setNewType(type);
    setNewMaxUses(type === "personal" ? PERSONAL_MAX_USES : "");
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
    const res = await fetch("/api/admin/invites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) setCodes((prev) => prev.filter((c) => c.id !== id));
  };

  const handleToggle = async (id: string, current: boolean) => {
    await fetch("/api/admin/invites", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isActive: !current }),
    });
    setCodes((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !current } : c)),
    );
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
      setNewMaxUses(PERSONAL_MAX_USES);
      setNewExpiry("");
    }
    setCreating(false);
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(null), 2000);
  };

  /** 11:59 PM tonight, in the format a datetime-local input expects. */
  const tonight = () => {
    const d = new Date();
    d.setHours(23, 59, 0, 0);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  /** One click: a random event code labeled for today that closes at midnight. */
  const fillEventForTonight = () => {
    setNewCode(generateInviteCode());
    setNewType("event");
    setNewMaxUses("");
    setNewExpiry(tonight());
    if (!newLabel.trim()) {
      setNewLabel(
        `Code & Coffee · ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
      );
    }
  };

  const copyLink = (code: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/join/${code}`);
    setCopied(`link:${code}`);
    setTimeout(() => setCopied(null), 2000);
  };

  // Times are shown in the admin's own time zone, after hydration.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const typeColor: Record<string, string> = {
    event: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    personal: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    general: "bg-muted text-muted-foreground",
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-muted-foreground mb-1 text-sm">Admin</p>
          <h1 className="text-foreground text-2xl font-bold">Invite Codes</h1>
        </div>
        <Link
          href="/courses"
          className="text-muted-foreground hover:text-foreground text-sm underline underline-offset-2 transition-colors"
        >
          Back to courses
        </Link>
      </div>

      {/* Create form */}
      <div className="border-border bg-background mb-8 rounded-xl border p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-foreground text-sm font-semibold">
            Create invite code
          </h2>
          <button
            type="button"
            onClick={fillEventForTonight}
            className="bg-brass/20 hover:bg-brass/30 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-[#7a5a22]"
          >
            <Zap className="size-3.5" />
            Event code for tonight
          </button>
        </div>
        <form onSubmit={handleCreate} className="grid gap-3 sm:grid-cols-2">
          <div className="flex gap-2">
            <input
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              placeholder="Code (tap Generate)"
              aria-label="Invite code"
              className="border-border bg-muted/30 text-foreground focus:border-foreground focus:ring-ring min-w-0 flex-1 rounded-xl border px-4 py-2.5 font-mono text-sm uppercase outline-none focus:ring-2"
            />
            <button
              type="button"
              onClick={() => setNewCode(generateInviteCode())}
              className="border-border text-navy hover:bg-secondary flex shrink-0 items-center gap-1.5 rounded-xl border px-3 text-xs font-semibold"
            >
              <Shuffle className="size-3.5" />
              Generate
            </button>
          </div>
          <input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder={
              newType === "personal"
                ? "Who it's for (e.g. Mom)"
                : "Label (e.g. Code & Coffee Oct 2026)"
            }
            aria-label="Invite label"
            className="border-border bg-muted/30 text-foreground focus:border-foreground focus:ring-ring rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2"
          />
          <select
            value={newType}
            onChange={(e) => changeType(e.target.value)}
            aria-label="Invite type"
            className="border-border bg-muted/30 text-foreground focus:border-foreground focus:ring-ring rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2"
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
            aria-label="Max uses"
            className="border-border bg-muted/30 text-foreground focus:border-foreground focus:ring-ring rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2"
          />
          <div className="flex gap-2">
            <input
              value={newExpiry}
              onChange={(e) => setNewExpiry(e.target.value)}
              type="datetime-local"
              placeholder="Expires at (optional)"
              aria-label="Expires at"
              className="border-border bg-muted/30 text-foreground focus:border-foreground focus:ring-ring min-w-0 flex-1 rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2"
            />
            <button
              type="button"
              onClick={() => setNewExpiry(tonight())}
              className="border-border text-navy hover:bg-secondary flex shrink-0 items-center gap-1.5 rounded-xl border px-3 text-xs font-semibold"
            >
              <Moon className="size-3.5" />
              Tonight
            </button>
          </div>
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
        {codes.map((c) => {
          const members = membersByCode[c.code] ?? [];
          return (
            <div
              key={c.id}
              className="border-border bg-background rounded-xl border p-4"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="text-foreground font-mono text-sm font-bold">
                      {c.code}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${typeColor[c.type] ?? typeColor.general}`}
                    >
                      {c.type}
                    </span>
                    {!c.isActive && (
                      <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[11px] font-medium text-red-500">
                        Inactive
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-xs">{c.label}</p>
                  <p className="text-muted-foreground mt-0.5 text-xs">
                    {c.usedCount} used
                    {c.maxUses !== null ? ` / ${c.maxUses} max` : ""}
                    {mounted &&
                      c.expiresAt &&
                      ` · ${new Date(c.expiresAt) < new Date() ? "expired" : "expires"} ${new Date(c.expiresAt).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}`}
                  </p>
                </div>

                <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
                  <Link
                    href={`/admin/present/${c.id}`}
                    className="bg-navy hover:bg-navy/90 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    <QrCode className="size-3.5" />
                    Present
                  </Link>
                  <button
                    onClick={() => copyLink(c.code)}
                    aria-label={
                      copied === `link:${c.code}`
                        ? "Link copied"
                        : `Copy invite link for ${c.code}`
                    }
                    className="border-border text-muted-foreground hover:text-foreground flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
                  >
                    {copied === `link:${c.code}` ? (
                      <Check className="size-3.5 text-green-500" />
                    ) : (
                      <Link2 className="size-3.5" />
                    )}
                    Copy link
                  </button>
                  <button
                    onClick={() => copyToClipboard(c.code)}
                    aria-label={
                      copied === c.code ? "Code copied" : `Copy code ${c.code}`
                    }
                    className="border-border text-muted-foreground hover:text-foreground flex size-8 items-center justify-center rounded-lg border transition-colors"
                  >
                    {copied === c.code ? (
                      <Check className="size-3.5 text-green-500" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => handleToggle(c.id, c.isActive)}
                    className="border-border text-muted-foreground hover:text-foreground flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
                  >
                    {c.isActive ? (
                      <>
                        <ToggleRight className="size-3.5 text-green-500" />{" "}
                        Active
                      </>
                    ) : (
                      <>
                        <ToggleLeft className="size-3.5" /> Inactive
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    aria-label={
                      confirmDelete === c.id
                        ? `Tap again to delete ${c.code}`
                        : `Delete ${c.code}`
                    }
                    className={
                      confirmDelete === c.id
                        ? "flex items-center gap-1.5 rounded-lg bg-[#b42318] px-3 py-1.5 text-xs font-semibold text-white"
                        : "border-border text-muted-foreground flex size-8 items-center justify-center rounded-lg border transition-colors hover:border-[#b42318]/40 hover:text-[#b42318]"
                    }
                  >
                    <Trash2 className="size-3.5" />
                    {confirmDelete === c.id && "Tap again to delete"}
                  </button>
                </div>
              </div>

              {members.length > 0 && (
                <ul className="border-border mt-3 flex flex-col gap-1.5 border-t pt-3">
                  {members.map((m) => (
                    <li
                      key={m.email}
                      className="flex flex-wrap items-center gap-x-2 text-xs"
                    >
                      <UserCheck
                        className="size-3.5 text-green-600"
                        aria-hidden="true"
                      />
                      <span className="text-navy font-semibold">{m.name}</span>
                      <span className="text-muted-foreground">{m.email}</span>
                      {mounted && m.joinedAt && (
                        <span className="text-muted-foreground">
                          · joined{" "}
                          {new Date(m.joinedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              {members.length === 0 && c.type === "personal" && (
                <p className="border-border text-muted-foreground mt-3 border-t pt-3 text-xs">
                  Not used yet
                </p>
              )}
            </div>
          );
        })}
        {codes.length === 0 && (
          <p className="text-muted-foreground py-8 text-center text-sm">
            No invite codes yet. Create one above.
          </p>
        )}
      </div>
    </div>
  );
}
