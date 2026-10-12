// Feito à mão: 3 passos + formulário curto que monta a mensagem do WhatsApp.
// Também registra o pedido no Netlify Forms (form "orcamento"; cópia oculta no index.html).
import * as React from 'react'
import { WhatsappLogo } from '@phosphor-icons/react/dist/csr/WhatsappLogo'
import { m, useScroll, useTransform } from 'motion/react'
import { CheckCircle } from '@phosphor-icons/react/dist/csr/CheckCircle'
import { Button } from '@/components/ui/button'
import { Revelar } from '@/components/ui/revelar'
import { MaskedTextReveal } from '@/components/ui/text-reveal-mask'
import { cardapios, festas, HORARIO, waLink } from '@/lib/site'

const passos = [
  { titulo: 'Mande três informações.', texto: 'Data da festa, número de convidados e tipo de festa. A mensagem já vem pronta no botão.' },
  { titulo: 'Receba a proposta.', texto: 'Respondemos pelo WhatsApp em [prazo de resposta: ex. até 1 dia útil] com valores e o que está incluso.' },
  { titulo: 'Visite e reserve.', texto: 'Conheça o espaço com hora marcada e garanta a data com [sinal / forma de reserva: confirmar].' },
]

const campo =
  'border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-ring min-h-12 w-full rounded-xl border px-4 text-base focus-visible:ring-2 focus-visible:outline-none'

function dataBr(iso: string) {
  const [a, m, d] = iso.split('-')
  return a && m && d ? `${d}/${m}/${a}` : '__'
}

export function Orcamento() {
  const [erro, setErro] = React.useState('')
  const [enviado, setEnviado] = React.useState(false)
  const lista = React.useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: lista, offset: ['start 75%', 'end 45%'] })
  const linha = useTransform(scrollYProgress, [0, 1], [0, 1])

  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const dados = Object.fromEntries(new FormData(form)) as Record<string, string>
    if (dados['bot-field']) return
    if (!dados.data || !dados.convidados || !dados.tipo) {
      setErro('Preencha a data, o número de convidados e o tipo de festa.')
      return
    }
    setErro('')
    setEnviado(true)
    const msg =
      `Olá! Vi o site da Villa Aurora e quero um orçamento. Data: ${dataBr(dados.data)} · Convidados: ${dados.convidados} · Tipo de festa: ${dados.tipo}` +
      (dados.cardapio ? ` · Cardápio: ${dados.cardapio}` : '') +
      (dados.nome ? ` · Nome: ${dados.nome}` : '')

    // Abre o WhatsApp primeiro (no mesmo clique, para o navegador não bloquear)
    window.open(waLink(msg), '_blank', 'noopener,noreferrer')

    // Registra no Netlify Forms sem travar a conversa; depois vai para a página de obrigado
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ 'form-name': 'orcamento', ...dados }).toString(),
      keepalive: true,
    })
      .catch(() => undefined)
      .finally(() => {
        window.location.href = '/obrigado.html'
      })
  }

  return (
    <section id="orcamento" aria-labelledby="titulo-orcamento" className="bg-primary/[0.06] py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <MaskedTextReveal as="h2" id="titulo-orcamento" text="Orçamento em 3 passos" className="font-serif text-4xl tracking-tight sm:text-5xl" />
          <ol ref={lista} className="relative mt-8 grid gap-6">
            <span aria-hidden className="bg-border absolute top-5 bottom-5 left-5 w-px -translate-x-1/2" />
            <m.span aria-hidden style={{ scaleY: linha }} className="bg-primary absolute top-5 bottom-5 left-5 w-0.5 origin-top -translate-x-1/2" />
            {passos.map((p, i) => (
              <m.li
                key={p.titulo}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '0px 0px -20% 0px' }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex gap-4"
              >
                <m.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '0px 0px -20% 0px' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 16, delay: 0.1 + i * 0.15 }}
                  className="bg-primary text-primary-foreground ring-background flex size-10 shrink-0 items-center justify-center rounded-full font-semibold ring-4"
                >
                  {i + 1}
                </m.span>
                <p className="leading-relaxed">
                  <strong className="font-semibold">{p.titulo}</strong>{' '}
                  <span className="text-muted-foreground">{p.texto}</span>
                </p>
              </m.li>
            ))}
          </ol>
          <p className="text-muted-foreground mt-8 text-sm">Atendimento {HORARIO}. Sem compromisso: você só decide depois de ver a proposta.</p>
        </div>

        <Revelar de="direita" className="lg:col-span-7">
        <form
          name="orcamento"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={enviar}
          noValidate
          className="bg-background grid gap-4 rounded-xl border p-5 shadow-sm transition-shadow duration-300 focus-within:shadow-lg sm:grid-cols-2 sm:p-8"
          aria-describedby="aviso-lgpd"
        >
          <input type="hidden" name="form-name" value="orcamento" />
          <p className="hidden">
            <label>
              Não preencha: <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>
          <label className="grid gap-2 sm:col-span-2">
            <span className="text-sm font-medium">Seu nome (opcional)</span>
            <input name="nome" type="text" autoComplete="given-name" className={campo} placeholder="Como podemos te chamar?" />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium">Data da festa</span>
            <input name="data" type="date" required className={campo} />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium">Número de convidados</span>
            <input name="convidados" type="number" inputMode="numeric" min={1} max={2000} required className={campo} placeholder="Ex.: 80" />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium">Tipo de festa</span>
            <select name="tipo" required defaultValue="" className={campo}>
              <option value="" disabled>Escolha</option>
              {festas.map((f) => (
                <option key={f.titulo}>{f.titulo}</option>
              ))}
              <option>Outro</option>
            </select>
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium">Cardápio (opcional)</span>
            <select name="cardapio" defaultValue="" className={campo}>
              <option value="">Ainda não sei</option>
              {cardapios.map((c) => (
                <option key={c.titulo}>{c.titulo}</option>
              ))}
            </select>
          </label>
          {erro && (
            <m.p key={erro + Date.now()} role="alert" initial={{ x: 0 }} animate={{ x: [0, -8, 8, -5, 5, 0] }} transition={{ duration: 0.4 }} className="text-accent text-sm font-medium sm:col-span-2">{erro}</m.p>
          )}
          <Button type="submit" size="lg" className="brilho-cta w-full transition-[background-color,transform] active:scale-[0.98] sm:col-span-2" aria-live="polite">
            {enviado ? (
              <m.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2">
                <CheckCircle aria-hidden weight="fill" className="size-5" />
                Abrindo o WhatsApp…
              </m.span>
            ) : (
              <>
                <WhatsappLogo aria-hidden className="size-5" />
                Pedir orçamento pelo WhatsApp
              </>
            )}
          </Button>
          <p id="aviso-lgpd" className="text-muted-foreground text-xs leading-relaxed sm:col-span-2">
            Ao falar conosco pelo WhatsApp você concorda com o uso dos seus dados para o orçamento. Veja a{' '}
            <a href="/politica-de-privacidade.html" className="text-primary underline underline-offset-2">Política de Privacidade</a>.
          </p>
        </form>
        </Revelar>
      </div>
    </section>
  )
}
