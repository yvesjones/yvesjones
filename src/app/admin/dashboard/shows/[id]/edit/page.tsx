"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabase-browser";
import ShowForm from "@/components/admin/ShowForm";

export default function EditShowPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [initialData, setInitialData] = useState<{
    date: string;
    venue: string;
    city: string;
    country: string;
    ticketPrice: string;
    ticketUrl: string;
    isSoldOut: boolean;
    isPast: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function fetchShow() {
      const res = await fetch("/api/shows");
      if (res.ok) {
        const shows = await res.json();
        const show = shows.find((s: { id: string }) => s.id === params.id);
        if (show) {
          setInitialData({
            date: show.date,
            venue: show.venue,
            city: show.city,
            country: show.country,
            ticketPrice: show.ticketPrice || "",
            ticketUrl: show.ticketUrl || "",
            isSoldOut: show.isSoldOut || false,
            isPast: show.isPast || false,
          });
        }
      }
      setFetching(false);
    }

    fetchShow();
  }, [params.id]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleSubmit(data: any) {
    setLoading(true);
    const token = (await supabaseBrowser.auth.getSession()).data.session?.access_token;

    const res = await fetch(`/api/shows/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/admin/dashboard/shows");
    } else {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!initialData) {
    return <p className="text-muted py-12">Show not found.</p>;
  }

  return (
    <div>
      <Link
        href="/admin/dashboard/shows"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft size={16} /> Back to shows
      </Link>
      <h1 className="font-heading text-2xl font-bold mb-8">Edit Show</h1>
      <ShowForm initialData={initialData} onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
