import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import RegisterForm from '../components/auth/RegisterForm'
import { toast } from 'react-toastify'
import { FaUserPlus, FaSpinner, FaArrowLeft } from 'react-icons/fa'

export default function Register() {
  const navigate = useNavigate()
  const { user, loading, register } = useAuth()
  const [error, setError] = useState('')

  useEffect(() => {
    if (user && !loading) {
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
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="max-w-md w-full py-12 text-center">
          <FaSpinner className="animate-spin text-4xl text-red-600 mx-auto mb-4" />
          <div className="text-lg text-gray-800">Checking authentication status...</div>
        </div>
      </div>
    )
  }

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="max-w-md w-full py-12 text-center">
          <FaSpinner className="animate-spin text-4xl text-red-600 mx-auto mb-4" />
          <div className="text-lg text-gray-800">Redirecting to dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="max-w-md w-full">
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-red-600 hover:text-red-800 mb-6 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          <span>Back</span>
        </button>
        
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUserPlus className="text-3xl text-red-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Create Your Account</h1>
            <p className="text-gray-600 mt-2">Join us to get started</p>
          </div>
          
          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-md flex items-center border border-red-200">
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          
          <RegisterForm onSubmit={handleRegister} />
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-red-600 hover:text-red-800 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>
            
            <Link 
              to="/admin-login" 
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Admin Login
            </Link>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>By registering, you agree to our <a href="#" className="text-red-600 hover:underline">Terms</a> and <a href="#" className="text-red-600 hover:underline">Privacy Policy</a></p>
        </div>
      </div>
    </div>
  )
}