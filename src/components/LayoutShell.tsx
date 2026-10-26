"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // /links is the Instagram bio page: no nav, no footer, nothing but the
  // links themselves.
  const isBare =
    pathname.startsWith("/admin") || pathname.startsWith("/links");

  if (isBare) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">{children}</main>
      <Footer />
    </>
  );
}
