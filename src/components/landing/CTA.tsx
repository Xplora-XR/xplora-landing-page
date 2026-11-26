import PillLink from "./PillLink";
import SectionLabel from "./SectionLabel";

export default function CTA() {
  return (
    <section className="border-t bg-[radial-gradient(50%_60%_at_50%_55%,rgb(43_115_223/0.22),transparent_70%)] py-[clamp(100px,14vw,200px)] text-center">
      <div className="wrap">
        <SectionLabel center>Próximo passo</SectionLabel>
        <h2 className="text-display-cta reveal text-balance uppercase">
          Vamos <em>xplorar</em> juntos?
        </h2>
        <PillLink href="#contato" className="mt-12">
          Falar com a Xplora
        </PillLink>
      </div>
    </section>
  );
}
