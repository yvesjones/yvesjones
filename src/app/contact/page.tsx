"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Send, Instagram, Twitter, Youtube, Music } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import PageHero from "@/components/PageHero";

const socials = [
  { name: "Instagram", icon: Instagram, url: "#" },
  { name: "Twitter / X", icon: Twitter, url: "#" },
  { name: "YouTube", icon: Youtube, url: "#" },
  { name: "SoundCloud", icon: Music, url: "#" },
];

function ContactForm() {
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState(searchParams.get("type") || "general");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, type, subject, message }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <>
  {status === "success" ? (
        <FadeIn>
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send size={24} className="text-accent" />
            </div>
            <h3 className="display display-md">Message sent!</h3>
            <p className="text-muted mt-2">We&apos;ll get back to you as soon as possible.</p>
          </div>
        </FadeIn>
      ) : (
        <FadeIn>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="mono-label block mb-3">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mono bg-surface hairline border rounded-xl px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                  placeholder="Your name"
                  disabled={status === "loading"}
                />
              </div>
              <div>
                <label htmlFor="email" className="mono-label block mb-3">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mono bg-surface hairline border rounded-xl px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                  placeholder="your@email.com"
                  disabled={status === "loading"}
                />
              </div>
            </div>

            <div>
              <label htmlFor="type" className="mono-label block mb-3">Enquiry Type</label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full mono bg-surface hairline border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent transition-colors"
                disabled={status === "loading"}
              >
                <option value="booking">Booking Enquiry</option>
                <option value="press">Press / Media</option>
                <option value="collaboration">Collaboration</option>
                <option value="general">General</option>
              </select>
            </div>

            <div>
              <label htmlFor="subject" className="mono-label block mb-3">Subject</label>
              <input
                id="subject"
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full mono bg-surface hairline border rounded-xl px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                placeholder="What's this about?"
                disabled={status === "loading"}
              />
            </div>

            <div>
              <label htmlFor="message" className="mono-label block mb-3">Message</label>
              <textarea
                id="message"
                rows={6}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full mono bg-surface hairline border rounded-xl px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors resize-none"
                placeholder="Your message..."
                disabled={status === "loading"}
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-red-400">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="pill pill-primary disabled:opacity-50"
            >
              <Send size={18} />
              {status === "loading" ? "Sending…" : "Send Message"}
            </button>
          </form>
        </FadeIn>
      )}

      {/* Social links */}
      <FadeIn delay={0.2}>
        <div className="mt-16 pt-12 hairline-t">
          <h3 className="display display-sm mb-6 text-center">Or find Yves on socials</h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
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
    </>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        index="07"
        label="CONTACT"
        title="Contact"
        subtitle="Booking enquiries, press requests, and general messages."
        readout={["RESPONSE: WITHIN 48H", "CHANNEL: OPEN"]}
      />

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* useSearchParams() needs a Suspense boundary to prerender. */}
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
