// Feito à mão: sem iframe no carregamento (leve, sem terceiros e sem erro no console).
import { Car } from '@phosphor-icons/react/dist/csr/Car'
import { Clock } from '@phosphor-icons/react/dist/csr/Clock'
import { InstagramLogo } from '@phosphor-icons/react/dist/csr/InstagramLogo'
import { MapPin } from '@phosphor-icons/react/dist/csr/MapPin'
import { MapTrifold } from '@phosphor-icons/react/dist/csr/MapTrifold'
import { CalendarCheck } from '@phosphor-icons/react/dist/csr/CalendarCheck'
import { WhatsappLogo } from '@phosphor-icons/react/dist/csr/WhatsappLogo'
import { Button } from '@/components/ui/button'
import { Revelar, RevelarGrupo, RevelarItem } from '@/components/ui/revelar'
import { MaskedTextReveal } from '@/components/ui/text-reveal-mask'
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
    <section id="localizacao" aria-labelledby="titulo-localizacao" className="px-2 py-8 sm:px-4 sm:py-12">
      <div className="relative isolate mx-auto max-w-[96rem] overflow-hidden rounded-[2rem] px-4 py-16 text-[#fffaf7] sm:px-10 sm:py-24 lg:px-16">
      <img src="/img/galeria-3.webp" alt="" width={900} height={601} loading="lazy" decoding="async" className="absolute inset-0 -z-20 size-full object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-[#120c0e]/85 via-[#120c0e]/60 to-[#120c0e]/30" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <MaskedTextReveal as="h2" id="titulo-localizacao" text="Como chegar" className="font-serif text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl" />
          <p className="mt-4 text-lg text-[#fffaf7]/80">Venha conhecer o salão antes de fechar a data.</p>
          <Revelar atraso={0.2} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="brilho-cta bg-[#fffaf7] text-[#14584a] transition-[background-color,transform] hover:bg-white active:scale-[0.97]">
              <a href={waGeral} target="_blank" rel="noopener noreferrer">
                <WhatsappLogo aria-hidden className="size-5" />
                Pedir orçamento pelo WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-[#fffaf7] backdrop-blur-md hover:bg-white/20 hover:text-white">
              <a href={mapaUrl} target="_blank" rel="noopener noreferrer">
                <MapPin aria-hidden className="size-5" />
                Abrir no mapa
              </a>
            </Button>
          </Revelar>
        </div>
        <Revelar de="direita" className="lg:col-span-6 lg:col-start-7">
        <RevelarGrupo className="grid gap-5 rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        <dl className="contents">
          {itens.map(({ icon: Icon, rotulo, texto }) => (
            <RevelarItem key={rotulo} className="flex gap-4">
              <Icon aria-hidden className="mt-0.5 size-6 shrink-0 text-[#e9b872]" />
              <div>
                <dt className="text-sm font-semibold">{rotulo}</dt>
                <dd className="text-[#fffaf7]/80">{texto}</dd>
              </div>
            </RevelarItem>
          ))}
          <RevelarItem className="flex gap-4">
            <InstagramLogo aria-hidden className="mt-0.5 size-6 shrink-0 text-[#e9b872]" />
            <div>
              <dt className="text-sm font-semibold">Instagram</dt>
              <dd>
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-[#e9b872] underline-offset-4 hover:underline">@{INSTAGRAM}</a>
              </dd>
            </div>
          </RevelarItem>
        </dl>
        </RevelarGrupo>
        </Revelar>
      </div>
      </div>
    </section>
  )
}
