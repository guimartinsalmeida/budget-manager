import React from 'react'
import ReactDOM from 'react-dom/client'
import MainRoutes from './routes.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainRoutes />
  </React.StrictMode>,
)
