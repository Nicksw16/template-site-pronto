// Editorial Image Hero (21st.dev id 19077, felipemenezes098) adaptado pela Lynx:
// - título revelado por linhas (Text Reveal Mask, 21st 19257); resto entra em CSS (.entrada);
// - foto local com fetchpriority="high", aproximação na chegada, parallax ao rolar e brilhos dourados (canvas);
// - tokens da paleta e Cormorant Garamond em font-serif.

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
  primaryCTA?: CtaProps
  secondaryCTA?: CtaProps
}

export function Hero07({
  tagline,
  title,
  description,
  support,
  landscapeImage,
  landscapeImageMobile,
  landscapeAlt = '',
  primaryCTA,
  secondaryCTA,
}: Readonly<Hero07Props>) {
  const secao = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: secao, offset: ['start start', 'end start'] })
  const yFoto = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opFoto = useTransform(scrollYProgress, [0, 0.8], [1, 0.4])
  return (
    <section ref={secao} className="bg-background relative isolate w-full overflow-hidden" aria-labelledby="titulo-hero">
      <m.div style={{ y: yFoto, opacity: opFoto }} className="relative w-full overflow-hidden">
        <div className="revelar-salao relative overflow-hidden [mask-image:linear-gradient(to_bottom,#000_80%,transparent_98%)]">
          <img
            src={landscapeImage}
            srcSet={landscapeImageMobile ? `${landscapeImageMobile} 800w, ${landscapeImage} 1600w` : undefined}
            sizes="100vw"
            alt={landscapeAlt}
            width={1600}
            height={800}
            fetchPriority="high"
            decoding="async"
            className="hero-foto aspect-[2/1] w-full object-cover object-center sm:aspect-[9/4] lg:aspect-auto lg:h-[48vh] lg:max-h-[560px] lg:min-h-[340px] dark:brightness-[0.92]"
          />
          <Brilhos className="pointer-events-none absolute inset-0 size-full mix-blend-screen" />
        </div>
      </m.div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 pt-6 pb-16 sm:px-6 sm:pb-24 lg:grid-cols-12 lg:gap-10 lg:pb-28">
        <div className="entrada flex lg:col-span-4 lg:col-start-1 lg:mt-5 lg:self-start lg:border-t lg:border-border lg:pt-5">
          <p className="text-accent max-w-xs text-base font-medium leading-relaxed lg:text-lg">
            {tagline}
            <br />
            <span className="text-foreground/70">para </span>
            <TextoGiratorio palavras={['casamentos', '15 anos', 'festas infantis', 'aniversários', 'confraternizações', 'chás de bebê']} className="text-primary font-semibold" />
          </p>
        </div>

        <div className="flex flex-col items-start gap-5 sm:gap-6 lg:col-span-7 lg:col-start-6">
          <MaskedTextReveal as="h1" id="titulo-hero" text={title} splitBy="lines" delay={0.15} viewportMargin="0px" className="text-foreground font-serif text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl" />
          <p className="entrada entrada-2 text-muted-foreground max-w-xl text-base leading-relaxed text-pretty sm:text-lg">
            {description}
          </p>
          {(primaryCTA?.ctaEnabled || secondaryCTA?.ctaEnabled) && (
            <div className="entrada entrada-3 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
              {primaryCTA?.ctaEnabled && <Magnetico className="w-full sm:w-auto"><Cta cta={primaryCTA} /></Magnetico>}
              {secondaryCTA?.ctaEnabled && <Cta cta={{ ...secondaryCTA, variant: secondaryCTA.variant ?? 'outline' }} />}
            </div>
          )}
          {support && <p className="entrada entrada-3 text-muted-foreground text-sm">{support}</p>}
        </div>
      </div>
    </section>
  )
}

export default Hero07
