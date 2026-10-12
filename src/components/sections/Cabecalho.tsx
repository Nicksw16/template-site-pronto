import { WhatsappLogo } from '@phosphor-icons/react/dist/csr/WhatsappLogo'
import { waGeral } from '@/lib/site'

const links = [
  { href: '#festas', label: 'Festas' },
  { href: '#cardapios', label: 'Cardápios' },
  { href: '#espaco', label: 'O espaço' },
  { href: '#perguntas', label: 'Perguntas' },
  { href: '#localizacao', label: 'Como chegar' },
]

export function Cabecalho() {
  return (
    <header className="bg-background/90 supports-[backdrop-filter]:bg-background/75 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#inicio" className="flex min-h-11 items-center gap-2" aria-label="Villa Aurora, voltar ao início">
          <img src="/favicon.svg" alt="" width={32} height={32} className="size-8" />
          <span className="font-serif text-2xl leading-none font-semibold">Villa Aurora</span>
        </a>
        <nav aria-label="Seções" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-muted-foreground hover:text-foreground inline-flex min-h-11 items-center px-3 text-[0.95rem] transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={waGeral}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground hover:bg-primary/90 hidden min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-medium transition-colors sm:inline-flex"
        >
          <WhatsappLogo aria-hidden className="size-5" />
          Pedir orçamento
        </a>
      </div>
    </header>
  )
}
