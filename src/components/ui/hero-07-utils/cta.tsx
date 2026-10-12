// Escrito à mão pela Lynx: o registro do 21st não entrega "hero-07-utils/cta".
import * as React from 'react'
import { Button } from '@/components/ui/button'

export interface CtaProps {
  ctaEnabled: boolean
  text: string
  link: string
  icon?: React.ReactNode
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link'
}

export function Cta({ cta }: Readonly<{ cta: CtaProps }>) {
  const externo = cta.link.startsWith('http')
  return (
    <Button asChild variant={cta.variant ?? 'default'} size="lg" className={cta.variant && cta.variant !== 'default' ? 'w-full sm:w-auto' : 'brilho-cta w-full sm:w-auto'}>
      <a
        href={cta.link}
        {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {cta.icon}
        {cta.text}
      </a>
    </Button>
  )
}
