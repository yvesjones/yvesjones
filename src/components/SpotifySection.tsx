"use client";

import FadeIn from "@/components/FadeIn";

const SPOTIFY_ARTIST_ID = "0YfOOQQVAb8lsVWvsd0NU3";

export default function SpotifySection() {
  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-3xl mx-auto text-center">
        <FadeIn>
          <p className="text-accent text-sm uppercase tracking-[0.2em] mb-8">
            Listen on Spotify
          </p>
          <iframe
            style={{ borderRadius: "12px" }}
            src={`https://open.spotify.com/embed/artist/${SPOTIFY_ARTIST_ID}?utm_source=generator&theme=0`}
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Player"
          />
          <a
            href={`https://open.spotify.com/artist/${SPOTIFY_ARTIST_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-muted hover:text-accent transition-colors text-sm"
          >
            Open full profile on Spotify &rarr;
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
