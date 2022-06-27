import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/AuthContext'
import { Router } from './routes'
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.scss'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
