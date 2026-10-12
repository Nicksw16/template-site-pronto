// Editorial Image Hero (21st.dev id 19077, felipemenezes098) adaptado pela Lynx:
// - sem motion/react-wrap-balancer no hero (LCP): entrada em CSS (.entrada), só desktop e sem reduced-motion;
// - imagem local com width/height e fetchpriority="high"; efeito "revelar-salao" ao rolar (index.css);
// - tokens da paleta e Cormorant Garamond em font-serif.

import { Cta, type CtaProps } from '@/components/ui/hero-07-utils/cta'

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
  return (
    <section className="bg-background relative isolate w-full overflow-hidden" aria-labelledby="titulo-hero">
      <div className="relative w-full overflow-hidden">
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
            className="aspect-[2/1] w-full object-cover object-center sm:aspect-[9/4] lg:aspect-auto lg:h-[48vh] lg:max-h-[560px] lg:min-h-[340px] dark:brightness-[0.92]"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 pt-6 pb-16 sm:px-6 sm:pb-24 lg:grid-cols-12 lg:gap-10 lg:pb-28">
        <div className="entrada flex lg:col-span-4 lg:col-start-1 lg:mt-5 lg:self-start lg:border-t lg:border-border lg:pt-5">
          <p className="text-accent max-w-xs text-base font-medium leading-relaxed lg:text-lg">{tagline}</p>
        </div>

        <div className="flex flex-col items-start gap-5 sm:gap-6 lg:col-span-7 lg:col-start-6">
          <h1
            id="titulo-hero"
            className="entrada entrada-2 text-foreground font-serif text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl"
          >
            {title}
          </h1>
          <p className="entrada entrada-2 text-muted-foreground max-w-xl text-base leading-relaxed text-pretty sm:text-lg">
            {description}
          </p>
          {(primaryCTA?.ctaEnabled || secondaryCTA?.ctaEnabled) && (
            <div className="entrada entrada-3 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
              {primaryCTA?.ctaEnabled && <Cta cta={primaryCTA} />}
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
