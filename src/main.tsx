import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/cormorant-garamond/latin-600.css'
import '@fontsource-variable/outfit/wght.css'
import './index.css'
import App from './App'
import { ErroSeguro } from './components/ErroSeguro'

// Abertura só na 1ª visita da sessão; depois some do DOM.
try {
  const intro = document.getElementById('intro')
  if (intro) {
    if (sessionStorage.getItem('intro') || matchMedia('(prefers-reduced-motion: reduce)').matches) intro.remove()
    else {
      sessionStorage.setItem('intro', '1')
      document.documentElement.classList.add('com-intro')
      setTimeout(() => intro.remove(), 2200)
    }
  }
} catch {
  document.getElementById('intro')?.remove()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErroSeguro>
      <App />
    </ErroSeguro>
  </StrictMode>,
)
