import { AbasCardapio } from '@/components/ui/abas-cardapio'
import { BentoFestas } from '@/components/ui/bento-festas'
import { Revelar } from '@/components/ui/revelar'
import { MaskedTextReveal } from '@/components/ui/text-reveal-mask'
import { cardapios, festas, preco } from '@/lib/site'

export function Festas() {
  return (
    <section id="festas" aria-labelledby="titulo-festas" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="lg:max-w-3xl lg:flex-1">
          <MaskedTextReveal as="h2" id="titulo-festas" text="Que festa você vai fazer?" className="font-serif text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl" />
        </div>
        <Revelar atraso={0.25}>
          <p className="text-muted-foreground max-w-sm text-lg">Escolha o tipo e abra a conversa já com a mensagem pronta.</p>
        </Revelar>
      </div>
      <BentoFestas itens={festas} preco={preco} />
    </section>
  )
}

export function Cardapios() {
  return (
    <section id="cardapios" aria-labelledby="titulo-cardapios" className="bg-secondary/60 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <MaskedTextReveal as="h2" id="titulo-cardapios" text="Três cardápios, um para cada tipo de festa" className="font-serif text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl" />
          </div>
          <Revelar atraso={0.25} className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <p className="text-muted-foreground text-lg">Os valores mudam com a data e o número de convidados. Por isso o orçamento sai sob medida.</p>
          </Revelar>
        </div>
        <Revelar>
          <AbasCardapio itens={cardapios} preco={preco} />
        </Revelar>
        <Revelar>
          <p className="text-muted-foreground mt-8 max-w-3xl text-sm leading-relaxed">
            [Informar o que está incluso: bebidas, bolo, garçons, decoração, taxa de serviço.] Fazemos adaptações para [alergias e restrições: confirmar].
          </p>
        </Revelar>
      </div>
    </section>
  )
}
