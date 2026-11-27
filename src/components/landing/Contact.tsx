"use client";

import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { services } from "@/data/content";
import { contact } from "@/data/placeholders";
import { contactText, isValidContact } from "@/lib/contact";
import SectionLabel from "./SectionLabel";

const field =
  "w-full resize-y border-0 border-b border-line-2 bg-transparent py-[18px] text-base text-sand outline-none transition-colors placeholder:text-dim/75 focus:border-blue focus-visible:outline-none";

const read = (form: HTMLFormElement) => {
  const f = new FormData(form);
  const s = (k: string) => String(f.get(k) ?? "").trim();
  return { nome: s("nome"), email: s("email"), empresa: s("empresa"), servicos: f.getAll("servico").map(String), msg: s("msg") };
};

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = read(form);
    if (!isValidContact(data)) {
      setStatus("Preencha nome e um e-mail válido.");
      return;
    }
    setSending(true);
    setStatus("Enviando…");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: new FormData(form).get("website") }),
      });
      if (!res.ok) throw new Error(((await res.json().catch(() => null)) as { error?: string } | null)?.error);
      form.reset();
      setStatus("Mensagem enviada! Retornaremos em breve.");
    } catch (err) {
      setStatus(`${(err as Error).message || "Não foi possível enviar agora."} Tente pelo WhatsApp.`);
    } finally {
      setSending(false);
    }
  };

  // Keeps a real link (works without JS / middle-click); only adds the pre-filled text on click.
  const onWhatsApp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const text = formRef.current ? contactText(read(formRef.current)) : "";
    e.currentTarget.href = `${contact.whatsappHref}?text=${encodeURIComponent(text || "Olá! Vim pelo site da Xplora e quero falar sobre um projeto.")}`;
  };

  return (
    <section id="contato" className="border-t py-band">
      <div className="wrap grid gap-[clamp(40px,6vw,96px)] min-[861px]:grid-cols-2">
        <div>
          <SectionLabel>[ 07 ] Contato</SectionLabel>
          <h2 className="text-display-l text-balance uppercase">
            Tem uma ideia <em>para tirar</em> do papel?
          </h2>
          <p className="mt-6 max-w-[56ch] text-[17px] text-dim">Conte o que você quer criar. A primeira conversa é por nossa conta.</p>
        </div>

        <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-1">
          <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <input name="nome" aria-label="Seu nome" placeholder="Seu nome" autoComplete="name" required className={field} />
          <input name="email" type="email" aria-label="E-mail" placeholder="E-mail" autoComplete="email" required className={field} />
          <input name="empresa" aria-label="Empresa (opcional)" placeholder="Empresa (opcional)" autoComplete="organization" className={field} />

          <fieldset className="mt-[22px]">
            <legend className="mono-label text-dim">O que você precisa?</legend>
            <div className="flex flex-wrap gap-2 py-5">
              {services.map((s) => (
                <label key={s} className="cursor-pointer">
                  <input type="checkbox" name="servico" value={s} className="peer sr-only" />
                  <span className="block rounded-full border border-line-2 px-4 py-2.5 text-sm text-dim transition-colors peer-checked:border-blue peer-checked:bg-blue peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue hover:border-blue">
                    {s}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <textarea name="msg" rows={3} aria-label="Conte sobre o projeto" placeholder="Conte sobre o projeto" className={field} />

          <button
            type="submit"
            disabled={sending}
            className="mt-4 flex min-h-16 cursor-pointer items-center justify-between rounded border border-line-2 px-5 text-base font-semibold text-sand transition-colors hover:border-blue disabled:cursor-wait disabled:opacity-60"
          >
            {sending ? "Enviando…" : "Enviar mensagem"} <ArrowUpRight className="size-5" aria-hidden="true" />
          </button>
          <a href={contact.whatsappHref} onClick={onWhatsApp} target="_blank" rel="noopener noreferrer" className="flex min-h-16 items-center justify-between rounded bg-blue px-5 font-semibold text-white transition-colors hover:bg-blue-hover">
            Resposta rápida pelo WhatsApp <ArrowUpRight className="size-5" aria-hidden="true" />
          </a>
          <p role="status" className="mt-2 min-h-6 text-blue">
            {status}
          </p>
        </form>
      </div>
    </section>
  );
}
