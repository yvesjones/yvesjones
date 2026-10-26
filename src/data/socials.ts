import { spotifyArtistUrl, spotifyArtists } from "./spotify";

export interface SocialLink {
  label: string;
  /** Shown under the label — the handle, or what sits behind the link. */
  detail: string;
  /** Empty means "not set up yet"; those entries are skipped, never shipped broken. */
  url: string;
}

/**
 * Links behind the SOCIALS row on the bio page.
 *
 * Only the Spotify entries are filled in, because they are the only accounts
 * recorded anywhere in this project. Add a URL to any other entry and it
 * appears; leave it empty and it stays hidden.
 */
export const socials: SocialLink[] = [
  {
    label: "Spotify",
    detail: "Yves Jones",
    url: spotifyArtistUrl(spotifyArtists[0].id),
  },
  {
    label: "Spotify",
    detail: "Fieves",
    url: spotifyArtistUrl(spotifyArtists[1].id),
  },
  { label: "Instagram", detail: "", url: "" },
  { label: "TikTok", detail: "", url: "" },
  { label: "YouTube", detail: "", url: "" },
  { label: "SoundCloud", detail: "", url: "" },
  { label: "Apple Music", detail: "", url: "" },
];

export const activeSocials = socials.filter((s) => s.url !== "");
