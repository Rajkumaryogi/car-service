import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import RegisterForm from '../components/auth/RegisterForm'
import { toast } from 'react-toastify'
import { FaUserPlus, FaSpinner } from 'react-icons/fa'

export default function Register() {
  const navigate = useNavigate()
  const { user, loading, register } = useAuth()
  const [error, setError] = useState('')

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
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full py-12 text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
          <div className="text-lg">Checking authentication status...</div>
        </div>
      </div>
    )
  }

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full py-12 text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
          <div className="text-lg">Redirecting to dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12 bg-gray-50">
      <div className="max-w-md w-full bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <FaUserPlus className="text-5xl text-blue-600 mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Create Account</h1>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}
        
        <RegisterForm onSubmit={handleRegister} />
        
        <div className="mt-6 text-center text-sm sm:text-base">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Login here
            </Link>
          </p>
          <p className="mt-2 text-gray-600">
            <Link 
              to="/admin-login" 
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Admin Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}