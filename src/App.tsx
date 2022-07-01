import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import { makeServer } from './services/mirage';
import { AuthProvider } from './contexts/AuthContext'
import { Router } from './routes'

import 'react-toastify/dist/ReactToastify.css';
import './styles/global.scss'

const queryClient = new QueryClient()

// if (process.env.NODE_ENV === 'development') {
  makeServer()
// }

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Router />
        </AuthProvider>
        <ToastContainer />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
