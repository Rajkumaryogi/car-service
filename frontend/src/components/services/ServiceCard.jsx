import { useAuth } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom' // <-- Add this import
import { FaClock, FaRupeeSign, FaShoppingCart, FaBookOpen, FaSignInAlt } from 'react-icons/fa'
import { GiCarWheel } from 'react-icons/gi'

export default function ServiceCard({ 
  service, 
  selectedCar, 
  date, 
  onBookNow, 
  onAddToCart,
  isBooking,
  isAddingToCart,
  activeService
}) {
  const { user } = useAuth()
  const navigate = useNavigate() // <-- Initialize useNavigate
  const [isHovered, setIsHovered] = useState(false)

  const durationText = service.duration >= 60 
    ? `${Math.floor(service.duration / 60)}h ${service.duration % 60}m`
    : `${service.duration}m`

  const handleLoginRedirect = () => {
    navigate('/login') // <-- Redirect to login page
  }

  return (
    <div 
      className="bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mb-4">
        <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center">
          <GiCarWheel className="mr-2 text-blue-600" />
          {service.name}
        </h3>
        <p className="text-gray-600 text-sm sm:text-base">{service.description}</p>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <FaRupeeSign className="text-gray-500 mr-1" />
            <span className="text-lg font-bold">{service.price.toFixed(2)}</span>
            <span className="ml-2 text-gray-500 text-sm flex items-center">
              <FaClock className="mr-1" />
              {durationText}
            </span>
          </div>
        </div>
        
        {user ? (
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={() => onBookNow(service._id)}
              disabled={!selectedCar || !date || isBooking || isAddingToCart}
              className={`flex items-center justify-center py-2 px-3 rounded text-white ${
                (!selectedCar || !date || isBooking || isAddingToCart) 
                  ? 'bg-blue-400' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } transition-colors`}
            >
              {isBooking && activeService === service._id ? (
                <>
                  <span className="animate-spin mr-2">🌀</span>
                  Booking...
                </>
              ) : (
                <>
                  <FaBookOpen className="mr-2" />
                  Book Now
                </>
              )}
            </button>
            <button
              onClick={() => onAddToCart(service._id)}
              disabled={isBooking || isAddingToCart}
              className={`flex items-center justify-center py-2 px-3 rounded text-white ${
                isBooking || isAddingToCart 
                  ? 'bg-gray-400' 
                  : 'bg-gray-600 hover:bg-gray-700'
              } transition-colors`}
            >
              {isAddingToCart && activeService === service._id ? (
                <>
                  <span className="animate-spin mr-2">🌀</span>
                  Adding...
                </>
              ) : (
                <>
                  <FaShoppingCart className="mr-2" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        ) : (
          <button 
            onClick={handleLoginRedirect} // <-- Add click handler
            className="w-full py-2 px-3 rounded text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <FaSignInAlt className="mr-2" />
            Login to Book
          </button>
        )}
      </div>
    </div>
  )
}