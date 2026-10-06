import Link from "next/link";
import { Instagram, Youtube, Music, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="hairline-t bg-surface topo">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="display display-sm mb-4">Yves Jones</h3>
            <p className="mono text-xs text-muted leading-relaxed">
              Hip-Hop / Rap &amp; Electronic Dance artist. London-based producer and performer.
            </p>
          </div>
          <div>
            <h4 className="mono-eyebrow mb-4">Links</h4>
            <div className="flex flex-col gap-2">
              <Link href="/music" className="mono-label hover:text-foreground transition-colors">Music</Link>
              <Link href="/store" className="mono-label hover:text-foreground transition-colors">Store</Link>
              <Link href="/shows" className="mono-label hover:text-foreground transition-colors">Shows</Link>
              <Link href="/press" className="mono-label hover:text-foreground transition-colors">Press</Link>
              <Link href="/contact" className="mono-label hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="mono-eyebrow mb-4">Follow</h4>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Instagram" className="text-muted hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-muted hover:text-accent transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="YouTube" className="text-muted hover:text-accent transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" aria-label="SoundCloud" className="text-muted hover:text-accent transition-colors">
                <Music size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 hairline-t text-center mono-label">
          &copy; {new Date().getFullYear()} Yves Jones. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
