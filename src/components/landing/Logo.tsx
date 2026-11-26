/** Provisional symbol: replace with the official SVG from the "Xplora Visual Identity" Figma file. */
export default function Logo({ className }: { className?: string }) {
  return (
    <a href="#top" aria-label="Xplora — início" className={`flex items-center gap-2.5 text-[21px] leading-none font-extrabold tracking-[0.06em] ${className ?? ""}`}>
      <svg viewBox="0 0 32 32" fill="none" className="size-[30px]" aria-hidden="true">
        <path d="M3 10.5 14 6v20L3 22.5z" fill="#2B73DF" />
        <path d="m14 6 15 3.5V25l-15 1z" fill="#2B73DF" opacity=".75" />
        <path d="M8 8.4 21 4l8 5.5" stroke="#2B73DF" strokeWidth="2.2" strokeLinejoin="round" />
        <circle cx="22.5" cy="17" r="3.2" fill="#0B0E14" />
      </svg>
      xplora
    </a>
  );
}
