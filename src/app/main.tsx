import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './ui/index.tsx'
import 'last.css'
import './global.css'
import { init_file_on_launch } from './ss/file'
import './ss/app_title.ts'

init_file_on_launch()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
