import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import logo from '../../assets/logo.jpeg'
import { useState, useEffect } from 'react'

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
    { path: "/", name: "Home" },
    { path: "/about", name: "About" },
    { path: "/contact", name: "Contact" },
    { path: "/services", name: "Services" },
  ]

  const userLinks = user ? (
    user.isAdmin ? (
      [{ path: "/admin", name: "Admin-Dashboard" },
        { path: "/admin/users", name: "Users" },
        { path: "/admin/bookings", name: "Bookings" },
        { path: "/admin/services", name: "Services" }
      ]
    ) : (
      [
        { path: "/services", name: "Book Service" },
        { path: "/dashboard", name: "Dashboard" },
        { path: "/bookings", name: "My Bookings" },
        { path: "/cart", name: "Cart" }
      ]
    )
  ) : []

  return (
    <nav className={`bg-white shadow-md sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2 md:space-x-4 max-w-full overflow-hidden">
            <img 
              src={logo} 
              alt="Logo" 
              className="navbar-logo h-12 sm:h-14 md:h-16 lg:h-20 w-auto object-contain"
            />
            <span className="navbar-brand text-base sm:text-lg md:text-xl font-semibold text-gray-800 truncate">
              BAJDOLIYA WORKSHOP
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-wrap items-center gap-2 lg:gap-4">
            {[...commonLinks, ...userLinks].map((link) => (
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
            {[...commonLinks, ...userLinks].map((link) => (
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
