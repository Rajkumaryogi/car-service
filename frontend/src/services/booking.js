import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const getServices = async () => {
  const response = await axios.get(`${API_URL}/api/services`)
  return response.data
};

export const bookService = async (bookingData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(`${API_URL}/api/services/book`, bookingData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (err) {
    // Return the error response data if available
    throw err.response?.data || { message: 'Failed to book service' }
  }
};

export const getUserBookings = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/api/user/bookings`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};