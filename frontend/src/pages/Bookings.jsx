import { useState, useEffect } from 'react'
import * as bookingService from '../services/booking'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import {
  FaCalendarAlt, FaCar, FaTools, FaClock,
  FaMoneyBill, FaInfoCircle, FaFileInvoiceDollar,
  FaCheck, FaTimes, FaSpinner, FaPlus
} from 'react-icons/fa'


export default function Bookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedBooking, setExpandedBooking] = useState(null)

  // console.log(services, "hello")

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await bookingService.getUserBookings()
        setBookings(data)
      } catch (err) {
        console.error('Failed to fetch bookings:', err)
        toast.error('Failed to load bookings. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  const toggleBookingDetails = (bookingId) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId)
  }

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'PPPpp')
  }

  const getStatusBadge = (status) => {
    const statusClasses = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Approved: 'bg-green-100 text-green-800',
      Completed: 'bg-blue-100 text-blue-800',
      Cancelled: 'bg-red-100 text-red-800',
      Rejected: 'bg-gray-100 text-gray-800'
    }
    return statusClasses[status] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4" />
        <p>Loading your bookings...</p>
      </div>
    )
  }

  // console.log(bookings);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-2">
        <FaCalendarAlt className="text-blue-600" />
        Your Bookings
      </h1>
      
      {bookings.length === 0 ? (
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md text-center max-w-2xl mx-auto">
          <FaCalendarAlt className="mx-auto text-4xl text-gray-400 mb-4" />
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">No Bookings Found</h2>
          <p className="text-gray-600 mb-6">You haven't made any bookings yet.</p>
          <a 
            href="/services" 
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            <FaPlus />
            Book a Service Now
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => (
            <div key={booking._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div 
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleBookingDetails(booking._id)}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <FaTools />
                      <h3 className="font-semibold text-lg text-gray-800">
                        {booking.serviceType?.name || 'Car Service'}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mt-1">
                      <FaCar />
                      <span>{booking.car?.model || 'N/A'} {booking.car?.licensePlate && `(${booking.car.licensePlate})`}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusBadge(booking.status)}`}>
                      {booking.status === 'Approved' && <FaCheck />}
                      {booking.status === 'Cancelled' && <FaTimes />}
                      {booking.status}
                    </span>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <FaClock />
                      <span>{formatDate(booking.scheduledDate)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {expandedBooking === booking._id && (
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <FaInfoCircle />
                        Service Details
                      </h4>
                      <ul className="space-y-2">
                      <li className="flex justify-between">
                          <span className="text-gray-600 flex items-center gap-2">
                            <FaClock className="text-sm" />
                            Service Id
                          </span>
                          <span>{booking.serviceType || 'N/A'}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600 flex items-center gap-2">
                            <FaClock className="text-sm" />
                            Duration:
                          </span>
                          <span>{booking.serviceType.duration || 'N/A'} hours</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600 flex items-center gap-2">
                            <FaCalendarAlt className="text-sm" />
                            Scheduled:
                          </span>
                          <span>{formatDate(booking.scheduledDate)}</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <FaCar />
                        Vehicle Details
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-gray-600">Model:</span>
                          <span>{booking.car?.model || 'N/A'}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Year:</span>
                          <span>{booking.car?.year || 'N/A'}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <FaFileInvoiceDollar />
                      Payment Information
                    </h4>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <div className="flex justify-between mb-1">
                        <span className="flex items-center gap-2">
                          <FaMoneyBill className="text-sm" />
                          Service Cost:
                        </span>
                        <span>₹{booking.invoice?.serviceCost || '0'}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg mt-2 pt-2 border-t">
                        <span>Total Amount:</span>
                        <span>₹{booking.invoice?.totalCost || '0'}</span>
                      </div>
                    </div>
                  </div>

                  {booking.status === 'Pending' && (
                    <div className="mt-4 flex justify-end">
                      <button className="px-4 py-2 border border-red-300 rounded-md text-red-700 hover:bg-red-50 transition-colors flex items-center gap-2">
                        <FaTimes />
                        Cancel Booking
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}