import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import * as bookingService from '../services/booking'
import { addUserCar } from '../services/user'
import { toast } from 'react-toastify'

export default function Dashboard() {
  const { user, setUser } = useAuth()
  const [bookings, setBookings] = useState([])
  const [showAddCarModal, setShowAddCarModal] = useState(false)
  const [newCar, setNewCar] = useState({
    model: '',
    year: '',
    licensePlate: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await bookingService.getUserBookings()
        setBookings(data)
      } catch (err) {
        console.error('Error fetching bookings:', err)
        toast.error('Failed to load bookings')
      }
    }
    fetchData()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewCar(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddCar = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const addedCar = await addUserCar(newCar)
      
      setUser({
        ...user,
        cars: [...(user.cars || []), addedCar]
      })
      
      setShowAddCarModal(false)
      setNewCar({ model: '', year: '', licensePlate: '' })
      toast.success('Car added successfully!')
    } catch (err) {
      console.error('Add car error:', err)
      const errorMessage = err.response?.data?.message || 'Failed to add car. Please try again.'
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user?.name}</h1>
      
      {/* Cars Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Cars</h2>
          <button 
            onClick={() => setShowAddCarModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
            disabled={isLoading}
          >
            Add Your Car
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user?.cars?.length > 0 ? (
            user.cars.map((car, index) => (
              <div key={index} className="bg-white p-4 rounded shadow">
                <h3 className="font-medium">
                      {car?.model ? car.model : 'Car Added: Refresh the Page'}
                      {car?.year && ` (${car.year})`}
                </h3>
                {car?.licensePlate && (
                  <p className="text-gray-600">{car.licensePlate}</p>
                )}
              </div>
            ))
          ) : (
            <p>No cars added yet</p>
          )}
        </div>
      </div>

      {/* Add Car Modal */}
      {showAddCarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add Your Car</h3>
              <button 
                onClick={() => setShowAddCarModal(false)}
                className="text-gray-500 hover:text-gray-700"
                disabled={isLoading}
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleAddCar}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Model</label>
                <input
                  type="text"
                  name="model"
                  value={newCar.model}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Year</label>
                <input
                  type="text"
                  name="year"
                  value={newCar.year}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">License Plate</label>
                <input
                  type="text"
                  name="licensePlate"
                  value={newCar.licensePlate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddCarModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-50 transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-4 py-2 rounded text-white ${
                    isLoading ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'
                  } transition-colors`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding...
                    </span>
                  ) : 'Add Car'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bookings Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map(booking => (
              <div key={booking._id} className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{booking.serviceType?.name || 'Service'}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {new Date(booking.scheduledDate).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    booking.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                    booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No bookings yet</p>
        )}
      </div>
    </div>
  )
}