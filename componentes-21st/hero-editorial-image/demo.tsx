import { Hero07 } from '@/components/ui/hero-07'

// Demo adaptada: imagem local (trocar pela foto real do salao) e textos do briefing.
export default function Hero07Demo() {
  return (
    <Hero07
      tagline="Espaço e buffet para o seu dia especial"
      title="Seu dia especial merece um lugar que acolhe."
      description="Festas infantis, 15 anos, casamentos e confraternizações com buffet completo. Peça seu orçamento pelo WhatsApp."
      landscapeImage="/img/hero-salao.jpg"
      landscapeAlt="Salão decorado para festa [trocar pela foto real]"
      animation="subtle"
      primaryCTA={{ ctaEnabled: true, text: 'Pedir orçamento', link: 'https://wa.me/55DDDNUMERO', variant: 'default' }}
      secondaryCTA={{ ctaEnabled: true, text: 'Ver pacotes', link: '#pacotes', variant: 'link' }}
    />
  )
}
