import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Loader } from '../../components/Loader'

import styles from './styles.module.scss'

export function AuthLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuthContext()

  const navigate = useNavigate()

  if (loading) {
    return (
      <div className={styles.container}>
        <Loader size="medium" />
      </div>
    )
  }

  if (isAuthenticated) {
    navigate('/dashboard')
    return null
  }

  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}
