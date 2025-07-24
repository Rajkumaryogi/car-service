import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import * as bookingService from '../services/booking'
import * as cartService from '../services/cart'

export default function Services() {
  const { user } = useAuth()
  const [services, setServices] = useState([])
  const [selectedCar, setSelectedCar] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const fetchServices = async () => {
      const data = await bookingService.getServices()
      setServices(data)
    }
    fetchServices()
  }, [])

  const handleBookNow = async (serviceId) => {
    if (!user) return alert('Please login to book services')
    if (!selectedCar || !date) return alert('Please select car and date')
    
    await bookingService.bookService({
      serviceType: serviceId,
      car: {
        model: user.cars.find(c => c._id === selectedCar).model,
        licensePlate: user.cars.find(c => c._id === selectedCar).licensePlate
      },
      scheduledDate: date
    })
    alert('Service booked successfully!')
  }

  const handleAddToCart = async (serviceId) => {
    if (!user) return alert('Please login to add to cart')
    await cartService.addToCart(serviceId)
    alert('Service added to cart')
  }

  return (
    <div>
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
                className="input-field"
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
                className="input-field"
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <div key={service._id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">${service.price}</span>
              {user ? (
                <div className="space-x-2">
                  <button 
                    onClick={() => handleBookNow(service._id)}
                    className="btn-primary"
                    disabled={!selectedCar || !date}
                  >
                    Book Now
                  </button>
                  <button 
                    onClick={() => handleAddToCart(service._id)}
                    className="btn-primary bg-gray-600 hover:bg-gray-700"
                  >
                    Add to Cart
                  </button>
                </div>
              ) : (
                <button className="btn-primary" disabled>
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