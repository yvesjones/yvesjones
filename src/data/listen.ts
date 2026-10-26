import { spotifyArtistUrl, spotifyArtists } from "./spotify";

export interface ListenLink {
  artist: string;
  platform: string;
  url: string;
}

/**
 * Where to hear the music, behind the LISTEN row.
 *
 * Apple Music IDs were read from the public iTunes lookup API and checked
 * against this site's own release list, rather than guessed from a search.
 *
 * Note: Apple has the Fieves catalogue split across two artist pages. This
 * links the one carrying the recent singles; see the other at
 * music.apple.com/artist/fieves/1694366314, which holds Between Hello &
 * Goodbye and the 2024 singles.
 */
export const listenLinks: ListenLink[] = [
  {
    artist: "Yves Jones",
    platform: "Spotify",
    url: spotifyArtistUrl(spotifyArtists[0].id),
  },
  {
    artist: "Yves Jones",
    platform: "Apple Music",
    url: "https://music.apple.com/gb/artist/yves-jones/1456363376",
  },
  {
    artist: "Fieves",
    platform: "Spotify",
    url: spotifyArtistUrl(spotifyArtists[1].id),
  },
  {
    artist: "Fieves",
    platform: "Apple Music",
    url: "https://music.apple.com/gb/artist/fieves/1434477995",
  },
];

/**
 * The photography site. No domain yet — leave empty and the row shows as not
 * live rather than linking nowhere. Fill this in once it is deployed.
 */
export const PHOTOGRAPHY_URL = "";
