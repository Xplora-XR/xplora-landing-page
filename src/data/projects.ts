// PROVISÓRIO: sample projects from the mock. Real cases and videos replace these.

export type Project = {
  title: string;
  category: string;
  href: string;
  /** Short muted loop (mp4/webm). Until it exists the card shows `colors` as an animated gradient. */
  video?: string;
  poster?: string;
  /** Two-stop gradient used as the fallback picture. */
  colors: [string, string];
};

export const projects: Project[] = [
  { title: "Tour imersivo de empreendimento", category: "Realidade Virtual", href: "#projetos", colors: ["#2B73DF", "#234982"] },
  { title: "Ativação AR em evento", category: "Realidade Aumentada", href: "#projetos", colors: ["#326DB1", "#10141C"] },
  { title: "Treinamento de segurança", category: "Realidade Virtual", href: "#projetos", colors: ["#4C8DF0", "#212833"] },
  { title: "Catálogo de produtos 3D", category: "WebAR", href: "#projetos", colors: ["#234982", "#2B73DF"] },
  { title: "Showroom virtual", category: "Experiência imersiva", href: "#projetos", colors: ["#1B2A44", "#326DB1"] },
  { title: "Embalagem interativa", category: "Realidade Aumentada", href: "#projetos", colors: ["#2B73DF", "#0B0E14"] },
];

export type FeaturedProject = Omit<Project, "category"> & { summary: string };

export const featuredProject: FeaturedProject = {
  title: "Nome do projeto principal em VR",
  summary: "Espaço para o case mais forte da Xplora: vídeo demonstrativo grande, uma frase de contexto e o resultado.",
  href: "#projetos",
  colors: ["#2B73DF", "#234982"],
};
