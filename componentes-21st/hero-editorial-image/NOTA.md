# Editorial Image Hero
- id (demo): 19077 · url: https://21st.dev/@felipemenezes098/components/hero-07 · autor: felipemenezes098 (flexnative)
- favorito: NOVO (lista "Lynx · Espaço e Buffet")
- licença: não informada no registro 21st (público). Conferir termos do 21st.dev/flexnative antes de uso comercial amplo.
- dependências npm: motion, react-wrap-balancer, class-variance-authority, @radix-ui/react-slot; shadcn `button`; Tailwind v4 (usa `mask-b-from-80%`).
- revisão de segurança: APROVADO. Sem script externo, fetch, eval ou dangerouslySetInnerHTML. Sem mídia de CDN (imagem vem por prop).
- reduced-motion: ok (`useReducedMotion`; animação só com `animation="subtle"`).
- faltava no registro: `hero-07-utils/cta` -> escrito à mão em `cta.tsx`.
- como adaptar: `font-serif` = Cormorant Garamond (ver plano-design.md); trocar tokens shadcn pela paleta; tagline curta (1 elemento pequeno, sem eyebrow caps); foto local `/img/hero-salao.jpg` (trocar); CTA primário = WhatsApp (mensagem do briefing); secundário "Ver pacotes". Efeito "uau" (feito à mão, CSS): na imagem, `animation-timeline: view()` com `clip-path` inset -> 0 ao rolar, dentro de `@supports`, estático em reduced-motion. Sem hijack de scroll.
