import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Helper function to get token
const getAdminToken = () => {
  const token = localStorage.getItem("adminToken");
  if (!token) {
    console.error("No admin token found");
    throw new Error("Admin authentication required");
  }
  return token;
};

export const adminLogin = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/admin/login`, {
      email: email.value,
      password: password.value,
    });
    // Store both token and admin data
    localStorage.setItem("adminToken", response.data.token);
    localStorage.setItem("adminData", JSON.stringify(response.data.admin));
    return response.data.admin;
  } catch (err) {
    console.error("Admin login error:", err);
    throw err;
  }
};

export const getCurrentAdmin = async () => {
  const token = getAdminToken();
  const storedAdmin = localStorage.getItem("adminData");

  if (!token) return null;

  try {
    const response = await axios.get(`${API_URL}/api/admin/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Verify the response matches stored data
    if (
      !response.data ||
      (storedAdmin && response.data._id !== JSON.parse(storedAdmin)._id)
    ) {
      throw new Error("Admin data mismatch");
    }

    // Ensure the response contains admin data
    // if (!response.data) {
    //   throw new Error('Invalid admin data received');
    // }

    // Update stored data if needed
    localStorage.setItem("adminData", JSON.stringify(response.data));

    return { ...response.data, isAdmin: true };
  } catch (err) {
    console.error("Error fetching admin:", err);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("adminToken");
};

export const getAllUsers = async () => {
  try {
    const token = getAdminToken();
    const response = await axios.get(`${API_URL}/api/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching users:", err);
    throw err;
  }
};

export const getUserDetails = async (userId) => {
  try {
    const token = getAdminToken()
    const response = await axios.get(`${API_URL}/api/admin/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (err) {
    console.error('Error fetching user details:', err)
    throw err
  }
}

export const getAllBookings = async () => {
  try {
    const token = getAdminToken();
    const response = await axios.get(`${API_URL}/api/admin/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching bookings:", err);
    throw err;
  }
};

export const updateBookingStatus = async (bookingId, status) => {
  const token = getAdminToken();
  const response = await axios.patch(
    `${API_URL}/api/admin/bookings/${bookingId}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getAllServices = async () => {
  try {
    const token = getAdminToken();
    const response = await axios.get(`${API_URL}/api/admin/services`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching services:", err);
    throw err;
  }
};

export const addService = async (serviceData) => {
  const token = getAdminToken();
  const response = await axios.post(
    `${API_URL}/api/admin/service`,
    serviceData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deleteService = async (serviceId) => {
  try {
    const token = getAdminToken()
    const response = await axios.delete(`${API_URL}/api/admin/services/${serviceId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (err) {
    console.error('Error deleting service:', err)
    throw err
  }
}
