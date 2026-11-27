export type ContactData = { nome: string; email: string; empresa: string; servicos: string[]; msg: string };

export const isValidContact = (d: ContactData) => d.nome.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email);

/** Plain-text summary shared by the e-mail body and the WhatsApp pre-filled message. */
export function contactText(d: ContactData) {
  const lines = [];
  if (d.nome) lines.push(`Nome: ${d.nome}`);
  if (d.email) lines.push(`E-mail: ${d.email}`);
  if (d.empresa) lines.push(`Empresa: ${d.empresa}`);
  if (d.servicos.length) lines.push(`Interesse: ${d.servicos.join(", ")}`);
  if (d.msg) lines.push("", d.msg);
  return lines.join("\n");
}
