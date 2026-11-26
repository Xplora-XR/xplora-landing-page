"use client";

import { useEffect, useRef } from "react";

/** Ring that follows the pointer and grows over links, buttons and chips. Hidden on touch. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      el.style.opacity = "1";
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      el.dataset.big = String(!!(e.target as Element).closest?.("a, button, label"));
    };
    addEventListener("pointermove", move, { passive: true });
    return () => removeEventListener("pointermove", move);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-99 opacity-0 mix-blend-screen pointer-coarse:hidden"
    >
      <div className="-mt-[17px] -ml-[17px] size-[34px] rounded-full border border-blue transition-[width,height,margin,background-color] duration-250 in-data-[big=true]:-mt-8 in-data-[big=true]:-ml-8 in-data-[big=true]:size-16 in-data-[big=true]:bg-blue/15" />
    </div>
  );
}
