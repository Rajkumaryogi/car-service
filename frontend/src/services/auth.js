import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/api/auth/register`, userData)
  localStorage.setItem('token', response.data.token)
  return response.data.user
}

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, { email, password })
  localStorage.setItem('token', response.data.token)
  return response.data.user
}

export const logout = () => {
  localStorage.removeItem('token')
}

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token')
  if (!token) return null

  try {
    const response = await axios.get(`${API_URL}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (err) {
    console.error(err)
    localStorage.removeItem('token')
    return null
  }
}

export const forgotPassword = async (email) => {
  await axios.post(`${API_URL}/api/auth/forgot-password`, { email })
}
// reset password
export const resetPassword = async (token, newPassword) => {
  await axios.patch(`${API_URL}/api/auth/reset-password/${token}`, { password: newPassword })
  }