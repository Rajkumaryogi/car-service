import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import * as adminService from '../../services/admin'
import AdminNavbar from './AdminNavbar'
import { toast } from 'react-toastify'
import LoadingSpinner from '../common/LoadingSpinner'
import {
  FaArrowLeft,
  FaUserShield,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCar,
  FaCalendarAlt,
  FaHistory,
  FaIdBadge
} from 'react-icons/fa'

export default function AdminUserDetails() {
  const { userId } = useParams()
  const [userDetails, setUserDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user: adminUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await adminService.getUserDetails(userId)
        setUserDetails(data)
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error('Session expired, please login again')
          navigate('/admin-login')
        } else {
          toast.error('Failed to load user details')
          console.error('Error fetching user details:', err)
          navigate('/admin/users')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUserDetails()
  }, [userId, navigate])

  if (loading || !userDetails) {
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
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <button 
            onClick={() => navigate('/admin/users')}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Users
          </button>
          {adminUser?.email === 'rajyogi1811@gmail.com' && (
            <span className="flex items-center gap-2 bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
              <FaUserShield />
              Super Admin
            </span>
          )}
        </div>

        {/* User Profile Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* User Info Section */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaUser className="text-blue-600 text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{userDetails.name}</h2>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1">
                  <span className="flex items-center gap-2 text-gray-600 text-sm">
                    <FaEnvelope />
                    {userDetails.email}
                  </span>
                  {userDetails.phone && (
                    <span className="flex items-center gap-2 text-gray-600 text-sm">
                      <FaPhone />
                      {userDetails.phone}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Registered Cars Section */}
          <div className="px-6 py-4">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <FaCar />
              Registered Vehicles
            </h3>
            
            {userDetails.cars?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userDetails.cars.map((car, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <FaCar className="text-gray-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">{car.model || 'No model specified'}</h4>
                        <div className="mt-2 space-y-1 text-sm text-gray-600">
                          {car.licensePlate && (
                            <p className="flex items-center gap-2">
                              <FaIdBadge className="text-gray-400" />
                              {car.licensePlate}
                            </p>
                          )}
                          {car.year && (
                            <p className="flex items-center gap-2">
                              <FaCalendarAlt className="text-gray-400" />
                              Year: {car.year}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <FaCar className="mx-auto text-3xl text-gray-300 mb-2" />
                <p className="text-gray-500">No vehicles registered</p>
              </div>
            )}
          </div>

          {/* Account Details Section */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <FaHistory />
              Account History
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <FaCalendarAlt />
                  Registration Date
                </p>
                <p className="font-medium mt-1">
                  {new Date(userDetails.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <FaHistory />
                  Last Updated
                </p>
                <p className="font-medium mt-1">
                  {new Date(userDetails.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}