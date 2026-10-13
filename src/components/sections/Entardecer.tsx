// Pausa visual entre a galeria e o orçamento: a revoada forma "Aurora" num céu de fim de tarde (Revoada, 21st 37639).
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { Revoada } from '@/components/ui/revoada'
import { waGeral } from '@/lib/site'

export function Entardecer() {
  return (
    <section aria-labelledby="titulo-entardecer">
      <Revoada palavra="Aurora" className="h-[88svh] min-h-[560px] text-[#fffaf7]">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 pt-16 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:pt-20">
          <div>
            <p className="text-sm tracking-[0.3em] text-[#e9b872] uppercase">Villa Aurora</p>
            <h2 id="titulo-entardecer" className="mt-3 max-w-xl font-serif text-4xl leading-[1.05] sm:text-5xl">
              Do fim de tarde à última música.
            </h2>
          </div>
          <a
            href={waGeral}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-white/35 bg-white/10 px-5 font-semibold backdrop-blur-md transition-[background-color,transform] hover:bg-white/20 active:scale-[0.97]"
          >
            Consultar uma data
            <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:rotate-45" />
          </a>
        </div>
      </Revoada>
    </section>
  )
}
