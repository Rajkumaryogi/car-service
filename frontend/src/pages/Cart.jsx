import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import * as cartService from '../services/cart'
import * as bookingService from '../services/booking'
import { useNavigate } from 'react-router-dom'
import {
  FaShoppingCart, FaTrash, FaCar, FaCalendarAlt,
  FaMoneyBillWave, FaPlus, FaSpinner, FaArrowRight, FaTools
} from 'react-icons/fa'

export default function Cart() {
  const { user } = useAuth()
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedCar, setSelectedCar] = useState('')
  const [date, setDate] = useState('')
  const [isBooking, setIsBooking] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await cartService.getCart()
        setCart(cartData)
      } catch (err) {
        console.error('Failed to fetch cart:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCart()
  }, [])

  const removeFromCart = async (serviceId) => {
    try {
      await cartService.removeFromCart(serviceId)
      setCart(prev => ({
        ...prev,
        items: prev.items.filter(item => item.service._id !== serviceId)
      }))
    } catch (err) {
      console.error('Failed to remove item:', err)
    }
  }

  const bookAllServices = async () => {
    if (!selectedCar || !date) {
      alert('Please select a car and date')
      return
    }

    setIsBooking(true)
    try {
      const car = user.cars.find(c => c._id === selectedCar)
      for (const item of cart.items) {
        await bookingService.bookService({
          serviceType: item.service._id,
          car: {
            model: car.model,
            licensePlate: car.licensePlate
          },
          scheduledDate: date
        })
      }
      await cartService.clearCart()
      alert('All services booked successfully!')
      navigate('/bookings')
    } catch (err) {
      console.error('Failed to book services:', err)
      alert('Failed to book services. Please try again.')
    } finally {
      setIsBooking(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px]">
        <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4" />
        <p>Loading your cart...</p>
      </div>
    )
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="max-w-md mx-auto">
          <FaShoppingCart className="text-5xl text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">You haven't added any services yet.</p>
          <a 
            href="/services" 
            className="inline-flex items-center justify-center gap-2 btn-primary px-6 py-3"
          >
            <FaPlus />
            Browse Services
          </a>
        </div>
      </div>
    )
  }

  const total = cart.items.reduce(
    (sum, item) => sum + (item.service.price * item.quantity), 
    0
  )

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-2">
        <FaShoppingCart className="text-blue-600" />
        Your Cart
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
            {cart.items.map(item => (
              <div key={item.service._id} className="p-4">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-lg flex items-start gap-2">
                      <FaTools className="text-blue-500 mt-1 flex-shrink-0" />
                      {item.service.name}
                    </h3>
                    <p className="text-gray-600 mt-1">{item.service.description}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="font-bold text-lg">
                      ₹{(item.service.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-gray-500 text-sm">
                      ₹{item.service.price} × {item.quantity}
                    </p>
                    <button 
                      onClick={() => removeFromCart(item.service._id)}
                      className="flex items-center gap-1 text-red-500 hover:text-red-700 mt-2 text-sm"
                    >
                      <FaTrash className="text-sm" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Summary */}
        <div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <FaCalendarAlt className="text-blue-500" />
              Booking Details
            </h3>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 flex items-center gap-2">
                <FaCar />
                Select Car
              </label>
              <select
                value={selectedCar}
                onChange={(e) => setSelectedCar(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Car</option>
                {user.cars.map(car => (
                  <option key={car._id} value={car._id}>
                    {car.model} ({car.licensePlate})
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2 flex items-center gap-2">
                <FaCalendarAlt />
                Select Date & Time
              </label>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between mb-2">
                <span className="flex items-center gap-2 text-gray-600">
                  <FaMoneyBillWave />
                  Subtotal:
                </span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>Total:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              <button
                onClick={bookAllServices}
                disabled={!selectedCar || !date || isBooking}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md text-white ${
                  (!selectedCar || !date) ? 'bg-blue-400 cursor-not-allowed' :
                  isBooking ? 'bg-blue-500' : 'bg-blue-600 hover:bg-blue-700'
                } transition-colors`}
              >
                {isBooking ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FaArrowRight />
                    Book All Services
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}