import { useState } from 'react'
import { m, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { WhatsappLogo } from '@phosphor-icons/react/dist/csr/WhatsappLogo'
import { waGeral } from '@/lib/site'

const links = [
  { href: '#festas', label: 'Festas' },
  { href: '#cardapios', label: 'Cardápios' },
  { href: '#espaco', label: 'O espaço' },
  { href: '#perguntas', label: 'Perguntas' },
  { href: '#localizacao', label: 'Como chegar' },
]

// Cabeçalho inteligente: some ao descer, volta ao subir; barra de progresso da leitura.
export function Cabecalho() {
  const { scrollY, scrollYProgress } = useScroll()
  const progresso = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })
  const [oculto, setOculto] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => {
    const antes = scrollY.getPrevious() ?? 0
    setOculto(y > antes && y > 320)
  })
  return (
    <>
    <m.header
      animate={{ y: oculto ? '-130%' : '0%' }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-2 z-40 px-2 sm:top-3 sm:px-4"
    >
      <div className="vidro mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 rounded-2xl border border-white/40 px-3 sm:h-16 sm:px-5">
        <a href="#inicio" className="flex min-h-11 items-center gap-2" aria-label="Villa Aurora, voltar ao início">
          <img src="/favicon.svg" alt="" width={32} height={32} className="size-8" />
          <span className="font-serif text-2xl leading-none font-semibold">Villa Aurora</span>
        </a>
        <nav aria-label="Seções" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-muted-foreground hover:text-foreground after:bg-accent relative inline-flex min-h-11 items-center px-3 text-[0.95rem] transition-colors after:absolute after:inset-x-3 after:bottom-2 after:h-px after:origin-right after:scale-x-0 after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={waGeral}
          target="_blank"
          rel="noopener noreferrer"
          className="brilho-cta bg-primary text-primary-foreground hover:bg-primary/90 hidden min-h-11 active:scale-[0.97] transition-[background-color,transform] items-center gap-2 rounded-xl px-4 text-sm font-medium transition-colors sm:inline-flex"
        >
          <WhatsappLogo aria-hidden className="size-5" />
          Pedir orçamento
        </a>
      </div>
    </m.header>
    <m.div aria-hidden style={{ scaleX: progresso }} className="bg-accent fixed inset-x-0 top-0 z-50 h-[3px] origin-left" />
    </>
  )
}
