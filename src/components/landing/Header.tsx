"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import PillLink from "./PillLink";
import { navLinks as links } from "@/data/content";


export default function Header() {
  const [solid, setSolid] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = scrollY;
      const max = document.documentElement.scrollHeight - innerHeight;
      setSolid(y > 40);
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div ref={bar} aria-hidden="true" className="fixed inset-x-0 top-0 z-60 h-0.5 origin-left scale-x-0 bg-blue" />
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
          solid ? "border-line bg-bg/78 backdrop-blur-[14px]" : "border-transparent"
        }`}
      >
        <div className="wrap flex h-nav items-center justify-between gap-6">
          <Logo />
          <nav aria-label="Principal" className="hidden gap-[30px] min-[861px]:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-dim transition-colors hover:text-sand">
                {l.label}
              </a>
            ))}
          </nav>
          <PillLink href="#contato" size="sm">
            Solicitar proposta
          </PillLink>
        </div>
      </header>
    </>
  );
}
