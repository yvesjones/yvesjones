"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Calendar, ShoppingBag } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { getFeaturedRelease } from "@/data/releases";
import { getUpcomingShows } from "@/data/shows";

export default function Home() {
  const featured = getFeaturedRelease();
  const nextShow = getUpcomingShows()[0];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-accent)_0%,_transparent_50%)] opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-accent text-sm uppercase tracking-[0.3em] mb-6">
              Hip-Hop / Rap & Electronic Dance
            </p>
            <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none">
              YVES
              <br />
              <span className="neon-glow">JONES</span>
            </h1>
            <p className="mt-8 text-muted text-lg md:text-xl max-w-xl mx-auto">
              Producer. Performer. Pushing the boundaries between underground rap and electronic dance music.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/music"
              className="flex items-center gap-2 bg-accent hover:bg-accent/80 text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              <Play size={18} /> Listen Now
            </Link>
            <Link
              href="/store"
              className="flex items-center gap-2 border border-border hover:border-foreground text-foreground px-8 py-3 rounded-full font-medium transition-colors"
            >
              <ShoppingBag size={18} /> Buy Mixtapes
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-5 h-8 border-2 border-muted rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-muted rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Featured Release */}
      {featured && (
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <p className="text-accent text-sm uppercase tracking-[0.2em] mb-4">Latest Release</p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <FadeIn direction="left">
                <div className="aspect-square bg-surface-light rounded-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
                  <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                    <span className="font-heading text-2xl text-foreground/60">{featured.title}</span>
                  </div>
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
                <h3 className="font-heading text-4xl md:text-5xl font-bold">{featured.title}</h3>
                <p className="mt-2 text-muted text-sm">
                  {featured.type.toUpperCase()} &middot; {new Date(featured.releaseDate).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
                </p>
                <p className="mt-6 text-muted leading-relaxed">{featured.description}</p>
                <div className="mt-4 text-sm text-muted">
                  {featured.tracklist.length} tracks
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

      {/* Next Show */}
      {nextShow && (
        <section className="py-24 px-6 bg-surface">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <p className="text-accent text-sm uppercase tracking-[0.2em] mb-4">Next Show</p>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h3 className="font-heading text-4xl md:text-5xl font-bold">{nextShow.venue}</h3>
                  <p className="mt-2 text-muted text-lg">
                    {nextShow.city}, {nextShow.country} &middot;{" "}
                    {new Date(nextShow.date).toLocaleDateString("en-GB", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  {nextShow.ticketPrice && (
                    <p className="mt-1 text-accent font-medium">{nextShow.ticketPrice}</p>
                  )}
                </div>
                <div className="flex gap-4">
                  {nextShow.ticketUrl && (
                    <a
                      href={nextShow.ticketUrl}
                      className="flex items-center gap-2 bg-accent hover:bg-accent/80 text-white px-6 py-3 rounded-full font-medium transition-colors"
                    >
                      <Calendar size={18} /> Get Tickets
                    </a>
                  )}
                  <Link
                    href="/shows"
                    className="flex items-center gap-2 border border-border hover:border-foreground text-foreground px-6 py-3 rounded-full font-medium transition-colors"
                  >
                    All Shows <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Mailing List CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h3 className="font-heading text-3xl md:text-4xl font-bold">
              Stay in the loop
            </h3>
            <p className="mt-4 text-muted">
              Get notified about new releases, shows, and exclusive drops.
            </p>
            <form
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-surface border border-border rounded-full px-6 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-accent hover:bg-accent/80 text-white px-8 py-3 rounded-full font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
