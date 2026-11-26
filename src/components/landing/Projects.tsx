"use client";

import { ArrowRight, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { featuredProject, projects } from "@/data/projects";
import PillLink from "./PillLink";
import ProjectMedia from "./ProjectMedia";
import ProjectRail from "./ProjectRail";
import SectionLabel from "./SectionLabel";

/** Large 16:9 screen for the featured case; plays while on screen. */
function FeaturedScreen() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="relative isolate aspect-video overflow-hidden rounded-md border">
      <ProjectMedia {...featuredProject} active={active} className="brightness-85 saturate-90" />
      <span
        aria-hidden="true"
        className="absolute inset-0 z-2 m-auto grid size-[84px] place-items-center rounded-full bg-blue shadow-[0_0_0_12px_rgb(43_115_223/0.2)]"
      >
        <Play className="ml-1 size-7 fill-white text-white" />
      </span>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projetos" className="border-t py-band">
      <div className="wrap flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionLabel>[ 04 ] Projetos</SectionLabel>
          <h2 className="text-display-l reveal uppercase">
            Veja <em>rodando.</em>
          </h2>
        </div>
        <p className="mono-label text-dim">Conteúdo de exemplo · vídeos entram no lugar dos gradientes</p>
      </div>

      <ProjectRail projects={projects} />

      <div className="wrap reveal mt-[clamp(72px,9vw,120px)] grid items-center gap-[clamp(32px,4vw,64px)] min-[861px]:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <FeaturedScreen />
        <div>
          <span className="mono-label text-blue">Projeto em destaque</span>
          <h3 className="mt-3 mb-4 text-[clamp(28px,3vw,42px)] leading-[1.02] font-extrabold tracking-[-0.03em] uppercase">{featuredProject.title}</h3>
          <p className="max-w-[56ch] text-[17px] text-dim">{featuredProject.summary}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <PillLink href={featuredProject.href}>Ver case</PillLink>
            <PillLink href="#projetos" variant="ghost" icon={ArrowRight}>
              Todos os projetos
            </PillLink>
          </div>
        </div>
      </div>
    </section>
  );
}
