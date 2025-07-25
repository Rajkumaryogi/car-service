import { useState } from 'react'
import * as adminService from '../../services/admin'

export default function AddServiceForm({ onServiceAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: ''
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await adminService.addService({
        ...formData,
        price: Number(formData.price),
        duration: Number(formData.duration)
      })
      onServiceAdded()
      setFormData({ name: '', description: '', price: '', duration: '' })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add service')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h3 className="font-semibold mb-3">Add New Service</h3>
      {error && <div className="mb-3 text-red-500 text-sm">{error}</div>}
      
      <div className="mb-3">
        <label className="block text-sm mb-1">Service Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="input-field"
          required
        />
      </div>
      
      <div className="mb-3">
        <label className="block text-sm mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="input-field"
          rows="3"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-sm mb-1">Price (₹)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            className="input-field"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Duration (minutes)</label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: e.target.value})}
            className="input-field"
            min="1"
            required
          />
        </div>
      </div>
      
      <button type="submit" className="btn-primary">
        Add Service
      </button>
    </form>
  )
}