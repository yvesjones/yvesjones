"use client";

import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import SpotifySection from "@/components/SpotifySection";
import SubscribeForm from "@/components/SubscribeForm";
import HalideLanding from "@/components/ui/demo";
import { getFeaturedRelease, releaseCredit } from "@/data/releases";
import type { Show } from "@/data/shows";

export default function HomeContent({ nextShow }: { nextShow: Show | null }) {
  const featured = getFeaturedRelease();

  return (
    <>
      {/* Hero Section */}
      <HalideLanding />

      <SpotifySection />

      {featured && (
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <p className="mono-eyebrow mb-4">Latest Release</p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <FadeIn direction="left">
                <div className="aspect-square bg-surface-light rounded-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
                  {featured.artwork.startsWith("http") ? (
                    <img
                      src={featured.artwork}
                      alt={featured.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                      <span className="display display-md text-foreground/60">{featured.title}</span>
                    </div>
                  )}
                  <div className="absolute bottom-6 left-6 z-20">
                    <div className="flex gap-2">
                      {featured.genre.map((g) => (
                        <span key={g} className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full">
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
              <FadeIn direction="right" delay={0.2}>
                <h3 className="display display-lg">{featured.title}</h3>
                <p className="mono-readout mt-3">{releaseCredit(featured)}</p>
                <p className="mono-label mt-2">
                  {featured.type.toUpperCase()} &middot; {new Date(featured.releaseDate).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
                </p>
                <p className="mt-6 text-muted leading-relaxed">{featured.description}</p>
                <div className="mt-4 text-sm text-muted">
                  {featured.tracklist.length}{" "}
                  {featured.tracklist.length === 1 ? "track" : "tracks"}
                </div>
                <Link
                  href={`/music/${featured.slug}`}
                  className="mt-8 inline-flex items-center gap-2 text-accent hover:text-accent-cyan transition-colors font-medium"
                >
                  View Release <ArrowRight size={18} />
                </Link>
              </FadeIn>
            </div>
          </div>
        </section>
      )}

      {nextShow && (
        <section className="py-24 px-6 bg-surface">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <p className="mono-eyebrow mb-4">Next Show</p>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h3 className="display display-lg">{nextShow.venue}</h3>
                  <p className="mono-label mt-3">
                    {nextShow.city}, {nextShow.country} &middot;{" "}
                    {new Date(nextShow.date).toLocaleDateString("en-GB", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  {nextShow.ticketPrice && (
                    <p className="mono-readout mt-2">{nextShow.ticketPrice}</p>
                  )}
                </div>
                <div className="flex gap-4">
                  {nextShow.ticketUrl && (
                    <a
                      href={nextShow.ticketUrl}
                      className="pill pill-primary"
                    >
                      <Calendar size={18} /> Get Tickets
                    </a>
                  )}
                  <Link
                    href="/shows"
                    className="pill pill-secondary"
                  >
                    All Shows <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h3 className="display display-lg">
              Stay in the loop
            </h3>
            <p className="mt-4 text-muted">
              Get notified about new releases, shows, and exclusive drops.
            </p>
            <SubscribeForm source="homepage" />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
