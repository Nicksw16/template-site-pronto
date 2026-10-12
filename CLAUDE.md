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
- Galeria horizontal ligada à rolagem (motion.dev); chamada final com fundo Aurora (Aceternity).
- Formulário: tipos de festa em chips, Border Beam (Magic UI) na borda e confete ao enviar.
- Efeitos reaproveitáveis em `src/components/ui/efeitos.tsx` e `revelar.tsx`.
