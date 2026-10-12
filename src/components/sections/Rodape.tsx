import { InstagramLogo } from '@phosphor-icons/react/dist/csr/InstagramLogo'
import { WhatsappLogo } from '@phosphor-icons/react/dist/csr/WhatsappLogo'
import { CIDADE, CNPJ, EMAIL, ENDERECO, HORARIO, INSTAGRAM, instagramUrl, TELEFONE_VISIVEL, waGeral } from '@/lib/site'

const links = [
  { href: '#festas', label: 'Festas' },
  { href: '#cardapios', label: 'Cardápios' },
  { href: '#espaco', label: 'O espaço' },
  { href: '#perguntas', label: 'Perguntas' },
  { href: '/politica-de-privacidade.html', label: 'Política de Privacidade' },
]

export function Rodape() {
  return (
    <footer className="bg-foreground text-background pb-24 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-serif text-3xl">Villa Aurora Espaço &amp; Buffet</p>
          <p className="mt-2 opacity-80">Espaço e buffet para festas em {CIDADE}.</p>
        </div>
        <div className="grid gap-2 text-[0.95rem]">
          <a href={waGeral} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:underline">
            <WhatsappLogo aria-hidden className="size-5" /> WhatsApp {TELEFONE_VISIVEL}
          </a>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:underline">
            <InstagramLogo aria-hidden className="size-5" /> @{INSTAGRAM}
          </a>
          <p className="opacity-80">{EMAIL}</p>
          <p className="opacity-80">{ENDERECO}</p>
          <p className="opacity-80">{HORARIO}</p>
        </div>
        <nav aria-label="Rodapé">
          <ul className="grid gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-flex min-h-11 items-center hover:underline">{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-background/15 border-t">
        <p className="mx-auto max-w-7xl px-4 py-6 text-sm opacity-75 sm:px-6">
          © {new Date().getFullYear()} Villa Aurora Espaço &amp; Buffet · CNPJ {CNPJ} · Site feito pela Lynx Automation
        </p>
      </div>
    </footer>
  )
}
