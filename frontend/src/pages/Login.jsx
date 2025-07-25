import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LoginForm from '../components/auth/LoginForm'
import { toast } from 'react-toastify'

export default function Login() {
  const navigate = useNavigate()
  const { user, loading, login, adminLogout } = useAuth()
  const [error, setError] = useState('')
 
  // Redirect if already logged in (only for regular users)
  useEffect(() => {
    if (user && !user.isAdmin && !loading) {
      toast.info('You are logged in')
      navigate('/dashboard')
    }
    
    // // If admin is logged in, log them out before showing user login
    // if (user?.isAdmin && !loading) {
    //   const switchToUserLogin = async () => {
    //     await adminLogout()
    //     toast.info('Please login as a regular user')
    //   }
    //   switchToUserLogin()
    // }
  }, [user, loading, navigate, adminLogout])

  const handleLogin = async (email, password) => {
    try {
      await login(email, password)
      toast.success('Login successful!')
      navigate('/dashboard')
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.'
      setError(errorMessage)
      toast.error(errorMessage)
      console.error('Login error:', err.response?.data)
    }
  }

  if (loading) {
    return (
      <div className="max-w-md mx-auto py-12 text-center">
        <div>Checking authentication status...</div>
      </div>
    )
  }

  if (user && !user.isAdmin) {
    return (
      <div className="max-w-md mx-auto py-12 text-center">
        <div>Redirecting to dashboard...</div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">User Login</h1>
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      <LoginForm onSubmit={handleLogin} />
      <p className="mt-4 text-center">
        Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register here</Link>
      </p>
    </div>
  )
}