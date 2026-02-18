import Link from "next/link";
import { Instagram, Youtube, Music, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">YVES JONES</h3>
            <p className="text-muted text-sm leading-relaxed">
              Hip-Hop / Rap & Electronic Dance artist. London-based producer and performer.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-sm font-bold mb-4 uppercase tracking-wider">
              Links
            </h4>
            <div className="flex flex-col gap-2">
              <Link href="/music" className="text-sm text-muted hover:text-foreground transition-colors">Music</Link>
              <Link href="/store" className="text-sm text-muted hover:text-foreground transition-colors">Store</Link>
              <Link href="/shows" className="text-sm text-muted hover:text-foreground transition-colors">Shows</Link>
              <Link href="/press" className="text-sm text-muted hover:text-foreground transition-colors">Press</Link>
              <Link href="/contact" className="text-sm text-muted hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="font-heading text-sm font-bold mb-4 uppercase tracking-wider">
              Follow
            </h4>
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
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted">
          &copy; {new Date().getFullYear()} Yves Jones. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
