import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import LoadingSpinner from '../common/LoadingSpinner'

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />

  if (!user?.isAdmin) {
    return <Navigate to="/admin-login" replace />
  }

  // if (!user?.isAdmin || user.email !== 'rajyogi1811@gmail.com') {
  //   return <Navigate to="/" replace />
  // }

  return children
}