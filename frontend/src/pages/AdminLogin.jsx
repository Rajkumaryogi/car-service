import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import * as adminService from '../services/admin'

export default function AdminLogin() {
  const navigate = useNavigate()
  const { user,loading, adminLogin } = useAuth()
  const [error, setError] = useState('')

  // Redirect if already logged in
  useEffect(() => {
    if (user?.isAdmin && !loading) {
      // navigate('/admin');
      // No need to navigate here - the adminLogin will handle it
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = e.target.elements;
    
    try {
      await adminLogin( email, password)
      navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.error || 'Admin login failed')
      console.error('Login error:', err.response?.data);
    }
  }

   if (loading || user?.isAdmin) {
    return <div className="text-center py-12">Loading...</div>;
  }



  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">Admin Email</label>
          <input
            type="email"
            id="email"
            required
            className="w-full p-2 border rounded"
            defaultValue="rajyogi1811@gmail.com"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block mb-1">Password</label>
          <input
            type="password"
            id="password"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Login as Admin
        </button>
      </form>
    </div>
  )
};