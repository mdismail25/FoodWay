import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/index.css'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          {/* Global fallback for lazy components */}
          <Suspense fallback={<div style={{ padding: 24 }}>Loading FoodWay…</div>}>
            <App />
          </Suspense>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
