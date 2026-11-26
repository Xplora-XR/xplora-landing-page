import { ArrowRight } from "lucide-react";
import { solutions } from "@/data/content";
import PillLink from "./PillLink";
import SectionLabel from "./SectionLabel";

export default function Solutions() {
  return (
    <section id="solucoes" className="border-t py-band">
      <div className="wrap">
        <SectionLabel>[ 02 ] Soluções</SectionLabel>
        <h2 className="text-display-l reveal text-balance uppercase">
          Cinco formas de <em>levar você</em> para dentro.
        </h2>
        <div className="mt-16 border-t">
          {solutions.map((s, i) => (
            <a
              key={s.title}
              href="#contato"
              className="group grid grid-cols-[44px_minmax(0,1fr)_44px] items-center gap-6 border-b px-3 py-[30px] transition-[background] duration-300 hover:bg-[linear-gradient(90deg,var(--color-blue-glow),transparent_70%)] md:grid-cols-[70px_minmax(0,1.1fr)_minmax(0,1.4fr)_48px]"
            >
              <span className="mono-label text-dim transition-colors group-hover:text-blue">/0{i + 1}</span>
              <h3 className="text-[clamp(24px,2.6vw,36px)] leading-tight font-medium tracking-[-0.03em] transition-transform duration-300 group-hover:translate-x-3">
                {s.title}
              </h3>
              <p className="col-start-2 col-end-4 row-start-2 text-[15px] text-dim md:col-auto md:row-auto">{s.text}</p>
              <span className="col-start-3 row-start-1 grid size-11 place-items-center rounded-full border border-line-2 transition-all duration-300 group-hover:-rotate-45 group-hover:border-blue group-hover:bg-blue md:col-auto md:row-auto">
                <ArrowRight className="size-4" aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
        <div className="mt-14 flex justify-center">
          <PillLink href="#contato">Conversar sobre um projeto</PillLink>
        </div>
      </div>
    </section>
  );
}
