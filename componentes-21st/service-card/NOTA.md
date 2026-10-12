# Service Card
- id (demo): 8223 · url: https://21st.dev/@lavikatiyar/components/service-card · autor: lavikatiyar
- favorito: NOVO
- licença: não informada no registro 21st. Conferir termos.
- dependências npm: framer-motion, class-variance-authority, lucide-react (trocar por Phosphor); shadcn `cn`.
- revisão de segurança: APROVADO. Código sem script/fetch/eval. A demo original usava imagens de thiings.co (CDN de terceiros): trocado por arquivos locais em `demo.tsx`.
- reduced-motion: NÃO tratado no original. Adaptar: `useReducedMotion()` e desligar `whileHover`/seta infinita.
- celular: hover não existe; o card continua legível e o link ("Pedir orçamento") funciona ao toque.
- como adaptar: remover variantes `red`/`blue` (cores fora da paleta); usar `default`/`gray` com tokens; texto do link "LEARN MORE" -> "Pedir orçamento" (WhatsApp com tipo de festa); `aria-label` em português; ilustração/foto local 160px; 6 serviços do briefing em grade 1 col (celular) / 2 col (md). Não repetir a mesma estrutura de grade em outra seção.
