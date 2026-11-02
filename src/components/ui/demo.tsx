"use client";

import React, { useEffect, useRef } from "react";
import Ipod from "@/components/ipod/Ipod";
import type { MenuEntry } from "@/components/ipod/Screen";
import type { PlayerTrack } from "@/lib/itunes";

/** Z distance between the stacked plates. Also set as each layer's resting
 *  transform in CSS — without that the stack sits flat until the first
 *  mousemove, which is what made the hero read as 2D on load. */
const LAYER_GAP_PX = 45;

const HalideLanding: React.FC<{ tracks?: PlayerTrack[] }> = ({
  tracks = [],
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ENTRANCE_MS = 2500;
    const REST = "rotateX(55deg) rotateZ(-25deg) scale(1)";

    /**
     * Depth is applied up front so the plates are separated while the hero
     * animates in. Only the sideways drift waits for input.
     */
    const seatLayers = (x = 0, y = 0) => {
      layersRef.current.forEach((layer, index) => {
        if (!layer) return;
        const depth = (index + 1) * LAYER_GAP_PX;
        layer.style.transform =
          `translateZ(${depth}px) translate(${x * (index + 1) * 0.5}px, ${y * (index + 1) * 0.5}px)`;
      });
    };

    /**
     * The hero is the same tilted plane everywhere. Only what drives it
     * differs: a cursor where there is one, the scroll position where there
     * is not — a phone has nothing else to aim with.
     *
     * Ignored until the entrance has finished, or the first event would
     * overwrite the angle it is animating from and the plate would snap
     * flat before swinging back.
     */
    let tracking = false;

    const apply = (x: number, y: number) => {
      if (!tracking) return;
      canvas.style.transform = `rotateX(${55 + y / 2}deg) rotateZ(${-25 + x / 2}deg)`;
      seatLayers(x, y);
    };

    const handleMouseMove = (e: MouseEvent) => {
      apply(
        (window.innerWidth / 2 - e.pageX) / 25,
        (window.innerHeight / 2 - e.pageY) / 25,
      );
    };

    // Scrolling past the hero sweeps the same range the cursor would. Read in
    // a frame callback, since scroll fires far faster than the screen redraws.
    let frame = 0;
    // Measured once. Safari collapses its address bar as you scroll, which
    // changes innerHeight mid-gesture — reading it live moves the goalposts
    // under the finger and shows up as a lurch.
    let travel = window.innerHeight;
    const handleScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const progress = Math.min(Math.max(window.scrollY / travel, 0), 1);
        // Zero at the top of the page, so taking over from the entrance is
        // continuous: the rest angle is rotateX(55deg), and y must be 0 there
        // or the plate snaps the moment tracking begins.
        apply(0, -progress * 30);
      });
    };

    /**
     * iOS synthesises mousemove on touch, so without this the first scroll
     * would fire the cursor handler and throw the hero to a stray angle.
     */
    const pointerDevice = window.matchMedia("(hover: hover)");

    let entrance: ReturnType<typeof setTimeout> | undefined;
    let settle: ReturnType<typeof setTimeout> | undefined;

    const detach = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };

    const sync = () => {
      detach();
      if (entrance) clearTimeout(entrance);
      if (settle) clearTimeout(settle);

      tracking = false;
      seatLayers();
      canvas.style.opacity = "0";
      canvas.style.transition = "none";
      canvas.style.transform = "rotateX(90deg) rotateZ(0deg) scale(0.8)";

      entrance = setTimeout(() => {
        canvas.style.transition = `all ${ENTRANCE_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`;
        canvas.style.opacity = "1";
        canvas.style.transform = REST;

        // The transition has to go once it has played, or every later move
        // would ease over two and a half seconds instead of tracking the
        // input — which read as the hero lurching rather than following.
        settle = setTimeout(() => {
          // A short transition stays on rather than none at all. If the
          // device ends the entrance somewhere unexpected — a dropped
          // animation, a restored page — the correction glides instead of
          // snapping, and 120ms is too brief to feel like lag when tracking.
          canvas.style.transition = "transform 120ms linear";
          tracking = true;
          if (!pointerDevice.matches) handleScroll();
        }, ENTRANCE_MS);
      }, 300);

      if (pointerDevice.matches) {
        window.addEventListener("mousemove", handleMouseMove);
      } else {
        window.addEventListener("scroll", handleScroll, { passive: true });
      }
    };

    const onResize = () => {
      travel = window.innerHeight;
    };

    sync();
    pointerDevice.addEventListener("change", sync);
    window.addEventListener("orientationchange", onResize);

    return () => {
      pointerDevice.removeEventListener("change", sync);
      window.removeEventListener("orientationchange", onResize);
      detach();
      if (frame) cancelAnimationFrame(frame);
      if (entrance) clearTimeout(entrance);
      if (settle) clearTimeout(settle);
    };
  }, []);

  return (
    <>
      <style>{`
        .halide-body {
          background-color: var(--color-background);
          color: var(--color-foreground);
          font-family: var(--font-heading), system-ui, sans-serif;
          overflow: hidden;
          height: 100vh;
          width: 100vw;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .viewport {
          perspective: 1100px;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .canvas-3d {
          position: relative;
          width: 800px;
          height: 500px;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .halide-layer {
          position: absolute;
          inset: 0;
          border: 1px solid var(--halide-hairline);
          background-size: cover;
          background-position: center;
          transition: transform 0.5s ease;
        }

        /* Own photographs, composited the way the original stacked three
           stock frames. The venue shot is the base because it carries the
           subject; water and woodland are texture passes.

           Brightness runs above 1 here: the base is a dark room lit by stage
           wash, and red/orange carries little luminance, so grayscale() leaves
           these far darker than the daylight stock they replaced. */
        .halide-layer-1 {
          transform: translateZ(45px);
          box-shadow: 0 40px 90px rgba(0, 0, 0, 0.9);
          background-image: url('/hero-venue.jpg');
          filter: grayscale(1) contrast(1.15) brightness(1.5);
        }
        .halide-layer-2 {
          transform: translateZ(90px);
          background-image: url('/hero-water.jpg');
          filter: grayscale(1) contrast(1.2) brightness(0.5);
          opacity: 0.22;
          mix-blend-mode: screen;
        }
        .halide-layer-3 {
          transform: translateZ(135px);
          background-image: url('/hero-wood.jpg');
          filter: grayscale(1) contrast(1.15) brightness(0.85);
          opacity: 0.22;
          mix-blend-mode: overlay;
        }

        .halide-contours {
          position: absolute;
          width: 200%;
          height: 200%;
          top: -50%;
          left: -50%;
          background-image: repeating-radial-gradient(
            circle at 50% 50%,
            transparent 0,
            transparent 40px,
            rgba(255, 255, 255, 0.05) 41px,
            transparent 42px
          );
          transform: translateZ(230px);
          pointer-events: none;
        }

        .halide-interface-grid {
          position: absolute;
          inset: 0;
          padding: 4rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto 1fr auto;
          z-index: 10;
          pointer-events: none;
        }

        .halide-hero-title {
          grid-column: 1 / -1;
          align-self: center;
        }

        .halide-cta-row {
          grid-column: 1 / -1;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .halide-cta-button {
          pointer-events: auto;
          font-family: var(--font-mono), ui-monospace, monospace;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 2rem;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.8125rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s;
        }

        .halide-cta-primary {
          background: var(--color-accent);
          color: white;
        }
        .halide-cta-primary:hover {
          opacity: 0.8;
          transform: translateY(-3px);
        }

        .halide-cta-secondary {
          background: transparent;
          color: var(--color-foreground);
          border: 1px solid var(--halide-hairline);
        }
        .halide-cta-secondary:hover {
          border-color: var(--color-foreground);
          transform: translateY(-3px);
        }

        .halide-scroll-hint {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, var(--color-foreground), transparent);
          animation: halide-flow 2s infinite ease-in-out;
          z-index: 10;
        }

        @keyframes halide-flow {
          0%, 100% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
        }

        @media (max-width: 768px) {
          .halide-interface-grid {
            padding: 1.5rem;
          }
          .canvas-3d {
            width: min(100%, 360px);
            height: 240px;
          }
          .halide-hero-title {
            font-size: clamp(2.5rem, 12vw, 5rem);
          }
          .halide-cta-row {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
          .halide-cta-buttons {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }
        }
      `}</style>

      <section className="halide-body">
        <div className="halide-interface-grid">
          <div className="mono-label" style={{ fontWeight: 700, fontSize: "0.75rem", color: "var(--color-foreground)" }}>
            YJ_STUDIO
          </div>
          <div className="mono-readout" style={{ textAlign: "right" }}>
            <div>LATITUDE: 34.0522&deg; N</div>
            <div>FOCAL DEPTH: 80MM</div>
          </div>

          <h1 className="halide-hero-title display display-hero display-knockout">
            YVES
            <br />
            JONES
          </h1>

          <div className="halide-cta-row">
            <div className="mono-label">
              <p>[ ARCHIVE 2026 ]</p>
              <p>MULTI-GENRE ARTIST &amp; PRODUCER</p>
            </div>
            {/* The iPod stands in for the old Listen Now button: people can
                play something here instead of being sent to another page. */}
            {tracks.length > 0 && (
              <div
                className="halide-cta-buttons"
                style={{ pointerEvents: "auto" }}
              >
                <Ipod
                  name="Yves Jones"
                  menu={tracks.map((track, i) => ({
                    label: track.title,
                    marker: "note",
                    action: "track" as const,
                    trackIndex: i,
                  }))}
                  tracks={tracks}
                  startInPlayer
                  floating
                  widthClass="w-[220px]"
                />
              </div>
            )}
          </div>
        </div>

        <div className="viewport">
          <div className="canvas-3d" ref={canvasRef}>
            <div
              className="halide-layer halide-layer-1"
              ref={(el) => { layersRef.current[0] = el!; }}
            />
            <div
              className="halide-layer halide-layer-2"
              ref={(el) => { layersRef.current[1] = el!; }}
            />
            <div
              className="halide-layer halide-layer-3"
              ref={(el) => { layersRef.current[2] = el!; }}
            />
            <div className="halide-contours" />
          </div>
        </div>

        <div className="halide-scroll-hint" />
      </section>
    </>
  );
};

export default HalideLanding;
