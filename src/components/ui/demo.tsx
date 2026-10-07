"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Play, ShoppingBag } from "lucide-react";

/** Z distance between the stacked plates. Also set as each layer's resting
 *  transform in CSS — without that the stack sits flat until the first
 *  mousemove, which is what made the hero read as 2D on load. */
const LAYER_GAP_PX = 45;

const HalideLanding: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Mouse Parallax Logic
    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.pageX) / 25;
      const y = (window.innerHeight / 2 - e.pageY) / 25;

      // Rotate the 3D Canvas
      canvas.style.transform = `rotateX(${55 + y / 2}deg) rotateZ(${-25 + x / 2}deg)`;

      // Apply depth shift to layers
      layersRef.current.forEach((layer, index) => {
        if (!layer) return;
        const depth = (index + 1) * LAYER_GAP_PX;
        const moveX = x * (index + 1) * 0.5;
        const moveY = y * (index + 1) * 0.5;
        layer.style.transform = `translateZ(${depth}px) translate(${moveX}px, ${moveY}px)`;
      });
    };

    // Entrance Animation
    canvas.style.opacity = "0";
    canvas.style.transform = "rotateX(90deg) rotateZ(0deg) scale(0.8)";

    const timeout = setTimeout(() => {
      canvas.style.transition = "all 2.5s cubic-bezier(0.16, 1, 0.3, 1)";
      canvas.style.opacity = "1";
      canvas.style.transform = "rotateX(55deg) rotateZ(-25deg) scale(1)";
    }, 300);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
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
            width: 400px;
            height: 300px;
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
              <p>HIP-HOP / RAP &amp; ELECTRONIC DANCE</p>
            </div>
            <div className="halide-cta-buttons" style={{ display: "flex", gap: "0.75rem", pointerEvents: "auto" }}>
              <Link href="/music" className="halide-cta-button halide-cta-primary">
                <Play size={16} /> Listen Now
              </Link>
              <Link href="/store" className="halide-cta-button halide-cta-secondary">
                <ShoppingBag size={16} /> Buy Mixtapes
              </Link>
            </div>
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
