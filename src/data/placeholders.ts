// PROVISÓRIO: everything here is placeholder content. Swap in real data before launch.
// Do not replace with invented clients, quotes or contacts (see PRODUCT.md → Evidence on Hand).

export const clients = Array.from({ length: 10 }, (_, i) => `Cliente ${String(i + 1).padStart(2, "0")}`);

export type Testimonial = { quote: string; name: string; role: string; avatar?: string };

export const testimonials: Testimonial[] = Array.from({ length: 3 }, () => ({
  quote: "Espaço para um depoimento real de cliente: uma ou duas frases sobre o resultado da experiência.",
  name: "Nome do cliente",
  role: "Cargo · Empresa",
}));

export const contact = {
  email: "contato@xplora.com.br",
  phone: "+55 00 00000-0000",
  /** e.g. https://wa.me/55XXXXXXXXXXX */
  whatsappHref: "#contato",
};

export const socials = [
  { label: "Instagram", href: "#top" },
  { label: "LinkedIn", href: "#top" },
  { label: "WhatsApp", href: "#top" },
];
