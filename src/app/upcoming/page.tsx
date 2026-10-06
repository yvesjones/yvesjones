"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, ExternalLink } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import PageHero from "@/components/PageHero";
import SubscribeForm from "@/components/SubscribeForm";

interface UpcomingRelease {
  title: string;
  type: string;
  estimatedDate: string;
  description: string;
  preSaveUrl?: string;
}

const upcomingReleases: UpcomingRelease[] = [
  {
    title: "Frequency II",
    type: "Album",
    estimatedDate: "2026-06-15",
    description: "The follow-up to Midnight Frequency. Darker, heavier, and more experimental. Featuring collaborations with artists from across the electronic and rap spectrum.",
    preSaveUrl: "#",
  },
  {
    title: "Club Weapon 001",
    type: "Single",
    estimatedDate: "2026-04-01",
    description: "A standalone club track designed for the dance floor. Peak-time energy, rolling basslines, and a vocal hook that won't leave your head.",
    preSaveUrl: "#",
  },
];

function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calc() {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    }
    setTimeLeft(calc());
    const interval = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-4 mt-6">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="text-center">
          <div className="display display-lg text-accent tabular-nums">
            {String(value).padStart(2, "0")}
          </div>
          <div className="mono-label mt-2">{label}</div>
        </div>
      ))}
    </div>
  );
}

function NotifyButton() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "upcoming" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
        return;
      }
      setStatus("success");
      setMessage("You'll be notified!");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <span className="flex items-center gap-2 text-green-400 text-sm font-medium px-6 py-3">
        <Bell size={16} /> {message}
      </span>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => {
          setOpen(true);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
        className="pill pill-secondary hover:border-accent"
      >
        <Bell size={16} /> Notify Me
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mono bg-surface hairline border rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
        required
        disabled={status === "loading"}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="pill-sm bg-accent hover:bg-accent/80 text-white disabled:opacity-50"
      >
        <Bell size={16} /> {status === "loading" ? "…" : "Notify"}
      </button>
      {status === "error" && (
        <span className="text-red-400 text-xs">{message}</span>
      )}
    </form>
  );
}

export default function UpcomingPage() {
  return (
    <>
      <PageHero
        index="03"
        label="UPCOMING"
        title="Upcoming"
        subtitle="New music on the way. Stay locked in."
        readout={["STATUS: UNRELEASED", "WINDOW: 2026"]}
      />

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-16">
            {upcomingReleases.map((release, i) => (
              <FadeIn key={release.title} delay={i * 0.15}>
                <div className="bg-surface rounded-2xl p-8 md:p-12 hairline border relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="relative">
                    <span className="mono-eyebrow">
                      {release.type}
                    </span>
                    <h3 className="display display-lg mt-2">
                      {release.title}
                    </h3>
                    <p className="mono-label mt-3">
                      Expected{" "}
                      {new Date(release.estimatedDate).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "long",
                      })}
                    </p>

                    <Countdown targetDate={release.estimatedDate} />

                    <p className="mt-8 text-muted leading-relaxed max-w-2xl">
                      {release.description}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                      {release.preSaveUrl && (
                        <a
                          href={release.preSaveUrl}
                          className="pill pill-primary"
                        >
                          <ExternalLink size={16} /> Pre-Save
                        </a>
                      )}
                      <NotifyButton />
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Email signup */}
          <FadeIn delay={0.3}>
            <div className="mt-16 text-center">
              <h3 className="display display-md">Get notified when it drops</h3>
              <p className="text-muted mt-2">Join the mailing list for early access and exclusives.</p>
              <SubscribeForm source="upcoming" />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
