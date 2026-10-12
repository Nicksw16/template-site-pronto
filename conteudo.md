# Conteúdo — Villa Aurora Espaço & Buffet

> Tudo entre [colchetes] é espaço reservado: trocar pelos dados reais antes de publicar.
> Sem depoimentos, números, prêmios, endereço ou telefone inventados.
> Palavra-chave principal: espaço para festas + buffet em [Cidade - UF].

## 0. Links do WhatsApp (wa.me)

Número: `55DDDNUMERO` (trocar por 55 + DDD + número, só dígitos).
Mensagem base: `Olá! Vi o site da Villa Aurora e quero um orçamento. Data: __ · Convidados: __ · Tipo de festa: __`
No código, montar sempre com `encodeURIComponent`:

```js
const WA = "55DDDNUMERO";
const link = (msg) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
const base = "Olá! Vi o site da Villa Aurora e quero um orçamento. Data: __ · Convidados: __ · Tipo de festa: ";
// link(base + "Casamento")
```

| Uso | Tipo de festa na mensagem | Link pronto |
|---|---|---|
| Geral (hero, header, rodapé, botão fixo) | `__` | https://wa.me/55DDDNUMERO?text=Ol%C3%A1!%20Vi%20o%20site%20da%20Villa%20Aurora%20e%20quero%20um%20or%C3%A7amento.%20Data%3A%20__%20%C2%B7%20Convidados%3A%20__%20%C2%B7%20Tipo%20de%20festa%3A%20__ |
| Festa infantil | Festa infantil | https://wa.me/55DDDNUMERO?text=Ol%C3%A1!%20Vi%20o%20site%20da%20Villa%20Aurora%20e%20quero%20um%20or%C3%A7amento.%20Data%3A%20__%20%C2%B7%20Convidados%3A%20__%20%C2%B7%20Tipo%20de%20festa%3A%20Festa%20infantil |
| 15 anos | 15 anos | https://wa.me/55DDDNUMERO?text=Ol%C3%A1!%20Vi%20o%20site%20da%20Villa%20Aurora%20e%20quero%20um%20or%C3%A7amento.%20Data%3A%20__%20%C2%B7%20Convidados%3A%20__%20%C2%B7%20Tipo%20de%20festa%3A%2015%20anos |
| Casamento | Casamento | https://wa.me/55DDDNUMERO?text=Ol%C3%A1!%20Vi%20o%20site%20da%20Villa%20Aurora%20e%20quero%20um%20or%C3%A7amento.%20Data%3A%20__%20%C2%B7%20Convidados%3A%20__%20%C2%B7%20Tipo%20de%20festa%3A%20Casamento |
| Aniversário adulto | Aniversário adulto | https://wa.me/55DDDNUMERO?text=Ol%C3%A1!%20Vi%20o%20site%20da%20Villa%20Aurora%20e%20quero%20um%20or%C3%A7amento.%20Data%3A%20__%20%C2%B7%20Convidados%3A%20__%20%C2%B7%20Tipo%20de%20festa%3A%20Anivers%C3%A1rio%20adulto |
| Corporativo | Corporativo | https://wa.me/55DDDNUMERO?text=Ol%C3%A1!%20Vi%20o%20site%20da%20Villa%20Aurora%20e%20quero%20um%20or%C3%A7amento.%20Data%3A%20__%20%C2%B7%20Convidados%3A%20__%20%C2%B7%20Tipo%20de%20festa%3A%20Corporativo |
| Chá de bebê/revelação | Chá de bebê/revelação | https://wa.me/55DDDNUMERO?text=Ol%C3%A1!%20Vi%20o%20site%20da%20Villa%20Aurora%20e%20quero%20um%20or%C3%A7amento.%20Data%3A%20__%20%C2%B7%20Convidados%3A%20__%20%C2%B7%20Tipo%20de%20festa%3A%20Ch%C3%A1%20de%20beb%C3%AA%2Frevela%C3%A7%C3%A3o |
| Buffet Clássico | `... Tipo de festa: __ · Cardápio: Buffet Clássico` | https://wa.me/55DDDNUMERO?text=Ol%C3%A1!%20Vi%20o%20site%20da%20Villa%20Aurora%20e%20quero%20um%20or%C3%A7amento.%20Data%3A%20__%20%C2%B7%20Convidados%3A%20__%20%C2%B7%20Tipo%20de%20festa%3A%20__%20%C2%B7%20Card%C3%A1pio%3A%20Buffet%20Cl%C3%A1ssico |
| Buffet Premium | `... Cardápio: Buffet Premium` | https://wa.me/55DDDNUMERO?text=Ol%C3%A1!%20Vi%20o%20site%20da%20Villa%20Aurora%20e%20quero%20um%20or%C3%A7amento.%20Data%3A%20__%20%C2%B7%20Convidados%3A%20__%20%C2%B7%20Tipo%20de%20festa%3A%20__%20%C2%B7%20Card%C3%A1pio%3A%20Buffet%20Premium |
| Coquetel/Finger food | `... Cardápio: Coquetel/Finger food` | https://wa.me/55DDDNUMERO?text=Ol%C3%A1!%20Vi%20o%20site%20da%20Villa%20Aurora%20e%20quero%20um%20or%C3%A7amento.%20Data%3A%20__%20%C2%B7%20Convidados%3A%20__%20%C2%B7%20Tipo%20de%20festa%3A%20__%20%C2%B7%20Card%C3%A1pio%3A%20Coquetel%2FFinger%20food |
| Agendar visita | mensagem própria | https://wa.me/55DDDNUMERO?text=Ol%C3%A1!%20Vi%20o%20site%20da%20Villa%20Aurora%20e%20quero%20agendar%20uma%20visita.%20Data%3A%20__%20%C2%B7%20Convidados%3A%20__%20%C2%B7%20Tipo%20de%20festa%3A%20__ |

Botão fixo no celular: "Pedir orçamento pelo WhatsApp" → link geral. Todos os links com `target="_blank" rel="noopener"`.

---

## 1. Metadados

- **title** (≤ 60): `Villa Aurora | Espaço e Buffet para Festas em [Cidade-UF]`
- **meta description** (≤ 155): `Salão climatizado com buffet próprio para festa infantil, 15 anos, casamento e confraternização em [Cidade-UF]. Peça seu orçamento pelo WhatsApp.`
- **og:title:** `Villa Aurora: espaço e buffet para a sua festa em [Cidade-UF]`
- **og:description:** `Salão, cardápio e equipe no mesmo lugar. Conte a data, o número de convidados e o tipo de festa e receba seu orçamento pelo WhatsApp.`
- **og:type:** `website` · **og:locale:** `pt_BR` · **og:url / canonical:** `https://[dominio]/` · **og:image:** `https://[dominio]/img/og-villa-aurora.jpg` (1200x630, foto real do salão) · **twitter:card:** `summary_large_image`
- **lang:** `pt-BR` · **theme-color:** definir na paleta

**Alt das imagens** (trocar pela descrição da foto real):

| Imagem | Alt |
|---|---|
| hero | Salão da Villa Aurora decorado e iluminado para uma festa [foto de exemplo: trocar] |
| festa infantil | Mesa de festa infantil com doces e decoração no salão da Villa Aurora |
| 15 anos | Pista e mesa principal montadas para uma festa de 15 anos na Villa Aurora |
| casamento | Cerimônia e recepção de casamento no salão da Villa Aurora |
| aniversário adulto | Mesa de aniversário com petiscos e bebidas no salão da Villa Aurora |
| corporativo | Confraternização de empresa com mesas redondas na Villa Aurora |
| chá de bebê/revelação | Decoração de chá de bebê com balões e mesa de bolo na Villa Aurora |
| buffet clássico | Buffet clássico servido com pratos quentes e saladas |
| buffet premium | Buffet premium com estações de pratos e sobremesas |
| coquetel/finger food | Bandeja de finger food e canapés servida aos convidados |
| salão | Salão climatizado da Villa Aurora com mesas montadas |
| área kids | Brinquedoteca da Villa Aurora com brinquedos e espaço para as crianças |
| cozinha | Cozinha própria onde o buffet da Villa Aurora é preparado |
| fachada/estacionamento | Fachada e entrada da Villa Aurora em [Cidade-UF] |
| logo | Logo da Villa Aurora Espaço & Buffet |

---

## 2. Hero

- **Selo:** Espaço e buffet em [Cidade - UF]
- **H1:** Sua festa inteira num lugar só, em [Cidade - UF]
- **Subtítulo:** Salão climatizado, cozinha própria e equipe para cuidar de tudo. Conte a data, quantos convidados e o tipo de festa. Respondemos pelo WhatsApp com um orçamento.
- **Botão principal:** Pedir orçamento pelo WhatsApp → link geral
- **Botão secundário:** Ver tipos de festa → `#festas`
- **Linha de apoio (sob os botões):** Atendimento [Seg–Sex 9h–18h · Sáb 9h–13h] · Visitas com agendamento

Alternativas de H1: "Do convite ao último doce: a Villa Aurora cuida da sua festa" · "Espaço, buffet e equipe para o seu dia especial".

---

## 3. Tipos de festa (`#festas`)

**H2:** Que festa você vai fazer?
**Intro:** Escolha o tipo e abra a conversa já com a mensagem pronta.

| Card | Descrição (1 linha) | Preço | Botão |
|---|---|---|---|
| Festa infantil | Brinquedoteca, buffet para crianças e adultos e tempo para você curtir a festa. | A partir de [R$ por convidado] | Pedir orçamento → link Festa infantil |
| 15 anos | Salão pronto para a entrada, a valsa e a pista, com cardápio para todas as idades. | A partir de [R$ por convidado] | Pedir orçamento → link 15 anos |
| Casamento | Cerimônia e recepção no mesmo espaço, com buffet e equipe do começo ao fim. | A partir de [R$ por convidado] | Pedir orçamento → link Casamento |
| Aniversário adulto | Mesa farta, bebida gelada e salão climatizado para reunir a turma. | A partir de [R$ por convidado] | Pedir orçamento → link Aniversário adulto |
| Corporativo | Confraternização de fim de ano ou evento de empresa, com cardápio por pessoa. | A partir de [R$ por convidado] | Pedir orçamento → link Corporativo |
| Chá de bebê / revelação | Ambiente aconchegante para a família e os amigos, com mesa de bolo e doces. | A partir de [R$ por convidado] | Pedir orçamento → link Chá |

## 4. Cardápios

**H2:** Três cardápios, um para cada tipo de festa
**Intro:** Os valores mudam com a data e o número de convidados. Por isso o orçamento sai sob medida.

| Card | Descrição (1 linha) | Preço | Botão |
|---|---|---|---|
| Buffet Clássico | Pratos quentes, saladas e sobremesas no estilo almoço de família. [ajustar ao cardápio real] | A partir de [R$ por convidado] | Pedir orçamento → link Buffet Clássico |
| Buffet Premium | Mais opções de pratos, estações e sobremesas para uma festa mais sofisticada. [ajustar] | A partir de [R$ por convidado] | Pedir orçamento → link Buffet Premium |
| Coquetel / Finger food | Salgados e canapés servidos em bandeja, ideais para eventos mais curtos. [ajustar] | A partir de [R$ por convidado] | Pedir orçamento → link Coquetel |

Observação sob os cards: `[Informar o que está incluso: bebidas, bolo, garçons, decoração, taxa de serviço. Se não houver cardápio para restrição alimentar, remover a frase abaixo.]` Fazemos adaptações para [alergias e restrições: confirmar].

---

## 5. Sobre e estrutura do espaço

**H2:** Um lugar pensado para receber
**Texto:**
A Villa Aurora reúne o salão, a cozinha e a equipe no mesmo endereço. Você fala com um único lugar sobre data, cardápio e organização, sem juntar fornecedores.

[Contar em 2 ou 3 frases a história real: quem fundou, desde quando, quantas festas por mês. Só com dados verdadeiros do cliente.]

**Estrutura (lista com ícones; trocar pelos dados reais):**
- Salão climatizado para até [X] convidados
- Área kids / brinquedoteca
- Cozinha própria: o buffet é preparado no local
- Estacionamento: [sim/não, quantas vagas]
- Acessibilidade: [rampa, banheiro adaptado, etc.]
- Equipe de [garçons / cozinha / recepção: confirmar]
- [Outros itens: gerador, som, palco, área externa]

**Botão:** Agendar uma visita → link Agendar visita
**Fotos:** salão, área kids, cozinha, estacionamento (ver alts na seção 1).

---

## 6. Prova social

**H2:** Quem já fez festa aqui
**Estado inicial (sem depoimento real):** Esta seção só aparece quando houver depoimentos reais. Enquanto isso, mostrar os blocos abaixo com os colchetes e ocultar na publicação.

- "[depoimento real do cliente]" · [Nome], [tipo de festa], [mês/ano]
- "[depoimento real do cliente]" · [Nome], [tipo de festa], [mês/ano]
- "[depoimento real do cliente]" · [Nome], [tipo de festa], [mês/ano]

**Linha de números (usar só se forem reais):** [X festas realizadas] · [X anos de casa] · [nota média no Google: X, com X avaliações]
**Instagram:** Veja festas reais no @[instagram] → `https://instagram.com/[instagram]`
**Galeria:** [fotos reais autorizadas pelos clientes]

---

## 7. Como pedir orçamento

**H2:** Orçamento em 3 passos
1. **Mande três informações.** Data da festa, número de convidados e tipo de festa. A mensagem já vem pronta no botão.
2. **Receba a proposta.** Respondemos pelo WhatsApp em [prazo de resposta: ex. até 1 dia útil] com valores e o que está incluso.
3. **Visite e reserve.** Conheça o espaço com hora marcada e garanta a data com [sinal / forma de reserva: confirmar].

**Botão:** Pedir orçamento pelo WhatsApp → link geral
**Linha abaixo:** Sem compromisso. Você só decide depois de ver a proposta.

---

## 8. Perguntas frequentes

**H2:** Dúvidas de quem está organizando a festa

1. **Quanto custa uma festa na Villa Aurora?**
   O valor é por convidado e muda conforme o cardápio, o dia da semana e a data. Os pacotes começam a partir de [R$ por convidado]. Para saber o valor da sua festa, mande a data, o número de convidados e o tipo de festa pelo WhatsApp.

2. **Para quantos convidados o salão comporta?**
   O salão comporta até [X] convidados sentados. Para festas menores, [informar se há outro ambiente ou número mínimo de convidados].

3. **O buffet já está incluso no aluguel do espaço?**
   [Confirmar com o cliente: buffet incluso no pacote ou contratado à parte.] O cardápio é preparado na cozinha própria, e o orçamento detalha o que está incluso: [bebidas, bolo, garçons, decoração, taxa de serviço].

4. **Com quanto tempo de antecedência devo reservar a data?**
   Para casamentos e 15 anos, o ideal é reservar com [X meses]. Festas infantis e aniversários costumam fechar com [X meses]. Datas de sábado e de fim de ano acabam primeiro. Consulte a disponibilidade pelo WhatsApp.

5. **Posso conhecer o espaço antes de fechar?**
   Sim. As visitas são com agendamento, em [Seg–Sex 9h–18h · Sáb 9h–13h]. Peça pelo botão "Agendar uma visita".

6. **Como funciona o pagamento e a reserva da data?**
   [Informar: sinal de X% para reservar, parcelamento, formas de pagamento aceitas. Confirmar com o cliente.]

7. **Tem opção para criança, alergia ou restrição alimentar?**
   [Confirmar com o cliente.] Conte as restrições dos convidados ao pedir o orçamento. A equipe avalia as adaptações possíveis no cardápio.

*(Opcional, se o cliente confirmar: "Posso levar decoração, bolo ou doces de fora?" e "Qual a duração da festa?")*

---

## 9. Localização e horário

**H2:** Como chegar
- **Endereço:** [Rua, nº, Bairro, Cidade - UF, CEP]
- **Mapa:** [incorporar Google Maps do endereço real; título do iframe: "Mapa da Villa Aurora em [Cidade-UF]"]
- **Atendimento:** [Seg–Sex 9h–18h · Sáb 9h–13h]
- **Visitas:** com agendamento pelo WhatsApp
- **Estacionamento:** [sim/não]
- **Atendemos:** [Cidade] e região: [bairros / cidades vizinhas]
- **Instagram:** @[instagram]
- **Botões:** Pedir orçamento pelo WhatsApp · Abrir no mapa (`https://www.google.com/maps/search/?api=1&query=[endereço codificado]`)

---

## 10. Rodapé

- **Marca:** Villa Aurora Espaço & Buffet
- **Linha:** Espaço e buffet para festas em [Cidade - UF].
- **Contato:** WhatsApp [(DDD) número] · Instagram @[instagram] · [e-mail]
- **Endereço:** [Rua, nº, Bairro, Cidade - UF, CEP]
- **Horário:** [Seg–Sex 9h–18h · Sáb 9h–13h]
- **Links:** Festas · Cardápios · O espaço · Perguntas · Política de Privacidade (`/politica-de-privacidade.html`)
- **Legal:** © [ano] Villa Aurora Espaço & Buffet · CNPJ [CNPJ] · Site feito pela Lynx Automation (link opcional)
- **Aviso LGPD (rodapé do formulário/botão, se houver coleta):** Ao falar conosco pelo WhatsApp você concorda com o uso dos seus dados para o orçamento. Veja a Política de Privacidade.

---

## 11. JSON-LD (colar no `<head>` da home)

Trocar todos os valores entre colchetes. Remover `geo`, `sameAs` ou `priceRange` se o dado não existir. Não adicionar `aggregateRating` nem `review` sem avaliações reais e visíveis na página.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["EventVenue", "LocalBusiness"],
      "@id": "https://[dominio]/#negocio",
      "name": "Villa Aurora Espaço & Buffet",
      "alternateName": "Villa Aurora",
      "description": "Espaço de eventos com buffet próprio em [Cidade - UF] para festa infantil, 15 anos, casamento, aniversário adulto, confraternização corporativa e chá de bebê ou revelação.",
      "url": "https://[dominio]/",
      "image": [
        "https://[dominio]/img/og-villa-aurora.jpg",
        "https://[dominio]/img/salao.jpg"
      ],
      "logo": "https://[dominio]/img/logo.png",
      "telephone": "+55[DDD][NUMERO]",
      "email": "[email]",
      "priceRange": "[$$ ou faixa real]",
      "maximumAttendeeCapacity": "[X]",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "[Rua, nº]",
        "addressLocality": "[Cidade]",
        "addressRegion": "[UF]",
        "postalCode": "[CEP]",
        "addressCountry": "BR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "[latitude]",
        "longitude": "[longitude]"
      },
      "hasMap": "https://www.google.com/maps/search/?api=1&query=[endereço codificado]",
      "areaServed": { "@type": "City", "name": "[Cidade]" },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "[09:00]",
          "closes": "[18:00]"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "[09:00]",
          "closes": "[13:00]"
        }
      ],
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "Salão climatizado", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Área kids / brinquedoteca", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Cozinha própria", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Estacionamento", "value": "[true ou false]" },
        { "@type": "LocationFeatureSpecification", "name": "Acessibilidade", "value": "[true ou false]" }
      ],
      "makesOffer": [
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Festa infantil", "description": "Espaço com brinquedoteca e buffet." },
          "priceSpecification": { "@type": "UnitPriceSpecification", "price": "[valor]", "priceCurrency": "BRL", "unitText": "por convidado", "minPrice": "[valor]" }
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Festa de 15 anos", "description": "Salão e buffet para a festa de debutante." },
          "priceSpecification": { "@type": "UnitPriceSpecification", "price": "[valor]", "priceCurrency": "BRL", "unitText": "por convidado" }
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Casamento", "description": "Cerimônia, recepção e buffet no mesmo espaço." },
          "priceSpecification": { "@type": "UnitPriceSpecification", "price": "[valor]", "priceCurrency": "BRL", "unitText": "por convidado" }
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Aniversário adulto", "description": "Salão climatizado e buffet para aniversários." },
          "priceSpecification": { "@type": "UnitPriceSpecification", "price": "[valor]", "priceCurrency": "BRL", "unitText": "por convidado" }
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Confraternização corporativa", "description": "Eventos de empresa com cardápio por pessoa." },
          "priceSpecification": { "@type": "UnitPriceSpecification", "price": "[valor]", "priceCurrency": "BRL", "unitText": "por convidado" }
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Chá de bebê e revelação", "description": "Ambiente acolhedor com mesa de bolo e doces." },
          "priceSpecification": { "@type": "UnitPriceSpecification", "price": "[valor]", "priceCurrency": "BRL", "unitText": "por convidado" }
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Cardápios",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Buffet Clássico" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Buffet Premium" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Coquetel e Finger food" } }
        ]
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "orçamentos",
        "telephone": "+55[DDD][NUMERO]",
        "availableLanguage": "pt-BR",
        "url": "https://wa.me/55DDDNUMERO"
      },
      "sameAs": [
        "https://instagram.com/[instagram]",
        "[link do Google Business Profile]",
        "[link do Facebook, se existir]"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://[dominio]/#site",
      "url": "https://[dominio]/",
      "name": "Villa Aurora Espaço & Buffet",
      "inLanguage": "pt-BR",
      "publisher": { "@id": "https://[dominio]/#negocio" }
    },
    {
      "@type": "WebPage",
      "@id": "https://[dominio]/#pagina",
      "url": "https://[dominio]/",
      "name": "Villa Aurora | Espaço e Buffet para Festas em [Cidade-UF]",
      "isPartOf": { "@id": "https://[dominio]/#site" },
      "about": { "@id": "https://[dominio]/#negocio" },
      "inLanguage": "pt-BR"
    }
  ]
}
</script>
```

Notas: `price` e `minPrice` ficam como placeholder; sem preço real, remover `priceSpecification` inteiro. `priceRange` só com valor real. O schema deve refletir o que está visível na página.

---

## 12. sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://[dominio]/</loc>
    <lastmod>[AAAA-MM-DD]</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://[dominio]/politica-de-privacidade.html</loc>
    <lastmod>[AAAA-MM-DD]</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```

`obrigado.html` fica fora do sitemap e com `noindex`.

## 13. robots.txt

```
User-agent: *
Allow: /
Disallow: /obrigado.html

Sitemap: https://[dominio]/sitemap.xml
```

(Crawlers de busca e de IA ficam liberados para o site ser citado. Para bloquear só treino de modelos, adicionar grupos `User-agent: GPTBot` / `ClaudeBot` com `Disallow: /`, a critério do cliente.)

---

## 14. Política de Privacidade (`politica-de-privacidade.html`)

**Título:** Política de Privacidade
**Meta title:** `Política de Privacidade | Villa Aurora` · **meta robots:** `index, follow`
**Atualizada em:** [data]

**Quem somos (controlador).** Villa Aurora Espaço & Buffet, CNPJ [CNPJ], [endereço completo]. Responsável pelo tratamento de dados (encarregado): [nome], contato: [e-mail].

**Quais dados coletamos.**
- Pelo WhatsApp: seu nome, número de telefone e as informações que você enviar (data da festa, número de convidados, tipo de festa e restrições alimentares).
- No site: dados técnicos de navegação (endereço IP, tipo de aparelho e páginas visitadas) por meio de [ferramentas de análise e cookies: informar quais; se não houver, remover].

**Para que usamos.**
- Responder ao seu pedido, montar o orçamento e agendar visitas.
- Fazer a reserva e a execução do contrato, se você fechar a festa.
- Entender como o site é usado e melhorá-lo [se houver análise].
- Cumprir obrigações legais e fiscais.

**Base legal (LGPD, art. 7º).** Execução de procedimentos preliminares ao contrato a seu pedido, execução de contrato, cumprimento de obrigação legal e, quando for o caso, seu consentimento.

**Por quanto tempo guardamos.** Dados de orçamentos sem contratação: por até [12 meses]. Dados de clientes com contrato: pelo prazo exigido por lei fiscal e contábil ([5 anos]). Dados de navegação: por até [prazo da ferramenta]. Depois disso, apagamos ou anonimizamos.

**Com quem compartilhamos.** Não vendemos seus dados. Compartilhamos apenas com serviços necessários à operação: WhatsApp (Meta), [hospedagem do site], [ferramenta de análise], [contador], e autoridades quando a lei exigir.

**Seus direitos.** Você pode pedir confirmação do tratamento, acesso, correção, anonimização, portabilidade, eliminação dos dados, informação sobre compartilhamento e revogação do consentimento. Escreva para [e-mail do responsável]. Respondemos em até [15 dias].

**Segurança.** Usamos conexão segura (HTTPS) e limitamos o acesso aos dados à equipe que atende os pedidos.

**Cookies.** [Informar se o site usa cookies e quais. Se usar, incluir aviso de consentimento.]

**Mudanças.** Podemos atualizar esta política. A data de atualização fica no topo da página.

**Reclamações.** Se achar que seus dados foram tratados de forma indevida, você pode procurar a Autoridade Nacional de Proteção de Dados (ANPD): gov.br/anpd.

---

## 15. obrigado.html

- **title:** `Obrigado | Villa Aurora` · **meta robots:** `noindex, nofollow`
- **H1:** Recebemos o seu pedido
- **Texto:** Obrigado por falar com a Villa Aurora. Se o WhatsApp não abriu, toque no botão abaixo. Respondemos em [prazo: ex. até 1 dia útil] em [Seg–Sex 9h–18h · Sáb 9h–13h].
- **Botão principal:** Abrir o WhatsApp → link geral
- **Botão secundário:** Agendar uma visita → link Agendar visita
- **Link de apoio:** Voltar para o início → `/` · Siga @[instagram]
- **Dica (1 linha):** Para agilizar, tenha em mãos a data, o número de convidados e o tipo de festa.
- **Rastreio (se houver):** disparar evento de conversão `generate_lead` só nesta página.

---

## 16. Checklist de troca antes de publicar

- [ ] 55DDDNUMERO, [dominio], [Cidade - UF], endereço, CEP, CNPJ, e-mail, @instagram
- [ ] Preços "a partir de" por convidado, ou remover o preço e deixar só "Pedir orçamento"
- [ ] Capacidade, estacionamento, acessibilidade, o que o buffet inclui
- [ ] Horários e prazo de resposta
- [ ] Depoimentos e números reais, ou ocultar a seção de prova social
- [ ] Fotos reais, alts e imagem OG
- [ ] Coordenadas, mapa e Google Business Profile no JSON-LD
- [ ] Responsável LGPD e prazos da política
- [ ] Validar JSON-LD em validator.schema.org e testar cada link wa.me no celular
