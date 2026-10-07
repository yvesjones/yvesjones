import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getAuthUser } from "@/lib/auth";
import { defaultStats, type PressStats } from "@/data/stats";

/** The table holds exactly one row, pinned to this id. */
const ROW_ID = 1;

/**
 * Public read. Falls back to the bundled defaults rather than erroring, so the
 * Press page still renders correct figures if the table is missing or empty.
 */
export async function GET() {
  const { data, error } = await supabase
    .from("press_stats")
    .select("*")
    .eq("id", ROW_ID)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ ...defaultStats, source: "default" });
  }

  return NextResponse.json({
    monthlyListeners: data.monthly_listeners ?? defaultStats.monthlyListeners,
    totalStreams: data.total_streams ?? defaultStats.totalStreams,
    charts: data.charts ?? defaultStats.charts,
    shazams: data.shazams ?? defaultStats.shazams,
    updatedAt: data.updated_at ?? null,
    source: "db",
  });
}

export async function PUT(request: Request) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as Partial<PressStats>;

  // Display strings rather than numbers, so "64K+" and "8.6K" survive intact.
  const row = {
    id: ROW_ID,
    monthly_listeners: String(body.monthlyListeners ?? "").trim(),
    total_streams: String(body.totalStreams ?? "").trim(),
    charts: String(body.charts ?? "").trim(),
    shazams: String(body.shazams ?? "").trim(),
    updated_at: new Date().toISOString(),
  };

  if (Object.values(row).some((v) => v === "")) {
    return NextResponse.json(
      { error: "All four stats are required." },
      { status: 400 },
    );
  }

  const { error } = await supabase
    .from("press_stats")
    .upsert(row, { onConflict: "id" });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, updatedAt: row.updated_at });
}
