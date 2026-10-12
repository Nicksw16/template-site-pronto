// Carregado com React.lazy (motion fica fora do pacote principal).
import { InstagramLogo } from '@phosphor-icons/react/dist/csr/InstagramLogo'
import MasonryLightbox, { type ImageType } from '@/components/ui/masonry-lightbox'
import { INSTAGRAM, instagramUrl } from '@/lib/site'

// Fotos de exemplo (Pexels): trocar pelas fotos reais autorizadas. Ver public/img/CREDITOS.md.
const fotos: ImageType[] = [
  { id: 1, src: '/img/galeria-1.webp', width: 900, height: 600, alt: 'Mesa de doces de primeiro aniversário com flores e balões [foto de exemplo: trocar]', description: 'Festa infantil' },
  { id: 2, src: '/img/galeria-2.webp', width: 900, height: 1350, alt: 'Crianças em volta do bolo de aniversário [foto de exemplo: trocar]', description: 'Hora do parabéns' },
  { id: 3, src: '/img/galeria-3.webp', width: 900, height: 601, alt: 'Recepção à noite com luzes no teto e convidados [foto de exemplo: trocar]', description: 'Recepção à noite' },
  { id: 4, src: '/img/galeria-4.webp', width: 900, height: 600, alt: 'Mesa de chá de bebê em tons de azul [foto de exemplo: trocar]', description: 'Chá de bebê' },
  { id: 5, src: '/img/galeria-5.webp', width: 900, height: 658, alt: 'Festa infantil com bolo, balões e decoração temática [foto de exemplo: trocar]', description: 'Decoração temática' },
  { id: 6, src: '/img/galeria-6.webp', width: 900, height: 1353, alt: 'Tábua de canapés e frios servida no coquetel [foto de exemplo: trocar]', description: 'Coquetel' },
  { id: 7, src: '/img/galeria-7.webp', width: 900, height: 1125, alt: 'Decoração de chá de bebê com ursinhos e balões [foto de exemplo: trocar]', description: 'Chá revelação' },
  { id: 8, src: '/img/galeria-8.webp', width: 900, height: 600, alt: 'Salão com lustres e mesas redondas montadas [foto de exemplo: trocar]', description: 'Salão montado' },
]

export default function Galeria() {
  return (
    <section id="galeria" aria-labelledby="titulo-galeria" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <h2 id="titulo-galeria" className="font-serif text-4xl tracking-tight text-balance sm:text-5xl">O espaço em dia de festa</h2>
          <p className="text-muted-foreground mt-3">Toque numa foto para ampliar. [Fotos de exemplo: trocar pelas fotos reais autorizadas pelos clientes.]</p>
        </div>
        <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-primary inline-flex min-h-11 items-center gap-2 font-semibold underline-offset-4 hover:underline">
          <InstagramLogo aria-hidden className="size-5" />
          Veja festas reais no @{INSTAGRAM}
        </a>
      </div>
      <MasonryLightbox images={fotos} />
    </section>
  )
}
