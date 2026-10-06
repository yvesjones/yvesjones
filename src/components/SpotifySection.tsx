"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { getFeaturedRelease } from "@/data/releases";
import {
  activeSpotifyArtists,
  spotifyArtistUrl,
  spotifyEmbedUrl,
} from "@/data/spotify";

// If the embed shell hasn't loaded by now, assume it's unreachable.
const LOAD_TIMEOUT_MS = 8000;

type Status = "loading" | "loaded" | "failed";

export default function SpotifySection() {
  const [selected, setSelected] = useState(0);
  const [status, setStatus] = useState<Status>("loading");
  // Bumping this re-mounts the iframe and re-runs the probe on retry.
  const [attempt, setAttempt] = useState(0);
  const featured = getFeaturedRelease();

  const artist = activeSpotifyArtists[selected];

  useEffect(() => {
    if (!artist) return;
    let active = true;

    // Layer 1: if the iframe never fires onLoad, it's blocked/unreachable.
    const timer = setTimeout(() => {
      if (active) setStatus((s) => (s === "loaded" ? s : "failed"));
    }, LOAD_TIMEOUT_MS);

    // Layer 2: a server probe can read inside the cross-origin embed and
    // catch Spotify's own "Upstream request timeout" that the browser can't.
    const controller = new AbortController();
    fetch(`/api/spotify/health?id=${artist.id}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data: { ok: boolean }) => {
        if (active && data?.ok === false) setStatus("failed");
      })
      .catch(() => {
        /* probe is best-effort; iframe onLoad/timeout still govern */
      });

    return () => {
      active = false;
      clearTimeout(timer);
      controller.abort();
    };
  }, [artist, attempt]);

  const handleLoad = useCallback(() => {
    setStatus((s) => (s === "failed" ? s : "loaded"));
  }, []);

  const retry = useCallback(() => {
    setStatus("loading");
    setAttempt((n) => n + 1);
  }, []);

  if (!artist) return null;

  const artistUrl = spotifyArtistUrl(artist.id);

  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-3xl mx-auto text-center">
        <FadeIn>
          <p className="mono-eyebrow mb-8">Listen on Spotify</p>

          {/* Only worth a toggle once there's more than one profile. */}
          {activeSpotifyArtists.length > 1 && (
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {activeSpotifyArtists.map((a, i) => (
                <button
                  // Index: the list is static, and this can't collide if two
                  // entries are ever given the same id by mistake.
                  key={i}
                  onClick={() => {
                    setSelected(i);
                    setStatus("loading");
                  }}
                  aria-pressed={i === selected}
                  className={`pill-sm ${
                    i === selected
                      ? "bg-accent text-white"
                      : "bg-surface-light text-muted hover:text-foreground hairline border"
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          )}

          {status === "failed" ? (
            <SpotifyFallback
              artwork={featured?.artwork}
              title={featured?.title}
              artistUrl={artistUrl}
              onRetry={retry}
            />
          ) : (
            <div className="relative" style={{ minHeight: 352 }}>
              {status === "loading" && <SpotifySkeleton />}
              <iframe
                // Re-mount on artist switch and on retry.
                key={`${artist.id}-${attempt}`}
                style={{ borderRadius: "12px" }}
                src={spotifyEmbedUrl(artist.id)}
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={`${artist.label} on Spotify`}
                onLoad={handleLoad}
                className={`transition-opacity duration-500 ${
                  status === "loaded" ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          )}

          <a
            href={artistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-label mt-6 inline-block hover:text-accent transition-colors"
          >
            Open {artist.label} on Spotify &rarr;
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

function SpotifySkeleton() {
  return (
    <div
      className="absolute inset-0 rounded-xl bg-surface-light motion-safe:animate-pulse"
      style={{ height: 352 }}
      aria-hidden
    />
  );
}

function SpotifyFallback({
  artwork,
  title,
  artistUrl,
  onRetry,
}: {
  artwork?: string;
  title?: string;
  artistUrl: string;
  onRetry: () => void;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-5 rounded-xl hairline border bg-surface-light px-6 py-10"
      style={{ minHeight: 352 }}
    >
      {artwork && (
        <Image
          src={artwork}
          alt={title ? `${title} cover art` : "Album cover art"}
          width={140}
          height={140}
          className="rounded-lg shadow-lg"
        />
      )}
      <p className="mono text-xs text-muted max-w-sm leading-relaxed">
        The Spotify player couldn&apos;t load right now. You can still listen
        on Spotify directly.
      </p>
      <div className="flex items-center gap-4">
        <a
          href={artistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pill pill-primary"
        >
          Listen on Spotify
        </a>
        <button
          type="button"
          onClick={onRetry}
          className="mono-label hover:text-accent transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
