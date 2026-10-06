"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, ShoppingBag } from "lucide-react";
import { getReleaseBySlug, releaseCredit } from "@/data/releases";
import FadeIn from "@/components/FadeIn";

export default function ReleasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const release = getReleaseBySlug(slug);

  if (!release) {
    return (
      <section className="py-24 px-6 text-center">
        <h1 className="display display-lg">Release not found</h1>
        <Link href="/music" className="mono-label mt-6 inline-block hover:text-accent transition-colors">
          &larr; Back to Music
        </Link>
      </section>
    );
  }

  return (
    <section className="topo topo-fade py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <Link
            href="/music"
            className="mono-label inline-flex items-center gap-2 hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft size={18} /> Back to Discography
          </Link>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Artwork */}
          <FadeIn direction="left">
            <div className="aspect-square bg-surface-light rounded-2xl overflow-hidden relative sticky top-24">
              {release.artwork.startsWith("http") ? (
                <img
                  src={release.artwork}
                  alt={release.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-accent/15 flex items-center justify-center">
                  <span className="display display-md text-foreground/50">{release.title}</span>
                </div>
              )}
              <div className="absolute bottom-6 left-6 flex gap-2">
                {release.genre.map((g) => (
                  <span key={g} className="pill-sm bg-background/80 text-accent">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Details */}
          <FadeIn direction="right" delay={0.15}>
            <div>
              <span className="mono-eyebrow">{release.type}</span>
              <h1 className="display display-lg mt-3">
                {release.title}
              </h1>
              <p className="mono-readout mt-3">{releaseCredit(release)}</p>
              <p className="mono-label mt-3">
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
                    className="pill bg-[#1DB954] hover:bg-[#1DB954]/80 text-white"
                  >
                    <ExternalLink size={16} /> Spotify
                  </a>
                )}
                {release.appleMusicUrl && (
                  <a
                    href={release.appleMusicUrl}
                    className="pill bg-[#FC3C44] hover:bg-[#FC3C44]/80 text-white"
                  >
                    <ExternalLink size={16} /> Apple Music
                  </a>
                )}
                {release.soundcloudUrl && (
                  <a
                    href={release.soundcloudUrl}
                    className="pill bg-[#FF5500] hover:bg-[#FF5500]/80 text-white"
                  >
                    <ExternalLink size={16} /> SoundCloud
                  </a>
                )}
                {release.downloadable && release.price && (
                  <Link
                    href={`/store`}
                    className="pill pill-primary"
                  >
                    <ShoppingBag size={16} /> Buy &pound;{release.price.toFixed(2)}
                  </Link>
                )}
              </div>

              {/* Tracklist */}
              <div className="mt-12">
                <h3 className="mono-eyebrow mb-6">Tracklist</h3>
                <ol className="space-y-3">
                  {release.tracklist.map((track, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between py-3 hairline-b group"
                    >
                      <div className="flex items-center gap-4">
                        <span className="mono text-xs text-accent w-6">{String(i + 1).padStart(2, "0")}</span>
                        <div>
                          <span className="text-foreground group-hover:text-accent transition-colors">
                            {track.title}
                          </span>
                          {track.featuring && (
                            <span className="mono text-xs text-muted ml-2">ft. {track.featuring}</span>
                          )}
                        </div>
                      </div>
                      <span className="mono text-xs text-muted">{track.duration}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Credits */}
              <div className="mt-8">
                <h3 className="mono-eyebrow mb-3">Credits</h3>
                <p className="text-muted text-sm leading-relaxed">{release.credits}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
