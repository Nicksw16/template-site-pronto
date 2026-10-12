import { ServiceCard } from '@/components/ui/service-card'
import { Inclinar } from '@/components/ui/inclinar'
import { Revelar, RevelarGrupo, RevelarItem } from '@/components/ui/revelar'
import { MaskedTextReveal } from '@/components/ui/text-reveal-mask'
import { cardapios, festas, preco } from '@/lib/site'

export function Festas() {
  return (
    <section id="festas" aria-labelledby="titulo-festas" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mb-10 max-w-2xl">
        <MaskedTextReveal as="h2" id="titulo-festas" text="Que festa você vai fazer?" className="font-serif text-4xl tracking-tight sm:text-5xl" />
        <Revelar atraso={0.25}>
          <p className="text-muted-foreground mt-3 text-lg">Escolha o tipo e abra a conversa já com a mensagem pronta.</p>
        </Revelar>
      </div>
      <RevelarGrupo className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {festas.map((f) => (
          <RevelarItem key={f.titulo}>
            <Inclinar className="h-full">
              <ServiceCard className="h-full" title={f.titulo} description={f.descricao} price={preco} href={f.href} imgSrc={f.img} imgAlt={f.alt} />
            </Inclinar>
          </RevelarItem>
        ))}
      </RevelarGrupo>
    </section>
  )
}

export function Cardapios() {
  return (
    <section id="cardapios" aria-labelledby="titulo-cardapios" className="bg-secondary/60 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <MaskedTextReveal as="h2" id="titulo-cardapios" text="Três cardápios, um para cada tipo de festa" className="font-serif text-4xl tracking-tight sm:text-5xl" />
          </div>
          <Revelar atraso={0.25} className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <p className="text-muted-foreground text-lg">Os valores mudam com a data e o número de convidados. Por isso o orçamento sai sob medida.</p>
          </Revelar>
        </div>
        <RevelarGrupo className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {cardapios.map((c) => (
            <RevelarItem key={c.titulo}>
              <Inclinar className="h-full">
                <ServiceCard variant="default" className="bg-background h-full" title={c.titulo} description={c.descricao} price={preco} href={c.href} imgSrc={c.img} imgAlt={c.alt} />
              </Inclinar>
            </RevelarItem>
          ))}
        </RevelarGrupo>
        <Revelar>
          <p className="text-muted-foreground mt-8 max-w-3xl text-sm leading-relaxed">
            [Informar o que está incluso: bebidas, bolo, garçons, decoração, taxa de serviço.] Fazemos adaptações para [alergias e restrições: confirmar].
          </p>
        </Revelar>
      </div>
    </section>
  )
}
