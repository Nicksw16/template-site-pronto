// Pequenos efeitos reaproveitáveis (todos leves, sem dependência extra).
// - FiltroVidro: filtro SVG do Liquid Glass (técnica do 21st id 3042, sem gsap).
// - BordaFeixe: Border Beam (Magic UI, 21st id 1268) em CSS.
// - TextoGiratorio: palavra que alterna (Text Loop do Motion Primitives / Word Rotate do Magic UI).
// - Magnetico: botão atraído pelo mouse (Magnetic do Motion Primitives). Só com mouse.
// - confete(): explosão de confete em canvas (Confetti do Magic UI, sem canvas-confetti).

import { AnimatePresence, m, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { type PointerEvent, type ReactNode, useEffect, useState } from 'react'

export function FiltroVidro() {
  useEffect(() => {
    if ('userAgentData' in navigator) document.documentElement.classList.add('refracao')
  }, [])
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <filter id="vidro" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="7" result="ruido" />
        <feGaussianBlur in="ruido" stdDeviation="2" result="suave" />
        <feDisplacementMap in="SourceGraphic" in2="suave" scale="38" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  )
}

export function BordaFeixe({ tamanho = 160, de, para }: { tamanho?: number; de?: string; para?: string }) {
  return <div aria-hidden className="borda-feixe" style={{ '--tam': tamanho, '--de': de, '--para': para } as React.CSSProperties} />
}

export function TextoGiratorio({ palavras, intervalo = 2400, className }: { palavras: string[]; intervalo?: number; className?: string }) {
  const [i, setI] = useState(0)
  const reduzir = useReducedMotion()
  useEffect(() => {
    if (reduzir) return
    const t = setInterval(() => setI((n) => (n + 1) % palavras.length), intervalo)
    return () => clearInterval(t)
  }, [palavras.length, intervalo, reduzir])

  return (
    <span className={`relative inline-block align-bottom [clip-path:inset(0_-0.3em)] ${className ?? ''}`}>
      <span className="sr-only">{palavras.join(', ')}</span>
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={palavras[i]}
          aria-hidden
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block pr-1 whitespace-nowrap"
        >
          {palavras[i]}
        </m.span>
      </AnimatePresence>
    </span>
  )
}

export function Magnetico({ children, forca = 0.25, className }: { children: ReactNode; forca?: number; className?: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 15 })
  const sy = useSpring(y, { stiffness: 220, damping: 15 })
  function mover(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * forca)
    y.set((e.clientY - (r.top + r.height / 2)) * forca)
  }
  return (
    <m.div onPointerMove={mover} onPointerLeave={() => (x.set(0), y.set(0))} style={{ x: sx, y: sy }} className={className}>
      {children}
    </m.div>
  )
}

const CORES = ['#14584a', '#aa3c25', '#e9b872', '#f3d9c4', '#2f8a74']

export function confete(origem?: { x: number; y: number }) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const cv = document.createElement('canvas')
  cv.setAttribute('aria-hidden', 'true')
  cv.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:100'
  document.body.appendChild(cv)
  const ctx = cv.getContext('2d')
  if (!ctx) return cv.remove()
  const dpr = Math.min(devicePixelRatio || 1, 2)
  cv.width = innerWidth * dpr
  cv.height = innerHeight * dpr
  ctx.scale(dpr, dpr)
  const ox = origem?.x ?? innerWidth / 2
  const oy = origem?.y ?? innerHeight / 2
  const ps = Array.from({ length: innerWidth < 768 ? 90 : 150 }, () => {
    const ang = -Math.PI / 2 + (Math.random() - 0.5) * 1.9
    const v = 7 + Math.random() * 9
    return { x: ox, y: oy, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v, w: 5 + Math.random() * 6, h: 8 + Math.random() * 8, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, c: CORES[(Math.random() * CORES.length) | 0] }
  })
  const inicio = performance.now()
  const quadro = (t: number) => {
    const vida = (t - inicio) / 1000
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    for (const p of ps) {
      p.vy += 0.28
      p.vx *= 0.985
      p.x += p.vx
      p.y += p.vy
      p.r += p.vr
      ctx.save()
      ctx.globalAlpha = Math.max(0, 1 - vida / 2.2)
      ctx.translate(p.x, p.y)
      ctx.rotate(p.r)
      ctx.fillStyle = p.c
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.r * 2)))
      ctx.restore()
    }
    if (vida < 2.2) requestAnimationFrame(quadro)
    else cv.remove()
  }
  requestAnimationFrame(quadro)
}

// Etiqueta que segue o cursor e "estoura" com mola ao passar em [data-cursor] (Cursor Bubble do 21st, id 31197,
// refeito com Motion em vez de GSAP). Só com mouse e sem reduced-motion; no toque não existe.
export function CursorEtiqueta() {
  const [ativo, setAtivo] = useState(false)
  const [texto, setTexto] = useState('')
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 })
  const [habilitado, setHabilitado] = useState(false)

  useEffect(() => {
    const mq = matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)')
    setHabilitado(mq.matches)
    if (!mq.matches) return
    const mover = (e: globalThis.PointerEvent) => {
      x.set(e.clientX + 14)
      y.set(e.clientY - 44)
      const alvo = (e.target as Element | null)?.closest?.('[data-cursor]')
      if (alvo) {
        setTexto(alvo.getAttribute('data-cursor') ?? '')
        setAtivo(true)
      } else setAtivo(false)
    }
    const sair = () => setAtivo(false)
    window.addEventListener('pointermove', mover, { passive: true })
    document.documentElement.addEventListener('pointerleave', sair)
    return () => {
      window.removeEventListener('pointermove', mover)
      document.documentElement.removeEventListener('pointerleave', sair)
    }
  }, [x, y])

  if (!habilitado) return null
  return (
    <m.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-[90]"
    >
      <m.span
        initial={false}
        animate={ativo ? { scale: 1, rotate: 0, opacity: 1 } : { scale: 0, rotate: -30, opacity: 0 }}
        transition={ativo ? { type: 'spring', stiffness: 420, damping: 14 } : { duration: 0.2 }}
        className="block origin-bottom-left rounded-[999px_999px_999px_0] bg-[#14584a] px-3.5 py-2 text-sm font-semibold whitespace-nowrap text-[#fffaf7] shadow-lg"
      >
        {texto}
      </m.span>
    </m.div>
  )
}
