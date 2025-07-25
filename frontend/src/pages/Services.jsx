import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import * as bookingService from '../services/booking'
import * as cartService from '../services/cart'
import { toast } from 'react-toastify'

export default function Services() {
  const { user } = useAuth()
  const [services, setServices] = useState([])
  const [selectedCar, setSelectedCar] = useState('')
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        const data = await bookingService.getServices()
        setServices(data)
      } catch (err) {
        toast.error('Failed to load services')
        console.error('Error fetching services:', err)
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
      const service = services.find(s => s._id === serviceId)
      toast.info(`Booking ${service.name}...`)
      
      await bookingService.bookService({
        serviceType: serviceId,
        car: {
          model: user.cars.find(c => c._id === selectedCar).model,
          licensePlate: user.cars.find(c => c._id === selectedCar).licensePlate
        },
        scheduledDate: date
      })
      
      toast.success('Service booked successfully!')
      setSelectedCar('')
      setDate('')
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to book service'
      toast.error(errorMessage)
      console.error('Booking error:', err)
    }
  }

  const handleAddToCart = async (serviceId) => {
    if (!user) {
      toast.error('Please login to add to cart')
      return
    }
    
    try {
      const service = services.find(s => s._id === serviceId)
      toast.info(`Adding ${service.name} to cart...`)
      
      await cartService.addToCart(serviceId)
      toast.success('Service added to cart!')
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to add to cart'
      toast.error(errorMessage)
      console.error('Add to cart error:', err)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-6">Our Services</h1>
        <p>Loading services...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Our Services</h1>
      
      {user && (
        <div className="mb-6 bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Book a Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1">Select Car</label>
              <select 
                value={selectedCar}
                onChange={(e) => setSelectedCar(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Car</option>
                {user.cars.map(car => (
                  <option key={car._id} value={car._id}>
                    {car.model} ({car.licensePlate})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1">Select Date</label>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <div key={service._id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">₹{service.price.toFixed(2)}</span>
              {user ? (
                <div className="space-x-2">
                  <button 
                    onClick={() => handleBookNow(service._id)}
                    className={`px-4 py-2 rounded text-white ${
                      !selectedCar || !date ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    } transition-colors`}
                    disabled={!selectedCar || !date}
                  >
                    Book Now
                  </button>
                  <button 
                    onClick={() => handleAddToCart(service._id)}
                    className="px-4 py-2 rounded text-white bg-gray-600 hover:bg-gray-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              ) : (
                <button 
                  className="px-4 py-2 rounded text-white bg-blue-400 cursor-not-allowed"
                  disabled
                >
                  Login to Book
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}