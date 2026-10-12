import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/cormorant-garamond/latin-600.css'
import '@fontsource-variable/outfit/wght.css'
import './index.css'
import App from './App'
import { ErroSeguro } from './components/ErroSeguro'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErroSeguro>
      <App />
    </ErroSeguro>
  </StrictMode>,
)
