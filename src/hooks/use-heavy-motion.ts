import { useSyncExternalStore } from 'react'

// Animações pesadas só em telas >= 768px e sem prefers-reduced-motion.
const QUERY = '(min-width: 768px) and (prefers-reduced-motion: no-preference)'

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

export function useHeavyMotion() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false)
}
