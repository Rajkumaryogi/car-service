import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Services from "./Services"

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-6">Welcome to Car Service Center</h1>
      <p className="text-xl mb-8 max-w-2xl mx-auto">
        Professional car maintenance and repair services with certified mechanics and competitive pricing.
      </p>
      
      <div className="flex justify-center space-x-4">
        {user ? (
          <Link to="/dashboard" className="btn-primary px-6 py-3">
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link to="/login" className="btn-primary px-6 py-3">
              Login
            </Link>
            <Link to="/register" className="btn-primary bg-gray-600 hover:bg-gray-700 px-6 py-3">
              Register
            </Link>
          </>
        )}
        <Link to="/services" className="btn-primary bg-green-600 hover:bg-green-700 px-6 py-3">
          View Services
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-3">Quality Service</h3>
          <p>Our certified mechanics provide top-notch service using the latest tools and technology.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-3">Transparent Pricing</h3>
          <p>No hidden fees. We provide upfront pricing for all our services.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-3">Convenient Booking</h3>
          <p>Book your service online and choose a time that works for you.</p>
        </div>
      </div>

      <div className="mt-16">
        <Services />
      </div>
    </div>
  )
}