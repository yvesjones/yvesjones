"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  /** Section index shown top-left, e.g. "02". */
  index?: string;
  /** Short slug shown next to the index, e.g. "MUSIC". */
  label: string;
  /** The display title. Pass an array to force line breaks. */
  title: string | string[];
  /** Supporting line, set in mono beneath the title. */
  subtitle?: string;
  /** Technical readout lines shown top-right, hero-style. */
  readout?: string[];
}

export default function PageHero({
  index,
  label,
  title,
  subtitle,
  readout,
}: PageHeroProps) {
  const lines = Array.isArray(title) ? title : [title];

  return (
    <section className="topo topo-fade hairline-b relative px-6 pt-20 pb-16 md:pt-28 md:pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Instrument panel: label left, readout right */}
        <div className="flex items-start justify-between gap-6 mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mono-label flex items-center gap-3"
          >
            {index && <span className="text-accent">{index}</span>}
            <span className="hidden sm:block w-8 h-px bg-[var(--halide-hairline)]" />
            <span>YJ_{label}</span>
          </motion.div>

          {readout && readout.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mono-readout text-right leading-relaxed"
            >
              {readout.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Display title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="display display-xl display-knockout"
        >
          {lines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mono mt-8 text-sm text-muted max-w-xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
