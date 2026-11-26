import { clients } from "@/data/placeholders";
import Marquee from "./Marquee";

const logos = clients.map((c) => (
  <span key={c} className="grid h-16 min-w-[150px] place-items-center rounded border border-dashed border-line-2 font-mono text-sm font-semibold tracking-[0.1em] text-steel uppercase">
    {c}
  </span>
));

export default function Brands() {
  return (
    <section aria-label="Clientes" className="border-t py-[72px]">
      <p className="wrap mono-label text-center text-dim">Marcas que xploram com a gente · logos a definir</p>
      <div className="mt-9 grid gap-5">
        <Marquee className="gap-16 pr-16">{logos}</Marquee>
        <Marquee reverse className="gap-16 pr-16">
          {logos}
        </Marquee>
      </div>
    </section>
  );
}
