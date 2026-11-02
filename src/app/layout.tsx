import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, Silkscreen } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

/** The iPod's bitmap face, in the spirit of Chicago. */
const silkscreen = Silkscreen({
  variable: "--font-silkscreen",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yves Jones | Multi-Genre Artist & Producer",
  description:
    "Manchester-based multi-genre artist and producer, 1/2 of Fieves. Alternative hip-hop, soul, electronic and experimental music, with production credits including Antony Szmierek's \u201CRafters\u201D.",
  keywords: [
    "Yves Jones",
    "Fieves",
    "Manchester",
    "alternative hip-hop",
    "soul",
    "electronic",
    "experimental",
    "producer",
    "songwriter",
  ],
  openGraph: {
    title: "Yves Jones | Multi-Genre Artist & Producer",
    description:
      "Manchester-based multi-genre artist and producer, 1/2 of Fieves. Over 10 million streams, with radio support from BBC Radio 1 and 6 Music.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${silkscreen.variable} antialiased bg-background text-foreground grain`}
      >
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
