import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import logo from '../../assets/logo.png'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <Link to="/">
        <img src={logo} alt="Logo" className="w-20 h-20 border" />
      </Link>
        <Link to="/" className="text-xl font-bold">Car Service</Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/services" className="hover:underline">Services</Link>
          
          {user ? (
            <>
              {user.email === 'admin@carservice.com' ? (
                <Link to="/admin" className="hover:underline">Admin</Link>
              ) : (
                <>
                  <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                  <Link to="/bookings" className="hover:underline">Bookings</Link>
                  <Link to="/cart" className="hover:underline">Cart</Link>
                </>
              )}
              <button onClick={logout} className="hover:underline">Logout</button>
            </>
          ) : (
            <Link to="/login" className="hover:underline">Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}