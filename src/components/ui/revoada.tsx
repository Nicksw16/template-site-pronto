// Revoada que forma uma palavra — "Bird Murmuration Text Animation" do 21st (id 37639, kedhareswer),
// adaptada pela Lynx: céu de entardecer nas cores da marca, a revoada desenha "Aurora", segura e se desfaz;
// o mouse é um gavião que abre a revoada. Para fora da tela e com a aba oculta.
// prefers-reduced-motion = a palavra já formada, parada. Um canvas 2D, sem dependências.
import { useEffect, useRef, type ReactNode } from 'react'
import { usePerto } from '@/lib/use-perto'

function aleatorio(semente: number) {
  let a = semente >>> 0 || 1
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Corrente sem divergência (rotacional de ondas): dobra a revoada sem amontoar nem abrir buracos.
function corrente(x: number, y: number, t: number) {
  const a = 1.7 * x + t
  const b = 1.3 * y - 0.6 * t
  const c = 2.9 * y + 1.1 * x - 0.8 * t
  const d = 4.3 * x - 3.7 * y + 1.3 * t
  const dx = 1.7 * Math.cos(a) * Math.cos(b) + 0.66 * Math.cos(c) - 1.505 * Math.sin(d)
  const dy = -1.3 * Math.sin(a) * Math.sin(b) + 1.74 * Math.cos(c) + 1.295 * Math.sin(d)
  return [dy, -dx]
}

const suave = (k: number) => {
  const x = k < 0 ? 0 : k > 1 ? 1 : k
  return x * x * (3 - 2 * x)
}

const alfa = (hex: string, a: number) => `rgba(${[1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(',')},${a})`

export function Revoada({
  palavra,
  passaros = 3200,
  ceuTopo = '#0b2e27',
  ceuBaixo = '#d4875c',
  sol = '#ffd9a8',
  tinta = '#10201c',
  voa = 6,
  segura = 3.5,
  fonte = '700 100px "Cormorant Garamond", Georgia, serif',
  className = '',
  children,
}: {
  palavra: string
  passaros?: number
  ceuTopo?: string
  ceuBaixo?: string
  sol?: string
  tinta?: string
  voa?: number
  segura?: number
  fonte?: string
  className?: string
  children?: ReactNode
}) {
  const raiz = useRef<HTMLDivElement>(null)
  const tela = useRef<HTMLCanvasElement>(null)
  const perto = usePerto(raiz)

  useEffect(() => {
    const el = raiz.current
    const cv = tela.current
    if (!perto) return
    const ctx = cv?.getContext('2d')
    if (!el || !cv || !ctx) return
    const parado = matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 1
    let h = 1
    let dpr = 1
    let n = 0
    let raf = 0
    let naTela = false
    let ceu: HTMLCanvasElement | null = null
    let px = new Float32Array(0)
    let py = new Float32Array(0)
    let vx = new Float32Array(0)
    let vy = new Float32Array(0)
    let prof = new Float32Array(0)
    let fase = new Float32Array(0)
    let alvo = new Int32Array(0)
    let tx = new Float32Array(0)
    let ty = new Float32Array(0)
    let gx = -1e5
    let gy = -1e5
    let antes = performance.now()
    let relogio = 0
    const rnd = aleatorio(11)

    const montar = () => {
      const r = el.getBoundingClientRect()
      w = Math.max(1, Math.round(r.width))
      h = Math.max(1, Math.round(r.height))
      dpr = Math.min(devicePixelRatio || 1, 2)
      cv.width = Math.round(w * dpr)
      cv.height = Math.round(h * dpr)

      // Céu: degradê, brilho do sol baixo e grão — desenhado uma vez.
      ceu = document.createElement('canvas')
      ceu.width = cv.width
      ceu.height = cv.height
      const s = ceu.getContext('2d')
      if (s) {
        s.setTransform(dpr, 0, 0, dpr, 0, 0)
        const g = s.createLinearGradient(0, 0, 0, h)
        g.addColorStop(0, ceuTopo)
        g.addColorStop(0.8, ceuBaixo)
        g.addColorStop(1, ceuBaixo)
        s.fillStyle = g
        s.fillRect(0, 0, w, h)
        const sl = s.createRadialGradient(w * 0.62, h * 0.9, 0, w * 0.62, h * 0.9, Math.max(w, h) * 0.55)
        sl.addColorStop(0, sol)
        sl.addColorStop(0.25, alfa(sol, 0.5))
        sl.addColorStop(1, alfa(sol, 0))
        s.globalAlpha = 0.55
        s.fillStyle = sl
        s.fillRect(0, 0, w, h)
        s.globalAlpha = 1
        const gr = aleatorio(5)
        for (let i = 0; i < (w * h) / 12; i++) {
          s.fillStyle = gr() < 0.5 ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.035)'
          s.fillRect(gr() * w, gr() * h, 1, 1)
        }
      }

      // A palavra vira pontos-alvo numa máscara 1x.
      const m = document.createElement('canvas')
      m.width = w
      m.height = h
      const mc = m.getContext('2d', { willReadFrequently: true })
      const pts: number[] = []
      if (mc) {
        mc.font = fonte
        const larg = mc.measureText(palavra).width || 1
        const tam = Math.min(((w * 0.8) / larg) * 100, (h * 0.42) / 0.7)
        mc.font = fonte.replace('100px', `${tam}px`)
        mc.textAlign = 'center'
        mc.textBaseline = 'middle'
        mc.fillText(palavra, w / 2, h * 0.56)
        const img = mc.getImageData(0, 0, w, h).data
        const passo = Math.max(2, Math.round(Math.sqrt((w * h) / 90000)))
        for (let y = 0; y < h; y += passo)
          for (let x = 0; x < w; x += passo) if (img[(y * w + x) * 4 + 3] > 128) pts.push(x + (rnd() - 0.5) * passo, y + (rnd() - 0.5) * passo)
      }
      tx = new Float32Array(pts.filter((_, i) => i % 2 === 0))
      ty = new Float32Array(pts.filter((_, i) => i % 2 === 1))

      const quer = Math.max(500, Math.round(Math.min(9000, passaros) * Math.min(1, (w * h) / (1440 * 860))))
      if (quer !== n) {
        n = quer
        px = new Float32Array(n)
        py = new Float32Array(n)
        vx = new Float32Array(n)
        vy = new Float32Array(n)
        prof = new Float32Array(n)
        fase = new Float32Array(n)
        for (let i = 0; i < n; i++) {
          const a = rnd() * Math.PI * 2
          const r = Math.sqrt(rnd())
          px[i] = w * 0.5 + Math.cos(a) * r * w * 0.22
          py[i] = h * 0.45 + Math.sin(a) * r * h * 0.16
          prof[i] = 0.55 + rnd() * 0.45
          fase[i] = rnd() * Math.PI * 2
        }
      }
      // Pares pássaro → ponto embaralhados, para a palavra encher de todo lado ao mesmo tempo.
      alvo = new Int32Array(n).fill(-1)
      const np = tx.length
      if (np) {
        const ordem = Array.from({ length: np }, (_, i) => i)
        const r2 = aleatorio(23)
        for (let i = np - 1; i > 0; i--) {
          const j = Math.floor(r2() * (i + 1))
          ;[ordem[i], ordem[j]] = [ordem[j], ordem[i]]
        }
        for (let i = 0; i < n; i++) alvo[i] = ordem[i % np]
      }
      if (parado)
        for (let i = 0; i < n; i++)
          if (alvo[i] >= 0) {
            px[i] = tx[alvo[i]]
            py[i] = ty[alvo[i]]
            vx[i] = 0.001
          }
    }

    const desenhar = (puxa: number) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      if (ceu) ctx.drawImage(ceu, 0, 0)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.strokeStyle = tinta
      // Duas passadas: os de perto mais escuros e grossos.
      for (let passada = 0; passada < 2; passada++) {
        ctx.beginPath()
        for (let i = 0; i < n; i++) {
          if ((passada === 1) !== prof[i] > 0.78) continue
          const s = (1.6 + prof[i] * 2.2) * (1 - 0.35 * puxa)
          const sp = Math.hypot(vx[i], vy[i]) + 0.001
          const dx = vx[i] / sp
          const dy = vy[i] / sp
          const asa = 0.55 + 0.45 * Math.sin(fase[i])
          const wx = -dx * s
          const wy = -dy * s
          const nx = -dy * s * asa
          const ny = dx * s * asa
          ctx.moveTo(px[i] + wx + nx, py[i] + wy + ny)
          ctx.lineTo(px[i], py[i])
          ctx.lineTo(px[i] + wx - nx, py[i] + wy - ny)
        }
        ctx.globalAlpha = passada === 0 ? 0.55 : 0.92
        ctx.lineWidth = passada === 0 ? 0.9 : 1.25
        ctx.stroke()
      }
      ctx.globalAlpha = 1
    }

    const quadro = (agora: number) => {
      raf = 0
      if (!naTela || document.hidden) return
      const dt = Math.min(0.05, (agora - antes) / 1000)
      antes = agora
      relogio += dt
      const ciclo = voa + 2.4 + segura + 0.6
      const tc = relogio % ciclo
      let puxa = 0
      if (tc > voa && tc <= voa + 2.4) puxa = suave((tc - voa) / 2.4)
      else if (tc > voa + 2.4 && tc <= voa + 2.4 + segura) puxa = 1
      else if (tc > voa + 2.4 + segura) puxa = 1 - suave((tc - voa - 2.4 - segura) / 0.6)

      const u = Math.min(w, h)
      const cx = w / 2 + (0.42 * Math.sin(relogio * 0.21) + 0.12 * Math.sin(relogio * 0.53 + 1)) * w * 0.5
      const cy = h * 0.45 + (0.16 * Math.sin(relogio * 0.33 + 2) - 0.08) * h
      const t = relogio * 0.35
      const gaviao = gx > -1e4
      const gR = u * 0.16
      const livre = 1 - puxa
      for (let i = 0; i < n; i++) {
        const x = px[i]
        const y = py[i]
        let ax = 0
        let ay = 0
        const cv2 = corrente(((x - w / 2) / u) * 2.2 + prof[i] * 0.25, ((y - h / 2) / u) * 2.2, t)
        ax += cv2[0] * 420 * livre
        ay += cv2[1] * 420 * livre
        const dxC = cx - x
        const dyC = (cy - y) * 1.6
        const dC = Math.hypot(dxC, dyC) / u
        const prende = dC < 0.14 ? 0.15 : 0.15 + (dC - 0.14) * 6
        ax += dxC * prende * 2.2 * livre
        ay += dyC * prende * 1.6 * livre
        const a = alvo[i]
        if (puxa > 0 && a >= 0) {
          ax += (tx[a] - x) * 9 * puxa - vx[i] * 3.2 * puxa
          ay += (ty[a] - y) * 9 * puxa - vy[i] * 3.2 * puxa
        }
        if (gaviao) {
          const dx = x - gx
          const dy = y - gy
          const d2 = dx * dx + dy * dy
          if (d2 < gR * gR) {
            const d = Math.sqrt(d2) + 0.01
            const f = (1 - d / gR) * 5200
            ax += (dx / d) * f
            ay += (dy / d) * f
          }
        }
        let nvx = (vx[i] + ax * dt) * (1 - 1.1 * dt)
        let nvy = (vy[i] + ay * dt) * (1 - 1.1 * dt)
        const sp = Math.hypot(nvx, nvy)
        const teto = 520 + 380 * puxa
        if (sp > teto) {
          nvx = (nvx / sp) * teto
          nvy = (nvy / sp) * teto
        }
        vx[i] = nvx
        vy[i] = nvy
        px[i] = x + nvx * dt
        py[i] = y + nvy * dt
        fase[i] += dt * (9 + sp * 0.02)
      }
      desenhar(puxa)
      raf = requestAnimationFrame(quadro)
    }
    const pedir = () => {
      if (parado) {
        desenhar(1)
        return
      }
      if (!raf && naTela && !document.hidden) {
        antes = performance.now()
        raf = requestAnimationFrame(quadro)
      }
    }

    const mover = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const b = cv.getBoundingClientRect()
      gx = e.clientX - b.left
      gy = e.clientY - b.top
    }
    const sair = () => {
      gx = -1e5
      gy = -1e5
    }

    montar()
    el.addEventListener('pointermove', mover)
    el.addEventListener('pointerleave', sair)
    const ro = new ResizeObserver(() => {
      montar()
      if (parado) desenhar(1)
    })
    ro.observe(el)
    const io = new IntersectionObserver((lista) => {
      const e = lista[lista.length - 1]
      naTela = e.isIntersecting
      if (naTela) pedir()
    })
    io.observe(el)
    document.addEventListener('visibilitychange', pedir)
    let vivo = true
    document.fonts?.ready.then(() => {
      if (!vivo) return
      montar()
      if (parado) desenhar(1)
    })
    return () => {
      vivo = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', pedir)
      el.removeEventListener('pointermove', mover)
      el.removeEventListener('pointerleave', sair)
    }
  }, [palavra, passaros, ceuTopo, ceuBaixo, sol, tinta, voa, segura, fonte, perto])

  return (
    <div ref={raiz} className={`relative isolate overflow-hidden ${className}`} style={{ background: ceuTopo }}>
      <canvas ref={tela} aria-hidden className="absolute inset-0 -z-10 block size-full" />
      {children}
    </div>
  )
}
