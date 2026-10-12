// Testimonial Carousel (21st.dev id 19099, cnippet-dev) adaptado pela Lynx:
// - só depoimentos reais (vem de props); sem autoplay; Phosphor Quotes; avatar com iniciais;
// - dots com área de toque de 44px e rótulos em português; 1 depoimento = sem dots.
import useEmblaCarousel from 'embla-carousel-react'
import { Quotes } from '@phosphor-icons/react/dist/csr/Quotes'
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface Depoimento {
  nome: string
  festa: string
  texto: string
}

const iniciais = (nome: string) =>
  nome.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join('')

export default function TestimonialCarousel({ itens }: { itens: Depoimento[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: itens.length > 1 })
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  return (
    <div className="mx-auto w-full max-w-xl space-y-3" aria-roledescription="carrossel" aria-label="Depoimentos de clientes">
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex">
          {itens.map((t, i) => (
            <figure className="min-w-0 shrink-0 grow-0 basis-full" key={i} aria-label={`${i + 1} de ${itens.length}`}>
              <div className="bg-card flex flex-col gap-4 rounded-xl border p-6 sm:p-8">
                <Quotes aria-hidden weight="fill" className="text-accent size-6" />
                <blockquote className="text-base leading-relaxed sm:text-lg">{t.texto}</blockquote>
                <figcaption className="flex items-center gap-3">
                  <span className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-full text-sm font-semibold">
                    {iniciais(t.nome)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{t.nome}</span>
                    <span className="text-muted-foreground block text-sm">{t.festa}</span>
                  </span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
      {itens.length > 1 && (
        <div className="flex justify-center">
          {itens.map((_, i) => (
            <button
              aria-label={`Ver depoimento ${i + 1}`}
              aria-current={i === current}
              className="flex size-11 items-center justify-center"
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              type="button"
            >
              <span
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  i === current ? 'bg-primary w-6' : 'bg-muted-foreground/40 w-2',
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
