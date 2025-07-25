import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import LoadingSpinner from '../common/LoadingSpinner'

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <LoadingSpinner />

  if (!user?.isAdmin) {
    // Redirect to admin login with return URL
    return <Navigate to={`/admin-login?redirect=${encodeURIComponent(location.pathname)}`} replace />
  }

  // Optional: Add specific admin email check
  // if (user.email !== 'rajyogi1811@gmail.com') {
  //   return <Navigate to="/" replace />
  // }

  return children
}