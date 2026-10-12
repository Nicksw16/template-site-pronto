// ESCRITO A MAO pela Lynx: o registro do 21st nao entrega "hero-07-utils/cta".
// Caminho de destino: components/ui/hero-07-utils/cta.tsx
import * as React from 'react'
import { Button } from '@/components/ui/button'

export interface CtaProps {
  ctaEnabled: boolean
  text: string
  link: string
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link'
}

export function Cta({ cta }: Readonly<{ cta: CtaProps }>) {
  return (
    <Button asChild variant={cta.variant ?? 'default'} size="lg">
      <a href={cta.link} target={cta.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
        {cta.text}
      </a>
    </Button>
  )
}
