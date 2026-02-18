"use client";

import { useState } from "react";
import { Instagram, Twitter, Youtube, Music, Copy, Check } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";

const shortBio =
  "Yves Jones is a London-based Hip-Hop/Rap and Electronic Dance artist known for fusing raw, street-level energy with futuristic dance production. With releases spanning UK Drill, Trap, House, and Drum & Bass, Yves has performed at venues across the UK and Europe including Fabric, Printworks, and Berghain. His genre-defying sound has garnered attention from leading publications and playlist curators alike.";

const timeline = [
  { year: "2021", event: "First SoundCloud upload breaks 10K plays" },
  { year: "2022", event: "Debut EP 'First Light' released on all platforms" },
  { year: "2023", event: "First headline show at XOYO, London (sold out)" },
  { year: "2023", event: "Collaboration with MC Vex on 'Bassweight'" },
  { year: "2024", event: "'First Light' single surpasses 500K streams" },
  { year: "2024", event: "Festival appearances: Warehouse Project, Motion" },
  { year: "2025", event: "Debut album 'Midnight Frequency' drops to critical acclaim" },
  { year: "2025", event: "UK & Europe tour announced: Fabric, Berghain, Sub Club" },
];

const socials = [
  { name: "Instagram", icon: Instagram, url: "#" },
  { name: "Twitter / X", icon: Twitter, url: "#" },
  { name: "YouTube", icon: Youtube, url: "#" },
  { name: "SoundCloud", icon: Music, url: "#" },
];

export default function AboutPage() {
  const [copied, setCopied] = useState(false);

  function copyBio() {
    navigator.clipboard.writeText(shortBio);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="About" subtitle="The story so far." />

        {/* Long-form bio */}
        <FadeIn>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-muted leading-relaxed">
              Born and raised in South London, Yves Jones grew up between two worlds: the gritty, lyric-driven culture of UK rap and the pulsating energy of electronic dance music heard in the city&apos;s underground clubs. This duality would come to define his sound.
            </p>
            <p className="text-lg text-muted leading-relaxed mt-6">
              What started as bedroom productions on a cracked copy of FL Studio quickly evolved into a serious pursuit. By 2021, his early SoundCloud uploads were catching the attention of tastemakers, blending the 808-heavy knock of trap with the rolling basslines of drum &amp; bass and the four-to-the-floor pulse of house music.
            </p>

            {/* Pull quote */}
            <blockquote className="my-12 border-l-4 border-accent pl-6 py-2">
              <p className="text-2xl font-heading font-bold text-foreground italic">
                &ldquo;I don&apos;t see genres as walls. They&apos;re more like colours on a palette. The magic happens when you mix them.&rdquo;
              </p>
              <cite className="text-muted text-sm mt-2 block not-italic">— Yves Jones</cite>
            </blockquote>

            <p className="text-lg text-muted leading-relaxed">
              His debut album, &ldquo;Midnight Frequency,&rdquo; dropped in late 2025 to critical acclaim, weaving together 12 tracks that move from dark, introspective trap to euphoric, dancefloor-ready house. The album cemented his reputation as one of the UK&apos;s most exciting genre-bending artists.
            </p>
            <p className="text-lg text-muted leading-relaxed mt-6">
              Now a regular on the live circuit with headline shows at iconic venues like Fabric, Printworks, and XOYO, Yves brings the same genre-fluid energy to the stage — delivering sets that are part rap performance, part DJ set, and entirely his own.
            </p>
          </div>
        </FadeIn>

        {/* Short bio for press */}
        <FadeIn delay={0.1}>
          <div className="mt-16 bg-surface rounded-2xl p-8 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-lg font-bold">Short Bio (Press)</h3>
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
        </FadeIn>

        {/* Timeline */}
        <FadeIn delay={0.2}>
          <div className="mt-16">
            <h3 className="font-heading text-2xl font-bold mb-8">Timeline</h3>
            <div className="space-y-6">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className="shrink-0 w-16">
                    <span className="text-accent font-heading font-bold">{item.year}</span>
                  </div>
                  <div className="relative pl-6 border-l border-border group-hover:border-accent transition-colors">
                    <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-border group-hover:bg-accent transition-colors" />
                    <p className="text-muted group-hover:text-foreground transition-colors">
                      {item.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Social Links */}
        <FadeIn delay={0.3}>
          <div className="mt-16">
            <h3 className="font-heading text-2xl font-bold mb-6">Connect</h3>
            <div className="flex flex-wrap gap-4">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  className="flex items-center gap-3 bg-surface border border-border hover:border-accent rounded-full px-6 py-3 transition-colors group"
                >
                  <s.icon size={20} className="text-muted group-hover:text-accent transition-colors" />
                  <span className="text-sm text-muted group-hover:text-foreground transition-colors">
                    {s.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
