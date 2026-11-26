"use client";

import { useEffect, useRef } from "react";

/** Point in normalized model space, roughly -0.5..0.5 on each axis. */
export type Vec3 = [number, number, number];
/** Where the cloud sits on the canvas: center and scale in CSS px. */
export type Placement = { cx: number; cy: number; s: number };

type Props = {
  points: () => Vec3[];
  place: (width: number, height: number) => Placement;
  /** Cursor repel radius in px. */
  radius?: number;
  /** Dot size multiplier. */
  dot?: number;
  /** Slow idle rotation on Y. */
  spin?: boolean;
  /** Resting dot colour as "r,g,b". */
  rgb?: string;
  className?: string;
};

type Particle = { x: number; y: number; z: number; dx: number; dy: number; vx: number; vy: number; r: number };

/**
 * Points rotated in perspective, following the pointer (parallax), repelled near the cursor
 * and pulled back by a spring. Pointer events are read from the canvas's parent so text
 * layered above the canvas doesn't block the interaction.
 */
export default function PointCloud({ points, place, radius = 110, dot = 1, spin = false, rgb = "43,115,223", className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Latest props without restarting the loop when the parent re-renders.
  const opts = useRef({ points, place, radius, dot, spin, rgb });
  opts.current = { points, place, radius, dot, spin, rgb };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const host = canvas.parentElement ?? canvas;

    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let reduce = motion.matches;
    const onMotion = (e: MediaQueryListEvent) => (reduce = e.matches);
    motion.addEventListener("change", onMotion);

    let pts: Particle[] = [];
    let W = 0, H = 0, t = 0, raf = 0, disposed = false;
    let mx = -9999, my = -9999, tx = 0, ty = 0, rx = 0, ry = 0;

    const build = () => {
      pts = opts.current.points().map(([x, y, z]) => ({ x, y, z, dx: 0, dy: 0, vx: 0, vy: 0, r: Math.random() }));
    };
    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const frame = () => {
      const { place, radius: R, dot, spin, rgb } = opts.current;
      if (!reduce) t += 1;
      ry += ((spin && !reduce ? Math.sin(t * 0.004) * 0.35 : 0) + tx * 0.6 - ry) * 0.05;
      rx += (ty * -0.35 - rx) * 0.05;
      const { cx, cy, s } = place(W, H);
      ctx.clearRect(0, 0, W, H);
      const cY = Math.cos(ry), sY = Math.sin(ry), cX = Math.cos(rx), sX = Math.sin(rx);
      for (const p of pts) {
        const x = p.x * cY + p.z * sY;
        let z = -p.x * sY + p.z * cY;
        const y = p.y * cX - z * sX;
        z = p.y * sX + z * cX;
        const f = 1 / (1 + z * 0.9);
        const sx = cx + x * s * f, sy = cy + y * s * f;
        const ex = sx + p.dx - mx, ey = sy + p.dy - my, d = Math.hypot(ex, ey);
        let hot = 0;
        if (d < R && d > 0.01) {
          hot = 1 - d / R;
          const k = hot * hot * 7;
          p.vx += (ex / d) * k;
          p.vy += (ey / d) * k;
        }
        // spring back: k .055, friction .86
        p.vx = (p.vx - p.dx * 0.055) * 0.86;
        p.vy = (p.vy - p.dy * 0.055) * 0.86;
        p.dx += p.vx;
        p.dy += p.vy;
        const depth = Math.max(0, Math.min(1, 0.55 - z * 0.9));
        const twinkle = reduce ? 1 : 0.75 + 0.25 * Math.sin(t * 0.05 + p.r * 40);
        const a = (0.25 + depth * 0.75) * twinkle, sz = (0.7 + depth * 1.5) * dot;
        ctx.fillStyle = hot > 0.05 ? `rgba(255,251,246,${Math.min(1, a + hot)})` : `rgba(${rgb},${a})`;
        ctx.fillRect(sx + p.dx - sz / 2, sy + p.dy - sz / 2, sz, sz);
      }
    };
    const loop = () => {
      frame();
      raf = requestAnimationFrame(loop);
    };
    const start = () => { if (!raf) raf = requestAnimationFrame(loop); };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };

    const onMove = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect();
      mx = e.clientX - b.left;
      my = e.clientY - b.top;
      tx = mx / W - 0.5;
      ty = my / H - 0.5;
    };
    const onLeave = () => { mx = my = -9999; tx = ty = 0; };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    const ro = new ResizeObserver(size);
    ro.observe(canvas);
    // Only animate while on screen.
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    io.observe(canvas);

    size();
    build();
    // Glyph-sampled shapes need the webfont; resample once it's ready.
    document.fonts?.ready.then(() => { if (!disposed) build(); });

    return () => {
      disposed = true;
      stop();
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      motion.removeEventListener("change", onMotion);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
