import { steps } from "@/data/content";
import SectionLabel from "./SectionLabel";

export default function Process() {
  return (
    <section id="processo" className="border-t py-band">
      <div className="wrap">
        <SectionLabel>[ 03 ] Processo</SectionLabel>
        <h2 className="text-display-l reveal text-balance uppercase">
          Da ideia à imersão. <em>Três etapas.</em>
        </h2>
        <ol className="relative mt-[72px] grid gap-10 md:grid-cols-3 md:gap-0 md:before:absolute md:before:top-7 md:before:right-0 md:before:left-7 md:before:h-px md:before:bg-[linear-gradient(90deg,var(--color-blue),var(--color-blue-3)_60%,var(--color-line))]">
          {steps.map((s, i) => (
            <li key={s.title} className="reveal pr-8">
              <div className="relative grid size-14 place-items-center rounded-full border border-blue bg-bg text-lg font-extrabold text-blue italic shadow-[0_0_0_6px_var(--color-bg),0_0_24px_var(--color-blue-glow)]">
                0{i + 1}
              </div>
              <h3 className="mt-7 mb-2 text-xl font-semibold">{s.title}</h3>
              <p className="max-w-[32ch] text-[15px] text-dim">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
