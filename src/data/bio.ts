/**
 * Single source of truth for the artist bio. The About and Press pages both
 * render this, so the long and short versions can't drift apart.
 */

export const bioParagraphs: string[] = [
  "Yves Jones is a Manchester-based multi-genre artist and 1/2 of Fieves, carving out his own space across alternative hip-hop, soul, electronic and experimental music. His work combines understated lyricism with textured, unconventional production, pulling from the rawness of UK rap as much as the more leftfield corners of contemporary music. Rather than chasing a defined sound, Yves uses each release to explore a different side of his artistry, building a catalogue that feels personal, eclectic and distinctly his own.",
  "Alongside his own work, Yves has established himself as a producer and songwriter, including producing Antony Szmierek’s hit single “Rafters”. His music and production work have received major national radio support including BBC Radio 1 and BBC Radio 6 Music, and his work has accumulated over 10 million streams across all platforms. With a growing catalogue and a strong independent audience, Yves continues to build his presence through releases, live performances and collaborations across the UK.",
];

/** Condensed version for press kits — the copy button on both pages uses this. */
export const shortBio =
  "Yves Jones is a Manchester-based multi-genre artist and 1/2 of Fieves, working across alternative hip-hop, soul, electronic and experimental music. His releases pair understated lyricism with textured, unconventional production, drawing on UK rap and the more leftfield corners of contemporary music. Alongside his own catalogue he works as a producer and songwriter, including producing Antony Szmierek’s single “Rafters”. His work has received national radio support from BBC Radio 1 and BBC Radio 6 Music and has passed 10 million streams across all platforms.";
