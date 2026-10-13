// "O espaço" como Sticky Scroll Reveal (Aceternity, 21st id 952), adaptado à rolagem da página:
// no desktop a foto fica fixa ao lado e troca conforme o item ativo, dissolvendo em ruído (FotoMorph, 21st 27258);
// no celular cada item mostra a sua foto.
import { useEffect, useRef, useState } from 'react'
import { m } from 'motion/react'
import { CalendarCheck } from '@phosphor-icons/react/dist/csr/CalendarCheck'
import { Car } from '@phosphor-icons/react/dist/csr/Car'
import { Wheelchair } from '@phosphor-icons/react/dist/csr/Wheelchair'
import { Button } from '@/components/ui/button'
import { FotoMorph } from '@/components/ui/foto-morph'
import { Revelar } from '@/components/ui/revelar'
import { MaskedTextReveal } from '@/components/ui/text-reveal-mask'
import { waVisita } from '@/lib/site'

const itens = [
  {
    titulo: 'Salão climatizado',
    texto: 'Espaço para até [X] convidados, com pista, mesas montadas e iluminação para a noite. [confirmar capacidade]',
    img: '/img/salao.webp',
    alt: 'Salão climatizado da Villa Aurora com mesas montadas [foto de exemplo: trocar]',
  },
  {
    titulo: 'Área kids',
    texto: 'Brinquedoteca para as crianças brincarem enquanto os adultos aproveitam a festa. [confirmar se tem monitor]',
    img: '/img/area-kids.webp',
    alt: 'Brinquedoteca da Villa Aurora com espaço para as crianças [foto de exemplo: trocar]',
  },
  {
    titulo: 'Cozinha própria',
    texto: 'O buffet é preparado no local, então a comida chega à mesa no ponto certo.',
    img: '/img/cozinha.webp',
    alt: 'Cozinha própria onde o buffet da Villa Aurora é preparado [foto de exemplo: trocar]',
  },
  {
    titulo: 'Equipe do começo ao fim',
    texto: 'Recepção, garçons e cozinha cuidando de tudo para você só curtir. [garçons / cozinha / recepção: confirmar]',
    img: '/img/equipe.webp',
    alt: 'Equipe de cozinha da Villa Aurora finalizando os pratos [foto de exemplo: trocar]',
  },
]

export function Sobre() {
  const [ativo, setAtivo] = useState(0)
  const blocos = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) if (e.isIntersecting) setAtivo(Number((e.target as HTMLElement).dataset.i))
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    blocos.current.forEach((b) => b && io.observe(b))
    return () => io.disconnect()
  }, [])

  return (
    <section id="espaco" aria-labelledby="titulo-espaco" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <MaskedTextReveal as="h2" id="titulo-espaco" text="Um lugar pensado para receber" className="font-serif text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl" />
        </div>
        <Revelar atraso={0.2} className="lg:col-span-5">
          <p className="text-muted-foreground text-lg leading-relaxed">
            A Villa Aurora reúne o salão, a cozinha e a equipe no mesmo endereço. Você fala com um único lugar sobre data, cardápio e organização.
          </p>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">[Contar em 2 ou 3 frases a história real: quem fundou, desde quando. Só com dados verdadeiros do cliente.]</p>
        </Revelar>
      </div>

      <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-16">
        <ol className="lg:col-span-5">
          {itens.map((it, i) => (
            <li
              key={it.titulo}
              ref={(el) => {
                blocos.current[i] = el
              }}
              data-i={i}
              className="border-border flex flex-col justify-center border-t py-8 lg:min-h-[62vh] lg:py-0"
            >
              <img src={it.img} alt={it.alt} width={900} height={675} loading="lazy" decoding="async" className="mb-6 aspect-[4/3] w-full rounded-2xl object-cover lg:hidden" />
              <m.div animate={{ opacity: ativo === i ? 1 : 0.35 }} transition={{ duration: 0.4 }} className="max-lg:!opacity-100">
                <span className="text-accent font-serif text-sm tracking-[0.3em]">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 font-serif text-4xl leading-tight sm:text-5xl">{it.titulo}</h3>
                <p className="text-muted-foreground mt-4 max-w-md text-lg leading-relaxed">{it.texto}</p>
              </m.div>
            </li>
          ))}
          <li className="border-border flex flex-wrap gap-3 border-t pt-8">
            <span className="bg-secondary inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm">
              <Car aria-hidden className="text-primary size-5" /> Estacionamento: [sim/não]
            </span>
            <span className="bg-secondary inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm">
              <Wheelchair aria-hidden className="text-primary size-5" /> Acessibilidade: [confirmar]
            </span>
            <Button asChild variant="outline" size="lg" className="mt-3 w-full transition-transform active:scale-[0.97] sm:w-auto">
              <a href={waVisita} target="_blank" rel="noopener noreferrer">
                <CalendarCheck aria-hidden className="size-5" />
                Agendar uma visita
              </a>
            </Button>
          </li>
        </ol>

        <div className="hidden lg:col-span-7 lg:block">
          <div className="sticky top-24 h-[72vh] overflow-hidden rounded-3xl shadow-2xl">
            <FotoMorph itens={itens.map((it) => ({ src: it.img, alt: it.alt }))} ativo={ativo} className="absolute inset-0" />
            <div aria-hidden className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/60 to-transparent p-6 text-[#fffaf7]">
              <span className="font-serif text-3xl">{itens[ativo].titulo}</span>
              <span className="text-sm tabular-nums opacity-80">
                {String(ativo + 1).padStart(2, '0')} / {String(itens.length).padStart(2, '0')}
              </span>
            </div>
            <div aria-hidden className="absolute top-0 left-0 h-1 bg-[#e9b872] transition-[width] duration-700" style={{ width: `${((ativo + 1) / itens.length) * 100}%` }} />
          </div>
        </div>
      </div>
    </section>
  )
}
