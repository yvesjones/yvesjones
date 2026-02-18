"use client";

import { ShoppingBag, Download, Mail } from "lucide-react";
import { products } from "@/data/store";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";

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
                      <button
                        onClick={(e) => e.preventDefault()}
                        className="w-full flex items-center justify-center gap-2 bg-accent-cyan hover:bg-accent-cyan/80 text-white py-3 rounded-full font-medium transition-colors"
                      >
                        {product.price === 0 ? (
                          <>
                            <Mail size={18} /> Free Download with Email
                          </>
                        ) : (
                          <>
                            <Download size={18} /> Download
                          </>
                        )}
                      </button>
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
