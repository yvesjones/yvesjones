import { NextResponse } from "next/server";
import {
  activeSpotifyArtists,
  isKnownSpotifyArtist,
  spotifyEmbedUrl,
} from "@/data/spotify";

const REVALIDATE_S = 120;
const TIMEOUT_MS = 6000;
const MAX_ATTEMPTS = 3;

/**
 * Server-side health probe for a Spotify artist embed.
 *
 * The browser can't read inside the cross-origin embed iframe, so it can't tell
 * whether Spotify rendered the player or its own "Upstream request timeout"
 * error. A server fetch can read the body, so we probe here and let the client
 * fall back gracefully when the embed is unhealthy.
 *
 * Takes ?id=<artistId>, restricted to the artists we actually feature so this
 * can't be used to fetch arbitrary URLs. Defaults to the first artist.
 */
export async function GET(request: Request) {
  const requested = new URL(request.url).searchParams.get("id");
  const artistId = requested ?? activeSpotifyArtists[0]?.id;

  if (!artistId || !isKnownSpotifyArtist(artistId)) {
    return NextResponse.json(
      { ok: false, name: null, error: "unknown_artist" },
      { status: 400 },
    );
  }

  const embedUrl = spotifyEmbedUrl(artistId);

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const res = await fetch(embedUrl, {
        signal: controller.signal,
        headers: {
          // Some Spotify edges behave better with a real UA.
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        },
        next: { revalidate: REVALIDATE_S },
      });

      if (!res.ok) {
        continue;
      }

      const html = await res.text();
      const timedOut = html.includes("Upstream request timeout");
      const hasArtistData =
        html.includes("audioPreview") || html.includes("__NEXT_DATA__");

      if (!timedOut && hasArtistData) {
        const name = html.match(/"name":"([^"]+)"/)?.[1] ?? null;
        return NextResponse.json({ ok: true, name });
      }
    } catch {
      // Timed out or network error — fall through to retry.
    } finally {
      clearTimeout(timer);
    }
  }

  return NextResponse.json({ ok: false, name: null }, { status: 200 });
}
