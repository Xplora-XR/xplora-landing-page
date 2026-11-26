import { stats } from "@/data/content";
import SectionLabel from "./SectionLabel";

export default function WhyXR() {
  return (
    <section id="impacto" className="border-t py-band">
      <div className="wrap">
        <SectionLabel>[ 05 ] Por que XR</SectionLabel>
        <h2 className="text-display-l reveal text-balance uppercase">
          Ver é bom. <em>Estar dentro</em> é melhor.
        </h2>
        <div className="mt-16 grid border-t md:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="reveal border-b py-8 md:border-r md:border-b-0 md:px-8 md:pt-10 md:pb-2 md:first:pl-0 md:last:border-r-0">
              <div className="text-[clamp(64px,8vw,120px)] leading-[0.9] font-black tracking-[-0.05em] text-blue">
                {s.value}
                {s.unit && <small className="ml-1 text-[0.35em] tracking-normal text-sand">{s.unit}</small>}
              </div>
              <div className="mono-label mt-[18px] mb-2.5 text-dim">{s.label}</div>
              <p className="text-[15px] text-dim">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
