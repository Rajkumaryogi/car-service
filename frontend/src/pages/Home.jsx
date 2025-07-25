import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Services from "./Services"
import { FaTools, FaDollarSign, FaCalendarAlt } from 'react-icons/fa'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="text-center px-4 py-8 md:py-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
        Welcome to Car Service Center
      </h1>
      <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
        Professional car maintenance and repair services with certified mechanics and competitive pricing.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 md:mb-0">
        {user ? (
          <Link 
            to="/dashboard" 
            className="btn-primary px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base"
          >
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link 
              to="/login" 
              className="btn-primary px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="btn-primary bg-gray-600 hover:bg-gray-700 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base"
            >
              Register
            </Link>
          </>
        )}
        <Link 
          to="/services" 
          className="btn-primary bg-green-600 hover:bg-green-700 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base"
        >
          View Services
        </Link>
      </div>

      <div className="mt-10 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center">
            <FaTools className="text-3xl sm:text-4xl text-blue-600 mb-3" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Quality Service</h3>
            <p className="text-sm sm:text-base">
              Our certified mechanics provide top-notch service using the latest tools and technology.
            </p>
          </div>
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center">
            <FaDollarSign className="text-3xl sm:text-4xl text-green-600 mb-3" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Transparent Pricing</h3>
            <p className="text-sm sm:text-base">
              No hidden fees. We provide upfront pricing for all our services.
            </p>
          </div>
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center">
            <FaCalendarAlt className="text-3xl sm:text-4xl text-purple-600 mb-3" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Convenient Booking</h3>
            <p className="text-sm sm:text-base">
              Book your service online and choose a time that works for you.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <Services />
      </div>

      {/* Testimonials Section (Optional) */}
      <div className="mt-12 md:mt-20 max-w-4xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="italic mb-2">"Great service! My car runs like new again."</p>
            <p className="font-medium">- John D.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="italic mb-2">"Honest pricing and fast turnaround. Highly recommend!"</p>
            <p className="font-medium">- Sarah M.</p>
          </div>
        </div>
      </div>
    </div>
  )
}