import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getAuthUser } from "@/lib/auth";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { data, error } = await supabase
    .from("shows")
    .update({
      date: body.date,
      venue: body.venue,
      city: body.city,
      country: body.country,
      ticket_price: body.ticketPrice || null,
      ticket_url: body.ticketUrl || null,
      is_sold_out: body.isSoldOut || false,
      is_past: body.isPast || false,
    })
    .eq("id", id)
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
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { error } = await supabase.from("shows").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
