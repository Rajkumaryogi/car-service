import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import * as bookingService from '../services/booking'
import * as cartService from '../services/cart'
import { toast } from 'react-toastify'
import ServiceCard from '../components/services/ServiceCard'
import { FaCar, FaCalendarAlt, FaTools, FaSpinner, FaShoppingCart } from 'react-icons/fa'

export default function Services() {
  const { user } = useAuth()
  const [services, setServices] = useState([])
  const [selectedCar, setSelectedCar] = useState('')
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(true)
  const [isBooking, setIsBooking] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [activeService, setActiveService] = useState(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await bookingService.getServices()
        setServices(data)
      } catch (err) {
        console.error('Error fetching services:', err)
        toast.error('Failed to load services. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  const handleBookNow = async (serviceId) => {
    if (!user) {
      toast.error('Please login to book services')
      return
    }
    if (!selectedCar || !date) {
      toast.error('Please select car and date')
      return
    }
    
    try {
      setIsBooking(true)
      setActiveService(serviceId)
      const service = services.find(s => s._id === serviceId)
      
      const booking = await bookingService.bookService({
        serviceType: serviceId,
        car: {
          model: user.cars.find(c => c._id === selectedCar).model,
          licensePlate: user.cars.find(c => c._id === selectedCar).licensePlate
        },
        scheduledDate: date
      })
      
      toast.success(`${service.name} booked successfully!`)
      setSelectedCar('')
      setDate('')
    } catch (err) {
      if (err?.status === 201) {
        toast.success('Service booked successfully!')
      } else {
        const errorMessage = err?.message || 'Failed to book service'
        toast.error(errorMessage)
        console.error('Booking error:', err)
      }
    } finally {
      setIsBooking(false)
      setActiveService(null)
    }
  }

  const handleAddToCart = async (serviceId) => {
    if (!user) {
      toast.error('Please login to add to cart')
      return
    }
    
    try {
      setIsAddingToCart(true)
      setActiveService(serviceId)
      const service = services.find(s => s._id === serviceId)
      
      await cartService.addToCart(serviceId)
      toast.success(`${service.name} added to cart!`)
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to add to cart'
      toast.error(errorMessage)
      console.error('Add to cart error:', err)
    } finally {
      setIsAddingToCart(false)
      setActiveService(null)
    }
  }

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto p-4 min-h-screen flex items-center justify-center"
      >
        <div className="flex flex-col items-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4" />
          <p className="text-lg text-gray-600">Loading services...</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Header Section */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center justify-center">
          <FaTools className="mr-3 text-blue-600" />
          Our Services
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Comprehensive automotive solutions for all your needs
        </p>
      </motion.div>

      {/* Booking Form */}
      {user && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaCalendarAlt className="mr-2 text-blue-600" />
            Book a Service
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2 flex items-center">
                <FaCar className="mr-2 text-blue-500" />
                Select Car
              </label>
              <select 
                value={selectedCar}
                onChange={(e) => setSelectedCar(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isBooking || isAddingToCart}
              >
                <option value="">Select Car</option>
                {user.cars?.map(car => (
                  <option key={car._id} value={car._id}>
                    {car.model} {car.licensePlate && `(${car.licensePlate})`}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2 flex items-center">
                <FaCalendarAlt className="mr-2 text-blue-500" />
                Select Date & Time
              </label>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min={new Date().toISOString().slice(0, 16)}
                disabled={isBooking || isAddingToCart}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Services Grid */}
      {services.length === 0 ? (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-8 rounded-xl shadow-md text-center border border-gray-100"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">No Services Available</h2>
          <p className="text-gray-600">Please check back later for our service offerings.</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={service._id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              <ServiceCard
                service={service}
                selectedCar={selectedCar}
                date={date}
                onBookNow={handleBookNow}
                onAddToCart={handleAddToCart}
                isBooking={isBooking}
                isAddingToCart={isAddingToCart}
                activeService={activeService}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Empty State for Mobile */}
      {services.length === 0 && (
        <div className="md:hidden bg-blue-50 p-4 rounded-lg mt-6 text-center">
          <FaShoppingCart className="mx-auto text-3xl text-blue-600 mb-3" />
          <h3 className="font-medium text-gray-800">No services available</h3>
          <p className="text-sm text-gray-600 mt-1">Check back later for our latest offerings</p>
        </div>
      )}
    </motion.div>
  )
}