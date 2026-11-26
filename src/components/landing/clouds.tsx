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

/** About: a stylised VR headset in points (rounded box, two lenses, strap). */
function visorPoints(): Vec3[] {
  const o: Vec3[] = [];
  const rnd = (a: number, b: number) => a + Math.random() * (b - a);
  const squircle = (v: number, k: number) => Math.pow(Math.abs(v), 0.35) * Math.sign(v) * k;
  for (let i = 0; i < 2600; i++) {
    const u = Math.random() * Math.PI * 2;
    o.push([squircle(Math.cos(u), 0.36), squircle(Math.sin(u), 0.15), rnd(-1, 1) * 0.12]);
  }
  for (let i = 0; i < 900; i++) {
    const side = Math.random() < 0.5 ? -1 : 1, u = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random()) * 0.1;
    o.push([side * 0.17 + Math.cos(u) * r, Math.sin(u) * r * 0.9, 0.13]);
  }
  for (let i = 0; i < 700; i++) {
    const u = (rnd(-0.9, 0.9) * Math.PI) / 2;
    o.push([Math.sin(u) * 0.42, rnd(-0.03, 0.03), -Math.cos(u) * 0.42 + 0.05]);
  }
  return o;
}

export function VisorCloud() {
  return (
    <PointCloud
      spin
      radius={90}
      dot={1.1}
      points={visorPoints}
      place={(W, H) => ({ cx: W / 2, cy: H / 2, s: Math.min(W, H) * 0.95 })}
      className="absolute inset-0 size-full"
    />
  );
}
