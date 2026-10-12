// Entradas ao rolar (Motion). Leves: só opacity/transform, uma vez por elemento.
// MotionConfig reducedMotion="user" (App) desliga o deslocamento com prefers-reduced-motion.

import type * as React from 'react'
import { m, type HTMLMotionProps, type Variants } from 'motion/react'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const
const VIEW = { once: true, margin: '0px 0px -10% 0px' } as const

type Direcao = 'cima' | 'esquerda' | 'direita' | 'zoom'
const inicio: Record<Direcao, { x?: number; y?: number; scale?: number }> = {
  cima: { y: 32 },
  esquerda: { x: -40 },
  direita: { x: 40 },
  zoom: { scale: 0.92 },
}

export function Revelar({ de = 'cima', atraso = 0, ...props }: HTMLMotionProps<'div'> & { de?: Direcao; atraso?: number }) {
  return (
    <m.div
      initial={{ opacity: 0, ...inicio[de] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={VIEW}
      transition={{ duration: 0.7, delay: atraso, ease: EASE }}
      {...props}
    />
  )
}

const grupo: Variants = { oculto: {}, visivel: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } }
export const itemVariants: Variants = {
  oculto: { opacity: 0, y: 36, scale: 0.97 },
  visivel: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
}

export function RevelarGrupo(props: HTMLMotionProps<'div'>) {
  return <m.div variants={grupo} initial="oculto" whileInView="visivel" viewport={VIEW} {...props} />
}

export function RevelarItem(props: HTMLMotionProps<'div'>) {
  return <m.div variants={itemVariants} {...props} />
}

export function RevelarLista(props: HTMLMotionProps<'ul'>) {
  return <m.ul variants={grupo} initial="oculto" whileInView="visivel" viewport={VIEW} {...props} />
}

export function RevelarLi(props: HTMLMotionProps<'li'>) {
  return <m.li variants={itemVariants} {...props} />
}

// Foto que se abre de dentro de uma máscara ao entrar na tela (scroll image reveal).
export function FotoRevelada({ className, atraso = 0, ...img }: React.ImgHTMLAttributes<HTMLImageElement> & { atraso?: number }) {
  return (
    <m.div
      initial={{ clipPath: 'inset(12% 12% 12% 12% round 24px)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 12px)' }}
      viewport={VIEW}
      transition={{ duration: 1.1, delay: atraso, ease: EASE }}
      className={cn('overflow-hidden rounded-xl', className)}
    >
      <m.img
        initial={{ scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={VIEW}
        transition={{ duration: 1.4, delay: atraso, ease: EASE }}
        loading="lazy"
        decoding="async"
        className="size-full object-cover"
        {...(img as HTMLMotionProps<'img'>)}
      />
    </m.div>
  )
}
