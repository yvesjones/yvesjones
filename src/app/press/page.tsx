"use client";

import { Download, Copy, Check, ExternalLink } from "lucide-react";
import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";

const pressShots = [
  { id: 1, label: "Studio Portrait", aspect: "portrait" },
  { id: 2, label: "Live Performance", aspect: "landscape" },
  { id: 3, label: "Press Headshot", aspect: "square" },
  { id: 4, label: "Festival Stage", aspect: "landscape" },
  { id: 5, label: "Studio Session", aspect: "portrait" },
  { id: 6, label: "Promo Shot", aspect: "square" },
];

const shortBio =
  "Yves Jones is a London-based Hip-Hop/Rap and Electronic Dance artist known for fusing raw, street-level energy with futuristic dance production. With releases spanning UK Drill, Trap, House, and Drum & Bass, Yves has performed at venues across the UK and Europe including Fabric, Printworks, and Berghain.";

const stats = [
  { label: "Monthly Listeners", value: "50K+" },
  { label: "Total Streams", value: "2M+" },
  { label: "Social Following", value: "25K+" },
  { label: "Live Shows", value: "80+" },
];

const pressCoverage = [
  { title: "\"The Genre-Bending Sound of Yves Jones\"", publication: "MIXMAG", url: "#" },
  { title: "\"10 UK Artists to Watch in 2026\"", publication: "DJ MAG", url: "#" },
  { title: "\"Midnight Frequency Review: 8/10\"", publication: "CLASH", url: "#" },
];

export default function PressPage() {
  const [copied, setCopied] = useState(false);

  function copyBio() {
    navigator.clipboard.writeText(shortBio);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Press"
          subtitle="Press shots, media kit, and coverage."
        />

        {/* Download Press Kit */}
        <FadeIn>
          <div className="bg-surface rounded-2xl border border-border p-8 mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="font-heading text-xl font-bold">Download Press Kit</h3>
              <p className="text-muted text-sm mt-1">
                Includes bio, high-res press shots, logos, and tech rider. ZIP format.
              </p>
            </div>
            <button className="flex items-center gap-2 bg-accent hover:bg-accent/80 text-white px-8 py-3 rounded-full font-medium transition-colors shrink-0">
              <Download size={18} /> Download Press Kit
            </button>
          </div>
        </FadeIn>

        {/* Press Shots Gallery */}
        <FadeIn delay={0.1}>
          <h3 className="font-heading text-2xl font-bold mb-6">Press Shots</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
            {pressShots.map((photo) => (
              <div
                key={photo.id}
                className={`bg-surface-light rounded-xl overflow-hidden relative group cursor-pointer ${
                  photo.aspect === "portrait" ? "row-span-2" : ""
                }`}
              >
                <div className={`${photo.aspect === "portrait" ? "aspect-[3/4]" : photo.aspect === "landscape" ? "aspect-video" : "aspect-square"} bg-accent/10 flex items-center justify-center`}>
                  <span className="text-sm text-foreground/40">{photo.label}</span>
                </div>
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-full text-sm font-medium">
                    <Download size={14} /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Bio & Stats */}
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-surface rounded-2xl border border-border p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-lg font-bold">Short Bio</h3>
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
            <div className="bg-surface rounded-2xl border border-border p-8">
              <h3 className="font-heading text-lg font-bold mb-6">Key Stats</h3>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-heading text-2xl font-bold text-accent">{stat.value}</div>
                    <div className="text-sm text-muted mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Press Coverage */}
        <FadeIn delay={0.3}>
          <h3 className="font-heading text-2xl font-bold mb-6">Press Coverage</h3>
          <div className="space-y-4">
            {pressCoverage.map((article, i) => (
              <a
                key={i}
                href={article.url}
                className="flex items-center justify-between bg-surface rounded-xl border border-border p-6 hover:border-accent/50 transition-colors group"
              >
                <div>
                  <p className="font-medium group-hover:text-accent transition-colors">{article.title}</p>
                  <p className="text-sm text-muted mt-1">{article.publication}</p>
                </div>
                <ExternalLink size={18} className="text-muted group-hover:text-accent transition-colors shrink-0" />
              </a>
            ))}
          </div>
        </FadeIn>

        {/* Press Contact */}
        <FadeIn delay={0.4}>
          <div className="mt-16 text-center">
            <h3 className="font-heading text-xl font-bold">Press Enquiries</h3>
            <p className="text-muted mt-2">
              For interviews, features, and media requests, please get in touch.
            </p>
            <a
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 bg-accent hover:bg-accent/80 text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              Contact
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
