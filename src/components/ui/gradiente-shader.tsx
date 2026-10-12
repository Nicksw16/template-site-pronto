// Gradiente animado em WebGL — "mesh gradient" do 21st (id 23959, gerado pelo Shader Builder; estilo ShaderGradient),
// enxugado pela Lynx: cores da marca, sem cursor/blur, grão e vinheta leves. Sem dependências.
// Pausa fora da tela e com a aba oculta; prefers-reduced-motion = um quadro parado; sem WebGL = fundo CSS do pai.
import { useEffect, useRef } from 'react'

const VERT = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`

const FRAG = `precision mediump float;
uniform vec3 u_c[5];
uniform vec3 u_s; // resolução.xy, tempo
float h(vec2 p){p=fract(p*vec2(234.34,435.345));p+=dot(p,p+34.23);return fract(p.x*p.y);}
float n(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),u.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p=p*2.03+vec2(17.,9.2);a*=.5;}return v;}
float g(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
void main(){
  vec2 uv=gl_FragCoord.xy/u_s.xy;
  vec2 p=(gl_FragCoord.xy-.5*u_s.xy)/min(u_s.x,u_s.y)*1.5;
  float t=u_s.z;
  p+=.18*vec2(sin(t*.31),cos(t*.23));
  p+=.35*(vec2(fbm(p*1.6+t*.05),fbm(p*1.6+vec2(5.2,1.3)-t*.04))-.5);
  vec3 acc=u_c[0]*.2;float tot=.2;
  for(int i=0;i<5;i++){float fi=float(i);
    vec2 c=vec2(sin(t*(.21+fi*.071)+fi*2.4),cos(t*(.17+fi*.093)+fi*1.7))*.7;
    float w=exp(-dot(p-c,p-c)*3.5);acc+=u_c[i]*w;tot+=w;}
  vec3 col=acc/tot;
  col*=1.-.45*smoothstep(.35,1.,length(uv-.5)*1.414);
  col+=(g(gl_FragCoord.xy)-.5)*.045;
  gl_FragColor=vec4(clamp(col,0.,1.),1.);
}`

const hex = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16) / 255)

export function GradienteShader({ cores, velocidade = 0.45, className }: { cores: string[]; velocidade?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    const gl = cv?.getContext('webgl', { antialias: false, alpha: false })
    if (!cv || !gl) return
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
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return
    gl.useProgram(pr)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(pr, 'a')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const lista = Array.from({ length: 5 }, (_, i) => hex(cores[i % cores.length]))
    gl.uniform3fv(gl.getUniformLocation(pr, 'u_c'), new Float32Array(lista.flat()))
    const uS = gl.getUniformLocation(pr, 'u_s')

    const parado = matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let naTela = true
    const inicio = performance.now()
    const ajustar = () => {
      const dpr = Math.min(devicePixelRatio || 1, 1.5)
      const w = Math.max(1, Math.round(cv.clientWidth * dpr))
      const h = Math.max(1, Math.round(cv.clientHeight * dpr))
      if (cv.width !== w || cv.height !== h) {
        cv.width = w
        cv.height = h
        gl.viewport(0, 0, w, h)
      }
    }
    const quadro = (agora: number) => {
      raf = 0
      ajustar()
      gl.uniform3f(uS, cv.width, cv.height, parado ? 12 : ((agora - inicio) / 1000) * velocidade)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      if (!parado && naTela && !document.hidden) raf = requestAnimationFrame(quadro)
    }
    const pedir = () => {
      if (!raf && naTela && !document.hidden) raf = requestAnimationFrame(quadro)
    }
    const io = new IntersectionObserver(([e]) => {
      naTela = e.isIntersecting
      if (naTela) pedir()
    })
    io.observe(cv)
    const ro = new ResizeObserver(pedir)
    ro.observe(cv)
    document.addEventListener('visibilitychange', pedir)
    pedir()
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', pedir)
      gl.deleteBuffer(buf)
      gl.deleteProgram(pr)
    }
  }, [cores, velocidade])

  return <canvas ref={ref} aria-hidden className={className} style={{ display: 'block', width: '100%', height: '100%' }} />
}
