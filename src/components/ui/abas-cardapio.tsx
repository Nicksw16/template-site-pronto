// Abas de cardápio com indicador deslizante e painel que entra pelo lado da escolha
// (Direction Aware Tabs do Cult UI / Tabs do 21st 23570, refeitas leves com Motion).
// Acessível: role tablist/tab/tabpanel, setas do teclado; reduced-motion = troca sem deslocamento.
import { AnimatePresence, m } from 'motion/react'
import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight'
import { type KeyboardEvent, useLayoutEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import type { Item } from '@/lib/site'

export function AbasCardapio({ itens, preco }: { itens: Item[]; preco: string }) {
  const [ativo, setAtivo] = useState(0)
  const [dir, setDir] = useState(1)
  const [pilula, setPilula] = useState({ left: 0, width: 0 })
  const botoes = useRef<(HTMLButtonElement | null)[]>([])

  useLayoutEffect(() => {
    const medir = () => {
      const b = botoes.current[ativo]
      if (b) setPilula({ left: b.offsetLeft, width: b.offsetWidth })
    }
    medir()
    window.addEventListener('resize', medir)
    return () => window.removeEventListener('resize', medir)
  }, [ativo])

  const escolher = (i: number) => {
    setDir(i > ativo ? 1 : -1)
    setAtivo(i)
  }
  const teclado = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    const prox = (ativo + (e.key === 'ArrowRight' ? 1 : -1) + itens.length) % itens.length
    escolher(prox)
    botoes.current[prox]?.focus()
  }
  const c = itens[ativo]

  return (
    <div>
      <div role="tablist" aria-label="Cardápios" onKeyDown={teclado} className="bg-background/70 relative inline-flex max-w-full gap-1 overflow-x-auto rounded-full border p-1.5 backdrop-blur">
        <m.span
          aria-hidden
          animate={pilula}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          className="bg-primary absolute top-1.5 bottom-1.5 rounded-full shadow-md"
        />
        {itens.map((it, i) => (
          <button
            key={it.titulo}
            ref={(el) => {
              botoes.current[i] = el
            }}
            role="tab"
            id={`aba-${i}`}
            aria-selected={i === ativo}
            aria-controls="painel-cardapio"
            tabIndex={i === ativo ? 0 : -1}
            onClick={() => escolher(i)}
            className={`relative z-10 min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold whitespace-nowrap transition-colors duration-300 sm:px-6 sm:text-base ${i === ativo ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {it.titulo}
          </button>
        ))}
      </div>

      <div id="painel-cardapio" role="tabpanel" aria-labelledby={`aba-${ativo}`} className="relative mt-8 overflow-hidden">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <m.div
            key={c.titulo}
            custom={dir}
            variants={{
              entra: (d: number) => ({ opacity: 0, x: d * 60 }),
              fica: { opacity: 1, x: 0 },
              sai: (d: number) => ({ opacity: 0, x: d * -60 }),
            }}
            initial="entra"
            animate="fica"
            exit="sai"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
          >
            <a href={c.href} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden data-cursor={`Orçar ${c.titulo} ↗`} className="block overflow-hidden rounded-2xl lg:col-span-7">
              <m.img
                src={c.img}
                alt={c.alt}
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="aspect-[4/3] w-full object-cover"
              />
            </a>
            <div className="lg:col-span-5">
              <p className="text-accent font-serif text-sm tracking-[0.3em] uppercase">Cardápio {String(ativo + 1).padStart(2, '0')}</p>
              <h3 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">{c.titulo}</h3>
              <p className="text-muted-foreground mt-4 text-lg leading-relaxed">{c.descricao}</p>
              <p className="text-accent mt-4 font-medium">{preco}</p>
              <Button asChild size="lg" className="brilho-cta group mt-8 w-full transition-[background-color,transform] active:scale-[0.97] sm:w-auto">
                <a href={c.href} target="_blank" rel="noopener noreferrer">
                  Pedir orçamento do {c.titulo}
                  <ArrowRight aria-hidden className="size-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
