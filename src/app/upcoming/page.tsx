"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, ExternalLink } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
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
          <div className="font-heading text-3xl md:text-4xl font-bold text-accent tabular-nums">
            {String(value).padStart(2, "0")}
          </div>
          <div className="text-xs text-muted uppercase tracking-wider mt-1">{label}</div>
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
        className="flex items-center gap-2 border border-border hover:border-accent text-foreground px-6 py-3 rounded-full text-sm font-medium transition-colors"
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
        className="bg-surface border border-border rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
        required
        disabled={status === "loading"}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="flex items-center gap-2 bg-accent hover:bg-accent/80 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors disabled:opacity-50"
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
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="Upcoming"
          subtitle="New music on the way. Stay locked in."
        />

        <div className="space-y-16">
          {upcomingReleases.map((release, i) => (
            <FadeIn key={release.title} delay={i * 0.15}>
              <div className="bg-surface rounded-2xl p-8 md:p-12 border border-border relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <span className="text-accent text-sm uppercase tracking-wider">
                    {release.type}
                  </span>
                  <h3 className="font-heading text-3xl md:text-4xl font-bold mt-2">
                    {release.title}
                  </h3>
                  <p className="text-muted mt-1">
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
                        className="flex items-center gap-2 bg-accent hover:bg-accent/80 text-white px-6 py-3 rounded-full text-sm font-medium transition-colors"
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
            <h3 className="font-heading text-2xl font-bold">Get notified when it drops</h3>
            <p className="text-muted mt-2">Join the mailing list for early access and exclusives.</p>
            <SubscribeForm source="upcoming" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
