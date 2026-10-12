// Inclinação 3D leve que segue o mouse (Tilt card do motion.dev). Só com mouse; no toque fica parado.
import { m, useMotionValue, useSpring, useTransform } from 'motion/react'
import type { PointerEvent, ReactNode } from 'react'

export function Inclinar({ children, className, max = 6 }: { children: ReactNode; className?: string; max?: number }) {
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const mola = { stiffness: 180, damping: 18 }
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), mola)
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), mola)
  const luzX = useTransform(px, [0, 1], ['0%', '100%'])
  const luzY = useTransform(py, [0, 1], ['0%', '100%'])

  function mover(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  function sair() {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <div className={className} style={{ perspective: 900 }}>
      <m.div
        onPointerMove={mover}
        onPointerLeave={sair}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group/inclinar relative h-full"
      >
        {children}
        <m.div
          aria-hidden
          style={{ '--lx': luzX, '--ly': luzY } as never}
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 [background:radial-gradient(400px_circle_at_var(--lx)_var(--ly),rgb(255_255_255/0.18),transparent_45%)] group-hover/inclinar:opacity-100"
        />
      </m.div>
    </div>
  )
}
