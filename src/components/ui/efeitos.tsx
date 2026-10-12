// Pequenos efeitos reaproveitáveis (todos leves, sem dependência extra).
// - FiltroVidro: filtro SVG do Liquid Glass (técnica do 21st id 3042, sem gsap).
// - BordaFeixe: Border Beam (Magic UI, 21st id 1268) em CSS.
// - TextoGiratorio: palavra que alterna (Text Loop do Motion Primitives / Word Rotate do Magic UI).
// - Magnetico: botão atraído pelo mouse (Magnetic do Motion Primitives). Só com mouse.
// - confete(): explosão de confete em canvas (Confetti do Magic UI, sem canvas-confetti).

import { AnimatePresence, m, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { type PointerEvent, type ReactNode, useEffect, useRef, useState } from 'react'

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

// Cursor em anel invertido (Custom Cursor do 21st, id 18283 + Inverted Cursor, id 9451): segue com mola,
// cresce sobre links/botões, na cor de destaque (terracota). Só com mouse.
export function CursorAnel() {
  const [habilitado, setHabilitado] = useState(false)
  const [sobre, setSobre] = useState(false)
  const [visivel, setVisivel] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 260, damping: 24, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 260, damping: 24, mass: 0.6 })

  useEffect(() => {
    const mq = matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)')
    setHabilitado(mq.matches)
    if (!mq.matches) return
    const mover = (e: globalThis.PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisivel(true)
      setSobre(!!(e.target as Element | null)?.closest?.('a, button, [role="tab"], label, summary, input, select'))
    }
    const sair = () => setVisivel(false)
    window.addEventListener('pointermove', mover, { passive: true })
    document.documentElement.addEventListener('pointerleave', sair)
    return () => {
      window.removeEventListener('pointermove', mover)
      document.documentElement.removeEventListener('pointerleave', sair)
    }
  }, [x, y])

  if (!habilitado) return null
  return (
    <m.div aria-hidden style={{ x: sx, y: sy }} className="cursor-anel pointer-events-none fixed top-0 left-0 z-[95]">
      <m.div
        initial={false}
        animate={{ width: sobre ? 56 : 28, height: sobre ? 56 : 28, opacity: visivel ? 1 : 0, backgroundColor: sobre ? 'rgba(170,60,37,0.14)' : 'rgba(170,60,37,0)' }}
        transition={{ duration: 0.35, ease: [0.625, 0.05, 0, 1] }}
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-[#aa3c25] shadow-[0_0_0_1px_rgba(255,250,247,0.35)]"
      />
    </m.div>
  )
}

// Rastro de fotos que segue o mouse (Cursor Image Trail do 21st, id 18471, unlumen). Só com mouse.
type ItemRastro = { id: number; x: number; y: number; rot: number; i: number }
let idRastro = 0
export function RastroFotos({ fotos, children, className, tamanho = 150 }: { fotos: string[]; children: ReactNode; className?: string; tamanho?: number }) {
  const [rastro, setRastro] = useState<ItemRastro[]>([])
  const [habilitado, setHabilitado] = useState(false)
  const ultimo = useRef<{ x: number; y: number } | null>(null)
  const cont = useRef(0)
  useEffect(() => setHabilitado(matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches), [])

  function mover(e: PointerEvent<HTMLDivElement>) {
    if (!habilitado || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    const px = e.clientX - r.left
    const py = e.clientY - r.top
    if (ultimo.current && Math.hypot(px - ultimo.current.x, py - ultimo.current.y) < 90) return
    ultimo.current = { x: px, y: py }
    const novo = { id: ++idRastro, x: px, y: py, rot: (Math.random() * 2 - 1) * 14, i: cont.current++ % fotos.length }
    setRastro((v) => [...v, novo].slice(-6))
  }

  return (
    <div
      onPointerMove={mover}
      onPointerLeave={() => {
        setRastro([])
        ultimo.current = null
      }}
      className={`relative ${className ?? ''}`}
    >
      <AnimatePresence>
        {rastro.map((it, k) => (
          <m.img
            key={it.id}
            src={fotos[it.i]}
            alt=""
            aria-hidden
            initial={{ opacity: 0, scale: 0.5, rotate: it.rot * 1.5 }}
            animate={{ opacity: 1, scale: 0.65 + 0.35 * ((k + 1) / rastro.length), rotate: it.rot }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            style={{ left: it.x, top: it.y, width: tamanho, x: '-50%', y: '-50%', zIndex: k }}
            className="pointer-events-none absolute aspect-[4/5] rounded-xl object-cover shadow-xl select-none"
          />
        ))}
      </AnimatePresence>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// Borda que acende seguindo o mouse (Glowing Effect da Aceternity, 21st id 1567), cores da marca,
// sem o `animate` do Motion (suaviza o ângulo num rAF). Coloque dentro de um elemento `relative` com borda arredondada.
export function BordaAcesa({ espessura = 2, abertura = 40 }: { espessura?: number; abertura?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return
    let alvo = 0
    let atual = 0
    let raf = 0
    const passo = () => {
      atual += (alvo - atual) * 0.12
      el.style.setProperty('--inicio', String(atual))
      if (Math.abs(alvo - atual) > 0.1) raf = requestAnimationFrame(passo)
      else raf = 0
    }
    const mover = (e: globalThis.PointerEvent) => {
      const r = el.getBoundingClientRect()
      const perto = e.clientX > r.left - 80 && e.clientX < r.right + 80 && e.clientY > r.top - 80 && e.clientY < r.bottom + 80
      el.style.setProperty('--ativo', perto ? '1' : '0')
      if (!perto) return
      const ang = (180 * Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2))) / Math.PI + 90
      alvo = atual + ((((ang - atual + 180) % 360) + 360) % 360) - 180
      if (!raf) raf = requestAnimationFrame(passo)
    }
    document.body.addEventListener('pointermove', mover, { passive: true })
    return () => {
      document.body.removeEventListener('pointermove', mover)
      cancelAnimationFrame(raf)
    }
  }, [])
  return <div ref={ref} aria-hidden className="borda-acesa" style={{ '--esp': `${espessura}px`, '--abertura': abertura } as React.CSSProperties} />
}
