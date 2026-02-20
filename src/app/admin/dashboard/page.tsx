"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Users, Search } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function DashboardPage() {
  const [showsCount, setShowsCount] = useState<number | null>(null);
  const [subscribersCount, setSubscribersCount] = useState<number | null>(null);
  const [opportunitiesCount, setOpportunitiesCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCounts() {
      const token = (await supabaseBrowser.auth.getSession()).data.session?.access_token;
      const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

      const [showsRes, subsRes, oppsRes] = await Promise.all([
        fetch("/api/shows"),
        fetch("/api/subscribers", { headers }),
        fetch("/api/opportunities", { headers }),
      ]);

      if (showsRes.ok) {
        const shows = await showsRes.json();
        const upcoming = shows.filter((s: { isPast: boolean }) => !s.isPast);
        setShowsCount(upcoming.length);
      }

      if (subsRes.ok) {
        const subs = await subsRes.json();
        setSubscribersCount(subs.length);
      }

      if (oppsRes.ok) {
        const opps = await oppsRes.json();
        setOpportunitiesCount(opps.length);
      }
    }

    fetchCounts();
  }, []);

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Calendar size={20} className="text-accent" />
            </div>
            <h2 className="font-heading text-lg font-bold">Upcoming Shows</h2>
          </div>
          <p className="text-4xl font-bold font-heading">
            {showsCount !== null ? showsCount : "..."}
          </p>
          <Link
            href="/admin/dashboard/shows"
            className="inline-block mt-4 text-sm text-accent hover:text-accent/80 transition-colors"
          >
            Manage shows &rarr;
          </Link>
        </div>

        <div className="bg-surface rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Users size={20} className="text-accent" />
            </div>
            <h2 className="font-heading text-lg font-bold">Subscribers</h2>
          </div>
          <p className="text-4xl font-bold font-heading">
            {subscribersCount !== null ? subscribersCount : "..."}
          </p>
          <Link
            href="/admin/dashboard/subscribers"
            className="inline-block mt-4 text-sm text-accent hover:text-accent/80 transition-colors"
          >
            View subscribers &rarr;
          </Link>
        </div>

        <div className="bg-surface rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Search size={20} className="text-accent" />
            </div>
            <h2 className="font-heading text-lg font-bold">Opportunities</h2>
          </div>
          <p className="text-4xl font-bold font-heading">
            {opportunitiesCount !== null ? opportunitiesCount : "..."}
          </p>
          <Link
            href="/admin/dashboard/opportunities"
            className="inline-block mt-4 text-sm text-accent hover:text-accent/80 transition-colors"
          >
            Browse opportunities &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
