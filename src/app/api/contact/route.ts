import { contactText, isValidContact } from "@/lib/contact";

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return Response.json({ error: "Requisição inválida." }, { status: 400 });

  // Honeypot: real visitors never fill the hidden "website" field; pretend success to bots.
  if (str(body.website, 200)) return Response.json({ ok: true });

  const data = {
    nome: str(body.nome, 120).replace(/\s+/g, " "),
    email: str(body.email, 200),
    empresa: str(body.empresa, 120),
    servicos: Array.isArray(body.servicos) ? body.servicos.map((s: unknown) => str(s, 60)).filter(Boolean).slice(0, 10) : [],
    msg: str(body.msg, 5000),
  };
  if (!isValidContact(data)) return Response.json({ error: "Preencha nome e um e-mail válido." }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!key || !to) {
    console.error("contact: RESEND_API_KEY or CONTACT_TO is not set");
    return Response.json({ error: "Envio indisponível no momento." }, { status: 500 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      // shortcut: resend.dev sender only delivers to the Resend account owner; set CONTACT_FROM after verifying the domain.
      from: process.env.CONTACT_FROM || "Xplora Site <onboarding@resend.dev>",
      to: [to],
      reply_to: data.email,
      subject: `Projeto XR · ${data.nome}`,
      text: contactText(data),
    }),
  });
  if (!res.ok) {
    console.error("contact: resend failed", res.status, await res.text());
    return Response.json({ error: "Não foi possível enviar agora." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
