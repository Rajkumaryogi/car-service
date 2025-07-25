import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import logo from '../../assets/logo.jpeg'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect for navbar
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

  // Common links for both desktop and mobile
  const commonLinks = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About" },
    { path: "/contact", name: "Contact" }
  ]

  // User specific links
  const userLinks = user ? (
    user.isAdmin ? (
      [{ path: "/admin", name: "Admin-Dashboard" },
        { path: "/admin/users", name: "Users" },
        { path: "/admin/bookings", name: "Bookings" },
        { path: "/admin/services", name: "Services" }
      ]
    ) : (
      [
        { path: "/dashboard", name: "Dashboard" },
        { path: "/bookings", name: "My Bookings" },
        { path: "/cart", name: "Cart" }
      ]
    )
  ) : []

  return (
    <nav className={`bg-white shadow-md sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link to="/" className="flex items-center space-x-2 focus:outline-none">
              <img 
                src={logo} 
                alt="Logo" 
                className="navbar-logo h-14 md:h-20 w-auto object-contain" 
              />
              <span className="navbar-brand text-sm md:text-xl font-semibold text-gray-800 whitespace-nowrap">
                BAJDOLIYA WORKSHOP
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {commonLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className="text-gray-700 hover:text-blue-600 px-2 py-1 rounded-md font-medium"
              >
                {link.name}
              </Link>
            ))}

            {userLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className="text-gray-700 hover:text-blue-600 px-2 py-1 rounded-md font-medium"
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <button 
                onClick={handleLogout}
                className="text-gray-700 hover:text-blue-600 px-2 py-1 rounded-md font-medium"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-blue-600 px-2 py-1 rounded-md font-medium"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-700 focus:outline-none p-2 rounded-md hover:bg-gray-100"
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
          <div className="mobile-menu md:hidden bg-white pt-2 pb-4 space-y-2 shadow-lg rounded-b-lg">
            {commonLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {userLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <button 
                onClick={handleLogout}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}