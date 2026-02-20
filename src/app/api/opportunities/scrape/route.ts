import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getAuthUser } from "@/lib/auth";
import { stripHtml, extractOpportunities } from "@/lib/openai";

export async function POST(request: Request) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const sourceId = body.sourceId as string | undefined;

  let query = supabase.from("scrape_sources").select("*");
  if (sourceId) {
    query = query.eq("id", sourceId);
  }

  const { data: sources, error: srcErr } = await query;
  if (srcErr) {
    return NextResponse.json({ error: srcErr.message }, { status: 500 });
  }

  if (!sources || sources.length === 0) {
    return NextResponse.json({ error: "No sources found" }, { status: 404 });
  }

  let totalOpportunities = 0;

  for (const source of sources) {
    try {
      const res = await fetch(source.url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; OpportunityScraper/1.0)" },
      });
      if (!res.ok) continue;

      const html = await res.text();
      const text = stripHtml(html);
      const opportunities = await extractOpportunities(text);

      // Delete existing opportunities for this source
      await supabase
        .from("opportunities")
        .delete()
        .eq("source_id", source.id);

      if (opportunities.length > 0) {
        const rows = opportunities.map((opp) => ({
          source_id: source.id,
          title: opp.title,
          category: opp.category,
          description: opp.description || null,
          deadline: opp.deadline || null,
          link: opp.link || null,
          raw_source_url: source.url,
        }));

        await supabase.from("opportunities").insert(rows);
        totalOpportunities += rows.length;
      }
    } catch {
      // Skip failed sources silently
    }
  }

  return NextResponse.json({
    scraped: sources.length,
    opportunities: totalOpportunities,
  });
}
