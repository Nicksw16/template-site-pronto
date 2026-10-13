// Controle deslizante com mola — "BeUI Range Slider" do 21st (id 16163, starc007), adaptado pela Lynx:
// cores da marca, `m` do LazyMotion, marcas a cada passo grande e teclado (setas, Home/End, PageUp/PageDown).
import { m, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { type KeyboardEvent, type PointerEvent, useEffect, useRef, useState } from 'react'

const limitar = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

export function Deslizante({
  valor,
  aoMudar,
  min = 0,
  max = 100,
  passo = 1,
  marcas = 10,
  rotulo,
  texto,
}: {
  valor: number
  aoMudar: (v: number) => void
  min?: number
  max?: number
  passo?: number
  marcas?: number
  rotulo: string
  texto?: string
}) {
  const reduzir = useReducedMotion()
  const trilho = useRef<HTMLDivElement>(null)
  const [ativo, setAtivo] = useState(false)
  const atual = limitar(valor, min, max)
  const pct = ((atual - min) / (max - min)) * 100
  const alvo = useMotionValue(pct)
  useEffect(() => alvo.set(pct), [pct, alvo])
  const mola = useSpring(alvo, { stiffness: 700, damping: 50, mass: 0.5 })
  const pos = reduzir ? alvo : mola
  const esq = useMotionTemplate`${pos}%`
  const xPegador = useTransform(pos, (p) => `${-p}%`)

  const definir = (v: number) => aoMudar(limitar(Math.round((v - min) / passo) * passo + min, min, max))
  const doX = (x: number) => {
    const r = trilho.current?.getBoundingClientRect()
    return r ? min + limitar((x - r.left) / r.width, 0, 1) * (max - min) : atual
  }
  const descer = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    setAtivo(true)
    definir(doX(e.clientX))
  }
  const mover = (e: PointerEvent<HTMLDivElement>) => ativo && definir(doX(e.clientX))
  const soltar = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.releasePointerCapture?.(e.pointerId)
    setAtivo(false)
  }
  const tecla = (e: KeyboardEvent<HTMLDivElement>) => {
    const mapa: Record<string, number> = {
      ArrowRight: atual + passo,
      ArrowUp: atual + passo,
      ArrowLeft: atual - passo,
      ArrowDown: atual - passo,
      PageUp: atual + passo * 5,
      PageDown: atual - passo * 5,
      Home: min,
      End: max,
    }
    if (e.key in mapa) {
      e.preventDefault()
      definir(mapa[e.key])
    }
  }
  const n = Math.floor((max - min) / (passo * marcas))

  return (
    <div
      ref={trilho}
      onPointerDown={descer}
      onPointerMove={mover}
      onPointerUp={soltar}
      onPointerCancel={soltar}
      className="bg-secondary relative flex h-11 w-full cursor-grab touch-none items-center overflow-hidden rounded-xl select-none active:cursor-grabbing"
    >
      <m.div className="absolute inset-y-0 left-0 bg-[#e9b872]/45" style={{ width: esq }} />
      <div aria-hidden className="pointer-events-none absolute inset-x-3 inset-y-0">
        {Array.from({ length: n + 1 }, (_, i) => (
          <span key={i} className="bg-primary/30 absolute top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ left: `${(i / n) * 100}%` }} />
        ))}
      </div>
      <m.div
        role="slider"
        tabIndex={0}
        aria-label={rotulo}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={atual}
        aria-valuetext={texto}
        onKeyDown={tecla}
        animate={reduzir ? undefined : { scaleY: ativo ? 1.35 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 14, mass: 0.7 }}
        className="bg-primary focus-visible:ring-ring absolute top-1/2 h-6 w-2 rounded-sm shadow-sm outline-none focus-visible:ring-4"
        style={{ left: esq, x: xPegador, y: '-50%' }}
      />
    </div>
  )
}
