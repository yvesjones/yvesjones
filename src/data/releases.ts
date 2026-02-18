export interface Track {
  title: string;
  duration: string;
  featuring?: string;
}

export interface Release {
  slug: string;
  title: string;
  type: "album" | "ep" | "single" | "mixtape";
  genre: string[];
  releaseDate: string;
  artwork: string;
  description: string;
  tracklist: Track[];
  credits: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  soundcloudUrl?: string;
  spotifyEmbed?: string;
  price?: number;
  downloadable?: boolean;
  featured?: boolean;
}

export const releases: Release[] = [
  {
    slug: "midnight-frequency",
    title: "Midnight Frequency",
    type: "album",
    genre: ["Trap", "House"],
    releaseDate: "2025-11-15",
    artwork: "/artwork/midnight-frequency.jpg",
    description: "A genre-defying debut album blending dark trap beats with pulsating house rhythms. 12 tracks crafted in late-night studio sessions across London and Berlin.",
    tracklist: [
      { title: "Intro - Frequency", duration: "1:42" },
      { title: "Neon Drip", duration: "3:28" },
      { title: "Bassweight", duration: "3:55", featuring: "MC Vex" },
      { title: "After Hours", duration: "4:12" },
      { title: "Purple Haze", duration: "3:33" },
      { title: "Underground", duration: "3:47" },
      { title: "4AM", duration: "4:01", featuring: "Dusk" },
      { title: "Voltage", duration: "3:22" },
      { title: "Ghost Riddim", duration: "3:58" },
      { title: "Eclipse", duration: "4:15" },
      { title: "Lost Signal", duration: "3:41" },
      { title: "Outro - Static", duration: "2:18" },
    ],
    credits: "Produced by Yves Jones. Mixed at Frequency Studios, London. Mastered by Alex Sterling.",
    spotifyUrl: "#",
    appleMusicUrl: "#",
    soundcloudUrl: "#",
    spotifyEmbed: "https://open.spotify.com/embed/album/placeholder",
    featured: true,
  },
  {
    slug: "drill-sessions-vol-1",
    title: "Drill Sessions Vol. 1",
    type: "mixtape",
    genre: ["UK Drill"],
    releaseDate: "2025-08-20",
    artwork: "/artwork/drill-sessions.jpg",
    description: "Raw, unfiltered drill energy. Six tracks recorded in a single weekend session. Available as an exclusive download.",
    tracklist: [
      { title: "Session Start", duration: "2:55" },
      { title: "Block Work", duration: "3:12" },
      { title: "No Hook", duration: "2:48", featuring: "Streetz" },
      { title: "Smoke Signals", duration: "3:33" },
      { title: "Active", duration: "3:01" },
      { title: "Session End", duration: "3:15" },
    ],
    credits: "Produced by Yves Jones & BeatSmith. Mixed at The Bunker Studio.",
    soundcloudUrl: "#",
    price: 4.99,
    downloadable: true,
  },
  {
    slug: "rave-tape",
    title: "RAVE TAPE",
    type: "ep",
    genre: ["Drum & Bass", "House"],
    releaseDate: "2025-05-01",
    artwork: "/artwork/rave-tape.jpg",
    description: "Four-track EP built for the dance floor. From liquid DnB rollers to peak-time house anthems.",
    tracklist: [
      { title: "Laser Beam", duration: "5:22" },
      { title: "Serotonin", duration: "4:48" },
      { title: "Warehouse", duration: "5:15" },
      { title: "Come Down", duration: "6:01" },
    ],
    credits: "Produced by Yves Jones. Mastered at Metropolis Studios.",
    spotifyUrl: "#",
    appleMusicUrl: "#",
    spotifyEmbed: "https://open.spotify.com/embed/album/placeholder",
  },
  {
    slug: "late-night-flows",
    title: "Late Night Flows",
    type: "mixtape",
    genre: ["Trap", "Hip-Hop"],
    releaseDate: "2025-02-14",
    artwork: "/artwork/late-night-flows.jpg",
    description: "A Valentine's Day drop. Smooth, atmospheric trap with introspective lyrics over moody production.",
    tracklist: [
      { title: "2AM Thoughts", duration: "3:42" },
      { title: "Velvet", duration: "3:18" },
      { title: "Moonwalk", duration: "2:55", featuring: "Luna" },
      { title: "Faded", duration: "3:33" },
      { title: "Last Call", duration: "4:01" },
    ],
    credits: "Produced by Yves Jones. All tracks written and performed by Yves Jones.",
    soundcloudUrl: "#",
    price: 3.99,
    downloadable: true,
  },
  {
    slug: "first-light",
    title: "First Light",
    type: "single",
    genre: ["House"],
    releaseDate: "2024-12-01",
    artwork: "/artwork/first-light.jpg",
    description: "A sunrise anthem. Euphoric house vibes for the early morning ravers.",
    tracklist: [
      { title: "First Light", duration: "5:45" },
    ],
    credits: "Produced by Yves Jones.",
    spotifyUrl: "#",
    appleMusicUrl: "#",
  },
];

export function getReleaseBySlug(slug: string): Release | undefined {
  return releases.find((r) => r.slug === slug);
}

export function getFeaturedRelease(): Release | undefined {
  return releases.find((r) => r.featured) || releases[0];
}
