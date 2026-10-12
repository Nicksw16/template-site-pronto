// Single Open Accordion (21st.dev id 37545, ibrandify) adaptado pela Lynx:
// - sem eyebrow; título em Cormorant; Phosphor Plus; motion-reduce:transition-none; toque >= 44px.
import * as React from 'react'
import { Plus } from '@phosphor-icons/react/dist/csr/Plus'

export interface SingleOpenAccordionProps {
  items: { id: string; question: string; answer: React.ReactNode }[]
  title?: string
  titleId?: string
  description?: string
  defaultOpenId?: string
  footer?: React.ReactNode
  className?: string
}

export default function SingleOpenAccordion({
  items,
  title = 'Perguntas frequentes',
  titleId,
  description,
  defaultOpenId,
  footer,
  className = '',
}: SingleOpenAccordionProps) {
  const uid = React.useId()
  const [active, setActive] = React.useState<string | null>(defaultOpenId ?? null)

  const toggle = (id: string) => setActive((cur) => (cur === id ? null : id))

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next =
      event.key === 'ArrowDown'
        ? (index + 1) % items.length
        : event.key === 'ArrowUp'
          ? (index - 1 + items.length) % items.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? items.length - 1
              : -1
    if (next >= 0) {
      event.preventDefault()
      document.getElementById(`${uid}-q-${next}`)?.focus()
    }
  }

  return (
    <div className={`text-foreground mx-auto w-full max-w-3xl ${className}`}>
      <div className="bg-card text-card-foreground rounded-xl border p-5 shadow-sm sm:p-8">
        <header className="mb-4 flex flex-col gap-2">
          <h2 id={titleId} className="font-serif text-3xl tracking-tight text-balance sm:text-4xl">
            {title}
          </h2>
          {description && <p className="text-muted-foreground leading-relaxed">{description}</p>}
        </header>

        <div className="divide-border divide-y">
          {items.map((item, index) => {
            const isOpen = active === item.id
            return (
              <div key={item.id} className="py-1">
                <h3>
                  <button
                    type="button"
                    id={`${uid}-q-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`${uid}-a-${index}`}
                    onClick={() => toggle(item.id)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="hover:text-primary flex min-h-11 w-full items-center justify-between gap-4 rounded-sm py-4 text-left font-medium transition-colors"
                  >
                    <span className="text-base">{item.question}</span>
                    <span
                      className={`text-primary shrink-0 transition-transform duration-200 motion-reduce:transition-none ${isOpen ? 'rotate-45' : ''}`}
                    >
                      <Plus aria-hidden className="size-5" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`${uid}-a-${index}`}
                  role="region"
                  aria-labelledby={`${uid}-q-${index}`}
                  className={`grid transition-[grid-template-rows,opacity,visibility] duration-200 ease-out motion-reduce:transition-none ${
                    isOpen ? 'mb-4 grid-rows-[1fr] opacity-100' : 'invisible grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-muted-foreground pt-1 pr-6 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {footer && <div className="mt-6">{footer}</div>}
      </div>
    </div>
  )
}
