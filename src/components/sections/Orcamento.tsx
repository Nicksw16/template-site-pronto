// Feito à mão: 3 passos + formulário curto que monta a mensagem do WhatsApp.
// Também registra o pedido no Netlify Forms (form "orcamento"; cópia oculta no index.html).
import * as React from 'react'
import { WhatsappLogo } from '@phosphor-icons/react/dist/csr/WhatsappLogo'
import { Button } from '@/components/ui/button'
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
          <h2 id="titulo-orcamento" className="font-serif text-4xl tracking-tight sm:text-5xl">Orçamento em 3 passos</h2>
          <ol className="mt-8 grid gap-6">
            {passos.map((p, i) => (
              <li key={p.titulo} className="flex gap-4">
                <span className="bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-full font-semibold">{i + 1}</span>
                <p className="leading-relaxed">
                  <strong className="font-semibold">{p.titulo}</strong>{' '}
                  <span className="text-muted-foreground">{p.texto}</span>
                </p>
              </li>
            ))}
          </ol>
          <p className="text-muted-foreground mt-8 text-sm">Atendimento {HORARIO}. Sem compromisso: você só decide depois de ver a proposta.</p>
        </div>

        <form
          name="orcamento"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={enviar}
          noValidate
          className="bg-background grid gap-4 rounded-xl border p-5 shadow-sm sm:grid-cols-2 sm:p-8 lg:col-span-7"
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
            <p role="alert" className="text-accent text-sm font-medium sm:col-span-2">{erro}</p>
          )}
          <Button type="submit" size="lg" className="w-full sm:col-span-2">
            <WhatsappLogo aria-hidden className="size-5" />
            Pedir orçamento pelo WhatsApp
          </Button>
          <p id="aviso-lgpd" className="text-muted-foreground text-xs leading-relaxed sm:col-span-2">
            Ao falar conosco pelo WhatsApp você concorda com o uso dos seus dados para o orçamento. Veja a{' '}
            <a href="/politica-de-privacidade.html" className="text-primary underline underline-offset-2">Política de Privacidade</a>.
          </p>
        </form>
      </div>
    </section>
  )
}
