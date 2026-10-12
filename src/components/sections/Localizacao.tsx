// Feito à mão: sem iframe no carregamento (leve, sem terceiros e sem erro no console).
import { Car } from '@phosphor-icons/react/dist/csr/Car'
import { Clock } from '@phosphor-icons/react/dist/csr/Clock'
import { InstagramLogo } from '@phosphor-icons/react/dist/csr/InstagramLogo'
import { MapPin } from '@phosphor-icons/react/dist/csr/MapPin'
import { MapTrifold } from '@phosphor-icons/react/dist/csr/MapTrifold'
import { CalendarCheck } from '@phosphor-icons/react/dist/csr/CalendarCheck'
import { WhatsappLogo } from '@phosphor-icons/react/dist/csr/WhatsappLogo'
import { Button } from '@/components/ui/button'
import { CIDADE, ENDERECO, HORARIO, INSTAGRAM, instagramUrl, mapaUrl, waGeral } from '@/lib/site'

export function Localizacao() {
  const itens = [
    { icon: MapPin, rotulo: 'Endereço', texto: ENDERECO },
    { icon: Clock, rotulo: 'Atendimento', texto: HORARIO },
    { icon: CalendarCheck, rotulo: 'Visitas', texto: 'Com agendamento pelo WhatsApp' },
    { icon: Car, rotulo: 'Estacionamento', texto: '[sim/não]' },
    { icon: MapTrifold, rotulo: 'Atendemos', texto: `${CIDADE} e região: [bairros / cidades vizinhas]` },
  ]
  return (
    <section id="localizacao" aria-labelledby="titulo-localizacao" className="bg-secondary/60 py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="titulo-localizacao" className="font-serif text-4xl tracking-tight sm:text-5xl">Como chegar</h2>
          <p className="text-muted-foreground mt-3 text-lg">Venha conhecer o salão antes de fechar a data.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={waGeral} target="_blank" rel="noopener noreferrer">
                <WhatsappLogo aria-hidden className="size-5" />
                Pedir orçamento pelo WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={mapaUrl} target="_blank" rel="noopener noreferrer">
                <MapPin aria-hidden className="size-5" />
                Abrir no mapa
              </a>
            </Button>
          </div>
        </div>
        <dl className="bg-background grid gap-5 rounded-xl border p-6 sm:p-8 lg:col-span-6 lg:col-start-7">
          {itens.map(({ icon: Icon, rotulo, texto }) => (
            <div key={rotulo} className="flex gap-4">
              <Icon aria-hidden className="text-primary mt-0.5 size-6 shrink-0" />
              <div>
                <dt className="text-sm font-semibold">{rotulo}</dt>
                <dd className="text-muted-foreground">{texto}</dd>
              </div>
            </div>
          ))}
          <div className="flex gap-4">
            <InstagramLogo aria-hidden className="text-primary mt-0.5 size-6 shrink-0" />
            <div>
              <dt className="text-sm font-semibold">Instagram</dt>
              <dd>
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-primary inline-flex min-h-11 items-center underline-offset-4 hover:underline">@{INSTAGRAM}</a>
              </dd>
            </div>
          </div>
        </dl>
      </div>
    </section>
  )
}
