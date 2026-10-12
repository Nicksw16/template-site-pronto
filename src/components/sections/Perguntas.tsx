// Perguntas em duas colunas (FAQ Two Column do 21st, ids 26656 / 26910): título e contato fixos à esquerda,
// perguntas à direita. No celular empilha.
import { WhatsappLogo } from '@phosphor-icons/react/dist/csr/WhatsappLogo'
import SingleOpenAccordion from '@/components/ui/single-open-accordion'
import { Button } from '@/components/ui/button'
import { Revelar } from '@/components/ui/revelar'
import { MaskedTextReveal } from '@/components/ui/text-reveal-mask'
import { faq, waGeral } from '@/lib/site'

export function Perguntas() {
  return (
    <section id="perguntas" aria-labelledby="titulo-perguntas" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="text-accent font-serif text-sm tracking-[0.3em] uppercase">Perguntas frequentes</p>
            <MaskedTextReveal as="h2" id="titulo-perguntas" text="Dúvidas de quem está organizando a festa" className="mt-3 font-serif text-5xl leading-[1.02] tracking-tight sm:text-6xl" />
            <Revelar atraso={0.2}>
              <div className="bg-secondary/70 mt-8 rounded-2xl p-6">
                <p className="font-serif text-2xl">Não achou a sua pergunta?</p>
                <p className="text-muted-foreground mt-2">Mande no WhatsApp. A gente responde com calma, sem compromisso.</p>
                <Button asChild size="lg" className="brilho-cta mt-5 w-full transition-[background-color,transform] active:scale-[0.97] sm:w-auto">
                  <a href={waGeral} target="_blank" rel="noopener noreferrer">
                    <WhatsappLogo aria-hidden className="size-5" />
                    Perguntar no WhatsApp
                  </a>
                </Button>
              </div>
            </Revelar>
          </div>
        </div>
        <Revelar de="direita" className="lg:col-span-7">
          <SingleOpenAccordion title="" className="max-w-none" items={faq.map((f) => ({ id: f.id, question: f.q, answer: f.a }))} />
        </Revelar>
      </div>
    </section>
  )
}
