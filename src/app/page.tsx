import { getUpcomingShows } from "@/data/shows";
import { getPlayerTracks } from "@/lib/itunes";
import HomeContent from "@/components/HomeContent";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [upcoming, tracks] = await Promise.all([
    getUpcomingShows(),
    getPlayerTracks(),
  ]);
  const nextShow = upcoming.length > 0 ? upcoming[0] : null;

  return <HomeContent nextShow={nextShow} tracks={tracks} />;
}
