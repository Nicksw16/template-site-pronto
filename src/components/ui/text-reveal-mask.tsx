// Text Reveal (Mask) — 21st.dev id 19257 (soralabs), adaptado pela Lynx:
// - m.span (LazyMotion) no lugar de motion.span; modos "lines" e "words";
// - prop `id` repassada ao título (aria-labelledby das seções);
// - prefers-reduced-motion: texto normal, sem animação.

import { m, type UseInViewOptions, useInView, useReducedMotion } from 'motion/react'
import { type ElementType, type ReactNode, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type SplitBy = 'lines' | 'words'

const DEFAULTS: Record<SplitBy, { duration: number; stagger: number }> = {
  lines: { duration: 0.9, stagger: 0.1 },
  words: { duration: 0.7, stagger: 0.05 },
}
const EXPO_OUT = [0.19, 1, 0.22, 1] as const

export interface MaskedTextRevealProps {
  as?: keyof React.JSX.IntrinsicElements
  text: string
  id?: string
  className?: string
  splitBy?: SplitBy
  delay?: number
  duration?: number
  stagger?: number
  once?: boolean
  viewportMargin?: UseInViewOptions['margin']
}

function agruparPorLinha(medida: HTMLElement): number[][] {
  const palavras = medida.querySelectorAll<HTMLElement>('[data-medida]')
  const grupos: number[][] = []
  let atual: number[] = []
  let topo = -1
  palavras.forEach((el, i) => {
    if (topo !== -1 && el.offsetTop > topo + 1) {
      grupos.push(atual)
      atual = []
    }
    atual.push(i)
    topo = el.offsetTop
  })
  if (atual.length) grupos.push(atual)
  return grupos.length ? grupos : [[0]]
}

function Alvo({ animar, atraso, duracao, bloco, className, children }: {
  animar: boolean
  atraso: number
  duracao: number
  bloco?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <m.span
      initial={{ y: '110%' }}
      animate={animar ? { y: '0%' } : { y: '110%' }}
      transition={{ duration: duracao, delay: atraso, ease: EXPO_OUT }}
      className={cn('will-change-transform', bloco ? 'block' : 'inline-block', className)}
    >
      {children}
    </m.span>
  )
}

export function MaskedTextReveal({
  as: Tag = 'p',
  text,
  id,
  className,
  splitBy = 'words',
  delay = 0,
  duration,
  stagger,
  once = true,
  viewportMargin = '0px 0px -15% 0px',
}: MaskedTextRevealProps) {
  const raiz = useRef<HTMLDivElement>(null)
  const medida = useRef<HTMLDivElement>(null)
  const reduzir = useReducedMotion()
  const naTela = useInView(raiz, { once, margin: viewportMargin })
  const palavras = useMemo(() => text.split(/\s+/).filter(Boolean), [text])
  const [linhas, setLinhas] = useState<number[][] | null>(null)

  useLayoutEffect(() => {
    const c = raiz.current
    const md = medida.current
    if (!c || !md) return
    let cancelado = false
    const medir = () => {
      if (cancelado) return
      md.style.width = `${c.clientWidth || c.parentElement?.clientWidth || 0}px`
      setLinhas(agruparPorLinha(md))
    }
    medir()
    document.fonts?.ready.then(medir)
    const ro = new ResizeObserver(medir)
    ro.observe(c)
    return () => {
      cancelado = true
      ro.disconnect()
    }
  }, [text, className])

  const Comp = Tag as ElementType
  if (reduzir) {
    return (
      <Comp id={id} className={className}>
        {text}
      </Comp>
    )
  }

  const d = DEFAULTS[splitBy]
  const dur = duration ?? d.duration
  const stg = stagger ?? d.stagger
  const pronto = linhas !== null
  const animar = naTela && pronto
  let ordem = 0

  return (
    <div ref={raiz} className="relative w-full">
      <div ref={medida} aria-hidden className={cn('pointer-events-none invisible fixed top-0 left-[-9999px] block', className)}>
        {palavras.map((p, i) => (
          <span key={i} data-medida className={cn('inline-block', i < palavras.length - 1 && 'me-[0.25em]')}>
            {p}
          </span>
        ))}
      </div>
      <Comp id={id} aria-label={text} className={cn('block', !pronto && 'invisible', className)}>
        {pronto &&
          linhas.map((grupo, li) => (
            <span key={li} aria-hidden className="block overflow-hidden pb-[0.08em]">
              {splitBy === 'lines' ? (
                <Alvo animar={animar} atraso={delay + li * stg} duracao={dur} bloco>
                  {grupo.map((wi) => (
                    <span key={wi} className={cn('inline-block', wi < palavras.length - 1 && 'me-[0.25em]')}>
                      {palavras[wi]}
                    </span>
                  ))}
                </Alvo>
              ) : (
                grupo.map((wi) => (
                  <Alvo key={wi} animar={animar} atraso={delay + ordem++ * stg} duracao={dur} className={cn(wi < palavras.length - 1 && 'me-[0.25em]')}>
                    {palavras[wi]}
                  </Alvo>
                ))
              )}
            </span>
          ))}
      </Comp>
    </div>
  )
}

export default MaskedTextReveal
