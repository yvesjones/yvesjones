"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, ShoppingBag } from "lucide-react";
import { getReleaseBySlug } from "@/data/releases";
import FadeIn from "@/components/FadeIn";

export default function ReleasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const release = getReleaseBySlug(slug);

  if (!release) {
    return (
      <section className="py-24 px-6 text-center">
        <h1 className="font-heading text-4xl font-bold">Release not found</h1>
        <Link href="/music" className="mt-4 inline-block text-accent hover:underline">
          Back to Music
        </Link>
      </section>
    );
  }

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <Link
            href="/music"
            className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={18} /> Back to Discography
          </Link>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Artwork */}
          <FadeIn direction="left">
            <div className="aspect-square bg-surface-light rounded-2xl overflow-hidden relative sticky top-24">
              <div className="absolute inset-0 bg-accent/15 flex items-center justify-center">
                <span className="font-heading text-3xl text-foreground/50">{release.title}</span>
              </div>
              <div className="absolute bottom-6 left-6 flex gap-2">
                {release.genre.map((g) => (
                  <span key={g} className="text-xs bg-background/80 text-accent px-3 py-1 rounded-full">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Details */}
          <FadeIn direction="right" delay={0.15}>
            <div>
              <span className="text-accent text-sm uppercase tracking-wider">
                {release.type}
              </span>
              <h1 className="font-heading text-4xl md:text-5xl font-bold mt-2">
                {release.title}
              </h1>
              <p className="text-muted mt-2">
                Released{" "}
                {new Date(release.releaseDate).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <p className="mt-6 text-muted leading-relaxed">{release.description}</p>

              {/* Action buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                {release.spotifyUrl && (
                  <a
                    href={release.spotifyUrl}
                    className="flex items-center gap-2 bg-[#1DB954] hover:bg-[#1DB954]/80 text-white px-6 py-3 rounded-full text-sm font-medium transition-colors"
                  >
                    <ExternalLink size={16} /> Spotify
                  </a>
                )}
                {release.appleMusicUrl && (
                  <a
                    href={release.appleMusicUrl}
                    className="flex items-center gap-2 bg-[#FC3C44] hover:bg-[#FC3C44]/80 text-white px-6 py-3 rounded-full text-sm font-medium transition-colors"
                  >
                    <ExternalLink size={16} /> Apple Music
                  </a>
                )}
                {release.soundcloudUrl && (
                  <a
                    href={release.soundcloudUrl}
                    className="flex items-center gap-2 bg-[#FF5500] hover:bg-[#FF5500]/80 text-white px-6 py-3 rounded-full text-sm font-medium transition-colors"
                  >
                    <ExternalLink size={16} /> SoundCloud
                  </a>
                )}
                {release.downloadable && release.price && (
                  <Link
                    href={`/store`}
                    className="flex items-center gap-2 bg-accent hover:bg-accent/80 text-white px-6 py-3 rounded-full text-sm font-medium transition-colors"
                  >
                    <ShoppingBag size={16} /> Buy &pound;{release.price.toFixed(2)}
                  </Link>
                )}
              </div>

              {/* Tracklist */}
              <div className="mt-12">
                <h3 className="font-heading text-lg font-bold mb-4">Tracklist</h3>
                <ol className="space-y-3">
                  {release.tracklist.map((track, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between py-3 border-b border-border group"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted w-6">{String(i + 1).padStart(2, "0")}</span>
                        <div>
                          <span className="text-foreground group-hover:text-accent transition-colors">
                            {track.title}
                          </span>
                          {track.featuring && (
                            <span className="text-muted text-sm ml-2">ft. {track.featuring}</span>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-muted">{track.duration}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Credits */}
              <div className="mt-8">
                <h3 className="font-heading text-lg font-bold mb-2">Credits</h3>
                <p className="text-muted text-sm leading-relaxed">{release.credits}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
