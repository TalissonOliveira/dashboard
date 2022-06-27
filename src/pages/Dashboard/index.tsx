import { useEffect } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

export function Dashboard() {
  const { user } = useAuthContext()

  useEffect(() => {
    console.log(user)
  }, [user])
  

  return (
    <div>Dashboard {user?.email}</div>
  )
}
