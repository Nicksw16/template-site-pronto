// Masonry Lightbox (21st.dev id 26223, ayushmxxn) adaptado pela Lynx:
// - <img> local (sem next/image), width/height reais e loading="lazy";
// - motion/react (carregado com React.lazy na página); entrada e layoutId só no desktop sem reduced-motion;
// - cores da paleta, rótulos em português, aria-modal e foco preso no lightbox.
import { AnimatePresence, motion } from 'motion/react'
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from '@phosphor-icons/react/dist/csr/X'

import { useHeavyMotion } from '@/hooks/use-heavy-motion'

export interface ImageType {
  id: number
  src: string
  alt: string
  description: string
  width: number
  height: number
}

export interface MasonryLightboxProps {
  images: ImageType[]
  className?: string
}

const ENTRANCE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const MasonryLightbox: React.FC<MasonryLightboxProps> = ({ images, className = '' }) => {
  const [selected, setSelected] = useState<ImageType | null>(null)
  const heavy = useHeavyMotion()
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!selected) return
    lastFocus.current = document.activeElement as HTMLElement
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const prevOverflow = document.body.style.overflow
    const prevPadding = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
      if (e.key === 'Tab') {
        // só existe um elemento focável no lightbox: o botão fechar
        e.preventDefault()
        closeRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.body.style.paddingRight = prevPadding
      window.removeEventListener('keydown', onKey)
      lastFocus.current?.focus()
    }
  }, [selected])

  const modal = (
    <AnimatePresence>
      {selected && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={selected.alt}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#1b1417]/80 p-4 backdrop-blur-md sm:p-10 lg:p-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: heavy ? 0.25 : 0 }}
          onClick={() => setSelected(null)}
        >
          <motion.div
            layoutId={heavy ? `foto-${selected.id}` : undefined}
            className="relative overflow-hidden rounded-xl bg-[#2a1f24] shadow-2xl"
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selected.src}
              alt={selected.alt}
              width={selected.width}
              height={selected.height}
              className="block h-auto max-h-[75vh] w-auto max-w-[90vw] object-contain md:max-w-[640px]"
            />
            <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-5">
              <p className="text-base font-medium text-white">{selected.description}</p>
            </div>
            <button
              ref={closeRef}
              type="button"
              aria-label="Fechar foto"
              onClick={() => setSelected(null)}
              className="absolute top-2 right-2 flex size-11 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-white"
            >
              <X aria-hidden className="size-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <div className={`relative w-full ${className}`}>
      <div className="mx-auto w-full columns-2 gap-3 sm:columns-3 sm:gap-4 lg:gap-5 [column-fill:balance]">
        {images.map((image, i) => (
          <motion.button
            key={image.id}
            type="button"
            layoutId={heavy ? `foto-${image.id}` : undefined}
            onClick={() => setSelected(image)}
            aria-label={`Ampliar foto: ${image.description}`}
            className="group relative mb-3 block w-full min-w-0 cursor-pointer overflow-hidden rounded-xl bg-card text-left sm:mb-4 lg:mb-5"
            style={{ breakInside: 'avoid' }}
            initial={heavy ? { opacity: 0, y: 16 } : false}
            whileInView={heavy ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: (i % 12) * 0.05, ease: ENTRANCE_EASE }}
          >
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full transition-transform duration-700 ease-out motion-safe:md:group-hover:scale-[1.05]"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 transition-opacity duration-300 md:group-hover:opacity-100">
              <p className="text-sm font-medium text-white">{image.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
      {typeof document !== 'undefined' ? createPortal(modal, document.body) : null}
    </div>
  )
}

export default MasonryLightbox
