# Masonry Lightbox
- id (demo): 26223 · url: https://21st.dev/@ayushmxxn/components/masonry-lightbox · autor: ayushmxxn
- favorito: NOVO
- licença: não informada no registro 21st. Conferir termos.
- dependências npm: framer-motion, next (só `next/image`), react-dom (createPortal). Tailwind v4 (`bg-linear-to-t`).
- revisão de segurança: APROVADO. Sem script/fetch/eval. Imagens padrão de cdn.21st.dev trocadas por `/img/galeria-N.jpg` locais.
- reduced-motion: ok (`useReducedMotion`).
- celular: 2 colunas, toque abre o lightbox; legenda de hover não aparece no toque (a legenda existe dentro do lightbox).
- como adaptar: se o projeto não for Next, trocar `next/image` por `<img loading="lazy" decoding="async" width height>`; fundos `neutral-900`/preto -> tokens da paleta; informar width/height reais; WebP <= 200 KB; adicionar foco preso e `aria-modal` no lightbox; remover legendas que não sejam úteis; alt real em português.
