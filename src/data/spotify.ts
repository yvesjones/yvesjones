export interface SpotifyArtist {
  /** Spotify artist ID — the 22-char code at the end of the artist share link. */
  id: string;
  /** Label shown on the toggle, in the mono voice. */
  label: string;
}

/**
 * Artist profiles featured in the home page's Spotify section.
 *
 * To add a profile, grab its ID from Spotify: artist page → ⋯ → Share →
 * "Copy link to artist", then take the code after /artist/ in
 * https://open.spotify.com/artist/<ID>?si=…
 *
 * Entries with an empty id are skipped, so a half-filled entry never ships a
 * broken embed.
 */
export const spotifyArtists: SpotifyArtist[] = [
  {
    id: "0YfOOQQVAb8lsVWvsd0NU3",
    label: "Yves Jones",
  },
  {
    id: "5pWx1CwTis3b2tzsAbQExK",
    label: "Fieves",
  },
];

/** Only artists with an ID are renderable. */
export const activeSpotifyArtists = spotifyArtists.filter((a) => a.id !== "");

export function isKnownSpotifyArtist(id: string): boolean {
  return activeSpotifyArtists.some((a) => a.id === id);
}

export function spotifyArtistUrl(id: string): string {
  return `https://open.spotify.com/artist/${id}`;
}

export function spotifyEmbedUrl(id: string): string {
  return `https://open.spotify.com/embed/artist/${id}?utm_source=generator&theme=0`;
}
