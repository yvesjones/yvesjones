export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  artwork: string;
  tracklist: string[];
  format: string;
  stripePriceId?: string;
}

export const products: Product[] = [
  {
    id: "prod_1",
    slug: "drill-sessions-vol-1",
    title: "Drill Sessions Vol. 1",
    description: "Raw, unfiltered drill energy. Six tracks recorded in a single weekend session. Exclusive digital download.",
    price: 4.99,
    artwork: "/artwork/drill-sessions.jpg",
    tracklist: [
      "Session Start",
      "Block Work",
      "No Hook (ft. Streetz)",
      "Smoke Signals",
      "Active",
      "Session End",
    ],
    format: "MP3 / WAV",
    stripePriceId: "price_drill_sessions",
  },
  {
    id: "prod_2",
    slug: "late-night-flows",
    title: "Late Night Flows",
    description: "Smooth, atmospheric trap with introspective lyrics over moody production. Five tracks of pure vibes.",
    price: 3.99,
    artwork: "/artwork/late-night-flows.jpg",
    tracklist: [
      "2AM Thoughts",
      "Velvet",
      "Moonwalk (ft. Luna)",
      "Faded",
      "Last Call",
    ],
    format: "MP3 / WAV",
    stripePriceId: "price_late_night_flows",
  },
  {
    id: "prod_3",
    slug: "unreleased-vault",
    title: "The Unreleased Vault",
    description: "A collection of 8 unreleased tracks and demos. For the real ones only. Free with email signup.",
    price: 0,
    artwork: "/artwork/unreleased-vault.jpg",
    tracklist: [
      "Demo 01",
      "Demo 02",
      "Scrapped Intro",
      "Beat Tape Flip",
      "Voice Note",
      "Freestyle #4",
      "Late Session",
      "Unreleased Collab",
    ],
    format: "MP3",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
