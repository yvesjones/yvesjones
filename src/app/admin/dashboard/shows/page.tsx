"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import type { Show } from "@/data/shows";

export default function AdminShowsPage() {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchShows() {
    const res = await fetch("/api/shows");
    if (res.ok) {
      setShows(await res.json());
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchShows();
  }, []);

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this show?")) return;

    const token = (await supabaseBrowser.auth.getSession()).data.session?.access_token;
    const res = await fetch(`/api/shows/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setShows((prev) => prev.filter((s) => s.id !== id));
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl font-bold">Shows</h1>
        <Link
          href="/admin/dashboard/shows/new"
          className="flex items-center gap-2 bg-accent hover:bg-accent/80 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
        >
          <Plus size={16} /> Add New Show
        </Link>
      </div>

      <div className="bg-surface rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted">
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Venue</th>
              <th className="px-6 py-4 font-medium">Location</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shows.map((show) => (
              <tr key={show.id} className="border-b border-border last:border-0 hover:bg-surface-light/50 transition-colors">
                <td className="px-6 py-4">
                  {new Date(show.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 font-medium">{show.venue}</td>
                <td className="px-6 py-4 text-muted">
                  {show.city}, {show.country}
                </td>
                <td className="px-6 py-4 text-muted">{show.ticketPrice || "—"}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {show.isSoldOut && (
                      <span className="text-xs bg-accent-pink/10 text-accent-pink px-2.5 py-1 rounded-full">
                        Sold Out
                      </span>
                    )}
                    {show.isPast && (
                      <span className="text-xs bg-muted/10 text-muted px-2.5 py-1 rounded-full">
                        Past
                      </span>
                    )}
                    {!show.isSoldOut && !show.isPast && (
                      <span className="text-xs bg-green-500/10 text-green-400 px-2.5 py-1 rounded-full">
                        Upcoming
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/dashboard/shows/${show.id}/edit`}
                      className="p-2 text-muted hover:text-foreground hover:bg-surface-light rounded-lg transition-colors"
                    >
                      <Pencil size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(show.id)}
                      className="p-2 text-muted hover:text-red-400 hover:bg-surface-light rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {shows.length === 0 && (
          <p className="text-center text-muted py-12">No shows yet.</p>
        )}
      </div>
    </div>
  );
}
