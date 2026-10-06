import FadeIn from "./FadeIn";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  /** Monospace eyebrow above the title, e.g. "LATEST RELEASE". */
  eyebrow?: string;
}

export default function SectionHeading({ title, subtitle, eyebrow }: SectionHeadingProps) {
  return (
    <FadeIn className="mb-12">
      {eyebrow && <p className="mono-eyebrow mb-4">{eyebrow}</p>}
      <h2 className="display display-lg">{title}</h2>
      {subtitle && <p className="mono mt-4 text-sm text-muted">{subtitle}</p>}
    </FadeIn>
  );
}
