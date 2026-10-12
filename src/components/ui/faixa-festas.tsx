// Faixa infinita com os tipos de festa — tipografia cinética que acelera e inverte com a rolagem.
// Inspirada no Infinite Text Marquee (21st id 1944) e no "Ticker: Scroll" do motion.dev; refeita leve.
// prefers-reduced-motion: faixa parada.

import { m, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'motion/react'
import { useRef } from 'react'

const wrap = (min: number, max: number, v: number) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

const itens = ['Festa infantil', '15 anos', 'Casamento', 'Aniversário', 'Corporativo', 'Chá de bebê', 'Chá revelação', 'Bodas']

function Copia() {
  return (
    <ul className="flex shrink-0 items-center">
      {itens.map((t) => (
        <li key={t} className="flex items-center">
          <span className="font-serif text-3xl italic sm:text-5xl">{t}</span>
          <span className="text-accent mx-6 text-xl sm:mx-10 sm:text-2xl">✦</span>
        </li>
      ))}
    </ul>
  )
}

function Trilho({ base = 1.2, reverso = false }: { base?: number; reverso?: boolean }) {
  const reduzir = useReducedMotion()
  const x = useMotionValue(0)
  const { scrollY } = useScroll()
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const fator = useTransform(vel, [-1000, 0, 1000], [-4, 0, 4], { clamp: false })
  const dir = useRef(reverso ? -1 : 1)
  const pos = useTransform(x, (v) => `${wrap(-25, 0, v)}%`)
  const skew = useTransform(vel, [-2000, 0, 2000], [-6, 0, 6])

  useAnimationFrame((_, delta) => {
    if (reduzir) return
    const f = fator.get()
    if (f < 0) dir.current = reverso ? 1 : -1
    else if (f > 0) dir.current = reverso ? -1 : 1
    x.set(x.get() - dir.current * base * (delta / 1000) * (1 + Math.abs(f)))
  })

  return (
    <m.div className="flex w-max will-change-transform" style={{ x: pos, skewX: skew }}>
      <Copia />
      <Copia />
      <Copia />
      <Copia />
    </m.div>
  )
}

export function FaixaFestas() {
  return (
    <div className="border-y bg-secondary/40 py-5 sm:py-7">
      <p className="sr-only">Fazemos: {itens.join(', ')}.</p>
      <div className="faixa-mascara flex overflow-hidden" aria-hidden>
        <Trilho />
      </div>
    </div>
  )
}
