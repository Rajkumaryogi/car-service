import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import * as cartService from '../services/cart'
import * as bookingService from '../services/booking'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
  const { user } = useAuth()
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedCar, setSelectedCar] = useState('')
  const [date, setDate] = useState('')
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
    await cartService.removeFromCart(serviceId)
    setCart(prev => ({
      ...prev,
      items: prev.items.filter(item => item.service._id !== serviceId)
    }))
  }

  const bookAllServices = async () => {
    if (!selectedCar || !date) {
      alert('Please select a car and date')
      return
    }

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
    }
  }

  if (loading) return <div>Loading cart...</div>
  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <a href="/services" className="btn-primary">
          Browse Services
        </a>
      </div>
    )
  }

  const total = cart.items.reduce(
    (sum, item) => sum + (item.service.price * item.quantity), 
    0
  )

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded shadow overflow-hidden">
            {cart.items.map(item => (
              <div key={item.service._id} className="p-4 border-b last:border-b-0">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{item.service.name}</h3>
                    <p className="text-gray-600">{item.service.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${item.service.price} x {item.quantity}</p>
                    <button 
                      onClick={() => removeFromCart(item.service._id)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold text-lg mb-4">Booking Details</h3>
            
            <div className="mb-4">
              <label className="block mb-2">Select Car</label>
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

            <div className="mb-4">
              <label className="block mb-2">Select Date</label>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input-field"
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                onClick={bookAllServices}
                disabled={!selectedCar || !date}
                className={`btn-primary w-full mt-4 ${
                  (!selectedCar || !date) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Book All Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}