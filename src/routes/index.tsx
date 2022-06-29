import { Route, Routes } from 'react-router-dom'
import { ProtectedLayout } from '../layouts/ProtectedLayout'
import { Dashboard } from '../pages/Dashboard'
import { Login } from '../pages/Login'
import { Profile } from '../pages/Profile'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={
        <ProtectedLayout>
          <Dashboard />
        </ProtectedLayout>
      }/>
      <Route path="/profile" element={
        <ProtectedLayout>
          <Profile />
        </ProtectedLayout>
      }/>
    </Routes>
  )
}
