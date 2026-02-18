"use client";

import { useState } from "react";
import Link from "next/link";
import { releases } from "@/data/releases";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";

const allGenres = Array.from(new Set(releases.flatMap((r) => r.genre)));
const allTypes = Array.from(new Set(releases.map((r) => r.type)));

export default function MusicPage() {
  const [genreFilter, setGenreFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const filtered = releases.filter((r) => {
    if (genreFilter && !r.genre.includes(genreFilter)) return false;
    if (typeFilter && r.type !== typeFilter) return false;
    return true;
  });

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Discography"
          subtitle="Stream, explore, and buy music from the catalogue."
        />

        {/* Filters */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap gap-3 mb-12">
            <button
              onClick={() => { setGenreFilter(null); setTypeFilter(null); }}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                !genreFilter && !typeFilter
                  ? "bg-accent text-white"
                  : "bg-surface text-muted hover:text-foreground border border-border"
              }`}
            >
              All
            </button>
            {allTypes.map((t) => (
              <button
                key={t}
                onClick={() => { setTypeFilter(typeFilter === t ? null : t); setGenreFilter(null); }}
                className={`px-4 py-2 rounded-full text-sm capitalize transition-colors ${
                  typeFilter === t
                    ? "bg-accent text-white"
                    : "bg-surface text-muted hover:text-foreground border border-border"
                }`}
              >
                {t}
              </button>
            ))}
            {allGenres.map((g) => (
              <button
                key={g}
                onClick={() => { setGenreFilter(genreFilter === g ? null : g); setTypeFilter(null); }}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  genreFilter === g
                    ? "bg-accent-cyan text-white"
                    : "bg-surface text-muted hover:text-foreground border border-border"
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
                  <div className="absolute inset-0 bg-accent/10 group-hover:bg-accent/20 transition-colors flex items-center justify-center">
                    <span className="font-heading text-xl text-foreground/50 group-hover:text-foreground/80 transition-colors">
                      {release.title}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {release.genre.map((g) => (
                      <span key={g} className="text-xs bg-background/80 text-accent px-2 py-1 rounded-full">
                        {g}
                      </span>
                    ))}
                  </div>
                  {release.downloadable && (
                    <div className="absolute top-4 right-4">
                      <span className="text-xs bg-accent-pink/90 text-white px-2 py-1 rounded-full">
                        Buy
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="font-heading text-lg font-bold group-hover:text-accent transition-colors">
                    {release.title}
                  </h3>
                  <p className="text-sm text-muted mt-1">
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
          <p className="text-center text-muted py-12">No releases match your filters.</p>
        )}
      </div>
    </section>
  );
}
