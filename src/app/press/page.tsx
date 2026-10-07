"use client";

import { Download, Copy, Check, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import FadeIn from "@/components/FadeIn";
import PageHero from "@/components/PageHero";
import { shortBio } from "@/data/bio";
import { defaultStats, statFields, type PressStats } from "@/data/stats";

/** Real press shots, served from /public/press. */
const pressShots = [
  { src: "/press/press-1.jpg", label: "Live", aspect: "landscape" },
  { src: "/press/press-2.jpg", label: "Portrait", aspect: "portrait" },
  { src: "/press/press-3.jpg", label: "Portrait", aspect: "landscape" },
  { src: "/press/press-4.jpg", label: "Portrait", aspect: "portrait" },
  { src: "/press/press-5.jpg", label: "Portrait", aspect: "portrait" },
  { src: "/press/press-6.jpg", label: "Fieves", aspect: "landscape" },
  { src: "/press/press-7.jpg", label: "Film", aspect: "landscape" },
  { src: "/press/press-8.jpg", label: "Portrait", aspect: "portrait" },
  { src: "/press/press-9.jpg", label: "Live", aspect: "landscape" },
];

/**
 * Press coverage, each verified by reading the article. Entries carrying a
 * `credit` cover a track Yves produced but do not name him in the piece — the
 * credit line is shown so the connection is stated rather than implied.
 */
const pressCoverage = [
  {
    title: "Antony Szmierek Releases New Single \u2018Rafters\u2019",
    publication: "Clash",
    date: "July 2024",
    credit: "Produced by Yves Jones",
    url: "https://www.clashmusic.com/news/antony-szmierek-releases-new-single-rafters/",
  },
  {
    title: "Antony Szmierek has dropped his new single \u2018Rafters\u2019 ahead of sets at Truck and Latitude",
    publication: "Dork",
    date: "July 2024",
    credit: "Produced by Yves Jones",
    url: "https://readdork.com/news/antony-szmierek-rafters-single",
  },
  {
    title: "Rising Manchester-Duo Fieves Share Highly Anticipated Debut EP \u201CBetween Hello & Goodbye\u201D",
    publication: "Mixtape Madness",
    date: "March 2024",
    url: "https://www.mixtapemadness.com/blog/music/rising-manchester-duo-fieves-share-highly-anticipated-debut-ep-between-hello-goodbye",
  },
  {
    title: "FIEVES * 2001",
    publication: "Slanky",
    date: "December 2023",
    url: "https://www.slanky.co.uk/one-for-the-future-you-choose/fieves-2001",
  },
  {
    title: "Million Faces (feat. Nyah Grace, Finnerz, Yves Jones)",
    publication: "Stereofox",
    date: "September 2023",
    url: "https://www.stereofox.com/fieves-million-faces-feat-nyah-grace-ft-finnerz-yves-jones-nyah-grace/",
  },
  {
    title: "Fieves \u2014 Loss Is Loss (Single)",
    publication: "Wordplay Magazine",
    date: "June 2023",
    url: "https://www.wordplaymagazine.com/blog-1/2023/6/20/fieves-loss-is-loss-single",
  },
  {
    title: "Fast Rising Manchester Duo Fieves Unveil Brand New Single \u2018Loss is Loss\u2019",
    publication: "Mixtape Madness",
    date: "June 2023",
    url: "https://www.mixtapemadness.com/blog/news/fast-rising-manchester-duo-fieves-unveil-brand-new-single-loss-is-loss",
  },
  {
    title: "Cigarette Stories",
    publication: "The Pit",
    date: "February 2022",
    url: "https://www.thepitldn.com/pitnews/tag/Fieves",
  },
];

export default function PressPage() {
  const [copied, setCopied] = useState(false);
  // Starts from the bundled figures so the panel is never blank, then takes
  // whatever the admin dashboard has saved.
  const [stats, setStats] = useState<PressStats>(defaultStats);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setStats(data);
      })
      .catch(() => {
        /* bundled defaults already rendered */
      });
  }, []);

  function copyBio() {
    navigator.clipboard.writeText(shortBio);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <PageHero
        index="06"
        label="PRESS"
        title="Press"
        subtitle="Press shots, media kit, and coverage."
        readout={["ASSETS: HI-RES / 300DPI", "USE: EDITORIAL"]}
      />

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Download Press Kit */}
          <FadeIn>
            <div className="bg-surface rounded-2xl hairline border p-8 mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="display display-sm">Download Press Kit</h3>
                <p className="text-muted text-sm mt-1">
                  Includes bio, high-res press shots, logos, and tech rider. ZIP format.
                </p>
              </div>
              <button className="pill pill-primary shrink-0">
                <Download size={18} /> Download Press Kit
              </button>
            </div>
          </FadeIn>

          {/* Press Shots Gallery */}
          <FadeIn delay={0.1}>
            <h3 className="display display-md mb-6">Press Shots</h3>
            {/* Columns rather than a grid: the shots mix portrait and
                landscape, and masonry keeps them at their true aspect ratio
                without cropping or ragged rows. */}
            <div className="columns-2 md:columns-3 gap-4 mb-16 [column-fill:_balance]">
              {pressShots.map((photo) => (
                <div
                  key={photo.src}
                  className="mb-4 break-inside-avoid bg-surface-light rounded-xl overflow-hidden relative group"
                >
                  <img
                    src={photo.src}
                    alt={`Yves Jones press shot — ${photo.label.toLowerCase()}`}
                    loading="lazy"
                    className="w-full h-auto block"
                  />
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a
                      href={photo.src}
                      download
                      className="pill-sm bg-foreground text-background"
                    >
                      <Download size={14} /> Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Bio & Stats */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-surface rounded-2xl hairline border p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="display display-sm">Short Bio</h3>
                  <button
                    onClick={copyBio}
                    className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="text-muted text-sm leading-relaxed">{shortBio}</p>
              </div>
              <div className="bg-surface rounded-2xl hairline border p-8">
                <h3 className="display display-sm mb-6">Key Stats</h3>
                <div className="grid grid-cols-2 gap-6">
                  {statFields.map((field) => (
                    <div key={field.key}>
                      <div className="display display-md text-accent">
                        {stats[field.key]}
                      </div>
                      <div className="text-sm text-muted mt-1">{field.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Press Coverage */}
          <FadeIn delay={0.3}>
            <h3 className="display display-md mb-6">Press Coverage</h3>
            <div className="space-y-4">
              {pressCoverage.map((article, i) => (
                <a
                  key={i}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 bg-surface rounded-xl hairline border p-6 hover:border-accent/50 transition-colors group"
                >
                  <div>
                    <p className="display display-sm display-case group-hover:text-accent transition-colors">{article.title}</p>
                    <p className="mono-label mt-2">
                      {article.publication} &middot; {article.date}
                    </p>
                    {article.credit && (
                      <p className="mono-readout mt-2">{article.credit}</p>
                    )}
                  </div>
                  <ExternalLink size={18} className="text-muted group-hover:text-accent transition-colors shrink-0" />
                </a>
              ))}
            </div>
          </FadeIn>

          {/* Press Contact */}
          <FadeIn delay={0.4}>
            <div className="mt-16 text-center">
              <h3 className="display display-sm">Press Enquiries</h3>
              <p className="text-muted mt-2">
                For interviews, features, and media requests, please get in touch.
              </p>
              <a
                href="/contact"
                className="pill pill-primary mt-6"
              >
                Contact
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
