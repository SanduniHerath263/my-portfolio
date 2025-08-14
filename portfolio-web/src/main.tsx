import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Portfoliopg from './pages/Portfoliopg'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Portfoliopg />
  </StrictMode>
)
