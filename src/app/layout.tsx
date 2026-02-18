import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yves Jones | Hip-Hop & Electronic Dance Artist",
  description:
    "Official website of Yves Jones. Stream music, buy exclusive mixtapes, check upcoming shows, and download press materials.",
  keywords: ["Yves Jones", "Hip-Hop", "Rap", "Electronic Dance", "EDM", "UK Drill", "House", "DnB"],
  openGraph: {
    title: "Yves Jones | Hip-Hop & Electronic Dance Artist",
    description: "Stream music, buy exclusive mixtapes, and check upcoming shows.",
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
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground grain`}
      >
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
