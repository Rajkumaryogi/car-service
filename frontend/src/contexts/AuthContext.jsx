import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as authService from '../services/auth'
import * as adminService from '../services/admin' // New admin service

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
  const checkAuth = async () => {
    try {
      setLoading(true);
      
      // Check for admin token first if it exists
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        const adminData = await adminService.getCurrentAdmin();
        if (adminData) {
          setUser({ ...adminData, isAdmin: true });
          return;
        }
      }
      
      // Fall back to regular user auth
      const userData = await authService.getCurrentUser().catch(() => null);
      if (userData) {
        setUser(userData);
        return;
      }
      
      // If neither exists, clear user
      setUser(null);
    } catch (err) {
      console.error('Auth check error:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  
  checkAuth();
}, []);

  const login = async (email, password) => {
  try {
    const userData = await authService.login(email, password)
    setUser({ ...userData, isUser: true });
    return userData;
  } catch (err) {
    console.error('Login error:', err);
    throw err; // ✅ Add this line!
  }
}

  const adminLogin = async (email, password) => {
  try {
    const adminData = await adminService.adminLogin(email, password);
    setUser({ ...adminData, isAdmin: true });
    navigate('/admin');
  } catch (err) {
    console.error('Admin login failed:', err);
    throw err; // Re-throw to be caught in the component
  }
};

  const register = async (userData) => {
    const newUser = await authService.register(userData)
    setUser(newUser)
    // navigate('/dashboard')
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
      setUser,
      login,
      adminLogin, // Add adminLogin to context
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)