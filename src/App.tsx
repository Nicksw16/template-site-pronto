import { lazy, Suspense } from 'react'
import { domAnimation, LazyMotion, MotionConfig } from 'motion/react'
import { FaixaFestas } from '@/components/ui/faixa-festas'
import { CursorAnel, CursorEtiqueta, FiltroVidro } from '@/components/ui/efeitos'
import { WhatsappLogo } from '@phosphor-icons/react/dist/csr/WhatsappLogo'
import { Hero07 } from '@/components/ui/hero-07'
import { Cabecalho } from '@/components/sections/Cabecalho'
import { WhatsAppFlutuante } from '@/components/sections/WhatsAppFlutuante'
import { CIDADE, depoimentos, HERO_VIDEO, HORARIO, waGeral } from '@/lib/site'

// Pesados (motion / embla) fora do pacote principal
import { Festas } from '@/components/sections/Servicos'

// Abaixo da dobra: carregado em partes para o celular não travar no início (menos Total Blocking Time).
const FotoExpande = lazy(() => import('@/components/ui/foto-expande').then((m) => ({ default: m.FotoExpande })))
const Cardapios = lazy(() => import('@/components/sections/Servicos').then((m) => ({ default: m.Cardapios })))
const Sobre = lazy(() => import('@/components/sections/Sobre').then((m) => ({ default: m.Sobre })))
const Orcamento = lazy(() => import('@/components/sections/Orcamento').then((m) => ({ default: m.Orcamento })))
const Perguntas = lazy(() => import('@/components/sections/Perguntas').then((m) => ({ default: m.Perguntas })))
const ChamadaFinal = lazy(() => import('@/components/sections/ChamadaFinal').then((m) => ({ default: m.ChamadaFinal })))
const Localizacao = lazy(() => import('@/components/sections/Localizacao').then((m) => ({ default: m.Localizacao })))
const Rodape = lazy(() => import('@/components/sections/Rodape').then((m) => ({ default: m.Rodape })))
const Galeria = lazy(() => import('@/components/sections/Galeria'))
const Depoimentos = lazy(() => import('@/components/sections/Depoimentos'))

export default function App() {
  return (
    <LazyMotion features={domAnimation}>
    <MotionConfig reducedMotion="user">
      <FiltroVidro />
      <CursorEtiqueta />
      <CursorAnel />
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
        <Suspense fallback={<div className="min-h-screen" aria-hidden />}>
        <FotoExpande
          src="/img/salao-largo.webp"
          srcCelular="/img/salao-largo-960.webp"
          alt="Salão da Villa Aurora com lustre de flores e buffet montado [foto de exemplo: trocar]"
          titulo="Um salão. Todas as festas."
          legenda="Do primeiro aniversário ao casamento, o mesmo cuidado com a mesa, a decoração e os convidados."
        />
        <Cardapios />
        <Sobre />
          <Galeria />
          {depoimentos.length > 0 && <Depoimentos />}
        <Orcamento />
        <Perguntas />
        <ChamadaFinal />
        <Localizacao />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Rodape />
      </Suspense>
      <WhatsAppFlutuante />
    </MotionConfig>
    </LazyMotion>
  )
}
