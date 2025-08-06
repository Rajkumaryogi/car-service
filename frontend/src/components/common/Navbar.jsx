import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import logo from '../../assets/logo.jpeg'
import { useState, useEffect } from 'react'
import { FaCar, FaTools, FaUserCog, FaCalendarAlt, FaShoppingCart, FaHome, FaInfoCircle, FaPhoneAlt, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import UpperNavbar from './UpperNavbar'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const commonLinks = [
    { path: "/", name: "Home", icon: <FaHome className="mr-2" /> },
    { path: "/about", name: "About", icon: <FaInfoCircle className="mr-2" /> },
    { path: "/contact", name: "Contact", icon: <FaPhoneAlt className="mr-2" /> },
    { path: "/services", name: "Services", icon: <FaTools className="mr-2" /> },
  ]

  const userLinks = user ? (
    user.isAdmin ? [
      { path: "/admin", name: "Dashboard", icon: <FaUserCog className="mr-2" /> },
      { path: "/admin/users", name: "Users", icon: <FaUserCog className="mr-2" /> },
      { path: "/admin/bookings", name: "Bookings", icon: <FaCalendarAlt className="mr-2" /> },
      { path: "/admin/services", name: "Services", icon: <FaTools className="mr-2" /> }
    ] : [
      { path: "/dashboard", name: "Dashboard", icon: <FaUserCog className="mr-2" /> },
      { path: "/bookings", name: "My Bookings", icon: <FaCalendarAlt className="mr-2" /> },
      { path: "/cart", name: "Cart", icon: <FaShoppingCart className="mr-2" /> }
    ]
  ) : []

  return (
    <nav className={`bg-white mt-0 pt-0 shadow-md sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-1' : 'py-2'}`}>
    <UpperNavbar />
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          {/* Logo and Brand */}
          <NavLink to="/" className="flex items-center space-x-2 md:space-x-3 max-w-full overflow-hidden">
            <img 
              src={logo} 
              alt="Bajdoliya Workshop Logo" 
              className="h-12 sm:h-16 md:h-24 w-auto object-contain"
            />
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-red-600">
              BAJDOLIYA <span className="text-gray-800">WORKSHOP</span>
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {[...commonLinks, ...userLinks].map((link) => (
              <NavLink 
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                  ${isActive ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-700 hover:text-red-500'}`
                }
              >
                {link.icon}
                {link.name}
              </NavLink>
            ))}

            {user ? (
              <button 
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-500 rounded-md transition-colors"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            ) : (
              <NavLink 
                to="/login" 
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                  ${isActive ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-700 hover:text-red-500'}`
                }
              >
                <FaSignInAlt className="mr-2" />
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-700 focus:outline-none p-2 rounded-md hover:bg-red-50 transition-colors"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white pt-2 pb-4 space-y-1 shadow-lg rounded-b-lg">
            {[...commonLinks, ...userLinks].map((link) => (
              <NavLink 
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 text-sm font-medium rounded-md mx-2 transition-colors
                  ${isActive ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-red-50 hover:text-red-500'}`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.icon}
                {link.name}
              </NavLink>
            ))}

            {user ? (
              <button 
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-500 rounded-md mx-2 transition-colors"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            ) : (
              <NavLink 
                to="/login" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 text-sm font-medium rounded-md mx-2 transition-colors
                  ${isActive ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-red-50 hover:text-red-500'}`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaSignInAlt className="mr-2" />
                Login
              </NavLink>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}