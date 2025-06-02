import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TeledonApp from './TeledonApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TeledonApp />
  </StrictMode>,
)
