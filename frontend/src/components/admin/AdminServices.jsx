import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import * as adminService from '../../services/admin'  // Changed from booking to admin service
import AdminNavbar from './AdminNavbar'
import { toast } from 'react-toastify'

export default function AdminServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: 0,
    duration: 60
  })
  const [errors, setErrors] = useState({})
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await adminService.getAllServices()  // Updated service call
        setServices(data)
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error('Session expired. Please login again.')
          navigate('/admin-login')
        } else {
          toast.error('Failed to load services')
          console.error('Error fetching services:', err)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [navigate])

  const validateForm = () => {
    const newErrors = {}
    if (!newService.name.trim()) newErrors.name = 'Name is required'
    if (newService.price <= 0) newErrors.price = 'Price must be greater than 0'
    if (newService.duration < 15) newErrors.duration = 'Minimum duration is 15 minutes'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewService(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value || 0) : value
    }))
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleAddService = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      const addedService = await adminService.addService(newService)
      setServices([...services, addedService])
      setNewService({
        name: '',
        description: '',
        price: 0,
        duration: 60
      })
      toast.success('Service added successfully!')
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to add service'
      toast.error(errorMessage)
      console.error('Error adding service:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <AdminNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">Loading services...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Service Management</h1>
          {user?.email === 'rajyogi1811@gmail.com' && (
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Super Admin
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Add New Service</h2>
            <form onSubmit={handleAddService} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Service Name*</label>
                <input
                  type="text"
                  name="name"
                  value={newService.name}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
                  required
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={newService.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  rows="3"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">Price (₹)*</label>
                  <input
                    type="number"
                    name="price"
                    value={newService.price}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded ${errors.price ? 'border-red-500' : ''}`}
                    min="0"
                    step="0.01"
                    required
                  />
                  {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Duration (mins)*</label>
                  <input
                    type="number"
                    name="duration"
                    value={newService.duration}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded ${errors.duration ? 'border-red-500' : ''}`}
                    min="15"
                    step="15"
                    required
                  />
                  {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-400"
                disabled={Object.keys(errors).length > 0}
              >
                Add Service
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <h2 className="text-xl font-semibold p-6">Current Services ({services.length})</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {services.length > 0 ? (
                    services.map(service => (
                      <tr key={service._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{service.name}</div>
                          <div className="text-sm text-gray-500">{service.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{service.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {service.duration} mins
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                        No services available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}