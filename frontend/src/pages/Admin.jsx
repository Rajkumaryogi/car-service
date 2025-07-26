import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useSocket } from '../contexts/SocketContext'
import * as adminService from '../services/admin'
import AdminNavbar from '../components/admin/AdminNavbar'
import { toast } from 'react-toastify'
import LoadingSpinner from '../components/common/LoadingSpinner'

export default function Admin() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    totalRevenue: 0,
    recentBookings: []
  })
  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(false)
  const { user } = useAuth()
  const socket = useSocket()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const [
          usersData,
          bookingsData,
          servicesData,
          recentBookings
        ] = await Promise.all([
          adminService.getAllUsers(),
          adminService.getAllBookings(),
          adminService.getAllServices(),
          adminService.getAllBookings({ limit: 5, sort: '-createdAt' })
        ])

        // Calculate stats
        const totalUsers = usersData.length
        const totalBookings = bookingsData.length
        const pendingBookings = bookingsData.filter(b => b.status === 'Pending').length
        const completedBookings = bookingsData.filter(b => b.status === 'Completed').length
        const totalRevenue = bookingsData
          .filter(b => b.status === 'Completed')
          .reduce((sum, booking) => sum + (booking.serviceType?.price || 0), 0)

        setStats({
          totalUsers,
          totalBookings,
          pendingBookings,
          completedBookings: completedBookings,
          totalRevenue,
          recentBookings: recentBookings.slice(0, 5)
        })
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error('Session expired. Please login again.')
          navigate('/admin-login')
        } else {
          toast.error('Failed to load dashboard stats')
          console.error('Error fetching stats:', err)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchStats()

    if (socket) {
      socket.on('adminNotification', (newBooking) => {
        toast.info(`New booking received: ${newBooking.serviceType?.name}`)
        setRefresh(prev => !prev) // Trigger refresh
      })
    }

    return () => {
      if (socket) socket.off('adminNotification')
    }
  }, [navigate, socket, refresh])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          {user?.email === 'rajyogi1811@gmail.com' && (
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Super Admin
            </span>
          )}
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-gray-500">Total Users</h3>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
            <p className="text-sm text-gray-500 mt-1">Registered accounts</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-gray-500">Total Bookings</h3>
            <p className="text-3xl font-bold">{stats.totalBookings}</p>
            <p className="text-sm text-gray-500 mt-1">All-time bookings</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-gray-500">Pending Bookings</h3>
            <p className="text-3xl font-bold">{stats.pendingBookings}</p>
            <p className="text-sm text-gray-500 mt-1">Require action</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-gray-500">Total Revenue</h3>
            <p className="text-3xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
            <p className="text-sm text-gray-500 mt-1">All-time earnings</p>
          </div>
        </div>

        {/* Quick Links and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-4">
              <div 
                onClick={() => navigate('/admin/users')}
                className="bg-white p-6 rounded-lg shadow cursor-pointer hover:bg-gray-50 transition-colors border-l-4 border-blue-500"
              >
                <h3 className="text-lg font-medium flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Manage Users
                </h3>
                <p className="text-gray-500 mt-1">View and manage all user accounts</p>
              </div>
              <div 
                onClick={() => navigate('/admin/bookings')}
                className="bg-white p-6 rounded-lg shadow cursor-pointer hover:bg-gray-50 transition-colors border-l-4 border-green-500"
              >
                <h3 className="text-lg font-medium flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Manage Bookings
                </h3>
                <p className="text-gray-500 mt-1">View and update booking statuses</p>
              </div>
              <div 
                onClick={() => navigate('/admin/services')}
                className="bg-white p-6 rounded-lg shadow cursor-pointer hover:bg-gray-50 transition-colors border-l-4 border-purple-500"
              >
                <h3 className="text-lg font-medium flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Manage Services
                </h3>
                <p className="text-gray-500 mt-1">Add or edit service offerings</p>
              </div>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {stats.recentBookings?.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {stats.recentBookings.map(booking => (
                        <tr 
                          key={booking._id} 
                          className="hover:bg-gray-50 cursor-pointer" 
                          onClick={() => navigate(`/admin/bookings/${booking._id}`)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {booking.serviceType?.name || 'N/A'}
                            </div>
                            <div className="text-sm text-gray-500">
                              ₹{booking.serviceType?.price?.toFixed(2) || '0.00'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {booking.user?.name || 'N/A'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.user?.email || 'N/A'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(booking.scheduledDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              booking.status === 'Approved' ? 'bg-green-100 text-green-800' :
                              booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No recent bookings found
                </div>
              )}
              <div className="px-6 py-3 bg-gray-50 text-right">
                <button 
                  onClick={() => navigate('/admin/bookings')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  View all bookings →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}