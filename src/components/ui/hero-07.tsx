// Hero em tela cheia (imersivo). Partiu do Editorial Image Hero (21st 19077) e foi redesenhado pela Lynx
// com referência ao Responsive Hero Banner (21st 9904): foto/vídeo ocupando a tela, título grande sobre a imagem,
// vidro no selo e no botão secundário, brilhos dourados, aproximação + parallax e indicador de rolagem.
// LCP: <img> local com fetchpriority="high". Tudo respeita prefers-reduced-motion.

import { useRef } from 'react'
import { m, useScroll, useTransform } from 'motion/react'
import { Cta, type CtaProps } from '@/components/ui/hero-07-utils/cta'
import { Brilhos } from '@/components/ui/brilhos'
import { MaskedTextReveal } from '@/components/ui/text-reveal-mask'
import { Magnetico, TextoGiratorio } from '@/components/ui/efeitos'

export interface Hero07Props {
  tagline: string
  title: string
  description: string
  support?: string
  landscapeImage: string
  landscapeImageMobile?: string
  landscapeAlt?: string
  landscapeVideo?: string
  primaryCTA?: CtaProps
  secondaryCTA?: CtaProps
}

// Vídeo por cima da foto: só toca sem reduced-motion e sem economia de dados; aparece quando puder tocar.
function VideoFundo({ src, poster }: { src: string; poster: string }) {
  const conexao = typeof navigator !== 'undefined' ? (navigator as Navigator & { connection?: { saveData?: boolean } }).connection : undefined
  if (typeof window !== 'undefined' && (matchMedia('(prefers-reduced-motion: reduce)').matches || conexao?.saveData)) return null
  return (
    <video
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      onCanPlay={(e) => e.currentTarget.classList.replace('opacity-0', 'opacity-100')}
      className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-700"
    />
  )
}

const comIntro = () => typeof document !== 'undefined' && document.documentElement.classList.contains('com-intro')

export function Hero07({
  tagline,
  title,
  description,
  support,
  landscapeImage,
  landscapeImageMobile,
  landscapeAlt = '',
  landscapeVideo,
  primaryCTA,
  secondaryCTA,
}: Readonly<Hero07Props>) {
  const secao = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: secao, offset: ['start start', 'end start'] })
  const yFoto = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const escala = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const yTexto = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const opTexto = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={secao} aria-labelledby="titulo-hero" className="relative isolate flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-[#1b1417] text-[#fffaf7]">
      <m.div style={{ y: yFoto, scale: escala }} className="absolute inset-0 -z-10">
        <img
          src={landscapeImage}
          srcSet={landscapeImageMobile ? `${landscapeImageMobile} 800w, ${landscapeImage} 1600w` : undefined}
          sizes="100vw"
          alt={landscapeAlt}
          width={1600}
          height={800}
          fetchPriority="high"
          decoding="async"
          className="hero-foto size-full object-cover object-center"
        />
        {landscapeVideo && <VideoFundo src={landscapeVideo} poster={landscapeImage} />}
        <Brilhos className="pointer-events-none absolute inset-0 size-full mix-blend-screen" />
      </m.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-[#120c0e]/90 via-[#120c0e]/45 to-[#120c0e]/25" />

      <m.div style={{ y: yTexto, opacity: opTexto }} className="mx-auto w-full max-w-7xl px-4 pt-32 pb-14 sm:px-6 sm:pb-16 lg:pb-20">
        <p className="entrada inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md">
          <span aria-hidden className="text-[#e9b872]">✦</span>
          <span className="texto-brilho texto-brilho-lento">{tagline}</span>
        </p>
        <MaskedTextReveal
          as="h1"
          id="titulo-hero"
          text={title}
          splitBy="lines"
          delay={comIntro() ? 1.2 : 0.15}
          viewportMargin="0px"
          className="mt-6 max-w-5xl font-serif text-5xl leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl"
        />
        <p className="entrada entrada-2 mt-5 font-serif text-2xl text-[#e9b872] italic sm:text-3xl">
          para <TextoGiratorio palavras={['casamentos', '15 anos', 'festas infantis', 'aniversários', 'confraternizações', 'chás de bebê']} />
        </p>
        <p className="entrada entrada-2 mt-5 max-w-xl text-base leading-relaxed text-pretty text-[#fffaf7]/85 sm:text-lg">{description}</p>
        {(primaryCTA?.ctaEnabled || secondaryCTA?.ctaEnabled) && (
          <div className="entrada entrada-3 mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
            {primaryCTA?.ctaEnabled && (
              <Magnetico className="w-full sm:w-auto [&_a]:bg-[#fffaf7] [&_a]:text-[#14584a] [&_a:hover]:bg-white">
                <Cta cta={primaryCTA} />
              </Magnetico>
            )}
            {secondaryCTA?.ctaEnabled && (
              <div className="[&_a]:border-white/40 [&_a]:bg-white/10 [&_a]:text-[#fffaf7] [&_a]:backdrop-blur-md [&_a:hover]:bg-white/20 [&_a:hover]:text-white">
                <Cta cta={{ ...secondaryCTA, variant: secondaryCTA.variant ?? 'outline' }} />
              </div>
            )}
          </div>
        )}
        {support && <p className="entrada entrada-3 mt-6 text-sm text-[#fffaf7]/70">{support}</p>}
      </m.div>

      <a href="#festas" className="entrada entrada-3 absolute right-6 bottom-8 hidden flex-col items-center gap-3 text-xs tracking-[0.3em] text-[#fffaf7]/75 uppercase lg:flex" aria-label="Rolar para os tipos de festa">
        <span className="[writing-mode:vertical-rl]">Role</span>
        <span className="rolar-linha relative h-14 w-px overflow-hidden bg-white/25" />
      </a>
    </section>
  )
}

export default Hero07
