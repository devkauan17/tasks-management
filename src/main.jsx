import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GlobalProvider } from './providers/globalContext'
import MainRoutes from './routes'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalProvider>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </GlobalProvider>
  </React.StrictMode>,
)
