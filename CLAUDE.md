# Villa Aurora Espaço & Buffet — site Lynx

- **Cliente:** modelo de nicho (espaço de eventos + buffet), nome fictício
- **Modo:** demonstração para prospecção — trocar tudo entre [colchetes]
- **Objetivo:** orçamento/visita pelo WhatsApp (55DDDNUMERO)
- **Stack:** Vite 8 + React 19 + TypeScript + Tailwind v4 (@tailwindcss/vite) + shadcn (components.json, `src/components/ui/`) · motion e embla só em chunks lazy · ícones Phosphor · fontes auto-hospedadas (@fontsource) · build `npm run build` → `dist/`
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
