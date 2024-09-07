import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import './assets/styles/index.css'
import './assets/styles/reset.css'
import './assets/styles/barra-rolagem.css'
import './assets/styles/container-filmes.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
