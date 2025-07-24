import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import * as bookingService from '../services/booking'

export default function Bookings() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await bookingService.getUserBookings()
        setBookings(data)
      } catch (err) {
        console.error('Failed to fetch bookings:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  if (loading) return <div>Loading bookings...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center">
          <p className="text-lg mb-4">You haven't made any bookings yet.</p>
          <a href="/services" className="btn-primary">
            Book a Service Now
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => (
            <div key={booking._id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{booking.serviceType.name}</h3>
                  <p className="text-gray-600">
                    {booking.car.model} ({booking.car.licensePlate})
                  </p>
                  <p className="text-gray-600">
                    Scheduled: {new Date(booking.scheduledDate).toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    booking.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
              {booking.notes && (
                <div className="mt-2 p-2 bg-gray-50 rounded">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Notes:</span> {booking.notes}
                  </p>
                </div>
              )}
              <div className="mt-3 pt-3 border-t">
                <p className="font-medium">
                  Total: ${booking.invoice.totalCost} ({booking.invoice.paymentStatus})
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}