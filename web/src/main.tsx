import './index.css'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import AuthProvider from './contexts/auth.context.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const root = document.getElementById('root')

if (!root) {
  throw new Error('No root element found')
}

const client = new QueryClient()

createRoot(root).render(
  <AuthProvider>
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </AuthProvider>
)
