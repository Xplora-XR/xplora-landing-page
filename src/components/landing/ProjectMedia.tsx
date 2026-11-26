"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/data/projects";

type Props = Pick<Project, "video" | "poster" | "colors"> & {
  /** Plays the video (or runs the gradient) while true. */
  active: boolean;
  /** Shifts the gradient focus so neighbouring fallbacks differ. */
  index?: number;
  className?: string;
};

/** Project picture: a muted looping video, or an animated gradient until the video exists. */
export default function ProjectMedia({ video, poster, colors: [a, b], active, index = 0, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (active) v.play().catch(() => {}); // autoplay can be refused; the poster stays
    else v.pause();
  }, [active]);

  if (video)
    return <video ref={ref} src={video} poster={poster} muted loop playsInline preload="metadata" className={`absolute inset-0 size-full object-cover ${className}`} />;

  const gradient = `radial-gradient(45% 55% at ${30 + index * 9}% ${35 + index * 5}%,${a},transparent),radial-gradient(50% 50% at 80% 80%,${b},transparent),linear-gradient(160deg,#161B25,#0B0E14)`;
  return (
    <div
      className={`absolute -inset-[10%] bg-size-[200%_200%] motion-safe:animate-drift ${active ? "" : "[animation-play-state:paused]"} ${className}`}
      style={{ backgroundImage: gradient }}
    >
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgb(0_0_0/0.18)_0_1px,transparent_1px_3px)]" />
    </div>
  );
}
