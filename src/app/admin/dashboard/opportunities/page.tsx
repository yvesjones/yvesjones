"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import {
  Plus,
  Trash2,
  Loader2,
  ExternalLink,
  RefreshCw,
} from "lucide-react";

interface Source {
  id: string;
  url: string;
  label: string;
  created_at: string;
}

interface Opportunity {
  id: string;
  source_id: string | null;
  title: string;
  category: string;
  description: string | null;
  deadline: string | null;
  link: string | null;
  raw_source_url: string | null;
  scraped_at: string;
  scrape_sources: { label: string } | null;
}

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "festival", label: "Festivals" },
  { key: "grant", label: "Grants" },
  { key: "radio", label: "Radio" },
  { key: "new_music", label: "New Music" },
] as const;

const CATEGORY_COLORS: Record<string, string> = {
  festival: "bg-purple-500/20 text-purple-300",
  grant: "bg-emerald-500/20 text-emerald-300",
  radio: "bg-cyan-500/20 text-cyan-300",
  new_music: "bg-pink-500/20 text-pink-300",
};

const inputClass =
  "w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors";

export default function OpportunitiesPage() {
  const [sources, setSources] = useState<Source[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showSources, setShowSources] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [addingSource, setAddingSource] = useState(false);
  const [scraping, setScraping] = useState(false);
  const [scrapeResult, setScrapeResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function getHeaders(): Promise<Record<string, string>> {
    const token = (await supabaseBrowser.auth.getSession()).data.session
      ?.access_token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async function fetchSources() {
    const headers = await getHeaders();
    const res = await fetch("/api/opportunities/sources", { headers });
    if (res.ok) setSources(await res.json());
  }

  async function fetchOpportunities() {
    const headers = await getHeaders();
    const url =
      activeCategory === "all"
        ? "/api/opportunities"
        : `/api/opportunities?category=${activeCategory}`;
    const res = await fetch(url, { headers });
    if (res.ok) setOpportunities(await res.json());
  }

  useEffect(() => {
    async function load() {
      setLoading(true);
      await Promise.all([fetchSources(), fetchOpportunities()]);
      setLoading(false);
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchOpportunities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  async function handleAddSource(e: React.FormEvent) {
    e.preventDefault();
    if (!newUrl || !newLabel) return;
    setAddingSource(true);
    const headers = {
      ...(await getHeaders()),
      "Content-Type": "application/json",
    };
    const res = await fetch("/api/opportunities/sources", {
      method: "POST",
      headers,
      body: JSON.stringify({ url: newUrl, label: newLabel }),
    });
    if (res.ok) {
      setNewUrl("");
      setNewLabel("");
      await fetchSources();
    }
    setAddingSource(false);
  }

  async function handleDeleteSource(id: string) {
    const headers = await getHeaders();
    await fetch(`/api/opportunities/sources/${id}`, {
      method: "DELETE",
      headers,
    });
    await Promise.all([fetchSources(), fetchOpportunities()]);
  }

  async function handleScrapeAll() {
    setScraping(true);
    setScrapeResult(null);
    const headers = {
      ...(await getHeaders()),
      "Content-Type": "application/json",
    };
    const res = await fetch("/api/opportunities/scrape", {
      method: "POST",
      headers,
      body: JSON.stringify({}),
    });
    if (res.ok) {
      const data = await res.json();
      setScrapeResult(
        `Scraped ${data.scraped} source(s), found ${data.opportunities} opportunity(ies)`,
      );
      await fetchOpportunities();
    } else {
      setScrapeResult("Scrape failed. Check your sources and try again.");
    }
    setScraping(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-muted" size={24} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold mb-8">Opportunities</h1>

      {/* Sources Management */}
      <div className="bg-surface rounded-2xl border border-border mb-8">
        <button
          onClick={() => setShowSources(!showSources)}
          className="w-full flex items-center justify-between p-6 text-left"
        >
          <h2 className="font-heading text-lg font-bold">Manage Sources</h2>
          <span className="text-muted text-sm">
            {sources.length} source(s) &middot;{" "}
            {showSources ? "Hide" : "Show"}
          </span>
        </button>

        {showSources && (
          <div className="px-6 pb-6 space-y-4 border-t border-border pt-4">
            {/* Source List */}
            {sources.length > 0 ? (
              <ul className="space-y-2">
                {sources.map((s) => (
                  <li
                    key={s.id}
                    className="flex items-center justify-between bg-background rounded-xl px-4 py-3"
                  >
                    <div className="min-w-0 flex-1 mr-4">
                      <p className="text-sm font-medium truncate">{s.label}</p>
                      <p className="text-xs text-muted truncate">{s.url}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteSource(s.id)}
                      className="text-muted hover:text-red-400 transition-colors shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted">
                No sources yet. Add a URL below to get started.
              </p>
            )}

            {/* Add Source Form */}
            <form
              onSubmit={handleAddSource}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="url"
                placeholder="https://example.com/opportunities"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                required
                className={inputClass + " sm:flex-1"}
              />
              <input
                type="text"
                placeholder="Label"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                required
                className={inputClass + " sm:w-48"}
              />
              <button
                type="submit"
                disabled={addingSource}
                className="flex items-center justify-center gap-2 bg-accent text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-accent/80 transition-colors disabled:opacity-50 shrink-0"
              >
                {addingSource ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Plus size={16} />
                )}
                Add Source
              </button>
            </form>

            {/* Scrape All */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleScrapeAll}
                disabled={scraping || sources.length === 0}
                className="flex items-center gap-2 bg-surface-light border border-border text-foreground px-5 py-3 rounded-xl text-sm font-medium hover:bg-border/30 transition-colors disabled:opacity-50"
              >
                {scraping ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <RefreshCw size={16} />
                )}
                Scrape All
              </button>
              {scrapeResult && (
                <p className="text-sm text-muted">{scrapeResult}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeCategory === cat.key
                ? "bg-accent text-white"
                : "bg-surface border border-border text-muted hover:text-foreground"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Opportunities List */}
      {opportunities.length === 0 ? (
        <div className="bg-surface rounded-2xl border border-border p-12 text-center">
          <p className="text-muted">
            No opportunities yet. Add sources and click &ldquo;Scrape
            All&rdquo; to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {opportunities.map((opp) => (
            <div
              key={opp.id}
              className="bg-surface rounded-2xl border border-border p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-heading font-bold text-base">
                      {opp.title}
                    </h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${CATEGORY_COLORS[opp.category] || "bg-muted/20 text-muted"}`}
                    >
                      {opp.category.replace("_", " ")}
                    </span>
                  </div>
                  {opp.description && (
                    <p className="text-sm text-muted mb-3 line-clamp-2">
                      {opp.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-muted flex-wrap">
                    {opp.deadline && <span>Deadline: {opp.deadline}</span>}
                    {opp.scrape_sources?.label && (
                      <span>Source: {opp.scrape_sources.label}</span>
                    )}
                  </div>
                </div>
                {opp.link && (
                  <a
                    href={opp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent/80 transition-colors shrink-0"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
