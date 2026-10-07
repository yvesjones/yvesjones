"use client";

import { useState } from "react";
import { Instagram, Twitter, Youtube, Music, Copy, Check } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import PageHero from "@/components/PageHero";
import { bioParagraphs, shortBio } from "@/data/bio";

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
    <>
      <PageHero
        index="02"
        label="ABOUT"
        title="About"
        subtitle="The story so far."
        readout={["ORIGIN: MANCHESTER", "1/2 OF FIEVES"]}
      />

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Long-form bio */}
          <FadeIn>
            <div className="prose prose-invert max-w-none">
              {bioParagraphs.map((para, i) => (
                <p
                  key={i}
                  className={`text-lg text-muted leading-relaxed ${i > 0 ? "mt-6" : ""}`}
                >
                  {para}
                </p>
              ))}
            </div>
          </FadeIn>

          {/* Short bio for press */}
          <FadeIn delay={0.1}>
            <div className="mt-16 bg-surface rounded-2xl p-8 hairline border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="display display-sm">Short Bio (Press)</h3>
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

          {/* Social Links */}
          <FadeIn delay={0.2}>
            <div className="mt-16">
              <h3 className="display display-md mb-6">Connect</h3>
              <div className="flex flex-wrap gap-4">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    className="pill bg-surface hairline border hover:border-accent group"
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
    </>
  );
}
