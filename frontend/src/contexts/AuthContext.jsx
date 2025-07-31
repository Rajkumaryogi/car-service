import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import * as authService from '../services/auth'
import * as adminService from '../services/admin'
import { toast } from 'react-toastify'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)
  const navigate = useNavigate()

  const checkAuth = useCallback(async () => {
    try {
      setLoading(true)
      
      // Check for admin token first
      const adminToken = localStorage.getItem('adminToken')
      if (adminToken) {
        const adminData = await adminService.getCurrentAdmin()
        if (adminData) {
          setUser({ ...adminData, isAdmin: true })
          setInitialLoadComplete(true)
          return
        }
      }
      
      // Check regular user auth
      const userData = await authService.getCurrentUser().catch(() => null)
      if (userData) {
        setUser(userData)
        setInitialLoadComplete(true)
        return
      }
      
      // If neither exists
      setUser(null)
    } catch (err) {
      console.error('Auth check error:', err)
      setUser(null)
    } finally {
      setLoading(false)
      setInitialLoadComplete(true)
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const login = async (email, password) => {
    try {
      setLoading(true)
      const userData = await authService.login(email, password)
      setUser({ ...userData, isUser: true })
      await checkAuth() // Refresh auth state after login
      return userData
    } catch (err) {
      console.error('Login error:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const adminLogin = async (email, password) => {
    try {
      setLoading(true)
      const adminData = await adminService.adminLogin(email, password)
      setUser({ ...adminData, isAdmin: true })
      await checkAuth() // Refresh auth state after login
      navigate('/admin')
    } catch (err) {
      console.error('Admin login failed:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setLoading(true)
      const newUser = await authService.register(userData)
      setUser(newUser)
      await checkAuth() // Refresh auth state after registration
      return newUser
    } catch (err) {
      console.error('Registration error:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      if (user?.isAdmin) {
        await adminService.logout()
      } else {
        await authService.logout()
      }
    } finally {
      setUser(null)
      navigate('/')
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading,
      initialLoadComplete,
      setUser,
      login,
      adminLogin,
      register, 
      logout,
      checkAuth // Expose checkAuth for manual refreshes
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)