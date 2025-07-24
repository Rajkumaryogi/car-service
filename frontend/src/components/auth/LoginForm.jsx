import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

export default function LoginForm() {
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(formData.email, formData.password)
    } catch (err) {
      setError('Invalid credentials')
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <div className="mb-4">
        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="input-field"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2">Password</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          className="input-field"
          required
        />
      </div>
      <button type="submit" className="btn-primary w-full">
        Login
      </button>
    </form>
  )
}