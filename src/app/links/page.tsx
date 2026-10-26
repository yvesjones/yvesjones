import type { Metadata } from "next";

import Ipod from "@/components/ipod/Ipod";
import type { MenuEntry } from "@/components/ipod/Screen";
import { listenLinks, PHOTOGRAPHY_URL } from "@/data/listen";
import { activeSocials } from "@/data/socials";
import { getPlayerTracks } from "@/lib/itunes";

export const metadata: Metadata = {
  title: "Yves Jones",
  description: "Listen, photography, merch and socials.",
  // A bio link, not a page to rank — it should never outrank the home page.
  robots: { index: false, follow: true },
};

/** Apple's clips are stable; no reason to re-fetch them per visit. */
export const revalidate = 86_400;

export default async function LinksPage() {
  const tracks = await getPlayerTracks();

  const menu: MenuEntry[] = [
    { label: "Player", marker: "note", action: "player" },
    {
      label: "Listen",
      marker: "chevron",
      action: "submenu",
      children: listenLinks.map((link) => ({
        label: `${link.platform} · ${link.artist}`,
        marker: "chevron",
        action: "link" as const,
        href: link.url,
        external: true,
      })),
    },
    PHOTOGRAPHY_URL
      ? {
          label: "Look and Listen",
          // The marker names what is behind the row, since the label alone
          // does not say "photography".
          marker: "Photography",
          action: "link",
          href: PHOTOGRAPHY_URL,
          external: true,
        }
      : { label: "Look and Listen", marker: "Soon", action: "none" },
    {
      label: "Socials",
      marker: "chevron",
      action: "submenu",
      children: activeSocials.map((social) => ({
        label: `${social.label} · ${social.detail}`,
        marker: "chevron",
        action: "link" as const,
        href: social.url,
        external: true,
      })),
    },
  ];

  return (
    <main className="ipod-page flex min-h-screen items-center justify-center p-4">
      <Ipod name="Yves Jones" menu={menu} tracks={tracks} />
    </main>
  );
}
