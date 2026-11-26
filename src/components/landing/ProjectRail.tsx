"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import ProjectMedia from "./ProjectMedia";

const GAP = 16;

function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [active, setActive] = useState(false);

  // Touch screens have no hover: play while the card is mostly in view.
  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia("(hover: none)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hover = (on: boolean) => () => matchMedia("(hover: hover)").matches && setActive(on);

  return (
    <a
      ref={ref}
      href={p.href}
      onMouseEnter={hover(true)}
      onMouseLeave={hover(false)}
      onFocus={hover(true)}
      onBlur={hover(false)}
      className="group relative isolate aspect-[4/5] flex-[0_0_clamp(270px,26vw,380px)] snap-start overflow-hidden rounded-md bg-surface"
    >
      <ProjectMedia
        {...p}
        index={index}
        active={active}
        className="brightness-90 saturate-80 transition-[transform,filter] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-106 group-hover:brightness-115 group-hover:saturate-115"
      />
      <div className="absolute inset-0 z-1 bg-[linear-gradient(180deg,transparent_45%,rgb(11_14_20/0.92))]" />
      <span className="mono-label absolute top-4 right-4 z-2 flex items-center gap-2 rounded-full bg-bg/55 px-2.5 py-1.5 text-sand backdrop-blur-[6px]">
        {active ? <Pause className="size-2.5 fill-blue text-blue" aria-hidden="true" /> : <Play className="size-2.5 fill-blue text-blue" aria-hidden="true" />}
        Vídeo
      </span>
      <div className="absolute inset-x-5 bottom-5 z-2">
        <span className="mono-label text-blue">/0{index + 1}</span>
        <h3 className="mt-1.5 mb-1 text-[21px] leading-tight font-semibold tracking-[-0.02em]">{p.title}</h3>
        <span className="mono-label text-dim">{p.category}</span>
        <span className="mt-3 flex translate-y-2 items-center gap-2 text-sm text-blue opacity-0 transition-all duration-350 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          Ver projeto <ArrowUpRight className="size-4" aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}

/** Draggable, snapping carousel of project cards with arrows and a position bar. */
export default function ProjectRail({ projects }: { projects: Project[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const [bar, setBar] = useState({ left: 0, width: 20 });

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      const f = el.clientWidth / el.scrollWidth;
      setBar({ width: f * 100, left: (max ? el.scrollLeft / max : 0) * (1 - f) * 100 });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);

    // Mouse drag-to-scroll; touch already scrolls natively.
    let drag: { x: number; s: number; moved: boolean } | null = null;
    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      drag = { x: e.clientX, s: el.scrollLeft, moved: false };
      el.style.scrollSnapType = "none";
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (Math.abs(dx) > 4) drag.moved = true;
      el.scrollLeft = drag.s - dx;
    };
    const up = () => {
      if (!drag) return;
      const moved = drag.moved;
      drag = null;
      el.style.scrollSnapType = "";
      // swallow the click that ends a drag so it doesn't open the card
      if (moved) el.addEventListener("click", (ev) => ev.preventDefault(), { once: true, capture: true });
    };
    el.addEventListener("pointerdown", down);
    addEventListener("pointermove", move);
    addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
      el.removeEventListener("pointerdown", down);
      removeEventListener("pointermove", move);
      removeEventListener("pointerup", up);
    };
  }, []);

  const step = (dir: number) => {
    const el = rail.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (el && card) el.scrollBy({ left: dir * (card.offsetWidth + GAP), behavior: "smooth" });
  };

  return (
    <>
      <div
        ref={rail}
        tabIndex={0}
        aria-label="Projetos, role para os lados"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="mt-2 flex cursor-grab scroll-px-pad snap-x snap-mandatory gap-4 overflow-x-auto px-pad pt-14 pb-2 [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
      <div className="wrap mt-5 flex items-center justify-between gap-4">
        <span className="mono-label text-dim">Arraste →</span>
        <div className="relative h-px flex-1 bg-line">
          <span className="absolute inset-y-0 bg-blue" style={{ left: `${bar.left}%`, width: `${bar.width}%` }} />
        </div>
        <div className="flex gap-2">
          {[
            { dir: -1, label: "Projeto anterior", Icon: ArrowLeft },
            { dir: 1, label: "Próximo projeto", Icon: ArrowRight },
          ].map(({ dir, label, Icon }) => (
            <button
              key={dir}
              type="button"
              aria-label={label}
              onClick={() => step(dir)}
              className="grid size-11 cursor-pointer place-items-center rounded-full border border-line-2 text-sand transition-colors hover:border-blue hover:text-blue"
            >
              <Icon className="size-4" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
