import { getUpcomingShows, getPastShows } from "@/data/shows";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import ShowsList from "@/components/ShowsList";

export const dynamic = "force-dynamic";

export default async function ShowsPage() {
  const [upcoming, past] = await Promise.all([getUpcomingShows(), getPastShows()]);

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Shows" subtitle="Catch Yves Jones live." />

        <ShowsList upcoming={upcoming} past={past} />

        <FadeIn delay={0.3}>
          <div className="mt-16 text-center bg-surface rounded-2xl border border-border p-8">
            <h3 className="font-heading text-xl font-bold">Want to book Yves Jones?</h3>
            <p className="text-muted mt-2">For booking enquiries, get in touch.</p>
            <a
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 bg-accent hover:bg-accent/80 text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              Contact for Booking
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
