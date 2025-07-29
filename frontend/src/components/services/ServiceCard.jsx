import { useAuth } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)

  const durationText = service.duration >= 60 
    ? `${Math.floor(service.duration / 60)}h ${service.duration % 60}m`
    : `${service.duration}m`

  const handleLoginRedirect = () => {
    navigate('/login') 
  }

  return (
    <div 
      className={`bg-white p-4 rounded-lg shadow-md transition-all duration-300 border border-gray-200 ${
        isHovered ? 'transform -translate-y-1 shadow-lg' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start mb-4">
        <div className="bg-red-50 p-3 rounded-full mr-4">
          <img 
            src={`https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/category_icons_new/xxxhdpi/${service.iconId || 1}.png`} 
            alt={service.name}
            className="w-10 h-10 object-contain"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">{service.name}</h3>
          <p className="text-gray-600 text-sm mt-1">{service.description}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <FaRupeeSign className="text-red-500 mr-1" />
            <span className="text-lg font-bold text-gray-800">{service.price.toFixed(2)}</span>
            <span className="ml-3 text-gray-500 text-sm flex items-center">
              <FaClock className="mr-1 text-red-400" />
              {durationText}
            </span>
          </div>
        </div>
        
        {user ? (
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => onBookNow(service._id)}
              disabled={!selectedCar || !date || isBooking || isAddingToCart}
              className={`flex items-center justify-center py-2 px-4 rounded-md text-white font-medium ${
                (!selectedCar || !date || isBooking || isAddingToCart) 
                  ? 'bg-red-300 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700'
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
              className={`flex items-center justify-center py-2 px-4 rounded-md text-white font-medium ${
                isBooking || isAddingToCart 
                  ? 'bg-gray-400 cursor-not-allowed' 
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
            onClick={handleLoginRedirect} 
            className="w-full py-2 px-4 rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors flex items-center justify-center font-medium"
          >
            <FaSignInAlt className="mr-2" />
            Login to Book
          </button>
        )}
      </div>
    </div>
  )
}