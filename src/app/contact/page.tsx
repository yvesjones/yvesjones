"use client";

import { useState } from "react";
import { Send, Instagram, Twitter, Youtube, Music } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";

const socials = [
  { name: "Instagram", icon: Instagram, url: "#" },
  { name: "Twitter / X", icon: Twitter, url: "#" },
  { name: "YouTube", icon: Youtube, url: "#" },
  { name: "SoundCloud", icon: Music, url: "#" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          title="Contact"
          subtitle="Booking enquiries, press requests, and general messages."
        />

        {submitted ? (
          <FadeIn>
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send size={24} className="text-accent" />
              </div>
              <h3 className="font-heading text-2xl font-bold">Message sent!</h3>
              <p className="text-muted mt-2">We&apos;ll get back to you as soon as possible.</p>
            </div>
          </FadeIn>
        ) : (
          <FadeIn>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm text-muted mb-2">Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-muted mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="type" className="block text-sm text-muted mb-2">Enquiry Type</label>
                <select
                  id="type"
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent transition-colors"
                >
                  <option value="booking">Booking Enquiry</option>
                  <option value="press">Press / Media</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="general">General</option>
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm text-muted mb-2">Subject</label>
                <input
                  id="subject"
                  type="text"
                  required
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-muted mb-2">Message</label>
                <textarea
                  id="message"
                  rows={6}
                  required
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 bg-accent hover:bg-accent/80 text-white px-8 py-3 rounded-full font-medium transition-colors"
              >
                <Send size={18} /> Send Message
              </button>
            </form>
          </FadeIn>
        )}

        {/* Social links */}
        <FadeIn delay={0.2}>
          <div className="mt-16 pt-12 border-t border-border">
            <h3 className="font-heading text-xl font-bold mb-6 text-center">Or find Yves on socials</h3>
            <div className="flex flex-wrap items-center justify-center gap-4">
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
