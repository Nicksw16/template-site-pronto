// Chamada final com gradiente animado em WebGL (mesh gradient do 21st, estilo ShaderGradient) nas cores da marca.
import { CalendarCheck } from '@phosphor-icons/react/dist/csr/CalendarCheck'
import { WhatsappLogo } from '@phosphor-icons/react/dist/csr/WhatsappLogo'
import { Button } from '@/components/ui/button'
import { GradienteShader } from '@/components/ui/gradiente-shader'

const CORES = ['#0b2e27', '#14584a', '#e9b872', '#aa3c25', '#1f6e5c']
import { Magnetico } from '@/components/ui/efeitos'
import { Revelar } from '@/components/ui/revelar'
import { MaskedTextReveal } from '@/components/ui/text-reveal-mask'
import { waGeral, waVisita } from '@/lib/site'

export function ChamadaFinal() {
  return (
    <section aria-labelledby="titulo-chamada" className="relative isolate overflow-hidden bg-[#0f3d34] py-28 text-[#fffaf7] sm:py-40">
      <div aria-hidden className="absolute inset-0 -z-10">
        <GradienteShader cores={CORES} />
        <div className="absolute inset-0 bg-black/25" />
      </div>
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
        <MaskedTextReveal
          as="h2"
          id="titulo-chamada"
          text="Vamos planejar a sua festa?"
          className="font-serif text-5xl leading-[1.02] tracking-tight sm:text-8xl"
        />
        <Revelar atraso={0.3}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-[#fffaf7]/85">
            Conte a data e quantos convidados você espera. A gente responde pelo WhatsApp com o orçamento e um horário para você conhecer o espaço.
          </p>
        </Revelar>
        <Revelar atraso={0.45} className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Magnetico>
            <Button asChild size="lg" className="brilho-cta w-full bg-[#fffaf7] text-[#14584a] transition-[background-color,transform] hover:bg-white active:scale-[0.97] sm:w-auto">
              <a href={waGeral} target="_blank" rel="noopener noreferrer">
                <WhatsappLogo aria-hidden className="size-5" />
                Pedir orçamento pelo WhatsApp
              </a>
            </Button>
          </Magnetico>
          <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-[#fffaf7] backdrop-blur-md transition-transform hover:bg-white/20 hover:text-white active:scale-[0.97]">
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
