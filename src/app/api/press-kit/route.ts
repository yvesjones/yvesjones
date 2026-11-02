import JSZip from "jszip";
import { NextResponse } from "next/server";

import { bioParagraphs, shortBio } from "@/data/bio";

/** Press shots live in public/press. */
const SHOTS = Array.from({ length: 9 }, (_, i) => `press-${i + 1}.jpg`);

export const revalidate = 3600;

/**
 * Builds the press kit on request rather than shipping a committed archive,
 * so it can never fall out of step with the bio or the photographs.
 *
 * The images are fetched over HTTP from this same deployment rather than read
 * off disk: files in public/ are served from the CDN and are not reliably on
 * the filesystem of a serverless function.
 */
export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const zip = new JSZip();

  zip.file(
    "bio.txt",
    [
      "YVES JONES",
      "",
      "SHORT BIO",
      shortBio,
      "",
      "FULL BIO",
      ...bioParagraphs,
      "",
      `Generated ${new Date().toISOString().slice(0, 10)}`,
    ].join("\n\n"),
  );

  const shots = zip.folder("press-shots");
  const results = await Promise.all(
    SHOTS.map(async (name) => {
      try {
        const res = await fetch(`${origin}/press/${name}`);
        if (!res.ok) return null;
        shots?.file(name, await res.arrayBuffer());
        return name;
      } catch {
        return null;
      }
    }),
  );

  const included = results.filter(Boolean).length;
  if (included === 0) {
    return NextResponse.json(
      { error: "Press shots are unavailable." },
      { status: 503 },
    );
  }

  const body = await zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
    // Photographs are already compressed; a high level costs time for nothing.
    compressionOptions: { level: 3 },
  });

  return new NextResponse(new Uint8Array(body), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition":
        'attachment; filename="yves-jones-press-kit.zip"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
