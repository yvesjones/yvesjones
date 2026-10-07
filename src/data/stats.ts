/**
 * Press stats.
 *
 * These values are the fallback the Press page renders with — they ship in the
 * bundle so the page is never blank or wrong if Supabase is unreachable or the
 * table hasn't been seeded. The admin dashboard writes updated figures to
 * Supabase, and the page overlays those on top once fetched.
 */

export interface PressStats {
  monthlyListeners: string;
  totalStreams: string;
  charts: string;
  shazams: string;
  updatedAt?: string | null;
}

export const defaultStats: PressStats = {
  monthlyListeners: "64K+",
  totalStreams: "10M+",
  charts: "76",
  shazams: "8.6K",
};

/** Order and labels used for display, so the page and admin form agree. */
export const statFields = [
  { key: "monthlyListeners", label: "Monthly Listeners" },
  { key: "totalStreams", label: "Total Streams" },
  { key: "charts", label: "Charts" },
  { key: "shazams", label: "Shazams" },
] as const satisfies ReadonlyArray<{ key: keyof PressStats; label: string }>;
