# Plano de design - Villa Aurora Espaço & Buffet

21st.dev conectado (conta do Nicolas). Skill design-taste-frontend seguida. Design Read: landing de espaço de eventos para famílias e noivos no celular, linguagem acolhedora e elegante, base Tailwind v4 + React (Vite ou Next) + Motion. Dials: VARIANCE 6, MOTION 5, DENSITY 3.

## Direção visual
Fotos grandes e quentes, tipografia serifada elegante só nos títulos, fundo rosado claro com verde-floresta profundo nos botões e um único acento terracota; festivo sem ser infantil.

## Paleta (contraste calculado, WCAG AA)
| Papel | Claro | Escuro | Contraste |
|---|---|---|---|
| Fundo | #FBF5F2 | #1B1417 | texto/fundo 14,87 (claro) · 15,32 (escuro) |
| Superfície | #F2E4DE | #2A1F24 | texto/superfície 12,95 · 13,45 |
| Texto | #2A1E22 | #F4EAE6 | - |
| Texto suave | #5E4A50 | #C9B6BC | 7,56 sobre fundo · 6,58 sobre superfície · 9,41 escuro |
| Primária (botões, links) | #14584A | #5FC4AE | branco sobre primária 8,32 · texto escuro sobre primária escura 8,62 |
| Secundária (faixas, selos) | #E9D5CF | #3A2A31 | decorativa, sem texto pequeno |
| Destaque (1 só, detalhes e preços) | #AA3C25 | #F08A70 | 5,75 sobre fundo · 5,00 sobre superfície · 7,40 escuro |
Regras: sem preto/branco puros; destaque usado igual em toda a página; raio único 12px (botões, cards e inputs); tema: segue `prefers-color-scheme`, tokens em CSS variables.
Evitadas de propósito: família bege+latão+espresso e vermelho oxblood.

## Fontes (Google, auto-hospedar com font-display swap)
1. Títulos: Cormorant Garamond 600 (serifa justificada por casamento e 15 anos; só em tamanhos grandes).
2. Corpo e botões: Outfit 400/500/600.

## Seção -> componente
| Seção | Componente | Favorito | Por quê | Celular | Reduced-motion |
|---|---|---|---|---|---|
| Hero | Editorial Image Hero (id 19077) + efeito CSS à mão | novo | foto grande, título curto, CTA WhatsApp visível; cabe na dobra | foto 2:1, texto empilhado, CTA em largura total | animação desligada, imagem estática |
| Efeito "uau" (único) | revelar a foto do salão ao rolar: `animation-timeline: view()` + `clip-path` (inspirado no 1932, sem hijack) | candidato (1932, favorito antigo) | o original trava o scroll com wheel/touch e `window scroll`, ruim no celular | rolagem normal; sem suporte a view() = foto estática | estático |
| Serviços / pacotes | Service Card (id 8223) | novo | 6 festas + 3 cardápios, cada card leva ao orçamento | 1 coluna, toque no link; sem depender de hover | remover hover/seta infinita |
| Sobre / estrutura do espaço | fazer à mão (mosaico de 3-5 fotos reais com texto: salão climatizado, área kids, cozinha própria, estacionamento, acessibilidade) | - | nenhum componente do 21st combinou sem ficar tech | colunas viram pilha | sem animação |
| Galeria | Masonry Lightbox (id 26223) | novo | prova visual, toque abre foto grande | 2 colunas | `useReducedMotion` nativo |
| Prova social | Testimonial Carousel (id 19099) | novo | swipe nativo; só entra com depoimento real, senão a seção some | 1 slide, dots | sem autoplay |
| Pedir orçamento | fazer à mão: formulário curto (data, convidados, tipo de festa) que monta a mensagem do WhatsApp; sem backend | - | objetivo nº 1 do briefing | campos grandes, botão fixo "Pedir orçamento" | sem animação |
| FAQ | Single Open Accordion (id 37545) | novo | tira dúvidas de reserva e visita | largura total, toque | `motion-reduce:transition-none` |
| Localização | fazer à mão: endereço + horário + botão "Como chegar" (link do Google Maps; sem iframe no carregamento) | - | leve e sem terceiros | botão grande | - |
| Rodapé | fazer à mão: nome, WhatsApp, Instagram, horário, endereço | - | simples, sem newsletter | pilha | - |
Microinterações (máx. 2): cartão de serviço no toque/hover e abrir/fechar do FAQ. Marquee: nenhum. Mesmo rótulo de CTA em toda a página: "Pedir orçamento".

## Regras de adaptação (valem para todos)
- Trocar `lucide-react` por `@phosphor-icons/react`; um único peso de traço.
- Todas as imagens locais em `/img/` (WebP), com `alt` em português e marcação `[trocar]`.
- Sem eyebrows em caps (no máximo 1 a cada 3 seções), sem travessão, sem números ou depoimentos inventados.
- Hero: título até 2 linhas, subtexto até 20 palavras, no máximo 4 elementos de texto.

## Tema do 21st
Busca de temas retornou vazio ("warm elegant", "cream rose gold"). Nenhum tema usado; tokens definidos acima.

## Segurança e licenças
Os 5 componentes baixados passaram na checagem: nenhum `<script>`, fetch/XHR, eval/new Function ou dangerouslySetInnerHTML; mídia de CDN de terceiros (cdn.21st.dev, thiings.co) trocada por locais nas demos. Dependências: motion/framer-motion, react-wrap-balancer, class-variance-authority, @radix-ui/react-slot, embla-carousel-react, lucide-react (substituir), next (só `next/image`, substituível). Licença: o registro do 21st não informa; está anotado em cada NOTA.md para conferir os termos do site.
Reprovado como está: Scroll media expansion hero (id 1932), por prender o scroll (preventDefault em wheel/touch), usar `window scroll` e `useState` por frame, sem reduced-motion e com iframe opcional do YouTube.

## Favoritos (lista "Lynx · Espaço e Buffet", criada agora, id 7d6ae46f-1668-402f-8eeb-0d928a6c0a0c)
- Escolhidos (5): 19077, 8223, 26223, 19099, 37545.
- Candidatos para nichos futuros (3): 1932 (hero com expansão ao rolar, refazer sem hijack), 24752 (Hero Carousel de fotos), 10596 (galeria filtrável com lightbox).
- Favoritos antigos (data-rain, background boxes, tiger tear, orbit delivery, marquee SVG, text cursor proximity, reveal text, tabs animadas): mantidos, não servem ao nicho (tech/cursor/3D). Nada foi removido.

## Cota
Plano pago, retrievals diários sem limite informado (`remaining: null`); 6 `get_component` usados (5 aprovados + hero extra); créditos de IA 0 (geração desligada, não usada).

## Pendências para a construção
- Escolher a stack (React + Vite + Tailwind v4 é o mais simples para Netlify) e rodar `shadcn init` com os tokens acima.
- Fotos reais ou geradas para `/img/` (hero 1600x800, galeria, serviços).
- Dados reais do cliente nos [colchetes].
