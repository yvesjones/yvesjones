"use client";

import { useState } from "react";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import type { Show } from "@/data/shows";
import FadeIn from "@/components/FadeIn";

function generateCalendarUrl(venue: string, city: string, date: string) {
  const start = date.replace(/-/g, "") + "T200000";
  const end = date.replace(/-/g, "") + "T230000";
  const title = encodeURIComponent(`Yves Jones @ ${venue}`);
  const location = encodeURIComponent(`${venue}, ${city}`);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&location=${location}`;
}

export default function ShowsList({
  upcoming,
  past,
}: {
  upcoming: Show[];
  past: Show[];
}) {
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");
  const shows = filter === "upcoming" ? upcoming : past;

  return (
    <>
      <FadeIn delay={0.1}>
        <div className="flex gap-3 mb-12">
          <button
            onClick={() => setFilter("upcoming")}
            className={`pill-sm ${
              filter === "upcoming"
                ? "bg-accent text-white"
                : "bg-surface text-muted hover:text-foreground hairline border"
            }`}
          >
            Upcoming ({upcoming.length})
          </button>
          <button
            onClick={() => setFilter("past")}
            className={`pill-sm ${
              filter === "past"
                ? "bg-accent text-white"
                : "bg-surface text-muted hover:text-foreground hairline border"
            }`}
          >
            Past ({past.length})
          </button>
        </div>
      </FadeIn>

      <div className="space-y-4">
        {shows.map((show, i) => (
          <FadeIn key={show.id} delay={i * 0.08}>
            <div className="bg-surface rounded-xl hairline border p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-accent/50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                <div className="shrink-0 text-center md:text-left">
                  <div className="display display-md text-accent">
                    {new Date(show.date).toLocaleDateString("en-GB", { day: "numeric" })}
                  </div>
                  <div className="mono-label mt-1">
                    {new Date(show.date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                  </div>
                </div>
                <div>
                  <h3 className="display display-sm">{show.venue}</h3>
                  <p className="mono-label flex items-center gap-1 mt-2">
                    <MapPin size={14} /> {show.city}, {show.country}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {show.ticketPrice && (
                  <span className="mono-label">{show.ticketPrice}</span>
                )}
                {show.isSoldOut ? (
                  <span className="mono-label !text-accent-pink px-4 py-2">Sold out</span>
                ) : show.ticketUrl ? (
                  <>
                    <a
                      href={show.ticketUrl}
                      className="pill-sm bg-accent hover:bg-accent/80 text-white"
                    >
                      <ExternalLink size={14} /> Tickets
                    </a>
                    <a
                      href={generateCalendarUrl(show.venue, show.city, show.date)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pill-sm hairline border hover:border-foreground text-foreground"
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
        <p className="mono-label text-center py-12">No shows to display.</p>
      )}
    </>
  );
}
