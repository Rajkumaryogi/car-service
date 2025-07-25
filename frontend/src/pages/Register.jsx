import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import RegisterForm from '../components/auth/RegisterForm'
import { toast } from 'react-toastify'

export default function Register() {
  const navigate = useNavigate()
  const { user, loading, register } = useAuth()
  const [error, setError] = useState('')

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      toast.info('Please logout to register a new account')
      navigate('/dashboard')
    }
  }, [user, loading, navigate])

  const handleRegister = async (userData) => {
    try {
      await register(userData)
      toast.success('Registration successful!')
      navigate('/dashboard')
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.'
      setError(errorMessage)
      toast.error(errorMessage)
      console.error('Registration error:', err.response?.data)
    }
  }

  if (loading) {
    return (
      <div className="max-w-md mx-auto py-12 text-center">
        <div>Checking authentication status...</div>
      </div>
    )
  }

  if (user) {
    return (
      <div className="max-w-md mx-auto py-12 text-center">
        <div>Redirecting to dashboard...</div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      <RegisterForm onSubmit={handleRegister} />
      <p className="mt-4 text-center">
        Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
      </p>
      <p className="mt-2 text-center">
        <Link to="/admin-login" className="text-blue-600 hover:underline">Admin Login</Link>
      </p>
    </div>
  )
}