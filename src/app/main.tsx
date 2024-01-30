import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './ui/index.tsx'
import 'last.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)