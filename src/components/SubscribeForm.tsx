"use client";

import { useState } from "react";

interface SubscribeFormProps {
  source: "homepage" | "upcoming" | "free_download";
}

export default function SubscribeForm({ source }: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
        return;
      }

      setStatus("success");
      setMessage("You're in! We'll keep you posted.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <form
      className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status !== "idle" && status !== "loading") setStatus("idle");
        }}
        className="flex-1 bg-surface border border-border rounded-full px-6 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
        required
        disabled={status === "loading"}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-accent hover:bg-accent/80 text-white px-8 py-3 rounded-full font-medium transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "Subscribing…" : "Subscribe"}
      </button>
      {status === "success" && (
        <p className="sm:absolute sm:mt-14 text-sm text-green-400 w-full text-center">{message}</p>
      )}
      {status === "error" && (
        <p className="sm:absolute sm:mt-14 text-sm text-red-400 w-full text-center">{message}</p>
      )}
    </form>
  );
}
