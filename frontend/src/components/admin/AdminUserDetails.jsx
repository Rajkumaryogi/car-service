import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import * as adminService from '../../services/admin'
import AdminNavbar from './AdminNavbar'
import { toast } from 'react-toastify'
import LoadingSpinner from '../common/LoadingSpinner'

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
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => navigate('/admin/users')}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Users
          </button>
          {adminUser?.email === 'rajyogi1811@gmail.com' && (
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Super Admin
            </span>
          )}
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">{userDetails.name}</h2>
            <p className="text-gray-600">{userDetails.email}</p>
          </div>

          <div className="px-6 py-4">
            <h3 className="text-lg font-medium mb-4">Registered Cars</h3>
            
            {userDetails.cars?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userDetails.cars.map((car, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{car.model || 'No model specified'}</h4>
                        <p className="text-gray-600 text-sm mt-1">License: {car.licensePlate || 'Not provided'}</p>
                        {car.year && <p className="text-gray-600 text-sm">Year: {car.year}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No cars registered</p>
            )}
          </div>

          <div className="px-6 py-4 border-t border-gray-200">
            <h3 className="text-lg font-medium mb-2">Account Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Registration Date</p>
                <p className="font-medium">
                  {new Date(userDetails.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="font-medium">
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