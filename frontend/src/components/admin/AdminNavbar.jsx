import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function AdminNavbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/admin-login')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left side - Brand and Links */}
        <div className="flex items-center space-x-6">
          <Link to="/admin" className="text-xl font-bold">
            Admin Panel
          </Link>
          
          <div className="hidden md:flex space-x-4">
            <Link 
              to="/admin" 
              className="hover:bg-gray-700 px-3 py-2 rounded transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              to="/admin/users" 
              className="hover:bg-gray-700 px-3 py-2 rounded transition-colors"
            >
              Users
            </Link>
            <Link 
              to="/admin/bookings" 
              className="hover:bg-gray-700 px-3 py-2 rounded transition-colors"
            >
              Bookings
            </Link>
            <Link 
              to="/admin/services" 
              className="hover:bg-gray-700 px-3 py-2 rounded transition-colors"
            >
              Services
            </Link>
          </div>
        </div>

        {/* Right side - User Info and Logout */}
        <div className="flex items-center space-x-4">
          {user && (
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-sm font-medium">
                {user.name || 'Admin User'}
              </span>
              <span className="bg-blue-500 text-xs px-2 py-1 rounded-full">
                ADMIN
              </span>
            </div>
          )}
          
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden bg-gray-700 px-4 py-2">
        <div className="flex flex-col space-y-2">
          <Link 
            to="/admin" 
            className="hover:bg-gray-600 px-3 py-2 rounded transition-colors"
          >
            Dashboard
          </Link>
          <Link 
            to="/admin/users" 
            className="hover:bg-gray-600 px-3 py-2 rounded transition-colors"
          >
            Users
          </Link>
          <Link 
            to="/admin/bookings" 
            className="hover:bg-gray-600 px-3 py-2 rounded transition-colors"
          >
            Bookings
          </Link>
          <Link 
            to="/admin/services" 
            className="hover:bg-gray-600 px-3 py-2 rounded transition-colors"
          >
            Services
          </Link>
        </div>
      </div>
    </nav>
  )
}