"use client";

import { useState } from "react";

interface ShowFormData {
  date: string;
  venue: string;
  city: string;
  country: string;
  ticketPrice: string;
  ticketUrl: string;
  isSoldOut: boolean;
  isPast: boolean;
}

interface ShowFormProps {
  initialData?: ShowFormData;
  onSubmit: (data: ShowFormData) => Promise<void>;
  loading: boolean;
}

const emptyForm: ShowFormData = {
  date: "",
  venue: "",
  city: "",
  country: "",
  ticketPrice: "",
  ticketUrl: "",
  isSoldOut: false,
  isPast: false,
};

export default function ShowForm({ initialData, onSubmit, loading }: ShowFormProps) {
  const [form, setForm] = useState<ShowFormData>(initialData || emptyForm);

  function update(field: keyof ShowFormData, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit(form);
  }

  const inputClass =
    "w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
      <div>
        <label className="block text-sm text-muted mb-2">Date</label>
        <input
          type="date"
          value={form.date}
          onChange={(e) => update("date", e.target.value)}
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm text-muted mb-2">Venue</label>
        <input
          type="text"
          value={form.venue}
          onChange={(e) => update("venue", e.target.value)}
          required
          placeholder="e.g. Fabric"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-muted mb-2">City</label>
          <input
            type="text"
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            required
            placeholder="e.g. London"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm text-muted mb-2">Country</label>
          <input
            type="text"
            value={form.country}
            onChange={(e) => update("country", e.target.value)}
            required
            placeholder="e.g. UK"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-muted mb-2">Ticket Price</label>
          <input
            type="text"
            value={form.ticketPrice}
            onChange={(e) => update("ticketPrice", e.target.value)}
            placeholder="e.g. £15"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm text-muted mb-2">Ticket URL</label>
          <input
            type="text"
            value={form.ticketUrl}
            onChange={(e) => update("ticketUrl", e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-muted cursor-pointer">
          <input
            type="checkbox"
            checked={form.isSoldOut}
            onChange={(e) => update("isSoldOut", e.target.checked)}
            className="accent-accent"
          />
          Sold Out
        </label>
        <label className="flex items-center gap-2 text-sm text-muted cursor-pointer">
          <input
            type="checkbox"
            checked={form.isPast}
            onChange={(e) => update("isPast", e.target.checked)}
            className="accent-accent"
          />
          Past Show
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-accent hover:bg-accent/80 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-medium transition-colors"
      >
        {loading ? "Saving..." : "Save Show"}
      </button>
    </form>
  );
}
