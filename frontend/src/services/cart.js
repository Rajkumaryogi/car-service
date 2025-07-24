import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const getCart = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${API_URL}/api/cart`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const addToCart = async (serviceId) => {
  const token = localStorage.getItem('token')
  const response = await axios.post(
    `${API_URL}/api/cart/add`,
    { serviceId },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return response.data
}

export const removeFromCart = async (serviceId) => {
  const token = localStorage.getItem('token')
  const response = await axios.delete(`${API_URL}/api/cart/remove/${serviceId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const clearCart = async () => {
  const token = localStorage.getItem('token')
  await axios.delete(`${API_URL}/api/cart/clear`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}