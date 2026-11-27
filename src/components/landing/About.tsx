import GlassesModel from "./GlassesModel";
import SectionLabel from "./SectionLabel";

const pillars = [
  { tag: "P/01 · Sob medida", title: <>Tecnologia que serve <em>à ideia</em>.</>, text: "Escolhemos a plataforma pelo objetivo: óculos VR, celular, navegador ou tela interativa." },
  { tag: "P/02 · Acessível", title: <>Imersão em <em>todos os sentidos</em>.</>, text: "Experiências que rodam onde o público está, sem barreira técnica nem aplicativo obrigatório." },
];

export default function About() {
  return (
    <section id="sobre" className="border-t py-band">
      <div className="wrap grid items-start gap-[clamp(40px,6vw,96px)] min-[861px]:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="reveal">
          <SectionLabel>[ 01 ] Sobre</SectionLabel>
          <h2 className="text-display-l text-balance uppercase">
            O mundo real, com <em>uma camada</em> a mais.
          </h2>
          <p className="mt-7 max-w-[56ch] text-[17px] text-dim">
            A Xplora começou mostrando projetos de arquitetura em realidade aumentada. Hoje desenvolvemos soluções completas em VR e AR para marcas,
            treinamentos, eventos e espaços físicos.
          </p>
          <div className="mt-12 border-t">
            {pillars.map((p) => (
              <div key={p.tag} className="border-b py-[26px]">
                <span className="mono-label text-dim">{p.tag}</span>
                <h3 className="mt-2.5 mb-1.5 text-[22px] font-semibold tracking-[-0.02em]">{p.title}</h3>
                <p className="text-[15px] text-dim">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="scan-grid reveal relative aspect-square overflow-hidden rounded border bg-bg-2 min-[861px]:sticky min-[861px]:top-[110px]">
          <GlassesModel />
          <span aria-hidden="true" className="mono-label pointer-events-none absolute bottom-3.5 left-4 text-dim">modelo 3D · arraste para girar</span>
        </div>
      </div>
    </section>
  );
}
