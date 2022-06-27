import { createContext, ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api } from '../services/api'

interface User {
  email: string
  name?: string
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  isAuthenticated: boolean
  signIn: (credentials: SignInCredentials) => Promise<void>
  user: User
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>()
  const navigate = useNavigate()
  const isAuthenticated = !!user

  useEffect(() => {
    const recoveredUser = localStorage.getItem('dashboard:user')

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser))
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/login', {
        email,
        password
      })

      const { token, user } = response.data

      setUser(user || { email })
      localStorage.setItem('dashboard:token', token)
      localStorage.setItem('dashboard:user', JSON.stringify(user || {
        email
      }))

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      toast.dismiss()
      navigate('/dashboard')

    } catch ({ response }) {
      toast.dismiss()
      toast.error(response?.data.error)
    }
  }

  return (
    <AuthContext.Provider value={{
      signIn,
      user,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  )
}
