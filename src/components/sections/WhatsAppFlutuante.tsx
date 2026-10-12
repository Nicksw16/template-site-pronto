import { WhatsappLogo } from '@phosphor-icons/react/dist/csr/WhatsappLogo'
import { waGeral } from '@/lib/site'

// Botão fixo só no celular.
export function WhatsAppFlutuante() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <a
        href={waGeral}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-primary text-primary-foreground pointer-events-auto flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 font-semibold shadow-lg"
      >
        <WhatsappLogo aria-hidden weight="fill" className="size-6" />
        Pedir orçamento pelo WhatsApp
      </a>
    </div>
  )
}
