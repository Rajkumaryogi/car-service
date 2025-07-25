import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useSocket } from '../../contexts/SocketContext'
import * as adminService from '../../services/admin'
import AdminNavbar from './AdminNavbar'
import { toast } from 'react-toastify'
import LoadingSpinner from '../common/LoadingSpinner'

export default function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // 'all', 'pending', 'approved', 'completed'
  const { user } = useAuth()
  const socket = useSocket()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true)
        const data = await adminService.getAllBookings()
        setBookings(data)
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error('Session expired. Please login again.')
          navigate('/admin-login')
        } else {
          toast.error('Failed to load bookings')
          console.error('Error fetching bookings:', err)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()

    if (socket) {
      socket.on('adminNotification', (newBooking) => {
        toast.info(`New booking received: ${newBooking.serviceType?.name}`)
        setBookings(prev => [newBooking, ...prev])
      })
    }

    return () => {
      if (socket) socket.off('adminNotification')
    }
  }, [navigate, socket])

  const updateBookingStatus = async (id, status) => {
    try {
      await adminService.updateBookingStatus(id, status)
      setBookings(prev => prev.map(b => 
        b._id === id ? {...b, status} : b
      ))
      toast.success(`Booking status updated to ${status}`)
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update booking status'
      toast.error(errorMessage)
      console.error('Error updating booking:', err)
    }
  }

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true
    return booking.status.toLowerCase() === filter.toLowerCase()
  })

  const statusOptions = [
    { value: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'Approved', color: 'bg-green-100 text-green-800' },
    { value: 'Completed', color: 'bg-blue-100 text-blue-800' },
    { value: 'Cancelled', color: 'bg-red-100 text-red-800' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <AdminNavbar />
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">Booking Management</h1>
          
          <div className="flex items-center gap-4">
            {user?.email === 'rajyogi1811@gmail.com' && (
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Super Admin
              </span>
            )}
            
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded px-3 py-1 text-sm"
            >
              <option value="all">All Bookings</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map(booking => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{booking.serviceType?.name}</div>
                        <div className="text-sm text-gray-500">₹{booking.serviceType?.price?.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{booking.user?.name}</div>
                        <div className="text-sm text-gray-500">{booking.user?.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{booking.car?.model}</div>
                        <div className="text-sm text-gray-500">{booking.car?.licensePlate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(booking.scheduledDate).toLocaleString('en-IN', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={booking.status}
                          onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
                          className={`border rounded px-2 py-1 text-sm ${
                            statusOptions.find(opt => opt.value === booking.status)?.color || ''
                          }`}
                        >
                          {statusOptions.map(option => (
                            <option 
                              key={option.value} 
                              value={option.value}
                              className={option.color}
                            >
                              {option.value}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}