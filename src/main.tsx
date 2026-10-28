import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserProvider from './context/userContext'
import { RouterProvider } from 'react-router'
import routes from './routes/Routes'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    < QueryClientProvider client={queryClient} >
      <UserProvider>
        <RouterProvider router={routes} />
      </UserProvider>
    </QueryClientProvider >
  </StrictMode>
)
