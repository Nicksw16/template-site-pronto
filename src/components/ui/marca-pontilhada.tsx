// Marca gigante impressa em pontos (meio-tom) — "Halftone Wordmark Footer" do 21st (id 37628, kedhareswer),
// enxugada pela Lynx: só a palavra (o resto do rodapé continua nosso), fundo transparente sobre o verde,
// fonte Cormorant da marca, pontos verdes que esquentam para o dourado quando o mouse empurra,
// clique/toque solta uma onda e, ao aparecer, os pontos sobem até o lugar. Para quando tudo está parado.
// prefers-reduced-motion = pontos parados.
import { useEffect, useRef } from 'react'
import { usePerto } from '@/lib/use-perto'

const hex = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16))

export function MarcaPontilhada({
  palavra,
  tinta = '#2f8a74',
  quente = '#e9b872',
  fonte = '600 100px "Cormorant Garamond", Georgia, serif',
  corte = -0.06,
  raio = 90,
  className = '',
}: {
  palavra: string
  tinta?: string
  quente?: string
  fonte?: string
  corte?: number
  raio?: number
  className?: string
}) {
  const caixa = useRef<HTMLDivElement>(null)
  const tela = useRef<HTMLCanvasElement>(null)
  const perto = usePerto(caixa)

  useEffect(() => {
    const raiz = caixa.current
    const cv = tela.current
    if (!perto) return
    const ctx = cv?.getContext('2d')
    if (!raiz || !cv || !ctx) return
    const parado = matchMedia('(prefers-reduced-motion: reduce)').matches
    const [ir, ig, ib] = hex(tinta)
    const [qr, qg, qb] = hex(quente)
    let w = 1
    let h = 1
    let dpr = 1
    let px = -1e5
    let py = -1e5
    let raf = 0
    let naTela = false
    let acordado = true
    let subiu = parado
    let onda = { x: 0, y: 0, t: -1 }
    // Por ponto: x, y, vx, vy, casaX, casaY, raio
    let p = new Float32Array(0)
    let n = 0

    const montar = () => {
      const r = raiz.getBoundingClientRect()
      w = Math.max(1, Math.round(r.width))
      h = Math.max(1, Math.round(r.height))
      dpr = Math.min(devicePixelRatio || 1, 2)
      cv.width = Math.round(w * dpr)
      cv.height = Math.round(h * dpr)
      const masc = document.createElement('canvas')
      masc.width = w
      masc.height = h
      const m = masc.getContext('2d', { willReadFrequently: true })
      if (!m) return
      m.font = fonte
      const tam = (w * 0.98) / Math.max(1, m.measureText(palavra).width) * 100
      m.font = fonte.replace('100px', `${tam}px`)
      const caixaTxt = m.measureText(palavra)
      const alto = caixaTxt.actualBoundingBoxAscent || tam * 0.7
      m.fillStyle = '#000'
      m.textBaseline = 'alphabetic'
      m.fillText(palavra, (w - caixaTxt.width) / 2, h + alto * corte)
      const img = m.getImageData(0, 0, w, h).data
      const gap = w < 640 ? 4 : 6
      const tmp: number[] = []
      for (let gy = 0; gy < Math.ceil(h / gap); gy++) {
        for (let gx = 0; gx < Math.ceil(w / gap); gx++) {
          let soma = 0
          for (let sy = 0; sy < 3; sy++)
            for (let sx = 0; sx < 3; sx++) {
              const x = Math.min(w - 1, Math.floor(gx * gap + ((sx + 0.5) * gap) / 3))
              const y = Math.min(h - 1, Math.floor(gy * gap + ((sy + 0.5) * gap) / 3))
              soma += img[(y * w + x) * 4 + 3]
            }
          const cob = soma / (9 * 255)
          if (cob < 0.06) continue
          const hx = gx * gap + gap / 2
          const hy = gy * gap + gap / 2
          // Antes de aparecer, os pontos esperam abaixo do lugar.
          const y0 = subiu ? hy : hy + h * (0.5 + Math.random() * 0.6)
          tmp.push(hx, y0, 0, 0, hx, hy, Math.sqrt(cob) * gap * 0.56)
        }
      }
      p = new Float32Array(tmp)
      n = tmp.length / 7
      acordado = true
    }

    const desenhar = (agora: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const r = parado ? 0 : raio
      const idade = onda.t < 0 ? 1e9 : agora - onda.t
      const rOnda = idade * 0.9
      let mexendo = false
      for (let i = 0; i < n; i++) {
        const j = i * 7
        let x = p[j]
        let y = p[j + 1]
        let vx = p[j + 2]
        let vy = p[j + 3]
        const hx = p[j + 4]
        const hy = p[j + 5]
        if (!parado) {
          if (idade < 900) {
            const dx = hx - onda.x
            const dy = hy - onda.y
            const d = Math.sqrt(dx * dx + dy * dy) + 0.001
            const faixa = 1 - Math.min(1, Math.abs(d - rOnda) / 26)
            if (faixa > 0) {
              const f = faixa * 3.2 * (1 - idade / 900)
              vx += (dx / d) * f
              vy += (dy / d) * f
            }
          }
          const dx = x - px
          const dy = y - py
          const d2 = dx * dx + dy * dy
          if (d2 < r * r) {
            const d = Math.sqrt(d2) + 0.001
            const f = (1 - d / r) * 2.6
            vx += (dx / d) * f
            vy += (dy / d) * f
          }
          vx = (vx + (hx - x) * 0.05) * 0.84
          vy = (vy + (hy - y) * 0.05) * 0.84
          x += vx
          y += vy
          if (Math.abs(vx) + Math.abs(vy) > 0.02 || Math.abs(x - hx) + Math.abs(y - hy) > 0.05) mexendo = true
          else {
            x = hx
            y = hy
            vx = 0
            vy = 0
          }
          p[j] = x
          p[j + 1] = y
          p[j + 2] = vx
          p[j + 3] = vy
        }
        const k = Math.min(1, Math.hypot(x - hx, y - hy) / 28)
        ctx.fillStyle =
          k > 0.02 ? `rgb(${Math.round(ir + (qr - ir) * k)},${Math.round(ig + (qg - ig) * k)},${Math.round(ib + (qb - ib) * k)})` : tinta
        ctx.beginPath()
        ctx.arc(x, y, p[j + 6], 0, 6.2832)
        ctx.fill()
      }
      acordado = mexendo || idade < 900 || px > -1e4
    }

    const laco = (agora: number) => {
      raf = 0
      if (!naTela) return
      desenhar(agora)
      if (acordado) raf = requestAnimationFrame(laco)
    }
    const acordar = () => {
      acordado = true
      if (!raf && naTela) raf = requestAnimationFrame(laco)
    }
    const local = (e: PointerEvent) => {
      const b = cv.getBoundingClientRect()
      return [e.clientX - b.left, e.clientY - b.top]
    }
    const mover = (e: PointerEvent) => {
      if (parado) return
      ;[px, py] = local(e)
      acordar()
    }
    const sair = () => {
      px = -1e5
      py = -1e5
      acordar()
    }
    const tocar = (e: PointerEvent) => {
      if (parado) return
      const [x, y] = local(e)
      onda = { x, y, t: performance.now() }
      acordar()
    }

    montar()
    raiz.addEventListener('pointermove', mover)
    raiz.addEventListener('pointerleave', sair)
    raiz.addEventListener('pointerdown', tocar)
    const ro = new ResizeObserver(() => {
      montar()
      acordar()
    })
    ro.observe(raiz)
    const io = new IntersectionObserver(
      (lista) => {
        naTela = lista[lista.length - 1].isIntersecting
        if (naTela) {
          subiu = true
          acordar()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(raiz)
    let vivo = true
    document.fonts?.ready.then(() => {
      if (!vivo) return
      montar()
      acordar()
    })
    return () => {
      vivo = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      raiz.removeEventListener('pointermove', mover)
      raiz.removeEventListener('pointerleave', sair)
      raiz.removeEventListener('pointerdown', tocar)
    }
  }, [palavra, tinta, quente, fonte, corte, raio, perto])

  return (
    <div ref={caixa} className={`relative select-none ${className}`}>
      <canvas ref={tela} aria-hidden className="absolute inset-0 block size-full" />
      <span className="sr-only">{palavra}</span>
    </div>
  )
}
