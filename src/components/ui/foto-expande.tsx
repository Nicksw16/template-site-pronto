// Foto que cresce até ocupar a largura ao rolar (Scroll Reveal Image do 21st, id 24466, unlumen),
// com texto grande por cima. Sem next/image: <img> local. Molas do Motion; reduced-motion = já aberta.
import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'

export function FotoExpande({ src, srcCelular, alt, titulo, legenda }: { src: string; srcCelular?: string; alt: string; titulo: string; legenda?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduzir = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  const mola = { stiffness: 120, damping: 30 }
  const largura = useSpring(useTransform(scrollYProgress, [0, 1], ['55%', '100%']), mola)
  const escala = useSpring(useTransform(scrollYProgress, [0, 1], [1.5, 1]), mola)
  const raio = useSpring(useTransform(scrollYProgress, [0, 1], [48, 0]), mola)
  const opTexto = useTransform(scrollYProgress, [0.55, 0.95], [0, 1])
  const yTexto = useTransform(scrollYProgress, [0.55, 1], [40, 0])

  return (
    <div ref={ref} className="px-0 py-8 sm:py-12">
      <m.div
        style={reduzir ? undefined : { width: largura, borderRadius: raio }}
        className="relative mx-auto h-[70svh] min-h-[420px] w-full overflow-hidden"
      >
        <picture>
          {srcCelular && <source media="(max-width: 767px)" srcSet={srcCelular} />}
          <m.img
          src={src}
          alt={alt}
          width={1920}
          height={1080}
          loading="lazy"
          decoding="async"
          style={reduzir ? undefined : { scale: escala }}
          className="absolute inset-0 size-full object-cover"
          />
        </picture>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#120c0e]/80 via-[#120c0e]/20 to-transparent" />
        <m.div style={reduzir ? undefined : { opacity: opTexto, y: yTexto }} className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 text-[#fffaf7] sm:px-6 sm:pb-14">
          <p className="max-w-3xl font-serif text-5xl leading-[1] sm:text-7xl">{titulo}</p>
          {legenda && <p className="mt-4 max-w-lg text-lg text-[#fffaf7]/80">{legenda}</p>}
        </m.div>
      </m.div>
    </div>
  )
}
