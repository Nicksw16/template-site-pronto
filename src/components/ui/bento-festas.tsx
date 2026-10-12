// Grade "bento" de festas (referências: Bento Grid do Magic UI / Aceternity / Kokonut no 21st — ids 1197, 622).
// Foto ocupa o card inteiro; no desktop a descrição sobe ao passar o mouse; no toque fica sempre visível.
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { m } from 'motion/react'
import { itemVariants } from '@/components/ui/revelar'
import type { Item } from '@/lib/site'
import { cn } from '@/lib/utils'

// Posição de cada festa na grade de 4 colunas (lg). Ordem = ordem de leitura.
const LAYOUT: Record<string, string> = {
  Casamento: 'lg:col-span-2 lg:row-span-2',
  '15 anos': 'lg:col-span-1 lg:row-span-2',
  'Festa infantil': 'lg:col-span-1',
  'Chá de bebê / revelação': 'lg:col-span-1',
  'Aniversário adulto': 'lg:col-span-2',
  Corporativo: 'lg:col-span-2',
}

export function BentoFestas({ itens, preco }: { itens: Item[]; preco: string }) {
  const ordem = Object.keys(LAYOUT)
  const lista = [...itens].sort((a, b) => ordem.indexOf(a.titulo) - ordem.indexOf(b.titulo))
  return (
    <m.ul
      initial="oculto"
      whileInView="visivel"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{ oculto: {}, visivel: { transition: { staggerChildren: 0.08 } } }}
      className="grid auto-rows-[340px] grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[270px] lg:grid-cols-4"
    >
      {lista.map((f, i) => (
        <m.li key={f.titulo} variants={itemVariants} className={cn('h-full', LAYOUT[f.titulo])}>
          <a
            href={f.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Pedir orçamento: ${f.titulo} (abre o WhatsApp)`}
            className="group relative flex h-full flex-col justify-end overflow-hidden rounded-2xl text-[#fffaf7] shadow-sm transition-[box-shadow,transform] duration-500 hover:shadow-2xl active:scale-[0.98] motion-safe:hover:-translate-y-1"
          >
            <img
              src={f.img}
              alt={f.alt}
              width={800}
              height={600}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-[900ms] ease-out motion-safe:group-hover:scale-110"
            />
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-[#120c0e]/90 via-[#120c0e]/30 to-transparent transition-opacity duration-500 group-hover:from-[#0f3d34]/95" />
            <span aria-hidden className="absolute top-4 left-5 font-serif text-sm tracking-widest text-[#fffaf7]/70">{String(i + 1).padStart(2, '0')}</span>
            <span aria-hidden className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition-transform duration-500 group-hover:rotate-45 group-hover:bg-[#fffaf7] group-hover:text-[#14584a]">
              <ArrowUpRight className="size-5" />
            </span>
            <div className="p-5 sm:p-6">
              <h3 className="font-serif text-3xl leading-tight sm:text-4xl">{f.titulo}</h3>
              <div className="grid transition-[grid-template-rows,opacity] duration-500 lg:grid-rows-[0fr] lg:opacity-0 lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100 lg:group-focus-visible:grid-rows-[1fr] lg:group-focus-visible:opacity-100">
                <div className="overflow-hidden">
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-[#fffaf7]/85">{f.descricao}</p>
                  <p className="mt-2 text-sm font-medium text-[#e9b872]">{preco}</p>
                </div>
              </div>
            </div>
          </a>
        </m.li>
      ))}
    </m.ul>
  )
}
