"use client";

import PointCloud, { type Vec3 } from "./PointCloud";

/** Samples a glyph's filled pixels into points, plus ~260 dust points around it. */
function glyphPoints(ch: string, step: number): Vec3[] {
  const S = 420;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const g = c.getContext("2d");
  if (!g) return [];
  // next/font hashes the family name; read the real stack from the CSS variable.
  const family = getComputedStyle(document.body).getPropertyValue("--font-geist-sans").trim() || "system-ui, sans-serif";
  g.fillStyle = "#fff";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.font = `900 ${S * 1.05}px ${family}`;
  g.fillText(ch, S / 2, S / 2 + S * 0.04);
  const data = g.getImageData(0, 0, S, S).data;
  const out: Vec3[] = [];
  const jitter = () => (Math.random() - 0.5) * step * 0.6;
  for (let y = 0; y < S; y += step)
    for (let x = 0; x < S; x += step) {
      if (data[(y * S + x) * 4 + 3] <= 128) continue;
      out.push([(x + jitter()) / S - 0.5, (y + jitter()) / S - 0.5, (Math.random() - 0.5) * 0.1]);
      if (Math.random() < 0.25) out.push([(x + jitter()) / S - 0.5, (y + jitter()) / S - 0.5, (Math.random() - 0.5) * 0.32]);
    }
  for (let i = 0; i < 260; i++) out.push([(Math.random() - 0.5) * 1.6, (Math.random() - 0.5) * 1.1, (Math.random() - 0.5) * 0.9]);
  return out;
}

/** Hero: the "X" of Xplora as a point cloud. */
export function HeroCloud() {
  return (
    <PointCloud
      spin
      radius={120}
      dot={1.25}
      points={() => glyphPoints("X", innerWidth < 700 ? 6 : 4)}
      place={(W, H) => (W < 760 ? { cx: W * 0.5, cy: H * 0.36, s: Math.min(W * 0.95, H * 0.55) } : { cx: W * 0.72, cy: H * 0.46, s: Math.min(W * 0.44, H * 0.82) })}
      className="absolute inset-0 size-full"
    />
  );
}
