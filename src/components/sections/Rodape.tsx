// Rodapé com marca gigante e feixe de luz — "Light Beam Footer with Giant Wordmark" (21st id 35251, kedhareswer),
// refeito enxuto pela Lynx: verde da marca, feixe dourado em CSS que deriva sozinho, brilho que segue o mouse,
// letras de "Villa Aurora" sobem ao aparecer e pulam no clique. Sem dependências; reduced-motion = parado.
import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { InstagramLogo } from '@phosphor-icons/react/dist/csr/InstagramLogo'
import { WhatsappLogo } from '@phosphor-icons/react/dist/csr/WhatsappLogo'
import { CNPJ, EMAIL, ENDERECO, HORARIO, INSTAGRAM, instagramUrl, TELEFONE_VISIVEL, waGeral } from '@/lib/site'

const navegue = [
  { href: '#festas', label: 'Festas' },
  { href: '#cardapios', label: 'Cardápios' },
  { href: '#espaco', label: 'O espaço' },
  { href: '#perguntas', label: 'Perguntas' },
  { href: '#localizacao', label: 'Como chegar' },
]

const MARCA = 'Villa Aurora'

export function Rodape() {
  const raiz = useRef<HTMLElement>(null)
  const [visto, setVisto] = useState(false)

  useEffect(() => {
    const el = raiz.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisto(true), { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  function mover(e: PointerEvent<HTMLElement>) {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--px', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--py', `${e.clientY - r.top}px`)
    e.currentTarget.style.setProperty('--brilho', '1')
  }

  return (
    <footer
      ref={raiz}
      data-visto={visto}
      onPointerMove={mover}
      onPointerLeave={(e) => e.currentTarget.style.setProperty('--brilho', '0')}
      className="rodape relative isolate overflow-hidden bg-[#0b2e27] pb-24 text-[#fffaf7] md:pb-0"
    >
      <div aria-hidden className="rodape-ceu absolute inset-0 -z-10">
        <div className="rodape-feixe" />
        <div className="rodape-brilho" />
        <div className="rodape-grao" />
      </div>
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e9b872]/60 to-transparent" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-16 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:pt-24">
        <div className="rodape-sobe">
          <p className="font-serif text-4xl leading-tight sm:text-5xl">A sua festa começa com uma conversa.</p>
          <a
            href={waGeral}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#fffaf7] px-6 font-semibold text-[#14584a] transition-transform active:scale-[0.97]"
          >
            <WhatsappLogo aria-hidden weight="fill" className="size-5" />
            Chamar no WhatsApp
            <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:rotate-45" />
          </a>
        </div>

        <nav aria-label="Rodapé" className="rodape-sobe [--d:120ms]">
          <p className="rodape-rotulo">Navegue</p>
          <ul className="mt-3">
            {navegue.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="rodape-link">
                  <span>{l.label}</span>
                  <ArrowUpRight aria-hidden className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="rodape-sobe [--d:220ms]">
          <p className="rodape-rotulo">Contato</p>
          <ul className="mt-3 text-[0.95rem] text-[#fffaf7]/75">
            <li>
              <a href={waGeral} target="_blank" rel="noopener noreferrer" className="rodape-link">
                <span>WhatsApp {TELEFONE_VISIVEL}</span>
                <ArrowUpRight aria-hidden className="size-3.5" />
              </a>
            </li>
            <li>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="rodape-link">
                <span className="inline-flex items-center gap-2">
                  <InstagramLogo aria-hidden className="size-4" />@{INSTAGRAM}
                </span>
                <ArrowUpRight aria-hidden className="size-3.5" />
              </a>
            </li>
            <li className="py-1.5">{EMAIL}</li>
            <li className="py-1.5">{ENDERECO}</li>
            <li className="py-1.5">{HORARIO}</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-2 px-4 text-sm text-[#fffaf7]/60 sm:flex-row sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} Villa Aurora Espaço &amp; Buffet · CNPJ {CNPJ}
        </p>
        <p>
          <a href="/politica-de-privacidade.html" className="underline-offset-4 hover:text-[#fffaf7] hover:underline">Política de Privacidade</a> · Site feito pela Lynx Automation
        </p>
      </div>

      <div className="relative mt-6 overflow-hidden" aria-hidden>
        <p className="rodape-marca px-2 text-center font-serif leading-[0.8] whitespace-nowrap select-none">
          {Array.from(MARCA).map((ch, i) => (
            <span key={i} className="rodape-letra" style={{ '--i': i } as React.CSSProperties} onClick={(e) => {
              const el = e.currentTarget
              el.classList.remove('pulou')
              void el.offsetWidth
              el.classList.add('pulou')
            }}>
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </p>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0b2e27] to-transparent" />
      </div>
    </footer>
  )
}
