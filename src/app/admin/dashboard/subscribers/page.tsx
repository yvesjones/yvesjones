"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase-browser";

interface Subscriber {
  id: string;
  email: string;
  source: string;
  created_at: string;
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchSubscribers() {
      const token = (await supabaseBrowser.auth.getSession()).data.session?.access_token;
      const res = await fetch("/api/subscribers", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setSubscribers(await res.json());
      }
      setLoading(false);
    }

    fetchSubscribers();
  }, []);

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase()),
  );

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
        <div>
          <h1 className="font-heading text-2xl font-bold">Subscribers</h1>
          <p className="text-sm text-muted mt-1">{subscribers.length} total</p>
        </div>
      </div>

      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by email..."
          className="w-full max-w-sm bg-surface border border-border rounded-xl pl-10 pr-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors text-sm"
        />
      </div>

      <div className="bg-surface rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted">
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Source</th>
              <th className="px-6 py-4 font-medium">Subscribed</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((sub) => (
              <tr key={sub.id} className="border-b border-border last:border-0 hover:bg-surface-light/50 transition-colors">
                <td className="px-6 py-4 font-medium">{sub.email}</td>
                <td className="px-6 py-4">
                  <span className="text-xs bg-accent/10 text-accent px-2.5 py-1 rounded-full">
                    {sub.source || "unknown"}
                  </span>
                </td>
                <td className="px-6 py-4 text-muted">
                  {new Date(sub.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="text-center text-muted py-12">
            {search ? "No matching subscribers." : "No subscribers yet."}
          </p>
        )}
      </div>
    </div>
  );
}
