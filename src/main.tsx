import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { OrderProvider } from './state/OrderContext'
import './index.css'
import { router } from './app/routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OrderProvider>
      <RouterProvider router={router} />
    </OrderProvider>
  </StrictMode>
)
