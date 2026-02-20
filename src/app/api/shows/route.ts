import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  const { data, error } = await supabase
    .from("shows")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const shows = data.map((row) => ({
    id: row.id,
    date: row.date,
    venue: row.venue,
    city: row.city,
    country: row.country,
    ticketPrice: row.ticket_price,
    ticketUrl: row.ticket_url,
    isSoldOut: row.is_sold_out,
    isPast: row.is_past,
  }));

  return NextResponse.json(shows);
}

export async function POST(request: Request) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { data, error } = await supabase
    .from("shows")
    .insert({
      date: body.date,
      venue: body.venue,
      city: body.city,
      country: body.country,
      ticket_price: body.ticketPrice || null,
      ticket_url: body.ticketUrl || null,
      is_sold_out: body.isSoldOut || false,
      is_past: body.isPast || false,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    id: data.id,
    date: data.date,
    venue: data.venue,
    city: data.city,
    country: data.country,
    ticketPrice: data.ticket_price,
    ticketUrl: data.ticket_url,
    isSoldOut: data.is_sold_out,
    isPast: data.is_past,
  }, { status: 201 });
}
