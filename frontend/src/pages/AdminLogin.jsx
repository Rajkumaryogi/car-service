import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import * as adminService from '../services/admin'
import { FaUserShield, FaEnvelope, FaLock, FaSignInAlt, FaSpinner } from 'react-icons/fa'

export default function AdminLogin() {
  const navigate = useNavigate()
  const { user, loading, adminLogin } = useAuth()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (user?.isAdmin && !loading) {
      navigate('/admin')
    }
  }, [user, loading, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const { email, password } = e.target.elements
    
    try {
      await adminLogin(email, password)
      navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.error || 'Admin login failed')
      console.error('Login error:', err.response?.data)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading || user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-red-600 mx-auto mb-4" />
          <p className="text-lg text-gray-800">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="mx-auto bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <FaUserShield className="text-red-600 text-3xl" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Admin Portal</h1>
          <p className="text-gray-600 mt-2">Sign in to access the dashboard</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <FaEnvelope className="text-gray-400" />
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="example: yogi@admin.com"
                // defaultValue="rajyogi1811@gmail.com"
              />
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <FaLock className="text-gray-400" />
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="••••••••"
              />
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white font-medium ${
              isSubmitting ? 'bg-red-500' : 'bg-red-600 hover:bg-red-700'
            } transition-colors shadow-md`}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin" />
                Authenticating...
              </>
            ) : (
              <>
                <FaSignInAlt />
                Login as Admin
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}