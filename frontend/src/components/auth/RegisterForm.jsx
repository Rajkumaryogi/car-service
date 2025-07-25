import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUser, FaEnvelope, FaLock, FaPhone, FaUserPlus } from 'react-icons/fa'

export default function RegisterForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await onSubmit(formData)
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}
      
      <div className="space-y-1">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaUser className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="John Doe"
            required
          />
        </div>
      </div>
      
      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaEnvelope className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="you@example.com"
            required
          />
        </div>
      </div>
      
      <div className="space-y-1">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaLock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="••••••••"
            required
            minLength="6"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
      </div>
      
      <div className="space-y-1">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaPhone className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>
      
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Registering...
            </>
          ) : (
            <>
              <FaUserPlus className="mr-2" />
              Register
            </>
          )}
        </button>
      </div>
    </form>
  )
}