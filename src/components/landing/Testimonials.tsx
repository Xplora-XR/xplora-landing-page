import Image from "next/image";
import { testimonials } from "@/data/placeholders";
import SectionLabel from "./SectionLabel";

export default function Testimonials() {
  return (
    <section id="depoimentos" className="border-t py-band">
      <div className="wrap">
        <SectionLabel>[ 06 ] Vozes</SectionLabel>
        <h2 className="text-display-l reveal text-balance uppercase">
          Quem xplorou <em>conta.</em>
        </h2>
        <div className="mt-16 grid gap-4 min-[861px]:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure key={i} className="reveal flex flex-col gap-7 rounded-md border bg-bg-2 p-8">
              <span className="mono-label text-blue">0{i + 1}</span>
              <blockquote className="text-[17px] leading-normal text-dim">{t.quote}</blockquote>
              <figcaption className="mt-auto flex items-center gap-3">
                {t.avatar ? (
                  <Image src={t.avatar} alt="" width={40} height={40} className="size-10 rounded-full object-cover" />
                ) : (
                  <span aria-hidden="true" className="size-10 rounded-full border border-line-2 bg-navy" />
                )}
                <div>
                  <b className="block text-[15px]">{t.name}</b>
                  <span className="mono-label text-dim">{t.role}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
