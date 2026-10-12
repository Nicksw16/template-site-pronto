import { ServiceCard } from '@/components/ui/service-card'
import { cardapios, festas, preco } from '@/lib/site'

export function Festas() {
  return (
    <section id="festas" aria-labelledby="titulo-festas" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mb-10 max-w-2xl">
        <h2 id="titulo-festas" className="font-serif text-4xl tracking-tight text-balance sm:text-5xl">Que festa você vai fazer?</h2>
        <p className="text-muted-foreground mt-3 text-lg">Escolha o tipo e abra a conversa já com a mensagem pronta.</p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {festas.map((f) => (
          <ServiceCard key={f.titulo} title={f.titulo} description={f.descricao} price={preco} href={f.href} imgSrc={f.img} imgAlt={f.alt} />
        ))}
      </div>
    </section>
  )
}

export function Cardapios() {
  return (
    <section id="cardapios" aria-labelledby="titulo-cardapios" className="bg-secondary/60 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 grid gap-4 lg:grid-cols-12">
          <h2 id="titulo-cardapios" className="font-serif text-4xl tracking-tight text-balance sm:text-5xl lg:col-span-6">
            Três cardápios, um para cada tipo de festa
          </h2>
          <p className="text-muted-foreground text-lg lg:col-span-5 lg:col-start-8 lg:self-end">
            Os valores mudam com a data e o número de convidados. Por isso o orçamento sai sob medida.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {cardapios.map((c) => (
            <ServiceCard key={c.titulo} variant="default" className="bg-background" title={c.titulo} description={c.descricao} price={preco} href={c.href} imgSrc={c.img} imgAlt={c.alt} />
          ))}
        </div>
        <p className="text-muted-foreground mt-8 max-w-3xl text-sm leading-relaxed">
          [Informar o que está incluso: bebidas, bolo, garçons, decoração, taxa de serviço.] Fazemos adaptações para [alergias e restrições: confirmar].
        </p>
      </div>
    </section>
  )
}
