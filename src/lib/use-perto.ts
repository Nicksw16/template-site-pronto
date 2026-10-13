import { useEffect, useState, type RefObject } from 'react'

// true quando o elemento chega perto da tela (e continua true). Efeitos pesados só começam a partir daí,
// para não travar o carregamento inicial no celular.
export function usePerto(ref: RefObject<Element | null>, margem = '400px') {
  const [perto, setPerto] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || perto) return
    const io = new IntersectionObserver((lista) => lista.some((e) => e.isIntersecting) && setPerto(true), { rootMargin: margem })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, margem, perto])
  return perto
}
