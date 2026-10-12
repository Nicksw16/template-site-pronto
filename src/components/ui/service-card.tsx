// Service Card (21st.dev id 8223, lavikatiyar) adaptado pela Lynx:
// - sem framer-motion: hover em CSS (motion-safe), nada depende de hover no celular;
// - só variantes da paleta (default/gray); foto local no topo; link "Pedir orçamento" para o WhatsApp;
// - Phosphor no lugar de lucide.
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight'

import { cn } from '@/lib/utils'

const cardVariants = cva(
  'group relative flex w-full flex-col overflow-hidden rounded-xl shadow-sm transition-shadow duration-300 ease-out motion-safe:hover:shadow-lg',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        gray: 'bg-secondary text-secondary-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

export interface ServiceCardProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof cardVariants> {
  title: string
  description: string
  price?: string
  href: string
  imgSrc: string
  imgAlt: string
  ctaText?: string
}

const ServiceCard = React.forwardRef<HTMLElement, ServiceCardProps>(
  ({ className, variant, title, description, price, href, imgSrc, imgAlt, ctaText = 'Pedir orçamento', ...props }, ref) => (
    <article ref={ref} className={cn(cardVariants({ variant, className }))} {...props}>
      <div className="overflow-hidden">
        <img
          src={imgSrc}
          alt={imgAlt}
          width={800}
          height={600}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <h3 className="font-serif text-2xl leading-tight font-semibold tracking-tight">{title}</h3>
        <p className="text-muted-foreground text-[0.95rem] leading-relaxed">{description}</p>
        {price && <p className="text-accent text-sm font-medium">{price}</p>}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${ctaText}: ${title} (abre o WhatsApp)`}
          className="text-primary mt-auto inline-flex min-h-11 items-center gap-2 self-start pt-1 font-semibold underline-offset-4 hover:underline"
        >
          {ctaText}
          <ArrowRight aria-hidden className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1" />
        </a>
      </div>
    </article>
  ),
)
ServiceCard.displayName = 'ServiceCard'

export { ServiceCard }
