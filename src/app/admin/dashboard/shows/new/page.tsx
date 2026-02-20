"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabase-browser";
import ShowForm from "@/components/admin/ShowForm";

export default function NewShowPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleSubmit(data: any) {
    setLoading(true);
    const token = (await supabaseBrowser.auth.getSession()).data.session?.access_token;

    const res = await fetch("/api/shows", {
      method: "POST",
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

  return (
    <div>
      <Link
        href="/admin/dashboard/shows"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft size={16} /> Back to shows
      </Link>
      <h1 className="font-heading text-2xl font-bold mb-8">Add New Show</h1>
      <ShowForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
