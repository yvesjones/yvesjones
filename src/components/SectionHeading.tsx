import FadeIn from "./FadeIn";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <FadeIn className="mb-12">
      <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-muted text-lg">{subtitle}</p>
      )}
    </FadeIn>
  );
}
