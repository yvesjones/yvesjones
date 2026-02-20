"use client";

import { useState, useRef } from "react";
import { ShoppingBag, Download, Mail } from "lucide-react";
import { products } from "@/data/store";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";

function FreeDownloadButton() {
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
        body: JSON.stringify({ email, source: "free_download" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
        return;
      }
      setStatus("success");
      setMessage("Check your email for the download link!");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="w-full text-center">
        <p className="text-green-400 text-sm font-medium py-3">
          <Download size={16} className="inline mr-2" />
          {message}
        </p>
      </div>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => {
          setOpen(true);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
        className="w-full flex items-center justify-center gap-2 bg-accent-cyan hover:bg-accent-cyan/80 text-white py-3 rounded-full font-medium transition-colors"
      >
        <Mail size={18} /> Free Download with Email
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3">
      <input
        ref={inputRef}
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-surface border border-border rounded-full px-6 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors text-sm"
        required
        disabled={status === "loading"}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 bg-accent-cyan hover:bg-accent-cyan/80 text-white py-3 rounded-full font-medium transition-colors disabled:opacity-50"
      >
        <Download size={18} /> {status === "loading" ? "Submitting…" : "Get Free Download"}
      </button>
      {status === "error" && (
        <p className="text-red-400 text-xs text-center">{message}</p>
      )}
    </form>
  );
}

export default function StorePage() {
  async function handleBuy(productId: string) {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Store"
          subtitle="Exclusive mixtapes and downloads. Direct from the artist."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <FadeIn key={product.id} delay={i * 0.1}>
              <div className="bg-surface rounded-2xl border border-border overflow-hidden group hover:border-accent/50 transition-colors">
                {/* Artwork */}
                <div className="aspect-square bg-surface-light relative">
                  <div className="absolute inset-0 bg-accent/10 flex items-center justify-center">
                    <span className="font-heading text-xl text-foreground/50">{product.title}</span>
                  </div>
                  {product.price === 0 && (
                    <div className="absolute top-4 right-4">
                      <span className="text-xs bg-accent-cyan text-white px-3 py-1 rounded-full font-medium">
                        FREE
                      </span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold">{product.title}</h3>
                  <p className="text-muted text-sm mt-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Tracklist */}
                  <div className="mt-4">
                    <p className="text-xs text-muted uppercase tracking-wider mb-2">Tracklist</p>
                    <ol className="text-sm text-muted space-y-1">
                      {product.tracklist.map((track, j) => (
                        <li key={j} className="flex gap-2">
                          <span className="text-muted/50">{String(j + 1).padStart(2, "0")}</span>
                          {track}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm text-muted">
                    <span>{product.format}</span>
                  </div>

                  {/* Buy button */}
                  <div className="mt-6">
                    {product.price > 0 ? (
                      <button
                        onClick={() => handleBuy(product.id)}
                        className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/80 text-white py-3 rounded-full font-medium transition-colors"
                      >
                        <ShoppingBag size={18} />
                        Buy Now &mdash; &pound;{product.price.toFixed(2)}
                      </button>
                    ) : (
                      <FreeDownloadButton />
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
