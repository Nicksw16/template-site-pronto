// Chamada final com fundo Aurora (Aceternity, 21st id 1120) nas cores da marca — "Villa Aurora".
import { CalendarCheck } from '@phosphor-icons/react/dist/csr/CalendarCheck'
import { WhatsappLogo } from '@phosphor-icons/react/dist/csr/WhatsappLogo'
import { Button } from '@/components/ui/button'
import { Magnetico } from '@/components/ui/efeitos'
import { Revelar } from '@/components/ui/revelar'
import { MaskedTextReveal } from '@/components/ui/text-reveal-mask'
import { waGeral, waVisita } from '@/lib/site'

export function ChamadaFinal() {
  return (
    <section aria-labelledby="titulo-chamada" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div className="aurora absolute -inset-[10px]" />
      </div>
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
        <MaskedTextReveal
          as="h2"
          id="titulo-chamada"
          text="Vamos planejar a sua festa?"
          className="font-serif text-5xl leading-[1.05] tracking-tight sm:text-7xl"
        />
        <Revelar atraso={0.3}>
          <p className="text-muted-foreground mx-auto mt-5 max-w-xl text-lg">
            Conte a data e quantos convidados você espera. A gente responde pelo WhatsApp com o orçamento e um horário para você conhecer o espaço.
          </p>
        </Revelar>
        <Revelar atraso={0.45} className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Magnetico>
            <Button asChild size="lg" className="brilho-cta w-full transition-[background-color,transform] active:scale-[0.97] sm:w-auto">
              <a href={waGeral} target="_blank" rel="noopener noreferrer">
                <WhatsappLogo aria-hidden className="size-5" />
                Pedir orçamento pelo WhatsApp
              </a>
            </Button>
          </Magnetico>
          <Button asChild size="lg" variant="outline" className="vidro border-white/50 transition-transform active:scale-[0.97]">
            <a href={waVisita} target="_blank" rel="noopener noreferrer">
              <CalendarCheck aria-hidden className="size-5" />
              Agendar uma visita
            </a>
          </Button>
        </Revelar>
      </div>
    </section>
  )
}
