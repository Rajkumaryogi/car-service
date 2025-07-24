import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const getUserProfile = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${API_URL}/api/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const updateUserProfile = async (userData) => {
  const token = localStorage.getItem('token')
  const response = await axios.patch(`${API_URL}/api/user/profile`, userData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const addUserCar = async (carData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(`${API_URL}/api/user/cars`, carData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data.newCar // Return just the car object
  } catch (error) {
    console.error('Error in addUserCar:', error.response?.data || error.message)
    throw error // Re-throw the error to handle it in the component
  }
};