export interface Track {
  title: string;
  duration: string;
  featuring?: string;
}

export interface Release {
  slug: string;
  title: string;
  /**
   * Billed artists, in Spotify's credit order. Omit for solo Yves Jones
   * releases — `releaseArtists()` fills in the default.
   */
  artists?: string[];
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
    slug: "fade",
    title: "Fade",
    artists: ["Fieves", "Yves Jones", "Finnerz"],
    type: "single",
    genre: ["Hip-Hop", "Electronic"],
    releaseDate: "2026-02-27",
    artwork: "https://i.scdn.co/image/ab67616d0000b273b3d9105057d726434e006f54",
    description: "The latest single from Fieves. A moody, atmospheric track blending hip-hop and electronic production.",
    tracklist: [
      { title: "Fade", duration: "2:34" },
    ],
    credits: "By Fieves, Yves Jones & Finnerz.",
    spotifyUrl: "https://open.spotify.com/album/5QrlCLZeWlXmAUmRMpdervV",
    spotifyEmbed: "https://open.spotify.com/embed/album/5QrlCLZeWlXmAUmRMpdervV",
    featured: true,
  },
  {
    slug: "kidz",
    title: "K.I.D.Z",
    artists: ["Fieves", "Yves Jones", "Finnerz"],
    type: "single",
    genre: ["Hip-Hop", "Rap"],
    releaseDate: "2026-01-01",
    artwork: "https://i.scdn.co/image/ab67616d0000b273ee9e168c5fd13b8201d88560",
    description: "A hard-hitting collaborative single with Fieves and Finnerz.",
    tracklist: [
      { title: "K.I.D.Z", duration: "2:31" },
    ],
    credits: "Produced by Fieves, Yves Jones & Finnerz.",
    spotifyUrl: "https://open.spotify.com/album/1mJV8GgQVXovp94wqzOlXU",
    spotifyEmbed: "https://open.spotify.com/embed/album/1mJV8GgQVXovp94wqzOlXU",
  },
  {
    slug: "catch-me",
    title: "Catch Me",
    artists: ["Fieves", "Yves Jones", "Finnerz", "luke royalty"],
    type: "single",
    genre: ["Hip-Hop", "Electronic"],
    releaseDate: "2025-01-01",
    artwork: "https://i.scdn.co/image/ab67616d0000b2732c72c29cd07d7ce0db824b14",
    description: "A genre-blending Fieves single pushing the boundaries between rap and electronic dance.",
    tracklist: [
      { title: "Catch Me", duration: "3:24", featuring: "luke royalty" },
    ],
    credits: "By Fieves, Yves Jones & Finnerz. Features luke royalty.",
    spotifyUrl: "https://open.spotify.com/album/4GFPQirvGUZjsjmTWfSJFO",
    spotifyEmbed: "https://open.spotify.com/embed/album/4GFPQirvGUZjsjmTWfSJFO",
  },
  {
    slug: "between-hello-and-goodbye",
    title: "Between Hello & Goodbye",
    artists: ["Fieves", "Yves Jones", "Finnerz"],
    type: "album",
    genre: ["Hip-Hop", "Rap", "Electronic"],
    releaseDate: "2024-03-27",
    artwork: "https://i.scdn.co/image/ab67616d0000b273d17bc5128a47ef31fab03252",
    description: "A collaborative album with Fieves and Finnerz. Seven tracks spanning introspective rap, remixes, and electronic-infused hip-hop.",
    tracklist: [
      { title: "Loss is Loss", duration: "3:26" },
      { title: "Million Faces", duration: "3:39", featuring: "Nyah Grace" },
      { title: "All We Do Is Talk", duration: "3:13", featuring: "Verbz" },
      { title: "What Can I Say", duration: "3:11", featuring: "aya dia & 2b.Frank" },
      { title: "Steps", duration: "3:08", featuring: "DBL A" },
      { title: "Million Faces (Yves Jones Remix)", duration: "2:54" },
      { title: "Loss Is Loss (Channell Remix)", duration: "4:39" },
    ],
    credits: "By Fieves, Yves Jones & Finnerz. Features Nyah Grace, Verbz, DBL A, aya dia & 2b.Frank.",
    spotifyUrl: "https://open.spotify.com/album/3VX46XMco0fSHMzGgrEoTl",
    appleMusicUrl: "https://music.apple.com/album/between-hello-goodbye/1732761303",
    spotifyEmbed: "https://open.spotify.com/embed/album/3VX46XMco0fSHMzGgrEoTl",
  },
  {
    slug: "state-of-britain-freestyle",
    title: "State of Britain (Freestyle)",
    type: "single",
    genre: ["Rap", "Freestyle"],
    releaseDate: "2024-01-01",
    artwork: "https://i.scdn.co/image/ab67616d0000b27336bbae830764294983480d13",
    description: "A raw freestyle addressing the state of things. Unfiltered bars over a stripped-back beat.",
    tracklist: [
      { title: "State of Britain (Freestyle)", duration: "3:00" },
    ],
    credits: "Produced by Yves Jones.",
    spotifyUrl: "https://open.spotify.com/album/26dY4CXUZiwSEdGjxpHoQx",
    spotifyEmbed: "https://open.spotify.com/embed/album/26dY4CXUZiwSEdGjxpHoQx",
  },
  {
    slug: "art-of-doing-nothing",
    title: "Art of Doing Nothing",
    type: "single",
    genre: ["Hip-Hop", "Electronic"],
    releaseDate: "2024-01-01",
    artwork: "https://i.scdn.co/image/ab67616d0000b273e230385e7945f31e00044c25",
    description: "A laid-back single capturing the beauty of slowing down.",
    tracklist: [
      { title: "Art of Doing Nothing", duration: "3:20" },
    ],
    credits: "Produced by Yves Jones.",
    spotifyUrl: "https://open.spotify.com/album/4TaK9xfZ9E3mArJtPMgrvh",
    spotifyEmbed: "https://open.spotify.com/embed/album/4TaK9xfZ9E3mArJtPMgrvh",
  },
  {
    slug: "found-my-way",
    title: "Found My Way",
    artists: ["aya dia", "2b.Frank", "Yves Jones"],
    type: "single",
    genre: ["Hip-Hop", "Rap"],
    releaseDate: "2024-01-01",
    artwork: "https://i.scdn.co/image/ab67616d0000b273e7c90c5ad0695afd98d7046f",
    description: "A collaborative single with aya dia and 2b.Frank.",
    tracklist: [
      { title: "Found My Way", duration: "3:10", featuring: "aya dia & 2b.Frank" },
    ],
    credits: "By aya dia, 2b.Frank & Yves Jones.",
    spotifyUrl: "https://open.spotify.com/album/72vHXLUrZyiW1gJgP859aW",
    spotifyEmbed: "https://open.spotify.com/embed/album/72vHXLUrZyiW1gJgP859aW",
  },
  {
    slug: "laidback",
    title: "Laidback",
    type: "single",
    genre: ["Hip-Hop", "Electronic"],
    releaseDate: "2024-01-01",
    artwork: "https://i.scdn.co/image/ab67616d0000b2732e28244a5c938789439fcadc",
    description: "Easy-going vibes with smooth production.",
    tracklist: [
      { title: "Laidback", duration: "3:00" },
    ],
    credits: "Produced by Yves Jones.",
    spotifyUrl: "https://open.spotify.com/album/3VzFD1BIBvWnGHl5yqIVdZ",
    spotifyEmbed: "https://open.spotify.com/embed/album/3VzFD1BIBvWnGHl5yqIVdZ",
  },
  {
    slug: "streetlights",
    title: "Streetlights",
    artists: ["Fieves", "2b.Frank"],
    type: "single",
    genre: ["Hip-Hop", "Rap"],
    releaseDate: "2023-10-01",
    artwork: "https://i.scdn.co/image/ab67616d0000b273e1d2b9a563a4be7c6e1d7180",
    description: "A Fieves single with 2b.Frank.",
    tracklist: [
      { title: "Streetlights", duration: "3:13", featuring: "2b.Frank" },
    ],
    credits: "By Fieves & 2b.Frank.",
    spotifyUrl: "https://open.spotify.com/track/2fLVQsDmPoU1kaT9s9Z9H0",
    spotifyEmbed: "https://open.spotify.com/embed/track/2fLVQsDmPoU1kaT9s9Z9H0",
  },
  {
    slug: "smarties",
    title: "Smarties",
    type: "ep",
    genre: ["Hip-Hop", "Rap"],
    releaseDate: "2022-01-01",
    artwork: "https://i.scdn.co/image/ab67616d0000b273d54842016e9f23ffc55bd86c",
    description: "A colourful EP showcasing Yves Jones' versatility across multiple styles.",
    tracklist: [
      { title: "Smarties", duration: "3:00" },
    ],
    credits: "Produced by Yves Jones.",
    spotifyUrl: "https://open.spotify.com/album/3uXyP0GiYuucBhqVPQbPcc",
    spotifyEmbed: "https://open.spotify.com/embed/album/3uXyP0GiYuucBhqVPQbPcc",
  },
  {
    slug: "no-one-in-the-six-one",
    title: "No One in the Six One",
    type: "album",
    genre: ["Hip-Hop", "Rap", "Electronic"],
    releaseDate: "2022-05-20",
    artwork: "https://i.scdn.co/image/ab67616d0000b2733b6124d88e1f3f78cfd2e4d9",
    description: "A concept album following journeys along Manchester's motorways. Ten tracks blending introspective rap with electronic production, featuring collaborations with Sweets, Finnerz, meimei., and GGK.",
    tracklist: [
      { title: "M1 Interlude", duration: "1:02" },
      { title: "M1", duration: "3:40" },
      { title: "M4 Interlude", duration: "1:31" },
      { title: "M4", duration: "3:30", featuring: "Sweets" },
      { title: "M14 Interlude", duration: "1:17" },
      { title: "M14", duration: "3:42", featuring: "Finnerz" },
      { title: "M50 Interlude", duration: "0:59" },
      { title: "M50", duration: "3:32", featuring: "meimei." },
      { title: "M15 Interlude", duration: "1:05" },
      { title: "M15", duration: "3:33", featuring: "GGK" },
    ],
    credits: "Produced by Yves Jones. Features Sweets, Finnerz, meimei. & GGK. \u00a9 2022 Yves Jones.",
    spotifyUrl: "https://open.spotify.com/album/0WIOOKtu0QCqCAziRbw46U",
    spotifyEmbed: "https://open.spotify.com/embed/album/0WIOOKtu0QCqCAziRbw46U",
  },
  {
    slug: "cigarette-stories",
    title: "Cigarette Stories",
    artists: ["Fieves"],
    type: "single",
    genre: ["Hip-Hop", "Rap"],
    releaseDate: "2022-02-01",
    artwork: "https://i.scdn.co/image/ab67616d0000b27382a1a412a0f8b60800b83187",
    description: "A solo single from Fieves.",
    tracklist: [
      { title: "Cigarette Stories", duration: "3:19" },
    ],
    credits: "By Fieves.",
    spotifyUrl: "https://open.spotify.com/track/3aSz9Zie70QJQmsgtHp9hp",
    spotifyEmbed: "https://open.spotify.com/embed/track/3aSz9Zie70QJQmsgtHp9hp",
  },
  {
    slug: "the-insomniac-project",
    title: "The Insomniac Project",
    type: "ep",
    genre: ["Electronic", "Dance"],
    releaseDate: "2021-01-01",
    artwork: "https://i.scdn.co/image/ab67616d0000b273c5fd28642c9fd0d4c5e074fc",
    description: "Late-night electronic experiments. An EP born from sleepless studio sessions.",
    tracklist: [
      { title: "The Insomniac Project", duration: "4:00" },
    ],
    credits: "Produced by Yves Jones.",
    spotifyUrl: "https://open.spotify.com/album/2BbXUxTS9gDtB2ZXm6rXBh",
    spotifyEmbed: "https://open.spotify.com/embed/album/2BbXUxTS9gDtB2ZXm6rXBh",
  },
  {
    slug: "lonely-yves-jones-remix",
    title: "Lonely (Yves Jones Remix)",
    artists: ["Rosie Charles", "Yves Jones"],
    type: "single",
    genre: ["Electronic", "Dance"],
    releaseDate: "2021-01-01",
    artwork: "https://i.scdn.co/image/ab67616d0000b2736bdf8731331188e490d7be26",
    description: "A dancefloor-ready remix of Rosie Charles' Lonely. Over 1.2 million streams on Spotify.",
    tracklist: [
      { title: "Lonely (Yves Jones Remix)", duration: "3:30" },
    ],
    credits: "Original by Rosie Charles. Remixed by Yves Jones.",
    spotifyUrl: "https://open.spotify.com/album/1Lv7ZuTWAmlQnK103iKHL4",
    spotifyEmbed: "https://open.spotify.com/embed/album/1Lv7ZuTWAmlQnK103iKHL4",
  },
  {
    slug: "trouble-on-the-dancefloor",
    title: "Trouble on the Dancefloor",
    type: "single",
    genre: ["Electronic", "Dance"],
    releaseDate: "2021-01-01",
    artwork: "https://i.scdn.co/image/ab67616d0000b273aa60f4e995a3db1189f25792",
    description: "High-energy electronic single built for the club.",
    tracklist: [
      { title: "Trouble on the Dancefloor", duration: "3:45" },
    ],
    credits: "Produced by Yves Jones.",
    spotifyUrl: "https://open.spotify.com/album/3d2bZS8Sb1d3Ak1RnlYOs",
    spotifyEmbed: "https://open.spotify.com/embed/album/3d2bZS8Sb1d3Ak1RnlYOs",
  },
];

export function getReleaseBySlug(slug: string): Release | undefined {
  return releases.find((r) => r.slug === slug);
}

export function getFeaturedRelease(): Release | undefined {
  return releases.find((r) => r.featured) || releases[0];
}

/** The catalogue newest-first, so array order doesn't have to be maintained by hand. */
export const releasesByDate: Release[] = [...releases].sort((a, b) =>
  b.releaseDate.localeCompare(a.releaseDate),
);

export const DEFAULT_ARTIST = "Yves Jones";

/** Billed artists for a release, defaulting to a solo Yves Jones credit. */
export function releaseArtists(release: Release): string[] {
  return release.artists ?? [DEFAULT_ARTIST];
}

/** The credit line as shown under a title, e.g. "Fieves, Yves Jones, Finnerz". */
export function releaseCredit(release: Release): string {
  return releaseArtists(release).join(", ");
}

export function isByArtist(release: Release, artist: string): boolean {
  return releaseArtists(release).includes(artist);
}

/** Every artist billed across the catalogue, ordered by release count. */
export function allReleaseArtists(): string[] {
  const counts = new Map<string, number>();
  for (const r of releases) {
    for (const a of releaseArtists(r)) {
      counts.set(a, (counts.get(a) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name]) => name);
}
