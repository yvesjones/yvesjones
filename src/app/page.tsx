import { getUpcomingShows } from "@/data/shows";
import HomeContent from "@/components/HomeContent";

export const dynamic = "force-dynamic";

export default async function Home() {
  const upcoming = await getUpcomingShows();
  const nextShow = upcoming.length > 0 ? upcoming[0] : null;

  return <HomeContent nextShow={nextShow} />;
}
