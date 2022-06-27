import { Loader } from '../../components/Loader'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Login } from '../../pages/Login'

import styles from './styles.module.scss'

export function ProtectedLayout({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading } = useAuthContext()

  if (loading) {
    return (
      <div className={styles.container}>
        <Loader size="medium" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Login />
  }

  return children
}