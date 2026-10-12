// Gera as imagens do site em public/img/ (WebP) + og-image, favicon e apple-touch-icon.
// Uso: npm run imagens -- <pasta-com-as-fotos-originais>
// Para trocar pelas fotos reais: salve as fotos do cliente na pasta com os mesmos nomes
// de origem (coluna "de" abaixo) ou edite a lista e rode de novo.
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const origem = process.argv[2]
if (!origem) { console.error('Informe a pasta das fotos originais.'); process.exit(1) }
const destino = path.resolve('public/img')
fs.mkdirSync(destino, { recursive: true })

// de: arquivo original · para: nome final · w/h: recorte (sem h = mantém proporção)
const fotos = [
  { de: 'p13834522.jpg', para: 'hero-salao', w: 1600, h: 800, mobile: 800 },
  { de: 'p5610382.jpg', para: 'festa-infantil', w: 800, h: 600 },
  { de: 'p26558731.jpg', para: 'festa-15-anos', w: 800, h: 600 },
  { de: 'p10360896.jpg', para: 'casamento', w: 800, h: 600 },
  { de: 'p37296132.jpg', para: 'aniversario-adulto', w: 800, h: 600 },
  { de: 'p36318467.jpg', para: 'corporativo', w: 800, h: 600 },
  { de: 'p30484893.jpg', para: 'cha-de-bebe', w: 800, h: 600 },
  { de: 'p17023020.jpg', para: 'buffet-classico', w: 800, h: 600 },
  { de: 'p20807883.jpg', para: 'buffet-premium', w: 800, h: 600 },
  { de: 'p34321369.jpg', para: 'coquetel', w: 800, h: 600 },
  { de: 'p17023020.jpg', para: 'salao', w: 900, h: 1200 },
  { de: 'p7548036.jpg', para: 'area-kids', w: 900, h: 675 },
  { de: 'p2544829.jpg', para: 'cozinha', w: 900, h: 675 },
  { de: 'p6937464.jpg', para: 'equipe', w: 900, h: 675 },
  { de: 'p12689145.jpg', para: 'galeria-1', w: 900 },
  { de: 'p6148507.jpg', para: 'galeria-2', w: 900 },
  { de: 'p15964967.jpg', para: 'galeria-3', w: 900 },
  { de: 'p1682462.jpg', para: 'galeria-4', w: 900 },
  { de: 'p31972418.jpg', para: 'galeria-5', w: 900 },
  { de: 'p20807883.jpg', para: 'galeria-6', w: 900 },
  { de: 'p30484893.jpg', para: 'galeria-7', w: 900 },
  { de: 'p13834522.jpg', para: 'galeria-8', w: 900 },
]

const tamanhos = {}
for (const f of fotos) {
  const entrada = path.join(origem, f.de)
  if (!fs.existsSync(entrada)) { console.warn('faltando:', f.de); continue }
  const base = sharp(entrada).rotate()
  const r = f.h ? base.resize(f.w, f.h, { fit: 'cover', position: 'attention' }) : base.resize(f.w)
  const info = await r.webp({ quality: 74, effort: 5 }).toFile(path.join(destino, `${f.para}.webp`))
  tamanhos[f.para] = [info.width, info.height]
  if (f.mobile) {
    await sharp(entrada).rotate().resize(f.mobile, Math.round((f.mobile * f.h) / f.w), { fit: 'cover', position: 'attention' })
      .webp({ quality: 72 }).toFile(path.join(destino, `${f.para}-${f.mobile}.webp`))
  }
}
console.log(JSON.stringify(tamanhos))

// Paleta do plano-design.md
const fundo = '#FBF5F2', primaria = '#14584A', destaque = '#AA3C25', texto = '#2A1E22'

// og-image 1200x630 (JPG: melhor compatibilidade com o preview do WhatsApp)
const heroOrig = path.join(origem, 'p13834522.jpg')
const capa = await sharp(heroOrig).resize(1200, 630, { fit: 'cover' }).toBuffer()
const faixa = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="${texto}" stop-opacity="0.82"/><stop offset="0.65" stop-color="${texto}" stop-opacity="0.35"/><stop offset="1" stop-color="${texto}" stop-opacity="0"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="72" y="270" font-family="Georgia, serif" font-size="82" fill="${fundo}">Villa Aurora</text>
  <text x="72" y="340" font-family="Helvetica, Arial, sans-serif" font-size="34" fill="${fundo}">Espaço e buffet para a sua festa</text>
  <rect x="72" y="388" width="300" height="64" rx="12" fill="${primaria}"/>
  <text x="222" y="430" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#FFFFFF">Pedir orçamento</text>
</svg>`)
await sharp(capa).composite([{ input: faixa }]).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(destino, 'og-villa-aurora.jpg'))

// Ícone: monograma "VA" (trocar pela logo real)
const icone = (s) => Buffer.from(`<svg width="${s}" height="${s}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" rx="14" fill="${primaria}"/>
  <text x="32" y="43" text-anchor="middle" font-family="Georgia, serif" font-size="30" fill="${fundo}">VA</text>
  <circle cx="50" cy="15" r="4" fill="${destaque}"/></svg>`)
await sharp(icone(180)).png().toFile(path.resolve('public/apple-touch-icon.png'))
await sharp(icone(32)).png().toFile(path.resolve('public/favicon-32.png'))
await sharp(icone(512)).png().toFile(path.join(destino, 'logo.png'))
console.log('ok')
