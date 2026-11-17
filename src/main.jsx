
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/plus-jakarta-sans'
import '@fontsource-variable/geist-mono'
import '@fontsource/instrument-serif/400-italic.css'
import './index.css'
import App from './App.jsx'
import './i18n'   // à placer avant import App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
