# Xplora — Landing v1: decisões visuais (rascunho)

Mock HTML: `design/mock/index.html` (também em https://claude.ai/artifact/UvEEZpjL1xHeqF6fK9wG2V)
Referência principal: melted.studio (estrutura e ritmo). Secundárias: 8thwall.org (logo em grade de pontos que reage ao mouse), treeview.studio (cards de case com vídeo).

## Identidade (do arquivo Figma "Xplora Visual Identity")
- main-blue #2B73DF · azuis de apoio #326DB1, #234982
- main-sand / main-white #FFFBF6 (variação #FFFCF5)
- main-gray #4F607A · secondary-gray (navy) #212833
- Tipografia: Geist (títulos e textos, tracking -3%). Logotipo "xplora" em Neue Machina Ultrabold (+8%), usado só no logo.

## Tokens do mock (tema escuro único, como no Melted)
- bg #0B0E14 · bg-2 #10141C · surface #161B25 · navy #212833
- texto #FFFBF6 · texto secundário #9AA6B8 · linhas rgba(255,251,246,.09)
- acento único: #2B73DF (faz o papel do verde-limão do Melted)
- Títulos: Geist 900, caixa-alta, tracking -0.04em, line-height .92; palavra de ênfase em itálico azul
- Micro-rótulos: Geist Mono 11px, caixa-alta, tracking .14em
- Botões em pílula azul com círculo de seta que gira -45° no hover

## Estrutura (ordem das seções)
1. Header fixo: logo · Sobre/Soluções/Processo/Projetos/Contato · CTA "Solicitar proposta". Barra de progresso azul de 2px no topo.
2. Hero: headline gigante à esquerda + **X em nuvem de pontos** (canvas) à direita, metadados mono nos cantos, dica "[ interativo ] passe o mouse sobre o X".
3. [01] Sobre: título, parágrafo, pilares P/01 e P/02, e um óculos VR em nuvem de pontos (canvas, sticky).
4. [02] Soluções: lista em linhas (/01 a /05) com hover de brilho azul.
5. [03] Processo: 3 etapas numa linha do tempo.
6. [04] Projetos: carrossel arrastável de cards 4:5 com vídeo + um "Projeto em destaque" com vídeo 16:9.
7. [05] Por que XR: 3 números grandes (360°, 6DoF, 0 apps).
8. Marquee de logos de clientes (2 linhas, sentidos opostos).
9. [06] Depoimentos (3 cards).
10. CTA central "Vamos xplorar juntos?"
11. [07] Contato: formulário com chips de serviço + botão de WhatsApp.
12. Footer + marquee de palavras-chave.

## Nuvem de pontos (hero)
- Amostrar o glifo "X" (Geist 900) num canvas fora da tela, com passo de 4px (6px no mobile), mais profundidade z aleatória e cerca de 260 pontos de poeira.
- Rotação 3D lenta em Y, seguindo o mouse (paralaxe), com projeção em perspectiva.
- Hover: os pontos num raio de ~120px são repelidos e voltam por mola (k .055, atrito .86); os pontos próximos acendem em #FFFBF6.
- Com prefers-reduced-motion: sem rotação nem brilho piscando.
- Para produção: avaliar trocar o glifo pelo símbolo oficial ou por um .ply/.glb amostrado (three.js Points).

## Cards de projeto (vídeo)
- `<video muted loop playsinline preload="metadata" poster>`: no desktop toca no hover, no mobile quando entra na tela (IntersectionObserver).
- Overlay: índice /0N em azul, título, categoria em mono e "Ver projeto ↗" que sobe no hover. Zoom de 1.06 no vídeo.

## Pendências
- SVG oficial do símbolo e do logotipo (o mock usa um símbolo provisório).
- Projetos e vídeos reais, logos de clientes, depoimentos reais e contatos.
- Confirmar a lista de soluções e se a visualização arquitetônica continua como serviço.
- Figma: a cota de chamadas do MCP no plano Starter esgotou em 26/11/2026; a construção no Figma ficou pendente.
