"use client";

import { useState } from "react";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { getUpcomingShows, getPastShows } from "@/data/shows";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";

function generateCalendarUrl(venue: string, city: string, date: string) {
  const start = date.replace(/-/g, "") + "T200000";
  const end = date.replace(/-/g, "") + "T230000";
  const title = encodeURIComponent(`Yves Jones @ ${venue}`);
  const location = encodeURIComponent(`${venue}, ${city}`);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&location=${location}`;
}

export default function ShowsPage() {
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");
  const upcoming = getUpcomingShows();
  const past = getPastShows();
  const shows = filter === "upcoming" ? upcoming : past;

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="Shows"
          subtitle="Catch Yves Jones live."
        />

        {/* Filter */}
        <FadeIn delay={0.1}>
          <div className="flex gap-3 mb-12">
            <button
              onClick={() => setFilter("upcoming")}
              className={`px-6 py-2 rounded-full text-sm transition-colors ${
                filter === "upcoming"
                  ? "bg-accent text-white"
                  : "bg-surface text-muted hover:text-foreground border border-border"
              }`}
            >
              Upcoming ({upcoming.length})
            </button>
            <button
              onClick={() => setFilter("past")}
              className={`px-6 py-2 rounded-full text-sm transition-colors ${
                filter === "past"
                  ? "bg-accent text-white"
                  : "bg-surface text-muted hover:text-foreground border border-border"
              }`}
            >
              Past ({past.length})
            </button>
          </div>
        </FadeIn>

        {/* Show list */}
        <div className="space-y-4">
          {shows.map((show, i) => (
            <FadeIn key={show.id} delay={i * 0.08}>
              <div className="bg-surface rounded-xl border border-border p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-accent/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                  {/* Date */}
                  <div className="shrink-0 text-center md:text-left">
                    <div className="font-heading text-2xl font-bold text-accent">
                      {new Date(show.date).toLocaleDateString("en-GB", { day: "numeric" })}
                    </div>
                    <div className="text-sm text-muted uppercase">
                      {new Date(show.date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                    </div>
                  </div>

                  {/* Venue info */}
                  <div>
                    <h3 className="font-heading text-xl font-bold">{show.venue}</h3>
                    <p className="text-muted text-sm flex items-center gap-1 mt-1">
                      <MapPin size={14} /> {show.city}, {show.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {show.ticketPrice && (
                    <span className="text-sm text-muted">{show.ticketPrice}</span>
                  )}
                  {show.isSoldOut ? (
                    <span className="text-sm text-accent-pink font-medium px-4 py-2">SOLD OUT</span>
                  ) : show.ticketUrl ? (
                    <>
                      <a
                        href={show.ticketUrl}
                        className="flex items-center gap-2 bg-accent hover:bg-accent/80 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors"
                      >
                        <ExternalLink size={14} /> Tickets
                      </a>
                      <a
                        href={generateCalendarUrl(show.venue, show.city, show.date)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 border border-border hover:border-foreground text-foreground px-4 py-2 rounded-full text-sm transition-colors"
                      >
                        <Calendar size={14} />
                      </a>
                    </>
                  ) : null}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {shows.length === 0 && (
          <p className="text-center text-muted py-12">No shows to display.</p>
        )}

        {/* Booking CTA */}
        <FadeIn delay={0.3}>
          <div className="mt-16 text-center bg-surface rounded-2xl border border-border p-8">
            <h3 className="font-heading text-xl font-bold">Want to book Yves Jones?</h3>
            <p className="text-muted mt-2">For booking enquiries, get in touch.</p>
            <a
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 bg-accent hover:bg-accent/80 text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              Contact for Booking
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
