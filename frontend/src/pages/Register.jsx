import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import RegisterForm from '../components/auth/RegisterForm'

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [error, setError] = useState('')

  const handleRegister = async (userData) => {
    try {
      await register(userData)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Registration failed')
    }
  }

  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      <RegisterForm onSubmit={handleRegister} />
      <p className="mt-4 text-center">
        Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
      </p>
    </div>
  )
}