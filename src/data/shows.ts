import { supabase } from "@/lib/supabase";

export interface Show {
  id: string;
  date: string;
  venue: string;
  city: string;
  country: string;
  ticketPrice?: string;
  ticketUrl?: string;
  isSoldOut?: boolean;
  isPast?: boolean;
}

function mapRow(row: Record<string, unknown>): Show {
  return {
    id: row.id as string,
    date: row.date as string,
    venue: row.venue as string,
    city: row.city as string,
    country: row.country as string,
    ticketPrice: row.ticket_price as string | undefined,
    ticketUrl: row.ticket_url as string | undefined,
    isSoldOut: row.is_sold_out as boolean,
    isPast: row.is_past as boolean,
  };
}

export async function getAllShows(): Promise<Show[]> {
  const { data, error } = await supabase
    .from("shows")
    .select("*")
    .order("date", { ascending: true });

  if (error || !data) return [];
  return data.map(mapRow);
}

export async function getUpcomingShows(): Promise<Show[]> {
  const shows = await getAllShows();
  return shows.filter((s) => !s.isPast);
}

export async function getPastShows(): Promise<Show[]> {
  const shows = await getAllShows();
  return shows.filter((s) => s.isPast);
}
