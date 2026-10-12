import SingleOpenAccordion from '@/components/ui/single-open-accordion'
import { Button } from '@/components/ui/button'
import { Revelar } from '@/components/ui/revelar'
import { faq, waGeral } from '@/lib/site'

export function Perguntas() {
  return (
    <section id="perguntas" aria-labelledby="titulo-perguntas" className="px-4 py-16 sm:px-6 sm:py-24">
      <Revelar de="zoom">
      <SingleOpenAccordion
        titleId="titulo-perguntas"
        title="Dúvidas de quem está organizando a festa"
        items={faq.map((f) => ({ id: f.id, question: f.q, answer: f.a }))}
        footer={
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href={waGeral} target="_blank" rel="noopener noreferrer">Pedir orçamento</a>
          </Button>
        }
      />
      </Revelar>
    </section>
  )
}
