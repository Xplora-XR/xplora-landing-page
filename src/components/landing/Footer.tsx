import { Asterisk } from "lucide-react";
import { keywords, navLinks } from "@/data/content";
import { contact, socials } from "@/data/placeholders";
import Logo from "./Logo";
import Marquee from "./Marquee";

const linkCls = "transition-colors hover:text-sand";

export default function Footer() {
  return (
    <footer className="border-t pt-16">
      <div className="wrap grid grid-cols-2 gap-8 md:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))]">
        <div className="col-span-2 md:col-span-1">
          <Logo />
          <p className="mt-4 text-[15px] text-dim">Soluções em realidade virtual e aumentada.</p>
        </div>
        <div>
          <span className="mono-label text-dim">Contato</span>
          <ul className="mt-3.5 grid gap-2 text-sm text-dim">
            <li>
              <a href={`mailto:${contact.email}`} className={linkCls}>{contact.email}</a>
            </li>
            <li>{contact.phone}</li>
          </ul>
        </div>
        <div>
          <span className="mono-label text-dim">Social</span>
          <ul className="mt-3.5 grid gap-2 text-sm text-dim">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className={linkCls}>{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <nav aria-label="Rodapé">
          <span className="mono-label text-dim">Navegação</span>
          <ul className="mt-3.5 grid gap-2 text-sm text-dim">
            {navLinks.slice(0, 4).map((l) => (
              <li key={l.href}>
                <a href={l.href} className={linkCls}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="wrap mono-label flex flex-wrap justify-between gap-4 pt-10 pb-6 text-dim">
        <span>© 2026 Xplora · Todos os direitos reservados · Privacidade</span>
        <span>Contatos provisórios</span>
      </div>
      <div className="border-t py-[18px]">
        <Marquee className="gap-7 pr-7 [animation-duration:30s]">
          {keywords.map((k) => (
            <span key={k} className="flex items-center gap-7 text-[22px] font-black tracking-[-0.02em] whitespace-nowrap uppercase italic">
              {k}
              <Asterisk className="size-5 text-blue" strokeWidth={3} aria-hidden="true" />
            </span>
          ))}
        </Marquee>
      </div>
    </footer>
  );
}
