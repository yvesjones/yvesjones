"use client";

import { useEffect, useState } from "react";
import { Check, RefreshCw } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { defaultStats, statFields, type PressStats } from "@/data/stats";

type Status = "idle" | "saving" | "saved" | "error";

export default function StatsPage() {
  const [stats, setStats] = useState<PressStats>(defaultStats);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          setStats({
            monthlyListeners: data.monthlyListeners,
            totalStreams: data.totalStreams,
            charts: data.charts,
            shazams: data.shazams,
          });
          setUpdatedAt(data.updatedAt ?? null);
        }
      } catch {
        /* keep the bundled defaults */
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setMessage("");

    const token = (await supabaseBrowser.auth.getSession()).data.session
      ?.access_token;

    const res = await fetch("/api/stats", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(stats),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setStatus("error");
      setMessage(data.error || "Could not save.");
      return;
    }

    setStatus("saved");
    setUpdatedAt(data.updatedAt ?? new Date().toISOString());
    setTimeout(() => setStatus("idle"), 2500);
  }

  if (loading) {
    return <p className="text-muted text-sm">Loading…</p>;
  }

  return (
    <div className="max-w-2xl">
      <h2 className="font-heading text-2xl font-bold">Press Stats</h2>
      <p className="text-muted text-sm mt-2">
        These appear in the Key Stats panel on the Press page. Spotify has no
        public API for monthly listeners, so this is updated by hand — take the
        figure from Spotify for Artists.
      </p>

      {updatedAt && (
        <p className="text-xs text-muted mt-3">
          Last updated{" "}
          {new Date(updatedAt).toLocaleString("en-GB", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>
      )}

      <form onSubmit={handleSave} className="mt-8 space-y-5">
        {statFields.map((field) => (
          <div key={field.key}>
            <label
              htmlFor={field.key}
              className="block text-sm text-muted mb-2"
            >
              {field.label}
            </label>
            <input
              id={field.key}
              type="text"
              value={stats[field.key]}
              onChange={(e) =>
                setStats((prev) => ({ ...prev, [field.key]: e.target.value }))
              }
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent transition-colors"
              required
            />
          </div>
        ))}

        <p className="text-xs text-muted">
          Typed exactly as they should appear &mdash; including any
          &ldquo;K&rdquo;, &ldquo;M&rdquo; or &ldquo;+&rdquo;.
        </p>

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={status === "saving"}
            className="flex items-center gap-2 bg-accent hover:bg-accent/80 text-white px-6 py-3 rounded-full text-sm font-medium transition-colors disabled:opacity-50"
          >
            {status === "saving" ? (
              <RefreshCw size={16} className="animate-spin" />
            ) : status === "saved" ? (
              <Check size={16} />
            ) : null}
            {status === "saving"
              ? "Saving…"
              : status === "saved"
                ? "Saved"
                : "Save stats"}
          </button>

          {status === "error" && (
            <span className="text-sm text-accent-pink">{message}</span>
          )}
        </div>
      </form>
    </div>
  );
}
