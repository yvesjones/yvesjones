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

export const shows: Show[] = [
  {
    id: "1",
    date: "2026-03-15",
    venue: "Fabric",
    city: "London",
    country: "UK",
    ticketPrice: "\u00a315",
    ticketUrl: "#",
  },
  {
    id: "2",
    date: "2026-03-28",
    venue: "Printworks",
    city: "London",
    country: "UK",
    ticketPrice: "\u00a322",
    ticketUrl: "#",
  },
  {
    id: "3",
    date: "2026-04-10",
    venue: "Warehouse Project",
    city: "Manchester",
    country: "UK",
    ticketPrice: "\u00a318",
    ticketUrl: "#",
  },
  {
    id: "4",
    date: "2026-04-25",
    venue: "Sub Club",
    city: "Glasgow",
    country: "UK",
    ticketPrice: "\u00a312",
    ticketUrl: "#",
  },
  {
    id: "5",
    date: "2026-05-16",
    venue: "Berghain",
    city: "Berlin",
    country: "Germany",
    ticketPrice: "\u20ac18",
    ticketUrl: "#",
  },
  {
    id: "6",
    date: "2025-12-31",
    venue: "XOYO",
    city: "London",
    country: "UK",
    ticketPrice: "\u00a320",
    isPast: true,
  },
  {
    id: "7",
    date: "2025-11-15",
    venue: "Motion",
    city: "Bristol",
    country: "UK",
    ticketPrice: "\u00a315",
    isPast: true,
  },
];

export function getUpcomingShows(): Show[] {
  return shows.filter((s) => !s.isPast);
}

export function getPastShows(): Show[] {
  return shows.filter((s) => s.isPast);
}
