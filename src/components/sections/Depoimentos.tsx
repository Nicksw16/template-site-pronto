// Carregado com React.lazy e só quando houver depoimentos reais em src/lib/site.ts.
import TestimonialCarousel from '@/components/ui/testimonial-carousel'
import { depoimentos } from '@/lib/site'

export default function Depoimentos() {
  return (
    <section aria-labelledby="titulo-depoimentos" className="bg-secondary/60 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 id="titulo-depoimentos" className="mb-8 text-center font-serif text-4xl tracking-tight sm:text-5xl">Quem já fez festa aqui</h2>
        <TestimonialCarousel itens={depoimentos} />
      </div>
    </section>
  )
}
