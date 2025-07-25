import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth} from '../contexts/AuthContext'
import {useSocket} from '../contexts/SocketContext'
import * as adminService from '../services/admin'
import AdminNavbar from '../components/admin/AdminNavbar'
import { toast } from 'react-toastify'

export default function Admin() {
  const [stats, setStats] = useState({
    bookings: 0,
    users: 0,
    revenue: 0,
    pendingBookings: 0
  })
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const socket = useSocket()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/admin-login')
      return
    }

    const fetchStats = async () => {
      try {
        const data = await adminService.getAdminStats()
        setStats(data)
      } catch (err) {
        toast.error('Failed to load dashboard stats')
        console.error('Error fetching stats:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()

    if (socket) {
      socket.on('adminNotification', () => {
        fetchStats() // Refresh stats when new booking comes in
      })
    }

    return () => {
      if (socket) socket.off('adminNotification')
    }
  }, [user, navigate, socket])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <AdminNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-500">Total Users</h3>
            <p className="text-3xl font-bold">{stats.users}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-500">Total Bookings</h3>
            <p className="text-3xl font-bold">{stats.bookings}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-500">Pending Bookings</h3>
            <p className="text-3xl font-bold">{stats.pendingBookings}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-500">Total Revenue</h3>
            <p className="text-3xl font-bold">₹{stats.revenue.toFixed(2)}</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div 
            onClick={() => navigate('/admin/users')}
            className="bg-white p-6 rounded-lg shadow cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-medium">Manage Users</h3>
            <p className="text-gray-500">View and manage all users</p>
          </div>
          <div 
            onClick={() => navigate('/admin/bookings')}
            className="bg-white p-6 rounded-lg shadow cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-medium">Manage Bookings</h3>
            <p className="text-gray-500">View and update bookings</p>
          </div>
          <div 
            onClick={() => navigate('/admin/services')}
            className="bg-white p-6 rounded-lg shadow cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-medium">Manage Services</h3>
            <p className="text-gray-500">Add or edit services</p>
          </div>
        </div>
      </div>
    </div>
  )
}