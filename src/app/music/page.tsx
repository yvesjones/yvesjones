"use client";

import { useState } from "react";
import Link from "next/link";
import {
  releases,
  releasesByDate,
  releaseCredit,
  releaseArtists,
  isByArtist,
  allReleaseArtists,
  DEFAULT_ARTIST,
} from "@/data/releases";
import FadeIn from "@/components/FadeIn";
import PageHero from "@/components/PageHero";

const allGenres = Array.from(new Set(releases.flatMap((r) => r.genre)));
const allTypes = Array.from(new Set(releases.map((r) => r.type)));
// Only artists with more than a single credit are worth a filter pill.
const allArtists = allReleaseArtists().filter(
  (a) => releases.filter((r) => isByArtist(r, a)).length > 1,
);

export default function MusicPage() {
  const [genreFilter, setGenreFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [artistFilter, setArtistFilter] = useState<string | null>(null);

  const filtered = releasesByDate.filter((r) => {
    if (artistFilter && !isByArtist(r, artistFilter)) return false;
    if (genreFilter && !r.genre.includes(genreFilter)) return false;
    if (typeFilter && r.type !== typeFilter) return false;
    return true;
  });

  return (
    <>
      <PageHero
        index="01"
        label="MUSIC"
        title="Discography"
        subtitle="Stream, explore, and buy music from the catalogue."
        readout={["CATALOGUE: FULL ARCHIVE", "FORMAT: 24BIT / 48KHZ"]}
      />

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap items-center gap-3 mb-12">
              {allArtists.map((a) => (
                <button
                  key={a}
                  onClick={() => setArtistFilter(artistFilter === a ? null : a)}
                  className={`pill-sm ${
                    artistFilter === a
                      ? "bg-accent text-white"
                      : "bg-surface text-muted hover:text-foreground hairline border"
                  }`}
                >
                  {a}
                </button>
              ))}

              <span
                aria-hidden
                className="w-px h-6 bg-[var(--halide-hairline)] mx-1"
              />

              <button
                onClick={() => { setGenreFilter(null); setTypeFilter(null); setArtistFilter(null); }}
                className={`pill-sm ${
                  !genreFilter && !typeFilter && !artistFilter
                    ? "bg-accent text-white"
                    : "bg-surface text-muted hover:text-foreground hairline border"
                }`}
              >
                All
              </button>
              {allTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => { setTypeFilter(typeFilter === t ? null : t); setGenreFilter(null); }}
                  className={`pill-sm ${
                    typeFilter === t
                      ? "bg-accent text-white"
                      : "bg-surface text-muted hover:text-foreground hairline border"
                  }`}
                >
                  {t}
                </button>
              ))}
              {allGenres.map((g) => (
                <button
                  key={g}
                  onClick={() => { setGenreFilter(genreFilter === g ? null : g); setTypeFilter(null); }}
                  className={`pill-sm ${
                    genreFilter === g
                      ? "bg-accent-cyan text-white"
                      : "bg-surface text-muted hover:text-foreground hairline border"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((release, i) => (
              <FadeIn key={release.slug} delay={i * 0.1}>
                <Link href={`/music/${release.slug}`} className="group block">
                  <div className="aspect-square bg-surface-light rounded-xl overflow-hidden relative">
                    {release.artwork.startsWith("http") ? (
                      <img
                        src={release.artwork}
                        alt={release.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-accent/10 group-hover:bg-accent/20 transition-colors flex items-center justify-center">
                        <span className="display display-sm text-foreground/50 group-hover:text-foreground/80 transition-colors">
                          {release.title}
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      {release.genre.map((g) => (
                        <span key={g} className="pill-sm bg-background/80 text-accent">
                          {g}
                        </span>
                      ))}
                    </div>
                    {release.downloadable && (
                      <div className="absolute top-4 right-4">
                        <span className="pill-sm bg-accent-pink/90 text-white">
                          Buy
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <h3 className="display display-sm group-hover:text-accent transition-colors">
                      {release.title}
                    </h3>
                    {releaseArtists(release)[0] !== DEFAULT_ARTIST && (
                      <p className="mono-readout mt-2">{releaseCredit(release)}</p>
                    )}
                    <p className="mono-label mt-2">
                      {release.type.toUpperCase()} &middot;{" "}
                      {new Date(release.releaseDate).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "short",
                      })}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mono-label text-center py-12">No releases match your filters.</p>
          )}
        </div>
      </section>
    </>
  );
}
