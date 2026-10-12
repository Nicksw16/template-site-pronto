// Brilhos dourados (bokeh) sobre a foto do hero: canvas 2D leve, sem dependência.
// Menos partículas no celular; pausa fora da tela e na aba oculta; nada com prefers-reduced-motion.

import { useEffect, useRef } from 'react'

type P = { x: number; y: number; r: number; vy: number; vx: number; fase: number; vel: number }

export function Brilhos({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = cv.getContext('2d')
    if (!ctx) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const qtd = innerWidth < 768 ? 16 : 34
    let w = 0
    let h = 0
    let ps: P[] = []
    let raf = 0
    let visivel = true

    const novo = (y?: number): P => ({
      x: Math.random() * w,
      y: y ?? Math.random() * h,
      r: 1.2 + Math.random() * (innerWidth < 768 ? 2.6 : 4.2),
      vy: -(0.08 + Math.random() * 0.25),
      vx: (Math.random() - 0.5) * 0.12,
      fase: Math.random() * Math.PI * 2,
      vel: 0.01 + Math.random() * 0.02,
    })

    const ajustar = () => {
      w = cv.clientWidth
      h = cv.clientHeight
      cv.width = w * dpr
      cv.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ps = Array.from({ length: qtd }, () => novo())
    }

    const quadro = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of ps) {
        p.y += p.vy
        p.x += p.vx
        p.fase += p.vel
        if (p.y < -10) Object.assign(p, novo(h + 10))
        const a = 0.35 + 0.6 * (0.5 + 0.5 * Math.sin(p.fase))
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
        g.addColorStop(0, `rgba(255, 228, 170, ${a})`)
        g.addColorStop(0.4, `rgba(240, 190, 110, ${a * 0.35})`)
        g.addColorStop(1, 'rgba(240, 190, 110, 0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(quadro)
    }

    const iniciar = () => {
      cancelAnimationFrame(raf)
      if (visivel && !document.hidden) raf = requestAnimationFrame(quadro)
    }

    ajustar()
    const ro = new ResizeObserver(ajustar)
    ro.observe(cv)
    const io = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting
      iniciar()
    })
    io.observe(cv)
    document.addEventListener('visibilitychange', iniciar)
    iniciar()
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', iniciar)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className={className} />
}
