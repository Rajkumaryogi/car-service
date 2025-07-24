import { useEffect, useState } from 'react'
import { useSocket } from '../contexts/SocketContext'
import * as adminService from '../services/admin'

export default function Admin() {
  const [bookings, setBookings] = useState([])
  const [users, setUsers] = useState([])
  const socket = useSocket()

  useEffect(() => {
    const fetchData = async () => {
      const [bookingsData, usersData] = await Promise.all([
        adminService.getAllBookings(),
        adminService.getAllUsers()
      ])
      setBookings(bookingsData)
      setUsers(usersData)
    }
    fetchData()

    if (socket) {
      socket.on('adminNotification', (newBooking) => {
        setBookings(prev => [newBooking, ...prev])
      })
    }

    return () => {
      if (socket) socket.off('adminNotification')
    }
  }, [socket])

  const updateBookingStatus = async (id, status) => {
    await adminService.updateBookingStatus(id, status)
    setBookings(bookings.map(b => 
      b._id === id ? {...b, status} : b
    ))
  }

  return (
    <div >
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
          <div className="space-y-4">
            {bookings.map(booking => (
              <div key={booking._id} className="bg-white p-4 rounded shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{booking.serviceType.name}</h3>
                    <p className="text-gray-600">{booking.user.name}</p>
                    <p>{booking.car.model} ({booking.car.licensePlate})</p>
                  </div>
                  <div className="flex space-x-2">
                    <select 
                      value={booking.status}
                      onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <div className="space-y-4">
            {users.map(user => (
              <div key={user._id} className="bg-white p-4 rounded shadow">
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
                <p>{user.cars.length} cars registered</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}