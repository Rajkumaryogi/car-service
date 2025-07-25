import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function ServiceCard({ service }) {
  const { user } = useAuth()

  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
      <p className="text-gray-600 mb-4">{service.description}</p>
      
      <div className="flex justify-between items-center">
        <div>
          <span className="text-lg font-bold">₹{service.price}</span>
          <span className="text-gray-500 text-sm ml-2">
            ({Math.floor(service.duration / 60)}h {service.duration % 60}m)
          </span>
        </div>
        
        {user ? (
          <Link 
            to={`/services?book=${service._id}`} 
            className="btn-primary text-sm px-3 py-1"
          >
            Book Now
          </Link>
        ) : (
          <Link 
            to="/login" 
            className="btn-primary text-sm px-3 py-1 bg-gray-600 hover:bg-gray-700"
          >
            Login to Book
          </Link>
        )}
      </div>
    </div>
  )
}