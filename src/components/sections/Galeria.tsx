// Galeria horizontal ligada à rolagem (Scroll Horizontal Gallery do motion.dev, 21st id 24623), adaptada:
// fotos locais, legenda numerada, parallax dentro de cada foto e alturas calculadas pelo tamanho real da faixa.
// prefers-reduced-motion: vira uma faixa com rolagem lateral normal (com snap).
import { useLayoutEffect, useRef, useState } from 'react'
import { m, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { InstagramLogo } from '@phosphor-icons/react/dist/csr/InstagramLogo'
import { MaskedTextReveal } from '@/components/ui/text-reveal-mask'
import { INSTAGRAM, instagramUrl } from '@/lib/site'

// Fotos de exemplo (Pexels): trocar pelas fotos reais autorizadas. Ver public/img/CREDITOS.md.
const fotos = [
  { src: '/img/galeria-8.webp', w: 900, h: 600, alt: 'Salão com lustres e mesas redondas montadas [foto de exemplo: trocar]', legenda: 'Salão montado' },
  { src: '/img/galeria-1.webp', w: 900, h: 600, alt: 'Mesa de doces de primeiro aniversário com flores e balões [foto de exemplo: trocar]', legenda: 'Festa infantil' },
  { src: '/img/galeria-3.webp', w: 900, h: 601, alt: 'Recepção à noite com luzes no teto e convidados [foto de exemplo: trocar]', legenda: 'Recepção à noite' },
  { src: '/img/galeria-6.webp', w: 900, h: 1353, alt: 'Tábua de canapés e frios servida no coquetel [foto de exemplo: trocar]', legenda: 'Coquetel' },
  { src: '/img/galeria-2.webp', w: 900, h: 1350, alt: 'Crianças em volta do bolo de aniversário [foto de exemplo: trocar]', legenda: 'Hora do parabéns' },
  { src: '/img/galeria-4.webp', w: 900, h: 600, alt: 'Mesa de chá de bebê em tons de azul [foto de exemplo: trocar]', legenda: 'Chá de bebê' },
  { src: '/img/galeria-7.webp', w: 900, h: 1125, alt: 'Decoração de chá de bebê com ursinhos e balões [foto de exemplo: trocar]', legenda: 'Chá revelação' },
  { src: '/img/galeria-5.webp', w: 900, h: 658, alt: 'Festa infantil com bolo, balões e decoração temática [foto de exemplo: trocar]', legenda: 'Decoração temática' },
]

function Cartao({ f, i, progresso }: { f: (typeof fotos)[number]; i: number; progresso: MotionValue<number> }) {
  const x = useTransform(progresso, [0, 1], ['-8%', '8%'])
  return (
    <figure className="group relative h-[58vh] w-[78vw] shrink-0 overflow-hidden rounded-2xl sm:w-[52vw] lg:h-[64vh] lg:w-[36vw]">
      <m.img
        src={f.src}
        alt={f.alt}
        width={f.w}
        height={f.h}
        loading="lazy"
        decoding="async"
        style={{ x, scale: 1.2 }}
        className="size-full object-cover"
      />
      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/65 to-transparent p-5 text-white">
        <span className="font-serif text-2xl sm:text-3xl">{f.legenda}</span>
        <span className="text-sm tabular-nums opacity-80">{String(i + 1).padStart(2, '0')} / {String(fotos.length).padStart(2, '0')}</span>
      </figcaption>
    </figure>
  )
}

function Cabecalho() {
  return (
    <div className="mx-auto mb-8 flex max-w-7xl flex-col gap-4 px-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
      <div className="max-w-2xl">
        <MaskedTextReveal as="h2" id="titulo-galeria" text="O espaço em dia de festa" className="font-serif text-4xl tracking-tight sm:text-5xl" />
        <p className="text-muted-foreground mt-3">[Fotos de exemplo: trocar pelas fotos reais autorizadas pelos clientes.]</p>
      </div>
      <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-primary inline-flex min-h-11 items-center gap-2 font-semibold underline-offset-4 hover:underline">
        <InstagramLogo aria-hidden className="size-5" />
        Veja festas reais no @{INSTAGRAM}
      </a>
    </div>
  )
}

export default function Galeria() {
  const reduzir = useReducedMotion()
  const alvo = useRef<HTMLDivElement>(null)
  const trilho = useRef<HTMLDivElement>(null)
  const [distancia, setDistancia] = useState(0)
  const { scrollYProgress } = useScroll({ target: alvo, offset: ['start start', 'end end'] })
  const suave = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.0005 })
  const x = useTransform(suave, [0, 1], [0, -distancia])
  const barra = useTransform(suave, [0, 1], [0, 1])

  useLayoutEffect(() => {
    const t = trilho.current
    if (!t) return
    const medir = () => setDistancia(Math.max(0, t.scrollWidth - window.innerWidth))
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(t)
    return () => ro.disconnect()
  }, [])

  if (reduzir) {
    return (
      <section id="galeria" aria-labelledby="titulo-galeria" className="py-16 sm:py-24">
        <Cabecalho />
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:px-6">
          {fotos.map((f, i) => (
            <div key={f.src} className="snap-start">
              <Cartao f={f} i={i} progresso={scrollYProgress} />
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id="galeria" aria-labelledby="titulo-galeria" className="pt-16 sm:pt-24">
      <Cabecalho />
      <div ref={alvo} style={{ height: `calc(100svh + ${distancia}px)` }} className="relative">
        <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
          <m.div ref={trilho} style={{ x }} className="flex w-max gap-4 px-4 sm:gap-6 sm:px-6">
            {fotos.map((f, i) => (
              <Cartao key={f.src} f={f} i={i} progresso={suave} />
            ))}
          </m.div>
          <div className="mx-auto mt-6 h-0.5 w-40 overflow-hidden rounded-full bg-border">
            <m.div style={{ scaleX: barra }} className="bg-primary h-full origin-left" />
          </div>
        </div>
      </div>
    </section>
  )
}
