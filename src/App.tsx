import { lazy, Suspense } from 'react'
import { domAnimation, LazyMotion, MotionConfig } from 'motion/react'
import { FaixaFestas } from '@/components/ui/faixa-festas'
import { FiltroVidro } from '@/components/ui/efeitos'
import { ChamadaFinal } from '@/components/sections/ChamadaFinal'
import { WhatsappLogo } from '@phosphor-icons/react/dist/csr/WhatsappLogo'
import { Hero07 } from '@/components/ui/hero-07'
import { Cabecalho } from '@/components/sections/Cabecalho'
import { Cardapios, Festas } from '@/components/sections/Servicos'
import { Sobre } from '@/components/sections/Sobre'
import { Orcamento } from '@/components/sections/Orcamento'
import { Perguntas } from '@/components/sections/Perguntas'
import { Localizacao } from '@/components/sections/Localizacao'
import { Rodape } from '@/components/sections/Rodape'
import { WhatsAppFlutuante } from '@/components/sections/WhatsAppFlutuante'
import { CIDADE, depoimentos, HERO_VIDEO, HORARIO, waGeral } from '@/lib/site'

// Pesados (motion / embla) fora do pacote principal
const Galeria = lazy(() => import('@/components/sections/Galeria'))
const Depoimentos = lazy(() => import('@/components/sections/Depoimentos'))

export default function App() {
  return (
    <LazyMotion features={domAnimation}>
    <MotionConfig reducedMotion="user">
      <FiltroVidro />
      <a href="#conteudo" className="bg-primary text-primary-foreground sr-only z-50 rounded-xl px-4 py-3 focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
        Pular para o conteúdo
      </a>
      <Cabecalho />
      <main id="conteudo">
        <div id="inicio">
          <Hero07
            tagline={`Espaço e buffet em ${CIDADE}`}
            title={`Sua festa inteira num lugar só, em ${CIDADE}`}
            description="Salão climatizado, cozinha própria e equipe para cuidar de tudo. Conte a data, quantos convidados e o tipo de festa. Respondemos pelo WhatsApp com um orçamento."
            support={`Atendimento ${HORARIO} · Visitas com agendamento`}
            landscapeImage="/img/hero-salao.webp"
            landscapeImageMobile="/img/hero-salao-800.webp"
            landscapeVideo={HERO_VIDEO || undefined}
            landscapeAlt="Salão da Villa Aurora decorado e iluminado para uma festa [foto de exemplo: trocar]"
            primaryCTA={{ ctaEnabled: true, text: 'Pedir orçamento pelo WhatsApp', link: waGeral, icon: <WhatsappLogo aria-hidden className="size-5" /> }}
            secondaryCTA={{ ctaEnabled: true, text: 'Ver tipos de festa', link: '#festas', variant: 'outline' }}
          />
        </div>
        <FaixaFestas />
        <Festas />
        <Cardapios />
        <Sobre />
        <Suspense fallback={<div className="min-h-[60vh]" aria-hidden />}>
          <Galeria />
          {depoimentos.length > 0 && <Depoimentos />}
        </Suspense>
        <Orcamento />
        <Perguntas />
        <ChamadaFinal />
        <Localizacao />
      </main>
      <Rodape />
      <WhatsAppFlutuante />
    </MotionConfig>
    </LazyMotion>
  )
}
