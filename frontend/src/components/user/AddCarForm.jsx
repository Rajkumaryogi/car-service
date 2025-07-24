import { useState } from 'react'
import * as userService from '../../services/user'

export default function AddCarForm({ onCarAdded }) {
  const [formData, setFormData] = useState({
    model: '',
    year: '',
    licensePlate: ''
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await userService.addUserCar(formData)
      onCarAdded()
      setFormData({ model: '', year: '', licensePlate: '' })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add car')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Add New Car</h3>
      {error && <div className="mb-3 text-red-500 text-sm">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div>
          <label className="block text-sm mb-1">Model</label>
          <input
            type="text"
            value={formData.model}
            onChange={(e) => setFormData({...formData, model: e.target.value})}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Year</label>
          <input
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({...formData, year: e.target.value})}
            className="input-field"
            min="1900"
            max={new Date().getFullYear() + 1}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">License Plate</label>
          <input
            type="text"
            value={formData.licensePlate}
            onChange={(e) => setFormData({...formData, licensePlate: e.target.value})}
            className="input-field"
            required
          />
        </div>
      </div>
      
      <button type="submit" className="btn-primary text-sm px-3 py-1">
        Add Car
      </button>
    </form>
  )
}