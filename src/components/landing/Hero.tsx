import { ArrowDown } from "lucide-react";
import { HeroCloud } from "./clouds";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[max(100svh,680px)] flex-col justify-end overflow-hidden bg-[radial-gradient(60%_70%_at_70%_50%,rgb(35_73_130/0.35),transparent_70%)]"
    >
      <HeroCloud />

      <div className="pointer-events-none absolute inset-x-0 top-[100px]">
        <div className="wrap mono-label flex justify-between gap-5 text-dim">
          <span>
            <span className="mr-2 inline-block size-1.5 rounded-full bg-blue shadow-[0_0_12px_var(--color-blue)]" />
            Realidade virtual · Realidade aumentada
          </span>
          <span className="text-right max-md:hidden">
            Soluções XR
            <br />
            v.2026 · Online
          </span>
        </div>
      </div>

      <div className="wrap pointer-events-none relative pb-[clamp(36px,6vh,64px)]">
        <h1 className="text-display-xl text-balance uppercase md:max-w-[9.5ch]">
          Realidades feitas para <em>xplorar.</em>
        </h1>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <p className="max-w-[44ch] text-dim">
            Criamos experiências em realidade virtual e aumentada que colocam pessoas dentro de produtos, espaços e ideias.
          </p>
          <span className="mono-label flex items-center gap-2.5 text-blue">
            <span className="size-[18px] rounded-full border border-blue motion-safe:animate-ring" />
            [ interativo ] passe o mouse sobre o X
          </span>
          <span className="mono-label flex items-center gap-1.5 text-dim">
            Role para baixo <ArrowDown className="size-3" aria-hidden="true" />
          </span>
        </div>
      </div>
    </section>
  );
}
