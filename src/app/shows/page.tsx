import { getUpcomingShows, getPastShows } from "@/data/shows";
import FadeIn from "@/components/FadeIn";
import PageHero from "@/components/PageHero";
import ShowsList from "@/components/ShowsList";

export const dynamic = "force-dynamic";

export default async function ShowsPage() {
  const [upcoming, past] = await Promise.all([getUpcomingShows(), getPastShows()]);

  return (
    <>
      <PageHero
        index="04"
        label="SHOWS"
        title="Shows"
        subtitle="Catch Yves Jones live."
        readout={["TERRITORY: UK / EU", "SIGNAL: LIVE"]}
      />

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <ShowsList upcoming={upcoming} past={past} />

          <FadeIn delay={0.3}>
            <div className="mt-16 text-center bg-surface rounded-2xl hairline border p-8">
              <h3 className="display display-sm">Want to book Yves Jones?</h3>
              <p className="text-muted mt-2">For booking enquiries, get in touch.</p>
              <a
                href="/contact?type=booking"
                className="pill pill-primary mt-6"
              >
                Contact for Booking
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
