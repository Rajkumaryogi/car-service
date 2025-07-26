import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useState } from 'react'
import { 
  FiHome, 
  FiUsers, 
  FiCalendar, 
  FiSettings, 
  FiLogOut,
  FiMenu,
  FiX
} from 'react-icons/fi'

export default function AdminNavbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        {/* Desktop Navbar */}
        <div className="flex justify-between items-center">
          {/* Left side - Brand and Links */}
          <div className="flex items-center space-x-6">
            <Link to="/admin" className="text-xl font-bold flex items-center">
              <span className="hidden sm:inline">Admin Panel</span>
              <span className="sm:hidden">ADMIN</span>
            </Link>
            
            <div className="hidden md:flex space-x-1">
              <NavLink to="/admin" icon={<FiHome className="mr-2" />} text="Dashboard" />
              <NavLink to="/admin/users" icon={<FiUsers className="mr-2" />} text="Users" />
              <NavLink to="/admin/bookings" icon={<FiCalendar className="mr-2" />} text="Bookings" />
              <NavLink to="/admin/services" icon={<FiSettings className="mr-2" />} text="Services" />
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
              className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded transition-colors flex items-center text-sm md:text-base"
            >
              <FiLogOut className="md:mr-2" />
              <span>Logout</span>
            </button>

            {/* Mobile menu button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden ml-2 text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-700 px-4 py-3 mt-2 rounded-lg">
            <div className="flex flex-col space-y-3">
              <MobileNavLink 
                to="/admin" 
                icon={<FiHome />} 
                text="Dashboard"
                onClick={toggleMobileMenu}
              />
              <MobileNavLink 
                to="/admin/users" 
                icon={<FiUsers />} 
                text="Users"
                onClick={toggleMobileMenu}
              />
              <MobileNavLink 
                to="/admin/bookings" 
                icon={<FiCalendar />} 
                text="Bookings"
                onClick={toggleMobileMenu}
              />
              <MobileNavLink 
                to="/admin/services" 
                icon={<FiSettings />} 
                text="Services"
                onClick={toggleMobileMenu}
              />
              
              {user && (
                <div className="pt-2 mt-2 border-t border-gray-600 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">
                      {user.name || 'Admin User'}
                    </span>
                    <span className="bg-blue-500 text-xs px-2 py-1 rounded-full">
                      ADMIN
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// Reusable NavLink component for desktop
function NavLink({ to, icon, text }) {
  return (
    <Link 
      to={to} 
      className="hover:bg-gray-700 px-3 py-2 rounded transition-colors flex items-center text-sm lg:text-base"
    >
      {icon}
      {text}
    </Link>
  )
}

// Reusable MobileNavLink component
function MobileNavLink({ to, icon, text, onClick }) {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className="hover:bg-gray-600 px-3 py-2 rounded transition-colors flex items-center space-x-2"
    >
      <span className="text-lg">{icon}</span>
      <span>{text}</span>
    </Link>
  )
}