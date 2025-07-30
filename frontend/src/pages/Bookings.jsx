import { useState, useEffect } from 'react'
import * as bookingService from '../services/booking'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import {
  FaCalendarAlt, FaCar, FaTools, FaClock,
  FaMoneyBill, FaInfoCircle, FaFileInvoiceDollar,
  FaCheck, FaTimes, FaSpinner, FaPlus
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Bookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedBooking, setExpandedBooking] = useState(null)
  const [cancellingBookingId, setCancellingBookingId] = useState(null)

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

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return
    }

    try {
      setCancellingBookingId(bookingId)
      await bookingService.cancelService(bookingId)
      
      // Update the local state to reflect the cancellation
      setBookings(bookings.map(booking => 
        booking._id === bookingId 
          ? { ...booking, status: 'Cancelled' } 
          : booking
      ))
      
      toast.success('Booking cancelled successfully')
    } catch (err) {
      console.error('Failed to cancel booking:', err)
      toast.error(err.message || 'Failed to cancel booking. Please try again.')
    } finally {
      setCancellingBookingId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <div className="bg-red-100 p-4 rounded-full mb-4">
          <FaSpinner className="animate-spin text-2xl text-red-600" />
        </div>
        <p className="text-gray-600">Loading your bookings...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
              <div className="bg-red-100 p-3 rounded-full">
                <FaCalendarAlt className="text-red-600 text-xl" />
              </div>
              Your Bookings
            </h1>
            <p className="text-gray-600 mt-1">View and manage your service appointments</p>
          </div>
          <Link 
            to="/services" 
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            <FaPlus />
            Book New Service
          </Link>
        </div>
        
        {bookings.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center max-w-2xl mx-auto">
            <div className="bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FaCalendarAlt className="text-2xl text-red-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">No Bookings Found</h2>
            <p className="text-gray-600 mb-6">You haven't made any bookings yet.</p>
            <Link 
              to="/services" 
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors shadow-sm"
            >
              <FaPlus />
              Book a Service Now
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map(booking => (
              <div key={booking._id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:border-red-200 transition-all">
                <div 
                  className="p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleBookingDetails(booking._id)}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-red-100 p-2 rounded-full">
                          <FaTools className="text-red-600" />
                        </div>
                        <h3 className="font-semibold text-lg text-gray-800">
                          {booking.serviceType?.name || 'Car Service'}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 ml-9">
                        <FaCar className="text-red-400" />
                        <span>{booking.car?.model || 'N/A'} {booking.car?.licensePlate && `(${booking.car.licensePlate})`}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusBadge(booking.status)}`}>
                        {booking.status === 'Approved' && <FaCheck className="text-xs" />}
                        {booking.status === 'Cancelled' && <FaTimes className="text-xs" />}
                        {booking.status}
                      </span>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <FaClock className="text-red-400" />
                        <span>{formatDate(booking.scheduledDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {expandedBooking === booking._id && (
                  <div className="border-t border-gray-200 p-5 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                          <div className="bg-red-100 p-2 rounded-full">
                            <FaInfoCircle className="text-red-600 text-sm" />
                          </div>
                          Service Details
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex justify-between">
                            <span className="text-gray-600">Service ID:</span>
                            <span className="font-medium">{booking._id.slice(-8).toUpperCase()}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Duration:</span>
                            <span>{booking.serviceType?.duration || 'N/A'} hours</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Scheduled:</span>
                            <span>{formatDate(booking.scheduledDate)}</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                          <div className="bg-red-100 p-2 rounded-full">
                            <FaCar className="text-red-600 text-sm" />
                          </div>
                          Vehicle Details
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex justify-between">
                            <span className="text-gray-600">Model:</span>
                            <span>{booking.car?.model || 'N/A'}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Year:</span>
                            <span>{booking.car?.year || 'N/A'}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">License Plate:</span>
                            <span>{booking.car?.licensePlate || 'N/A'}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-5 pt-5 border-t border-gray-200">
                      <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <div className="bg-red-100 p-2 rounded-full">
                          <FaFileInvoiceDollar className="text-red-600 text-sm" />
                        </div>
                        Payment Information
                      </h4>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Service Cost:</span>
                          <span>₹{booking.invoice?.serviceCost || '0'}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Taxes:</span>
                          <span>₹{booking.invoice?.taxes || '0'}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg mt-3 pt-3 border-t">
                          <span>Total Amount:</span>
                          <span>₹{booking.invoice?.totalCost || '0'}</span>
                        </div>
                      </div>
                    </div>

                    {booking.status === 'Pending' && (
                      <div className="mt-5 flex justify-end">
                        <button 
                          onClick={() => handleCancelBooking(booking._id)}
                          disabled={cancellingBookingId === booking._id}
                          className="flex items-center gap-2 px-4 py-2.5 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                        >
                          {cancellingBookingId === booking._id ? (
                            <FaSpinner className="animate-spin" />
                          ) : (
                            <FaTimes />
                          )}
                          {cancellingBookingId === booking._id ? 'Cancelling...' : 'Cancel Booking'}
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
    </div>
  )
}