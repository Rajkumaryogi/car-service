import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import * as adminService from "../../services/admin";
import AdminNavbar from "./AdminNavbar";
import { toast } from "react-toastify";
import {
  FaUsers,
  FaUserShield,
  FaSpinner,
  FaEye,
  FaCar,
  FaEnvelope,
  FaUser,
  FaTable,
  FaPhone,
} from "react-icons/fa";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await adminService.getAllUsers();
        setUsers(data);
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error("Session expired, please login again");
          navigate("/admin-login");
        } else {
          toast.error("Failed to load users");
          console.error("Error fetching users:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <AdminNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4" />
            <p className="text-lg">Loading users...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <FaUsers className="text-2xl text-blue-600" />
            <h1 className="text-2xl font-bold">User Management</h1>
          </div>

          {user?.email === "rajyogi1811@gmail.com" && (
            <span className="flex items-center gap-2 bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
              <FaUserShield />
              Super Admin
            </span>
          )}
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    <div className="flex items-center gap-2">
                      <FaUser className="flex-shrink-0" />
                      <span>Name</span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="flex-shrink-0" />
                      <span>Email</span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    <div className="flex items-center gap-2">
                      <FaCar className="flex-shrink-0" />
                      <span>Cars</span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 max-w-xs overflow-hidden text-ellipsis">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {user.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs overflow-hidden text-ellipsis">
                      <div className="text-sm text-gray-500 truncate">
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <FaCar className="text-gray-400 flex-shrink-0" />
                        <span>{user.cars?.length || 0}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => navigate(`/admin/users/${user._id}`)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={user.email === "rajyogi1811@gmail.com"}
                      >
                        <FaEye className="flex-shrink-0" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4 p-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-lg shadow p-4 border border-gray-100"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-lg flex items-center gap-2">
                      <FaUser className="text-blue-500" />
                      {user.name}
                    </h3>
                    <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                      {user.cars?.length || 0} <FaCar className="inline ml-1" />
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <FaEnvelope />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaPhone />
                    <span className="text-sm">{user.phone}</span>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <button
                      onClick={() => navigate(`/admin/users/${user._id}`)}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                      disabled={user.email === "rajyogi1811@gmail.com"}
                    >
                      <FaEye />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {users.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <FaTable className="mx-auto text-4xl text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No Users Found
            </h3>
            <p className="text-gray-500">
              There are currently no registered users in the system.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
