# Villa Aurora Espaço & Buffet — site Lynx

- **Cliente:** modelo de nicho (espaço de eventos + buffet), nome fictício
- **Modo:** demonstração para prospecção — trocar tudo entre [colchetes]
- **Objetivo:** orçamento/visita pelo WhatsApp (55DDDNUMERO)
- **Stack:** Vite 8 + React 19 + TypeScript + Tailwind v4 (@tailwindcss/vite) + shadcn (components.json, `src/components/ui/`) · motion (LazyMotion/domAnimation) no pacote principal, embla em chunk lazy · ícones Phosphor · fontes auto-hospedadas (@fontsource) · build `npm run build` → `dist/`
- **Deploy:** Netlify (netlify.toml)
- **Status:** pronto para publicar (modelo de nicho; trocar espaços reservados e fotos — ver `public/img/CREDITOS.md`)

## Arquivos de trabalho
- briefing.md · plano-design.md · conteudo.md · componentes-21st/

## Regras
- Siga a skill lynx-criar-site (Regras do site + Checklist).
- Nunca ler node_modules/, dist/, .netlify/, .env.
- Nenhum segredo no repositório. Nada de depoimento/número inventado.

## Onde trocar os dados
- `src/lib/site.ts`: WhatsApp (55DDDNUMERO), cidade, endereço, horário, Instagram, preços, FAQ, depoimentos (vazio = seção oculta).
- `index.html`: title, description, OG, canonical e JSON-LD ([dominio], [Cidade-UF]).
- `public/`: _headers (CSP), robots.txt, sitemap.xml, politica-de-privacidade.html, obrigado.html.
- Fotos: `npm run imagens -- <pasta>` (scripts/imagens.mjs) gera WebP, og-image, favicon e apple-touch-icon.

## Animações (Motion + CSS, todas respeitam prefers-reduced-motion)
- Hero: título revelado por linhas, foto com aproximação + parallax, brilhos dourados (canvas leve).
- Faixa cinética dos tipos de festa (reage à velocidade da rolagem), títulos revelados por palavra.
- Cards com entrada em cascata e inclinação 3D só com mouse; fotos do "Sobre" reveladas por máscara.
- Passos do orçamento com linha que preenche ao rolar; cabeçalho que some ao descer; barra de progresso.
- Botão fixo do WhatsApp aparece após o topo e pulsa; View Transitions entre páginas.
- Cabeçalho de vidro flutuante (Liquid Glass, filtro SVG #vidro); palavra que alterna no topo; CTA magnético.
- Galeria horizontal ligada à rolagem (motion.dev).
- Formulário: tipos de festa em chips, Border Beam (Magic UI) na borda e confete ao enviar.
- Hero em tela cheia (foto + título grande sobre a imagem); cabeçalho fixo de vidro por cima.
- Festas em grade bento (bento-festas.tsx); cardápios em abas com direção (abas-cardapio.tsx).
- Chamada final com gradiente WebGL nas cores da marca (gradiente-shader.tsx, mesh gradient do 21st).
- Foto que se expande ao rolar (foto-expande.tsx); "O espaço" com foto fixa que troca (Sticky Scroll Reveal).
- Perguntas em 2 colunas; Como chegar com cartão de vidro sobre foto; rodapé com marca gigante e feixe.
- Cursor (só mouse): etiqueta em [data-cursor], anel terracota, rastro de fotos no título das festas, borda que acende (BordaAcesa).
- Abertura (loader) em CSS no index.html: 1ª visita da sessão, some sozinha (~2 s).
- Fotos do Sobre com inclinação 3D que endireita ao rolar; convidados com botões −/+.
- Vídeo opcional no topo: `HERO_VIDEO` em `src/lib/site.ts` (arquivo em `public/video/`).
- Efeitos reaproveitáveis em `src/components/ui/efeitos.tsx` e `revelar.tsx`.
