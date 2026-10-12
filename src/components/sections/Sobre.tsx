import { Car } from '@phosphor-icons/react/dist/csr/Car'
import { ChefHat } from '@phosphor-icons/react/dist/csr/ChefHat'
import { PuzzlePiece } from '@phosphor-icons/react/dist/csr/PuzzlePiece'
import { Snowflake } from '@phosphor-icons/react/dist/csr/Snowflake'
import { UsersThree } from '@phosphor-icons/react/dist/csr/UsersThree'
import { Wheelchair } from '@phosphor-icons/react/dist/csr/Wheelchair'
import { CalendarCheck } from '@phosphor-icons/react/dist/csr/CalendarCheck'
import { Button } from '@/components/ui/button'
import { FotoRevelada, Revelar, RevelarLi, RevelarLista } from '@/components/ui/revelar'
import { MaskedTextReveal } from '@/components/ui/text-reveal-mask'
import { waVisita } from '@/lib/site'

const estrutura = [
  { icon: Snowflake, texto: 'Salão climatizado para até [X] convidados' },
  { icon: PuzzlePiece, texto: 'Área kids / brinquedoteca' },
  { icon: ChefHat, texto: 'Cozinha própria: o buffet é preparado no local' },
  { icon: Car, texto: 'Estacionamento: [sim/não, quantas vagas]' },
  { icon: Wheelchair, texto: 'Acessibilidade: [rampa, banheiro adaptado, etc.]' },
  { icon: UsersThree, texto: 'Equipe de [garçons / cozinha / recepção: confirmar]' },
]

export function Sobre() {
  return (
    <section id="espaco" aria-labelledby="titulo-espaco" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <MaskedTextReveal as="h2" id="titulo-espaco" text="Um lugar pensado para receber" className="font-serif text-4xl tracking-tight sm:text-5xl" />
          <Revelar atraso={0.2}>
          <p className="text-muted-foreground mt-5 text-lg leading-relaxed">
            A Villa Aurora reúne o salão, a cozinha e a equipe no mesmo endereço. Você fala com um único lugar sobre data, cardápio e organização, sem juntar fornecedores.
          </p>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            [Contar em 2 ou 3 frases a história real: quem fundou, desde quando, quantas festas por mês. Só com dados verdadeiros do cliente.]
          </p>
          </Revelar>
          <RevelarLista className="mt-8 grid gap-3">
            {estrutura.map(({ icon: Icon, texto }) => (
              <RevelarLi key={texto} className="flex items-start gap-3">
                <span className="bg-secondary text-primary flex size-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 motion-safe:hover:scale-110 motion-safe:hover:-rotate-6">
                  <Icon aria-hidden className="size-5" />
                </span>
                <span className="pt-2 leading-snug">{texto}</span>
              </RevelarLi>
            ))}
          </RevelarLista>
          <Button asChild variant="outline" size="lg" className="mt-8 w-full sm:w-auto">
            <a href={waVisita} target="_blank" rel="noopener noreferrer">
              <CalendarCheck aria-hidden className="size-5" />
              Agendar uma visita
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-7">
          <FotoRevelada src="/img/salao.webp" alt="Salão climatizado da Villa Aurora com mesas montadas [foto de exemplo: trocar]" width={900} height={1200} className="row-span-2" />
          <FotoRevelada src="/img/area-kids.webp" alt="Brinquedoteca da Villa Aurora com espaço para as crianças [foto de exemplo: trocar]" width={900} height={675} className="aspect-[4/3]" atraso={0.15} />
          <FotoRevelada src="/img/cozinha.webp" alt="Cozinha própria onde o buffet da Villa Aurora é preparado [foto de exemplo: trocar]" width={900} height={675} className="aspect-[4/3]" atraso={0.3} />
          <FotoRevelada src="/img/equipe.webp" alt="Equipe de cozinha da Villa Aurora finalizando os pratos [foto de exemplo: trocar]" width={900} height={675} className="col-span-2 aspect-[16/7]" atraso={0.2} />
        </div>
      </div>
    </section>
  )
}
