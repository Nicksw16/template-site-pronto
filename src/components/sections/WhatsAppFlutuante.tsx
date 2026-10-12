import { useState } from 'react'
import { m, useMotionValueEvent, useScroll } from 'motion/react'
import { WhatsappLogo } from '@phosphor-icons/react/dist/csr/WhatsappLogo'
import { waGeral } from '@/lib/site'

// Botão fixo só no celular: sobe depois que o visitante passa do topo e pulsa de leve.
export function WhatsAppFlutuante() {
  const { scrollY } = useScroll()
  const [visivel, setVisivel] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setVisivel(y > 480))

  return (
    <m.div
      initial={false}
      animate={{ y: visivel ? 0 : 120, opacity: visivel ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
    >
      <a
        href={waGeral}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visivel ? 0 : -1}
        className="brilho-cta pulsar bg-primary text-primary-foreground pointer-events-auto flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 font-semibold shadow-lg transition-transform active:scale-[0.97]"
      >
        <WhatsappLogo aria-hidden weight="fill" className="size-6" />
        Pedir orçamento pelo WhatsApp
      </a>
    </m.div>
  )
}
