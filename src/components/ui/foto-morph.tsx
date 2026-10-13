// Troca de fotos que se dissolve em ruído — "Morph Gallery" do 21st (id 27258, kedhareswer), enxugada pela Lynx:
// índice controlado de fora (sem setas/miniaturas), fotos locais (mesma origem, sem CORS), roda o quadro só
// durante a transição e para quando termina. Sem WebGL = troca por opacidade. prefers-reduced-motion = troca direta.
import { useEffect, useRef, useState } from 'react'
import { usePerto } from '@/lib/use-perto'

const VERT = `attribute vec2 a;varying vec2 v;void main(){v=a*.5+.5;gl_Position=vec4(a,0.,1.);}`

const FRAG = `precision highp float;
uniform sampler2D u_de;uniform sampler2D u_para;
uniform float u_p;uniform vec2 u_res;uniform float u_ade;uniform float u_apara;uniform float u_dir;
varying vec2 v;
vec3 perm(vec3 x){return mod(((x*34.)+1.)*x,289.);}
float sn(vec2 v){const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);
  vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
  vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod(i,289.);
  vec3 p=perm(perm(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
  vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);m=m*m;m=m*m;
  vec3 x=2.*fract(p*C.www)-1.;vec3 h=abs(x)-.5;vec3 ox=floor(x+.5);vec3 a0=x-ox;
  m*=1.79284291400159-.85373472095314*(a0*a0+h*h);
  vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.*dot(m,g);}
float fbm(vec2 v){float s=0.,a=.5;for(int i=0;i<5;i++){s+=a*sn(v);v*=2.;a*=.5;}return s;}
vec2 esp(vec2 uv){return 1.-abs(1.-mod(uv,2.));}
vec2 cobrir(vec2 uv,float ai){float ac=u_res.x/u_res.y;vec2 s=ac>ai?vec2(1.,ai/ac):vec2(ac/ai,1.);return esp((uv-.5)*s+.5);}
void main(){
  const float E=.15;const float D=.5;
  float aj=u_p*(1.+2.*E)-E;
  float n=fbm(v*3.5+vec2(0.,u_p*u_dir))*.5+.5;
  n=smoothstep(0.,2.,length(texture2D(u_para,cobrir(v,u_apara)).rgb)+n);
  float k=1.-smoothstep(aj-E,aj+E,n);
  vec2 a=cobrir(v+vec2(0.,n*u_p*D*u_dir),u_ade);
  vec2 b=cobrir(v+vec2(0.,n*(1.-u_p)*-.5*D*u_dir),u_apara);
  gl_FragColor=mix(texture2D(u_de,a),texture2D(u_para,b),k);
}`

const suave = (t: number) => {
  const x = Math.min(Math.max(t, 0), 1)
  return x < 0.5 ? 16 * x ** 5 : 1 - (-2 * x + 2) ** 5 / 2
}

export type FotoMorphItem = { src: string; alt: string }

export function FotoMorph({ itens, ativo, duracao = 1400, className = '' }: { itens: FotoMorphItem[]; ativo: number; duracao?: number; className?: string }) {
  const tela = useRef<HTMLCanvasElement>(null)
  const pedido = useRef<number | null>(null)
  const acordar = useRef<() => void>(() => undefined)
  const [falhou, setFalhou] = useState(false)
  const [pronto, setPronto] = useState(false)
  const caixa = useRef<HTMLDivElement>(null)
  const perto = usePerto(caixa)

  useEffect(() => {
    pedido.current = ativo
    acordar.current()
  }, [ativo])

  const fontes = itens.map((i) => i.src).join('|')

  useEffect(() => {
    const cv = tela.current
    if (!perto || !cv?.clientWidth) return
    const gl = cv.getContext('webgl', { alpha: false, antialias: false })
    if (!cv || !gl) {
      setFalhou(true)
      return
    }
    const parado = matchMedia('(prefers-reduced-motion: reduce)').matches
    const sh = (tipo: number, src: string) => {
      const s = gl.createShader(tipo)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const pr = gl.createProgram()!
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VERT))
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(pr)
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) {
      setFalhou(true)
      return
    }
    gl.useProgram(pr)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(pr, 'a')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const u = (n: string) => gl.getUniformLocation(pr, n)
    const U = {
      de: u('u_de'),
      para: u('u_para'),
      p: u('u_p'),
      res: u('u_res'),
      ade: u('u_ade'),
      apara: u('u_apara'),
      dir: u('u_dir'),
    }
    gl.uniform1i(U.de, 0)
    gl.uniform1i(U.para, 1)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)

    const tex: (WebGLTexture | null)[] = itens.map(() => null)
    const asp = itens.map(() => 1)
    let de = pedido.current ?? 0
    let para = de
    let p = 1
    let inicio = 0
    let dir = 1
    let raf = 0
    let vivo = true

    const ajustar = () => {
      const dpr = Math.min(devicePixelRatio || 1, 1.75)
      const w = Math.round(cv.clientWidth * dpr)
      const h = Math.round(cv.clientHeight * dpr)
      if (w && h && (cv.width !== w || cv.height !== h)) {
        cv.width = w
        cv.height = h
        gl.viewport(0, 0, w, h)
      }
    }
    const pega = (i: number) => tex[i] ?? tex.find(Boolean) ?? null
    const quadro = () => {
      raf = 0
      if (!vivo) return
      const novo = pedido.current
      if (novo !== null && novo !== para) {
        de = para
        para = novo
        dir = novo > de ? 1 : -1
        p = 0
        inicio = performance.now()
      }
      pedido.current = null
      if (p < 1) p = parado ? 1 : suave((performance.now() - inicio) / duracao)
      const a = pega(p >= 1 ? para : de)
      const b = pega(para)
      if (!a || !b) return
      ajustar()
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, a)
      gl.activeTexture(gl.TEXTURE1)
      gl.bindTexture(gl.TEXTURE_2D, b)
      gl.uniform1f(U.p, p)
      gl.uniform2f(U.res, cv.width, cv.height)
      gl.uniform1f(U.ade, asp[p >= 1 ? para : de])
      gl.uniform1f(U.apara, asp[para])
      gl.uniform1f(U.dir, dir)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      if (p < 1) raf = requestAnimationFrame(quadro)
    }
    const pedir = () => {
      if (!raf && vivo) raf = requestAnimationFrame(quadro)
    }
    acordar.current = pedir

    // Só baixa as fotos quando o quadro tem tamanho (no celular ele fica oculto e nada é carregado).
    let recusadas = 0
    let carregou = false
    const carregar = () => {
      if (carregou || !cv.clientWidth) return
      carregou = true
      itens.forEach((it, i) => {
        const img = new Image()
        img.decoding = 'async'
        img.onload = () => {
          if (!vivo) return
          const t = gl.createTexture()
          gl.bindTexture(gl.TEXTURE_2D, t)
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
          tex[i] = t
          asp[i] = img.naturalWidth / Math.max(img.naturalHeight, 1)
          setPronto(true)
          pedir()
        }
        img.onerror = () => {
          recusadas += 1
          if (recusadas === itens.length && vivo) setFalhou(true)
        }
        img.src = it.src
      })
    }
    const ro = new ResizeObserver(() => {
      carregar()
      pedir()
    })
    ro.observe(cv)

    return () => {
      vivo = false
      acordar.current = () => undefined
      cancelAnimationFrame(raf)
      ro.disconnect()
      tex.forEach((t) => t && gl.deleteTexture(t))
      gl.deleteBuffer(buf)
      gl.deleteProgram(pr)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fontes, duracao, perto])

  return (
    <div ref={caixa} className={className || 'relative'}>
      {/* Foto de base: aparece antes do WebGL e serve de reserva se ele faltar */}
      {itens.map((it, i) => (
        <img
          key={it.src}
          src={it.src}
          alt={i === ativo ? it.alt : ''}
          aria-hidden={i !== ativo}
          width={900}
          height={1200}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover transition-opacity duration-700"
          style={{ opacity: (falhou || !pronto) && i === ativo ? 1 : 0 }}
        />
      ))}
      {!falhou && (
        <canvas ref={tela} aria-hidden className="absolute inset-0 block size-full transition-opacity duration-500" style={{ opacity: pronto ? 1 : 0 }} />
      )}
    </div>
  )
}
